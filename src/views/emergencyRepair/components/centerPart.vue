<template>
  <div class="centerPart_emergencyRepair">
    <div class="container">
      <div class="info">
        <div class="left">
          <section v-for="(item, index) in leftArr" :key="index">
            <p class="num">
              {{ item.value }}<span>{{ item.unit }}</span>
            </p>
            <p class="title">{{ item.title }}</p>
          </section>
          <!-- <section>
            <p class="num">24<span>件</span></p>
            <p class="title">到达预警</p>
          </section>
          <section>
            <p class="num">24<span>件</span></p>
            <p class="title">修复预警</p>
          </section>
          <section>
            <p class="num">6<span>小时</span></p>
            <p class="title">平均修复时长</p>
          </section> -->
        </div>
        <div
          :class="['left' + index, 'box']"
          v-for="(item, index) in centerArr2"
          :key="index"
        >
          <div>
            <span>{{ item.value }}</span>
            <p>{{ item.title }}</p>
          </div>
        </div>
        <!-- <div class="left1 box">
          <div>
            <span>256</span>
            <p>主动工单</p>
          </div>
        </div> -->
        <div class="right">
          <section v-for="(item, index) in rightArr" :key="index">
            <p class="num">
              {{ item.value }}<span>{{ item.unit }}</span>
            </p>
            <p class="title">{{ item.title }}</p>
          </section>
          <!-- <section>
            <p class="num">30<span>件</span></p>
            <p class="title">处理中</p>
          </section>
          <section>
            <p class="num">24<span>件</span></p>
            <p class="title">到达预警</p>
          </section>
          <section>
            <p class="num">24<span>件</span></p>
            <p class="title">修复预警</p>
          </section>
          <section>
            <p class="num">6<span>小时</span></p>
            <p class="title">平均修复时长</p>
          </section> -->
        </div>
      </div>
      <div class="charts">
        <div
          :class="['city', 'city' + (index + 1)]"
          v-for="(item, index) in centerArr"
          :key="index"
        >
          <p></p>
          <span>{{ item.city }}</span>
          <div>
            <p>
              {{ item.key1 }} ： <span>{{ item.value1 }}</span> {{ item.unit }}
            </p>
            <p>
              {{ item.key2 }} ： <span>{{ item.value2 }}</span> {{ item.unit }}
            </p>
          </div>
        </div>
        <!-- <div class="city city2">
          <p></p>
          <span>原州区</span>
          <div>
            <p>95598工单 ： <span>**</span> 件</p>
            <p>主动工单 ： <span>**</span> 件</p>
          </div>
        </div>
        <div class="city city3">
          <p></p>
          <span>彭阳县</span>
          <div>
            <p>95598工单 ： <span>**</span> 件</p>
            <p>主动工单 ： <span>**</span> 件</p>
          </div>
        </div>
        <div class="city city4">
          <p></p>
          <span>隆德县</span>
          <div>
            <p>95598工单 ： <span>**</span> 件</p>
            <p>主动工单 ： <span>**</span> 件</p>
          </div>
        </div>
        <div class="city city5">
          <p></p>
          <span>泾源县</span>
          <div>
            <p>95598工单 ： <span>**</span> 件</p>
            <p>主动工单 ： <span>**</span> 件</p>
          </div>
        </div> -->
        <mapChart @changeMap="changeMap" @title="title" ref="mapComponents" />
      </div>
      <div class="pan"></div>
    </div>
    <div class="dialog" v-show="dialogShow">
      <h1>{{ name }}</h1>
      <div>
        <div :class="{ cative: cative == 1 }" @click="cative = 1">
          95598工单
        </div>
        <div :class="{ cative: cative == 2 }" @click="cative = 2">主动工单</div>
      </div>
      <table class="table" border="1" cellpadding="10">
        <thead>
          <tr>
            <th v-for="(item, i) in arr" :key="i">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.countDown }}</td>
            <td>{{ item.people }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.place }}</td>
            <td><button @click="openWin">查看</button></td>
          </tr>
        </tbody>
      </table>
      <div class="close" @click="closeDialog">×</div>
      <iframe
        v-if='winShow'
        src="http://172.16.221.208:18088/pssc-web/page/orderHandle/index.html?appNo=2021101784904148&objId=541cb6d9-a70b-4aa7-8768-622fb0f82245&appSrc=95598"
      ></iframe>
      <div v-if='winShow' class="close close2" @click="closeWin">×</div>
    </div>
  </div>
