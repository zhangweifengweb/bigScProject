<template>
  <div class="gridOverviewRightPart">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">配网五年发展趋势</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="animate_container">
          <div class="left_chart">
            <p class="chartTitle">10千伏线路发展趋势</p>
            <div id="tenkDevelopChart" class="charts"></div>
          </div>
          <div class="split_line"></div>
          <div class="right_chart">
            <p class="chartTitle">10千伏线路联络率和N-1通过率（%）</p>
            <div id="tenkConnectionChart" class="charts"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="taskMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">县（区）配网规模</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="animate_container">
          <div class="left_chart">
            <p class="chartTitle">联络线路分布</p>
            <div class="charts">
              <div class="unit">单位：条</div>
              <pyramid3dChart
                :id="'lineDistributionChart'"
                :option="option3D1"
              />
            </div>
          </div>
          <div class="split_line"></div>
          <div class="center_chart">
            <p class="chartTitle">配变分布</p>
            <div class="charts">
              <div class="unit">单位：台</div>
              <pyramid3dChart :id="'distributionChart'" :option="option3D2" />
            </div>
          </div>
          <div class="split_line"></div>
          <div class="right_chart">
            <p class="chartTitle">配变容量分布</p>
            <div class="charts">
              <div class="unit">单位：kVA</div>
              <pyramid3dChart
                :id="'transformerCapacityChart'"
                :option="option3D3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pyramid3dChart from "@/components/pyramid3d.vue";
