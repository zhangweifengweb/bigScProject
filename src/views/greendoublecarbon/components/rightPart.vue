<template>
  <div class="greendoublecarbonRightPart">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="title">各月充电桩及煤改电统计</div>
      </div>
      <div class="content">
        <div id="TopChart" class="charts"></div>
      </div>
    </div>
    <div class="taskMonitor">
      <div class="boxTitle">
        <div class="title">各地区充电桩及煤改电统计</div>
        <div class="timechose">
          <p @click="bgcolor(1)" :class="a == 1 ? 'bg' : ''">月</p>
          <p @click="bgcolor(2)" :class="a == 2 ? 'bg' : ''">季</p>
          <p @click="bgcolor(3)" :class="a == 3 ? 'bg' : ''">年</p>
        </div>
      </div>
      <div class="content">
        <div id="BottomChart" class="charts"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    initData1: {
      type: Object,
      default() {
        return {
          tiemr: null,
        };
      },
    },
    initData2: {
      type: Object,
      default() {
        return {
          tiemr: null,
        };
      },
    },
  },
  data() {
    return {
      bg: "",
      a: 1,
      titleName: "",
      Xdata: [],
      ycydata: [],
      ymydata: [],

      jcydata: [],
      jmydata: [],

      ncydata: [],
      nmydata: [],
    };
  },
  watch: {
    initData1(val) {
      //充电桩数据
      this.cdzXdata = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.cdzYdata = val.screenTargetPart01Data[0].targetContent.yaxis;
      //煤改电数据
      this.mgdYdata = val.screenTargetPart01Data[1].targetContent.yaxis;
      let cdalldata = {
        datax: this.cdzXdata,
        data1: this.cdzYdata,
        data2: this.mgdYdata,
      };

      this.tiemr = setTimeout(() => {
        this.rightTop(cdalldata);
      }, 2000);
    },
    initData2(val) {
      // console.log("右边数据", val);
      this.Xdata = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.ycydata = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.ymydata = val.screenTargetPart01Data[1].targetContent.yaxis;

      this.jcydata = val.screenTargetPart01Data[2].targetContent.yaxis;
      this.jmydata = val.screenTargetPart01Data[3].targetContent.yaxis;

      this.ncydata = val.screenTargetPart01Data[4].targetContent.yaxis;
      this.nmydata = val.screenTargetPart01Data[5].targetContent.yaxis;
      this.titleName = val.targetGroupTitle;

      this.tiemr = setTimeout(() => {
        this.getIndex(this.titname);
      }, 2000);
    },
  },
  mounted() {
    // this.$nextTick(() => {});
  },
  beforeDestroy() {
    clearTimeout(this.tiemr);
    this.tiemr = null;
  },
  methods: {
    getIndex() {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: this.titleName },
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            // console.log("看看", data.data[0]);
            this.a = data.data;
          }
          this.bgcolor(this.a);
        });
    },
    bgcolor(val) {
      this.a = val;
      if (val == 1) {
        this.rightBottom(this.Xdata, this.ycydata, this.ymydata);
      } else if (val == 2) {
        this.rightBottom(this.Xdata, this.jcydata, this.jmydata);
      } else {
        this.rightBottom(this.Xdata, this.ncydata, this.nmydata);
      }
    },
    rightTop(val) {
      let myChart = this.$echarts.init(document.getElementById("TopChart"));
      myChart.setOption({
        backgroundColor: "transparent",
        legend: {
          itemWidth: 20,
          itemHeight: 12,
          left: "1%",
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 18,
          },
          data: ["充电桩", "煤改电"],
        },
        grid: {
          top: "20%",
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
            // data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
            data: val.datax,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            name: "单位：亿瓦时",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 40, 10, 0],
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
            name: "充电桩",
            type: "line",
            symbol: "circle",
            symbolSize: 10, //转折点的大小
            itemStyle: {
              borderWidth: 1,
              normal: {
                color: "#4f91ff ", //图例的颜色
                borderColor: "#2BB2F8",
                lineStyle: {
                  color: "#66fbf7", //线的颜色
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
            // data: [16, 17, 20, 18, 26, 11, 55], //data.values
            data: val.data1, //data.values
          },
          {
            name: "煤改电",
            type: "line",
            symbol: "circle",
            symbolSize: 10, //转折点的大小
            itemStyle: {
              borderWidth: 1,
              normal: {
                color: "#f5ff92 ", //图例的颜色
                borderColor: "#2BB2F8",
                lineStyle: {
                  color: "#f3fe73", //线的颜色
                },
                label: {
                  show: true,
                  color: "#f5ff92",
                  fontSize: 30,
                  fontFamily: "numFont",
                  offset: [0, -20],
                },
              },
            },
            // data: [11, 14, 70, 20, 26, 28, 44], //data.values
            data: val.data2, //data.values
          },
        ],
      });
    },
    rightBottom(xdata, cdata, mdata) {
      let myChart = this.$echarts.init(document.getElementById("BottomChart"));
      // let xData = ["西吉县", "三营", "原州区", "隆德县", "泾源县", "彭阳县"];
      // let data1 = [40, 20, 30, 48, 25, 40],
      //   data2 = [25, 30, 25, 25, 25, 25];
      let xData = xdata;
      let data1 = cdata,
        data2 = mdata;
      myChart.setOption({
        // title: {
        //   text: "单位: 分钟",
        //   left: "0px",
        //   top: "35px",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 14,
        //     fontWeight: 100,
        //   },
        // },
        grid: {
          top: "22%",
          left: "7%",
          right: "7%",
          bottom: "20%",
        },
        //backgroundColor: "#344b58",
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow",
        //     textStyle: {
        //       color: "#fff",
        //     },
        //   },
        //   //鼠标移上去显示的图例样式调整
        //   formatter: function(params) {
        //     return (
        //       params[0].name +
        //       "<br>" +
        //       "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ad2ff;'></span> " +
        //       params[0].seriesName +
        //       ": " +
        //       params[0].value +
        //       "分钟" +
        //       "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F6FF8D;'></span> " +
        //       params[1].seriesName +
        //       ": " +
        //       params[1].value +
        //       "分钟"
        //     );
        //   },
        // },
        // legend: {
        //   show: true,
        //   x: "left",
        //   y: "top",
        //   padding: [20, 20,0,0],
        //   itemGap: 40,
        //   textStyle: { color: "#D3EEFF", fontSize: 20 },
        // },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          left: "0",
          top: "10px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
          },
          // data: ["三级作业风险", "四级作业风险", "五级作业风险"],
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
            name: "单位：亿瓦时",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 40, 10, 0],
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
            name: "充电桩",
            type: "bar",
            barMaxWidth: 24,
            barGap: "50%",
            itemStyle: {
              normal: {
                color: "#4398d2",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#70ffff",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },
            data: data1,
          },
          {
            name: "煤改电",
            type: "bar",
            barMaxWidth: 24,
            barGap: "50%",
            itemStyle: {
              normal: {
                color: "#ccac13",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#ffff8b",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },
            data: data2,
          },
          {
            name: "煤改电",
            type: "pictorialBar",
            symbolSize: [24, 10],
            symbolOffset: [18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#ECD179",
            data: data2,
          },
          {
            name: "充电桩",
            type: "pictorialBar",
            symbolSize: [24, 10],
            symbolOffset: [-18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#9CDCFF",
            data: data1,
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
    background-position: -100% 0%;
  }
  100% {
    background-position: 100% 0%;
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
@keyframes content_opacity_animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.charts {
  // height: calc(100% - 20px);
  height: 100%;
  width: 100%;
  position: relative;
}
.bg {
  background: linear-gradient(
    180deg,
    rgba(56, 189, 255, 0) 0%,
    rgba(56, 189, 255, 0.2) 82%,
    rgba(56, 189, 255, 0.7) 100%
  );
  opacity: 1;
}
.greendoublecarbonRightPart {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  background: url("/image/greendoublecarbon/rightbg.png") no-repeat;
  background-position: 100% 0%;
  // background-size: 100% ;
  animation: right_bg_animation 1s;
  .infoMonitor {
    margin-bottom: 20px;
    .content {
      animation: content_width_animation 1s;
      height: 386px;
      background: rgba(22, 43, 76, 0.7);
    }
  }
  .taskMonitor {
    .boxTitle {
      position: relative;
      .timechose {
        animation: 1s content_opacity_animation 1s backwards;
        position: absolute;
        right: 5%;
        top: 30%;
        display: flex;
        justify-content: left;
        p {
          font-size: 34px;
          padding: 0 20px;
          &:nth-of-type(2) {
            margin: 0 20px;
          }
        }
      }
    }
    .content {
      height: 386px;
      background: rgba(22, 43, 76, 0.7);
      animation: content_width_animation 1s;
    }
  }
}
</style>
