// components/path-note-list/spot/index.js
Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    image: String,
    name: String,
    checked: Boolean,
    c_visited: String,
    content_info: Object,
    plain_text: String,
    product_ids: Array,
    product_map: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

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
    }
  }
})