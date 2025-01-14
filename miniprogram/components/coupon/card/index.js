// components/coupon/card/index.js
Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 1 印章 2 印章页 3 实物
    type: String,
    name: String,
    image: String,
    subTitle: String,
    canUse: Boolean,
    useText: String,
    isUsed: Boolean,
    source: String,
    couponId: String,
    productId: String,
    userCouponId: String,
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
    onAccept() {
      this.triggerEvent(
        'accept',
        {
          source: this.data.source,
          id: this.data.couponId,
          type: this.data.type,
          productId: this.data.productId,
          userCouponId: this.data.userCouponId,
        }
      );
    },
    onClick() {
      this.triggerEvent(
        'click',
        {
          ...this.data
        }
      );
    }
  }
})