</template>
<script>
import mapChart from "@/components/mapChart2";
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
  watch: {
    initData(val) {
      let data1 = val.screenTargetPart01Data[0].targetContent;
      data1.forEach((item) => {
        // console.log(item);
        item.title = item.indicatorValue.split("/")[0];
        item.value = item.indicatorValue.split("/")[1];
        item.unit = item.unit.split("/")[1];
      });
      let data2 = val.screenTargetPart01Data[1].targetContent;
      data2.forEach((item) => {
        // console.log(item);
        item.city = item.columnValue1.split("/")[1];
        item.key1 = item.columnValue2.split("/")[0];
        item.value1 = item.columnValue2.split("/")[1];
        item.key2 = item.columnValue3.split("/")[0];
        item.value2 = item.columnValue3.split("/")[1];
        item.unit = item.columnValue4.split("/")[1];
      });
      this.leftArr = [];
      this.centerArr = [];
      this.centerArr2 = [];
      this.rightArr = [];
      this.centerArr = data2;
      this.leftArr.push(data1[1], data1[2], data1[3], data1[4]);
      this.rightArr.push(data1[6], data1[7], data1[8], data1[9]);
      this.centerArr2.push(data1[0], data1[5]);
      // val.screenTargetPart01Data[0].targetContent.forEach(item=>{
      //   console.log(item);
      // })
    },
  },
  data() {
    return {
      cative: 1,
      // user: { name: "", age: "", school: "" },
      arr: ["序号", "倒计时", "锁定人", "系统工单编号", "处理现场分类", "操作"],
      users: [
        {
          countDown: "0分0秒",
          people: "蒋晓光",
          number: "2021101885130222",
          place: "郊区",
        },
        {
          countDown: "0分0秒",
          people: "蒋晓光",
          number: "2021101885130222",
          place: "郊区",
        },
        {
          countDown: "0分0秒",
          people: "蒋晓光",
          number: "2021101885130222",
          place: "郊区",
        },
        {
          countDown: "0分0秒",
          people: "蒋晓光",
          number: "2021101885130222",
          place: "城市",
        },
        {
          countDown: "0分0秒",
          people: "蒋晓光",
          number: "2021101885130222",
          place: "城市",
        },
        {
          countDown: "0分0秒",
          people: "蒋晓光",
          number: "2021101885130222",
          place: "城市",
        },
      ],
      name: "",
      dialogShow: false,
      leftArr: [],
      centerArr: [],
      centerArr2: [],
      rightArr: [],
      winShow:false
    };
  },
  methods: {
    title(n) {
      this.name = n;
      this.dialogShow = true;
      // console.log(n);
    },
    openWin(){
      this.winShow = true
    },
    closeWin(){
      this.winShow = false
    },
    closeDialog() {
      this.dialogShow = false;
    },
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
@keyframes center_bg_animation {
  0% {
    background-size: 100%;
    background-position: center;
  }
  50% {
    background-size: 130%;
    background-position: center;
  }
  100% {
    background-size: 100%;
    background-position: center;
  }
}
@keyframes dianAnimation {
  0% {
    background-position: -145px -40px;
  }
  0.81% {
    background-position: -545px -40px;
  }
  1.61% {
    background-position: -945px -40px;
  }
  2.42% {
    background-position: -1345px -40px;
  }
  3.23% {
    background-position: -1745px -40px;
  }
  4.03% {
    background-position: -2145px -40px;
  }
  4.84% {
    background-position: -2545px -40px;
  }
  5.65% {
    background-position: -2945px -40px;
  }
  6.45% {
    background-position: -3345px -40px;
  }
  7.26% {
    background-position: -3745px -40px;
  }
  8.06% {
    background-position: -4145px -40px;
  }
  8.87% {
    background-position: -4545px -40px;
  }
  9.68% {
    background-position: -145px -440px;
  }
  10.48% {
    background-position: -545px -440px;
  }
  11.29% {
    background-position: -945px -440px;
  }
  12.10% {
    background-position: -1345px -440px;
  }
  12.90% {
    background-position: -1745px -440px;
  }
  13.71% {
    background-position: -2145px -440px;
  }
  14.52% {
    background-position: -2545px -440px;
  }
  15.32% {
    background-position: -2945px -440px;
  }
  16.13% {
    background-position: -3345px -440px;
  }
  16.94% {
    background-position: -3745px -440px;
  }
  17.74% {
    background-position: -4145px -440px;
  }
  18.55% {
    background-position: -4545px -440px;
  }
  19.35% {
    background-position: -145px -840px;
  }
  20.16% {
    background-position: -545px -840px;
  }
  20.97% {
    background-position: -945px -840px;
  }
  21.77% {
    background-position: -1345px -840px;
  }
  22.58% {
    background-position: -1745px -840px;
  }
  23.39% {
    background-position: -2145px -840px;
  }
  24.19% {
    background-position: -2545px -840px;
  }
  25.00% {
    background-position: -2945px -840px;
  }
  25.81% {
    background-position: -3345px -840px;
  }
  26.61% {
    background-position: -3745px -840px;
  }
  27.42% {
    background-position: -4145px -840px;
  }
  28.23% {
    background-position: -4545px -840px;
  }
  29.03% {
    background-position: -145px -1240px;
  }
  29.84% {
    background-position: -545px -1240px;
  }
  30.65% {
    background-position: -945px -1240px;
  }
  31.45% {
    background-position: -1345px -1240px;
  }
  32.26% {
    background-position: -1745px -1240px;
  }
  33.06% {
    background-position: -2145px -1240px;
  }
  33.87% {
    background-position: -2545px -1240px;
  }
  34.68% {
    background-position: -2945px -1240px;
  }
  35.48% {
    background-position: -3345px -1240px;
  }
  36.29% {
    background-position: -3745px -1240px;
  }
  37.10% {
    background-position: -4145px -1240px;
  }
  37.90% {
    background-position: -4545px -1240px;
  }
  38.71% {
    background-position: -145px -1640px;
  }
  39.52% {
    background-position: -545px -1640px;
  }
  40.32% {
    background-position: -945px -1640px;
  }
  41.13% {
    background-position: -1345px -1640px;
  }
  41.94% {
    background-position: -1745px -1640px;
  }
  42.74% {
    background-position: -2145px -1640px;
  }
  43.55% {
    background-position: -2545px -1640px;
  }
  44.35% {
    background-position: -2945px -1640px;
  }
  45.16% {
    background-position: -3345px -1640px;
  }
  45.97% {
    background-position: -3745px -1640px;
  }
  46.77% {
    background-position: -4145px -1640px;
  }
  47.58% {
    background-position: -4545px -1640px;
  }
  48.39% {
    background-position: -145px -2040px;
  }
  49.19% {
    background-position: -545px -2040px;
  }
  50.00% {
    background-position: -945px -2040px;
  }
  50.81% {
    background-position: -1345px -2040px;
  }
  51.61% {
    background-position: -1745px -2040px;
  }
  52.42% {
    background-position: -2145px -2040px;
  }
  53.23% {
    background-position: -2545px -2040px;
  }
  54.03% {
    background-position: -2945px -2040px;
  }
  54.84% {
    background-position: -3345px -2040px;
  }
  55.65% {
    background-position: -3745px -2040px;
  }
  56.45% {
    background-position: -4145px -2040px;
  }
  57.26% {
    background-position: -4545px -2040px;
  }
  58.06% {
    background-position: -145px -2440px;
  }
  58.87% {
    background-position: -545px -2440px;
  }
  59.68% {
    background-position: -945px -2440px;
  }
  60.48% {
    background-position: -1345px -2440px;
  }
  61.29% {
    background-position: -1745px -2440px;
  }
  62.10% {
    background-position: -2145px -2440px;
  }
  62.90% {
    background-position: -2545px -2440px;
  }
  63.71% {
    background-position: -2945px -2440px;
  }
  64.52% {
    background-position: -3345px -2440px;
  }
  65.32% {
    background-position: -3745px -2440px;
  }
  66.13% {
    background-position: -4145px -2440px;
  }
  66.94% {
    background-position: -4545px -2440px;
  }
  67.74% {
    background-position: -145px -2840px;
  }
  68.55% {
    background-position: -545px -2840px;
  }
  69.35% {
    background-position: -945px -2840px;
  }
  70.16% {
    background-position: -1345px -2840px;
  }
  70.97% {
    background-position: -1745px -2840px;
  }
  71.77% {
    background-position: -2145px -2840px;
  }
  72.58% {
    background-position: -2545px -2840px;
  }
  73.39% {
    background-position: -2945px -2840px;
  }
  74.19% {
    background-position: -3345px -2840px;
  }
  75.00% {
    background-position: -3745px -2840px;
  }
  75.81% {
    background-position: -4145px -2840px;
  }
  76.61% {
    background-position: -4545px -2840px;
  }
  77.42% {
    background-position: -145px -3240px;
  }
  78.23% {
    background-position: -545px -3240px;
  }
  79.03% {
    background-position: -945px -3240px;
  }
  79.84% {
    background-position: -1345px -3240px;
  }
  80.65% {
    background-position: -1745px -3240px;
  }
  81.45% {
    background-position: -2145px -3240px;
  }
  82.26% {
    background-position: -2545px -3240px;
  }
  83.06% {
    background-position: -2945px -3240px;
  }
  83.87% {
    background-position: -3345px -3240px;
  }
  84.68% {
    background-position: -3745px -3240px;
  }
  85.48% {
    background-position: -4145px -3240px;
  }
  86.29% {
    background-position: -4545px -3240px;
  }
  87.10% {
    background-position: -145px -3640px;
  }
  87.90% {
    background-position: -545px -3640px;
  }
  88.71% {
    background-position: -945px -3640px;
  }
  89.52% {
    background-position: -1345px -3640px;
  }
  90.32% {
    background-position: -1745px -3640px;
  }
  91.13% {
    background-position: -2145px -3640px;
  }
  91.94% {
    background-position: -2545px -3640px;
  }
  92.74% {
    background-position: -2945px -3640px;
  }
  93.55% {
    background-position: -3345px -3640px;
  }
  94.35% {
    background-position: -3745px -3640px;
  }
  95.16% {
    background-position: -4145px -3640px;
  }
  95.97% {
    background-position: -4545px -3640px;
  }
  96.77% {
    background-position: -145px -4040px;
  }
  97.58% {
    background-position: -545px -4040px;
  }
  98.39% {
    background-position: -945px -4040px;
  }
  99.19% {
    background-position: -1345px -4040px;
  }
  100.00% {
    background-position: -1745px -4040px;
  }
}

.centerPart_emergencyRepair {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  background: url("/image/emergencyRepair/bj2.png") no-repeat;
  background-position: center;
  background-size: 100%;
  animation: center_bg_animation 1s linear;
  .dialog {
    width: 100%;
    height: calc(100% - 110px);
    background: #03124a;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 100px;
    z-index: 999;
    iframe{
      background: #03124a;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    // .close2{
    //   z-index: 999999;
    // }
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
    h1 {
      text-align: center;
      font-size: 50px;
    }
    > div {
      font-size: 35px;
      font-weight: bold;
      display: flex;
      text-align: center;
      justify-content: center;
      div {
        cursor: pointer;
        padding: 20px;
      }
      > div:nth-child(2) {
        margin-left: 200px;
      }
      .cative {
        background: linear-gradient(
          180deg,
          rgba(56, 189, 255, 0) 0%,
          rgba(56, 189, 255, 0.2) 82%,
          rgba(56, 189, 255, 0.7) 100%
        );
      }
    }
    .table {
      width: 100%;
      height: calc(100% - 150px);
      tr,
      th {
        text-align: center;
      }
      th {
        font-size: 35px;
      }
      td {
        font-size: 30px;
        button {
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .container {
    height: 100%;
    position: relative;
    // background: url("/image/gridOverview/center_bottom_bg.png") no-repeat;
    background-position: bottom;
    background-size: 100% 60%;
    overflow: hidden;
    .info {
      height: 100%;
      // background: url("/image/operationMonitor/center_arrow.png") no-repeat;
      background-position: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      animation: zoomIn 2s;
      white-space: nowrap;
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
      .box {
        display: flex;
        align-items: center;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 25px;
        }
        span {
          font-family: "numFont";
          font-size: 50px;
          color: #efff29;
        }
      }
      .left0 {
        width: 163px;
        height: 604px;
        position: absolute;
        background: url("/image/emergencyRepair/left.png");
        left: 420px;
        padding-left: 42px;
      }
      .left1 {
        width: 163px;
        height: 604px;
        position: absolute;
        background: url("/image/emergencyRepair/right.png");
        right: 420px;
      }
    }
    .charts {
      position: absolute;
      width: 1600px;
      height: calc(100% - 270px);
      top: 140px;
      left: 558px;
      // perspective: 2000px;
      .city {
        position: absolute;
        font-size: 40px;
        font-weight: 400;
        // opacity: 0.7;
        color: #b3d1f0;
        top: 260px;
        left: 465px;
        z-index: 1;
        > span {
          display: inline-block;
          animation: fadeInDownBig 2s;
          font-size: 30px;
        }
        > p {
          position: absolute;
          top: -180px;
          left: 40px;
          width: 105px;
          height: 200px;
          background: url("/image/emergencyRepair/biaodian.png") no-repeat;
          // animation: dianAnimation 5s steps(1) infinite;
          // background-position:-545px 0px;
        }
        div {
          background: url("/image/emergencyRepair/kuang.png") no-repeat;
          width: 251px;
          height: 130px;
          position: absolute;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-evenly;
          font-size: 20px;
          color: #fff;
          p:nth-child(1) {
            margin-top: 10px;
          }
        }
      }
      .city1 {
        div {
          background: url("/image/emergencyRepair/kuang2.png") no-repeat;
          width: 260px;
          top: -200px;
          left: -280px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 95px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 255px;
          top: 88px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 45px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 338px;
          top: 107px;
          transform: rotate(60deg);
        }
      }
      .city2 {
        left: 700px;
        top: 210px;
        div {
          top: -200px;
          left: 160px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 50px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -50px;
          top: 88px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 40px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -78px;
          top: 106px;
          transform: rotate(-65deg);
        }
      }
      .city3 {
        left: 900px;
        top: 220px;
        > p {
          top: -100px;
          left: -70px;
        }
        div {
          top: -85px;
          left: 160px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 160px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -160px;
          top: 60px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 39px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -190px;
          top: 75px;
          transform: rotate(-54deg);
        }
      }
      .city4 {
        left: 650px;
        top: 450px;
        > p {
          top: -185px;
          left: -15px;
        }
        div {
          background: url("/image/emergencyRepair/kuang2.png") no-repeat;
          width: 260px;
          top: -120px;
          left: -350px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 95px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 255px;
          top: 60px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 30px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 349px;
          top: 63px;
          transform: rotate(12deg);
        }
      }
      .city5 {
        left: 970px;
        top: 535px;
        > p {
          top: -180px;
          left: -30px;
        }
        div {
          top: -225px;
          left: 75px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 45px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -45px;
          top: 88px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 45px;
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -72px;
          top: 110px;
          transform: rotate(-76deg);
        }
      }
    }
    .pan {
      position: absolute;
      bottom: 35px;
      left: 50%;
      width: 832px;
      height: 293px;
      margin-left: -416px;
      border-radius: 50%;
      background: url("/image/emergencyRepair/yp.png") no-repeat;
      animation: bounceInUp 2s, heartBeat 4s infinite linear 2s;
    }
  }
}
</style>
