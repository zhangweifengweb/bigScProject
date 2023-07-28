<template>
  <div class="greendoublecarbonkLeftPart">
    <div class="zhuangjnum">
      <div class="boxTitle">
        <div class="title">总装机容量</div>
      </div>
      <div class="content">
        <div id="left_top_Chart" class="linecharts"></div>
      </div>
    </div>
    <div class="bingwangnum">
      <div class="boxTitle">
        <div class="title">并网数量</div>
      </div>
      <div class="content">
        <!-- <div id="left_center_Chart" class="charts"></div> -->
        <div ref="bingwangnumchart" class="charts"></div>
      </div>
    </div>
    <div class="bingwangfenbu">
      <div class="boxTitle">
        <div class="title">并网容量分布</div>
      </div>
      <div class="content">
        <div ref="bingwangfenbuchart" class="charts"></div>
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
        return {
          timer: null,
        };
      },
    },
  },
  data() {
    return {
      swiperOption: "",
    };
  },
  watch: {
    initData(val) {
      // console.log("左边数据", val);
      //总装机容量
      this.zzjXdata = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.zzjYdata = val.screenTargetPart01Data[0].targetContent.yaxis;
      //并网数量-220v
      this.bwnumX = val.screenTargetPart01Data[1].targetContent.xaxis;
      this.bwnumY1 = val.screenTargetPart01Data[1].targetContent.yaxis;
      // 380v
      this.bwnumY2 = val.screenTargetPart01Data[2].targetContent.yaxis;
      // 10kv
      this.bwnumY3 = val.screenTargetPart01Data[3].targetContent.yaxis;
      let bingwangdata = {
        datax: this.bwnumX,
        data1: this.bwnumY1,
        data2: this.bwnumY2,
        data3: this.bwnumY3,
      };
      this.bwrnumX = val.screenTargetPart01Data[4].targetContent.xaxis;
      this.bwrnumY1 = val.screenTargetPart01Data[4].targetContent.yaxis;
      this.bwrnumY2 = val.screenTargetPart01Data[5].targetContent.yaxis;
      this.bwrnumY3 = val.screenTargetPart01Data[6].targetContent.yaxis;
      let bingwangrongdata = {
        datax: this.bwrnumX,
        data1: this.bwrnumY1,
        data2: this.bwrnumY2,
        data3: this.bwrnumY3,
      };
      this.tiemr = setTimeout(() => {
        // this.lefttopchart();

        this.lefttopchart(this.zzjXdata, this.zzjYdata);
        this.leftcenterchart("bingwangnumchart", "单位：座", bingwangdata);
        this.leftcenterchart(
          "bingwangfenbuchart",
          "单位：兆瓦",
          bingwangrongdata
        );
      }, 2000);
    },
  },
  mounted() {},
  beforeDestroy() {
    clearTimeout(this.tiemr);
    this.tiemr = null;
  },
  methods: {
    lefttopchart(xdata, ydata) {
      let myChart = this.$echarts.init(
        document.getElementById("left_top_Chart")
      );
      myChart.setOption({
        backgroundColor: "transparent",
        grid: {
          top: "26%",
          left: "7%",
          right: "7%",
          bottom: "20%",
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
              show: true,
            },
            axisLabel: {
              show: true,
              color: "#D3EEFF",
              fontSize: 22,
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
            // data: ["2016年", "2017年", "2018年", "2019年", "2020年", "2021年"],
            data: xdata,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            name: "单位：兆瓦",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 110, 10, 0],
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
            name: "数量",
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
            // data: [16, 17, 20, 18, 26, 11], //data.values
            data: ydata, //data.values
          },
        ],
      });
    },

    leftcenterchart(chart, DW, adata) {
      let _chart = this.$refs[chart];
      let myChart = this.$echarts.init(_chart);
      let that = this;
      // let data1 = [20, 40, 15, 20, 18];
      // let data2 = [20, 25, 15, 50, 20];
      // let data3 = [100, 25, 18, 25, 30];
      let data1 = adata.data1.map(Number);
      let data2 = adata.data2.map(Number);
      let data3 = adata.data3.map(Number);
      let data4 = [];
      let data5 = [];
      for (let i = 0; i < data1.length; i++) {
        data4.push(data1[i] + data2[i]), data5.push(data4[i] + data3[i]);
      }
      myChart.setOption({
        legend: {
          itemWidth: 20,
          itemHeight: 12,
          right: "1%",
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 18,
          },
          data: ["220V", "380V", "10KV"],
        },
        grid: {
          top: "26%",
          left: "7%",
          right: "7%",
          bottom: "20%",
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
            },
            axisLabel: {
              show: true,
              fontSize: 20,
              color: "#fff",
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
            // data: ["原州区", "西吉区", "彭阳县", "隆德县", "泾源县"],
            data: adata.datax,
          },
        ],
        yAxis: {
          type: "value",
          min: 0,
          name: DW,
          nameLocation: "end",
          nameTextStyle: {
            padding: [10, 70, 20, 0],
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
        series: [
          {
            name: "220V",
            type: "bar",
            stack: "作业风险",
            barWidth: 36, //柱图宽度
            data: data1,
            itemStyle: {
              //   normal: { color: "#128F1E" },
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
                      color: "#28E7A0", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#118A16", // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },
            label: {
              show: true,
              position: "right",
              fontSize: 30,
              color: "#128F1E",
              fontFamily: "numFont",
              formatter: function (params, index) {
                return params.value;
              },
            },
          },
          {
            name: "380V",
            type: "bar",
            stack: "作业风险",
            barWidth: 36, //柱图宽度
            data: data2,
            itemStyle: {
              //   normal: { color: "#128F1E" },
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
                      color: "#E7D428", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#BE7F12", // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },
            label: {
              show: true,
              position: "left",
              fontSize: 30,
              color: "#CB9919",
              fontFamily: "numFont",
              formatter: function (params, index) {
                return params.value;
              },
            },
          },
          {
            name: "10KV",
            type: "bar",
            stack: "作业风险",
            barWidth: 36, //柱图宽度
            data: data3,
            itemStyle: {
              //   normal: { color: "#128F1E" },
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
                      color: "#00C4EA", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#098BCA", // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },
            label: {
              show: true,
              position: "right",
              fontSize: 30,
              color: "#0796D0",
              fontFamily: "numFont",
              formatter: function (params, index) {
                return params.value;
              },
            },
            symbolSize: [40, 10],
            symbolOffset: [0, -5],
            z: 16,
          },
          {
            //柱子底部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [36, 15],
            symbolOffset: [0, 5],
            z: 10,
            itemStyle: {
              opacity: 1,
              color: "#128F1E",
            },
            data: [1, 1, 1, 1, 1, 1],
          },
          {
            //柱子底部圆片2
            name: "",
            type: "pictorialBar",
            symbolSize: [36, 15],
            symbolOffset: [0, -5],
            z: 10,
            itemStyle: {
              opacity: 1,
              color: "#E7D428",
            },
            symbolPosition: "end",
            data: data1,
          },
          {
            //柱子底部圆片3
            name: "",
            type: "pictorialBar",
            symbolSize: [36, 15],
            symbolOffset: [0, -5],
            z: 99,
            itemStyle: {
              opacity: 1,
              color: "#00C4EA",
            },
            symbolPosition: "end",
            data: data4,
          },
          {
            //柱子顶部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [36, 15],
            symbolOffset: [0, -9],
            z: 99,
            itemStyle: {
              opacity: 1,
              color: "#0087C9",
            },
            label: {
              show: true,
              color: "#00FFF8",
              fontSize: 30,
              fontFamily: "numFont",
              position: "top",
              offset: [0, -10],
              formatter: function (params) {
                return params.value;
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
            data: data5,
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes right_bg_animation {
  0% {
    background-position: 180% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}
@keyframes content_width_animation {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
.greendoublecarbonkLeftPart {
  position: absolute;
  top: 48px;
  left: 48px;
  width: 1458px;
  height: 992px;
  background: url("/image/greendoublecarbon/leftbg.png") no-repeat;
  animation: right_bg_animation 1s;
  .charts {
    height: calc(100% - 20px);
    width: 100%;
  }
  .linecharts {
    height: calc(100% - 10px);
    width: 100%;
  }
  .zhuangjnum {
    .boxTitle {
    }
    .content {
      animation: content_width_animation 1s;
      width: 100%;
      background: rgba(22, 43, 76, 0.7);
      height: 204px;
    }
  }
  .bingwangnum {
    margin: 20px 0;
    .content {
      animation: content_width_animation 1s;
      width: 100%;
      background: rgba(22, 43, 76, 0.7);
      height: 240px;
    }
  }
  .bingwangfenbu {
    .content {
      animation: content_width_animation 1s;
      width: 100%;
      background: rgba(22, 43, 76, 0.7);
      height: 240px;
    }
  }
}
</style>
