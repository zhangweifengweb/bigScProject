<template>
  <div class="intelligentDistributionNetworkCenterPart">
    <div class="container">
      <div class="info">
        <div class="left">
          <section v-for="(item, index) in leftArr" :key="index">
            <p class="num">
              {{ item.value }}<span>{{ item.unit2 }}</span>
            </p>
            <p class="title">{{ item.name }}</p>
          </section>
        </div>
        <div class="right">
          <section v-for="(item, index) in rightArr" :key="index">
            <p class="num">
              {{ item.value }}<span>{{ item.unit2 }}</span>
            </p>
            <p class="title">{{ item.name }}</p>
          </section>
        </div>
        <div
          class="line"
          :id="'line' + index"
          v-for="(item, index) in centerArr"
          :key="index"
        >
          <div>
            <span>{{ item.name + "：" }}</span>
            <p>
              {{ item.value }}
            </p>
          </div>
        </div>
        <!-- <div class="line line2">
          <div>
            <span>三化：</span>
            <p>建设标准化、管控智能化、运维精益化。</p>
          </div>
        </div>
        <div class="line line3">
          <div>
            <span>三落实：</span>
            <p>建设质量、关键指标、供电服务水平提升。</p>
          </div>
        </div> -->
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
  watch: {
    initData(val) {
      let data = val.screenTargetPart01Data[0].targetContent;
      data.forEach((item) => {
        if (item.indicatorName && item.indicatorName != "") {
          item.name = item.indicatorName.split("/")[1];
        }
        if (item.indicatorValue && item.indicatorValue != "") {
          item.value = item.indicatorValue.split("/")[1];
        }
        if (item.unit && item.unit != "") {
          item.unit2 = item.unit.split("/")[1];
        }

        // item.unit1 = item.unit.split('/')[1]
      });
      this.leftArr = [];
      this.rightArr = [];
      this.centerArr = [];
      this.leftArr.push(data[0], data[1], data[2], data[3]);
      this.rightArr.push(data[4], data[5], data[6], data[7]);
      this.centerArr.push(data[8], data[9], data[10]);
    },
  },
  data() {
    return {
      show: false,
      leftArr: [],
      rightArr: [],
      centerArr: [],
    };
  },
  methods: {
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
    showDialog() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    },
  },
  mounted() {},
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
.intelligentDistributionNetworkCenterPart {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  // background: url("/image/gridOverview/center_bg.png") no-repeat;
  background-position: 68% 190%;
  background-size: 75%;
  .container {
    height: 100%;
    position: relative;
    // background: url("/image/gridOverview/center_bottom_bg.png") no-repeat;
    background-position: bottom;
    background-size: 100% 60%;
    .info {
      height: 100%;
      background: url("/image/animationKeyFramesBg/intelligentDistributionNetwork_ball.png")
        no-repeat center;
      // background-position: center;
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
          color: #b1d9fb;
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
          span {
            font-size: 36px;
          }
        }
        section:nth-of-type(2) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg2.png")
            no-repeat;
          margin-right: 0;
        }
        section:nth-of-type(3) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg3.png")
            no-repeat;
          span {
            font-size: 36px;
          }
        }
        section:nth-of-type(4) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg4.png")
            no-repeat;
          margin-left: -56px;
          span {
            font-size: 36px;
          }
        }
      }
      .line {
        position: absolute;
        &::before {
          content: "";
          display: block;
          width: 200px;
          border: none;
          border-top: white 1px solid;
        }
        &::after {
          content: "";
          display: block;
          width: 40px;
          transform: rotate(45deg);
          border: none;
          border-top: white 1px solid;
        }
        > div {
          // width: 265px;
          position: absolute;
          // display: flex;
          font-weight: 500;
          font-size: 30px;
          span {
            // display: inline-block;
            white-space: nowrap;
            color: #07fbfe;
            float: left;
          }
          p {
            // display: inline-block;
            width: 480px;
          }
        }
      }
      #line0 {
        top: 300px;
        left: 914px;
        &::after {
          margin-left: 194px;
          margin-top: 13px;
        }
        > div {
          top: -124px;
          left: -68px;
        }
      }
      #line1 {
        top: 266px;
        right: 954px;
        &::after {
          transform: rotate(-45deg);
          margin-left: -34px;
          margin-top: 13px;
        }
        > div {
          top: -86px;
          left: 0px;
        }
      }
      #line2 {
        top: 524px;
        right: 1171px;
        &::after {
          margin-left: -34px;
          margin-top: -15px;
        }
        > div {
          top: -84px;
          left: 0px;
        }
      }
    }
  }
}
</style>
