const app = getApp()
import { getUser, registerAccount } from '../../utils/auth'
import { request } from '../../utils/req';
import { formatUnixTime } from '../../utils/index'

Page({
  data: {
    showLoading: true,
    date: [],
    selectDateIdx: -1,
    selectTimeIdx: -1,
    orderFinish: false,
    orderNo: '',
    orderTime: '',
  },
  async onLoad(options) {
    this.firstRender = true
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    this.user_path_id = options.user_path_id / 1
    this.place_id = options.place_id / 1,
    this.orderStatus = options.orderStatus / 1
    console.log('options', options)
    if (this.orderStatus == 0) {
      await this.getInitData()
    } else {
      await this.getReservationDetail()
    }

    this.setData({ showLoading: false })
  },

  async getInitData(){
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/path/reservation/calendar',
      data: {
        user_path_id: this.user_path_id,
        place_id: this.place_id
      }
    });

    const _data = Object.keys(data)
      .sort()
      .map((key) => {
        const { 1: morning, 2: afternoon } = data[key]
        const today = `${formatUnixTime(Math.floor(new Date().getTime() / 1000))}`
        let title = ''
        if (today === key) title = '今天'
        else if (today === key - 1) title = '明天'
        else if (today === key - 2) title = '后天'
        
        let morningLimit = false
        let afternoonLimit = false
        if (morning) {
          morningLimit = morning.counter === morning.limit
        }
        if (afternoon) {
          afternoonLimit = afternoon.counter === afternoon.limit
        }
        let limit = false
        if (morning && afternoon) {
          limit = morningLimit && afternoonLimit
        } else if (morning) {
          limit = morningLimit
        } else if (afternoon) {
          limit = afternoonLimit
        }
        const time = []
        if (morning) {
          time.push({
            ...morning,
            title: '上午',
            time: `${morning.start_hour}-${morning.end_hour}`,
            subtitle: morningLimit ? '已满' :  `剩余${morning.limit-morning.counter}个`,
            disable: morningLimit,
          })
        }
        if (afternoon) {
          time.push({
            ...afternoon,
            title: '下午',
            time: `${afternoon.start_hour}-${afternoon.end_hour}`,
            subtitle: afternoonLimit ? '已满' :  `剩余${afternoon.limit-afternoon.counter}个`,
            disable: afternoonLimit,
          })
        }
        return {
          title,
          date: `${key.slice(4,6)}月${key.slice(6)}日`,
          disable: limit,
          time
        }
      })
    
    const firstCanSelectData = _data.find((item) => !item.disable)

    const firstCanSelectTime = firstCanSelectData.time.find((item) => !item.disable)

    this.setData({
      date: _data,
      time: _data[0].time,
      selectDateIdx: _data.indexOf(firstCanSelectData),
      selectTimeIdx: _data[0].time.indexOf(firstCanSelectTime)
    })
  },

  async getReservationDetail(){
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/path/reservation/detail',
      data: {
        user_path_id: this.user_path_id,
        place_id: this.place_id
      }
    });
    const { code, start_hour, end_hour, date } = data
    const timePrefix = start_hour.split(':')[0] / 1 > 12 ? '下午' : '上午'
    console.log(`${date.slice(4,6)}月${date.slice(6)}日 ${timePrefix} ${start_hour}-${end_hour}`)
    this.setData({
      orderFinish: true,
      orderNo: code,
      orderTime: `${date.slice(4,6)}月${date.slice(6)}日 ${timePrefix} ${start_hour}-${end_hour}`,
    })
  },

  onDateSelect(e) {
    const disable = e.currentTarget.dataset.disable
    const index = e.currentTarget.dataset.index
    const currentDate = this.data.date[index]
    const firstCanSelectTime = currentDate.time.find((item) => !item.disable)
    if (disable) return;
    this.setData({
      selectDateIdx: index,
      time: currentDate.time,
      selectTimeIdx: currentDate.time.indexOf(firstCanSelectTime)
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

  async onOrder() {
    try {
      const time = this.data.time[this.data.selectTimeIdx]
      console.log('time', time)
      const { data } = await request({
        method: 'POST',
        url: '/fuyu/path/reservation/confirm',
        data: {
          user_path_id: this.user_path_id,
          path_resv_id: time.path_reserv_id
        }
      });
      const { code } = data
      this.setData({
        orderFinish: true,
        orderNo: code,
        orderTime: time.time,
        orderDate: time.date,
      })
    } catch(err) {
      wx.showToast({
        icon: 'error',
        title: '预约失败，请重试'
      })
    }
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
