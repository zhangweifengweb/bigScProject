<template>
  <div class="centerPart_guyuansurvey">
    <div class="container">
      <div class="map">
        <p>固原市</p>
        <img src="/image/guyuansurvey/center_point.png" alt="" />
        <p>中卫市</p>
        <p>吴忠市</p>
        <p>银川市</p>
        <p>石嘴山市</p>
      </div>
      <div class="maintop">
        <div class="maintop1">
          <h2>{{ cendata[0].columnValue1 }}</h2>
          <p>{{ cendata[0].columnValue2 }}</p>
          <!-- <img src="/image/guyuansurvey/1.png" alt="" /> -->
        </div>
        <div class="maintop2">
          <h2>{{ cendata[2].columnValue1 }}</h2>
          <p>{{ cendata[2].columnValue2 }}</p>
          <!-- <img src="/image/guyuansurvey/3.png" alt="" /> -->
        </div>
      </div>
      <div class="mainbottom">
        <div class="mainbottom1">
          <h2>{{ cendata[1].columnValue1 }}</h2>
          <p>{{ cendata[1].columnValue2 }}</p>
          <p>{{ cendata[1].columnValue3 }}</p>
          <!-- <img src="/image/guyuansurvey/2.png" alt="" /> -->
        </div>
        <div class="mainbottom2">
          <h2>{{ cendata[3].columnValue1 }}</h2>
          <p>
            {{ cendata[2].columnValue2 }}
          </p>
          <!-- <img src="/image/guyuansurvey/4.png" alt="" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      cendata: [
        {
          columnValue1: "",
          columnValue2: "",
        },
        {
          columnValue1: "",
          columnValue2: "",
          columnValue3: "",
        },
        {
          columnValue1: "",
          columnValue2: "",
        },
        {
          columnValue1: "",
          columnValue2: "",
        },
      ],
    };
  },
  watch: {
    initData(val) {
      // console.log("中间数据", val);
      this.cendata = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item, index) => {
        if (index != 1) {
          this.cendata.push({
            columnValue1: item.columnValue1.split("/")[1],
            columnValue2: item.columnValue2.split("/")[1],
          });
        } else {
          this.cendata.push({
            columnValue1: item.columnValue1.split("/")[1],
            columnValue2: item.columnValue2.split("/")[1],
            columnValue3: item.columnValue3.split("/")[1],
          });
        }
      });
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
@keyframes myAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -1000px 0px;
  }
  1.61% {
    background-position: -2000px 0px;
  }
  2.42% {
    background-position: -3000px 0px;
  }
  3.23% {
    background-position: -4000px 0px;
  }
  4.03% {
    background-position: -5000px 0px;
  }
  4.84% {
    background-position: -6000px 0px;
  }
  5.65% {
    background-position: -7000px 0px;
  }
  6.45% {
    background-position: -8000px 0px;
  }
  7.26% {
    background-position: -9000px 0px;
  }
  8.06% {
    background-position: -10000px 0px;
  }
  8.87% {
    background-position: -11000px 0px;
  }
  9.68% {
    background-position: -12000px 0px;
  }
  10.48% {
    background-position: -13000px 0px;
  }
  11.29% {
    background-position: -14000px 0px;
  }
  12.10% {
    background-position: 0px -540px;
  }
  12.90% {
    background-position: -1000px -540px;
  }
  13.71% {
    background-position: -2000px -540px;
  }
  14.52% {
    background-position: -3000px -540px;
  }
  15.32% {
    background-position: -4000px -540px;
  }
  16.13% {
    background-position: -5000px -540px;
  }
  16.94% {
    background-position: -6000px -540px;
  }
  17.74% {
    background-position: -7000px -540px;
  }
  18.55% {
    background-position: -8000px -540px;
  }
  19.35% {
    background-position: -9000px -540px;
  }
  20.16% {
    background-position: -10000px -540px;
  }
  20.97% {
    background-position: -11000px -540px;
  }
  21.77% {
    background-position: -12000px -540px;
  }
  22.58% {
    background-position: -13000px -540px;
  }
  23.39% {
    background-position: -14000px -540px;
  }
  24.19% {
    background-position: 0px -1080px;
  }
  25.00% {
    background-position: -1000px -1080px;
  }
  25.81% {
    background-position: -2000px -1080px;
  }
  26.61% {
    background-position: -3000px -1080px;
  }
  27.42% {
    background-position: -4000px -1080px;
  }
  28.23% {
    background-position: -5000px -1080px;
  }
  29.03% {
    background-position: -6000px -1080px;
  }
  29.84% {
    background-position: -7000px -1080px;
  }
  30.65% {
    background-position: -8000px -1080px;
  }
  31.45% {
    background-position: -9000px -1080px;
  }
  32.26% {
    background-position: -10000px -1080px;
  }
  33.06% {
    background-position: -11000px -1080px;
  }
  33.87% {
    background-position: -12000px -1080px;
  }
  34.68% {
    background-position: -13000px -1080px;
  }
  35.48% {
    background-position: -14000px -1080px;
  }
  36.29% {
    background-position: 0px -1620px;
  }
  37.10% {
    background-position: -1000px -1620px;
  }
  37.90% {
    background-position: -2000px -1620px;
  }
  38.71% {
    background-position: -3000px -1620px;
  }
  39.52% {
    background-position: -4000px -1620px;
  }
  40.32% {
    background-position: -5000px -1620px;
  }
  41.13% {
    background-position: -6000px -1620px;
  }
  41.94% {
    background-position: -7000px -1620px;
  }
  42.74% {
    background-position: -8000px -1620px;
  }
  43.55% {
    background-position: -9000px -1620px;
  }
  44.35% {
    background-position: -10000px -1620px;
  }
  45.16% {
    background-position: -11000px -1620px;
  }
  45.97% {
    background-position: -12000px -1620px;
  }
  46.77% {
    background-position: -13000px -1620px;
  }
  47.58% {
    background-position: -14000px -1620px;
  }
  48.39% {
    background-position: 0px -2160px;
  }
  49.19% {
    background-position: -1000px -2160px;
  }
  50.00% {
    background-position: -2000px -2160px;
  }
  50.81% {
    background-position: -3000px -2160px;
  }
  51.61% {
    background-position: -4000px -2160px;
  }
  52.42% {
    background-position: -5000px -2160px;
  }
  53.23% {
    background-position: -6000px -2160px;
  }
  54.03% {
    background-position: -7000px -2160px;
  }
  54.84% {
    background-position: -8000px -2160px;
  }
  55.65% {
    background-position: -9000px -2160px;
  }
  56.45% {
    background-position: -10000px -2160px;
  }
  57.26% {
    background-position: -11000px -2160px;
  }
  58.06% {
    background-position: -12000px -2160px;
  }
  58.87% {
    background-position: -13000px -2160px;
  }
  59.68% {
    background-position: -14000px -2160px;
  }
  60.48% {
    background-position: 0px -2700px;
  }
  61.29% {
    background-position: -1000px -2700px;
  }
  62.10% {
    background-position: -2000px -2700px;
  }
  62.90% {
    background-position: -3000px -2700px;
  }
  63.71% {
    background-position: -4000px -2700px;
  }
  64.52% {
    background-position: -5000px -2700px;
  }
  65.32% {
    background-position: -6000px -2700px;
  }
  66.13% {
    background-position: -7000px -2700px;
  }
  66.94% {
    background-position: -8000px -2700px;
  }
  67.74% {
    background-position: -9000px -2700px;
  }
  68.55% {
    background-position: -10000px -2700px;
  }
  69.35% {
    background-position: -11000px -2700px;
  }
  70.16% {
    background-position: -12000px -2700px;
  }
  70.97% {
    background-position: -13000px -2700px;
  }
  71.77% {
    background-position: -14000px -2700px;
  }
  72.58% {
    background-position: 0px -3240px;
  }
  73.39% {
    background-position: -1000px -3240px;
  }
  74.19% {
    background-position: -2000px -3240px;
  }
  75.00% {
    background-position: -3000px -3240px;
  }
  75.81% {
    background-position: -4000px -3240px;
  }
  76.61% {
    background-position: -5000px -3240px;
  }
  77.42% {
    background-position: -6000px -3240px;
  }
  78.23% {
    background-position: -7000px -3240px;
  }
  79.03% {
    background-position: -8000px -3240px;
  }
  79.84% {
    background-position: -9000px -3240px;
  }
  80.65% {
    background-position: -10000px -3240px;
  }
  81.45% {
    background-position: -11000px -3240px;
  }
  82.26% {
    background-position: -12000px -3240px;
  }
  83.06% {
    background-position: -13000px -3240px;
  }
  83.87% {
    background-position: -14000px -3240px;
  }
  84.68% {
    background-position: 0px -3780px;
  }
  85.48% {
    background-position: -1000px -3780px;
  }
  86.29% {
    background-position: -2000px -3780px;
  }
  87.10% {
    background-position: -3000px -3780px;
  }
  87.90% {
    background-position: -4000px -3780px;
  }
  88.71% {
    background-position: -5000px -3780px;
  }
  89.52% {
    background-position: -6000px -3780px;
  }
  90.32% {
    background-position: -7000px -3780px;
  }
  91.13% {
    background-position: -8000px -3780px;
  }
  91.94% {
    background-position: -9000px -3780px;
  }
  92.74% {
    background-position: -10000px -3780px;
  }
  93.55% {
    background-position: -11000px -3780px;
  }
  94.35% {
    background-position: -12000px -3780px;
  }
  95.16% {
    background-position: -13000px -3780px;
  }
  95.97% {
    background-position: -14000px -3780px;
  }
  96.77% {
    background-position: 0px -4320px;
  }
  97.58% {
    background-position: -1000px -4320px;
  }
  98.39% {
    background-position: -2000px -4320px;
  }
  99.19% {
    background-position: -3000px -4320px;
  }
  100.00% {
    background-position: -4000px -4320px;
  }
}

