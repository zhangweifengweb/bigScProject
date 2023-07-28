<template>
  <div class="centerPart_greendoublecarbon">
    <div class="container">
      <div class="cont-info">
        <div class="cont">
          <div class="imgcont"></div>
        </div>
      </div>
      <div class="charts">
        <div class="chengshi" v-for="(item, index) in dtmsg" :key="index">
          <div class="lineimg">
            <img src="/image/greendoublecarbon/line.png" alt="" />
          </div>
          <div class="img2">
            <img :src="item.icsrc" alt="" />
          </div>
          <div class="cent-msg">
            <img src="/image/greendoublecarbon/t1.png" alt="" />
            <p>
              <span>{{ item.mgdnum }}</span>
            </p>
          </div>
          <div class="cent-msg">
            <img src="/image/greendoublecarbon/t2.png" alt="" />
            <p>
              <span>{{ item.cdznum }}</span>
            </p>
          </div>
          <div class="cent-msg">
            <img src="/image/greendoublecarbon/t3.png" alt="" />
            <p>
              <span>{{ item.gfnum }}</span>
            </p>
          </div>
        </div>

        <div class="cityname ci1">
          <div>
            <p>西吉县</p>
          </div>
        </div>
        <div class="cityname ci2">
          <div>
            <p>隆德县</p>
          </div>
        </div>
        <div class="cityname ci3">
          <div>
            <p>泾源县</p>
          </div>
        </div>
        <div class="cityname ci4">
          <div>
            <p>彭阳县</p>
          </div>
        </div>
        <div class="cityname ci5">
          <div>
            <p>原州区</p>
          </div>
        </div>

        <div class="tuli">
          <div>
            <img src="/image/greendoublecarbon/tl1.png" alt="" />
            <p>煤改电</p>
          </div>
          <div>
            <img src="/image/greendoublecarbon/tl2.png" alt="" />
            <p>充电桩</p>
          </div>
          <div>
            <img src="/image/greendoublecarbon/tl3.png" alt="" />
            <p>光伏</p>
          </div>
        </div>
        <div class="kuang">
          <div class="kuang-cent">
            <p>{{ desc.cent1 }}</p>
            <p>{{ desc.cent2 }}</p>
          </div>
        </div>
        <mapChart @changeMap="changeMap" ref="mapComponents" />
      </div>
    </div>
  </div>
