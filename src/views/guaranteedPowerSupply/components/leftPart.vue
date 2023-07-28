<template>
  <div class="guaranteedPowerSupplyLeftPart">
    <div class="box">
      <div class="title">
        <span>春节期间用电量（亿千瓦时）</span>
      </div>
      <div class="content" id="chart1"></div>
    </div>
    <div class="box box2">
      <div class="title">
        <span>春节期间用电负荷（万千瓦时）</span>
      </div>
      <div class="content" id="chart2"></div>
    </div>
    <div class="box box3">
      <div class="title">
        <span>当日重载统计（件）</span>
      </div>
      <div class="content" id="chart3"></div>
    </div>
    <div class="box box4">
      <div class="title">
        <span>当日报修工单（件）</span>
      </div>
      <div class="content" id="chart4"></div>
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
    return {};
  },
  watch: {
    initData1(val) {
      //春节期间用电量
      //系列1
      this.xlXIdata = val.screenTargetPart01Data.targetContent.xaxis;
      this.xlYIdata = val.screenTargetPart01Data.targetContent.yaxis;
      //系列2
      this.xlXIIdata = val.screenTargetPart02Data.targetContent.xaxis;
      this.xlYIIdata = val.screenTargetPart02Data.targetContent.yaxis;
      this.chart1(this.xlXIdata, this.xlYIdata, this.xlYIIdata);
      //春节期间负荷
      this.fhXdata = val.screenTargetPart03Data.targetContent.xaxis;
      this.fhYdata = val.screenTargetPart03Data.targetContent.yaxis;
      this.chart2(this.fhXdata, this.fhYdata);
    },
    initData2(val) {
      // console.log("左边的数据", val);
      //重载统计
      //配变
      this.zzXdata = val.screenTargetPart01Data.targetContent.xaxis;
      this.zzYdata = val.screenTargetPart01Data.targetContent.yaxis;
      //线路
      this.xlYdata = val.screenTargetPart02Data.targetContent.yaxis;
      this.chart3(this.zzXdata, this.zzYdata, this.xlYdata);
      //当日保修工单
      this.bxXdata = val.screenTargetPart03Data.targetContent.xaxis;
      this.bxYdata = val.screenTargetPart03Data.targetContent.yaxis;
      this.chart4(this.bxXdata, this.bxYdata);
    },
  },
  mounted() {},
  methods: {
    chart1(xdata, ydata1, ydata2) {
      let myChart = this.$echarts.init(document.getElementById("chart1"));
      let xData = xdata;
      // let data1 = [4, 5, 5, 5, 8, 4, 7, 4],
      //   data2 = [3, 4, 4, 4, 5, 3, 5, 3];
      let data1 = ydata1,
        data2 = ydata2;
      let option = {
        title: {
          // text: "单位: 户",
          // left: 40,
          // top: "35px",
          // textStyle: {
          //   color: "#fff",
          //   fontSize: 16,
          //   fontWeight: 100,
          // },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 60,
          bottom: 50,
          right: 30,
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
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#54FD69;'></span> " +
              params[0].seriesName +
              ": " +
              params[0].value +
              "亿千瓦时" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6AFBFF;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "亿千瓦时"
            );
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 12,
          left: 25,
          top: "10px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
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
            max: 10,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, 0.36)",
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
              color: "#fff",
              fontSize: 14,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "系列1",
            type: "bar",
            barMaxWidth: 15,
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
                      color: "rgba(140, 236, 255, 0.88)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(66, 193, 255, 0.57)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#91D5FF",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: "系列2",
            type: "bar",
            barMaxWidth: 15,
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
                      color: "rgba(231, 212, 40, 0.8)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(190, 127, 18, 0.8)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#F6FF8D",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: "系列2",
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [15, 10],
            symbolOffset: [11.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "rgba(213, 157, 55, 1)",
            data: data2,
          },
          {
            name: "系列1",
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [15, 10],
            symbolOffset: [-11.5, -5],
            symbolPosition: "end",
            z: 12,
            color: "#0087C9",
            data: data1,
          },
          {
            name: "系列2",
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [15, 10],
            symbolOffset: [11.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "rgba(191, 128, 19, 0.8)",
            data: data2,
          },
          {
            name: "系列1",
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [15, 10],
            symbolOffset: [-11.5, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#098CCB",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    chart2(xdata, ydata) {
      let myChart = this.$echarts.init(document.getElementById("chart2"));
      let xData = xdata;
      // let data1 = [305, 295, 298, 285, 280, 290, 278, 282];
      let data1 = ydata;
      let option = {
        title: {
          // text: "单位: 条",
          // left: "40px",
          // top: "0",
          // textStyle: {
          //   color: "#fff",
          //   fontSize: 16,
          //   fontWeight: 400,
          //   opacity: 0.6,
          // },
        },
        grid: {
          borderWidth: 0,
          top: 40,
          left: 60,
          bottom: 50,
          right: 30,
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
            min: 270,
            max: 320,
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
            symbol: "circle",
            symbolSize: 15,
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "rgba(255, 213, 51, 1)",
                fontFamily: "numFont",
                fontSize: 26,
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(62, 44, 0, 1)",
                borderColor: "rgba(255, 213, 51, 1)",
                borderWidth: 4,
              },
            },
            lineStyle: {
              width: 5,
              color: "rgba(255, 213, 51, 1)",
              shadowBlur: "15",
              shadowColor: "rgba(255, 213, 51, 0.5)",
              shadowOffsetY: 20,
            },
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    chart3(hxdata, ydata1, ydata2) {
      let myChart = this.$echarts.init(document.getElementById("chart3"));
      // let xdata = ["区县01", "区县02", "区县03", "区县04", "区县05", "区县06"];
      // let data1 = [3.8, 4, 6, 7.4, 6.2, 9.1];
      // let data2 = [2, 7.9, 4.1, 2.5, 4.3, 4];
      let xdata = hxdata;
      let data1 = ydata1;
      let data2 = ydata2;
      myChart.setOption({
        xAxis: {
          type: "category",
          data: xdata,
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: "20px",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            // splitNumber: 3,
            mix: 0,
            max: 10,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, 0.36)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#A2ABB7",
                fontSize: "20px",
              },
            },
          },
        ],
        grid: {
          borderWidth: 0,
          top: 70,
          left: 60,
          bottom: 50,
          right: 30,
          textStyle: {
            color: "#D3EEFF",
          },
        },
        // title: {
        //   text: "单位: 天",
        //   left: 30,
        //   top: 50,
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 16,
        //     fontWeight: 400,
        //   },
        // },
        legend: {
          itemWidth: 20,
          itemHeight: 12,
          icon: "roundRect",
          left: 25,
          top: "10px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
          },
          // selectedMode: false,
        },
        series: [
          {
            name: "配变",
            data: data1,
            type: "line",
            // smooth: true,
            symbolSize: 0,
            lineStyle: {
              color: "#6CE0FF",
              width: 5,
            },
            color: "#6CE0FF", //图例的颜色
            label: {
              show: true,
              position: "top",
              distance: 25,
              textStyle: {
                color: "#3AFFDE",
                fontFamily: "numFont",
                fontSize: "30px",
              },
            },
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.5,
                      color: "#343230", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#5A0A0E", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
          },
          {
            name: "线路",
            data: data2,
            type: "line",
            // smooth: true,
            symbolSize: 0,
            lineStyle: {
              color: "#CCBA16",
              width: 5,
            },
            color: "#CCBA16", //图例的颜色
            label: {
              show: true,
              position: "top",
              distance: 25,
              textStyle: {
                color: "#FFFF19",
                fontFamily: "numFont",
                fontSize: "30px",
              },
            },
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.5,
                      color: "#68300F", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#5A0A0E", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
          },
        ],
      });
    },
    chart4(xdata, ydata) {
      let myChart = this.$echarts.init(document.getElementById("chart4"));
      // let xData = ["区县01", "区县02", "区县03", "区县04", "区县05", "区县06"];
      // let data1 = [10, 15, 12, 12, 17, 11];
      let xData = xdata;
      let data1 = ydata;
      let option = {
        title: {
          // text: "单位: 条",
          // left: "40px",
          // top: "0",
          // textStyle: {
          //   color: "#fff",
          //   fontSize: 16,
          //   fontWeight: 400,
          //   opacity: 0.6,
          // },
        },
        grid: {
          borderWidth: 0,
          top: 40,
          left: 60,
          bottom: 50,
          right: 30,
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
            max: 25,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, 0.36)",
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
            name: "系列1",
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
                      color: "#E7D428", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#BE7F12", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "rgba(255, 243, 65, 1)",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: "系列1",
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [30, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 12,
            color: "#D59D37",
            data: data1,
          },
          {
            name: "系列1",
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [30, 10],
            symbolOffset: [0, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#BF8013",
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
@keyframes myAnimation2 {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -1800px 0px;
  }
  1.61% {
    background-position: 0px -88px;
  }
  2.42% {
    background-position: -1800px -88px;
  }
  3.23% {
    background-position: 0px -176px;
  }
  4.03% {
    background-position: -1800px -176px;
  }
  4.84% {
    background-position: 0px -264px;
  }
  5.65% {
    background-position: -1800px -264px;
  }
  6.45% {
    background-position: 0px -352px;
  }
  7.26% {
    background-position: -1800px -352px;
  }
  8.06% {
    background-position: 0px -440px;
  }
  8.87% {
    background-position: -1800px -440px;
  }
  9.68% {
    background-position: 0px -528px;
  }
  10.48% {
    background-position: -1800px -528px;
  }
  11.29% {
    background-position: 0px -616px;
  }
  12.10% {
    background-position: -1800px -616px;
  }
  12.90% {
    background-position: 0px -704px;
  }
  13.71% {
    background-position: -1800px -704px;
  }
  14.52% {
    background-position: 0px -792px;
  }
  15.32% {
    background-position: -1800px -792px;
  }
  16.13% {
    background-position: 0px -880px;
  }
  16.94% {
    background-position: -1800px -880px;
  }
  17.74% {
    background-position: 0px -968px;
  }
  18.55% {
    background-position: -1800px -968px;
  }
  19.35% {
    background-position: 0px -1056px;
  }
  20.16% {
    background-position: -1800px -1056px;
  }
  20.97% {
    background-position: 0px -1144px;
  }
  21.77% {
    background-position: -1800px -1144px;
  }
  22.58% {
    background-position: 0px -1232px;
  }
  23.39% {
    background-position: -1800px -1232px;
  }
  24.19% {
    background-position: 0px -1320px;
  }
  25.00% {
    background-position: -1800px -1320px;
  }
  25.81% {
    background-position: 0px -1408px;
  }
  26.61% {
    background-position: -1800px -1408px;
  }
  27.42% {
    background-position: 0px -1496px;
  }
  28.23% {
    background-position: -1800px -1496px;
  }
  29.03% {
    background-position: 0px -1584px;
  }
  29.84% {
    background-position: -1800px -1584px;
  }
  30.65% {
    background-position: 0px -1672px;
  }
  31.45% {
    background-position: -1800px -1672px;
  }
  32.26% {
    background-position: 0px -1760px;
  }
  33.06% {
    background-position: -1800px -1760px;
  }
  33.87% {
    background-position: 0px -1848px;
  }
  34.68% {
    background-position: -1800px -1848px;
  }
  35.48% {
    background-position: 0px -1936px;
  }
  36.29% {
    background-position: -1800px -1936px;
  }
  37.10% {
    background-position: 0px -2024px;
  }
  37.90% {
    background-position: -1800px -2024px;
  }
  38.71% {
    background-position: 0px -2112px;
  }
  39.52% {
    background-position: -1800px -2112px;
  }
  40.32% {
    background-position: 0px -2200px;
  }
  41.13% {
    background-position: -1800px -2200px;
  }
  41.94% {
    background-position: 0px -2288px;
  }
  42.74% {
    background-position: -1800px -2288px;
  }
  43.55% {
    background-position: 0px -2376px;
  }
  44.35% {
    background-position: -1800px -2376px;
  }
  45.16% {
    background-position: 0px -2464px;
  }
  45.97% {
    background-position: -1800px -2464px;
  }
  46.77% {
    background-position: 0px -2552px;
  }
  47.58% {
    background-position: -1800px -2552px;
  }
  48.39% {
    background-position: 0px -2640px;
  }
  49.19% {
    background-position: -1800px -2640px;
  }
  50.00% {
    background-position: 0px -2728px;
  }
  50.81% {
    background-position: -1800px -2728px;
  }
  51.61% {
    background-position: 0px -2816px;
  }
  52.42% {
    background-position: -1800px -2816px;
  }
  53.23% {
    background-position: 0px -2904px;
  }
  54.03% {
    background-position: -1800px -2904px;
  }
  54.84% {
    background-position: 0px -2992px;
  }
  55.65% {
    background-position: -1800px -2992px;
  }
  56.45% {
    background-position: 0px -3080px;
  }
  57.26% {
    background-position: -1800px -3080px;
  }
  58.06% {
    background-position: 0px -3168px;
  }
  58.87% {
    background-position: -1800px -3168px;
  }
  59.68% {
    background-position: 0px -3256px;
  }
  60.48% {
    background-position: -1800px -3256px;
  }
  61.29% {
    background-position: 0px -3344px;
  }
  62.10% {
    background-position: -1800px -3344px;
  }
  62.90% {
    background-position: 0px -3432px;
  }
  63.71% {
    background-position: -1800px -3432px;
  }
  64.52% {
    background-position: 0px -3520px;
  }
  65.32% {
    background-position: -1800px -3520px;
  }
  66.13% {
    background-position: 0px -3608px;
  }
  66.94% {
    background-position: -1800px -3608px;
  }
  67.74% {
    background-position: 0px -3696px;
  }
  68.55% {
    background-position: -1800px -3696px;
  }
  69.35% {
    background-position: 0px -3784px;
  }
  70.16% {
    background-position: -1800px -3784px;
  }
  70.97% {
    background-position: 0px -3872px;
  }
  71.77% {
    background-position: -1800px -3872px;
  }
  72.58% {
    background-position: 0px -3960px;
  }
  73.39% {
    background-position: -1800px -3960px;
  }
  74.19% {
    background-position: 0px -4048px;
  }
  75.00% {
    background-position: -1800px -4048px;
  }
  75.81% {
    background-position: 0px -4136px;
  }
  76.61% {
    background-position: -1800px -4136px;
  }
  77.42% {
    background-position: 0px -4224px;
  }
  78.23% {
    background-position: -1800px -4224px;
  }
  79.03% {
    background-position: 0px -4312px;
  }
  79.84% {
    background-position: -1800px -4312px;
  }
  80.65% {
    background-position: 0px -4400px;
  }
  81.45% {
    background-position: -1800px -4400px;
  }
  82.26% {
    background-position: 0px -4488px;
  }
  83.06% {
    background-position: -1800px -4488px;
  }
  83.87% {
    background-position: 0px -4576px;
  }
  84.68% {
    background-position: -1800px -4576px;
  }
  85.48% {
    background-position: 0px -4664px;
  }
  86.29% {
    background-position: -1800px -4664px;
  }
  87.10% {
    background-position: 0px -4752px;
  }
  87.90% {
    background-position: -1800px -4752px;
  }
  88.71% {
    background-position: 0px -4840px;
  }
  89.52% {
    background-position: -1800px -4840px;
  }
  90.32% {
    background-position: 0px -4928px;
  }
  91.13% {
    background-position: -1800px -4928px;
  }
  91.94% {
    background-position: 0px -5016px;
  }
  92.74% {
    background-position: -1800px -5016px;
  }
  93.55% {
    background-position: 0px -5104px;
  }
  94.35% {
    background-position: -1800px -5104px;
  }
  95.16% {
    background-position: 0px -5192px;
  }
  95.97% {
    background-position: -1800px -5192px;
  }
  96.77% {
    background-position: 0px -5280px;
  }
  97.58% {
    background-position: -1800px -5280px;
  }
  98.39% {
    background-position: 0px -5368px;
  }
  99.19% {
    background-position: -1800px -5368px;
  }
  100.00% {
    background-position: 0px -5456px;
  }
}

.guaranteedPowerSupplyLeftPart {
  position: absolute;
  top: 88px;
  left: 48px;
  width: 1738px;
  display: flex;
  flex-wrap: wrap;
  .box {
    width: 849px;
    height: 460px;
    // background: url("/image/guaranteedPowerSupply/left_box.png") no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    // overflow: hidden;
    .title {
      width: 100%;
      height: 88px;
      // margin-top: 12px;
      line-height: 100px;
      background: url("/image/guaranteedPowerSupply/head_bg.png") no-repeat;
      // animation: myAnimation2 5s steps(1) infinite;
      span {
        font-size: 25px;
        font-weight: bold;
        color: #fff341;
        margin-left: 80px;
      }
    }
    .content {
      width: 100%;
      height: 369px;
      background: linear-gradient(
        132deg,
        rgba(93, 5, 0, 0.7) 0%,
        rgba(30, 3, 0, 0.21) 100%
      );
    }
  }
  .box2 {
    margin-left: 40px;
  }
  .box3,
  .box4 {
    margin-top: 40px;
  }
  .box4 {
    margin-left: 40px;
  }
}
</style>
