// components/auth-guard/index.js
Component({
  properties: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    subtitleClick: {
      type: Function
    }
  },
  methods: {
    triggerParentFunction: function() {
      // 调用父组件传递的函数
      this.properties.subtitleClick();
    }
  }
})