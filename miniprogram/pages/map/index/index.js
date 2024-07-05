import * as echarts from '../../../components/ec-canvas/echarts.js';
import geoJson, { type } from './mapData.js';

let myMap = null

const mapData = [
  { name: '北京', itemStyle: { normal: { color: '#ededed' } } },
  { name: '天津', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '上海', itemStyle: {normal: { color: '#e8e8e8' } } },
  { name: '重庆', itemStyle: {normal: { color: '#e1e1e1' } } },
  { name: '河北', itemStyle: {normal: { color: '#f5f5f5' } } },
  { name: '河南', itemStyle: {normal: { color: '#e8e8e8' } } },
  { name: '云南', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '辽宁', itemStyle: { normal: { color: '#e1e1e1' } } },
  { name: '黑龙江', itemStyle: { normal: { color: '#e6e6e6' } } },
  { name: '湖南', itemStyle: { normal: { color: '#e8e8e8' } } },
  { name: '安徽', itemStyle: { normal: { color: '#e6e6e6' } } },
  { name: '山东', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '新疆', itemStyle: { normal: { color: '#e8e8e8' } } },
  { name: '江苏', itemStyle: { normal: { color: '#ededed' } } },
  { name: '浙江', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '江西', itemStyle: { normal: { color: '#e9e9e9' } } },
  { name: '湖北', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '广西', itemStyle: { normal: { color: '#ededed' } } },
  { name: '甘肃', itemStyle: { normal: { color: '#e6e6e6' } } },
  { name: '山西', itemStyle: { normal: { color: '#e6e6e6' } } },
  { name: '内蒙古', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '陕西', itemStyle: { normal: { color: '#ededed' } } },
  { name: '吉林', itemStyle: { normal: { color: '#ededed' } } },
  { name: '福建', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '贵州', itemStyle: { normal: { color: '#e6e6e6' } } },
  { name: '广东', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '青海', itemStyle: { normal: { color: '#e1e1e1' } } },
  { name: '西藏', itemStyle: { normal: { color: '#ededed' } } },
  { name: '四川', itemStyle: { normal: { color: '#e8e8e8' } } },
  { name: '宁夏', itemStyle: { normal: { color: '#ededed' } } },
  { name: '海南', itemStyle: { normal: { color: '#e8e8e8' } } },
  { name: '台湾', itemStyle: { normal: { color: '#e6e6e6' } } },
  { name: '香港', itemStyle: { normal: { color: '#f5f5f5' } } },
  { name: '澳门', itemStyle: { normal: { color: '#f5f5f5' } } }
]

var geoCoordMap = {	//定义自定义图标放置的位置
  '新疆': [86.61 , 40.79],
  '西藏':[89.13 , 30.66],
  '黑龙江':[128.34 , 47.05],
  '吉林':[126.32 , 43.38],
  '辽宁':[123.42 , 41.29],
  '内蒙古':[112.17 , 42.81],
  '北京':[116.60 , 40.40 ],
  '宁夏':[106.27 , 36.76],
  '山西':[111.95,37.65],
  '河北':[115.21 , 38.44],
  '天津':[117.64 , 39.52],
  '青海':[97.07 , 35.62],
  '甘肃':[103.82 , 36.05],
  '山东':[118.01 , 36.37],
  '陕西':[108.94 , 34.46],
  '河南':[113.46 , 34.25],
  '安徽':[117.28 , 31.86],
  '江苏':[120.26 , 32.54],
  '上海':[121.46 , 31.28],
  '四川':[103.36 , 30.65],
  '湖北':[112.29 , 30.98],
  '浙江':[120.15 , 29.28],
  '重庆':[107.51 , 29.63],
  '湖南':[112.08 , 27.79],
  '江西':[115.89 , 27.97],
  '贵州':[106.91 , 26.67],
  '福建':[118.31 , 26.07],
  '云南':[101.71 , 24.84],
  '台湾':[121.01 , 23.54],
  '广西':[108.67 , 23.68],
  '广东':[113.98 , 22.82],
  '海南':[110.03 , 19.33],
  '澳门':[113.54 , 22.19],
  '香港':[114.17 , 22.32],
};

var convertData = function(selectData, data) {
  var res = [];
  data = data.filter((item) => {
    return selectData.indexOf(item.name) > -1
  })
  for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
          res.push(geoCoord);
      }
  }
  return res;
};

const getRegionspData = (selectData = []) => {
  return mapData.map((item) => {
    if (selectData.indexOf(item.name) > -1) {
      item.itemStyle = { normal: { color: '#354c3e' } }
    }
    return item
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {  
    ec: {
      onInit: async (...args) => {
      
        const userInfo = await wx.cloud.callFunction({
          name: 'getOpenId',
        })
        const { openid } = userInfo?.result
        const data = await wx.cloud.callFunction({
          name: 'getBind',
          data: {
            openid
          },
        })
        const selectData = (data?.result?.data || [])
          .map((item) => (item?.product?.province))
          .filter(Boolean)

        await initChartMap(selectData, ...args)
      }
    },

    len: 0,
  },

  onShow: function() {
    this.setTabBar()
    this.onInitData()
  },

  async onInitData() {
    const userInfo = await wx.cloud.callFunction({
      name: 'getOpenId',
    })
    const { openid } = userInfo?.result
    const data = await wx.cloud.callFunction({
      name: 'getBind',
      data: {
        openid
      },
    })
    const selectData = (data?.result?.data || [])
    this.setData({
      len: selectData.length
    })
  },

  setTabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
        isShow: true
      })
    }
  },
})

function initChartMap(selectData, canvas, width, height) {
  myMap = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: 3
  });
  canvas.setChart(myMap);
  echarts.registerMap('china', geoJson); // 绘制中国地图
  const option = {
    grid: {
      top: '0%'
    }, 
    geo: [
      {
        // 地理坐标系组件
        map: "china",
        regions: getRegionspData(selectData),
        roam: false,      // 可以缩放和平移
        aspectScale: 0.8, // 比例
        layoutCenter: ["50%", "38%"], // position位置
        layoutSize: 370,              // 地图大小，保证了不超过 360x360 的区域
        label: {
          // 图形上的文本标签
          normal: {
            show: true,
            textStyle: {
              color: "rgba(0, 0, 0, 0.9)",
              fontSize: '8'
            }
          }
        },
        itemStyle: {
          borderColor: '#898989', // 图形的描边颜色。
          borderWidth: 1, // 描边线宽。为 0 时无描边。
          borderType: 'dashed', // 描边类型。
        }
      }
    ],

    series: [
      {
        type: "scatter",
        roam: false,
        zoom: 1,
        coordinateSystem: "geo",
        data: convertData(selectData, mapData),
        symbol: function () {
          return "image://" + "https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/select.png?sign=45fc85b0cd7261e87426faa8f39a44e5&t=1719297078";
        },
        z: 2,
        symbolSize: [14, 18]
      }
    ]
  };

  myMap.setOption(option);
  return myMap
}
