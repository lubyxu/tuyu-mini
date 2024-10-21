const app = getApp()
Component({
    properties: {
        // defaultData（父页面传递的数据-就是引用组件的页面）
        title: {
            type: String,
            observer: function(newVal, oldVal) {}
        },
        className: {
            type: String,
            observer: function(newVal, oldVal) {}
        },
        showBack: {
            type: Boolean,
            observer: function(newVal, oldVal) {}
        },
    },
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuBotton: app.globalData.menuBotton,
        menuHeight: app.globalData.menuHeight,
        menuTop: app.globalData.menuTop,
        showHome: false,
    },
    attached: function() {},
    ready() {
        debugger
        console.log('navigation-bar ready', this.properties.showBack)
        if (!this.properties.title && !this.properties.showBack) {
            this.setData({
                showHome: true
            })
        }
    },
    methods: {
        switchTab() {
            wx.switchTab({
                url: '/pages/home/index',
            })
        },
    }
})