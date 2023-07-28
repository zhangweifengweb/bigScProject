<template>
  <div class="gridOverviewkLeftPart">
    <div class="resources">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">供电营业统计</div>
        <!-- <div class="img"></div> -->
        <div class="rightInfo">
          <p class="title">供电营业统计（万户）：</p>
          <p class="num">{{ Htotal }}</p>
        </div>
      </div>
      <div class="content">
        <div class="animate_container">
          <section
            v-for="(item, index) in leftArr"
            :key="`${item.name}_${index}`"
          >
            <div class="left_img"></div>
            <div class="right_info">
              <p class="title">{{ item.name }}</p>
              <p class="split_line"></p>
              <p class="num">
                {{ item.num }}<span>{{ item.unit }}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">售电量统计</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="animate_container">
          <div class="left_chart">
            <p class="chartTitle">近五年售电量</p>
            <div id="salesFiveYearsChart" class="charts"></div>
          </div>
          <div class="split_line"></div>
          <div class="right_chart">
            <p class="chartTitle">各地区当年售电量</p>
            <div id="salesYearChart" class="charts"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initData1: {
      type: Object,
      default() {
        return {};
      },
    },
    initData2: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      swiperOption: "",
      leftArr: [
        {
          name: "原州区",
          num: 12,
          unit: "万户",
        },
        {
          name: "西吉县",
          num: 8,
          unit: "万户",
        },
        {
          name: "彭阳县",
          num: 10,
          unit: "万户",
        },
        {
          name: "隆德县",
          num: 9,
          unit: "万户",
        },
        {
          name: "泾源县",
          num: 6,
          unit: "万户",
        },
        {
          name: "三营",
          num: 7,
          unit: "万户",
        },
      ],
      Htotal: 0,
    };
  },
  watch: {
    initData1(val) {
      // console.log("左边的数据", val);
      this.leftArr = [];
      this.Htotal = 0;
      val.screenTargetPart01Data.targetContent.forEach((item) => {
        this.Htotal += Number(item.indicatorValue.split("/")[1]);
        this.leftArr.push({
          name: item.indicatorName.split("/")[1],
          num: item.indicatorValue.split("/")[1],
          unit: item.unit.split("/")[1],
        });
      });
    },
    initData2(val) {
      //近五年售电量数据
      this.SdataX = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.SdataY = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.leftBottomLeft(this.SdataX, this.SdataY);
      //各地区当年售电量
      this.nSdataX = val.screenTargetPart01Data[1].targetContent.xaxis;
      this.nSdataY = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.leftBottomRight(this.nSdataX, this.nSdataY);
    },
  },
  mounted() {},
  methods: {
    leftBottomRight(xdata, ydata) {
      let myChart = this.$echarts.init(
        document.getElementById("salesYearChart")
      );
      myChart.setOption({
        grid: {
          top: "30%",
          left: "10%",
          right: "5%",
          bottom: "12%",
          // containLabel:true,
        },
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "cross",
        //     z: 0, //竖线在圆圈后面
        //     label: {
        //       backgroundColor: "rgba(0,0,0,0)",
        //       color: "#D3EEFF",
        //     },
        //   },
        // },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "#D3EEFF",
              fontSize: 14,
              margin: 20,
            },
            splitLine: {
              show: false,
              width: 1,
              lineStyle: {
                type: "solid",
                color: "#00BFF3",
                opacity: 0.23,
              },
            },
            // boundaryGap: false, //设置x轴是否从第一位开始
            axisTick: {
              show: false, //不显示刻度
            },
            // data: ["原州", "三营", "西吉", "彭阳", "隆德"],
            data: xdata,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            name: "单位：亿千瓦时",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 30, 0],
              fontSize: 16, // 四个数字分别为上右下左与原位置距离
              color: "#fff",
            },
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#658ABC "],
                width: 1,
                type: "solid",
                opacity: 0.45,
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 35,
              textStyle: {
                color: "#8DD3FF",
                fontSize: 17,
                // fontFamily: "numFont",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "2020",
            type: "bar",
            barWidth: 30,
            barGap: "20%",
            z: 11,
            itemStyle: {
              //lenged文本
              opacity: 1,
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#00D4FF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#00AAFE", // 100% 处的颜色
                  },
                ],
                false
              ),
            },
            // data: [0.34, 0.41, 0.32, 0.58, 0.21],
            data: ydata,
          },
          {
            //柱子顶部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: "#008ED7",
            },
            label: {
              show: true,
              color: "#00FFF8",
              fontSize: 30,
              fontFamily: "numFont",
              position: "top",
              offset: [0, -10],
            },
            symbolPosition: "end",
            // data: [0.34, 0.41, 0.32, 0.58, 0.21],
            data: ydata,
          },
          {
            //柱子底部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [0, 5],
            z: 10,
            itemStyle: {
              opacity: 1,
              color: "#00AAFE",
            },
            data: [1, 1, 1, 1, 1],
          },
        ],
      });
    },
    leftBottomLeft(xdata, ydata) {
      let myChart = this.$echarts.init(
        document.getElementById("salesFiveYearsChart")
      );
      myChart.setOption({
        backgroundColor: "transparent",
        grid: {
          top: "22%",
          left: "10%",
          right: "5%",
          bottom: "12%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            z: 0, //竖线在圆圈后面
            label: {
              backgroundColor: "rgba(0,0,0,0)",
              color: "#D3EEFF",
            },
          },
        },
        color: ["#2BB2F8", "#DEAE66"],
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "#D3EEFF",
              fontSize: 14,
              margin: 20,
            },
            splitLine: {
              show: false,
              width: 1,
              lineStyle: {
                type: "solid",
                color: "#00BFF3",
                opacity: 0.23,
              },
            },
            boundaryGap: false, //设置x轴是否从第一位开始
            axisTick: {
              show: false, //不显示刻度
            },
            // data: ["2017", "2018", "2019", "2020", "2021"],
            data: xdata,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            name: "单位：亿千瓦时",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 10, 0],
              fontSize: 16, // 四个数字分别为上右下左与原位置距离
              color: "#fff",
            },
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 35,
              textStyle: {
                color: "#8DD3FF",
                fontSize: 17,
                // fontFamily: "numFont",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "兴庆区",
            type: "line",
            symbol: "circle",
            symbolSize: 10, //转折点的大小
            itemStyle: {
              borderWidth: 1,
              normal: {
                color: "#00334A ", //图例的颜色
                borderColor: "#2BB2F8",
                lineStyle: {
                  color: "#2BB2F8", //线的颜色
                },
                label: {
                  show: true,
                  color: "#00FFF8",
                  fontSize: 30,
                  fontFamily: "numFont",
                  offset: [0, -20],
                },
              },
            },
            // data: [17, 20, 18, 26, 11], //data.values
            data: ydata, //data.values
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes iconAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -300px 0px;
  }
  1.61% {
    background-position: -600px 0px;
  }
  2.42% {
    background-position: -900px 0px;
  }
  3.23% {
    background-position: -1200px 0px;
  }
  4.03% {
    background-position: 0px -300px;
  }
  4.84% {
    background-position: -300px -300px;
  }
  5.65% {
    background-position: -600px -300px;
  }
  6.45% {
    background-position: -900px -300px;
  }
  7.26% {
    background-position: -1200px -300px;
  }
  8.06% {
    background-position: 0px -600px;
  }
  8.87% {
    background-position: -300px -600px;
  }
  9.68% {
    background-position: -600px -600px;
  }
  10.48% {
    background-position: -900px -600px;
  }
  11.29% {
    background-position: -1200px -600px;
  }
  12.10% {
    background-position: 0px -900px;
  }
  12.90% {
    background-position: -300px -900px;
  }
  13.71% {
    background-position: -600px -900px;
  }
  14.52% {
    background-position: -900px -900px;
  }
  15.32% {
    background-position: -1200px -900px;
  }
  16.13% {
    background-position: 0px -1200px;
  }
  16.94% {
    background-position: -300px -1200px;
  }
  17.74% {
    background-position: -600px -1200px;
  }
  18.55% {
    background-position: -900px -1200px;
  }
  19.35% {
    background-position: -1200px -1200px;
  }
  20.16% {
    background-position: 0px -1500px;
  }
  20.97% {
    background-position: -300px -1500px;
  }
  21.77% {
    background-position: -600px -1500px;
  }
  22.58% {
    background-position: -900px -1500px;
  }
  23.39% {
    background-position: -1200px -1500px;
  }
  24.19% {
    background-position: 0px -1800px;
  }
  25.00% {
    background-position: -300px -1800px;
  }
  25.81% {
    background-position: -600px -1800px;
  }
  26.61% {
    background-position: -900px -1800px;
  }
  27.42% {
    background-position: -1200px -1800px;
  }
  28.23% {
    background-position: 0px -2100px;
  }
  29.03% {
    background-position: -300px -2100px;
  }
  29.84% {
    background-position: -600px -2100px;
  }
  30.65% {
    background-position: -900px -2100px;
  }
  31.45% {
    background-position: -1200px -2100px;
  }
  32.26% {
    background-position: 0px -2400px;
  }
  33.06% {
    background-position: -300px -2400px;
  }
  33.87% {
    background-position: -600px -2400px;
  }
  34.68% {
    background-position: -900px -2400px;
  }
  35.48% {
    background-position: -1200px -2400px;
  }
  36.29% {
    background-position: 0px -2700px;
  }
  37.10% {
    background-position: -300px -2700px;
  }
  37.90% {
    background-position: -600px -2700px;
  }
  38.71% {
    background-position: -900px -2700px;
  }
  39.52% {
    background-position: -1200px -2700px;
  }
  40.32% {
    background-position: 0px -3000px;
  }
  41.13% {
    background-position: -300px -3000px;
  }
  41.94% {
    background-position: -600px -3000px;
  }
  42.74% {
    background-position: -900px -3000px;
  }
  43.55% {
    background-position: -1200px -3000px;
  }
  44.35% {
    background-position: 0px -3300px;
  }
  45.16% {
    background-position: -300px -3300px;
  }
  45.97% {
    background-position: -600px -3300px;
  }
  46.77% {
    background-position: -900px -3300px;
  }
  47.58% {
    background-position: -1200px -3300px;
  }
  48.39% {
    background-position: 0px -3600px;
  }
  49.19% {
    background-position: -300px -3600px;
  }
  50.00% {
    background-position: -600px -3600px;
  }
  50.81% {
    background-position: -900px -3600px;
  }
  51.61% {
    background-position: -1200px -3600px;
  }
  52.42% {
    background-position: 0px -3900px;
  }
  53.23% {
    background-position: -300px -3900px;
  }
  54.03% {
    background-position: -600px -3900px;
  }
  54.84% {
    background-position: -900px -3900px;
  }
  55.65% {
    background-position: -1200px -3900px;
  }
  56.45% {
    background-position: 0px -4200px;
  }
  57.26% {
    background-position: -300px -4200px;
  }
  58.06% {
    background-position: -600px -4200px;
  }
  58.87% {
    background-position: -900px -4200px;
  }
  59.68% {
    background-position: -1200px -4200px;
  }
  60.48% {
    background-position: 0px -4500px;
  }
  61.29% {
    background-position: -300px -4500px;
  }
  62.10% {
    background-position: -600px -4500px;
  }
  62.90% {
    background-position: -900px -4500px;
  }
  63.71% {
    background-position: -1200px -4500px;
  }
  64.52% {
    background-position: 0px -4800px;
  }
  65.32% {
    background-position: -300px -4800px;
  }
  66.13% {
    background-position: -600px -4800px;
  }
  66.94% {
    background-position: -900px -4800px;
  }
  67.74% {
    background-position: -1200px -4800px;
  }
  68.55% {
    background-position: 0px -5100px;
  }
  69.35% {
    background-position: -300px -5100px;
  }
  70.16% {
    background-position: -600px -5100px;
  }
  70.97% {
    background-position: -900px -5100px;
  }
  71.77% {
    background-position: -1200px -5100px;
  }
  72.58% {
    background-position: 0px -5400px;
  }
  73.39% {
    background-position: -300px -5400px;
  }
  74.19% {
    background-position: -600px -5400px;
  }
  75.00% {
    background-position: -900px -5400px;
  }
  75.81% {
    background-position: -1200px -5400px;
  }
  76.61% {
    background-position: 0px -5700px;
  }
  77.42% {
    background-position: -300px -5700px;
  }
  78.23% {
    background-position: -600px -5700px;
  }
  79.03% {
    background-position: -900px -5700px;
  }
  79.84% {
    background-position: -1200px -5700px;
  }
  80.65% {
    background-position: 0px -6000px;
  }
  81.45% {
    background-position: -300px -6000px;
  }
  82.26% {
    background-position: -600px -6000px;
  }
  83.06% {
    background-position: -900px -6000px;
  }
  83.87% {
    background-position: -1200px -6000px;
  }
  84.68% {
    background-position: 0px -6300px;
  }
  85.48% {
    background-position: -300px -6300px;
  }
  86.29% {
    background-position: -600px -6300px;
  }
  87.10% {
    background-position: -900px -6300px;
  }
  87.90% {
    background-position: -1200px -6300px;
  }
  88.71% {
    background-position: 0px -6600px;
  }
  89.52% {
    background-position: -300px -6600px;
  }
  90.32% {
    background-position: -600px -6600px;
  }
  91.13% {
    background-position: -900px -6600px;
  }
  91.94% {
    background-position: -1200px -6600px;
  }
  92.74% {
    background-position: 0px -6900px;
  }
  93.55% {
    background-position: -300px -6900px;
  }
  94.35% {
    background-position: -600px -6900px;
  }
  95.16% {
    background-position: -900px -6900px;
  }
  95.97% {
    background-position: -1200px -6900px;
  }
  96.77% {
    background-position: 0px -7200px;
  }
  97.58% {
    background-position: -300px -7200px;
  }
  98.39% {
    background-position: -600px -7200px;
  }
  99.19% {
    background-position: -900px -7200px;
  }
  100.00% {
    background-position: -1200px -7200px;
  }
}
#bottomLeftPie {
  width: 100%;
  height: 100%;
}
.gridOverviewkLeftPart {
  position: absolute;
  top: 88px;
  left: 48px;
  width: 1458px;
  .content {
    // background-color: rgba(0, 11, 32, 0.26);
    .left {
      width: 1350px;

      .leftBoxBtn {
        width: 1350px;
        height: 41px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 9px;
        font-size: 19px;
        text-align: center;
        color: #99cdff;

        .btn1 {
          width: 138px;
          line-height: 41px;
          background: linear-gradient(
            180deg,
            #0e4072 0%,
            rgba(15, 62, 111, 0.86) 100%
          );
        }
        .btn2 {
          width: 189px;
          line-height: 41px;
          background: linear-gradient(
            180deg,
            #0e4072 0%,
            rgba(15, 62, 111, 0.86) 100%
          );
        }
      }

      .grid {
        font-size: 15px;
        height: 43px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        color: #cce6ff;
        padding-top: 9px;
        text-align: center;
        background: rgba(31, 64, 113, 0.4);
        z-index: 0;
        .size1 {
          width: 138px;
          line-height: 26px;
        }
        .size2 {
          width: 189px;
          line-height: 26px;
        }
      }
    }
  }
  .resources {
    .boxTitle {
      position: relative;
      .rightInfo {
        position: absolute;
        right: 15px;
        font-weight: normal;
        font-size: 20px;
        display: flex;
        color: #68809d;
        .num {
          font-size: 30px;
          padding-top: 20px;
        }
      }
    }
    .content {
      height: 386px;
      position: relative;
      overflow: hidden;
      &::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: rgba(0, 11, 32, 0.16);
        animation: slideInLeft 1.5s ease-in-out;
      }
      .animate_container {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
      }
      section {
        display: flex;
        height: 161px;
        width: 461px;
        background: url("/image/gridOverview/back_bg.png") no-repeat;
        position: relative;
        padding-left: 190px;
        .left_img {
          position: absolute;
          left: -50px;
          top: -60px;
          width: 300px;
          height: 300px;
          background: url("/image/animationKeyFramesBg/gridOverview_icon.png");
          background-position: center;
          // background-origin:content-box;
          animation: iconAnimation 5s steps(1) infinite;
        }
        .right_info {
          width: 270px;
          height: 100%;
          text-align: center;
          animation: zoomInLeft;
          animation-duration: 2s;
          .title {
            font-size: 24px;
            line-height: 31px;
            color: #d3eeff;
            padding: 19px 0;
          }
          .split_line {
            height: 1px;
            background: linear-gradient(
              270deg,
              rgba(74, 222, 255, 0) 0%,
              #24baff 100%
            );
          }
          .num {
            font-size: 50px;
            font-weight: 400;
            padding: 14px 0;
            span {
              font-size: 20px;
              margin-left: 1em;
            }
          }
        }
      }
    }
  }
  .maintenance {
    .content {
      height: 386px;
      position: relative;
      overflow: hidden;
      // justify-content: space-between;
      &::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: rgba(0, 11, 32, 0.16);
        animation: slideInLeft 1.5s ease-in-out;
      }
      .animate_container {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        padding: 40px 52px 40px 52px;
        align-items: center;
        flex-wrap: wrap;
      }
      .chartTitle {
        font-size: 30px;
        font-weight: 400;
        color: #d3eeff;
        letter-spacing: 2px;
      }
      .charts {
        height: calc(100% - 40px);
        width: 100%;
      }
      #salesFiveYearsChart {
        background-image: url("/image/gridOverview/chart_bg.png");
        background-repeat: no-repeat;
        background-position: left 50%;
        background-size: 95%;
      }
      .left_chart {
        width: 47%;
        height: 100%;
      }
      .split_line {
        width: 1px;
        height: 288px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          #ffffff 52%,
          rgba(255, 255, 255, 0) 100%
        );
        opacity: 0.65;
      }
      .right_chart {
        width: 47%;
        height: 100%;
      }
    }
  }
}
</style>
