<template>
  <div class="centerPart_serviceCommand">
    <div class="container">
      <div class="ball_container">
        <!-- <img src="/image/animationKeyFramesBg/service_ball.png" alt="" crossorigin="anonymous"> -->
        <div class="rightInfo">
          <p :class="{ plan: show === 1 }" @click="change(1)">
            周
          </p>
          <p :class="{ plan: show === 2 }" @click="change(2)">
            月
          </p>
          <p :class="{ plan: show === 3 }" @click="change(3)">
            年
          </p>
        </div>
      </div>
      <div class="info">
        <div class="rotateInfo">
          <div class="left">
            <section v-for='(item,index) in leftArr' :key='index'>
              <p class="num info_num">{{item.num}}<span>{{item.unit}}</span></p>
              <p class="num info_content">{{item.title}}</p>
            </section>
          </div>
          <div class="right">
            <section v-for='(item,index) in rightArr' :key='index'>
              <p class="num info_num">{{item.num}}<span>{{item.unit}}</span></p>
              <p class="num info_content">{{item.title}}</p>
            </section>
          </div>
        </div>
      </div>
      <div class="charts">
        <div class="center_info">
          <section
            v-for="(item, index) in centerArr"
            :key="`center_${index}`"
            :class="classList[index]"
          >
            <p class="center_title">{{ item.title }}</p>
            <p class="num">
              {{ item.num }}<span>{{ item.unit }}</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Carousel3d, Slide } from "vue-carousel-3d";
