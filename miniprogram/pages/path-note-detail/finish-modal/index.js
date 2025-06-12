// pages/path-note-detail/finish-modal/index.js
Component({
  options: {
    addGlobalClass: true
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    // 控制弹窗显示隐藏
    show: {
      type: Boolean,
      value: false
    }
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
    /**
     * 点击遮罩层关闭弹窗
     */
    onOverlayTap() {
      this.hideModal();
    },

    /**
     * 点击弹窗内容区域，阻止事件冒泡
     */
    onContentTap() {
      // 阻止事件冒泡，不关闭弹窗
    },

    /**
     * 点击确认按钮
     */
    onConfirm() {
      // 触发确认事件，通知父组件
      this.triggerEvent('confirm');
      // 关闭弹窗
      this.hideModal();
    },

    /**
     * 隐藏弹窗
     */
    hideModal() {
      // 触发关闭事件，通知父组件
      this.triggerEvent('close');
    },

    /**
     * 显示弹窗
     */
    showModal() {
      this.triggerEvent('show');
    }
  }
})