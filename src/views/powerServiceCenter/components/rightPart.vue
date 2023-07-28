<template>
  <div class="powerServiceCenterRightPart">
    <div class="infoMonitor">
      <div class="inforMonitorIn">
        <div class="content">
          <!-- <div class="zhezhao"></div> -->
          <div class="loadMask" v-if="maskShow">
            <div class="scrollBar"></div>
          </div>
          <div
            :class="item.classname"
            v-for="(item, index) in treeData"
            :key="index"
          >
            <img :src="item.columnValue3" alt="" />
            <div class="msg">
              <p>{{ item.columnValue1 }}</p>
              <span>{{ item.columnValue2 }}</span>
            </div>
          </div>
          <!-- <div class="contentPig1">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <p>2014/01</p>
              <span>配电自动化创建，配网设备实现实时集中监控</span>
            </div>
          </div>
          <div class="contentPig2">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <p>2014/02</p>
              <span>配电自动化创建，配网设备实现实时集中监控</span>
            </div>
          </div>
          <div class="contentPig3">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <p>2014/03</p>
              <span>配电自动化创建，配网设备实现实时集中监控</span>
            </div>
          </div>
          <div class="contentPig4">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <p>2014/04</p>
              <span>配电自动化创建，配网设备实现实时集中监控</span>
            </div>
          </div>
          <div class="contentPig5">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <p>2014/05</p>
              <span>配电自动化创建，配网设备实现实时集中监控</span>
            </div>
          </div>
          <div class="contentPig6">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <span>配电自动化创建，配网设备实现实时集中监控</span>
              <p>2014/06</p>
            </div>
          </div>
          <div class="contentPig7">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <span>配电自动化创建，配网设备实现实时集中监控</span>
              <p>2014/07</p>
            </div>
          </div>
          <div class="contentPig8">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <span>配电自动化创建，配网设备实现实时集中监控</span>
              <p>2014/08</p>
            </div>
          </div>
          <div class="contentPig9">
            <img src="/image/powerServiceCenter/pigpig.png" alt="" />
            <div class="msg">
              <p>2014/09</p>
              <span>配电自动化创建，配网设备实现实时集中监控</span>
            </div>
          </div> -->
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
      maskShow: true,
      treeData: [],
    };
  },
  watch: {
    initData(val) {
      // console.log("右边数据", val);
      // let objData = val.screenTargetPart01Data[0].targetContent[0];
      // let objarr = [];
      // for (let i in objData) {
      //   objarr.push({
      //     time: objData[i].split("/")[0],
      //     des: objData[i].split("/")[1],
      //   });
      // }
      // objarr.forEach((item, index) => {
      //   if (index > 0 && index < 10) {
      //     this.treeData.push({
      //       classname: "contentPig" + index,
      //       time: item.time,
      //       des: item.des,
      //     });
      //   }
      // });
      // let objImgData = val.screenTargetPart01Data[0].targetContent[1];
      val.screenTargetPart01Data[0].targetContent.forEach((item, index) => {
        this.treeData.push({
          classname: "contentPig" + (index + 1),
          columnValue1: item.columnValue1.split("/")[1],
          columnValue2: item.columnValue2.split("/")[1],
          columnValue3: this.getUrl(item.columnValue3),
        });
      });
      // console.log("最终数据", this.treeData);
    },
  },
  mounted() {
    setTimeout(() => {
      this.maskShow = false;
    }, 6000);
  },
  methods: {
    getUrl(val) {
      let arr = val.split("/");
      arr.shift();
      let newStr = arr.join("/");
      return newStr;
    },
  },
};
</script>
<style lang="scss" scoped>
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
@keyframes width_Animation {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}
.powerServiceCenterRightPart {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  height: 988px;
  // background: #091621;
  .infoMonitor {
    height: 988px;
    background: url("/image/powerServiceCenter/rightwin.png") no-repeat;
    animation: slideInDown 1s;
    .inforMonitorIn {
      .content {
        height: 988px;
        animation: 2s width_Animation 1s backwards;
        background: url("/image/powerServiceCenter/timeline.png") no-repeat;
        background-position-y: 120px;
        position: relative;
        overflow: hidden;
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
        .contentPig1 {
          img {
            position: absolute;
            left: 112px;
            top: 384px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
          }
          .msg {
            text-align: center;
            width: 150px;
            position: absolute;
            left: 280px;
            top: 468px;
            p {
              font-size: 40px;
              color: #63f0ff;
            }
            span {
              font-size: 16px;
            }
          }
        }
        .contentPig2 {
          img {
            position: absolute;
            left: 425px;
            top: 342px;
            width: 142px;
            height: 88px;
            border-radius: 16px 0 16px 0;
          }
          .msg {
            text-align: center;
            width: 160px;
            position: absolute;
            left: 390px;
            top: 180px;
            p {
              font-size: 40px;
              color: #63f0ff;
            }
            span {
              font-size: 16px;
            }
          }
        }
        .contentPig3 {
          img {
            position: absolute;
            // left: 644px;
            // top: 286px;
            left: 490px;
            top: 474px;
            width: 142px;
            height: 88px;
            border-radius: 0px 16px 0px 16px;
          }
          .msg {
            text-align: center;
            width: 160px;
            position: absolute;
            // left: 620px;
            // top: 114px;
            left: 472px;
            top: 614px;
            p {
              font-size: 40px;
              color: #63f0ff;
            }
            span {
              font-size: 16px;
            }
          }
        }
      }
      .contentPig4 {
        img {
          position: absolute;
          // left: 872px;
          // top: 246px;
          left: 644px;
          top: 286px;
          width: 142px;
          height: 88px;
          border-radius: 16px 0 16px 0;
        }
        .msg {
          text-align: center;
          width: 160px;
          position: absolute;
          // left: 860px;
          // top: 354px;
          left: 620px;
          top: 140px;
          p {
            font-size: 40px;
            color: #63f0ff;
          }
          span {
            font-size: 16px;
          }
        }
      }
      .contentPig5 {
        img {
          position: absolute;
          // left: 1138px;
          // top: 192px;
          left: 712px;
          top: 486px;
          width: 142px;
          height: 88px;
          border-radius: 0px 16px 0px 16px;
        }
        .msg {
          text-align: center;
          width: 160px;
          position: absolute;
          // left: 1124px;
          // top: 290px;
          left: 708px;
          top: 636px;
          p {
            font-size: 40px;
            color: #63f0ff;
          }
          span {
            font-size: 16px;
          }
        }
      }
      .contentPig6 {
        img {
          position: absolute;
          // left: 490px;
          // top: 474px;
          left: 872px;
          top: 246px;
          width: 142px;
          height: 88px;
          border-radius: 16px 0px 16px 0px;
        }
        .msg {
          text-align: center;
          width: 160px;
          position: absolute;
          // left: 472px;
          // top: 644px;
          left: 860px;
          top: 336px;
          p {
            font-size: 40px;
            color: #63f0ff;
          }
          span {
            font-size: 16px;
          }
        }
      }
      .contentPig7 {
        img {
          position: absolute;
          // left: 712px;
          // top: 486px;
          left: 939px;
          top: 540px;
          width: 142px;
          height: 88px;
          border-radius: 0 16px 0 16px;
        }
        .msg {
          text-align: center;
          width: 160px;
          position: absolute;
          // left: 708px;
          // top: 636px;
          left: 934px;
          top: 652px;
          p {
            font-size: 40px;
            color: #63f0ff;
          }
          span {
            font-size: 16px;
          }
        }
      }
      .contentPig8 {
        img {
          position: absolute;
          // left: 939px;
          // top: 540px;
          left: 1138px;
          top: 192px;
          width: 142px;
          height: 88px;
          border-radius: 16px 0px 16px 0px;
        }
        .msg {
          text-align: center;
          width: 160px;
          position: absolute;
          // left: 934px;
          // top: 686px;
          left: 1124px;
          top: 290px;
          p {
            font-size: 40px;
            color: #63f0ff;
          }
          span {
            font-size: 16px;
          }
        }
      }
      .contentPig9 {
        img {
          position: absolute;
          left: 1196px;
          top: 570px;
          width: 142px;
          height: 88px;
          border-radius: 0 16px 0 16px;
        }
        .msg {
          text-align: center;
          width: 160px;
          position: absolute;
          left: 1184px;
          top: 460px;
          p {
            font-size: 40px;
            color: #63f0ff;
          }
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
