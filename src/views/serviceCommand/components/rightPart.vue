<template>
  <div class="rightPart_serviceCommand">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{ title }}</div>
      </div>
      <div class="content">
        <flashAnimation />
        <div class="changeBtn">
          <p :class="acitveIndex == 1 ? 'active' : ''" @click="change(1)">周</p>
          <p :class="acitveIndex == 2 ? 'active' : ''" @click="change(2)">月</p>
        </div>
        <div class="changeBtn1">
          <p :class="acitveIndex1 === 1 ? 'active' : ''" @click="change2(1)">
            投诉
          </p>
          <p :class="acitveIndex1 === 2 ? 'active' : ''" @click="change2(2)">
            意见
          </p>
          <p :class="acitveIndex1 === 3 ? 'active' : ''" @click="change2(3)">
            服务申请
          </p>
        </div>
        <div class="changeBtn2">
          <p :class="acitveIndex2 === 1 ? 'active' : ''" @click="change3(1)">
            投诉
          </p>
          <p :class="acitveIndex2 === 2 ? 'active' : ''" @click="change3(2)">
            意见
          </p>
          <p :class="acitveIndex2 === 3 ? 'active' : ''" @click="change3(3)">
            服务申请
          </p>
        </div>
        <div id="rightTopLine"></div>
        <div id="rightMiddleBar"></div>
        <div class="pie_container">
          <div class="legend">
            <section
              v-for="(item, index) in legendList"
              :key="`${index}_legend`"
            >
              <div
                class="colorsec"
                :style="{ backgroundColor: item.color }"
              ></div>
              <div class="legendtext">{{ item.title }}</div>
            </section>
          </div>
          <div class="unit">单位：件</div>
          <pie
            id="topRightPie1"
            :option="option1"
            pieName="原州区"
            titleAlign="bottom"
          ></pie>
          <pie
            id="topRightPie2"
            :option="option2"
            pieName="西吉县"
            titleAlign="bottom"
          ></pie>
          <pie
            id="topRightPie3"
            :option="option3"
            pieName="隆德县"
            titleAlign="bottom"
          ></pie>
          <pie
            id="topRightPie4"
            :option="option4"
            pieName="泾源县"
            titleAlign="bottom"
          ></pie>
          <pie
            id="topRightPie5"
            :option="option5"
            pieName="彭阳县"
            titleAlign="bottom"
          ></pie>
          <pie
            id="topRightPie6"
            :option="option6"
            pieName="三营"
            titleAlign="bottom"
          ></pie>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pie from "@/components/pie.vue";
