import { registerAccount } from '../../utils/auth';
const app = getApp();

// components/notification/index.js
Component({
  properties: {
    count: {
      type: Number,
      value: 0,
    },
    avatar: {
      type: String,
      value: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
    },
    nickName: {
      type: String,
      value: '小福鱼',
    },
    hasbind: {
      type: Boolean,
      value: false,
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
    onChooseAvatar(data) {
      const { avatarUrl } = data.detail;
      this.setData({
        avatar: avatarUrl,
      })
    },

    onNicknameChange(e) {
      console.log(e)
      const { value } = e.detail;
      this.setData({
        nickName: value,
      })
    }
  },
})