<template>
  <div class="centerPart_industryExpansionControl">
    <div class="container" v-if="show">
      <div class="info">
        <div class="left">
          <section v-for="(item,index) in left1Arr" :key="'left'+index">
            <p class="num">{{item.value}}<span>{{item.unit2}}</span></p>
            <p class="title">{{item.name}}</p>
          </section>
        </div>
        <div class="right">
          <section v-for="(item,index) in right1Arr" :key="'right'+index">
            <p class="num">{{item.value}}<span>{{item.unit2}}</span></p>
            <p class="title">{{item.name}}</p>
          </section>
        </div>
      </div>
      <div class="center_big"></div>
      <div class="charts">
        <div  v-for="(item,index) in centerArr" :key="'c1'+index" :class="[index==0?'left':'right','yuan']">
          <p><span>{{item.value}}</span>{{item.unit2}}</p>
          <span>{{item.name}}</span>
        </div>
        <div  v-for="(item,index) in center2Arr" :key="'c2'+index" class="info" :id="'info'+(index+1)">
          <div class="animate"></div>
          <div>
            <p><span>{{item.value}}</span>{{item.unit2}}</p>
          <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "baiduMap",
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
      this.show=true
      let data = val.screenTargetPart01Data[0].targetContent
      data.forEach(item=>{
        item.name = item.indicatorName.split('/')[1]
        item.value = item.indicatorValue.split('/')[1]
        item.unit2 = item.unit.split('/')[1]
      })
      this.left1Arr.push(data[1],data[2],data[3])
      this.right1Arr.push(data[9],data[10],data[11])
      this.center2Arr.push(data[4],data[5],data[6],data[7])
      this.centerArr.push(data[0],data[8])
    }
  },
  data() {
    return {
      left1Arr:[],
      right1Arr:[],
      center2Arr:[],
      centerArr:[],
      show:false
    };
  },
  methods: {
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.centerPart_industryExpansionControl {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
   background: url("/image/industryExpansionControl/centerbg.png") no-repeat;
  background-position: 68% 190%;
  background-size: 75%;
  .container {
    height: 100%;
    position: relative;
    background-position: bottom;
    background-size: 100% 60%;
    .info {
      height: 100%;
       background: url("/image/operationMonitor/center_arrow.png") no-repeat;
      background-position: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      animation: zoomIn 2s;
      section {
        width: 300px;
        height: 110px;
        &:nth-of-type(-n + 4) {
          margin-bottom: 140px;
        }
        &:nth-of-type(1) {
          margin-top: 140px;
        }
        .title {
          font-size: 20px;
          color: #b1d9fb;
          margin-top: 5px;
          letter-spacing: 3px;
        }
        .num {
          font-size: 50px;
          color: #00fff8;
          span {
            font-size: 24px;
            color: #b1d9fb;
            margin-left: 20px;
            text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
            color: #00fff8;
          }
        }
      }
      .left {
        padding-left: 55px;
        section {
          padding-left: 50px;
          position: relative;
          img {
            position: absolute;
            right: 50px;
            top: 20px;
          }
        }
        section:nth-of-type(1) {
           background: url("/image/industryExpansionControl/left1.png") no-repeat;
          margin-left: 90px;
        }
        section:nth-of-type(2) {
           background: url("/image/powerSupplyControl/left_info_bg2.png")
             no-repeat;
        }
        section:nth-of-type(3) {
           background: url("/image/powerSupplyControl/left_info_bg3.png")
             no-repeat;
          margin-left: 90px;
        }
      }
      .right {
        text-align: right;
        padding-right: 55px;
        section {
          padding-right: 50px;
          position: relative;
          img {
            position: absolute;
            left: 50px;
            top: 15px;
          }
        }
        section:nth-of-type(1) {
           background: url("/image/powerSupplyControl/right_info_bg1.png")
             no-repeat;
          margin-left: -90px;
        }
        section:nth-of-type(2) {
           background: url("/image/powerSupplyControl/right_info_bg2.png")
             no-repeat;
          margin-right: 0;
          padding-right: 85px;
        }
        section:nth-of-type(3) {
           background: url("/image/powerSupplyControl/right_info_bg3.png")
             no-repeat;
          margin-left: -90px;
        }
      }
    }
    .center_big {
      position: absolute;
      width: 1200px;
      height: 500px;
      top: 330px;
      left: 790px;
      // top: 50%;
      // left: 50%;
      // margin-top: -250px;
      // margin-left: -600px;
      background: url("/image/animationKeyFramesBg/industryExpansionControl_ball.png") no-repeat;
      // animation: centerAnimation 5s steps(1) infinite 2s;
      transform: scaleX(2) scaleY(2);
    }
    .charts {
      position: absolute;
      width: 2400px;
      height: 1080px;
      top: 0;
      left: 190px;
      .yuan {
        position: absolute;
         background: url("/image/industryExpansionControl/circle.png") no-repeat;
        width: 500px;
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        // animation: zoomIn 2s, circleAnimation 5s steps(1) infinite 2s;
        justify-content: center;
        p {
          font-size: 24px;
          color: #00fff8;
          span {
            font-family: "numFont";
            font-size: 50px;
            margin-right: 20px;
            color: #00fff8;
            text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
          }
        }
        > span {
          color: #ccd7e3;
          font-size: 26px;
          opacity: 0.8;
        }
      }
      .left {
        top: 290px;
        left: 200px;
      }
      .right {
        top: 290px;
        right: 260px;
      }
      .info {
        width: 203px;
        height: 154px;
        position: absolute;
        div {
          position: absolute;
          p {
            margin-top: 75px;
            font-size: 24px;
            color: #00fff8;
            span {
              font-family: "numFont";
              font-size: 50px;
              margin-right: 20px;
              color: #00fff8;
              text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
            }
          }
          > span {
            color: #ccd7e3;
            font-size: 26px;
            opacity: 0.8;
          }
        }
      }
      #info1 {
         background: url("/image/industryExpansionControl/left11.png") no-repeat;
        top: 270px;
        left: 720px;
        background-position-x: -180px;
        .animate {
           background: url("/image/industryExpansionControl/center_left1.png")
             no-repeat;
          width: 400px;
          height: 400px;
          // animation: center_left1Animation 5s steps(1) infinite 2s;
          position: absolute;
          top: -123px;
          left: -285px;
          z-index: 2;
        }
        div {
          top: 5px;
          left: 0;
        }
      }
      #info2 {
         background: url("/image/industryExpansionControl/left2.png") no-repeat;
        top: 650px;
        left: 760px;
        background-position-x: -180px;
        .animate {
           background: url("/image/industryExpansionControl/center_left2.png")
             no-repeat;
          width: 400px;
          height: 400px;
          // animation: center_left1Animation 5s steps(1) infinite 2s;
          position: absolute;
          top: -65px;
          left: -295px;
          z-index: 2;
        }
        div {
          top: -45px;
          left: 0px;
        }
      }
      #info3 {
         background: url("/image/industryExpansionControl/right1.png") no-repeat;
        top: 270px;
        right: 765px;
        .animate {
           background: url("/image/industryExpansionControl/center_right1.png")
             no-repeat;
          width: 400px;
          height: 400px;
          // animation: center_left1Animation 5s steps(1) infinite 2s;
          position: absolute;
          top: -115px;
          left: 110px;
          z-index: 2;
        }
        div {
          top: 5px;
          right: 0;
        }
      }
      #info4 {
         background: url("/image/industryExpansionControl/right2.png") no-repeat;
        top: 650px;
        right: 790px;
        .animate {
           background: url("/image/industryExpansionControl/center_right2.png")
             no-repeat;
          width: 400px;
          height: 400px;
          // animation: center_left1Animation 5s steps(1) infinite 2s;
          position: absolute;
          top: -64px;
          left: 110px;
          z-index: 2;
        }
        div {
          top: -45px;
          right: 0;
        }
      }
    }
  }
}
</style>