import axios from 'axios';
export default {
  name: "baiduMap",
  components: {
    // Carousel3d,
    // Slide,
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
      let data = val.screenTargetPart01Data
      data.forEach(item=>{
        // console.log(item);
        item.targetContent.forEach(item2=>{
          item2.title = item2.indicatorName.split('/')[0]
          item2.num = item2.indicatorName.split('/')[1]
          item2.unit = item2.indicatorValue.split('/')[1]
        })
      })
      this.left1=[]
      this.left2=[]
      this.left3=[]
      this.right1=[]
      this.right2=[]
      this.right3=[]
      this.center1=[]
      this.center2=[]
      this.center3=[]
      this.left1.push(data[0].targetContent[6],data[0].targetContent[7])
      this.left2.push(data[1].targetContent[6],data[1].targetContent[7])
      this.left3.push(data[2].targetContent[6],data[2].targetContent[7])
      this.right1.push(data[0].targetContent[8],data[0].targetContent[9])
      this.right2.push(data[1].targetContent[8],data[1].targetContent[9])
      this.right3.push(data[2].targetContent[8],data[2].targetContent[9])
      data.forEach(item=>{
        item.targetContent.splice(6)
      })
      this.center1 = data[0].targetContent
      this.center2 = data[1].targetContent
      this.center3 = data[2].targetContent
      this.getIndex(data[0].targetTitle)
      // console.log(data)
    }
  },
  data() {
    return {
      show:0,
      centerBallShow: false,
      left1:[],
      left2:[],
      left3:[],
      leftArr:[],
      right1:[],
      right2:[],
      right3:[],
      rightArr:[],
      classList: [
        "left-2",
        "left-1",
        "center",
        "right-1",
        "right-2",
        "right-3",
      ],
      center1:[],
      center2:[],
      center3:[],
      centerArr: [
        // {
        //   title: "业务咨询",
        //   num: 12,
        //   unit: "件",
        // },
        // {
        //   title: "意见",
        //   num: 12,
        //   unit: "件",
        // },
        // {
        //   title: "服务申请",
        //   num: 12,
        //   unit: "件",
        // },
        // {
        //   title: "举报",
        //   num: 12,
        //   unit: "件",
        // },
        // {
        //   title: "投诉",
        //   num: 12,
        //   unit: "件",
        // },
        // {
        //   title: "表扬",
        //   num: 12,
        //   unit: "件",
        // },
      ],
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.centerBallShow = true;
    }, 3000);
  },
  methods: {
    getIndex(name){
      // console.log(name)
      axios.get('/JBTSHJ/GuYuanScreen/getScreenById/TableIndex',{params:{tarGetName:name}}).then(res=>{
        if(res.status === 200 && res.data.code === 200){
          // this.show = res.data.data
          this.change(res.data.data)
        }
        // console.log(res)
      })
    },
    change(e){
      // console.log(this.centerArr);
      this.show = e
      if(e===1){
        this.leftArr = this.left1
        this.rightArr = this.right1
        this.centerArr = this.center1
      }else if(e===2){
        this.leftArr = this.left2
        this.rightArr = this.right2
        this.centerArr = this.center2
      }else{
        this.leftArr = this.left3
        this.rightArr = this.right3
        this.centerArr = this.center3
      }
    },
    // changeMap(e) {
    //   this.$refs.mapComponents.renderMap(this.city[e]);
    // },
    // center_sec_click(index, item) {
    //   let currentIndex = this.classList.indexOf("center");
    //   if (index > currentIndex) {
    //     let arr1 = this.centerArr.slice(0, index - currentIndex);
    //     this.centerArr.splice(0, index - currentIndex);
    //     this.centerArr = this.centerArr.concat(arr1);
    //   } else {
    //     let arr2 = this.centerArr.slice(
    //       this.centerArr.length - 1 - (currentIndex - index),
    //       this.centerArr.length - 1
    //     );
    //     this.centerArr.splice(
    //       this.centerArr.length - 1 - (currentIndex - index),
    //       currentIndex - index
    //     );
    //     this.centerArr = arr2.concat(this.centerArr);
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
@keyframes ballRotateAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -1200px 0px;
  }
  1.61% {
    background-position: -2400px 0px;
  }
  2.42% {
    background-position: -3600px 0px;
  }
  3.23% {
    background-position: -4800px 0px;
  }
  4.03% {
    background-position: -6000px 0px;
  }
  4.84% {
    background-position: -7200px 0px;
  }
  5.65% {
    background-position: -8400px 0px;
  }
  6.45% {
    background-position: -9600px 0px;
  }
  7.26% {
    background-position: -10800px 0px;
  }
  8.06% {
    background-position: -12000px 0px;
  }
  8.87% {
    background-position: -13200px 0px;
  }
  9.68% {
    background-position: 0px -500px;
  }
  10.48% {
    background-position: -1200px -500px;
  }
  11.29% {
    background-position: -2400px -500px;
  }
  12.10% {
    background-position: -3600px -500px;
  }
  12.90% {
    background-position: -4800px -500px;
  }
  13.71% {
    background-position: -6000px -500px;
  }
  14.52% {
    background-position: -7200px -500px;
  }
  15.32% {
    background-position: -8400px -500px;
  }
  16.13% {
    background-position: -9600px -500px;
  }
  16.94% {
    background-position: -10800px -500px;
  }
  17.74% {
    background-position: -12000px -500px;
  }
  18.55% {
    background-position: -13200px -500px;
  }
  19.35% {
    background-position: 0px -1000px;
  }
  20.16% {
    background-position: -1200px -1000px;
  }
  20.97% {
    background-position: -2400px -1000px;
  }
  21.77% {
    background-position: -3600px -1000px;
  }
  22.58% {
    background-position: -4800px -1000px;
  }
  23.39% {
    background-position: -6000px -1000px;
  }
  24.19% {
    background-position: -7200px -1000px;
  }
  25.00% {
    background-position: -8400px -1000px;
  }
  25.81% {
    background-position: -9600px -1000px;
  }
  26.61% {
    background-position: -10800px -1000px;
  }
  27.42% {
    background-position: -12000px -1000px;
  }
  28.23% {
    background-position: -13200px -1000px;
  }
  29.03% {
    background-position: 0px -1500px;
  }
  29.84% {
    background-position: -1200px -1500px;
  }
  30.65% {
    background-position: -2400px -1500px;
  }
  31.45% {
    background-position: -3600px -1500px;
  }
  32.26% {
    background-position: -4800px -1500px;
  }
  33.06% {
    background-position: -6000px -1500px;
  }
  33.87% {
    background-position: -7200px -1500px;
  }
  34.68% {
    background-position: -8400px -1500px;
  }
  35.48% {
    background-position: -9600px -1500px;
  }
  36.29% {
    background-position: -10800px -1500px;
  }
  37.10% {
    background-position: -12000px -1500px;
  }
  37.90% {
    background-position: -13200px -1500px;
  }
  38.71% {
    background-position: 0px -2000px;
  }
  39.52% {
    background-position: -1200px -2000px;
  }
  40.32% {
    background-position: -2400px -2000px;
  }
  41.13% {
    background-position: -3600px -2000px;
  }
  41.94% {
    background-position: -4800px -2000px;
  }
  42.74% {
    background-position: -6000px -2000px;
  }
  43.55% {
    background-position: -7200px -2000px;
  }
  44.35% {
    background-position: -8400px -2000px;
  }
  45.16% {
    background-position: -9600px -2000px;
  }
  45.97% {
    background-position: -10800px -2000px;
  }
  46.77% {
    background-position: -12000px -2000px;
  }
  47.58% {
    background-position: -13200px -2000px;
  }
  48.39% {
    background-position: 0px -2500px;
  }
  49.19% {
    background-position: -1200px -2500px;
  }
  50.00% {
    background-position: -2400px -2500px;
  }
  50.81% {
    background-position: -3600px -2500px;
  }
  51.61% {
    background-position: -4800px -2500px;
  }
  52.42% {
    background-position: -6000px -2500px;
  }
  53.23% {
    background-position: -7200px -2500px;
  }
  54.03% {
    background-position: -8400px -2500px;
  }
  54.84% {
    background-position: -9600px -2500px;
  }
  55.65% {
    background-position: -10800px -2500px;
  }
  56.45% {
    background-position: -12000px -2500px;
  }
  57.26% {
    background-position: -13200px -2500px;
  }
  58.06% {
    background-position: 0px -3000px;
  }
  58.87% {
    background-position: -1200px -3000px;
  }
  59.68% {
    background-position: -2400px -3000px;
  }
  60.48% {
    background-position: -3600px -3000px;
  }
  61.29% {
    background-position: -4800px -3000px;
  }
  62.10% {
    background-position: -6000px -3000px;
  }
  62.90% {
    background-position: -7200px -3000px;
  }
  63.71% {
    background-position: -8400px -3000px;
  }
  64.52% {
    background-position: -9600px -3000px;
  }
  65.32% {
    background-position: -10800px -3000px;
  }
  66.13% {
    background-position: -12000px -3000px;
  }
  66.94% {
    background-position: -13200px -3000px;
  }
  67.74% {
    background-position: 0px -3500px;
  }
  68.55% {
    background-position: -1200px -3500px;
  }
  69.35% {
    background-position: -2400px -3500px;
  }
  70.16% {
    background-position: -3600px -3500px;
  }
  70.97% {
    background-position: -4800px -3500px;
  }
  71.77% {
    background-position: -6000px -3500px;
  }
  72.58% {
    background-position: -7200px -3500px;
  }
  73.39% {
    background-position: -8400px -3500px;
  }
  74.19% {
    background-position: -9600px -3500px;
  }
  75.00% {
    background-position: -10800px -3500px;
  }
  75.81% {
    background-position: -12000px -3500px;
  }
  76.61% {
    background-position: -13200px -3500px;
  }
  77.42% {
    background-position: 0px -4000px;
  }
  78.23% {
    background-position: -1200px -4000px;
  }
  79.03% {
    background-position: -2400px -4000px;
  }
  79.84% {
    background-position: -3600px -4000px;
  }
  80.65% {
    background-position: -4800px -4000px;
  }
  81.45% {
    background-position: -6000px -4000px;
  }
  82.26% {
    background-position: -7200px -4000px;
  }
  83.06% {
    background-position: -8400px -4000px;
  }
  83.87% {
    background-position: -9600px -4000px;
  }
  84.68% {
    background-position: -10800px -4000px;
  }
  85.48% {
    background-position: -12000px -4000px;
  }
  86.29% {
    background-position: -13200px -4000px;
  }
  87.10% {
    background-position: 0px -4500px;
  }
  87.90% {
    background-position: -1200px -4500px;
  }
  88.71% {
    background-position: -2400px -4500px;
  }
  89.52% {
    background-position: -3600px -4500px;
  }
  90.32% {
    background-position: -4800px -4500px;
  }
  91.13% {
    background-position: -6000px -4500px;
  }
  91.94% {
    background-position: -7200px -4500px;
  }
  92.74% {
    background-position: -8400px -4500px;
  }
  93.55% {
    background-position: -9600px -4500px;
  }
  94.35% {
    background-position: -10800px -4500px;
  }
  95.16% {
    background-position: -12000px -4500px;
  }
  95.97% {
    background-position: -13200px -4500px;
  }
  96.77% {
    background-position: 0px -5000px;
  }
  97.58% {
    background-position: -1200px -5000px;
  }
  98.39% {
    background-position: -2400px -5000px;
  }
  99.19% {
    background-position: -3600px -5000px;
  }
  100.00% {
    background-position: -4800px -5000px;
  }
}
.centerPart_serviceCommand {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  text-align: center;
  // background: url("/image/animationKeyFramesBg/service_ball.png") no-repeat;
  // background-position: 50% 20%;
  // background-size: 46%;
  // animation: ballRotateAnimation 5.00s steps(1) infinite;
  .container {
    height: 100%;
    position: relative;
    .ball_container {
      z-index:999;
      background: url("/image/animationKeyFramesBg/service_ball.png") no-repeat;
      // background-repeat: no-repeat;
      // animation: ballRotateAnimation 5s steps(1,start) infinite;
      width: 1200px;
      height: 500px;
      position: absolute;
      transform: scale(2);
      left: 750px;
      top: 330px;
      img{
        height: 100%;
        width: 100%;
      }
      .rightInfo {
        position: absolute;
        right: 100px;
        display: flex;
        top: 15px;
        p {
          width: 60px;
          height: 46px;
          line-height: 46px;
          font-size: 20px;
          color: #ffffff;
          text-align: center;
          font-weight: 400;
          opacity: 0.8;
          cursor: pointer;
        }
        .plan {
          background: linear-gradient(
            180deg,
            rgba(56, 189, 255, 0) 0%,
            rgba(56, 189, 255, 0.2) 82%,
            rgba(56, 189, 255, 0.7) 100%
          );
          opacity: 1;
        }
      }
    }
    .info {
      height: 100%;
      background: url("/image/serviceCommand/center_circle.png") no-repeat;
      background-size: 90%;
      background-position: 50% 50%;
      .rotateInfo {
        height: 100%;
        // background: url("/image/powerSupplyReliability/circle.png") no-repeat;
        background-position: 50% 90%;
        background-size: 65%;
        position: relative;
        section {
          margin-bottom: 108px;
          width: 333px;
          height: 288px;
          text-align: center;
          .info_num {
            font-size: 70px;
            padding-top: 20px;
            margin-bottom: 115px;
            span {
              font-size: 30px;
              margin-left: 10px;
            }
          }
          .info_content {
            font-size: 40px;
            color: #fff;
            text-shadow: none;
            line-height: 50px;
            span {
              font-size: 36px;
              line-height: 50px;
              margin-left: 10px;
            }
          }
        }
        .left {
          position: absolute;
          left: 70px;
          top: 170px;
          visibility: 0;
          section {
            background: url("/image/serviceCommand/sec_bg.png") no-repeat;
            animation: bounceInDown 3s;
          }
        }
        .right {
          position: absolute;
          right: 70px;
          top: 170px;
          visibility: 0;
          section {
            animation: bounceInDown 3s;
            &:nth-of-type(1) {
              background: url("/image/serviceCommand/sec_bg.png") no-repeat;
            }
            &:nth-of-type(2) {
              background: url("/image/serviceCommand/sec_bg1.png") no-repeat;
            }
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
      // display: none;
      // background: url("/image/serviceCommand/center_ball.png") no-repeat;
      background-position: center;
      animation: bounceIn 5s;
      // position: relative;
      overflow: hidden;
      .center_info {
        position: relative;
        section {
          position: absolute;
          cursor: pointer;
          width: 281px;
          height: 287px;
          background: url("/image/serviceCommand/info_bg.png") no-repeat;
          background-position: 10% 50%;
          text-align: center;
          @keyframes animX {
            0% {
              left: -40px;
            }
            100% {
              left: 1300px;
            }
          }
          @keyframes animY {
            0% {
              top: 90px;
            }
            100% {
              top: 450px;
            }
          }
          @keyframes scale {
            0% {
              transform: scale(0.7);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(0.7);
            }
          }
          @keyframes opacityTrans {
            0% {
              opacity: 0;
            }
            10% {
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            90% {
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }
          &.left-2 {
            // transform: scale(0.7);
            // top: 160px;
            // left: 50px;
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -10s infinite alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
              scale 40s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
              opacityTrans 40s 0s infinite;
          }
          &.left-1 {
            // transform: scale(0.9);
            // top: 380px;
            // left: -40px;
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -16.856s infinite
                alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -6.856s infinite alternate,
              scale 40s cubic-bezier(0.36, 0, 0.64, 1) -6.856s infinite alternate,
              opacityTrans 40s -6.856s infinite;
          }
          &.center {
            // transform: scale(1.2);
            // top: 460px;
            // left: 540px;
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -23.712s infinite
                alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -13.712s infinite alternate,
              scale 40s cubic-bezier(0.36, 0, 0.64, 1) -13.712s infinite alternate,
              opacityTrans 40s -13.712s infinite;
          }
          &.right-1 {
            // transform: scale(0.9);
            // top: 400px;
            // right: 300px;
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -30.568s infinite
                alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -20.568s infinite alternate,
              scale 40s cubic-bezier(0.36, 0, 0.64, 1) -20.568s infinite alternate,
              opacityTrans 40s -20.568s infinite;
          }
          &.right-2 {
            // transform: scale(0.7);
            // top: 240px;
            // right: 0px;
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -37.424s infinite
                alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -27.424s infinite alternate,
              scale 40s cubic-bezier(0.36, 0, 0.64, 1) -27.424s infinite alternate,
              opacityTrans 40s -27.424s infinite;
          }
          &.right-3 {
            // transform: scale(0.6);
            animation: animX 20s cubic-bezier(0.36, 0, 0.64, 1) -44.284s infinite
                alternate,
              animY 20s cubic-bezier(0.36, 0, 0.64, 1) -34.284s infinite alternate,
              scale 40s cubic-bezier(0.36, 0, 0.64, 1) -34.284s infinite alternate,
              opacityTrans 40s -34.284s infinite;
          }
          .center_title {
            font-size: 30px;
            padding-top: 110px;
          }
          .num {
            margin-top: 10px;
            font-size: 40px;
            span {
              font-size: 20px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>