// components/button/switch-btn/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    checked: Boolean,
    unCheckText: String,
    checkedText: String,
  },

  methods: {
    onSwitch() {
      this.triggerEvent('onChange', { checked: !this.data.checked });
    }
  }
})