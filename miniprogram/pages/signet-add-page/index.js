import dayjs from 'dayjs';
import { addToPage, getBookInfo } from '../../service/signet/index';
import loginBehavior from '../../behaviors/login/index';
const chooseLocation = requirePlugin('chooseLocation');
Page({
  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    bgImage: '',
    signet: {},
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
    this.options = options;
    this.initValue();
  },

  onLogined() {
    this.initValue();
  },

  async initValue() {
    const data = await getBookInfo(this.options.book_id);
    const bookInfo = data.BookInfo;
    const bookConfig = bookInfo.content.book_config;
    const date = dayjs();
    this.setData({
      bgImage: bookConfig.page_bg_img,
      timeStr: date.format('YYYY年YY月DD日 HH:mm:ss'),
      signet: {
        image_url: decodeURIComponent(this.options.image)
      }
    });
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
  },
  onCancel() {
    wx.navigateBack();
  },
  async onConfirm() {
    const { pageNum, book_id, image, stamp_pid } = this.options
    if (!this.data.name) {
      wx.showToast({
        icon: 'none',
        title: '请填写印章名称'
      });
      return;
    }
    // todo location
    await addToPage({
      stamp_pid: stamp_pid,
      from: "webpage",
      book_id: +book_id,
      page_num: +pageNum,
      name: this.data.name,
      image_url: this.data.signet.image_url,
      // todo
      "location": "Beijing",
      "loc_lat": 39.9042,
      "loc_long": 116.4074,
    });

    const ec = this.getOpenerEventChannel();
    ec.emit('refresh');
    wx.navigateBack();

  }
})