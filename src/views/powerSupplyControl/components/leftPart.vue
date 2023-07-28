<template>
  <div class="gridOverviewkLeftPart">
    <div class="resources">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">保电资源</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="animate_container">
          <section
            v-for="(item, index) in leftArr"
            :key="`${item.name}_${index}`"
          >
            <div class="bg" v-lazy:background-image="item.imgSrc"></div>
            <div class="main_container">
              <div class="title">{{ item.name }}</div>
              <div class="info">
                <p class="num">
                  {{ item.num }}
                  <span>{{ item.unit }}</span>
                </p>
                <!-- <img :src="item.imgSrc" alt="" /> -->
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">迎峰度夏及防汛保电准备情况</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="animate_container">
          <div class="left_chart">
            <div id="salesFiveYearsChart" class="charts"></div>
          </div>
          <!-- <div class="split_line"></div> -->
          <div class="right_chart">
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
          name: "抢修车辆",
          num: 24,
          unit: "辆",
          imgSrc: "/image/animationKeyFramesBg/qx_car.png",
        },
        {
          name: "发电车辆",
          num: 24,
          unit: "辆",
          imgSrc: "/image/animationKeyFramesBg/elec_car.png",
        },
        {
          name: "保电人员",
          num: 124,
          unit: "人",
          imgSrc: "/image/animationKeyFramesBg/elec_person.png",
        },
        {
          name: "保电设备",
          num: 124,
          unit: "件",
          imgSrc: "/image/animationKeyFramesBg/elec_eqp.png",
        },
      ],
      bottomLeftDataX: [],
      bottomLeftDataY: [],
      bottomRigthDataX: [],
      bottomRigthDataY: [],
    };
  },
  watch: {
    initData1(val) {
      this.leftArr[0].num =
        val.screenTargetPart01Data[0].targetContent[0].indicatorValue.split(
          "/"
        )[1];
      this.leftArr[1].num =
        val.screenTargetPart01Data[0].targetContent[1].indicatorValue.split(
          "/"
        )[1];
      this.leftArr[2].num =
        val.screenTargetPart01Data[0].targetContent[2].indicatorValue.split(
          "/"
        )[1];
      this.leftArr[3].num =
        val.screenTargetPart01Data[0].targetContent[3].indicatorValue.split(
          "/"
        )[1];
      // val.screenTargetPart01Data[0].targetContent
    },
    initData2(val) {
      // console.log(val, "左边数据");
      this.bottomLeftDataX = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.bottomLeftDataY = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.bottomRigthDataX = val.screenTargetPart01Data[1].targetContent.xaxis;
      this.bottomRigthDataY = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.leftBottomLeft(this.bottomLeftDataX, this.bottomLeftDataY);
      this.leftBottomRight(this.bottomRigthDataX, this.bottomRigthDataY);
    },
  },
  mounted() {},
  methods: {
    leftBottomRight(xdata, ydata) {
      let myChart = this.$echarts.init(
        document.getElementById("salesYearChart")
      );
      let that = this;
      let colorList = ["#00C4EA", "#E7D428", "#F873A1", "#60A4FF", "#56FCEF"],
        colorEndList = ["#098BCA", "#BE7F12", "#B23636", "#2837A0", "#2F8B41"],
        unitList = ["台", "座", "棵", "块", "个"];
      myChart.setOption({
        grid: {
          top: "16%",
          left: "6%",
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
              fontSize: 14,
              color: "#8DD3FF",
              margin: 20,
              interval: 0,
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
            // data: [
            //   "主动风扇清洗",
            //   "设备接点检查",
            //   "清理树障",
            //   "安装警示牌",
            //   "加装防护桩",
            // ],
            data: xdata,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // name: "单位：亿千瓦时",
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
              color: function (params) {
                return new that.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: colorList[params.dataIndex], // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: colorEndList[params.dataIndex], // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },
            // data: [440, 219, 500, 600, 300],
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
              color: function (params) {
                return colorEndList[params.dataIndex];
              },
            },
            label: {
              show: true,
              color: "#00FFF8",
              fontSize: 30,
              fontFamily: "numFont",
              position: "top",
              offset: [0, -10],
              formatter: function (params) {
                return params.value + "{a|" + unitList[params.dataIndex] + "}";
              },
              rich: {
                a: {
                  fontSize: 22,
                  align: "left",
                  verticalAlign: "bottom",
                  padding: [0, 0, -2, 0],
                },
              },
            },
            symbolPosition: "end",
            // data: [440, 219, 500, 600, 300],
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
              color: function (params) {
                return colorEndList[params.dataIndex];
              },
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
      let that = this;
      let colorList = ["#00C4EA", "#E7D428", "#F873A1", "#60A4FF", "#56FCEF"],
        colorEndList = ["#098BCA", "#BE7F12", "#B23636", "#2837A0", "#2F8B41"],
        unitList = ["人", "人次", "支", "人", "辆"];
      myChart.setOption({
        grid: {
          top: "16%",
          left: "6%",
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
              fontSize: 14,
              color: "#8DD3FF",
              margin: 20,
              interval: 0,
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
            // data: [
            //   "在岗值班领导",
            //   "安排巡视人员",
            //   "应急抢修队伍",
            //   "抢修人员",
            //   "抢修车辆",
            // ],
            data: xdata,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // name: "单位：亿千瓦时",
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
              show: false,
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
              color: function (params) {
                return new that.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: colorList[params.dataIndex], // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: colorEndList[params.dataIndex], // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },
            // data: [440, 219, 500, 600, 300],
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
              color: function (params) {
                return colorEndList[params.dataIndex];
              },
            },
            label: {
              show: true,
              color: "#00FFF8",
              fontSize: 30,
              fontFamily: "numFont",
              position: "top",
              offset: [0, -10],
              formatter: function (params) {
                return params.value + "{a|" + unitList[params.dataIndex] + "}";
              },
              rich: {
                a: {
                  fontSize: 22,
                  align: "left",
                  verticalAlign: "bottom",
                  padding: [0, 0, -2, 0],
                },
              },
            },
            symbolPosition: "end",
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
              color: function (params) {
                return colorEndList[params.dataIndex];
              },
            },
            data: [1, 1, 1, 1, 1],
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes qxAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.76% {
    background-position: -400px 0px;
  }
  1.52% {
    background-position: -800px 0px;
  }
  2.27% {
    background-position: -1200px 0px;
  }
  3.03% {
    background-position: -1600px 0px;
  }
  3.79% {
    background-position: -2000px 0px;
  }
  4.55% {
    background-position: -2400px 0px;
  }
  5.30% {
    background-position: -2800px 0px;
  }
  6.06% {
    background-position: -3200px 0px;
  }
  6.82% {
    background-position: -3600px 0px;
  }
  7.58% {
    background-position: -4000px 0px;
  }
  8.33% {
    background-position: -4400px 0px;
  }
  9.09% {
    background-position: 0px -400px;
  }
  9.85% {
    background-position: -400px -400px;
  }
  10.61% {
    background-position: -800px -400px;
  }
  11.36% {
    background-position: -1200px -400px;
  }
  12.12% {
    background-position: -1600px -400px;
  }
  12.88% {
    background-position: -2000px -400px;
  }
  13.64% {
    background-position: -2400px -400px;
  }
  14.39% {
    background-position: -2800px -400px;
  }
  15.15% {
    background-position: -3200px -400px;
  }
  15.91% {
    background-position: -3600px -400px;
  }
  16.67% {
    background-position: -4000px -400px;
  }
  17.42% {
    background-position: -4400px -400px;
  }
  18.18% {
    background-position: 0px -800px;
  }
  18.94% {
    background-position: -400px -800px;
  }
  19.70% {
    background-position: -800px -800px;
  }
  20.45% {
    background-position: -1200px -800px;
  }
  21.21% {
    background-position: -1600px -800px;
  }
  21.97% {
    background-position: -2000px -800px;
  }
  22.73% {
    background-position: -2400px -800px;
  }
  23.48% {
    background-position: -2800px -800px;
  }
  24.24% {
    background-position: -3200px -800px;
  }
  25.00% {
    background-position: -3600px -800px;
  }
  25.76% {
    background-position: -4000px -800px;
  }
  26.52% {
    background-position: -4400px -800px;
  }
  27.27% {
    background-position: 0px -1200px;
  }
  28.03% {
    background-position: -400px -1200px;
  }
  28.79% {
    background-position: -800px -1200px;
  }
  29.55% {
    background-position: -1200px -1200px;
  }
  30.30% {
    background-position: -1600px -1200px;
  }
  31.06% {
    background-position: -2000px -1200px;
  }
  31.82% {
    background-position: -2400px -1200px;
  }
  32.58% {
    background-position: -2800px -1200px;
  }
  33.33% {
    background-position: -3200px -1200px;
  }
  34.09% {
    background-position: -3600px -1200px;
  }
  34.85% {
    background-position: -4000px -1200px;
  }
  35.61% {
    background-position: -4400px -1200px;
  }
  36.36% {
    background-position: 0px -1600px;
  }
  37.12% {
    background-position: -400px -1600px;
  }
  37.88% {
    background-position: -800px -1600px;
  }
  38.64% {
    background-position: -1200px -1600px;
  }
  39.39% {
    background-position: -1600px -1600px;
  }
  40.15% {
    background-position: -2000px -1600px;
  }
  40.91% {
    background-position: -2400px -1600px;
  }
  41.67% {
    background-position: -2800px -1600px;
  }
  42.42% {
    background-position: -3200px -1600px;
  }
  43.18% {
    background-position: -3600px -1600px;
  }
  43.94% {
    background-position: -4000px -1600px;
  }
  44.70% {
    background-position: -4400px -1600px;
  }
  45.45% {
    background-position: 0px -2000px;
  }
  46.21% {
    background-position: -400px -2000px;
  }
  46.97% {
    background-position: -800px -2000px;
  }
  47.73% {
    background-position: -1200px -2000px;
  }
  48.48% {
    background-position: -1600px -2000px;
  }
  49.24% {
    background-position: -2000px -2000px;
  }
  50.00% {
    background-position: -2400px -2000px;
  }
  50.76% {
    background-position: -2800px -2000px;
  }
  51.52% {
    background-position: -3200px -2000px;
  }
  52.27% {
    background-position: -3600px -2000px;
  }
  53.03% {
    background-position: -4000px -2000px;
  }
  53.79% {
    background-position: -4400px -2000px;
  }
  54.55% {
    background-position: 0px -2400px;
  }
  55.30% {
    background-position: -400px -2400px;
  }
  56.06% {
    background-position: -800px -2400px;
  }
  56.82% {
    background-position: -1200px -2400px;
  }
  57.58% {
    background-position: -1600px -2400px;
  }
  58.33% {
    background-position: -2000px -2400px;
  }
  59.09% {
    background-position: -2400px -2400px;
  }
  59.85% {
    background-position: -2800px -2400px;
  }
  60.61% {
    background-position: -3200px -2400px;
  }
  61.36% {
    background-position: -3600px -2400px;
  }
  62.12% {
    background-position: -4000px -2400px;
  }
  62.88% {
    background-position: -4400px -2400px;
  }
  63.64% {
    background-position: 0px -2800px;
  }
  64.39% {
    background-position: -400px -2800px;
  }
  65.15% {
    background-position: -800px -2800px;
  }
  65.91% {
    background-position: -1200px -2800px;
  }
  66.67% {
    background-position: -1600px -2800px;
  }
  67.42% {
    background-position: -2000px -2800px;
  }
  68.18% {
    background-position: -2400px -2800px;
  }
  68.94% {
    background-position: -2800px -2800px;
  }
  69.70% {
    background-position: -3200px -2800px;
  }
  70.45% {
    background-position: -3600px -2800px;
  }
  71.21% {
    background-position: -4000px -2800px;
  }
  71.97% {
    background-position: -4400px -2800px;
  }
  72.73% {
    background-position: 0px -3200px;
  }
  73.48% {
    background-position: -400px -3200px;
  }
  74.24% {
    background-position: -800px -3200px;
  }
  75.00% {
    background-position: -1200px -3200px;
  }
  75.76% {
    background-position: -1600px -3200px;
  }
  76.52% {
    background-position: -2000px -3200px;
  }
  77.27% {
    background-position: -2400px -3200px;
  }
  78.03% {
    background-position: -2800px -3200px;
  }
  78.79% {
    background-position: -3200px -3200px;
  }
  79.55% {
    background-position: -3600px -3200px;
  }
  80.30% {
    background-position: -4000px -3200px;
  }
  81.06% {
    background-position: -4400px -3200px;
  }
  81.82% {
    background-position: 0px -3600px;
  }
  82.58% {
    background-position: -400px -3600px;
  }
  83.33% {
    background-position: -800px -3600px;
  }
  84.09% {
    background-position: -1200px -3600px;
  }
  84.85% {
    background-position: -1600px -3600px;
  }
  85.61% {
    background-position: -2000px -3600px;
  }
  86.36% {
    background-position: -2400px -3600px;
  }
  87.12% {
    background-position: -2800px -3600px;
  }
  87.88% {
    background-position: -3200px -3600px;
  }
  88.64% {
    background-position: -3600px -3600px;
  }
  89.39% {
    background-position: -4000px -3600px;
  }
  90.15% {
    background-position: -4400px -3600px;
  }
  90.91% {
    background-position: 0px -4000px;
  }
  91.67% {
    background-position: -400px -4000px;
  }
  92.42% {
    background-position: -800px -4000px;
  }
  93.18% {
    background-position: -1200px -4000px;
  }
  93.94% {
    background-position: -1600px -4000px;
  }
  94.70% {
    background-position: -2000px -4000px;
  }
  95.45% {
    background-position: -2400px -4000px;
  }
  96.21% {
    background-position: -2800px -4000px;
  }
  96.97% {
    background-position: -3200px -4000px;
  }
  97.73% {
    background-position: -3600px -4000px;
  }
  98.48% {
    background-position: -4000px -4000px;
  }
  99.24% {
    background-position: -4400px -4000px;
  }
  100.00% {
    background-position: 0px -4400px;
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
    background-color: rgba(0, 11, 32, 0.26);
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
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 30px 46px;
      }
      section {
        height: 100%;
        width: 312px;
        position: relative;
        overflow: hidden;
        .bg {
          position: absolute;
          z-index: 1;
          width: 400px;
          height: 400px;
          top: 30px;
          // left: -37px;
        }
        .main_container {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
        &:nth-of-type(1) {
          .bg {
            // background: url("/image/animationKeyFramesBg/qx_car.png");
            background-repeat: no-repeat;
            background-position: center;
            // animation: qxAnimation 5.32s steps(1) infinite;
          }
        }
        &:nth-of-type(2) {
          .bg {
            // background: url("/image/animationKeyFramesBg/elec_car.png");
            background-repeat: no-repeat;
            background-position: center;
            // animation: qxAnimation 5.32s steps(1) infinite;
            // top: -24px;
            // left: -38px;
          }
        }
        &:nth-of-type(3) {
          .bg {
            // background: url("/image/animationKeyFramesBg/elec_person.png");
            background-repeat: no-repeat;
            background-position: center;
            // animation: qxAnimation 5.32s steps(1) infinite;
            // top: -35px;
            // left: -30px;
          }
        }
        &:nth-of-type(4) {
          .bg {
            // background: url("/image/animationKeyFramesBg/elec_eqp.png");
            background-repeat: no-repeat;
            background-position: center;
            // animation: qxAnimation 5.32s steps(1) infinite;
            // top: -15px;
            // left: -37px;
          }
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          color: #b1d9fb;
          padding-left: 40px;
        }
        .info {
          background-position: center;
          padding-left: 30px;
          padding-top: 30px;
          height: 266px;
          position: relative;
          .num {
            font-size: 69px;
            letter-spacing: 5px;
            span {
              font-size: 26px;
              font-weight: 400;
              color: #ffffff;
              // padding-left: 10px;
            }
          }
          img {
            position: absolute;
            right: 20px;
            bottom: -20px;
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
        align-items: center;
        flex-wrap: wrap;
        padding: 30px 67px 10px 67px;
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
      // #salesFiveYearsChart {
      //   background-image: url("/image/gridOverview/chart_bg.png");
      //   background-repeat: no-repeat;
      //   background-position: left 50%;
      //   background-size: 95%;
      // }
      .left_chart {
        width: 48%;
        height: 100%;
        background: url("/image/powerSupplyControl/chart_bg.png") no-repeat;
        background-size: 100%;
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
        width: 48%;
        height: 100%;
        background: url("/image/powerSupplyControl/chart_bg.png") no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