</template>
<script>
import mapChart from "@/components/mapchart3";
export default {
  name: "baiduMap",
  components: {
    mapChart,
  },
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
      dtmsg: [
        {
          id: "1",
          icsrc: "/image/greendoublecarbon/dtx1.png",
          mgdnum: "110",
          cdznum: "140",
          gfnum: "140",
        },
        {
          id: "2",
          icsrc: "/image/greendoublecarbon/dtx2.png",
          mgdnum: "220",
          cdznum: "140",
          gfnum: "140",
        },
        {
          id: "3",
          icsrc: "/image/greendoublecarbon/dtx3.png",
          mgdnum: "330",
          cdznum: "140",
          gfnum: "140",
        },
        {
          id: "4",
          icsrc: "/image/greendoublecarbon/dtx4.png",
          mgdnum: "440",
          cdznum: "140",
          gfnum: "140",
        },
        {
          id: "5",
          icsrc: "/image/greendoublecarbon/dtx5.png",
          mgdnum: "550",
          cdznum: "140",
          gfnum: "140",
        },
      ],
      desc: {
        cent1: "",
        cent2: "",
      },
    };
  },
  methods: {
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
  },
  watch: {
    initData(val) {
      // console.log("中间数据", val);
      this.dtmsg = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item, index) => {
        if (index < 5) {
          this.dtmsg.push({
            icsrc: `/image/greendoublecarbon/dtx${index + 1}.png`,
            mgdnum: item.columnValue2.split("/")[1],
            cdznum: item.columnValue3.split("/")[1],
            gfnum: item.columnValue4.split("/")[1],
          });
        }
      });
      this.desc.cent1 =
        val.screenTargetPart01Data[0].targetContent[6].columnValue2.split(
          "/"
        )[1];
      this.desc.cent2 =
        val.screenTargetPart01Data[0].targetContent[6].columnValue3.split(
          "/"
        )[1];
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@keyframes center_top_animation {
  0% {
    background-size: 100% 100%;
  }

  100% {
    background-size: 300% 300%;
  }
}
@keyframes center_bottom_animation {
  0% {
    background-position: 0 200%;
  }
  50% {
    background-position: 0 120%;
  }
  100% {
    background-position: 0 100%;
  }
}
@keyframes center_bg_animation {
  0% {
    background-size: 300%;
    background-position: center;
  }
  100% {
    background-size: 100%;
    background-position: center;
  }
}
@keyframes dizuo_bg_animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes dizuo_bg_animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes msg_width_animation {
  0% {
    width: 0px;
  }
  100% {
    width: 260px;
  }
}
@keyframes msg2_width_animation {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@keyframes msg3_width_animation {
  0% {
    width: 0px;
  }
  100% {
    width: 154px;
  }
}
@keyframes iconAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -400px 0px;
  }
  1.61% {
    background-position: -800px 0px;
  }
  2.42% {
    background-position: -1200px 0px;
  }
  3.23% {
    background-position: -1600px 0px;
  }
  4.03% {
    background-position: -2000px 0px;
  }
  4.84% {
    background-position: -2400px 0px;
  }
  5.65% {
    background-position: -2800px 0px;
  }
  6.45% {
    background-position: -3200px 0px;
  }
  7.26% {
    background-position: -3600px 0px;
  }
  8.06% {
    background-position: -4000px 0px;
  }
  8.87% {
    background-position: -4400px 0px;
  }
  9.68% {
    background-position: 0px -400px;
  }
  10.48% {
    background-position: -400px -400px;
  }
  11.29% {
    background-position: -800px -400px;
  }
  12.10% {
    background-position: -1200px -400px;
  }
  12.90% {
    background-position: -1600px -400px;
  }
  13.71% {
    background-position: -2000px -400px;
  }
  14.52% {
    background-position: -2400px -400px;
  }
  15.32% {
    background-position: -2800px -400px;
  }
  16.13% {
    background-position: -3200px -400px;
  }
  16.94% {
    background-position: -3600px -400px;
  }
  17.74% {
    background-position: -4000px -400px;
  }
  18.55% {
    background-position: -4400px -400px;
  }
  19.35% {
    background-position: 0px -800px;
  }
  20.16% {
    background-position: -400px -800px;
  }
  20.97% {
    background-position: -800px -800px;
  }
  21.77% {
    background-position: -1200px -800px;
  }
  22.58% {
    background-position: -1600px -800px;
  }
  23.39% {
    background-position: -2000px -800px;
  }
  24.19% {
    background-position: -2400px -800px;
  }
  25.00% {
    background-position: -2800px -800px;
  }
  25.81% {
    background-position: -3200px -800px;
  }
  26.61% {
    background-position: -3600px -800px;
  }
  27.42% {
    background-position: -4000px -800px;
  }
  28.23% {
    background-position: -4400px -800px;
  }
  29.03% {
    background-position: 0px -1200px;
  }
  29.84% {
    background-position: -400px -1200px;
  }
  30.65% {
    background-position: -800px -1200px;
  }
  31.45% {
    background-position: -1200px -1200px;
  }
  32.26% {
    background-position: -1600px -1200px;
  }
  33.06% {
    background-position: -2000px -1200px;
  }
  33.87% {
    background-position: -2400px -1200px;
  }
  34.68% {
    background-position: -2800px -1200px;
  }
  35.48% {
    background-position: -3200px -1200px;
  }
  36.29% {
    background-position: -3600px -1200px;
  }
  37.10% {
    background-position: -4000px -1200px;
  }
  37.90% {
    background-position: -4400px -1200px;
  }
  38.71% {
    background-position: 0px -1600px;
  }
  39.52% {
    background-position: -400px -1600px;
  }
  40.32% {
    background-position: -800px -1600px;
  }
  41.13% {
    background-position: -1200px -1600px;
  }
  41.94% {
    background-position: -1600px -1600px;
  }
  42.74% {
    background-position: -2000px -1600px;
  }
  43.55% {
    background-position: -2400px -1600px;
  }
  44.35% {
    background-position: -2800px -1600px;
  }
  45.16% {
    background-position: -3200px -1600px;
  }
  45.97% {
    background-position: -3600px -1600px;
  }
  46.77% {
    background-position: -4000px -1600px;
  }
  47.58% {
    background-position: -4400px -1600px;
  }
  48.39% {
    background-position: 0px -2000px;
  }
  49.19% {
    background-position: -400px -2000px;
  }
  50.00% {
    background-position: -800px -2000px;
  }
  50.81% {
    background-position: -1200px -2000px;
  }
  51.61% {
    background-position: -1600px -2000px;
  }
  52.42% {
    background-position: -2000px -2000px;
  }
  53.23% {
    background-position: -2400px -2000px;
  }
  54.03% {
    background-position: -2800px -2000px;
  }
  54.84% {
    background-position: -3200px -2000px;
  }
  55.65% {
    background-position: -3600px -2000px;
  }
  56.45% {
    background-position: -4000px -2000px;
  }
  57.26% {
    background-position: -4400px -2000px;
  }
  58.06% {
    background-position: 0px -2400px;
  }
  58.87% {
    background-position: -400px -2400px;
  }
  59.68% {
    background-position: -800px -2400px;
  }
  60.48% {
    background-position: -1200px -2400px;
  }
  61.29% {
    background-position: -1600px -2400px;
  }
  62.10% {
    background-position: -2000px -2400px;
  }
  62.90% {
    background-position: -2400px -2400px;
  }
  63.71% {
    background-position: -2800px -2400px;
  }
  64.52% {
    background-position: -3200px -2400px;
  }
  65.32% {
    background-position: -3600px -2400px;
  }
  66.13% {
    background-position: -4000px -2400px;
  }
  66.94% {
    background-position: -4400px -2400px;
  }
  67.74% {
    background-position: 0px -2800px;
  }
  68.55% {
    background-position: -400px -2800px;
  }
  69.35% {
    background-position: -800px -2800px;
  }
  70.16% {
    background-position: -1200px -2800px;
  }
  70.97% {
    background-position: -1600px -2800px;
  }
  71.77% {
    background-position: -2000px -2800px;
  }
  72.58% {
    background-position: -2400px -2800px;
  }
  73.39% {
    background-position: -2800px -2800px;
  }
  74.19% {
    background-position: -3200px -2800px;
  }
  75.00% {
    background-position: -3600px -2800px;
  }
  75.81% {
    background-position: -4000px -2800px;
  }
  76.61% {
    background-position: -4400px -2800px;
  }
  77.42% {
    background-position: 0px -3200px;
  }
  78.23% {
    background-position: -400px -3200px;
  }
  79.03% {
    background-position: -800px -3200px;
  }
  79.84% {
    background-position: -1200px -3200px;
  }
  80.65% {
    background-position: -1600px -3200px;
  }
  81.45% {
    background-position: -2000px -3200px;
  }
  82.26% {
    background-position: -2400px -3200px;
  }
  83.06% {
    background-position: -2800px -3200px;
  }
  83.87% {
    background-position: -3200px -3200px;
  }
  84.68% {
    background-position: -3600px -3200px;
  }
  85.48% {
    background-position: -4000px -3200px;
  }
  86.29% {
    background-position: -4400px -3200px;
  }
  87.10% {
    background-position: 0px -3600px;
  }
  87.90% {
    background-position: -400px -3600px;
  }
  88.71% {
    background-position: -800px -3600px;
  }
  89.52% {
    background-position: -1200px -3600px;
  }
  90.32% {
    background-position: -1600px -3600px;
  }
  91.13% {
    background-position: -2000px -3600px;
  }
  91.94% {
    background-position: -2400px -3600px;
  }
  92.74% {
    background-position: -2800px -3600px;
  }
  93.55% {
    background-position: -3200px -3600px;
  }
  94.35% {
    background-position: -3600px -3600px;
  }
  95.16% {
    background-position: -4000px -3600px;
  }
  95.97% {
    background-position: -4400px -3600px;
  }
  96.77% {
    background-position: 0px -4000px;
  }
  97.58% {
    background-position: -400px -4000px;
  }
  98.39% {
    background-position: -800px -4000px;
  }
  99.19% {
    background-position: -1200px -4000px;
  }
  100.00% {
    background-position: -1600px -4000px;
  }
}
.centerPart_greendoublecarbon {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  background: url("/image/greendoublecarbon/bg2.png") no-repeat;
  background-position: center;
  background-origin: border-box;
  background-size: 100%;
  animation: center_bg_animation 1s linear;
  .container {
    height: 100%;
    position: relative;
    background: url("/image/greendoublecarbon/bg3.png") no-repeat;
    background-position: 0 100%;
    background-size: 100% 60%;
    animation: center_bottom_animation 1s linear;
    .cont-info {
      height: 100%;
      background: url("/image/operationMonitor/center_arrow.png") no-repeat 0 0/96%
        76%;
      background-position: center;
      position: relative;
      animation: zoomIn 2s;
      .cont {
        height: 100%;
        position: relative;
        background: url("/image/greendoublecarbon/bg4.png") no-repeat;
        background-position: 55%;
        animation: 3s center_top_animation 1s linear forwards;
        .imgcont {
          background: url("/image/greendoublecarbon/dp.png") no-repeat;
          background-position: center bottom;
          animation: 1s dizuo_bg_animation 1.5s backwards;
          width: 100%;
          height: 100%;
        }
        img {
        }
      }
    }
    .charts {
      position: absolute;
      width: 2200px;
      height: calc(100% - 180px);
      top: 140px;
      left: 310px;
      animation: fadeIn 0.5s;
      #mapChart {
        height: 100%;
        width: 100%;
      }
      .chengshi {
        position: absolute;
        width: 260px;
        height: 164px;
        padding: 10px 50px 10px 36px;
        background: url("/image/greendoublecarbon/kuang2.png") no-repeat;
        z-index: 100;
        // overflow: hidden;
        white-space: nowrap;
        animation: msg_width_animation 1s;
        .lineimg {
          position: absolute;
          right: -8px;
          top: -28px;
          overflow: hidden;
          width: 100%;
          animation: msg2_width_animation 1s;
        }
        .cent-msg {
          // background: red;
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          animation: 2s msg2_width_animation 1s backwards;
        }
        div {
          font-size: 26px;
          // width: 174px;
          // background: red;
          p {
            display: inline-block;
            padding-left: 60px;
            line-height: 50px;
          }
        }
        &:nth-of-type(1) {
          right: 78%;
          top: 20%;
          .img2 {
            animation: zoomInLeft 2s;
            position: absolute;
            right: -4%;
            top: 6%;
          }
        }
        &:nth-of-type(2) {
          right: 60%;
          top: 46%;
          .img2 {
            animation: zoomInLeft 2s;
            position: absolute;
            right: -4%;
            top: 6%;
          }
        }
        &:nth-of-type(3) {
          right: 20%;
          top: 56%;
          .img2 {
            animation: zoomInRight 2s;
            position: absolute;
            left: -4%;
            top: 6%;
          }
        }
        &:nth-of-type(4) {
          right: 24%;
          top: 22%;
          .img2 {
            animation: zoomInRight 2s;
            position: absolute;
            left: -4%;
            top: 6%;
          }
        }
        &:nth-of-type(5) {
          right: 38%;
          top: 6%;
          .img2 {
            animation: zoomInRight 2s;
            position: absolute;
            left: -4%;
            top: 6%;
          }
        }
      }
      .cityname {
        position: absolute;
        z-index: 100;
        width: 400px;
        height: 400px;
        animation: 5s iconAnimation 2s steps(1) infinite;
        div {
          p {
            font-size: 24px;
            font-family: Helvetica;
            color: #ffffff;
            letter-spacing: 4px;
            line-height: 29px;
            text-align: center;
            padding: 16px 0px;
            position: absolute;
            width: 154px;
            height: 63px;
            white-space: nowrap;
            overflow: hidden;
            animation: msg3_width_animation 1s;
          }
        }
      }
      .ci1 {
        left: 18%;
        top: 18%;
        background: url("/image/greendoublecarbon/greenC.png");
        p {
          background: rgba(26, 224, 147, 0.65);
          left: 120px;
          top: 84px;
        }
      }
      .ci2 {
        background: url("/image/greendoublecarbon/blueC.png");
        left: 38%;
        top: 36%;
        p {
          background: rgba(55, 242, 252, 0.43);
          left: 126px;
          top: 88px;
        }
      }
      .ci3 {
        background: url("/image/greendoublecarbon/redC.png");
        left: 54%;
        top: 54%;
        p {
          background: rgba(251, 102, 42, 0.43);
          left: 122px;
          top: 92px;
        }
      }
      .ci4 {
        background: url("/image/greendoublecarbon/redC.png");
        right: 32%;
        top: 12%;
        p {
          background: rgba(251, 102, 42, 0.43);
          left: 120px;
          top: 100px;
        }
      }
      .ci5 {
        // background: red;
        background: url("/image/greendoublecarbon/blueC.png");
        right: 44%;
        top: 10%;
        p {
          background: rgba(55, 242, 252, 0.43);
          left: 130px;
          top: 84px;
        }
      }
      .tuli {
        position: absolute;
        left: 4%;
        bottom: 18%;
        animation: fadeInUp 1s;
        div {
          width: 162px;
          height: 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 24px;
            font-family: Helvetica;
            color: #9ac0e0;
            line-height: 29px;
            letter-spacing: 1px;
            text-align: left;
          }
        }
      }
      .kuang {
        animation: fadeInUp 1s;
        z-index: 1000;
        position: absolute;
        right: 2%;
        bottom: 20%;
        // border: 2px solid #9ac0e0;
        width: 358px;
        height: 374px;
        background: url("/image/greendoublecarbon/kuang.png") no-repeat;
        padding: 20px 43px 21px 25px;
        // overflow-y: scroll;
        .kuang-cent {
          width: 100%;
          height: 100%;
          padding-top: 20px;
          animation: 1s dizuo_bg_animation 1.5s backwards;
          p {
            font-size: 22px;
            font-family: Helvetica;
            color: #e5e6e7;
            line-height: 33px;
            letter-spacing: 3px;
            width: 100%;
            text-indent: 2em;
          }
        }
      }
    }
  }
}
</style>
