// components/path-note-list/tab/index.js
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
    curKey: 'plan',
    tabs: [
      { key: 'plan', name: '我的计划', icon: '' },
      { key: 'hot-path', name: '热门路线', icon: '' },
      { key: 'citywalk', name: 'Citywalk', icon: '' },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      const index = e.currentTarget.dataset.index;
      console.log('---index', index)
      this.setData({
        curKey: this.data.tabs[index].key
      });
      this.triggerEvent('change', this.data.tabs[index].key);
    }
  }
})