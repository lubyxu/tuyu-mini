const app = getApp()
import { getUser, registerAccount } from '../../utils/auth'
import { request } from '../../utils/req';

Page({
  data: {
    showLoading: true,
    date: [],
    selectDateIdx: 1,
    selectTimeIdx: 1,
    orderFinish: false,
  },
  async onLoad() {
    this.firstRender = true
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    await this.getInitData()

    this.setData({ showLoading: false })
  },

  getInitData(){
    const date = [{
      title: "今天",
      date: '01月01日',
      disable: true,
    }, {
      date: '01月01日',
    }, {
      title: "今天",
      date: '01月01日',
    }, {
      title: "今天",
      date: '01月01日',
    }, {
      title: "今天",
      date: '01月01日',
    }, {
      title: "今天",
      date: '01月01日',
    }, {
      title: "今天",
      date: '01月01日',
    }, {
      title: "今天",
      date: '01月01日',
    }]

    const time = [{
      title: "今天",
      time: '11:00-12:00',
      subtitle: '已满',
      disable: true,
    }, {
      title: "今天",
      time: '11:00-12:00',
      subtitle: '已满',
    }]
    this.setData({
      date,
      time
    })
  },

  onDateSelect(e) {
    const selectId = e.currentTarget.dataset.id
    const disable = e.currentTarget.dataset.disable
    const index = e.currentTarget.dataset.index
    if (disable) return;
    this.setData({
      selectDateIdx: index
    })
  },

  onDateTime(e) {
    const selectId = e.currentTarget.dataset.id
    const disable = e.currentTarget.dataset.disable
    const index = e.currentTarget.dataset.index
    if (disable) return;
    this.setData({
      selectTimeIdx: index
    })
  },

  onOrder() {
    this.setData({
      orderFinish: true
    })
  },

  onCancel(){
    wx.showModal({
      content: '确认要取消预约吗？', 
      confirmText: '确认', 
      cancelText: '取消', 
      success: (res) => { 
        if (res.confirm) {
          console.log("取消预约")
        }
      }
    });
    console.log("取消预约")
  }
});
