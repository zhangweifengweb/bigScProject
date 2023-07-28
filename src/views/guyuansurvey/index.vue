<template>
  <div class="main_content">
    <p class="top">
      <span>{{ timeText }}</span>
      <span>{{ weather }}</span>
    </p>
    <left-part :initData1="initDataLeftUp" :initData2="initDataLeftDown" />
    <center-part :initData="initDataCenter" />
    <right-part :initData="initDataRight" />
  </div>
</template>
<script>
import axios from "axios";
import leftPart from "./components/leftPart";
import rightPart from "./components/rightPart";
import centerPart from "./components/centerPart";
export default {
  name: "",
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
      initData: {},
      initDataCenter: {},
      initDataLeftUp: {},
      initDataLeftDown: {},
      initDataRight: {},
      // initDataCenter: {},
    };
  },
  created() {
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
    this.socketApi.initWebSocket("供电公司概况", this.getConfigResult);
    this.$store.state.navTitle = "固原供电公司配网概况";
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    getConfigResult(val) {
      // console.log(val, "通了吗？")
      // this.socketApi.initWebSocket("供电公司概况", this.getConfigResult);
      if (val.code == 200) {
        this.init();
      }
    },
    init() {
      this.$store.dispatch("init", { url: "/gsgk" }).then((res) => {
        // console.log("resres", res);
        if (res.code == 200) {
          let alldata = res.data;
          this.initDataCenter = alldata.screenMiddleTarget;
          this.initDataLeftUp = alldata.screenLeftUpTarget;
          this.initDataLeftDown = alldata.screenLeftDownTarget;
          this.initDataRight = alldata.screenRightUpTarget;
        }
      });
      // axios.get("/JBTSHJ/GuYuanScreen/getScreenById/gsgk").then((res) => {
      //   if (res.status == 200) {
      //     if (res.data.code == 200) {
      //       let alldata = res.data.data;
      //       // console.log("所有数据", alldata);
      //       this.initDataCenter = alldata.screenMiddleTarget;
      //       this.initDataLeftUp = alldata.screenLeftUpTarget;
      //       this.initDataLeftDown = alldata.screenLeftDownTarget;
      //       this.initDataRight = alldata.screenRightUpTarget;
      //       // this.initDataRightDown = alldata.screenRightDownTarget;
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
  background: url("/image/guyuansurvey/bg.png") no-repeat;
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
