const app = getApp()
import { getUser } from '../../utils/auth'
import { request, SUCCESS_CODE } from '../../utils/req';

Page({
  async onReady() {
    // this.getInitData()
  },

  data: {
    showLoading: false,
    navBarHeight: app.globalData.navBarHeight,
    customStyle: {
      card: {
        'background-color': '#FAFAFA',
      }
    },
    list: [{
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }, {
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }, {
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }, {
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }, {
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }, {
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }, {
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }, {
      appid: 'wxa8be24a874298873',
      productId: '10000157997634'
    }]
  },

  async getInitData() {
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    try {
      const { data, errno } = await request({
        method: 'POST',
        url: '/fuyu/product/list',
        data: {
          province: "",
          type: 3,
        }
      });

      if (SUCCESS_CODE != errno) {
        wx.showToast({
          icon: 'error',
          title: '调用失败，请重试',
        })
        return
      }

      const list = data?.list.map(({ shop_config }) => {
        return {
          appid: shop_config.app_id,
          productId: shop_config.item_code
        }
      })
      console.log('list', list)

      // this.setData({ showLoading: false, list })
      this.setData({ showLoading: false })

    } catch (error) {
      this.setData({ showLoading: false })
      wx.showToast({
        icon: 'error',
        title: '调用失败，请重试',
      })
      console.log('error', error)
    }
  },
});
