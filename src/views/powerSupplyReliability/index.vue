<template>
  <div class="main_content">
    <p class="top">
      <span>{{timeText}}</span>
      <span>{{weather}}</span>
    </p>
    <left-part :initData="initData.screenLeftUpTarget" :initData2="initData.screenLeftDownTarget"/>
    <center-part :initData="initData.screenMiddleTarget"  />
    <right-part :initData="initData.screenRightUpTarget" :initData2="initData.screenRightDownTarget" />
  </div>
</template>
<script>
import leftPart from "./components/leftPart";
import rightPart from "./components/rightPart";
import centerPart from "./components/centerPart";
import axios from 'axios';
export default {
  name: "",
  components: {
    leftPart,
    rightPart,
    centerPart
  },
  data() {
    return {
      city: "固原",
      weather: "",
      timeText: "",
      timer:null,
      initData:{}
    };
  },
  created() {
    this.getGDKKX();
    this.getWeather();
    this.time();
    // this.$store.state.navImageUrl='/image/powerSupplyReliability/navImage.png';
    if(!this.timer){
      this.timer=setInterval(()=>{
        this.time();
      },1000*60)
    }else{
      clearInterval(this.timer)
    }
    // this.init();
    this.socketApi.initWebSocket("供电可靠性", this.getConfigResult);
    this.$store.state.navTitle='固原供电公司供电可靠性';
  },
  destroyed(){
    clearInterval(this.timer)
  },
  methods: {
    getConfigResult(val) {
      if (val.code == 200) {
        this.getGDKKX();
      }
    },
    getGDKKX(){
      this.$store.dispatch("init", { url: "/gdkkx" }).then((res) => {
        if (res.code == 200) {
          this.initData = res.data
        }
      })
      // axios.get('/JBTSHJ/GuYuanScreen/getScreenById/gdkkx').then(res=>{
      //   if(res.status ===200 && res.data.code === 200){
      //     this.initData = res.data.data
      //     console.log(res.data.data)
      //   }
      // })
    },
    init(){
      this.$store.dispatch('init',{url:'/gdkkx'}).then(res=>{
        console.log(res)
        this.initData = res.data;
      })
    },
    //   获取天气
    getWeather() {
      this.$store.dispatch("getWeather", { city: this.city }).then((res) => {
        console.log(JSON.parse(res).data.forecast[0]);
        if (JSON.parse(res).data) {
          let obj=JSON.parse(res).data.forecast[0];
          this.weather=`${obj.type} ${obj.fengxiang}${obj.fengli.split('[')[2].split(']')[0]} ${obj.low}${obj.high}`
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
      min = date.getMinutes().toString().length<2?'0'+date.getMinutes():date.getMinutes();
      this.timeText = `${year}年${month}月${day}日 ${vWeek_s} ${hour}:${min}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.main_content {
  height: 1080px;
  width: 5760px;
  background:url('/image/animationKeyFramesBg/powerSupplyReliability_bg.png') no-repeat;
  background-size: cover;
  .top{
    color: #B1CAEA;
    font-size: 23px;
    top: 49px;
    right: 77px;
    position: absolute;
    span:nth-of-type(2){
      margin-left:70px;
    }
  }
}
</style>