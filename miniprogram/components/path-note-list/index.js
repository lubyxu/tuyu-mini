// components/path-note-list/index.js
import { getPathList } from './service/group';
import { registerAccount } from '../../utils/auth';
import loginBehavior from '../../behaviors/login/index';

Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [loginBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    group_id: 'mine',
    list: [],
  },

  lifetimes: {
    // attached() {
    //   if (this.data.isUserAccount) {
    //     this.getPathList('mine');
    //     return;
    //   }
    //   getApp().globalData.event.on('login', (params) => {
    //     if (params.type !== 'loginFailed') {
    //       this.getPathList('mine');
    //     }
    //   })
    // },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async onLogin(e) {
      const code = e.detail.code;
      await registerAccount(code);
      this.triggerEvent('onLoginSuccess')
    },
    async getPathList(group_id) {
      const data = await getPathList({ group_id });
      this.setData({
        list: data,
        group_id,
      });
    },
    onItemClick(e) {
      const detail = e.detail;
      const queryArr = [
        detail.user_path_id && `user_path_id=${detail.user_path_id}`,
        `path_id=${detail.path_id}`,
        `group_id=${this.data.group_id}`
      ].filter(Boolean);

      wx.navigateTo({
        url: `/pages/path-note-detail/index?${queryArr.join('&')}`,
        fail: function (e) {
          console.log(e)
        },
        events: {
          refresh: () => {
            this.refresh();
          }
        }
      });
    },
    onTabChange(e) {
      const key = e.detail.key;
      this.getPathList(key);
    },
    refresh() {
      this.getPathList(this.data.group_id);
    }
  }
})