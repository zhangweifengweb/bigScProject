<template>
  <div class="centerPart_powerSupplyReliability" v-if='show'>
    <div class="container">
      <div class="info">
        <div class="rotateInfo">
          <div class="ball_container"></div>
          <div class="ellipse">
            <section
              v-for="(item, index) in centerArr"
              :key="`center${index}`"
              :class="'circle'+(index+1)"
            >
              <p class="num">
                {{ item.num }}
                <span>{{ item.unit }}</span>
              </p>
              <p class="title">
                {{ item.title }}
              </p>
            </section>
          </div>
        </div>
      </div>
      <div class="charts">
        <!-- <mapChart @changeMap="changeMap" ref="mapComponents" /> -->
        <div class="center_info">
          <p class="main_title">{{center.title}}</p>
          <p class="num">
            {{center.num}}
            <span>{{center.unit}}</span>
          </p>
        </div>
        <!-- <div class="ellipse">
          <div class="circle"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import mapChart from "@/components/mapChart";
export default {
  name: "baiduMap",
  components: {
    // mapChart,
  },
  props: {
    initData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch:{
    initData(val){
      let data = val.screenTargetPart01Data[0].targetContent
      data.forEach((item)=>{
        item.title = item.indicatorName.split('/')[1]
        item.num = item.indicatorValue.split('/')[1]
        item.unit = item.unit.split('/')[1]
      })
      this.centerArr = data
      this.centerArr.forEach((item,index,arr)=>{
        if(item.title=='供电可靠性'){
          this.center = arr[index]
          arr.splice(index, 1);
        }
      })
      this.show = true
    }
  },
  data() {
    return {
      show:false,
      centerBallShow:false,
      center:[],
      centerArr: [
        // {
        //   title: "户平均停电时间",
        //   num: 12,
        //   unit: "分钟",
        //   imgSrc: "/image/powerSupplyReliability/center_left_bg1.png",
        // },
        // {
        //   title: "停电时户数",
        //   num: 24,
        //   unit: "",
        //   imgSrc: "/image/powerSupplyReliability/center_left_bg2.png",
        // },
        // {
        //   title: "等效用户数",
        //   num: 24,
        //   unit: "户",
        //   imgSrc: "/image/powerSupplyReliability/center_left_bg3.png",
        // },
        // {
        //   title: "停电用户数",
        //   num: 14,
        //   unit: "户",
        //   imgSrc: "/image/powerSupplyReliability/center_right_bg1.png",
        // },
        // {
        //   title: "百公里跳闸",
        //   num: 18,
        //   unit: "次",
        //   imgSrc: "/image/powerSupplyReliability/center_right_bg2.png",
        // },
        // {
        //   title: "户均停电次数",
        //   num: 24,
        //   unit: "次",
        //   imgSrc: "/image/powerSupplyReliability/center_right_bg3.png",
        // },
      ],
    };
  },
  methods: {
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
  },
  mounted() {
    setTimeout(() => {
      this.centerBallShow = true;
    }, 3000);
  },
};
</script>
<style lang="scss">
@keyframes ballAnimation {
	0% { background-position: 0px 0px; }
	0.81% { background-position: -500px 0px; }
	1.61% { background-position: -1000px 0px; }
	2.42% { background-position: -1500px 0px; }
	3.23% { background-position: -2000px 0px; }
	4.03% { background-position: -2500px 0px; }
	4.84% { background-position: -3000px 0px; }
	5.65% { background-position: -3500px 0px; }
	6.45% { background-position: -4000px 0px; }
	7.26% { background-position: -4500px 0px; }
	8.06% { background-position: -5000px 0px; }
	8.87% { background-position: -5500px 0px; }
	9.68% { background-position: -6000px 0px; }
	10.48% { background-position: -6500px 0px; }
	11.29% { background-position: -7000px 0px; }
	12.10% { background-position: -7500px 0px; }
	12.90% { background-position: -8000px 0px; }
	13.71% { background-position: -8500px 0px; }
	14.52% { background-position: -9000px 0px; }
	15.32% { background-position: -9500px 0px; }
	16.13% { background-position: -10000px 0px; }
	16.94% { background-position: -10500px 0px; }
	17.74% { background-position: -11000px 0px; }
	18.55% { background-position: -11500px 0px; }
	19.35% { background-position: -12000px 0px; }
	20.16% { background-position: -12500px 0px; }
	20.97% { background-position: -13000px 0px; }
	21.77% { background-position: -13500px 0px; }
	22.58% { background-position: -14000px 0px; }
	23.39% { background-position: -14500px 0px; }
	24.19% { background-position: 0px -500px; }
	25.00% { background-position: -500px -500px; }
	25.81% { background-position: -1000px -500px; }
	26.61% { background-position: -1500px -500px; }
	27.42% { background-position: -2000px -500px; }
	28.23% { background-position: -2500px -500px; }
	29.03% { background-position: -3000px -500px; }
	29.84% { background-position: -3500px -500px; }
	30.65% { background-position: -4000px -500px; }
	31.45% { background-position: -4500px -500px; }
	32.26% { background-position: -5000px -500px; }
	33.06% { background-position: -5500px -500px; }
	33.87% { background-position: -6000px -500px; }
	34.68% { background-position: -6500px -500px; }
	35.48% { background-position: -7000px -500px; }
	36.29% { background-position: -7500px -500px; }
	37.10% { background-position: -8000px -500px; }
	37.90% { background-position: -8500px -500px; }
	38.71% { background-position: -9000px -500px; }
	39.52% { background-position: -9500px -500px; }
	40.32% { background-position: -10000px -500px; }
	41.13% { background-position: -10500px -500px; }
	41.94% { background-position: -11000px -500px; }
	42.74% { background-position: -11500px -500px; }
	43.55% { background-position: -12000px -500px; }
	44.35% { background-position: -12500px -500px; }
	45.16% { background-position: -13000px -500px; }
	45.97% { background-position: -13500px -500px; }
	46.77% { background-position: -14000px -500px; }
	47.58% { background-position: -14500px -500px; }
	48.39% { background-position: 0px -1000px; }
	49.19% { background-position: -500px -1000px; }
	50.00% { background-position: -1000px -1000px; }
	50.81% { background-position: -1500px -1000px; }
	51.61% { background-position: -2000px -1000px; }
	52.42% { background-position: -2500px -1000px; }
	53.23% { background-position: -3000px -1000px; }
	54.03% { background-position: -3500px -1000px; }
	54.84% { background-position: -4000px -1000px; }
	55.65% { background-position: -4500px -1000px; }
	56.45% { background-position: -5000px -1000px; }
	57.26% { background-position: -5500px -1000px; }
	58.06% { background-position: -6000px -1000px; }
	58.87% { background-position: -6500px -1000px; }
	59.68% { background-position: -7000px -1000px; }
	60.48% { background-position: -7500px -1000px; }
	61.29% { background-position: -8000px -1000px; }
	62.10% { background-position: -8500px -1000px; }
	62.90% { background-position: -9000px -1000px; }
	63.71% { background-position: -9500px -1000px; }
	64.52% { background-position: -10000px -1000px; }
	65.32% { background-position: -10500px -1000px; }
	66.13% { background-position: -11000px -1000px; }
	66.94% { background-position: -11500px -1000px; }
	67.74% { background-position: -12000px -1000px; }
	68.55% { background-position: -12500px -1000px; }
	69.35% { background-position: -13000px -1000px; }
	70.16% { background-position: -13500px -1000px; }
	70.97% { background-position: -14000px -1000px; }
	71.77% { background-position: -14500px -1000px; }
	72.58% { background-position: 0px -1500px; }
	73.39% { background-position: -500px -1500px; }
	74.19% { background-position: -1000px -1500px; }
	75.00% { background-position: -1500px -1500px; }
	75.81% { background-position: -2000px -1500px; }
	76.61% { background-position: -2500px -1500px; }
	77.42% { background-position: -3000px -1500px; }
	78.23% { background-position: -3500px -1500px; }
	79.03% { background-position: -4000px -1500px; }
	79.84% { background-position: -4500px -1500px; }
	80.65% { background-position: -5000px -1500px; }
	81.45% { background-position: -5500px -1500px; }
	82.26% { background-position: -6000px -1500px; }
	83.06% { background-position: -6500px -1500px; }
	83.87% { background-position: -7000px -1500px; }
	84.68% { background-position: -7500px -1500px; }
	85.48% { background-position: -8000px -1500px; }
	86.29% { background-position: -8500px -1500px; }
	87.10% { background-position: -9000px -1500px; }
	87.90% { background-position: -9500px -1500px; }
	88.71% { background-position: -10000px -1500px; }
	89.52% { background-position: -10500px -1500px; }
	90.32% { background-position: -11000px -1500px; }
	91.13% { background-position: -11500px -1500px; }
	91.94% { background-position: -12000px -1500px; }
	92.74% { background-position: -12500px -1500px; }
	93.55% { background-position: -13000px -1500px; }
	94.35% { background-position: -13500px -1500px; }
	95.16% { background-position: -14000px -1500px; }
	95.97% { background-position: -14500px -1500px; }
	96.77% { background-position: 0px -2000px; }
	97.58% { background-position: -500px -2000px; }
	98.39% { background-position: -1000px -2000px; }
	99.19% { background-position: -1500px -2000px; }
	100.00% { background-position: -2000px -2000px; }
}
@keyframes animX {
  0% {
    left: 308px;
  }
  100% {
    left: 2000px;
  }
}
@keyframes animY {
  0% {
    top: 170px;
  }
  100% {
    top: 900px;
  }
}
.centerPart_powerSupplyReliability {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  background: url("/image/powerSupplyReliability/center_bg1.png") no-repeat;
  background-position: center;
  background-size: 90%;
  .container {
    height: 100%;
    position: relative;
    background: url("/image/powerSupplyReliability/center_bg3.png") no-repeat;
    background-position: bottom;
    .info {
      height: 100%;
      background: url("/image/powerSupplyReliability/center_bg2.png") no-repeat;
      background-size: 33%;
      background-position: 49% 120%;
      .rotateInfo {
        height: 100%;
        background: url("/image/powerSupplyReliability/circle.png") no-repeat;
        background-position: 50% 90%;
        background-size: 65%;
        position: relative;
        overflow: hidden;
        .ball_container{
          position: absolute;
          width: 500px;
          height: 500px;
          transform: scale(1.9);
          background: url("/image/animationKeyFramesBg/powerSupplyReliability_ball.png") no-repeat;
          // animation: ballAnimation 5.00s steps(1) infinite;
          left: 1080px;
          top: 240px;
          z-index: 6;
        }
        .ellipse{
          transform: rotate(10deg);
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .circle1{
          background: url("/image/powerSupplyReliability/center_left_bg1.png") no-repeat;
        }
        .circle2{
          background: url("/image/powerSupplyReliability/center_left_bg2.png") no-repeat;
        }
        .circle3{
          background: url("/image/powerSupplyReliability/center_left_bg3.png") no-repeat;
        }
        .circle4{
          background: url("/image/powerSupplyReliability/center_right_bg2.png") no-repeat;
        }
        .circle5{
          background: url("/image/powerSupplyReliability/center_right_bg1.png") no-repeat;
        }
        .circle6{
          background: url("/image/powerSupplyReliability/center_right_bg3.png") no-repeat;
        }
        section {
          width: 337px;
          height: 128px;
          position: absolute;
          z-index: 9;
          transform:scale(1.2) rotate(-10deg);
          // text-align: center;
          .num {
            font-size: 50px;
            color: #4bd2c8;
            span {
              font-size: 22px;
              margin-left: 10px;
            }
          }
          .title {
            font-size: 20px;
            color: #fff;
          }
          &:nth-of-type(-n + 3) {
            padding-left: 60px;
            padding-top: 15px;
          }
          &:nth-of-type(n + 4) {
            padding-left: 150px;
            padding-top: 15px;
          }
          &:nth-of-type(1) {
             animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -10s infinite alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
          }
          &:nth-of-type(2) {
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -16.856s infinite alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -6.856s infinite alternate;
          }
          &:nth-of-type(3) {
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -23.712s infinite alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -13.712s infinite alternate;
          }
          &:nth-of-type(4) {
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -30.568s infinite alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -20.568s infinite alternate;
          }
          &:nth-of-type(5) {
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -37.424s infinite alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -27.424s infinite alternate;
          }
          &:nth-of-type(6) {
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -44.284s infinite alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -34.284s infinite alternate;
          }
        }
      }
    }
    .charts {
      position: absolute;
      width: 1600px;
      height: calc(100% - 180px);
      top: 140px;
      left: 558px;
      // background: url("/image/animationKeyFramesBg/powerSupplyReliability_ball.png") no-repeat;
      // background-position: center;
      // background-size: 76%;
      animation: ballAnimation 5.00s steps(1) infinite;
      // position: relative;
      .center_info {
        display: inline-block;
        font-size: 50px;
        padding-top: 160px;
        padding-left: 635px;
        text-align: right;
        .main_title {
          letter-spacing: 10px;
        }
        .num {
          color: #fff;
          font-size: 70px;
          span {
            font-size: 50px;
          }
        }
      }
    }
  }
}
</style>