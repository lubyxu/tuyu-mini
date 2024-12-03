import { addToPage } from '../../../service/signet/index';
import { chooseImage, uploadPhotos } from '../../../utils/upload';

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    pageNum: Number,
    signetSrc: {
      type: String,
      value: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/user-photos/4/4/4/1733237670470/1733237670470.jpg'
    },
    bgImage: String,
    time: String,
    location: Object,
    title: String,
  },

  lifetimes: {
    attached: function () {
      console.log('--', this.data)
    }
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
    async onUpload() {
      const files = await chooseImage();
      const data = await uploadPhotos({
        filePath: files[0].tempFilePath,
        id: +Date.now(),
        productId: this.data.book.book_id,
      });
      const signetSrc = data.filePath;
      this.setData({
        signetSrc
      });
    },
    addToPage() {
      // await addToPage({
      //   page_num: this.data.pageNum,
      //   book_id: this.data.book.book_id,
      //   image_url: signetSrc,
      // });
    },
    onScan() { },
    async onMapOpen() {
      
    }
  }
});