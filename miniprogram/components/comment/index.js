// components/auth-guard/index.js
Component({
  properties: {
    comments: {
      type: [Object],
      value: [],
    }
  },

  methods: {
    replyComment(e) {
      const replyId = e.currentTarget.dataset.id;
      console.log("replyId", replyId)
      this.triggerEvent('replyComment', replyId);
    }
  }
})