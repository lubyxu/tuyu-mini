// components/scrolling-number/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 要显示的数字
    number: {
      type: [Number, String],
      value: 0,
      observer: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.updateNumber(newVal);
        }
      }
    },
    // 数字位数，0表示自动计算
    digits: {
      type: Number,
      value: 0
    },
    // 滚动动画时长（毫秒）
    duration: {
      type: Number,
      value: 1000
    },
    // 数字大小
    fontSize: {
      type: Number,
      value: 32
    },
    // 数字颜色
    color: {
      type: String,
      value: '#000000'
    },
    // 数字间距
    spacing: {
      type: Number,
      value: 8
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    digitList: [], // 数字列表
    animationData: [] // 动画数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 更新数字
     */
    updateNumber(newNumber) {
      const numStr = String(newNumber);
      const digits = this.properties.digits || numStr.length;
      
      // 补齐位数
      let paddedNum = numStr.padStart(digits, '0');
      
      // 解析每一位数字
      const digitList = paddedNum.split('').map((digit, index) => {
        return {
          value: parseInt(digit),
          index: index
        };
      });
      
      this.setData({ digitList });
      
      // 开始滚动动画
      this.startScrollAnimation();
    },

    /**
     * 开始滚动动画
     */
    startScrollAnimation() {
      const { digitList } = this.data;
      const { duration } = this.properties;
      
      digitList.forEach((digit, index) => {
        // 延迟启动每个数字的动画，创造波浪效果
        setTimeout(() => {
          this.animateDigit(digit, index, duration);
        }, index * 50);
      });
    },

    /**
     * 为单个数字位创建动画
     */
    animateDigit(digit, index, duration) {
      const animation = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease-out'
      });
      
      // 计算滚动距离（每个数字高度为fontSize）
      const scrollDistance = digit.value * this.properties.fontSize;
      
      // 创建向上滚动的动画
      animation.translateY(-scrollDistance).step();
      
      // 更新动画数据
      this.setData({
        [`animationData[${index}]`]: animation.export()
      });
    },

    /**
     * 组件初始化
     */
    onReady() {
      this.updateNumber(this.properties.number);
    }
  }
})