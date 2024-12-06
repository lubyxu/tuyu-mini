// components/path-note-list/spot/index.js
import { checkPath } from '../../../service/path-note/path-detail';

function validatePos(source, target) {
  return getDistance(source.latitude, source.longitude, target.latitude, target.longitude) < 5;
}

const EARTH_RADIUS = 6378.137;// 地球半径,单位千米
//将角度换算成弧度
function rad(d) {
	return d * Math.PI / 180.0;
}
/**
* 用来比较是否在规定考勤范围
* @param lat1第一个纬度
* @param lng1第一个经度
* @param lat2第二个纬度
* @param lng2第二个经度
* @return 两个经纬度的距离（km）
*/
function getDistance(lat1, lng1, lat2, lng2) {
    const radLat1 = rad(lat1);
    const radLat2 = rad(lat2);
    const a = radLat1 - radLat2;
    const b = rad(lng1) - rad(lng2);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    //此处加上double类型转换是因为对于在几百的距离差值之前计算为0，无法达到预期效果
    s = Math.round(s * 10000) / 10000;
    s = s * 10000/ 10000;
    return s;
}

Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    c_visited: String,
    content_info: Object,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPrivilege(e) {
      const info = e.target.dataset.info;
      this.triggerEvent('onPrivilege', info);
    },
  }

})