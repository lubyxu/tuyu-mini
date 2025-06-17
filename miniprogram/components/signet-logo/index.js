// components/signet-logo/index.js
import { getStampPage, getArtInfo, likeTheArt } from '../../service/signet/index'
import loginBehavior from '../../behaviors/login/index'

Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [loginBehavior],
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
    visible: false,
    desc: null,
    like_num: 0,
    is_user_liked: false
  },

  observers: {
    book_id: function (id) {
      if (id) {
        this.getData(id, this.data.page_num)
      }
    },
    page_num: function (pagenum) {
      if (page_num < 0) return
      this.getData(this.data.book_id, pagenum)
    },
    visible: function (val) {
      if (!val) {
        return
      }
      if (this.data.desc) {
        return;
      }
      this.getDescInfo()
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
    },
    async getDescInfo() {
      if (!this.data.artist_info?.id) return
      const data = await getArtInfo(this.data.artist_info?.id)
      this.setData({
        desc: data.description,
        like_num: data.like,
        is_user_liked: data.is_user_liked
      })
    },

    async onLikeTap() {
      if (!this.data.isUserAccount) return
      this.isPending = true
      try {
        const is_like = !this.data.is_user_liked
        await likeTheArt(this.data.artist_info.id, is_like)
        this.setData({
          like_num: (this.data.like_num || 0) + (is_like ? 1 : (-1)),
          is_user_liked: is_like
        })
      }
      catch (e) {}
      finally {
        this.isPending = false
      }
    }
  }
})