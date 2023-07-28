<template>
  <div class="centerPart_powerServiceCenter">
    <div class="container">
      <div class="centerimg">
        <!-- <img src="/image/powerServiceCenter/centerbg2.png" alt="" />
        <img src="/image/powerServiceCenter/centerbg3.png" alt="" />
        <img src="/image/powerServiceCenter/centerbg4.png" alt="" />
        <img src="/image/powerServiceCenter/centerbg5.png" alt="" />
        <img src="/image/powerServiceCenter/centerbg6.png" alt="" /> -->
      </div>
      <div class="info">
        <div class="arrow_left"></div>
        <div class="arrow_right"></div>
        <div class="info_msg">
          <!-- <p>构建过程透明、信息在线<br />流程融合的供电服务指挥系统</p>
          <p>以客户为中心<br />提升供电可靠性、优化营商环境</p> -->
          <p>{{ titledata[0].columnValue1 }}</p>
          <p>{{ titledata[1].columnValue1 }}</p>
          <img src="/image/powerServiceCenter/leftbacktitle.png" alt="" />
          <img src="/image/powerServiceCenter/rightbacktitle.png" alt="" />
        </div>
      </div>
      <div class="bottom_content">
        <div class="bottom_content_img">
          <div>
            <img src="/image/powerServiceCenter/pwtk-bg.png" alt="" />
            <p>配网调控业务</p>
          </div>
          <div>
            <img src="/image/powerServiceCenter/pwzh-bg.png" alt="" />
            <p>配网指挥业务</p>
          </div>
          <div>
            <img src="/image/powerServiceCenter/fwzh.png" alt="" />
            <p>服务指挥业务</p>
          </div>
          <div>
            <img src="/image/powerServiceCenter/ykqlc-bg.png" alt="" />
            <p>业扩全流程管控</p>
          </div>
          <div>
            <img src="/image/powerServiceCenter/pdyy-bg.png" alt="" />
            <p>配电运营管控</p>
          </div>
          <div>
            <img src="/image/powerServiceCenter/fwzhljd.png" alt="" />
            <p>服务质量监督</p>
          </div>
          <div>
            <img src="/image/powerServiceCenter/yxfx-bg.png" alt="" />
            <p>运行分析决策</p>
          </div>
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
      titledata: [
        {
          columnValue1: "",
        },
        {
          columnValue1: "",
        },
      ],
    };
  },
  watch: {
    initData(val) {
      // console.log("中间数据", val);
      this.titledata = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item, index) => {
        if (index > 6) {
          this.titledata.push({
            columnValue1: item.columnValue1.split("/")[1],
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
@keyframes center_top_animation {
  0% {
    background-position: 0 -100%;
    opacity: 0;
  }
  50% {
    background-position: 0 -50%;
    opacity: 0;
  }
  100% {
    background-position: 0 0;
    opacity: 1;
  }
}
@keyframes center_bg_animation {
  0% {
    background-position: center -250%;
  }
  50% {
    background-position: center 0;
  }
  100% {
    background-position: center 40%;
  }
}
// @keyframes X_yidong_animation {
//   0% {
//     transform: translateX(0%),;
//   }
//   100% {
//     transform: translateX(50%);
//   }
// }
// @keyframes Y_yidong_animation {
//   0% {
//     transform: translateY(0%);
//   }

//   100% {
//     transform: translateY(50%);
//   }
// }

.centerPart_powerServiceCenter {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  background: url("/image/animationKeyFramesBg/powerServiceCenter_center_bg.png")
    no-repeat;
  background-position: center 30%;
  background-size: 90%;
  opacity: 0.8;
  // background-repeat: no-repeat;
  // background-origin: border-box;
  // animation: center_bg_animation 2s linear;
  .container {
    height: 100%;
    position: relative;
    // background: url("/image/powerServiceCenter/bg3.png") no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    // animation: center_top_animation 2s linear;
    .centerimg {
      width: 400px;
      height: 340px;
      // border: 2px solid chartreuse;
      // background: chartreuse;
      position: absolute;
      left: 41%;
      top: 28%;
      // background: url("/image/powerServiceCenter/centerbg1.png") no-repeat;
      background-position: center bottom;
      // position: relative;
      img {
        position: absolute;
        width: 150px;
        &:nth-of-type(1) {
          left: 4%;
          top: 48%;
          animation: 2s heartBeat 2s infinite;
        }
        &:nth-of-type(2) {
          right: 8%;
          bottom: 23%;
          animation: 2s pulse 2s infinite;
        }
        &:nth-of-type(3) {
          width: 120px;
          left: 8%;
          top: 10%;
          animation: 2s pulse 2s infinite;
        }
        &:nth-of-type(4) {
          width: 100px;
          right: 8%;
          top: 4%;
          animation: 2s heartBeat 2s infinite;
        }
        &:nth-of-type(5) {
          width: 80px;
          right: 40%;
          top: 20%;
          animation: 2s pulse 2s infinite;
        }
      }
    }
    .info {
      height: 100%;
      // background: url("/image/operationMonitor/center_arrow.png") no-repeat;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      animation: zoomIn 2s;
      .arrow_left {
        position: absolute;
        left: 100px;
        top: 150px;
        width: 163px;
        height: 603px;
        background: url("/image/powerServiceCenter/arrow_left.png") no-repeat;
      }
      .arrow_right {
        position: absolute;
        right: 100px;
        top: 150px;
        width: 163px;
        height: 603px;
        background: url("/image/powerServiceCenter/arrow_right.png") no-repeat;
      }
      .info_msg {
        width: calc(100% - 300px);
        height: 400px;
        margin-top: 400px;
        // background: chartreuse;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        p {
          font-size: 40px;
          line-height: 68px;
          width: 560px;
          &:nth-of-type(1) {
            text-align: right;
            margin-bottom: 220px;
          }
          &:nth-of-type(2) {
            margin-bottom: 220px;
          }
        }
        img {
          &:nth-of-type(1) {
            position: absolute;
            left: 0;
            top: -7%;
          }
          &:nth-of-type(2) {
            position: absolute;
            right: -7%;
            top: -7%;
          }
        }
      }
    }
    .bottom_content {
      position: absolute;
      left: 0;
      bottom: 10%;
      width: 100%;
      .bottom_content_img {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        div {
          position: relative;
          animation: bounceInDown 4s, 2s pulse 1s infinite;
          p {
            position: absolute;
            color: #fbffff;
            font-size: 36px;
          }
          &:nth-of-type(1) {
            margin-top: 30px;
            p {
              left: 20%;
              top: 20%;
            }
          }
          &:nth-of-type(2) {
            margin-top: 20px;
            p {
              left: 20%;
              top: 20%;
            }
          }
          &:nth-of-type(3) {
            margin-top: 10px;
            p {
              left: 20%;
              top: 20%;
            }
          }
          &:nth-of-type(4) {
            p {
              left: 14%;
              top: 20%;
            }
          }
          &:nth-of-type(5) {
            margin-top: 10px;
            p {
              left: 14%;
              top: 20%;
            }
          }
          &:nth-of-type(6) {
            margin-top: 20px;
            p {
              left: 14%;
              top: 20%;
            }
          }
          &:nth-of-type(7) {
            margin-top: 30px;
            p {
              left: 14%;
              top: 20%;
            }
          }
          // p {

          //   // &:nth-of-type(1) {
          //   //   left: 2%;
          //   //   top: 20%;
          //   // }
          //   // &:nth-of-type(2) {
          //   //   left: 16%;
          //   //   top: 20%;
          //   // }
          //   // &:nth-of-type(3) {
          //   //   left: 31%;
          //   //   top: 20%;
          //   // }
          //   // &:nth-of-type(4) {
          //   //   left: 44%;
          //   //   top: 20%;
          //   // }
          //   // &:nth-of-type(5) {
          //   //   right: 34%;
          //   //   top: 20%;
          //   // }
          //   // &:nth-of-type(6) {
          //   //   right: 18%;
          //   //   top: 20%;
          //   // }
          //   // &:nth-of-type(7) {
          //   //   right: 4%;
          //   //   top: 20%;
          //   // }
          // }
        }
      }
    }
  }
}
</style>
