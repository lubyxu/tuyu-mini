// components/path-note-list/progress-bar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    done: {
      type: Number,
      observer() {
        this.update();
      }
    },
    total: {
      type: Number,
      observer() {
        this.update();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isDone: false,
    progress: 0
  },
  lifetimes: {
    attached() {
      this.update();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update() {
      this.setData({
        isDone: this.data.done === this.data.total,
        progress: ((this.data.done / this.data.total) * 100 | 0) / 100
      });
    }
  }
})