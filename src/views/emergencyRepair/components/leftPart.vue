<template>
  <div class="gridOverviewkLeftPart">
    <div class="resources">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{ title }}</div>
        <!-- <div class="img"></div> -->
        <div class="rightInfo">
          <p :class="{ plan: show === 1 }" @click="change1(1)">周</p>
          <p :class="{ plan: show === 2 }" @click="change1(2)">月</p>
          <p :class="{ plan: show === 3 }" @click="change1(3)">年</p>
        </div>
      </div>
      <div class="content">
        <div
          :class="['target', 'target' + (index + 1)]"
          v-for="(item, index) in arrlist"
          :key="index"
        >
          <div :class="['box_left', 'box_left' + (index + 1)]"></div>
          <p class="title">{{ item.title }}</p>
          <div class="heng"></div>
          <div class="kuang">
            <div class="top">
              <div>{{ item.key1 }}</div>
              <p>
                <span>{{ item.value1 }}</span>
              </p>
            </div>
            <div class="bottom">
              <div>{{ item.key2 }}</div>
              <p>
                <span>{{ item.value2 }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{ title2 }}</div>
        <div class="rightInfo">
          <p :class="{ plan: show2 === 1 }" @click="change2(1)">周</p>
          <p :class="{ plan: show2 === 2 }" @click="change2(2)">月</p>
          <p :class="{ plan: show2 === 3 }" @click="change2(3)">年</p>
        </div>
      </div>
      <div class="content">
        <div ref="chart" class="chart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    initData: {
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
  watch: {
    initData(val) {
      this.title = val.screenTargetPart01Data[0].targetTitle;
      val.screenTargetPart01Data.forEach((item) => {
        item.targetContent.forEach((item2) => {
          item2.title = item2.columnValue1.split("/")[1].split("-")[0];
          item2.key1 = item2.columnValue2.split("/")[0];
          item2.value1 = item2.columnValue2.split("/")[1];
          item2.key2 = item2.columnValue3.split("/")[0];
          item2.value2 = item2.columnValue3.split("/")[1];
        });
      });
      this.arr1 = val.screenTargetPart01Data[0].targetContent;
      this.arr2 = val.screenTargetPart01Data[1].targetContent;
      this.arr3 = val.screenTargetPart01Data[2].targetContent;
      this.getIndex(this.title);
    },
    initData2(val) {
      this.title2 = val.targetGroupTitle;
      this.zxaxis = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.zyaxis1 = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.zyaxis2 = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.yxaxis = val.screenTargetPart01Data[2].targetContent.xaxis;
      this.yyaxis1 = val.screenTargetPart01Data[2].targetContent.yaxis;
      this.yyaxis2 = val.screenTargetPart01Data[3].targetContent.yaxis;
      this.nxaxis = val.screenTargetPart01Data[4].targetContent.xaxis;
      this.nyaxis1 = val.screenTargetPart01Data[4].targetContent.yaxis;
      this.nyaxis2 = val.screenTargetPart01Data[5].targetContent.yaxis;
      this.getIndex(this.title2);
    },
  },
  data() {
    return {
      //图1
      title: "",
      arr1: [], //周
      arr2: [], //月
      arr3: [], //年
      arrlist: [],
      show: 0,
      //图2
      title2: "",
      zxaxis: [], //周 x
      zyaxis1: [], //周 95598 y
      zyaxis2: [], //周 主动 y
      yxaxis: [], //月 x
      yyaxis1: [], //月 95598 y
      yyaxis2: [], //月 主动 y
      nxaxis: [], //年 x
      nyaxis1: [], //年 95598 y
      nyaxis2: [], //年 主动 y
      show2: 0,
    };
  },
  mounted() {
    // this.leftBottompBar();
  },
  methods: {
    getIndex(name) {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: name },
        })
        .then((res) => {
          if (res.data.code === 200) {
            if (name === "抢修工单指标") {
              this.change1(res.data.data);
            }
            if (name === "抢修工单数量") {
              this.change2(res.data.data);
            }
          }
        });
    },
    change1(e) {
      // console.log(e);
      this.show = e;
      if (e === 1) {
        this.arrlist = this.arr1;
      } else if (e === 2) {
        this.arrlist = this.arr2;
      } else {
        this.arrlist = this.arr3;
      }
    },
    change2(e) {
      this.show2 = e;
      if (e === 1) {
        this.leftBottompBar(this.zxaxis, this.zyaxis1, this.zyaxis2);
      } else if (e === 2) {
        this.leftBottompBar(this.yxaxis, this.yyaxis1, this.yyaxis2);
      } else {
        this.leftBottompBar(this.nxaxis, this.nyaxis1, this.nyaxis2);
      }
    },
    leftBottompBar(x, y1, y2) {
      // let _chart = this.$refs.chart;
      let myChart = this.$echarts.init(this.$refs.chart);
      let xData = x;
      let data1 = y1,
        data2 = y2;
      let option = {
        title: {
          text: "单位: 件",
          left: "40px",
          top: "35px",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
          },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 80,
          bottom: 45,
          right: 10,
          textStyle: {
            color: "#D3EEFF",
          },
        },
        //backgroundColor: "#344b58",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          //鼠标移上去显示的图例样式调整
          formatter: function (params) {
            return (
              params[0].name +
              "<br>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4BBE69;'></span> " +
              params[0].seriesName +
              ": " +
              params[0].value +
              "件" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1B97C0;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "件"
            );
          },
        },
        // legend: {
        //   show: true,
        //   x: "left",
        //   y: "top",
        //   padding: [20, 20,0,0],
        //   itemGap: 40,
        //   textStyle: { color: "#D3EEFF", fontSize: 20 },
        // },
        legend: {
          itemWidth: 18,
          itemHeight: 18,
          left: "3%",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 16,
          },
          selectedMode: false,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: "#D3EEFF",
              fontSize: 18,
            },
            boundaryGap: true, //设置x轴是否从第一位开始
            data: xData,
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,

            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#8B9AAE",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: "#D3EEFF",
              fontSize: 20,
              fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "95598工单",
            type: "bar",
            barMaxWidth: 30,
            barGap: "50%",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#57CE67", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#37A56B", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#54FD69",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: "主动抢修",
            type: "bar",
            barMaxWidth: 30,
            barGap: "50%",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#5CFAFC", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#006DA7", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFF8",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: "主动抢修",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [30, 8],
            symbolOffset: [22.5, -5],
            symbolPosition: "end",
            z: 40,
            color: "#9BE5FF",
            data: data2,
          },
          {
            name: "95598工单",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [30, 8],
            symbolOffset: [-22.5, -5],
            symbolPosition: "end",
            z: 40,
            color: "#ABFF9E",
            data: data1,
          },
          {
            name: "主动抢修",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [30, 8],
            symbolOffset: [22.5, 5],
            // symbolPosition: 'end',
            z: 40,
            color: "#006DA7",
            data: data2,
          },
          {
            name: "95598工单",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [30, 8],
            symbolOffset: [-22.5, 5],
            // symbolPosition: 'end',
            z: 40,
            color: "#37A56B",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes left_bg_animation {
  0% {
    background-position: bottom;
  }
  100% {
    background-position: center;
  }
}
@keyframes box_leftAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -200px 0px;
  }
  1.61% {
    background-position: -400px 0px;
  }
  2.42% {
    background-position: -600px 0px;
  }
  3.23% {
    background-position: -800px 0px;
  }
  4.03% {
    background-position: -1000px 0px;
  }
  4.84% {
    background-position: -1200px 0px;
  }
  5.65% {
    background-position: -1400px 0px;
  }
  6.45% {
    background-position: -1600px 0px;
  }
  7.26% {
    background-position: -1800px 0px;
  }
  8.06% {
    background-position: -2000px 0px;
  }
  8.87% {
    background-position: -2200px 0px;
  }
  9.68% {
    background-position: -2400px 0px;
  }
  10.48% {
    background-position: -2600px 0px;
  }
  11.29% {
    background-position: -2800px 0px;
  }
  12.10% {
    background-position: -3000px 0px;
  }
  12.90% {
    background-position: -3200px 0px;
  }
  13.71% {
    background-position: -3400px 0px;
  }
  14.52% {
    background-position: -3600px 0px;
  }
  15.32% {
    background-position: -3800px 0px;
  }
  16.13% {
    background-position: -4000px 0px;
  }
  16.94% {
    background-position: -4200px 0px;
  }
  17.74% {
    background-position: -4400px 0px;
  }
  18.55% {
    background-position: -4600px 0px;
  }
  19.35% {
    background-position: -4800px 0px;
  }
  20.16% {
    background-position: 0px -200px;
  }
  20.97% {
    background-position: -200px -200px;
  }
  21.77% {
    background-position: -400px -200px;
  }
  22.58% {
    background-position: -600px -200px;
  }
  23.39% {
    background-position: -800px -200px;
  }
  24.19% {
    background-position: -1000px -200px;
  }
  25.00% {
    background-position: -1200px -200px;
  }
  25.81% {
    background-position: -1400px -200px;
  }
  26.61% {
    background-position: -1600px -200px;
  }
  27.42% {
    background-position: -1800px -200px;
  }
  28.23% {
    background-position: -2000px -200px;
  }
  29.03% {
    background-position: -2200px -200px;
  }
  29.84% {
    background-position: -2400px -200px;
  }
  30.65% {
    background-position: -2600px -200px;
  }
  31.45% {
    background-position: -2800px -200px;
  }
  32.26% {
    background-position: -3000px -200px;
  }
  33.06% {
    background-position: -3200px -200px;
  }
  33.87% {
    background-position: -3400px -200px;
  }
  34.68% {
    background-position: -3600px -200px;
  }
  35.48% {
    background-position: -3800px -200px;
  }
  36.29% {
    background-position: -4000px -200px;
  }
  37.10% {
    background-position: -4200px -200px;
  }
  37.90% {
    background-position: -4400px -200px;
  }
  38.71% {
    background-position: -4600px -200px;
  }
  39.52% {
    background-position: -4800px -200px;
  }
  40.32% {
    background-position: 0px -400px;
  }
  41.13% {
    background-position: -200px -400px;
  }
  41.94% {
    background-position: -400px -400px;
  }
  42.74% {
    background-position: -600px -400px;
  }
  43.55% {
    background-position: -800px -400px;
  }
  44.35% {
    background-position: -1000px -400px;
  }
  45.16% {
    background-position: -1200px -400px;
  }
  45.97% {
    background-position: -1400px -400px;
  }
  46.77% {
    background-position: -1600px -400px;
  }
  47.58% {
    background-position: -1800px -400px;
  }
  48.39% {
    background-position: -2000px -400px;
  }
  49.19% {
    background-position: -2200px -400px;
  }
  50.00% {
    background-position: -2400px -400px;
  }
  50.81% {
    background-position: -2600px -400px;
  }
  51.61% {
    background-position: -2800px -400px;
  }
  52.42% {
    background-position: -3000px -400px;
  }
  53.23% {
    background-position: -3200px -400px;
  }
  54.03% {
    background-position: -3400px -400px;
  }
  54.84% {
    background-position: -3600px -400px;
  }
  55.65% {
    background-position: -3800px -400px;
  }
  56.45% {
    background-position: -4000px -400px;
  }
  57.26% {
    background-position: -4200px -400px;
  }
  58.06% {
    background-position: -4400px -400px;
  }
  58.87% {
    background-position: -4600px -400px;
  }
  59.68% {
    background-position: -4800px -400px;
  }
  60.48% {
    background-position: 0px -600px;
  }
  61.29% {
    background-position: -200px -600px;
  }
  62.10% {
    background-position: -400px -600px;
  }
  62.90% {
    background-position: -600px -600px;
  }
  63.71% {
    background-position: -800px -600px;
  }
  64.52% {
    background-position: -1000px -600px;
  }
  65.32% {
    background-position: -1200px -600px;
  }
  66.13% {
    background-position: -1400px -600px;
  }
  66.94% {
    background-position: -1600px -600px;
  }
  67.74% {
    background-position: -1800px -600px;
  }
  68.55% {
    background-position: -2000px -600px;
  }
  69.35% {
    background-position: -2200px -600px;
  }
  70.16% {
    background-position: -2400px -600px;
  }
  70.97% {
    background-position: -2600px -600px;
  }
  71.77% {
    background-position: -2800px -600px;
  }
  72.58% {
    background-position: -3000px -600px;
  }
  73.39% {
    background-position: -3200px -600px;
  }
  74.19% {
    background-position: -3400px -600px;
  }
  75.00% {
    background-position: -3600px -600px;
  }
  75.81% {
    background-position: -3800px -600px;
  }
  76.61% {
    background-position: -4000px -600px;
  }
  77.42% {
    background-position: -4200px -600px;
  }
  78.23% {
    background-position: -4400px -600px;
  }
  79.03% {
    background-position: -4600px -600px;
  }
  79.84% {
    background-position: -4800px -600px;
  }
  80.65% {
    background-position: 0px -800px;
  }
  81.45% {
    background-position: -200px -800px;
  }
  82.26% {
    background-position: -400px -800px;
  }
  83.06% {
    background-position: -600px -800px;
  }
  83.87% {
    background-position: -800px -800px;
  }
  84.68% {
    background-position: -1000px -800px;
  }
  85.48% {
    background-position: -1200px -800px;
  }
  86.29% {
    background-position: -1400px -800px;
  }
  87.10% {
    background-position: -1600px -800px;
  }
  87.90% {
    background-position: -1800px -800px;
  }
  88.71% {
    background-position: -2000px -800px;
  }
  89.52% {
    background-position: -2200px -800px;
  }
  90.32% {
    background-position: -2400px -800px;
  }
  91.13% {
    background-position: -2600px -800px;
  }
  91.94% {
    background-position: -2800px -800px;
  }
  92.74% {
    background-position: -3000px -800px;
  }
  93.55% {
    background-position: -3200px -800px;
  }
  94.35% {
    background-position: -3400px -800px;
  }
  95.16% {
    background-position: -3600px -800px;
  }
  95.97% {
    background-position: -3800px -800px;
  }
  96.77% {
    background-position: -4000px -800px;
  }
  97.58% {
    background-position: -4200px -800px;
  }
  98.39% {
    background-position: -4400px -800px;
  }
  99.19% {
    background-position: -4600px -800px;
  }
  100.00% {
    background-position: -4800px -800px;
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
  background: url("/image/emergencyRepair/bj3.png") 0 0 no-repeat;
  background-position: center;
  background-size: 100%;
  animation: left_bg_animation 1s linear;
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
    .rightInfo {
      position: absolute;
      right: 15px;
      display: flex;
      top: 30px;
      p {
        width: 60px;
        height: 48px;
        font-size: 20px;
        color: #ffffff;
        text-align: center;
        font-weight: 400;
        opacity: 0.8;
        cursor: pointer;
      }
      .plan {
        background: linear-gradient(
          180deg,
          rgba(56, 189, 255, 0) 0%,
          rgba(56, 189, 255, 0.2) 82%,
          rgba(56, 189, 255, 0.7) 100%
        );
        opacity: 1;
      }
    }
    .content {
      height: 406px;
      //   padding-left: 40px;
      //   padding-right: 40px;
      background: rgba(2, 72, 94, 0.14);
      overflow: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .target {
        position: relative;
        width: 339px;
        height: 293px;
        overflow: hidden;
        animation: bounceInLeft 2s;
        .box_left {
          width: 200px;
          height: 200px;
          position: absolute;
          top: 65px;
          left: -20px;
          animation: fadeInUp 4s ;
        }
        .heng {
          width: 209px;
          height: 1px;
          background: linear-gradient(
            270deg,
            rgba(74, 222, 255, 0) 0%,
            #24baff 100%
          );
          opacity: 1;
          position: absolute;
          left: 113px;
          bottom: 178px;
        }
        .kuang {
          height: 172px;
          width: 180px;
          position: absolute;
          left: 145px;
          bottom: 6px;
          > div {
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            > div {
              font-size: 22px;
            }
            > p {
              color: #5affea;
              font-size: 40px;
              font-family: "numFont";
              display: flex;
              align-items: center;
              span:nth-child(1) {
                display: block;
                animation: fadeInTopLeft 5s;
              }
              span:nth-child(2) {
                font-size: 30px;
                margin-left: 10px;
              }
            }
          }
        }
        .title {
          font-size: 26px;
          position: absolute;
          bottom: 190px;
          left: 145px;
          color: #487fc4;
        }
      }
      .target1 {
        width: 365px;
        height: 293px;
        background: url("/image/emergencyRepair/left1.png") no-repeat;
        .box_left1 {
          background: url("/image/emergencyRepair/left_top1.png") no-repeat;
        }
      }
      .target2 {
        background: url("/image/emergencyRepair/left2.png") no-repeat;
        .box_left2 {
          background: url("/image/emergencyRepair/left_top2.png") no-repeat;
        }
      }
      .target3 {
        background: url("/image/emergencyRepair/left3.png") no-repeat;
        .box_left3 {
          background: url("/image/emergencyRepair/left_top3-4.png") no-repeat;
        }
      }
      .target4 {
        width: 365px;
        height: 293px;
        background: url("/image/emergencyRepair/left4.png") 0 0 no-repeat;
        .box_left4 {
          background: url("/image/emergencyRepair/left_top3-4.png") no-repeat;
          left: 4px;
        }
        .heng {
          left: 144px;
        }
        .title {
          left: 170px;
        }
        .kuang {
          left: 170px;
        }
      }
    }
  }
  .maintenance {
    .boxTitle {
      position: relative;
      .rightInfo {
        position: absolute;
        right: 15px;
        display: flex;
        top: 30px;
        p {
          width: 60px;
          height: 48px;
          font-size: 20px;
          color: #ffffff;
          text-align: center;
          font-weight: 400;
          opacity: 0.8;
          cursor: pointer;
        }
        .plan {
          background: linear-gradient(
            180deg,
            rgba(56, 189, 255, 0) 0%,
            rgba(56, 189, 255, 0.2) 82%,
            rgba(56, 189, 255, 0.7) 100%
          );
          opacity: 1;
        }
      }
    }
    .content {
      height: 386px;
      padding: 0 52px 0 0;
      .chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
