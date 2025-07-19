Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    checkCount: Number,
    todayIsChecked: Boolean,
    checkItems: {
      type: Array,
      value: [
        {
          date: '07/07',
          isChecked: true,
          count: 20
        },
        {
          date: '07/07',
          isChecked: true,
          count: 20
        },
        {
          date: '07/07',
          isChecked: true,
          count: 20
        },
        {
          date: '07/07',
          isChecked: true,
          count: 20
        },
        {
          date: '07/07',
          isChecked: true,
          count: 20
        },
        {
          date: '07/07',
          isChecked: false,
          count: 20
        },
      ]
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
    onCheckIn() {
      this.triggerEvent('checked')
    }
  }
})