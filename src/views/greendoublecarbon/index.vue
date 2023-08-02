<template>
  <div class="main_content">
    <p class="top">
      <span>{{ timeText }}</span>
      <span>{{ weather }}</span>
    </p>
    <left-part :initData="initDataLeft" />
    <center-part :initData="initDataCenter" />
    <right-part :initData1="initDataRightUp" :initData2="initDataRightDown" />
  </div>
</template>
<script>
import axios from "axios";
// import ReconnectingWebSocket from "reconnecting-websocket";
// import mixinWebSocket from "./mixins/common.js";
import leftPart from "./components/leftPart";
import rightPart from "./components/rightPart";
import centerPart from "./components/centerPart";
export default {
  name: "",
  // mixins: [mixinWebSocket],
  components: {
    leftPart,
    rightPart,
    centerPart,
  },
  data() {
    return {
      city: "固原",
      weather: "",
      timeText: "",
      timer: null,
      initDataCenter: {},
      initDataLeft: {},
      initData: {},
      initDataRightUp: {},
      initDataRightDown: {},
      server: "ws://172.16.226.101:18128/websocket/绿色双碳",
      // http://172.16.226.101:18128/GuYuanScreen/getScreenById/绿色双碳
      socket: null,
    };
  },
  created() {
    // this.initConn();
    this.getWeather();
    this.time();
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.time();
      }, 1000 * 60);
    } else {
      clearInterval(this.timer);
    }
    this.init();
    this.$store.state.navTitle = "固原供电公司绿色双碳行动";

    // this.socketApi.initWebSocket("绿色双碳");
    this.socketApi.initWebSocket("绿色双碳", this.getConfigResult);
  },
  destroyed() {
    clearInterval(this.timer);
    // this.socket.onclose = this.close();
  },
  methods: {
    getConfigResult(val) {
      // console.log("数据返回", val);x
      if (val.code == 200) {
        this.init();
      }
    },
    // initConn() {
    //   let socket = new ReconnectingWebSocket(this.server); //创建Socket实例
    //   this.socket = socket;
    //   this.socket.onopen = this.OnOpen;
    //   this.socket.onerror = this.OnError;
    //   this.socket.onmessage = this.OnMessage;
    // },
    // OnOpen() {
    //   console.log("链接成功！");
    //   // let mes = {
    //   //   screenName: "绿色双碳",
    //   // };
    //   // this.socket.send(JSON.stringify(mes));
    // },
    // OnError() {
    //   console.log("链接错误");
    // },
    // OnMessage(e) {
    //   // const redata = JSON.parse(e.data);
    //   if (e.data != "连接已建立成功") {
    //     // console.log(JSON.parse(e.data), "看看是啥？");
    //     if (JSON.parse(e.data).code == 200) {
    //       return "seccess";
    //     }
    //   }
    // },
    // close() {
    //   console.log("socket已经关闭");
    // },
    init() {
      this.$store.dispatch("init", { url: "/lsst" }).then((res) => {
        // console.log("resres", res);
        if (res.code == 200) {
          let alldata = res.data;
          // console.log("所有数据", alldata);
          this.initDataCenter = alldata.screenMiddleTarget;
          this.initDataLeft = alldata.screenLeftUpTarget;
          // this.initDataLeftDown = alldata.screenLeftDownTarget;
          this.initDataRightUp = alldata.screenRightUpTarget;
          this.initDataRightDown = alldata.screenRightDownTarget;
        }
      });
      // axios.get("/JBTSHJ/GuYuanScreen/getScreenById/lsst").then((res) => {
      //   if (res.status == 200) {
      //     if (res.data.code == 200) {
      //       let alldata = res.data.data;
      //       // console.log("所有数据", alldata);
      //       this.initDataCenter = alldata.screenMiddleTarget;
      //       this.initDataLeft = alldata.screenLeftUpTarget;
      //       // this.initDataLeftDown = alldata.screenLeftDownTarget;
      //       this.initDataRightUp = alldata.screenRightUpTarget;
      //       this.initDataRightDown = alldata.screenRightDownTarget;
      //     }
      //   }
      // });
    },
    //   获取天气
    getWeather() {
      this.$store.dispatch("getWeather", { city: this.city }).then((res) => {
        console.log(JSON.parse(res).data.forecast[0]);
        if (JSON.parse(res).data) {
          let obj = JSON.parse(res).data.forecast[0];
          this.weather = `${obj.type} ${obj.fengxiang}${
            obj.fengli.split("[")[2].split("]")[0]
          } ${obj.low}${obj.high}`;
        }
      });
    },
    time() {
      let vWeek, vWeek_s, year, month, day, hour, min;
      vWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
      vWeek_s = date.getDay() ? vWeek[date.getDay()] : "-";
      hour = date.getHours();
      min =
        date.getMinutes().toString().length < 2
          ? "0" + date.getMinutes()
          : date.getMinutes();
      this.timeText = `${year}年${month}月${day}日 ${vWeek_s} ${hour}:${min}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.main_content {
  height: 1080px;
  width: 5760px;
  background: url("/image/animationKeyFramesBg/greendoublecarbon_bg.png")
    no-repeat;
  background-size: cover;
  .top {
    color: #b1caea;
    font-size: 23px;
    top: 49px;
    right: 77px;
    position: absolute;
    span:nth-of-type(2) {
      margin-left: 70px;
    }
  }
}
</style>
