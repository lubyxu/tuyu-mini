import { registerAccount } from '../../utils/auth';
import { request } from '../../utils/req';

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
    bind: false
  },

  ready() {
    if (this.properties.hasbind) {
        this.setData({
          hasbind: true
        })
    }
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
        console.log('更新用户信息成功')
      } catch(err) {
        console.log('更新用户信息失败')
      }
    },

    onChooseAvatar(data) {
      const { avatarUrl } = data.detail;
      this.setData({
        avatar: avatarUrl,
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