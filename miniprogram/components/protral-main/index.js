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

  methods: {
    async updateUserInfo() {
      const { avatar, nickname } = this.data;
      try {
        const data = await request({
          method: 'POST',
          url: '/fuyu/updateuser',
          data: {
            avatar,
            nick_name: nickname,
          },
        });
        console.log('data', data)
      } catch(err) {
        wx.showToast({
          title: '更新失败',
          icon: 'error',
        })
      }
    },

    async onChooseAvatar(data) {
      const { avatarUrl } = data.detail;
      const res = await uploadPhotos({ filePath: avatarUrl, path: `avatar/${app?.globalData?.user?.token}.jpg` })
      this.setData({
        avatar: res.filePath,
      })
      this.updateUserInfo()
    },

    onNicknameChange(e) {
      const { value } = e.detail;
      this.setData({
        nickname: value,
      })
      this.updateUserInfo()
    }
  },
})