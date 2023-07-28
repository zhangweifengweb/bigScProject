<template>
  <div class="main_content">
    <div class="main_content_in">
      <div class="main_content_mask">
        <p class="top">
          <span>{{ timeText }}</span>
          <span>{{ weather }}</span>
        </p>
        <left-part :initData="initData" />
        <center-part :initData="initDataCenter" />
        <right-part :initData="initDataRight" />
      </div>
    </div>
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
      initDataRight: {},
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
    this.socketApi.initWebSocket("供电服务指挥中心", this.getConfigResult);
    this.$store.state.navTitle = "固原供电服务指挥中心";
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
      this.$store.dispatch("init", { url: "/gdfwzhzx" }).then((res) => {
        // console.log("resres", res);
        if (res.code == 200) {
          let alldata = res.data;
          // console.log("所有数据", alldata);
          this.initDataCenter = alldata.screenMiddleTarget;
          this.initDataRight = alldata.screenRightUpTarget;
        }
      });
      // axios.get("/JBTSHJ/GuYuanScreen/getScreenById/gdfwzhzx").then((res) => {
      //   if (res.status == 200) {
      //     if (res.data.code == 200) {
      //       let alldata = res.data.data;
      //       // console.log("所有数据", alldata);
      //       this.initDataCenter = alldata.screenMiddleTarget;
      //       this.initDataRight = alldata.screenRightUpTarget;
      //       // this.initDataLeftUp = alldata.screenLeftUpTarget;
      //       // this.initDataLeftDown = alldata.screenLeftDownTarget;
      //       // this.initDataRight = alldata.screenRightUpTarget;
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
@keyframes center_bg_animation {
  0% {
    background-position: 0 -100%;
  }
  50% {
    background-position: 0 -50%;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes center_bg1_animation {
  0% {
    background-position: 0 0;
    background-size: 100% 100%;
  }
  50% {
    background-position: 40% 0;
    background-size: 110% 100%;
  }
  100% {
    background-position: 0 0;
    background-size: 100% 100%;
  }
}
.main_content {
  height: 1080px;
  width: 5760px;
  background: url("/image/powerServiceCenter/bg0.png") no-repeat;
  .main_content_in {
    width: 100%;
    height: 100%;
    background: url("/image/powerServiceCenter/bg1.png") no-repeat;
    background-position: 0% 0%;
    background-size: 100% 100%;
    animation: center_bg1_animation 4s linear;
    .main_content_mask {
      height: 100%;
      background: url("/image/powerServiceCenter/bg3.png") no-repeat;
      background-position: center;
    }
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
}
</style>
