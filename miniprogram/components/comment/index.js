// components/auth-guard/index.js
Component({
  data: {
    comments: [],
  },

  ready: function () {
    const comments = [{
      nickname: "张三",
      avatar: "https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png",
      source: 4,
      time: '12-9',
      location: "北京",
      commment: "我是评论我是评论我是评论我是评论我是评论我是评论",
      childrens: [{
        nickname: "张三",
        parent: "张三",
        avatar: "https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png",
        time: '12-9',
        location: "北京",
        commment: "我是评论我是评论我是评论我是评论我是评论我是评论",
      }, {
        nickname: "张三",
        avatar: "https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png",
        time: '12-9',
        location: "北京",
        commment: "我是评论我是评论我是评论我是评论我是评论我是评论",
      }]
    }]
    this.setData({
      comments: comments,
    })
  },
})