// components/path-note-list/spot/index.js
import { checkPath } from '../../../service/path-note/path-detail';

function validatePos(source, target) {
  const x = Math.abs(source.longitude, target.longitude);
  const y = Math.abs(source.latitude, target.latitude);

  return Math.pow(x, 2) + Math.pow(y, 2) < 2;
}

Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    place_id: String,
    user_path_id: String,
    image: String,
    name: String,
    checked: Boolean,
    c_visited: String,
    content_info: Object,
    plain_text: String,
    product_ids: Array,
    product_map: Object,
    location: String,
    isUserPath: Boolean,
    loc_lat: Number,
    loc_long: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked: false,
    productModal: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPrivilege(e) {
      const info = e.target.dataset.info;
      this.triggerEvent('onPrivilege', info);
    },
    onImageClick(e) {
      const index = e.detail.index;
      this.triggerEvent('onImageClick', { index, images: this.data.content_info.image_points });
    },
    async onChecked(e) {
      const location = await wx.getLocation();
 
      const { longitude, latitude } = location;
      const target = { longitude: this.data.loc_long, latitude: this.data.loc_lat };
      if (!validatePos({ longitude, latitude }, target)) {
        wx.showToast({
          icon: 'none',
          title: '打卡失败，检测到不在附近'
        });
        return;
      }

      if (this.pending) return;
      this.pending = true;
      try {
        await checkPath({ place_id: this.data.place_id, user_path_id: this.data.user_path_id });
        this.setData({
          isChecked: true
        });
      }
      catch (e) {
        this.pending = false;
      }
    },
    onClickProduct(e) {
      const id = e.currentTarget.dataset.info;
      const item = this.data.product_map[id];
      console.log(item);
      // todo @ zhangyiyuan
      const type = item.type;
      if (type === 1) {
        wx.navigateTo({
          url: '/pages/detail/index?id=' + id,
        });
      }
      else {
        this.setData({
          productModal: {
            item
          }
        });
      }
    },
    onClose() {
      this.setData({
        productModal: false,
      })
    },
    onSpotGoTo() {
      const mp = wx.createMapContext('myPageMap');
      mp.openMapApp({
        longitude: this.data.loc_long,
        latitude: this.data.loc_lat,
        destination: this.data.location,
        success: function (res) {
          console.log('-- success',)
        },
        fail: function () {
          console.log('error');
          wx.showToast({
            icon: 'none',
            title: '调起地图应用失败'
          });
        },
        complete(res) {
          console.log(res)
        }
      })
    }
  }
})