import flashAnimation from "@/components/flashAnimation.vue";
import axios from "axios";
export default {
  components: {
    pie,
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
    initData3: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    initData(val) {
      this.title = val.targetGroupTitle;
      this.zxais = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.yxais = val.screenTargetPart02Data[0].targetContent.xaxis;
      // for(let i = 0;i<val.screenTargetPart01Data.length;i++){
      //   let obj = {
      //     name:val.screenTargetPart01Data[i].targetTabTitle.split('-')[1],
      //     type: "line",
      //     symbol: "none",
      //     data: val.screenTargetPart01Data[i].targetContent.yaxis, //data.values
      //   }
      //   this.arrList.push(obj)
      // }
      // for(let i = 0;i<val.screenTargetPart02Data.length;i++){
      //   let obj = {
      //     name:val.screenTargetPart02Data[i].targetTabTitle.split('-')[1],
      //     type: "line",
      //     symbol: "none",
      //     data: val.screenTargetPart02Data[i].targetContent.yaxis, //data.values
      //   }
      //   this.arrList2.push(obj)
      // }
      this.arrList=[]
      this.arrList2=[]
      val.screenTargetPart01Data.forEach((item) => {
        this.arrList.push({ data: item.targetContent.yaxis });
      });
      val.screenTargetPart02Data.forEach((item) => {
        this.arrList2.push({ data: item.targetContent.yaxis });
      });
      this.getIndex(this.title);
    },
    initData2(val) {
      // console.log(val)
      this.xdata = val.screenTargetPart01Data[0].targetContent.xaxis;
      this.tydata1 = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.tydata2 = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.yydata1 = val.screenTargetPart02Data[0].targetContent.yaxis;
      this.yydata2 = val.screenTargetPart02Data[1].targetContent.yaxis;
      this.fydata1 = val.screenTargetPart03Data[0].targetContent.yaxis;
      this.fydata2 = val.screenTargetPart03Data[1].targetContent.yaxis;
      this.getIndex(val.targetGroupTitle);
    },
    initData3(val) {
      let colors = [
        "#32BDF0",
        "#CEA73D",
        "#CC7552",
        "#1983E0",
        "#24D59B",
        "#C0FF3E",
        "#8470FF",
        "#BEBEBE",
      ];
      this.legend1 = []
      this.legend2 = []
      this.legend3 = []
      val.screenTargetPart01Data[0].targetContent.forEach((item, i) => {
        // console.log(item)
        this.legend1.push({
          title: item.name,
          color: colors[i],
        });
      });
      val.screenTargetPart02Data[0].targetContent.forEach((item, i) => {
        // console.log(item)
        this.legend2.push({
          title: item.name,
          color: colors[i],
        });
      });
      val.screenTargetPart03Data[0].targetContent.forEach((item, i) => {
        // console.log(item)
        this.legend3.push({
          title: item.name,
          color: colors[i],
        });
      });
      val.screenTargetPart01Data.forEach((item) => {
        let maxy = Math.max.apply(
          Math,
          item.targetContent.map(function (o) {
            return o.y;
          })
        );
        item.targetContent.forEach((item2) => {
          item2["h"] = 10;
          if (item2.y == maxy) {
            item2.h = 30;
          }
        });
      });

      val.screenTargetPart02Data.forEach((item) => {
        let maxy = Math.max.apply(
          Math,
          item.targetContent.map(function (o) {
            return o.y;
          })
        );
        item.targetContent.forEach((item2) => {
          item2["h"] = 10;
          if (item2.y == maxy) {
            item2.h = 30;
          }
        });
      });
      val.screenTargetPart03Data.forEach((item) => {
        let maxy = Math.max.apply(
          Math,
          item.targetContent.map(function (o) {
            return o.y;
          })
        );
        item.targetContent.forEach((item2) => {
          item2["h"] = 10;
          if (item2.y == maxy) {
            item2.h = 30;
          }
        });
      });
      this.data1 = val.screenTargetPart01Data[0].targetContent;
      this.data2 = val.screenTargetPart01Data[1].targetContent;
      this.data3 = val.screenTargetPart01Data[2].targetContent;
      this.data4 = val.screenTargetPart01Data[3].targetContent;
      this.data5 = val.screenTargetPart01Data[4].targetContent;
      this.data6 = val.screenTargetPart01Data[5].targetContent;
      this.data11 = val.screenTargetPart02Data[0].targetContent;
      this.data22 = val.screenTargetPart02Data[1].targetContent;
      this.data33 = val.screenTargetPart02Data[2].targetContent;
      this.data44 = val.screenTargetPart02Data[3].targetContent;
      this.data55 = val.screenTargetPart02Data[4].targetContent;
      this.data66 = val.screenTargetPart02Data[5].targetContent;
      this.data111 = val.screenTargetPart03Data[0].targetContent;
      this.data222 = val.screenTargetPart03Data[1].targetContent;
      this.data333 = val.screenTargetPart03Data[2].targetContent;
      this.data444 = val.screenTargetPart03Data[3].targetContent;
      this.data555 = val.screenTargetPart03Data[4].targetContent;
      this.data666 = val.screenTargetPart03Data[5].targetContent;
      this.getIndex(val.targetGroupTitle);
      // console.log(val)
    },
  },
  data() {
    return {
      //图1
      title: "",
      zxais: [], //周X轴
      yxais: [], //月X轴
      arrList: [],
      arrList2: [],
      //图2
      xdata: [],
      tydata1: [], //投诉
      tydata2: [], //投诉
      yydata1: [], //意见
      yydata2: [], //意见
      fydata1: [], //服务申请
      fydata2: [], //服务申请
      //图3
      legend1: [],
      legend2: [],
      legend3: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      data11: [],
      data22: [],
      data33: [],
      data44: [],
      data55: [],
      data66: [],
      data111: [],
      data222: [],
      data333: [],
      data444: [],
      data555: [],
      data666: [],
      acitveIndex: 0,
      acitveIndex1: 0,
      acitveIndex2: 0,
      legendList: [
        // colors: ["#32BDF0", "#CEA73D", "#CC7552", "#1983E0", "#24D59B"],
        // title:['服务投诉','营业投诉','供电质量投诉','停送电投诉','电网建设投诉'],
        // { title: "服务投诉", color: "#32BDF0" },
        // { title: "营业投诉", color: "#CEA73D" },
        // { title: "供电质量投诉", color: "#CC7552" },
        // { title: "停送电投诉", color: "#1983E0" },
        // { title: "电网建设投诉", color: "#24D59B" },
      ],
      option1: {
        legend: {
          enabled: false,
        },
        colors: [
          "#32BDF0",
          "#CEA73D",
          "#CC7552",
          "#1983E0",
          "#24D59B",
          "#C0FF3E",
          "#8470FF",
          "#BEBEBE",
        ],
        series: [
          {
            type: "pie",
            // name: "原州区",
            depth: 5,
            innerSize: 100,
            center: ["50%", "80%"],
            size: "60%",
            dataLabels: {
              crookDistance: "70%",
              connectorShape: "crookedLine",
              alignTo: "plotEdges",
            },
            data: [
              // {name: "供电服务", y: 56 ,h:30},
              // {name: "停送电问题", y: 33 ,h:10},
              // {name: "供电质量问题", y: 22,h:10},
              // {name: "充电业务", y: 42,h:10},
              // {name: "充电设施建设", y: 31,h:10},
              // {name: "充电服务", y: 22,h:10},
              // {name: "供电业务", y: 34,h:10},
              // {name: "电网建设", y: 22,h:10}
            ],
          },
        ],
      },
      option2: {
        legend: {
          enabled: false,
        },
        colors: [
          "#32BDF0",
          "#CEA73D",
          "#CC7552",
          "#1983E0",
          "#24D59B",
          "#C0FF3E",
          "#8470FF",
          "#BEBEBE",
        ],
        series: [
          {
            type: "pie",
            // name: "原州区",
            depth: 5,
            innerSize: 100,
            center: ["50%", "80%"],
            size: "60%",
            dataLabels: {
              crookDistance: "70%",
              connectorShape: "crookedLine",
              alignTo: "plotEdges",
            },
            data: [
              // { name: "服务投诉", y: 58, h: 30 },
              // { name: "营业投诉", y: 26, h: 10 },
              // { name: "供电质量投诉", y: 26, h: 10 },
              // { name: "停送电投诉", y: 26, h: 10 },
              // { name: "电网建设投诉", y: 26, h: 10 },
            ],
          },
        ],
      },
      option3: {
        legend: {
          enabled: false,
        },
        colors: [
          "#32BDF0",
          "#CEA73D",
          "#CC7552",
          "#1983E0",
          "#24D59B",
          "#C0FF3E",
          "#8470FF",
          "#BEBEBE",
        ],
        series: [
          {
            type: "pie",
            // name: "原州区",
            depth: 5,
            innerSize: 100,
            center: ["50%", "80%"],
            size: "60%",
            dataLabels: {
              crookDistance: "70%",
              connectorShape: "crookedLine",
              alignTo: "plotEdges",
            },
            data: [
              // { name: "服务投诉", y: 58, h: 30 },
              // { name: "营业投诉", y: 26, h: 10 },
              // { name: "供电质量投诉", y: 26, h: 10 },
              // { name: "停送电投诉", y: 26, h: 10 },
              // { name: "电网建设投诉", y: 26, h: 10 },
            ],
          },
        ],
      },
      option4: {
        legend: {
          enabled: false,
        },
        colors: [
          "#32BDF0",
          "#CEA73D",
          "#CC7552",
          "#1983E0",
          "#24D59B",
          "#C0FF3E",
          "#8470FF",
          "#BEBEBE",
        ],
        series: [
          {
            type: "pie",
            // name: "原州区",
            depth: 5,
            innerSize: 100,
            center: ["50%", "80%"],
            size: "60%",
            dataLabels: {
              crookDistance: "70%",
              connectorShape: "crookedLine",
              alignTo: "plotEdges",
            },
            data: [
              // { name: "服务投诉", y: 58, h: 30 },
              // { name: "营业投诉", y: 26, h: 10 },
              // { name: "供电质量投诉", y: 26, h: 10 },
              // { name: "停送电投诉", y: 26, h: 10 },
              // { name: "电网建设投诉", y: 26, h: 10 },
            ],
          },
        ],
      },
      option5: {
        legend: {
          enabled: false,
        },
        colors: [
          "#32BDF0",
          "#CEA73D",
          "#CC7552",
          "#1983E0",
          "#24D59B",
          "#C0FF3E",
          "#8470FF",
          "#BEBEBE",
        ],
        series: [
          {
            type: "pie",
            // name: "原州区",
            depth: 5,
            innerSize: 100,
            center: ["50%", "80%"],
            size: "60%",
            dataLabels: {
              crookDistance: "70%",
              connectorShape: "crookedLine",
              alignTo: "plotEdges",
            },
            data: [
              // { name: "服务投诉", y: 58, h: 30 },
              // { name: "营业投诉", y: 26, h: 10 },
              // { name: "供电质量投诉", y: 26, h: 10 },
              // { name: "停送电投诉", y: 26, h: 10 },
              // { name: "电网建设投诉", y: 26, h: 10 },
            ],
          },
        ],
      },
      option6: {
        legend: {
          enabled: false,
        },
        colors: [
          "#32BDF0",
          "#CEA73D",
          "#CC7552",
          "#1983E0",
          "#24D59B",
          "#C0FF3E",
          "#8470FF",
          "#BEBEBE",
        ],
        series: [
          {
            type: "pie",
            // name: "原州区",
            depth: 5,
            innerSize: 100,
            center: ["50%", "80%"],
            size: "60%",
            dataLabels: {
              crookDistance: "70%",
              connectorShape: "crookedLine",
              alignTo: "plotEdges",
            },
            data: [
              // { name: "服务投诉", y: 58, h: 30 },
              // { name: "营业投诉", y: 26, h: 10 },
              // { name: "供电质量投诉", y: 26, h: 10 },
              // { name: "停送电投诉", y: 26, h: 10 },
              // { name: "电网建设投诉", y: 26, h: 10 },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    // this.rightMiddleBar();
    // this.rightTopLine();
  },
  methods: {
    getIndex(name) {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: name },
        })
        .then((res) => {
          if (res.status === 200 && res.data.code === 200) {
            // console.log(name)
            if (name === "非抢工单各业务数据曲线") {
              this.change(res.data.data);
            }
            if (name === "非抢工单各业务数据曲线图二") {
              this.change2(res.data.data);
            }
            if (name === "非抢工单各业务数据曲线图三") {
              this.change3(res.data.data);
            }
          }
        });
    },
    change(e) {
      this.acitveIndex = e;
      if (e === 1) {
        this.rightTopLine(this.zxais, this.arrList);
      } else {
        this.rightTopLine(this.yxais, this.arrList2);
      }
    },
    change2(e) {
      this.acitveIndex1 = e;
      if (e === 1) {
        this.rightMiddleBar(this.xdata, this.tydata1, this.tydata2);
      } else if (e === 2) {
        this.rightMiddleBar(this.xdata, this.yydata1, this.yydata2);
      } else {
        this.rightMiddleBar(this.xdata, this.fydata1, this.fydata2);
      }
    },
    change3(e) {
      this.acitveIndex2 = e;
      if (e === 1) {
        this.option1.series[0].data = this.data1;
        this.option2.series[0].data = this.data2;
        this.option3.series[0].data = this.data3;
        this.option4.series[0].data = this.data4;
        this.option5.series[0].data = this.data5;
        this.option6.series[0].data = this.data6;
        this.legendList = this.legend1;
      } else if (e === 2) {
        this.option1.series[0].data = this.data11;
        this.option2.series[0].data = this.data22;
        this.option3.series[0].data = this.data33;
        this.option4.series[0].data = this.data44;
        this.option5.series[0].data = this.data55;
        this.option6.series[0].data = this.data66;
        this.legendList = this.legend2;
      } else {
        this.option1.series[0].data = this.data111;
        this.option2.series[0].data = this.data222;
        this.option3.series[0].data = this.data333;
        this.option4.series[0].data = this.data444;
        this.option5.series[0].data = this.data555;
        this.option6.series[0].data = this.data666;
        this.legendList = this.legend3;
      }
    },
    rightTopLine(x, y) {
      // console.log(y);
      // console.log(x,y);
      let myChart = this.$echarts.init(document.getElementById("rightTopLine"));
      myChart.setOption({
        // color: [
        //   "#0DF3FB",
        //   "#90C418",
        //   "#138C6A",
        //   "#0254B6",
        //   "#DCF38F",
        //   "#F8C822",
        //   "#E5604C",
        //   "#D43F2E",
        // ],
        grid: {
          top: "25%",
          left: "7%",
          right: "3%",
          bottom: "12%",
          // containLabel:true,
        },
        legend: {
          x: "left",
          y: "top",
          padding: [5, 0, 45, 40],
          textStyle: {
            //图例文字的样式
            color: "#fefefe",
            fontSize: 20,
          },
          itemGap: 40,
          icon: "roundRect",
          show: true,
          selectedMode: true,
        },
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
            data: x,
          },
        ],

        yAxis: [
          {
            type: "value",
            name: "单位：件",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 5, -60],
              fontSize: 16, // 四个数字分别为上右下左与原位置距离
              color: "#fff",
            },
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
              // formatter: "{value}%",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "业务咨询",
            data: y[0].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#0DF3FB",
              width: 3,
            },
            color: "#0DF3FB", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#0DF3FB",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "表扬",
            data: y[1].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#90C418",
              width: 3,
            },
            color: "#90C418", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#90C418",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "意见",
            data: y[2].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#138C6A",
              width: 3,
            },
            color: "#138C6A", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#138C6A",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "建议",
            data: y[3].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#0254B6",
              width: 3,
            },
            color: "#0254B6", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#0254B6",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "服务申请",
            data: y[4].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#DCF38F",
              width: 3,
            },
            color: "#DCF38F", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#DCF38F",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "催办",
            data: y[5].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#F8C822",
              width: 3,
            },
            color: "#F8C822", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#F8C822",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "投诉",
            data: y[6].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#E5604C",
              width: 3,
            },
            color: "#E5604C", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#E5604C",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "举报",
            data: y[7].data,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#D43F2E",
              width: 3,
            },
            color: "#D43F2E", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#D43F2E",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
        ],
      });
    },
    rightMiddleBar(x, y1, y2) {
      let myChart = this.$echarts.init(
        document.getElementById("rightMiddleBar")
      );
      let arr1 = y1,
        arr2 = y2,
        xAxisArr = x;
      myChart.setOption({
        grid: {
          top: "30%",
          left: "7%",
          right: "3%",
          bottom: "12%",
          // containLabel:true,
        },
        legend: {
          x: "left",
          y: "top",
          padding: [5, 0, 45, 40],
          textStyle: {
            //图例文字的样式
            color: "#fefefe",
            fontSize: 20,
          },
          itemGap: 40,
          icon: "roundRect",
          show: true,
          // selectedMode: true,
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
            name: "单位：件",
            nameLocation: "end",
            nameTextStyle: {
              padding: [0, 0, 5, -60],
              fontSize: 16, // 四个数字分别为上右下左与原位置距离
              color: "#fff",
            },
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
              // formatter: "{value}%",
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
              color: "#DC7D2F",
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
                    color: "#F28B29", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FC674C", // 100% 处的颜色
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
              color: "#FC674C",
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
            symbolOffset: [18, 5],
            z: 10,
            itemStyle: {
              opacity: 1,
              color: "#FC674C",
            },
            // symbolPosition: "end",
            data: arr2,
          },
          {
            //柱子顶部圆片
            name: "",
            silent: true,
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [-18, 5],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: "#098CCB",
            },
            // symbolPosition: "end",
            data: arr1,
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
  },
};
</script>
<style lang="scss" scoped>
.rightPart_serviceCommand {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  .content {
    background-color: rgba(0, 11, 32, 0.26);
  }
  .infoMonitor {
    .content {
      height: 870px;
      position: relative;
      // z-index: -1;
      // overflow: hidden;
      &::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index:1;
        top: 20px;
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
        height: 33%;
        width: 100%;
        margin-bottom: 1%;
      }
      #rightMiddleBar {
        height: 33%;
        width: 100%;
      }
      .pie_container {
        height: 33%;
        width: 100%;
        display: flex;
        padding: 0 15px;
        position: relative;
        .legend {
          position: absolute;
          top: 20px;
          left: 30px;
          display: flex;
          section {
            display: flex;
            align-items: center;
            margin-right: 20px;
            .colorsec {
              width: 20px;
              height: 12px;
              background: #32bdf0;
              border-radius: 4px;
              margin-right: 6px;
            }
            .legendtext {
              font-size: 20px;
              color: #ffffff;
              line-height: 24px;
            }
          }
        }
        .unit {
          position: absolute;
          top: 70px;
          left: 30px;
        }
      }
      .changeBtn1 {
        top: 33% !important;
      }
      .changeBtn2 {
        top: 67% !important;
      }
      .changeBtn,
      .changeBtn1,
      .changeBtn2 {
        position: absolute;
        display: flex;
        color: #ceefff;
        font-size: 20px;
        right: 10px;
        top: -70px;
        z-index: 999;
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
}
</style>