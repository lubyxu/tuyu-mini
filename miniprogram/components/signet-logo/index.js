// components/signet-logo/index.js
import { getStampPage } from '../../service/signet/index'
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    book_id: String,
    page_num: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    artist_info: null,
    company_info: null,
    visible: false
  },

  observers: {
    book_id: function (id) {
      if (id) {
        this.getData(id, this.data.page_num)
      }
    },
    page_num: function (pagenum) {
      this.getData(this.data.book_id, pagenum)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getData(book_id, page_num) {
      const data = await getStampPage(+book_id, +page_num)
      this.setData({
        artist_info: data.artist_info,
        company_info: data.company_info
      })
    },
    onArtTap() {
      this.setData({
        visible: true,
      })
    },
    onClose() {
      this.setData({
        visible: false
      })
    }
  }
})