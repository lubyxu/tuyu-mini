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
    },
    // 奖品列表数据
    gifts: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 默认奖品列表
    giftList: []
  },

  /**
   * 组件生命周期
   */
  observers: {
    'gifts': function(newGifts) {
      // 如果传入了奖品数据，使用传入的数据
      if (newGifts && newGifts.length > 0) {
        this.setData({
          giftList: newGifts
        });
      }
    }
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
      wx.navigateTo({
        url: '/pages/coupon/list/index',
      })
      // 触发确认事件，通知父组件
      this.triggerEvent('confirm', {
        gifts: this.data.giftList
      });
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
    },

    /**
     * 设置奖品列表
     * @param {Array} gifts 奖品数组
     */
    setGifts(gifts) {
      this.setData({
        giftList: gifts || this.data.giftList
      });
    }
  }
}) 