<template>
  <div class="centerPart_distributionNetworkMaintenance">
    <div class="dialog" v-show="show">
      <img v-if="imgIndex < 3" :src="src" alt="">
        <video v-if='imgIndex > 2' :src="src" controls></video>
      <div class="close" @click="closeDialog">×</div>
    </div>
    <div class="container">
      <div class="info">
        <div class="left">
          <div class="plan">10KV 检修计划</div>
          <section>
            <p class="num">
              {{ centerArrdata[0].indicatorValue }}<span>项</span>
            </p>
            <p class="title">检修计划</p>
            <!-- <img src="/image/gridOverview/center_left1.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ centerArrdata[1].indicatorValue }}<span>项</span>
            </p>
            <p class="title">带电计划</p>
            <!-- <img src="/image/gridOverview/center_left2.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ centerArrdata[2].indicatorValue }}<span>项</span>
            </p>
            <p class="title">已执行</p>
            <!-- <img src="/image/gridOverview/center_left3.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ centerArrdata[3].indicatorValue }}<span>项</span>
            </p>
            <p class="title">取消</p>
            <!-- <img src="/image/gridOverview/center_left4.png" alt=""> -->
          </section>
        </div>
        <div class="right">
          <div class="plan">0.4KV检修计划</div>
          <section>
            <p class="num">
              {{ centerArrdata[4].indicatorValue }}<span>项</span>
            </p>
            <p class="title">检修计划</p>
            <!-- <img src="/image/gridOverview/center_right1.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ centerArrdata[5].indicatorValue }}<span>项</span>
            </p>
            <p class="title">带电计划</p>
            <!-- <img src="/image/gridOverview/center_right2.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ centerArrdata[6].indicatorValue }}<span>项</span>
            </p>
            <p class="title">已执行</p>
            <!-- <img src="/image/gridOverview/center_right3.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ centerArrdata[7].indicatorValue }}<span>项</span>
            </p>
            <p class="title">取消</p>
            <!-- <img src="/image/gridOverview/center_right4.png" alt=""> -->
          </section>
        </div>
        <div class="bottom">
          <div class="bottom_container">
            <div class="bottom_content">
              <div class="item">
                <p class="num">
                  {{ centerArrdata[8].indicatorValue }}<span>项</span>
                </p>
                <p class="title">超300时户停电计划</p>
              </div>
              <div class="item">
                <p class="num">
                  {{ centerArrdata[9].indicatorValue }}<span>时.户</span>
                </p>
                <p class="title">预安排停电时户数</p>
              </div>
              <div class="item">
                <p class="num">
                  {{ centerArrdata[10].indicatorValue }}<span>项</span>
                </p>
                <p class="title">紧急消缺</p>
              </div>
              <div class="item">
                <p class="num">
                  {{ centerArrdata[11].indicatorValue }}<span>项</span>
                </p>
                <p class="title">故障处理</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="charts">
        <!-- <mapChart @changeMap="changeMap" ref="mapComponents" /> -->
        <div class="box">
          <div
            @click="showDialog(index,item)"
            v-for="(item, index) in imgvideoArr"
            :key="index"
          >
            <img v-if="index < 3" :src="item.columnValue1" />
            <video v-else :src="item.columnValue1" ></video>
            <p>现场画面 0{{ index + 1 }}</p>
          </div>
          <!-- <div @click="showDialog">
            <img src="/image/distributionNetworkMaintenance/bj.png" />
            <p>现场画面 01</p>
          </div>
          <div @click="showDialog">
            <img src="/image/distributionNetworkMaintenance/bj.png" />
            <p>现场画面 02</p>
          </div>
          <div @click="showDialog">
            <img src="/image/distributionNetworkMaintenance/bj.png" />
            <p>现场画面 03</p>
          </div>
          <div @click="showDialog">
            <img src="/image/distributionNetworkMaintenance/bj.png" />
            <p>现场画面 04</p>
          </div>
          <div @click="showDialog">
            <img src="/image/distributionNetworkMaintenance/bj.png" />
            <p>现场画面 05</p>
          </div>
          <div @click="showDialog">
            <img src="/image/distributionNetworkMaintenance/bj.png" />
            <p>现场画面 06</p>
          </div> -->
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
// import mapChart from "@/components/mapChart";
export default {
  // name: "baiduMap",
  // components: {
  //   mapChart,
  // },
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
      show: false,
      centerArrdata: [
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
        {
          indicatorName: "",
          indicatorValue: "0",
        },
      ],
      imgvideoArr: [],
      imgIndex:'',
      src:''
    };
  },
  mounted() {},
  watch: {
    initData(val) {
      // console.log("中间数据", val);
      val.screenTargetPart01Data[0].targetContent.map((item) => {
        return (item.indicatorValue = item.indicatorValue.split("/")[1]);
      });
      this.centerArrdata = val.screenTargetPart01Data[0].targetContent;
      this.imgvideoArr=[];
      val.screenTargetPart01Data[1].targetContent.forEach(item => {
        this.imgvideoArr.push({
          columnValue1: this.getUrl(item.columnValue1),
        });
      });
    },
  },
  methods: {
    getUrl(val) {
      let arr = val.split("/");
      arr.shift();
      let newStr = arr.join("/");
      return newStr;
    },
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
    showDialog(i,v) {
      console.log(i,v);
      this.imgIndex = i
      this.src = v.columnValue1
      this.show = true;
    },
    closeDialog() {
      this.imgIndex = ''
      this.src = ''
      this.show = false;
    },
  },
};
</script>
<style lang="scss">
@keyframes boxShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.centerPart_distributionNetworkMaintenance {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  // background: url("/image/gridOverview/center_bg.png") no-repeat;
  background-position: 68% 190%;
  background-size: 75%;
  .dialog {
    width: 100%;
    height: calc(100% - 110px);
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    img{
        width:100%;
        height:100%;
      }
      video{
        width:100%;
        height:100%;
        object-fit: fill
      }
    .close {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: #fff;
      background: #cdcdcd;
      text-align: center;
      line-height: 50px;
      font-size: 50px;
      position: absolute;
      right: 100px;
      top: 100px;
      cursor: pointer;
    }
  }
  .container {
    height: 100%;
    position: relative;
    // background: url("/image/gridOverview/center_bottom_bg.png") no-repeat;
    background-position: bottom;
    background-size: 100% 60%;
    .info {
      height: 100%;
      // background: url("/image/operationMonitor/center_arrow.png") no-repeat;
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
          margin-bottom: 60px;
        }
        &:nth-of-type(1) {
          margin-top: 60px;
        }
        .title {
          font-size: 26px;
          color: #fff;
          margin-top: 5px;
          letter-spacing: 3px;
        }
        .num {
          font-size: 50px;
          // color: #00cbff;
          span {
            font-size: 24px;
            color: #b1d9fb;
            margin-left: 0.5em;
            text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
            color: #00fff8;
          }
        }
      }
      .left {
        padding-left: 95px;
        .plan {
          font-size: 36px;
          background: linear-gradient(to right, #00fff8, #ffffff);
          -webkit-background-clip: text;
          color: transparent;
          margin-left: 130px;
        }
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
          background: url("/image/distributionNetworkMaintenance/left_info_bg1.png")
            no-repeat;
          margin-left: 56px;
        }
        section:nth-of-type(2) {
          background: url("/image/distributionNetworkMaintenance/left_info_bg2.png")
            no-repeat;
        }
        section:nth-of-type(3) {
          background: url("/image/distributionNetworkMaintenance/left_info_bg3.png")
            no-repeat;
        }
        section:nth-of-type(4) {
          background: url("/image/distributionNetworkMaintenance/left_info_bg4.png")
            no-repeat;
          margin-left: 56px;
        }
      }
      .right {
        text-align: right;
        padding-right: 95px;
        .plan {
          font-size: 36px;
          background: linear-gradient(to right, #ffffff, #00fff8);
          -webkit-background-clip: text;
          color: transparent;
          margin-right: 58px;
        }
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
          background: url("/image/distributionNetworkMaintenance/right_info_bg1.png")
            no-repeat;
          margin-left: -56px;
        }
        section:nth-of-type(2) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg2.png")
            no-repeat;
          margin-right: 0;
        }
        section:nth-of-type(3) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg3.png")
            no-repeat;
        }
        section:nth-of-type(4) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg4.png")
            no-repeat;
          margin-left: -56px;
        }
      }
      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 160px;
        width: 100%;
        // background: url("/image/gridOverview/center_bottom.png") no-repeat;
        background-position: center;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .bottom_container {
          display: inline-block;
          width: 1286px;
          height: 139px;
          background: url("/image/distributionNetworkMaintenance/bottom.png");
          // display: flex;
          .bottom_content {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 20px 200px 0 200px;
            .item {
              text-align: left;
              .num {
                font-size: 50px;
                span {
                  font-size: 24px;
                  margin-left: 1em;
                }
              }
              .title {
                font-size: 24px;
                font-weight: 400;
                line-height: 42px;
                color: #fff;
                letter-spacing: 4px;
              }
            }
          }
        }
      }
    }
    .charts {
      position: absolute;
      width: 1600px;
      height: calc(100% - 270px);
      top: 140px;
      left: 558px;
      // perspective: 2000px;
      .box {
        width: 770px;
        height: 495px;
        margin: 135px auto;
        position: relative;
        transform-style: preserve-3d;
        transform: rotateX(-15deg);
        animation: fn 60s 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        cursor: pointer;
        @keyframes fn {
          0% {
            transform: rotateX(-15deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(-15deg) rotateY(360deg);
          }
        }
        :nth-of-type(1) {
          transform: rotateY(0deg) translateZ(700px);
        }
        :nth-of-type(2) {
          transform: rotateY(60deg) translateZ(700px);
        }
        :nth-of-type(3) {
          transform: rotateY(120deg) translateZ(700px);
        }
        :nth-of-type(4) {
          transform: rotateY(180deg) translateZ(700px);
        }
        :nth-of-type(5) {
          transform: rotateY(-120deg) translateZ(700px);
        }
        :nth-of-type(6) {
          transform: rotateY(-60deg) translateZ(700px);
        }
      }
      .box > div {
        width: 770px;
        height: 495px;
        // width: 200px;
        //     height: 300px;
        overflow: hidden;
        // border-radius: 20px;
        position: absolute;
        background: url("/image/distributionNetworkMaintenance/zpbj.png");
        background-size: 770px 495px;
        animation: boxShow 4s;
        p {
          position: absolute;
          left: 300px;
          bottom: 40px;
          color: #51dad6;
          font-size: 30px;
        }
        img,
        video {
          width: 690px;
          height: 310px;
          position: absolute;
          top: 30px;
          left: 40px;
          object-fit: fill;
        }
      }

      .box:hover {
        animation-play-state: paused;
      }
    }
  }
}
</style>
