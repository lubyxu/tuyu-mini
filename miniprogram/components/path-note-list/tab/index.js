// components/path-note-list/tab/index.js
import { getTabs } from '../service/group';

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
    curKey: '',
    tabs: []
  },

  lifetimes: {
    attached: async function () {
      const tabs = await getTabs();
      this.setData({
        tabs: tabs.map(item => ({ key: item.id, name: item.name })),
        curKey: tabs[0].id,
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      const index = e.currentTarget.dataset.index;
      this.setData({
        curKey: this.data.tabs[index].key
      });
      this.triggerEvent('change', this.data.tabs[index].key);
    }
  }
})