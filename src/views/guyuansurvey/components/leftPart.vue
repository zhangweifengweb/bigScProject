<template>
  <div class="guyuansurveyLeftPart">
    <div class="gdpnum">
      <div class="boxTitle">
        <div class="title">固原市GDP增长趋势</div>
        <div class="timechose">
          <p @click="bgcolor(1)" :class="a == 1 ? 'bg' : ''">月</p>
          <p @click="bgcolor(2)" :class="a == 2 ? 'bg' : ''">季</p>
          <p @click="bgcolor(3)" :class="a == 3 ? 'bg' : ''">年</p>
        </div>
      </div>
      <div class="content">
        <div id="left_top_Chart" class="linecharts"></div>
      </div>
    </div>
    <div class="provideEnum">
      <div class="boxTitle">
        <div class="title">供电户数</div>
        <div class="timechose">
          <p @click="bgcolor2('1')" :class="b == '1' ? 'bg' : ''">月</p>
          <p @click="bgcolor2('2')" :class="b == '2' ? 'bg' : ''">季</p>
          <p @click="bgcolor2('3')" :class="b == '3' ? 'bg' : ''">年</p>
        </div>
      </div>
      <div class="content">
        <p>
          截至目前，固原市供电总户数为<span>{{
            alldatalisttitle[0].indicatorValue
          }}</span
          >常住总人口为<span>{{ alldatalisttitle[1].indicatorValue }}</span>
        </p>
        <div class="cent">
          <div class="cent_left">
            <div id="salesYearChart" class="charts"></div>
          </div>
          <div class="cent_right">
            <div class="cent_right_top">
              <div
                class="cent_left_mian_top"
                v-for="(item, index) in alldatalisttop"
                :key="index"
              >
                <div class="leftimg"></div>
                <div></div>
                <div class="leftcent">
                  <p>{{ item.indicatorName }}</p>
                  <p>{{ item.indicatorValue }}</p>
                </div>
              </div>
              <!-- <div class="cent_left_mian_top">
                <div class="leftimg"></div>
                <div></div>
                <div class="leftcent">
                  <p>低压非居民(万户)</p>
                  <p>35.2</p>
                </div>
              </div>
              <div class="cent_left_mian_top">
                <div class="leftimg"></div>
                <div></div>
                <div class="leftcent">
                  <p>低压大网(万户)</p>
                  <p>35.2</p>
                </div>
              </div> -->
            </div>
            <div class="cent_right_bottom">
              <div
                class="cent_left_main_bottom"
                v-for="(item, index) in alldatalistbottom"
                :key="index"
              >
                <div class="leftimg"></div>
                <div></div>
                <div class="leftcent">
                  <p>{{ item.indicatorName }}</p>
                  <p>{{ item.indicatorValue }}</p>
                </div>
              </div>
              <!-- <div class="cent_left_main_bottom">
                <div class="leftimg"></div>
                <div></div>
                <div class="leftcent">
                  <p>35kV(万户)</p>
                  <p>35.2</p>
                </div>
              </div>
              <div class="cent_left_main_bottom">
                <div class="leftimg"></div>
                <div></div>
                <div class="leftcent">
                  <p>110kV(万户)</p>
                  <p>35.2</p>
                </div>
              </div>
              <div class="cent_left_main_bottom">
                <div class="leftimg"></div>
                <div></div>
                <div class="leftcent">
                  <p>220kV(万户)</p>
                  <p>35.2</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
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
      a: "1",
      b: "1",
      bg: "",
      timer: null,
      titleName: "",
      btitleName: "",
      yXdata: [],
      yYdata: [],
      jXdata: [],
      jYdata: [],
      nXdata: [],
      nYdata: [],

      dYXdata: [],
      dYYdata: [],
      dJXdata: [],
      dJYdata: [],
      dNXdata: [],
      dNYdata: [],
      alldatalisttitle: [
        { indicatorValue: "/35.2", indicatorName: "" },
        { indicatorValue: "/35.2", indicatorName: "" },
      ],
      alldatalisttop: [
        {
          indicatorName: "居民(万户)",
          indicatorValue: "/35.2",
        },
        {
          indicatorName: "居民(万户)",
          indicatorValue: "/35.2",
        },
        {
          indicatorName: "居民(万户)",
          indicatorValue: "/35.2",
        },
      ],
      alldatalistbottom: [
        {
          indicatorName: "居民(万户)",
          indicatorValue: "/35.2",
        },
        {
          indicatorName: "居民(万户)",
          indicatorValue: "/35.2",
        },
        {
          indicatorName: "居民(万户)",
          indicatorValue: "/35.2",
        },
        {
          indicatorName: "居民(万户)",
          indicatorValue: "/35.2",
        },
      ],
      alldatalisttitle1: [],
      alldatalisttop1: [],
      alldatalistbottom1: [],
      alldatalisttitle2: [],
      alldatalisttop2: [],
      alldatalistbottom2: [],
      alldatalisttitle3: [],
      alldatalisttop3: [],
      alldatalistbottom3: [],
    };
  },
  watch: {
    initData1(val) {
      this.yXdata = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.yYdata = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.jXdata = val.screenTargetPart01Data[1].targetContent.xaxis;
      this.jYdata = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.nXdata = val.screenTargetPart01Data[2].targetContent.xaxis;
      this.nYdata = val.screenTargetPart01Data[2].targetContent.yaxis;
      this.titleName = val.targetGroupTitle;
      this.getIndex1();
    },
    initData2(val) {
      console.log("左边的数据", val);
      this.dYXdata = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.dYYdata = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.dJXdata = val.screenTargetPart01Data[1].targetContent.xaxis;
      this.dJYdata = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.dNXdata = val.screenTargetPart01Data[2].targetContent.xaxis;
      this.dNYdata = val.screenTargetPart01Data[2].targetContent.yaxis;
      this.btitleName = val.targetGroupTitle;
      this.alldatalisttitle1 = [];
      this.alldatalisttop1 = [];
      this.alldatalistbottom1 = [];
      val.screenTargetPart02Data[0].targetContent.forEach((item, index) => {
        if (index <= 1) {
          this.alldatalisttitle1.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 1 && index <= 4) {
          this.alldatalisttop1.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 4) {
          this.alldatalistbottom1.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        }
      });
      this.alldatalisttitle2 = [];
      this.alldatalisttop2 = [];
      this.alldatalistbottom2 = [];
      val.screenTargetPart02Data[1].targetContent.forEach((item, index) => {
        if (index <= 1) {
          this.alldatalisttitle2.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 1 && index <= 4) {
          this.alldatalisttop2.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 4) {
          this.alldatalistbottom2.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        }
      });
      this.alldatalisttitle3 = [];
      this.alldatalisttop3 = [];
      this.alldatalistbottom3 = [];
      val.screenTargetPart02Data[2].targetContent.forEach((item, index) => {
        if (index <= 1) {
          this.alldatalisttitle3.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 1 && index <= 4) {
          this.alldatalisttop3.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 4) {
          this.alldatalistbottom3.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        }
      });
      this.getIndex2();
    },
  },
  mounted() {
    // this.tiemr = setTimeout(() => {}, 2000);

    this.leftbottomchart();
  },
  // beforeDestroy() {
  //   clearTimeout(this.tiemr);
  //   this.tiemr = null;
  // },
  methods: {
    getIndex1() {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: this.titleName },
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.a = data.data;
          }
          this.bgcolor(this.a);
        });
    },
    getIndex2() {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: this.titleName },
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.b = data.data;
          }
          this.bgcolor2(this.b);
        });
    },
    bgcolor(val) {
      this.a = val;
      if (val == 1) {
        this.lefttopchart(this.yXdata, this.yYdata);
      } else if (val == 2) {
        this.lefttopchart(this.jXdata, this.jYdata);
      } else {
        this.lefttopchart(this.nXdata, this.nYdata);
      }
    },
    bgcolor2(val) {
      this.b = val;
      this.alldatalisttitle = [];
      this.alldatalisttop = [];
      this.alldatalistbottom = [];
      // debugger;
      if (val == 1) {
        this.alldatalisttitle = this.alldatalisttitle1;
        this.alldatalisttop = this.alldatalisttop1;
        this.alldatalistbottom = this.alldatalistbottom1;
        // console.log("data1", this.alldatalisttitle);
        // console.log("data2", this.alldatalisttop);
        // console.log("data3", this.alldatalistbottom);
        this.leftbottomchart(this.dYXdata, this.dYYdata);
      } else if (val == 2) {
        this.alldatalisttitle = this.alldatalisttitle2;
        this.alldatalisttop = this.alldatalisttop2;
        this.alldatalistbottom = this.alldatalistbottom2;
        // console.log("data1", this.alldatalisttitle);
        // console.log("data2", this.alldatalisttop);
        // console.log("data3", this.alldatalistbottom);
        this.leftbottomchart(this.dJXdata, this.dJYdata);
      } else {
        this.alldatalisttitle = this.alldatalisttitle3;
        this.alldatalisttop = this.alldatalisttop3;
        this.alldatalistbottom = this.alldatalistbottom3;
        // console.log("data1", this.alldatalisttitle);
        // console.log("data2", this.alldatalisttop);
        // console.log("data3", this.alldatalistbottom);
        this.leftbottomchart(this.dNXdata, this.dNYdata);
      }
    },
    leftbottomchart(xdata, ydata) {
      let myChart = this.$echarts.init(
        document.getElementById("salesYearChart")
      );
      myChart.setOption({
        grid: {
          top: "30%",
          left: "14%",
          right: "5%",
          bottom: "16%",
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
            // data: ["原州区", "西吉县", "隆德县", "泾源县", "彭阳", "三营"],
            data: xdata,
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            name: "万",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 80, 20, 0],
              fontSize: 16, // 四个数字分别为上右下左与原位置距离
              color: "#fff",
            },
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: false,
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
          // 底部的光晕
          {
            name: "",
            type: "pictorialBar",
            tooltip: {
              show: false,
            },
            symbolSize: [50, 20],
            symbolOffset: [0, 20],
            z: 10,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#26B2E8",
                borderType: "solid",
                borderWidth: 4,
              },
            },
            // data: [47.75, 50.06, 51.86, 54.66, 57.69, 60.66],
            data: ydata,
          },
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
            // data: [47.75, 50.06, 51.86, 54.66, 57.69, 60.66],
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
            // data: [47.75, 50.06, 51.86, 54.66, 57.69, 60.66],
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
          //阴影的顶部
          {
            name: "", //头部
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [0, -10],
            z: 11,
            symbolPosition: "end",
            itemStyle: {
              color: "#0B2869",
              opacity: 1,
            },
            data: [80, 80, 80, 80, 80, 80],
          },
          //后面的背景
          {
            name: "2019",
            type: "bar",
            barWidth: 30,
            barGap: "-100%",
            z: 0,
            itemStyle: {
              color: "#0B2869",
              opacity: 0.7,
            },

            data: [80, 80, 80, 80, 80, 80],
          },
        ],
      });
    },
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
              show: true,
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
            name: "亿元",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 100, 10, 0],
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
            // symbolColor: "#ffc80f",
            itemStyle: {
              borderWidth: 1,
              normal: {
                color: "#ffc80f", //图例的颜色
                borderColor: "#2BB2F8",
                lineStyle: {
                  color: "#17ffb9", //线的颜色
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
  },
};
</script>
<style lang="scss" scoped>
@keyframes myAnimation {
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

.guyuansurveyLeftPart {
  position: absolute;
  top: 48px;
  left: 48px;
  width: 1458px;
  height: 992px;
  // background: url("/image/greendoublecarbon/leftbg.png") no-repeat;
  .charts {
    height: calc(100% - 20px);
    width: 100%;
  }
  .linecharts {
    height: calc(100% - 10px);
    width: 100%;
  }
  .gdpnum {
    .boxTitle {
      position: relative;
      .timechose {
        // animation: 1s content_opacity_animation 1s backwards;
        position: absolute;
        right: 5%;
        top: 30%;
        display: flex;
        justify-content: left;
        z-index: 100;
        p {
          font-size: 30px;
          padding: 0 20px;
          &:nth-of-type(2) {
            margin: 0 20px;
          }
        }
      }
    }
    .content {
      width: 100%;
      background: rgba(22, 43, 76, 0.7);
      height: 384px;
    }
  }
  .provideEnum {
    margin: 20px 0;
    .boxTitle {
      position: relative;
      .timechose {
        // animation: 1s content_opacity_animation 1s backwards;
        position: absolute;
        right: 5%;
        top: 30%;
        display: flex;
        justify-content: left;
        p {
          font-size: 30px;
          padding: 0 20px;
          &:nth-of-type(2) {
            margin: 0 20px;
          }
        }
      }
    }
    .content {
      width: 100%;
      background: rgba(22, 43, 76, 0.7);
      height: 384px;
      padding-top: 10px;
      p {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 27px;
        color: rgba(255, 255, 255, 0.8);
        padding-left: 61px;
        span {
          font-weight: bold;
          line-height: 27px;
          color: #ffdc19;
          opacity: 1;
          margin: 0 10px;
        }
      }
      .cent {
        display: flex;
        justify-content: space-between;
        height: 100%;
        .cent_left {
          width: 50%;
          height: 100%;
        }
        .cent_right {
          width: 50%;
          height: 100%;
          // background: #ccc;
          // border: 1px solid firebrick;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .cent_right_top {
            display: flex;
            justify-content: space-around;
            .cent_left_mian_top {
              width: 180px;
              height: 80px;
              // border: 1px solid forestgreen;
              display: flex;
              justify-content: space-between;
              position: relative;
              .leftimg {
                // width: 40px;
                // height: 126px;
                // border: 1px solid fuchsia;
                position: absolute;
                left: -46%;
                top: -90%;
                width: 200px;
                height: 200px;
                // border: 1px solid floralwhite;
                background: url("/image/guyuansurvey/dianchi.png");
                animation: 5s myAnimation 2s steps(1) infinite;
              }
              .leftcent {
                background: url("/image/guyuansurvey/leftmainbottombg.png")
                  no-repeat;
                width: 134px;
                height: 126px;

                p {
                  text-align: center;
                  padding-left: 0;
                }
                p:nth-of-type(1) {
                  font-size: 16px;
                  line-height: 34px;
                  color: #91d5ff;
                }
                p:nth-of-type(2) {
                  font-size: 20px;
                  color: #42eff3;
                }
              }
            }
          }
          .cent_right_bottom {
            display: flex;
            justify-content: space-around;
            .cent_left_main_bottom {
              width: 180px;
              height: 80px;
              // border: 1px solid forestgreen;
              display: flex;
              justify-content: space-between;
              position: relative;
              .leftimg {
                // width: 40px;
                // height: 126px;
                // border: 1px solid fuchsia;
                position: absolute;
                left: -46%;
                top: -90%;
                width: 200px;
                height: 200px;
                // border: 1px solid floralwhite;
                background: url("/image/guyuansurvey/dianchi.png");
                animation: 5s myAnimation 2s steps(1) infinite;
              }
              .leftcent {
                background: url("/image/guyuansurvey/leftmainbottombg.png")
                  no-repeat;
                width: 134px;
                height: 126px;

                p {
                  text-align: center;
                  padding-left: 0;
                }
                p:nth-of-type(1) {
                  font-size: 16px;
                  line-height: 34px;
                  color: #91d5ff;
                }
                p:nth-of-type(2) {
                  font-size: 20px;
                  color: #42eff3;
                }
              }
            }
          }
        }
      }
    }
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
}
</style>
