import loginBehavior from '../../behaviors/login/index';
import { getSharePageInfo } from '../../service/signet/index';
import dayjs from 'dayjs';
Page({
  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    bgImage: '',
    name: '',
    avatar: '',
    timeStr: '',
    location,
    nickName: '',
    doneCount: 0,
    stamp_count: 0,
    rel_path_id: 0,
    signet: {},
    stamp_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.options = options;
    if (!this.data.isLogined) return;
    this.initValue();
  },
  onLogined() {
    this.initValue();
  },

  async initValue() {
    const { stamp_info, user_info, stamp_count, book_config, rel_path_id } = await getSharePageInfo(this.options.user_stamp_id);
    this.setData({
      stamp_info,
      name: stamp_info.name,
      location: stamp_info.location,
      timeStr: dayjs(stamp_info.create_time * 1000).format('YYYY年MM月DD日 HH:mm:ss'),
      nickName: user_info.nickname,
      stamp_count,
      rel_path_id,
      bgImage: book_config.page_bg_img,
      signet: {
        image_url: stamp_info.image_url
      }
    })
  },
  onGoto() {
    wx.navigateTo({
      url: '/pages/path-note-detail/index?path_id=' + this.data.rel_path_id,
    });
  }
})