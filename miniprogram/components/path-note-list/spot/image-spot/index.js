// components/path-note-list/spot/image-spot/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    images: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImageClick(e) {
      const index = e.currentTarget.dataset.index || 0;
      this.triggerEvent('onImageClick', { index });
      console.log('000 i am going to trigger event')
      this.triggerEvent('imageClick', { index });
    }
  }
})