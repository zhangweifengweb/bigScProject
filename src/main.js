import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as echarts from "echarts";
import "./axios.config.js";
import BaiduMap from "vue-baidu-map";
import highcharts from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import highcharts3d from "highcharts/highcharts-3d";
import * as socketApi from "./utl/socket";
// import pyramid3d  from  'highcharts/modules/pyramid3d';
// import stockInit from 'highcharts/modules/stock';
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import animated from "animate.css"; // npm install animate.css --save安装，在引入
// 导入图片预加载方法以及图片列表
import { imgsPreloader } from "./utl/imgPreloader.js";
import imgPreloaderList from "./utl/imgPreloaderList.js";

import Carousel3d from "vue-carousel-3d";

import VueLazyload from "vue-lazyload";
import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");

Vue.use(VideoPlayer);
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "../image/error.png",
  loading: "../image/loading.gif",
  attempt: 1,
});

Vue.use(Carousel3d);

Vue.use(animated);

Vue.use(VueAwesomeSwiper);

Vue.use(HighchartsVue);

highcharts3d(highcharts);

Vue.use(BaiduMap, {
  ak: "90nbTDv5T7pTzRmtNS5esDdBv1S2pAM5",
});
Vue.prototype.socketApi = socketApi;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

(async () => {
  await imgsPreloader(imgPreloaderList);
  //关闭加载弹框
  document.querySelector(".loading").style.display = "none";
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
})();
