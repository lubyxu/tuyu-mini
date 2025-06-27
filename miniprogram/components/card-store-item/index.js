import { registerAccount } from '../../utils/auth';
import { request } from '../../utils/req';
const app = getApp();

// components/notification/index.js
Component({
  properties: {
    activity_type: {
      type: Number,
      value: 3
    }
  },
  data: {
    list: []
  },

  ready: function () {
    this.onInit()
  },

  methods: {
    async onInit() {
      console.log('onInit')
      const { data } = await request({
        method: 'POST',
        url: '/fuyu/activity/list',
        data: {
          activity_type: this.properties.activity_type,
        }
      });
      this.setData({
        list: data || [],
      });
    },

    async onItemClick(event) {
      const idx = event.currentTarget.dataset.id
      const name = event.currentTarget.dataset.name
      wx.navigateTo({
        url: `/pages/store-list/index?activity_id=${idx}&name=${name}`,
      });
    },

  },
})