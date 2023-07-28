<template>
  <div class="distributionNetworkMaintenanceLeftPart">
    <div class="resources">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">正在执行计划</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="top"></div>
        <div class="title">
          <span>序号</span>
          <span>作业单位</span>
          <span>作业类型</span>
          <span>检修要求</span>
          <span>作业开始时间</span>
          <span>作业结束时间</span>
          <span>工作班组</span>
        </div>
        <div class="text">
          <div>
            <section
              v-for="(item, index) in leftArr"
              :key="index"
              :class="{ on: index % 2 != 0, off: index % 2 == 0 }"
            >
              <span>{{ item.index }}</span>
              <span>{{ item.company }}</span>
              <span>{{ item.type }}</span>
              <span>{{ item.requirement }}</span>
              <span>{{ item.startTime }}</span>
              <span>{{ item.endTime }}</span>
              <span>{{ item.workTeam }}</span>
            </section>
            <section
              v-for="(item, index) in leftArr"
              :key="index + 'b'"
              :class="{ on: index % 2 != 0, off: index % 2 == 0 }"
            >
              <span>{{ item.index }}</span>
              <span>{{ item.company }}</span>
              <span>{{ item.type }}</span>
              <span>{{ item.requirement }}</span>
              <span>{{ item.startTime }}</span>
              <span>{{ item.endTime }}</span>
              <span>{{ item.workTeam }}</span>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">预安排检修计划</div>
        <!-- <div class="img"></div> -->
        <div class="rightInfo">
          <p :class="{ plan: show == 1 }" @click="chosetime(1)">下周计划</p>
          <p :class="{ plan: show == 2 }" @click="chosetime(2)">下月计划</p>
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
      show: "1",
      leftArr: [],
      XZData1: [],
      XZData2: [],
      XZData3: [],
      XYData1: [],
      XYData2: [],
      XYData3: [],
      Xzhou: [],
      name: "",
    };
  },
  mounted() {
    // this.getIndex();
  },
  watch: {
    initData1(val) {
      this.leftArr = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item) => {
        this.leftArr.push({
          index: item.columnValue1.split("/")[1],
          company: item.columnValue2.split("/")[1],
          type: item.columnValue3.split("/")[1],
          requirement: item.columnValue4.split("/")[1],
          startTime: item.columnValue5.split("/")[1],
          endTime: item.columnValue6.split("/")[1],
          workTeam: item.columnValue7.split("/")[1],
        });
      });
    },
    initData2(val) {
      // console.log(val, "左边数据");
      this.XZData1 =
        val.screenTargetPart01Data[0].targetContent.yaxis.map(Number);
      this.XZData2 =
        val.screenTargetPart01Data[1].targetContent.yaxis.map(Number);
      this.XZData3 =
        val.screenTargetPart01Data[2].targetContent.yaxis.map(Number);
      this.XYData1 =
        val.screenTargetPart01Data[3].targetContent.yaxis.map(Number);
      this.XYData2 =
        val.screenTargetPart01Data[4].targetContent.yaxis.map(Number);
      this.XYData3 =
        val.screenTargetPart01Data[5].targetContent.yaxis.map(Number);
      this.Xzhou = val.screenTargetPart01Data[5].targetContent.xaxis;
      this.name = val.targetGroupTitle;
      this.getIndex();
      // this.nextweek(this.XZData1, this.XZData2, this.XZData3, this.Xzhou);
    },
    // this.getIndex()
  },
  methods: {
    getIndex() {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: this.name },
        })
        .then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.show = data.data;
          }
          this.chosetime(this.show);
          // console.log(this.show);
        });
    },
    chosetime(timeval) {
      this.show = timeval;
      if (this.show == 1) {
        this.nextweek(this.XZData1, this.XZData2, this.XZData3, this.Xzhou);
      } else {
        this.nextweek(this.XYData1, this.XYData2, this.XYData3, this.Xzhou);
      }
    },
    nextweek(sanjdata, sjdata, wjdata, xdata) {
      let _chart = this.$refs.chart;
      let myChart = this.$echarts.init(_chart);
      let that = this;
      // let data1 = [18, 40, 15, 20, 18, 40]; //三级作业风险
      // let data2 = [20, 25, 15, 50, 20, 25]; //四级作业风险
      // let data3 = [30, 25, 18, 25, 30, 25]; //五级作业风险
      let data1 = sanjdata; //三级作业风险
      let data2 = sjdata; //四级作业风险
      let data3 = wjdata; //五级作业风险
      let data4 = [];
      let data5 = [];
      for (let i = 0; i < data1.length; i++) {
        data4.push(data1[i] + data2[i]), data5.push(data4[i] + data3[i]);
      }
      // console.log(data1, data2, data3, data4,data5)
      myChart.setOption({
        // tooltip: {
        //   trigger: "axis",
        //   confine: true,
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        //   },
        // },
        title: {
          text: "单位: 项",
          left: "20px",
          textStyle: {
            color: "#fff",
            fontSize: 20,
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 12,
          left: "10%",
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 18,
          },
          data: ["三级作业风险", "四级作业风险", "五级作业风险"],
          selectedMode: false,
        },
        grid: {
          top: "16%",
          left: "6%",
          right: "5%",
          bottom: "12%",
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
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
            // data: ["原州区", "西吉区", "彭阳县", "隆德县", "泾源县", "三营"],
            data: xdata,
          },
        ],
        yAxis: {
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
        series: [
          {
            name: "三级作业风险",
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
            name: "四级作业风险",
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
            name: "五级作业风险",
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
@keyframes fadeInLeftshow {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@keyframes move {
  0% {
    top: 0;
  }
  100% {
    top: -100%;
  }
}
#bottomLeftPie {
  width: 100%;
  height: 100%;
}
.distributionNetworkMaintenanceLeftPart {
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
      height: 406px;
      padding-left: 40px;
      padding-right: 40px;
      background: rgba(2, 72, 94, 0.14);
      overflow: hidden;
      position: relative;
      animation: fadeInLeftshow 3s;
      .top {
        position: relative;
        width: 1373px;
        height: 29px;
        background: linear-gradient(
          180deg,
          rgba(1, 40, 69, 0) 0%,
          rgba(57, 155, 200, 0.77) 100%
        );
      }
      .top::before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        left: 0;
        top: 0;
        border-left: solid 80px #031328;
        border-bottom: solid 29px transparent;
      }
      .top::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        right: 0;
        top: 0;
        border-right: solid 80px #032247;
        border-bottom: solid 29px transparent;
      }
      .title {
        width: 1373px;
        height: 51px;
        background: rgba(107, 232, 255, 0.25);
        // opacity: 0.25;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          color: #65d6ff;
          width: 10%;
          text-align: center;
        }
      }
      .on {
        background: rgba(255, 255, 255, 0.08);
      }
      .off {
        background: rgba(0, 0, 0, 0.2);
      }
      .text {
        height: calc(100% - 100px);
        position: relative;
        overflow: hidden;
        div {
          position: absolute;
          animation: 20s move 3s infinite linear;
        }
        div:hover {
          animation-play-state: paused;
        }
      }
      section {
        width: 1373px;
        height: 51px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // position: absolute;
        span {
          width: 10%;
          text-align: center;
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
          width: 130px;
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
      padding: 40px 52px 40px 52px;
      .chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