export default {
  components: {
    pyramid3dChart,
  },
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
  watch: {
    initData1(val) {
      //线路条数
      this.lineNumX = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.lineNumY = val.screenTargetPart01Data[0].targetContent.yaxis;
      //线路发展趋势
      this.lineQSX = val.screenTargetPart01Data[1].targetContent.xaxis;
      this.lineQSY = val.screenTargetPart01Data[1].targetContent.yaxis;

      this.rightTopLeft(this.lineNumX, this.lineNumY, this.lineQSY);
      //10千伏线路联络率
      this.llrateNumX = val.screenTargetPart02Data[0].targetContent.xaxis;
      this.llrateNumY = val.screenTargetPart02Data[0].targetContent.yaxis;
      //N-1通过率
      this.tgrateNumX = val.screenTargetPart02Data[1].targetContent.xaxis;
      this.tgrateNumY = val.screenTargetPart02Data[1].targetContent.yaxis;
      this.rightTopRight(this.llrateNumX, this.llrateNumY, this.tgrateNumY);
    },
    initData2(val) {
      // console.log("右边的数据", val);
      this.option3D1.series[0].data = [];
      val.screenTargetPart01Data.targetContent.xaxis.forEach(
        (item1, index1) => {
          val.screenTargetPart01Data.targetContent.yaxis.forEach(
            (item2, index2) => {
              if (index1 == index2) {
                this.option3D1.series[0].data.push([item1, Number(item2)]);
              }
            }
          );
        }
      );
      this.option3D2.series[0].data = [];
      val.screenTargetPart02Data.targetContent.xaxis.forEach(
        (item1, index1) => {
          val.screenTargetPart02Data.targetContent.yaxis.forEach(
            (item2, index2) => {
              if (index1 == index2) {
                this.option3D2.series[0].data.push([item1, Number(item2)]);
              }
            }
          );
        }
      );
      this.option3D3.series[0].data = [];
      val.screenTargetPart03Data.targetContent.xaxis.forEach(
        (item1, index1) => {
          val.screenTargetPart03Data.targetContent.yaxis.forEach(
            (item2, index2) => {
              if (index1 == index2) {
                this.option3D3.series[0].data.push([item1, Number(item2)]);
              }
            }
          );
        }
      );

      // console.log("data1", this.option3D1.series[0].data);
      // console.log("data2", this.option3D2.series[0].data);
      // console.log("data3", this.option3D3.series[0].data);
    },
  },
  data() {
    return {
      seriesList: [],
      option3D1: {
        colors: [
          "rgba(255,181,34,.2)",
          "rgba(59,235,72,.2)",
          "rgba(88,255,244,.2)",
          "rgba(88,178,255,.2)",
          "rgba(222,210,31,.2)",
          "rgba(188,102,44,.2)",
        ],
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
      option3D2: {
        colors: [
          "rgba(255,181,34,.2)",
          "rgba(59,235,72,.2)",
          "rgba(88,255,244,.2)",
          "rgba(88,178,255,.2)",
          "rgba(222,210,31,.2)",
          "rgba(188,102,44,.2)",
        ],
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
      option3D3: {
        colors: [
          "rgba(255,181,34,.2)",
          "rgba(59,235,72,.2)",
          "rgba(88,255,244,.2)",
          "rgba(88,178,255,.2)",
          "rgba(222,210,31,.2)",
          "rgba(188,102,44,.2)",
        ],
        series: [
          {
            name: "",
            data: [
              // ["原州区", 35],
              // ["西吉县", 8],
              // ["彭阳县", 6],
              // ["隆德县", 13],
              // ["泾源县", 10],
              // ["三营", 24],
            ],
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    rightTopLeft(xdata, ytsdata, yqsdata) {
      let myChart = this.$echarts.init(
        document.getElementById("tenkDevelopChart")
      );
      myChart.setOption({
        backgroundColor: "transparent",
        grid: {
          top: "20%",
          left: "12%",
          right: "15%",
          bottom: "12%",
        },
        color: ["#FFB522", "#DEAE66"],
        legend: {
          show: true,
          x: "left",
          y: "top",
          padding: [15, 0],
          itemGap: 20,
          icon: "roundRect",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          //   z: 0, //竖线在圆圈后面
          //   label: {
          //     backgroundColor: "rgba(0,0,0,0)",
          //     color: "#D3EEFF",
          //   },
          // },
        },
        // color: ["#2BB2F8", "#DEAE66"],
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
            // margin:20,
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
              formatter: "{value}条",
            },
            axisTick: {
              show: false,
            },
          },
          {
            type: "value",
            min: 0,
            max: 500,
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
              // padding:[0,20],
              textStyle: {
                color: "#8DD3FF",
                fontSize: 17,
                // fontFamily: "numFont",
              },
              formatter: "{value}公里",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "线路长度",
            type: "line",
            symbol: "circle",
            symbolSize: 10, //转折点的大小
            yAxisIndex: 0,
            z: 99,
            itemStyle: {
              normal: {
                color: "#00334A ", //图例的颜色
                borderColor: "#27EBCD",
                borderWidth: 3,
                lineStyle: {
                  color: "#27EBCD", //线的颜色
                },
                label: {
                  show: true,
                  color: "#27EBCD",
                  fontSize: 30,
                  fontFamily: "numFont",
                  offset: [0, -10],
                },
              },
            },
            // data: [250, 400, 450, 500, 530], //data.values
            data: yqsdata, //data.values
          },
          {
            name: "线路条数",
            type: "bar",
            barWidth: 30,
            barGap: "20%",
            z: 11,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#DFC324", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#C08213", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                label: {
                  show: true,
                  color: "#FFCC65",
                  fontSize: 30,
                  fontFamily: "numFont",
                  position: "top",
                  offset: [0, -20],
                },
              },
            },

            // data: [66, 82, 98, 125, 230],
            data: ytsdata,
          },
          {
            //柱子顶部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [0, -10],
            yAxisIndex: 1,
            z: 12,
            itemStyle: {
              opacity: 1,
              color: "#D59D37",
            },
            symbolPosition: "end",
            // data: [66, 82, 98, 125, 230],
            data: ytsdata,
          },
          {
            //柱子底部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [0, 5],
            z: 10,
            yAxisIndex: 1,
            itemStyle: {
              opacity: 1,
              color: "#C08213",
            },
            data: [1, 1, 1, 1, 1],
          },
        ],
      });
    },
    rightTopRight(xdata, llydata, tgydata) {
      let myChart = this.$echarts.init(
        document.getElementById("tenkConnectionChart")
      );
      myChart.setOption({
        backgroundColor: "transparent",
        grid: {
          top: "20%",
          left: "12%",
          right: "5%",
          bottom: "12%",
        },
        legend: {
          show: true,
          x: "left",
          y: "top",
          padding: [15, 0],
          itemGap: 20,
          icon: "roundRect",
          textStyle: { color: "#fff", fontSize: 14 },
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
              color: "#8DD3FF",
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
              formatter: "{value}%",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "10千伏线路联络率",
            type: "line",
            symbol: "circle",
            symbolSize: 10, //转折点的大小
            itemStyle: {
              normal: {
                borderWidth: 3,
                color: "#00334A ", //图例的颜色
                borderColor: "#FFCC65",
                lineStyle: {
                  color: "#FFCC65", //线的颜色
                },
                label: {
                  show: true,
                  color: "#FFCC65",
                  fontSize: 30,
                  fontFamily: "numFont",
                  // offset: [0, -20],
                },
              },
            },
            // data: [23, 38, 58, 64, 82], //data.values
            data: llydata, //data.values
          },
          {
            name: "N-1通过率",
            type: "line",
            symbol: "circle",
            symbolSize: 10, //转折点的大小
            itemStyle: {
              normal: {
                borderWidth: 3,
                color: "#00334A ", //图例的颜色
                borderColor: "#27EBCD",
                lineStyle: {
                  color: "#27EBCD", //线的颜色
                },
                label: {
                  show: true,
                  color: "#27EBCD",
                  fontSize: 30,
                  fontFamily: "numFont",
                  // offset: [0, -20],
                },
              },
            },
            // data: [45, 68, 80, 96, 99], //data.values
            data: tgydata, //data.values
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#rightBottompBar {
  width: 100%;
  height: 100%;
}
#rightTopLine {
  width: 60%;
  height: 100%;
}
#rightTopPie {
  width: 40%;
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
.chartTitle {
  font-size: 30px;
  font-weight: 400;
  color: #d3eeff;
  letter-spacing: 2px;
}
.charts {
  height: calc(100% - 40px);
  width: 100%;
  position: relative;
  .unit {
    position: absolute;
    top: 40px;
    left: 0;
    font-size: 16px;
  }
}
.gridOverviewRightPart {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  .content {
    // background-color: rgba(0, 11, 32, 0.26);
  }
  .infoMonitor {
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
        padding: 0px 24px 10px 24px;
        align-items: center;
        flex-wrap: wrap;
      }
      #tenkDevelopChart,
      #tenkConnectionChart {
        background-image: url("/image/gridOverview/chart_bg.png");
        background-repeat: no-repeat;
        background-position: left 80%;
        background-size: 95%;
      }
      #tenkDevelopChart {
        background-position: left 80%;
        background-size: 91%;
      }
      .left_chart {
        width: 47%;
        height: 100%;
      }
      .right_chart {
        width: 47%;
        height: 100%;
      }
    }
  }
  .taskMonitor {
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
        padding: 24px;
        align-items: center;
        flex-wrap: wrap;
      }
      .left_chart {
        width: 31%;
      }
      .center_chart {
        width: 31%;
      }
      .right_chart {
        width: 31%;
      }
    }
  }
}
</style>
