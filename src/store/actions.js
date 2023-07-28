/* eslint-disable */
export default {
  getWeather: function ({ commit }, param) {
    return new Promise((resolve) => {
      $axios
        .get(`http://wthrcdn.etouch.cn/weather_mini?city=${param.city}`)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  // 初始化页面数据 
  init: function ({ commit }, param) {
    return new Promise((resolve) => {
      $axios
        .get(`/JBTSHJ/GuYuanScreen/getScreenById${param.url}`)
        .then((response) => {
          resolve(JSON.parse(response.data));
        });
    });
  },
};