.centerPart_guyuansurvey {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  padding: 104px 20px 20px 20px;
  // background: url("/image/guyuansurvey/circle.png") no-repeat;
  // background-position: 53% 100%;
  .container {
    width: 100%;
    height: 100%;
    // border: 1px solid springgreen;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .map {
      width: 1000px;
      height: 50%;
      // border: 1px solid firebrick;
      position: absolute;
      bottom: 31%;
      left: 32%;
      background: url("/image/guyuansurvey/centermapbg.png") no-repeat;
      background-position: 0% 0%;
      background-size: 100%;
      transform: scale(2.1);
      // animation: 5s myAnimation 2s steps(1) infinite;
      img {
        left: 28%;
        bottom: 13%;
        position: absolute;
      }
      p {
        font-size: 32px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 27px;
        color: #99c6d3;
        position: absolute;
        &:nth-of-type(1) {
          left: 30%;
          bottom: 24%;
          color: rgb(255, 255, 255);
        }
        &:nth-of-type(2) {
          left: 33%;
          top: 48%;
        }
        &:nth-of-type(3) {
          left: 50%;
          top: 40%;
        }
        &:nth-of-type(4) {
          left: 62%;
          top: 30%;
        }
        &:nth-of-type(5) {
          right: 17%;
          top: 22%;
        }
      }
    }
    .maintop {
      display: flex;
      justify-content: space-between;
      div {
        width: 556px;
        height: 292px;
        // border: 1px solid violet;
        h2 {
          font-size: 34px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 40px;
          color: #d5f0ff;
        }
        p {
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 45px;
          color: #d5f0ff;
          width: 448px;
        }
      }
      .maintop1 {
        background: url("/image/guyuansurvey/centermainbg1.png") no-repeat;
        position: relative;
        h2 {
          transform: rotateZ(3deg);
          margin-top: 52px;
          margin-left: 113px;
        }
        p {
          transform: rotateZ(3deg);
          margin-top: 30px;
          margin-left: 62px;
        }
        // img {
        //   position: absolute;
        //   left: 96%;
        //   top: 49%;
        // }
      }
      .maintop2 {
        background: url("/image/guyuansurvey/centermainbg2.png") no-repeat;
        position: relative;
        h2 {
          transform: rotateZ(-2deg);
          margin-top: 60px;
          margin-left: 142px;
        }
        p {
          transform: rotateZ(-2deg);
          margin-top: 40px;
          margin-left: 104px;
        }
        // img {
        //   position: absolute;
        //   left: -168%;
        //   top: 52%;
        // }
      }
    }
    .mainbottom {
      display: flex;
      justify-content: space-between;
      margin-bottom: 100px;
      div {
        width: 556px;
        height: 292px;
        // border: 1px solid violet;
        h2 {
          font-size: 34px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 40px;
          color: #d5f0ff;
        }
        p {
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 45px;
          color: #d5f0ff;
        }
      }
      .mainbottom1 {
        background: url("/image/guyuansurvey/centermainbg4.png") no-repeat;
        position: relative;
        h2 {
          transform: rotateZ(-1deg);
          margin-top: 40px;
          margin-left: 90px;
        }
        p {
          transform: rotateZ(-2deg);
          margin-top: 30px;
          margin-left: 62px;
          width: 300px;
        }
        // img {
        //   position: absolute;
        //   left: 87%;
        //   top: 36%;
        // }
      }
      .mainbottom2 {
        width: 520px;
        background: url("/image/guyuansurvey/centermainbg3.png") no-repeat;
        position: relative;
        h2 {
          transform: rotateZ(-1deg);
          margin-top: 36px;
          margin-left: 94px;
        }
        p {
          transform: rotateZ(-2deg);
          margin-top: 22px;
          margin-left: 50px;
        }
        // img {
        //   position: absolute;
        //   left: -185%;
        //   top: 42%;
        // }
      }
    }
  }
}
</style>
