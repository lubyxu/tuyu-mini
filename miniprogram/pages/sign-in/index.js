import loginBehavior from '../../behaviors/login/index';
import { getPointRecentList, completeSignIn, getPointCount, getMemberTasks } from '../../service/point/index'
Page({

  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    pointCount: 0,
    checkCount: '',
    checkList: [],
    // 积分列表
    memberTasks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPointCount()
    this.getPointDetail()
    this.getMemberTasks()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '拾光坊',
      path: 'pages/home/index',
      imageUrl: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/share-mini.png'
    }
  },

  async getPointCount() {
    const data = await getPointCount()
    this.setData({
      pointCount: data.available_points
    })
  },

  async getPointDetail() {
    const ret = await getPointRecentList()
    const data = ret.user_checkin_info;

    this.setData({
      checkCount: data.cycle_days,
      checkList: (data?.rewards || []).map(item => {
        return {
          date: `第${item.day}天`,
          isChecked: item.is_checked_in,
          count: item.value
        }
      }),
      todayIsChecked: data.today_checked_in
    })
  },

  async onChecked() {
    if (this.isPending) return
    this.isPending = true
    try {
      await completeSignIn()
      this.getPointDetail()
    } catch (error) {
      wx.showToast({
        title: '签到失败',
        icon: 'none'
      })
    } finally {
      this.isPending = false
    }
  },

  async getMemberTasks() {
    const data = await getMemberTasks()
    this.setData({
      memberTasks: (data.list || []).map(item => {
        const value = (function (){
          try {
            const ret = JSON.parse(item.reward_config)
            return ret.day_rewards?.[0]?.value || 0
          }
          finally {
            return 0
          }
        })() 
        return {
          id: item.id,
          name: item.name,
          value: value,
          isCompeleted: item.is_completed
        }
      })
    })
  },

})