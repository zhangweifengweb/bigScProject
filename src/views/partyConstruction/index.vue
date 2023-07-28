<template>
  <div class="main_content">
    <!-- <p class="top">
      <span>{{timeText}}</span>
      <span>{{weather}}</span>
    </p> -->
    <left-part :initData="initData"/>
    <center-part :initData="initData" />
    <right-part :initData="initData" />
  </div>
</template>
<script>
import leftPart from "./components/leftPart";
import rightPart from "./components/rightPart";
import centerPart from "./components/centerPart"
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
    // this.getWeather();
    // this.time();
    // console.info(this.$route)
    // if(!this.timer){
    //   this.timer=setInterval(()=>{
    //     this.time();
    //   },1000*60)
    // }else{
    //   clearInterval(this.timer)
    // }
    this.init();
    this.$store.state.navTitle='固原供电公司党风建设';
  },
  destroyed(){
    // clearInterval(this.timer)
  },
  methods: {
    init(){
      this.$store.dispatch('init',{url:'/partyDD/7'}).then(res=>{
        console.log(res)
        // this.initData=res.data;
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
#nav{
  background: none;
}
.main_content {
  height: 1080px;
  width: 5760px;
  background:url('/image/partyConstruction/bg.gif') no-repeat;
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