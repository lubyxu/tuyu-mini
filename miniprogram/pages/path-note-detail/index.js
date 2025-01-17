// pages/path-note-detail/index.js
import { getPathDetail, deleteUserPath, addUserPath, getComments } from '../../service/path-note/path-detail';
import loginBehavior from '../../behaviors/login/index';
import { getUser } from "../../utils/auth";
import { formatUnixTime } from "../../utils/index";
const app = getApp();

Page({
  options: {
    addGlobalClass: true
  },
  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    user_path_id: 0,
    path_id: 0,
    path_info: {},
    place_details: [],
    product_map: [],
    place_visited: {},
    modal: null,
    btnClass: 'fixed',
    isUserPath: false,
    hasUserPath: false,
    fin_place_count: 0,
    markers: [],
    expire: false,
    showSelfShare: false,
    commentsVisible: false,
    commentsTotal: 0,
    comments: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.options = options;
    console.log('this.options', this.options)
    if (this.options.from === 'mine') {
      this.setData({
        showSelfShare: true
      });
      if (!app.globalData?.user?.token) {
        await getUser()
      }
      this.getDetail({ user_path_id: options.userPathId, from: this.options.from });
      return
    }
    if (!this.data.isLogined) return;
    this.getDetail({ user_path_id: options.user_path_id, path_id: options.path_id});
  },

  customReturn() {
    if (this.data.commentsVisible) {
      this.setData({
        commentsVisible: false
      })
      return
    }
    wx.navigateBack({
      delta: 1,
    })
  },

  onLogined() {
    const options = this.options;
    this.getDetail({ user_path_id: options.user_path_id, path_id: options.path_id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getComments();
    const options = this.options;
    if (!this.data.isLogined) return;
    this.getDetail({ user_path_id: options.user_path_id, path_id: options.path_id});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    const pages = getCurrentPages();
    const length = pages.length;
    if (length === 2 && this.needRefreshList) {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('refresh');
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  getComments() {

  },

  convertToTree(flatArray, _parentId = 0) {
    const formatComment = (item, parent = {}) => {
      return {
        ...item,
        nickname: parent.id ? `${item.nickname} 回复 ${parent.nickname}` : item.nickname,
        avatar: item.avatar || 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
        source: item.start,
        time: formatUnixTime(item.update_time, 'MM-DD'),
        location: "北京",
        commment: item.content,
      }
    }

    const idMap = {};
    const tree = [];
    flatArray.forEach(item => {
        idMap[item.id] = {
          ...item,
            children: []
        };
    });
    flatArray.forEach((item) => {
      let parent = idMap[item.reply_to];
      if (parent) {
        idMap[item.id].parent = parent
        while(parent.parent) {
          parent = parent.parent;
        }
        parent.children.push(formatComment(idMap[item.id], parent));
      } else {
        tree.push(formatComment(idMap[item.id]));
      }
    });

    // 防止死循环
    tree.map((item) => {
      if (item.children?.length > 0) {
        item.children.map((children) => {
          delete children.parent
          return children
        })
        return item
      }
    })
    return tree;
  },

  /**
   * 用户点击右上角分享
   */
  async getComments() {
    const path_id = this.options.path_id / 1;
    try {
      const { comments, total } = await getComments(path_id)
      const formatComments = this.convertToTree(comments)
      console.log('formatComments', formatComments);
      this.setData({
        comments: formatComments,
        commentsTotal: total
      })
    } catch (err) {
      console.log('err', err)
      wx.showToast({
        title: '获取评论失败',
        icon: 'error',
      })
    }
  },
  onShareTimeline(res) {
    const path_info = this.data.path_info;
    return {
      title: path_info.group_name + '|' + path_info.name,
      query: `path_id=${this.data.path_info.path_id}&from=${this.options.group_id}&userPathId=${this.data.user_path_id}`,
      imageUrl: this.data.path_info.images[0],
    }
  },
  onPageScroll(e) {
    const scrollTop = e.scrollTop;
    if (scrollTop > 10 && this.data.btnClass === 'fixed') {
      this.setData({
        btnClass: 'moving'
      });

      setTimeout(() => {
        this.setData({
          btnClass: 'done'
        });
      }, 1 * 1000);
    }
  },
  async getDetail({ user_path_id, path_id, from }) {
    const data = await getPathDetail({ user_path_id, path_id, from });
    const { path_detail_info, place_visited, place_reservation } = data;
    this.setData({
      user_path_id: user_path_id || path_detail_info.user_path_id,
      path_id: path_id,
      path_info: path_detail_info.path_info,
      place_details: path_detail_info.place_details.map((item) => ({
        ...item,
        visited: place_visited?.[item.place_id],
        showOrderBtn: place_reservation[item.place_id].is_required,
        orderStatus: place_reservation[item.place_id].user_reserv_id === 0 ? 0 : 1 // user_reserv_id=0未预约， user_reserv_id>0已预约
      })),
      product_map: path_detail_info.product_map,
      products: path_detail_info.path_info.product_ids.map(id => {
        return path_detail_info.product_map[id]
      }),
      place_visited,
      isUserPath: !!user_path_id,
      hasUserPath: !!path_detail_info.user_path_id,
      fin_place_count: !!user_path_id ? Object.values(place_visited || {}).filter(Boolean).length : 0,
      expire: path_detail_info.path_info.status === 2,
    });

    this.setMarkers();
  },
  onPrivilege(e) {
    const info = e.detail;
    this.setData({
      modal: {
        type: 'privilege',
        props: {
          desc: info.details
        }
      }
    });
  },
  onModalClose(e) {
    this.setData({
      modal: null
    });
  },
  onImageClick(e) {
    const detail = e.detail;
    if (!detail.images || !detail.images.length) {
      return;
    }
    this.setData({
      modal: {
        type: 'place-images',
        props: {
          images: detail.images,
          index: detail.index
        }
      }
    });
  },
  async onRegisterAndAddToPlan(e) {
    await this.onRegister(e);
    this.onAddToPlan();
  },
  async onAddToPlan() {
    const user_path_id = await addUserPath(this.data.path_id);
    this.setData({
      user_path_id,
      isUserPath: false,
      hasUserPath: true
    });
    wx.navigateTo({
      url: `/pages/path-note-detail/index?user_path_id=${user_path_id}&path_id=${this.data.path_id}`,
    });
  },
  goToMyPlan() {
    const data = this.data;
    wx.navigateTo({
      url: `/pages/path-note-detail/index?user_path_id=${data.user_path_id}&path_id=${data.path_id}`,
    });
  },
  onClick() {
    wx.showModal({
      title: '删除本次计划',
      content: '确认要删除吗？',
      success: async () => {
        await deleteUserPath(this.data.user_path_id);
        this.needRefreshList = true;
        wx.navigateBack();
      },
    })
  },
  onSpotChecked(e) {
    this.setData({
      fin_place_count: this.data.fin_place_count + 1
    });
    this.needRefreshList = true;
  },
  onGotoMap() {
    const { user_path_id, path_id } = this.data;
    const query = [
      `path_id=${path_id}`,
      user_path_id ? `user_path_id=${user_path_id}` : ''
    ].filter(Boolean);
    wx.navigateTo({
      url: `/pages/scenic-map/index?${query.join('&')}`
    });
  },

  setMarkers() {
    const { place_visited = {}, place_details } = this.data;
    const ret = place_details.map(place => ({
      id: place.place_id,
      customCallout: { display: 'ALWAYS' },
      icon: place.image,
      longitude: place.loc_long,
      latitude: place.loc_lat,
      register: place_visited[place.place_id],
      title: place.name
    }));
    this.setData({
      markers: ret
    });
  },
  // onShare() {
  //   wx.showShareMenu({
  //     withShareTicket: true,
  //     menus: ['shareAppMessage', 'shareTimeline'],
  //     success(res) {
  //       console.log('---rest', res);
  //     },
  //     fail(e) {
  //       console.log('--e', e);
  //     }
  //   });
  // }

  showComments() {
    this.setData({
      commentsVisible: true
    })
  },

  replyComment(info) {
    const reply_to = info.detail
    this.addComment(reply_to)
  },

  addComment(reply_to = 0) {
    wx.navigateTo({
      url: `/pages/ranking/index?path_id=${this.data.path_id}&reply_to=${reply_to}`,
    });
  },
})