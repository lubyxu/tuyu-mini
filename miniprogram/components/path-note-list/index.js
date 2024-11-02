// components/path-note-list/index.js
import { getPathList } from './service/group';

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
    list: [],
  },

  lifetimes: {
    attached() {
      this.getPathList('mine');
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async getPathList(group_id) {
      const data = await getPathList({ group_id });
      this.setData({
        list: data,
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