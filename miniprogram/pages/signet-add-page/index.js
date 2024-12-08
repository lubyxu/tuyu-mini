import dayjs from 'dayjs';
const chooseLocation = requirePlugin('chooseLocation');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgImage: 'https://oss-whale-peach.meetwhale.com/wos%2Fharbor%2FRuerzq27ilivYaCJKlOYh%2F%E7%AB%A0.svg',
    src: '',
    name: '',
    time: '',
    timeStr: '',
    location: '',

    isEdit: false,
    modalValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const date = dayjs();
    this.setData({
      state: options.state,
      time: date.unix(),
      timeStr: date.format('YYYY年YY月DD日 HH:mm:ss')
    })
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
    const location = chooseLocation.getLocation(); 
    console.log('location:', location)
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

  onChooseLocation () {
		wx.chooseLocation({
			success: (res) => {
				this.setData({
					location: res
				});
			}
		});
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onEdit() {
    this.setData({
      isEdit: true,
      modalValue: this.data.name
    });
  },
  onNameModalClick(e) {
    const detail = e.detail;
    if (e.detail.index == 0) {
      this.setData({
        isEdit: false,
      });
    }
    else {
      this.setData({
        isEdit: false,
        name: this.data.modalValue,
      });
    }
  },
  onNameChange(e) {
    this.setData({
      modalValue: e.detail.value
    });
  },
  onMapOpen() {
    const key = 'LXABZ-P2ICT-ATAXX-VM4X3-LGHHE-ZBFHI';
    const referer = 'fuyu';
    const location = JSON.stringify({
      latitude: 39.89631551,
      longitude: 116.323459711
    });
    const category = '生活服务,娱乐休闲';
     
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
    
  }
})