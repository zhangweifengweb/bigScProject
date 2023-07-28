<template>
  <div class="rightPart_powerSupplyReliability">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{ name }}</div>
      </div>
      <div class="content">
        <flashAnimation />
        <div class="animate_container">
          <div class="changeBtn">
            <p :class="acitveIndex == 1 ? 'active' : ''" @click="change(1)">
              城市
            </p>
            <p :class="acitveIndex == 2 ? 'active' : ''" @click="change(2)">
              农村
            </p>
          </div>
          <div id="rightTopLine"></div>
        </div>
      </div>
    </div>
    <div class="taskMonitor">
      <div class="leftpart">
        <div class="boxTitle">
          <div class="colorside"></div>
          <div class="title">{{ title1 }}</div>
        </div>
        <div class="content">
          <flashAnimation />
          <div class="animate_container">
            <div id="rightBottomBar"></div>
          </div>
        </div>
      </div>
      <div class="rightpart">
        <div class="boxTitle">
          <div class="colorside"></div>
          <div class="title">{{ title2 }}</div>
        </div>
        <div class="content">
          <flashAnimation />
          <div class="animate_container">
            <div id="rightBottomLine"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import flashAnimation from "@/components/flashAnimation.vue";
import axios from "axios";
export default {
  components: {
    flashAnimation,
  },
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
      this.name = val.targetGroupTitle;
      this.xdata1 = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.csydata1 = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.csydata2 = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.ncydata1 = val.screenTargetPart01Data[2].targetContent.yaxis;
      this.ncydata2 = val.screenTargetPart01Data[3].targetContent.yaxis;
      this.getIndex();
    },
    initData2(val) {
      this.title1 = val.screenTargetPart01Data[0].targetTitle;
      this.title2 = val.screenTargetPart02Data[0].targetTitle;
      this.x1 = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.y1 =
        val.screenTargetPart01Data[0].targetContent.yaxis.map(parseFloat);
      this.x2 = val.screenTargetPart02Data[0].targetContent.xaxis;
      this.y2 = val.screenTargetPart02Data[0].targetContent.yaxis.map(Number);
      // console.log(this.x1,"aaa")
      // console.log(this.y1,"bbb")
      // console.log(this.x2)
      // console.log(this.y2)
      this.rightBottomBar(this.x1, this.y1);
      this.rightBottomLine(this.x2, this.y2);
    },
  },
  data() {
    return {
      //供电可靠率统计分析
      xdata1: [],
      csydata1: [], //城市-当期 y
      csydata2: [], //城市-同期 y
      ncydata1: [], //农村-当期 y
      ncydata2: [], //农村-同期 y
      name: "",
      acitveIndex: 0,
      title1: "",
      title2: "",
      //供电可靠性
      x1: "",
      y1: "",
      //电压合格率
      x2: "",
      y2: "",
    };
  },
  mounted() {
    // this.rightTopLine();
    // this.rightBottomBar();
    // this.rightBottomLine();
  },
  methods: {
    getIndex() {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: this.name },
        })
        .then((res) => {
          if (res.status == 200 && res.data.code == 200) {
            // console.log(res.data.data);
            this.change(res.data.data);
          }
        });
    },
    change(e) {
      this.acitveIndex = e;
      if (e == 1) {
        this.rightTopLine(this.xdata1, this.csydata1, this.csydata2);
      } else {
        this.rightTopLine(this.xdata1, this.ncydata1, this.ncydata2);
      }
    },
    rightTopLine(x, y1, y2) {
      let myChart = this.$echarts.init(document.getElementById("rightTopLine"));
      let arr1 = y1,
        arr2 = y2,
        xAxisArr = x;
      myChart.setOption({
        grid: {
          top: "25%",
          left: "8%",
          right: "5%",
          bottom: "12%",
          // containLabel:true,
        },
        legend: {
          x: "left",
          y: "top",
          padding: [20, 0, 45, 50],
          textStyle: {
            //图例文字的样式
            color: "#fefefe",
            fontSize: 20,
          },
          itemGap: 20,
          icon: "roundRect",
          show: true,
          selectedMode: false,
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
            data: xAxisArr,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 97,
            showMinLabel: false,
            // name: "单位：亿千瓦时",
            // nameLocation: "end",
            // nameTextStyle: {
            //   padding: [0, 0, 30, 0],
            //   fontSize: 16, // 四个数字分别为上右下左与原位置距离
            //   color: "#fff",
            // },
            max: 100,
            splitNumber: 3,
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
              formatter: "{value}%",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "当期",
            type: "bar",
            barWidth: 30,
            // barGap: "-100%",
            z: 9,
            label: {
              show: true,
              color: "#00FFF8",
              fontSize: 20,
              fontFamily: "numFont",
              position: "top",
              offset: [0, -20],
            },
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
                    color: "#00C4EA", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#098BCA", // 100% 处的颜色
                  },
                ],
                false
              ),
            },
            data: arr1,
          },
          {
            name: "同期",
            type: "bar",
            barWidth: 30,
            // barGap: '10%', // Make series be overlap
            // barCateGoryGap: '10%',
            z: 11,
            label: {
              show: true,
              color: "#BF8013",
              fontSize: 20,
              fontFamily: "numFont",
              position: "top",
              offset: [0, -20],
            },
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
                    color: "#E7D428", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#BE7F12", // 100% 处的颜色
                  },
                ],
                false
              ),
            },
            data: arr2,
          },
          {
            //柱子顶部圆片
            name: "",
            silent: true,
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [18, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: "#D59D37",
            },
            symbolPosition: "end",
            data: arr2,
          },
          {
            //柱子底部圆片
            name: "",
            silent: true,
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [18, -10],
            z: 10,
            itemStyle: {
              opacity: 1,
              color: "#BF8013",
            },
            symbolPosition: "end",
            data: [97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
          },
          {
            //柱子顶部圆片
            name: "",
            silent: true,
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [-18, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: "#098CCB",
            },
            symbolPosition: "end",
            data: [97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
          },
          {
            //柱子底部圆片
            name: "",
            silent: true,
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [-18, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: "#098CCB",
            },
            symbolPosition: "end",
            data: arr1,
          },
        ],
      });
    },
    rightBottomBar(x, y) {
      // console.log(this.initData.indicatorsLeftNameValueUnit['配电变压器负载率 TOP5'])
      let myChart = this.$echarts.init(
        document.getElementById("rightBottomBar")
      );
      // let initalData = this.initData.indicatorsLeftNameValueUnit[
      //     "配电变压器负载率 TOP5"
      //   ],
      let xData1 = x,
        yData1 = y;
      // for (let i = 0; i < initalData.length; i++) {
      //   const element = initalData[i];
      //   xData1.push(element.indicatorName.split("/")[1]);
      //   yData1.push(element.indicatorValue.split("/")[1]);
      // }
      let xData = xData1,
        yData = yData1;

      let option = {
        grid: {
          borderWidth: 0,
          top: 40,
          left: 100,
          right: 40,
          bottom: 55,
          textStyle: {
            color: "#D3EEFF",
          },
        },
        title: {
          // text: "配电变压器负载率 TOP 5",
          textStyle: {
            //设置主标题风格
            color: "#D3EEFF", //设置主标题字体颜色
            fontFamily: "PingFang SC",
            fontSize: 22,
          },
          x: 35,
          y: 40,
          align: "left",
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
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ad2ff;'></span> " +
              params[0].name +
              ": " +
              params[0].value +
              "%"
            );
          },
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.5)",
              },
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
              color: "rgba(255,255,255,0.7)",
              fontSize: 18,
            },
            boundaryGap: true, //设置x轴是否从第一位开始
            data: xData,
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 99,
            // name: "(%)",
            max: 100,
            nameLocation: "start",

            nameTextStyle: {
              padding: [-7, 0, 0, -70], // 四个数字分别为上右下左与原位置距离
              color: "rgba(211,238,255,0.8)",
              fontSize: 18,
              fontFamily: "numFont",
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              margin: 30, //移动位置
              color: "rgba(211,238,255,0.8)",
              fontSize: 20,
              fontFamily: "numFont",
              formatter: "{value}%",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "负载",
            type: "bar",
            stack: "总量",
            barMaxWidth: 50,
            barGap: "10%",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFF8",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(56,149,255,0.5)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(28,75,128, 0.32)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            data: yData,
          },
          {
            type: "pictorialBar",
            symbol: "reat",

            symbolSize: [50, 3],
            symbolOffset: [0, 0],
            symbolPosition: "end",
            z: 12,
            color: "#36B4D3",
            data: yData,
          },
        ],
      };

      myChart.setOption(option);
    },
    rightBottomLine(x, y) {
      // console.log(this.initData.indicatorsLeftNameValueUnit['配电变压器负载率 TOP5'])
      let myChart = this.$echarts.init(
        document.getElementById("rightBottomLine")
      );
      // let initalData = this.initData.indicatorsLeftNameValueUnit[
      //     "配电变压器负载率 TOP5"
      //   ],
      let xData1 = x,
        yData1 = y;
      // for (let i = 0; i < initalData.length; i++) {
      //   const element = initalData[i];
      //   xData1.push(element.indicatorName.split("/")[1]);
      //   yData1.push(element.indicatorValue.split("/")[1]);
      // }
      let xData = xData1,
        yData = yData1;

      let option = {
        grid: {
          borderWidth: 0,
          top: 40,
          left: 100,
          right: 40,
          bottom: 55,
          textStyle: {
            color: "#D3EEFF",
          },
        },
        title: {
          // text: "配电变压器负载率 TOP 5",
          textStyle: {
            //设置主标题风格
            color: "#D3EEFF", //设置主标题字体颜色
            fontFamily: "PingFang SC",
            fontSize: 22,
          },
          x: 35,
          y: 40,
          align: "left",
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
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ad2ff;'></span> " +
              params[0].name +
              ": " +
              params[0].value +
              "%"
            );
          },
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.5)",
              },
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
              color: "rgba(255,255,255,0.7)",
              fontSize: 18,
            },
            boundaryGap: false, //设置x轴是否从第一位开始
            data: xData,
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 99.86,
            max: 100,
            // name: "(%)",
            nameLocation: "start",

            nameTextStyle: {
              padding: [-7, 0, 0, -70], // 四个数字分别为上右下左与原位置距离
              color: "rgba(211,238,255,0.8)",
              fontSize: 18,
              fontFamily: "numFont",
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              margin: 30, //移动位置
              color: "rgba(211,238,255,0.8)",
              fontSize: 20,
              fontFamily: "numFont",
              formatter: "{value}%",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "当期",
            type: "line",
            // showAllSymbol:false,
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "rgba(33, 255, 218, 1)",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFF8",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(33, 255, 218, .3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(41, 166, 230,0)",
                    },
                  ],
                  false
                ),
              },
            },

            data: yData,
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.rightPart_powerSupplyReliability {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  .content {
    background-color: rgba(0, 11, 32, 0.26);
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
      }
      #rightTopLine {
        height: 100%;
        width: 100%;
      }
      .changeBtn {
        position: absolute;
        display: flex;
        color: #ceefff;
        font-size: 20px;
        right: 52px;
        top: 0px;
        z-index: 9;
        p {
          width: 100px;
          height: 48px;
          text-align: center;
          padding-top: 13px;
          &:hover {
            cursor: pointer;
          }
        }
        .active {
          background: linear-gradient(
            to top,
            rgba(56, 189, 255, 0.7),
            rgba(56, 189, 255, 0.2),
            rgba(56, 189, 255, 0)
          );
        }
      }
    }
  }
  .taskMonitor {
    display: flex;
    justify-content: space-between;
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
      }
      // padding: 13px 57px 18px 51px;
    }
    .leftpart {
      width: 711px;
      height: 446px;
      #rightBottomBar {
        width: 100%;
        height: 100%;
      }
    }
    .rightpart {
      width: 711px;
      height: 446px;
      #rightBottomLine {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
