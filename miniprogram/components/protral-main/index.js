import { registerAccount } from '../../utils/auth';
import { request } from '../../utils/req';
import { uploadPhotos } from '../../utils/upload.js'

const app = getApp();

// components/notification/index.js
Component({
  properties: {
    readOnly: {
      type: Boolean,
      value: false,
    },
    avatar: {
      type: String,
      value: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
    },
    nickname: {
      type: String,
      value: '小福鱼',
    },
  },

  data: {
    currentAvatar: '',
    currentNickname: '',
  },

  observers: {
    'avatar': function() {
      this.setDefaultUserInfo()
    }
  },

  ready() {
    this.setDefaultUserInfo()
  },


  methods: {

    setDefaultUserInfo() {
      const { avatar, nickname } = this.properties;
      this.setData({
        currentAvatar: avatar,
        currentNickname: nickname,
      })
    },
    async updateUserInfo() {
      const { currentAvatar, currentNickname } = this.data;
      try {
        const data = await request({
          method: 'POST',
          url: '/fuyu/updateuser',
          data: {
            avatar: this.avatar,
            nick_name: currentNickname,
          },
        });
      } catch(err) {
        wx.showToast({
          title: '更新失败',
          icon: 'error',
        })
      }
    },

    async onChooseAvatar(data) {
      const { avatarUrl } = data.detail;
      this.setData({
        currentAvatar: avatarUrl
      })
      const res = await uploadPhotos({ filePath: avatarUrl, path: `avatar/${app?.globalData?.user?.token}.jpg` })
      this.avatar = res.filePath
      this.updateUserInfo()
    },

    onNicknameChange(e) {
      const { value } = e.detail;
      this.setData({
        currentNickname: value,
      })
      this.updateUserInfo()
    }
  },
})