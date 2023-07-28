<template>
  <div class="powerServiceCenterkLeftPart">
    <div class="resources">
      <div class="loadMask" v-if="maskShow">
        <div class="scrollBar"></div>
      </div>
      <div class="resources_in">
        <div class="top">
          <div>
            <p>营销</p>
            <div class="topimg1 topimg"></div>
          </div>
          <div>
            <div class="topimg2 topimg"></div>
            <p>运检</p>
          </div>
          <div>
            <div class="topimg3 topimg"></div>
            <p>调控</p>
          </div>
        </div>
        <div class="center2">
          <div class="center-main">
            <img src="/image/powerServiceCenter/XMLID.png" alt="" />
            <p>营销SG186</p>
            <p>配电自动化</p>
            <p>设备运维精益管理</p>
            <p>供电服务<br />指挥系统</p>
            <p>调度自动化</p>
            <p>用电信息采集</p>
            <p>调度管理指挥</p>
          </div>
        </div>

        <div class="bottommain">
          <div class="bottom-cent">
            <div>
              <p>西吉县</p>
              <div class="bottomimg"></div>
            </div>
            <div>
              <p>原州区</p>
              <div class="bottomimg"></div>
            </div>
            <div>
              <p>隆德县</p>
              <div class="bottomimg"></div>
            </div>
            <div>
              <p>泾源县</p>
              <div class="bottomimg"></div>
            </div>
            <div>
              <p>彭阳县</p>
              <div class="bottomimg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="earthbox">
      <div class="earth"></div>
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
      maskShow: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.maskShow = false;
    }, 6000);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
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
@keyframes lbx_animation {
  0% {
    background-size: 50%;
  }
  50% {
    background-size: 75%;
  }
  100% {
    background-size: 50%;
  }
}
@keyframes touming_animation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes yiru_animation {
  0% {
    opacity: 0;
    transform: translateY(-100%) rotateX(90deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}
@keyframes flashAnimation {
  0% {
    left: -100%;
  }
  50% {
    left: 150%;
  }
  100% {
    left: -100%;
  }
}
.powerServiceCenterkLeftPart {
  position: absolute;
  top: 88px;
  left: 66px;
  width: 1458px;
  height: 988px;
  .resources {
    height: 988px;
    background: url("/image/powerServiceCenter/leftwin.png") no-repeat;
    padding-top: 136px;
    // animation: yiru_animation 2s;
    animation: slideInDown 1s;
    .loadMask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      .scrollBar {
        height: 100%;
        overflow: hidden;
        position: relative;
        &:after {
          position: absolute;
          left: -100%; /*改变left的值，让其相对box影藏*/
          top: 0;
          width: 30%;
          height: 100%;
          content: "";
          /* Safari 5.1 - 6.0 */
          background: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          /* Opera 11.1 - 12.0 */
          background: -o-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          /* Firefox 3.6 - 15 */
          background: -moz-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          /* 标准的语法 */
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-45deg);
          // left: 150%;
          // transition: 2s ease;
          animation: flashAnimation 4s ease-in-out 2s;
        }
      }
    }
    .resources_in {
      width: 100%;
      animation: 1s touming_animation 1s backwards;
      .top {
        padding: 0 300px;
        display: flex;
        justify-content: space-around;
        div {
          width: 300px;
          height: 262px;
          position: relative;
          .topimg {
            position: absolute;
            width: 300px;
            height: 300px;
            background-position: 0px 0px;
            // animation: 5s iconAnimation 2s steps(1) infinite;
          }
          .topimg1 {
            left: 0px;
            top: -46px;
            background: url("/image/powerServiceCenter/bigyxb.png");
          }
          .topimg2 {
            left: -100px;
            top: -92px;
            background: url("/image/powerServiceCenter/yjbig.png");
          }
          .topimg3 {
            left: -102px;
            top: -70px;
            background: url("/image/powerServiceCenter/tkzxbig.png");
          }
          p {
            font-size: 40px;
            color: #9cfff0;
            position: absolute;
          }
          &:nth-of-type(1) {
            p {
              bottom: 22%;
              left: 0;
            }
          }
          &:nth-of-type(2) {
            p {
              bottom: 0;
              left: 35%;
            }
          }
          &:nth-of-type(3) {
            p {
              right: 0;
              bottom: 22%;
            }
          }
        }
      }
      .center2 {
        display: flex;
        justify-content: center;
        background: url("/image/powerServiceCenter/lbx.png") no-repeat;
        background-position: center bottom;
        background-size: 50%;
        animation: 2s lbx_animation 1s linear;
        .center-main {
          height: 226px;
          width: 500px;
          position: relative;
          img {
            position: absolute;
            left: 26%;
            top: -36%;
          }
          p {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffee24;
            text-shadow: 0px 3px 6px rgba(49, 196, 255, 0.48);
            position: absolute;
            animation: 2s fadeInDown 1s;
            &:nth-of-type(1) {
              left: 2%;
              top: 24%;
            }
            &:nth-of-type(2) {
              left: -26%;
              top: 49%;
            }
            &:nth-of-type(3) {
              left: -12%;
              top: 84%;
            }
            &:nth-of-type(4) {
              left: 41%;
              bottom: 64%;
              animation: 2s fadeInUp 1s;
            }
            &:nth-of-type(5) {
              right: -14%;
              top: 26%;
            }
            &:nth-of-type(6) {
              right: -35%;
              top: 65%;
            }
            &:nth-of-type(7) {
              right: 6%;
              bottom: 0%;
            }
          }
        }
      }
      .bottommain {
        padding: 2% 0% 0 10%;
        .bottom-cent {
          display: flex;
          justify-content: space-between;
          div {
            width: 300px;
            height: 300px;
            position: relative;
            p {
              font-size: 30px;
              width: 40px;
              animation: fadeInLeft 4s;
            }
            .bottomimg {
              position: absolute;
              left: -38%;
              top: -46%;
              width: 300px;
              height: 300px;
              background: url("/image/powerServiceCenter/bottombig.png");
              background-position: 0px 0px;
              // animation: 5s iconAnimation 2s steps(1) infinite;
            }
          }
        }
      }
    }
  }
  .earthbox {
    position: absolute;
    width: 300px;
    height: 300px;
    left: -10%;
    bottom: 4%;
    animation: lightSpeedInLeft 4s;
    .earth {
      position: absolute;
      left: 0%;
      top: 0%;
      width: 300px;
      height: 300px;
      background: url("/image/powerServiceCenter/earthbig.png");
      background-position: 0 0;
      background-origin: content-box;
      // animation: 5s iconAnimation 2s steps(1) infinite;
    }
  }
}
</style>
