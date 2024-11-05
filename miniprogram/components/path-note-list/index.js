// components/path-note-list/index.js
import { getPathList } from './service/group';
import { registerAccount } from '../../utils/auth';

Component({
  options: {
    addGlobalClass: true
  },
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
    authed: false,
    logined: false,
  },

  lifetimes: {
    attached() {
      getApp().globalData.event.on('login', (params) => {
        console.log('---params', params)
        this.setData({
          authed: params.type === 'loginFailed' ? false : true,
          logined: true
        });
        if (params.type !== 'loginFailed') {
          this.getPathList('mine');
        }
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    isAuthed: function () {
      const app = getApp();
      const user = app.globalData.user || {};
      const token = user.token;
      this.setData({
        authed: !!token
      });
    },
    onLogin(e) {
      const code = e.detail.code;
      registerAccount(code);
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
        `path_id=${detail.path_id}`
      ].filter(Boolean);

      wx.navigateTo({
        url: `/pages/path-note-detail/index?${queryArr.join('&')}`,
        fail: function (e) {
          console.log(e)
        }
      });
    },
    onTabChange(e) {
      const key = e.detail.key;
      this.getPathList(key);
    }
  }
})