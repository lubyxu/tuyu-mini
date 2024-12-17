import dayjs from 'dayjs';
import { addToPage, getBookInfo } from '../../service/signet/index';
import loginBehavior from '../../behaviors/login/index';
import { getProductDetail } from '../../service/product/index';
const chooseLocation = requirePlugin('chooseLocation');
Page({
  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    stamp_pid: 0,
    owned: false,
    bgImage: '',
    signet: {},
    name: '',
    time: '',
    timeStr: '',
    location: {
      name: '背景那嘎达',
      loc_lat: 39.9042,
      loc_long: 116.4074
    },

    isEdit: false,
    modalValue: '',
    pageError: false
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
    const date = dayjs();
    if (this.options.book_id) {
      const data = await getBookInfo(this.options.book_id);
      const bookInfo = data.BookInfo;
      const bookConfig = bookInfo.content.book_config;
      this.setData({
        bgImage: bookConfig.page_bg_img,
        timeStr: date.format('YYYY年YY月DD日 HH:mm:ss'),
        signet: {
          image_url: decodeURIComponent(this.options.image)
        }
      });
    }

    if (this.options.stamp_pid) {
      const data = await getProductDetail(this.options.stamp_pid, this.options.key);
      // 如果返回的商品type 不是2，就报个错，提示无效二维码  1-正经文创  2-印章 3印章本
      if (data.product_info.type !== 2) {
        wx.showToast({
          icon: 'error',
          title: '提示无效二维码',
        });

        this.setData({
          pageError: true
        });
        return;
      }
      const bookInfo = data.product_info;
      const bookConfig = bookInfo.content.book_config;
      this.setData({
        owned: data.owned,
        stamp_pid: this.options.stamp_pid,
        name: bookInfo.name,
        bgImage: bookConfig.page_bg_img,
        time: date.unix(),
        timeStr: date.format('YYYY年YY月DD日 HH:mm:ss'),
        signet: {
          image_url: bookInfo.show_image
        }
      });

    }
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
    if (!this.data.isUserAccount) return;
    const { pageNum, book_id, image, stamp_pid } = this.options
    if (!this.data.name) {
      wx.showToast({
        icon: 'none',
        title: '请填写印章名称'
      });
      return;
    }
    if (stamp_pid) {
      wx.navigateTo({
        url: '/pages/signet-move/index?stamp_pid=' + stamp_pid,
        success: (res) => {
          res.eventChannel.emit(
            'stampInfo',
            {
              location: this.data.location,
              name: this.data.name,
              time: this.data.time,
              image_url: this.data.signet.image_url,
              stamp_pid: this.options.stamp_pid,
            }
          );
        }
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

  },
  async onRegisterAndRefresh(e) {
    await this.onRegister(e);
    this.initValue();
  }
})