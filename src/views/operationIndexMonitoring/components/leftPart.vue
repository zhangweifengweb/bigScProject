<template>
  <div class="gridOverviewkLeftPart">
    <div class="resources">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">缺陷跟踪</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="title2">配变缺陷跟踪</div>
        <div class="charts">
          <div ref="topLeft"></div>
          <div ref="topRight"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title2">线路缺陷跟踪</div>
      <div class="charts">
        <div ref="bottomLeft"></div>
        <div ref="bottomRight"></div>
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
    screen:{
      type: Object,
    },
  },
  data() {
    return {
      yaxis1: [],
      xaxis1: {},
      yaxis2: [],
      xaxis2: {},
      yaxis3: [],
      xaxis3: {},
      yaxis4: [],
      xaxis4: {},
    };
  },
  watch: {
    screen(value) {
      console.log(value);
      value.screenTargetPart01Data.forEach((val) => {
        this.xaxis1 = val.targetContent.xaxis;
        this.yaxis1.push(val.targetContent.yaxis);
      });
      value.screenTargetPart02Data.forEach((val) => {
        this.xaxis2 = val.targetContent.xaxis;
        this.yaxis2.push(val.targetContent.yaxis);
      });
      value.screenTargetPart03Data.forEach((val) => {
        this.xaxis3 = val.targetContent.xaxis;
        this.yaxis3 = val.targetContent.yaxis;
      });
      value.screenTargetPart04Data.forEach((val) => {
        this.xaxis4 = val.targetContent.xaxis;
        this.yaxis4 = val.targetContent.yaxis;
      });
      this.topLeftChart(),
        this.topRightChart(),
        this.bottomLeftChart(),
        this.bottomRightChart();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.topLeftChart(),
        this.topRightChart(),
        this.bottomLeftChart(),
        this.bottomRightChart();
    });
  },
  methods: {
    topLeftChart() {
      let myChart = this.$echarts.init(this.$refs.topLeft);
      let xData = this.xaxis1;
      let data1 = this.yaxis1[0];
      let data2 = this.yaxis1[1];
      let data3 = this.yaxis1[2];
      let data4 = this.yaxis1[3];
      let option = {
        title: {
          text: "单位: 台",
          left: "40px",
          top: "35px",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
            opacity: 0.6,
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
              "台" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1B97C0;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "台" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#775FFF;'></span> " +
              params[2].seriesName +
              ": " +
              params[2].value +
              "台" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE5FFA;'></span> " +
              params[3].seriesName +
              ": " +
              params[3].value +
              "台"
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
            // max: 100,
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
              color: "#CBCBCB",
              fontSize: 18,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "重载",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#5AD167", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(55, 165, 108, 0.18)", // 100% 处的颜色
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
            name: "过载",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#54C3FC", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(84, 195, 252, 0.18)", // 100% 处的颜色
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
            name: "低电压",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#775FFA", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(119, 95, 250, 0.17)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#775FFF",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data3,
          },
          {
            name: "三相不平衡",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#EE5FFA", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(238, 95, 250, 0.18)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#EE5FFA",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data4,
          },
          {
            name: "重载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-22.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#ABFF9E",
            data: data1,
          },
          {
            name: "重载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-22.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(55, 165, 108, 0.18)",
            data: data1,
          },
          {
            name: "过载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-7.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#9BE5FF",
            data: data2,
          },
          {
            name: "过载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-7.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(84, 195, 252, 0.18)",
            data: data2,
          },
          {
            name: "低电压",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [7.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#AEA0FC",
            data: data3,
          },
          {
            name: "低电压",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [7.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(119, 95, 250, 0.17)",
            data: data3,
          },
          {
            name: "三相不平衡",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [22.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#F6AAFD",
            data: data4,
          },
          {
            name: "三相不平衡",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [22.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(238, 95, 250, 0.18)",
            data: data4,
          },
        ],
      };
      myChart.setOption(option);
    },
    topRightChart() {
      let myChart = this.$echarts.init(this.$refs.topRight);
      let xData = this.xaxis2;
      let data1 = this.yaxis2[0];
      let data2 = this.yaxis2[1];
      let data3 = this.yaxis2[2];
      let data4 = this.yaxis2[3];
      let option = {
        title: {
          text: "单位: 台",
          left: "40px",
          top: "35px",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
            opacity: 0.6,
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
              "台" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1B97C0;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "台" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#775FFF;'></span> " +
              params[2].seriesName +
              ": " +
              params[2].value +
              "台" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#EE5FFA;'></span> " +
              params[3].seriesName +
              ": " +
              params[3].value +
              "台"
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
            // max: 10,
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
              color: "#CBCBCB",
              fontSize: 18,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "重载",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#5AD167", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(55, 165, 108, 0.18)", // 100% 处的颜色
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
            name: "过载",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#54C3FC", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(84, 195, 252, 0.18)", // 100% 处的颜色
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
            name: "低电压",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#775FFA", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(119, 95, 250, 0.17)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#775FFF",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data3,
          },
          {
            name: "三相不平衡",
            type: "bar",
            barMaxWidth: 10,
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
                      color: "#EE5FFA", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(238, 95, 250, 0.18)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#EE5FFA",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data4,
          },
          {
            name: "重载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-22.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#ABFF9E",
            data: data1,
          },
          {
            name: "重载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-22.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(55, 165, 108, 0.18)",
            data: data1,
          },
          {
            name: "过载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-7.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#9BE5FF",
            data: data2,
          },
          {
            name: "过载",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [-7.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(84, 195, 252, 0.18)",
            data: data2,
          },
          {
            name: "低电压",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [7.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#AEA0FC",
            data: data3,
          },
          {
            name: "低电压",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [7.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(119, 95, 250, 0.17)",
            data: data3,
          },
          {
            name: "三相不平衡",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [22.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#F6AAFD",
            data: data4,
          },
          {
            name: "三相不平衡",
            type: "pictorialBar",
            // symbol: path,
            symbolSize: [10, 8],
            symbolOffset: [22.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(238, 95, 250, 0.18)",
            data: data4,
          },
        ],
      };
      myChart.setOption(option);
    },
    bottomLeftChart() {
      let myChart = this.$echarts.init(this.$refs.bottomLeft);
      let xData = this.xaxis3;
      let data1 = this.yaxis3;
      let option = {
        title: {
          text: "单位: 条",
          left: "40px",
          top: "0",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
            opacity: 0.6,
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
            // max: 10,
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
              color: "#CBCBCB",
              fontSize: 18,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barMaxWidth: 30,
            // barGap: "50%",
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
                      color: "#27D1D2", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#024A8D", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: [6, -40], //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFF8",
                    fontFamily: "numFont",
                    fontSize: 26,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: "",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [30, 15],
            symbolOffset: [0, -8],
            symbolPosition: "end",
            z: 12,
            color: "#96D9FF",
            data: data1,
          },
          {
            name: "",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [30, 15],
            symbolOffset: [0, 8],
            // symbolPosition: 'end',
            z: 12,
            color: "#02498C",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    bottomRightChart() {
      let myChart = this.$echarts.init(this.$refs.bottomRight);
      let xData = this.xaxis4;
      let data1 = this.yaxis4;
      let option = {
        title: {
          text: "单位: 条",
          left: "40px",
          top: "0",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
            opacity: 0.6,
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
            // max: 10,
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
              color: "#CBCBCB",
              fontSize: 18,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            symbolSize: 10,
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "#50FF7F",
                fontFamily: "numFont",
                fontSize: 26,
              },
            },
            itemStyle: { normal: { color: "#50FF7F" } },
            lineStyle: {
              width: 5,
              color: "#50FF7F",
              shadowBlur: "15",
              shadowColor: "RGBA(80, 255, 105, 0.5)",
              shadowOffsetY: 20,
            },
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
.gridOverviewkLeftPart {
  position: absolute;
  top: 88px;
  left: 48px;
  width: 1458px;
  height: 906px;
  background: url("/image/operationIndexMonitoring/left_bg.png") no-repeat;
  background-position: bottom;
  background-size: 100%;
  // animation: left_bg_animation 1s linear;

  .resources {
    height: 497px;
    .content {
      height: 409px;
      margin-top: -10px;
      background: RGBA(7, 84, 126, 0.2);
      overflow: hidden;
    }
  }
  .title2 {
    width: 100%;
    height: 37px;
    font-size: 26px;
    text-shadow: 0px 2px 0px rgba(98, 140, 255, 0.6);
    color: #76fffa;
    margin-left: 31px;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
    padding-left: 17px;
    &::before {
      content: " ";
      display: block;
      width: 8px;
      height: 8px;
      background: #55ebfe;
      opacity: 0.5;
      position: absolute;
      top: 15px;
      left: 0;
    }
    &::after {
      content: " ";
      display: block;
      width: 1380px;
      height: 0px;
      border: 4px solid #4bffff;
      border-left: none;
      border-right: none;
      border-bottom: none;
      opacity: 0.3;
      position: absolute;
      top: 17px;
      left: 8px;
    }
  }
  .charts {
    width: 100%;
    height: calc(100% - 77px);
    display: flex;
    div {
      width: 50%;
      height: 100%;
    }
  }
  .bottom {
    width: 100%;
    height: 409px;
    background: RGBA(7, 84, 126, 0.2);
    overflow: hidden;
  }
}
</style>