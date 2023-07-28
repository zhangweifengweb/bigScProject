<template>
  <div class="main_content">
    <p class="top">
      <span>{{ timeText }}</span>
      <span>{{ weather }}</span>
    </p>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      city: "固原",
      weather: "",
      timeText: "",
      timer: null,
      initData: {},
    };
  },
  mounted() {
    this.getWeather();
    this.time();
    console.info(this.$route);
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.time();
      }, 1000 * 60);
    } else {
      clearInterval(this.timer);
    }
    this.$store.state.navTitle = "固原供电公司供服指挥中心";
    this.$store.state.navImageUrl = "/image/welcomeLeader/welcomeHead.png";
  },
  destroyed() {
    clearInterval(this.timer);
    this.$store.state.navImageUrl = "/image/animationKeyFramesBg/nav_bg.png";
  },
  methods: {
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
// #nav {
//   background: none;
// }
.main_content {
  height: 1080px;
  width: 5760px;
  background: url("/image/welcomeLeader/welcomeLeader.png") no-repeat;
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
