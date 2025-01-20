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
    stamp_count: 0,
    rel_path_id: 0,
    signet: {},
    stamp_info: {},
    copy_config: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('options :>> ', options);
    this.options = options;
  },
  onLogined() {
    this.initValue();
  },

  async initValue() {
    const { stamp_info, user_info, stamp_count, book_config, rel_path_id, copy_config } = await getSharePageInfo(this.options.user_stamp_id);
    this.stamp_pid = stamp_info.stamp_pid;
    this.setData({
      copy_config,
      stamp_info,
      name: stamp_info.name,
      location: stamp_info.location,
      timeStr: dayjs(stamp_info.create_time * 1000).format('YYYY年MM月DD日 HH:mm:ss'),
      nickName: user_info.nickname,
      stamp_count,
      rel_path_id,
      avatar: user_info.avatar || 'http://vibktprfx-prod-prod-damo-eas-cn-shanghai.oss-cn-shanghai.aliyuncs.com/seg-common-image/2024-12-27/5fc8fae4-5a4f-4ceb-b69c-aa5f8e656ce0/image.png?Expires=1735305425&OSSAccessKeyId=LTAI4FoLmvQ9urWXgSRpDvh1&Signature=fkSz5W2Gz9rEyT0uqcCGNC3Qkn4%3D',
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
  },
  onAccept(e) {
    if (!this.data.isUserAccount) return;

    wx.navigateTo({
      url: `/pages/signet-add-page/index?stamp_pid=${this.stamp_pid}&key=copy`,
      events: {
        refresh: () => {
          this.initValue();
        }
      }
    });
  },
  async onRegisterAndAccept(e) {
    await this.onRegister(e);
    setTimeout(() => {
      this.onAccept();
    }, 10);
  }
})