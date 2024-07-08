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
    },
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuBotton: app.globalData.menuBotton,
        menuHeight: app.globalData.menuHeight,
        menuTop: app.globalData.menuTop,
    },
    attached: function() {},
    methods: {
        switchTab() {
            wx.switchTab({
                url: '/pages/home/index',
            })
        },
    }
})