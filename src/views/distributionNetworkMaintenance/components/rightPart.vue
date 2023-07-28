<template>
  <div class="gridOverviewRightPart">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">检修计划执行情况</div>
        <!-- <div class="img"></div> -->
        <div class="rightInfo">
          <p :class="{ plan: show === 1 }" @click="timetypechose(1)">周</p>
          <p :class="{ plan: show === 2 }" @click="timetypechose(2)">月</p>
          <p :class="{ plan: show === 3 }" @click="timetypechose(3)">年</p>
        </div>
      </div>
      <div class="content">
        <!-- <div class="animate_container"> -->
        <div class="left_chart">
          <!-- <div class="main_title">保电设备</div> -->
          <div id="tenkDevelopChart" class="charts"></div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">计划来源分析</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="right_chart">
        <div class="right_chart_content">
          <pie :id="'topRightPie1'" :option="option" v-if="pieShow"></pie>
        </div>
      </div>
    </div>
    <div class="infoMonitor box">
      <div class="electric electric1">
        <p>停电信息</p>
        <div class="bottom">
          <div>
            <p>检修计划</p>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="endVal1"
                :duration="3000"
              ></countTo>
              <span>项</span>
            </div>
          </div>
          <div>
            <p>通知到户率</p>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="endVal2"
                :duration="3000"
              ></countTo>
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="electric electric2">
        <p>减少停电时户数</p>
        <div class="bottom">
          <div class="one">
            <countTo
              :startVal="startVal"
              :endVal="endVal3"
              :duration="3000"
            ></countTo>
            <span>万户</span>
          </div>
        </div>
      </div>
      <div class="electric electric3">
        <p>不停电作业</p>
        <div class="bottom">
          <div>
            <p>带电作业</p>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="endVal4"
                :duration="3000"
              ></countTo>
              <span>项</span>
            </div>
          </div>
          <div>
            <p>负荷转供</p>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="endVal5"
                :duration="3000"
              ></countTo>
              <span>项</span>
            </div>
          </div>
        </div>
      </div>
      <div class="electric electric4">
        <p>多供电量</p>
        <div class="bottom">
          <div class="one">
            <countTo
              :startVal="startVal"
              :endVal="endVal6"
              :duration="3000"
            ></countTo>
            <span>千瓦时</span>
          </div>
        </div>
      </div>
    </div>
    <div class="infoMonitor bottom_right">
      <div class="head">
        <span>区县</span>
        <span>巡视任务</span>
        <span>已接单</span>
        <span>已完成</span>
        <span>进行中</span>
        <span>巡视完成率</span>
        <span>缺陷数量</span>
        <span>缺陷消除率</span>
      </div>
      <div class="sectionBox">
        <div>
          <section
            v-for="(item, index) in rightArr"
            :key="index"
            :class="{ on: index % 2 != 0, off: index % 2 == 0 }"
          >
            <span>{{ item.county }}</span>
            <span>{{ item.task }}</span>
            <span class="num">{{ item.received }}</span>
            <span class="num">{{ item.completed }}</span>
            <span class="num">{{ item.conduct }}</span>
            <span class="num">{{ item.completionRate }}</span>
            <span class="num">{{ item.defects }}</span>
            <span class="num">{{ item.eliminatioRate }}</span>
          </section>
          <section
            v-for="(item, index) in rightArr"
            :key="index + 'a'"
            :class="{ on: index % 2 != 0, off: index % 2 == 0 }"
          >
            <span>{{ item.county }}</span>
            <span>{{ item.task }}</span>
            <span class="num">{{ item.received }}</span>
            <span class="num">{{ item.completed }}</span>
            <span class="num">{{ item.conduct }}</span>
            <span class="num">{{ item.completionRate }}</span>
            <span class="num">{{ item.defects }}</span>
            <span class="num">{{ item.eliminatioRate }}</span>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import pyramid3dChart from "@/components/pyramid3d.vue";
import pie from "./pie.vue";
import countTo from "vue-count-to";
import axios from "axios";
export default {
  components: {
    // pyramid3dChart,
    pie,
    countTo,
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
  data() {
    return {
      pieShow: false,
      show: 0,
      seriesList: [],
      startVal: 0,
      endVal1: 0,
      endVal2: 0,
      endVal3: 0,
      endVal4: 0,
      endVal5: 0,
      endVal6: 0,
      option: {
        colors: ["#32BDF0", "#22CE8C", "#177DD1", "#CA6C3F", "#CC9F2B"],
        series: [
          {
            type: "pie",
            name: "计划来源分析",
            data: [
              // { name: "消缺", y: 25, h: 50 },
              // { name: "抢修", y: 19, h: 5 },
              // { name: "用户接火", y: 18, h: 5 },
              // { name: "配合用户检修", y: 15, h: 5 },
              // { name: "配网工程", y: 23, h: 5 },
            ],
          },
        ],
      },
      rightArr: [],
      zdata1: [], //周-检修执行计划数
      zdata2: [], //周-检修执行计划率
      ydata1: [], //月-检修执行计划数
      ydata2: [], //月-检修执行计划率
      ndata1: [], //年-检修执行计划数
      ndata2: [], //年-检修执行计划率
      xzhou: [], //x轴数据
      name: "",
    };
  },
  watch: {
    initData1(val) {
      this.zdata1 = val.screenTargetPart01Data[0].targetContent.yaxis;
      this.zdata2 = val.screenTargetPart01Data[1].targetContent.yaxis;
      this.ydata1 = val.screenTargetPart01Data[2].targetContent.yaxis;
      this.ydata2 = val.screenTargetPart01Data[3].targetContent.yaxis;
      this.ndata1 = val.screenTargetPart01Data[4].targetContent.yaxis;
      this.ndata2 = val.screenTargetPart01Data[5].targetContent.yaxis;
      this.xzhou = val.screenTargetPart01Data[5].targetContent.xaxis;
      this.endVal1 =
        +val.screenTargetPart02Data[0].targetContent[0].indicatorValue.split(
          "/"
        )[1];
      this.endVal2 =
        +val.screenTargetPart02Data[0].targetContent[1].indicatorValue.split(
          "/"
        )[1];
      this.endVal3 =
        +val.screenTargetPart02Data[0].targetContent[2].indicatorValue.split(
          "/"
        )[1];
      this.endVal4 =
        +val.screenTargetPart02Data[0].targetContent[4].indicatorValue.split(
          "/"
        )[1];
      this.endVal5 =
        +val.screenTargetPart02Data[0].targetContent[5].indicatorValue.split(
          "/"
        )[1];
      this.endVal6 =
        +val.screenTargetPart02Data[0].targetContent[6].indicatorValue.split(
          "/"
        )[1];
      this.name = val.targetGroupTitle;
      this.getIndex();
      // this.rightTopLeft(this.zdata1, this.zdata2, this.xzhou);
    },
    initData2(val) {
      // console.log("看看右边数据", val);
      this.rightArr = [];
      val.screenTargetPart01Data[1].targetContent.forEach((item, index) => {
        this.rightArr.push({
          id: index + 1,
          county: item.columnValue1.split("/")[1],
          task: item.columnValue2.split("/")[1],
          received: item.columnValue3.split("/")[1],
          completed: item.columnValue4.split("/")[1],
          conduct: item.columnValue5.split("/")[1],
          completionRate: item.columnValue6.split("/")[1],
          defects: item.columnValue7.split("/")[1],
          eliminatioRate: item.columnValue8.split("/")[1],
        });
      });
      this.option.series[0].data = [];
      let arr = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item, index) => {
        item["h"] = 5;
        arr.push(item.y);
        let max = Math.max(...arr);
        if (item.y == max) {
          item.h = 50;
        }
        this.option.series[0].data.push({
          name: item.name,
          y: item.y,
          h: item.h,
        });
        this.pieShow = true;
      });
      // console.log("fffff", this.option.series[0].data);
    },
  },
  mounted() {
    // console.log(this.option.series[0].data, "看看看立体如图");
  },
  methods: {
    getIndex() {
      axios
        .get("/JBTSHJ/GuYuanScreen/getScreenById/TableIndex", {
          params: { tarGetName: this.name },
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.show = data.data;
          }
          this.timetypechose(this.show);
          // console.log(this.show);
        });
    },
    timetypechose(val) {
      this.show = val;
      if (val === 1) {
        this.rightTopLeft(this.zdata1, this.zdata2, this.xzhou);
      } else if (val === 2) {
        this.rightTopLeft(this.ydata1, this.ydata2, this.xzhou);
      } else {
        this.rightTopLeft(this.ndata1, this.ndata2, this.xzhou);
      }
    },
    rightTopLeft(zxdata, zxldata, xdata) {
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
            fontSize: 20,
          },
          selectedMode: false,
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
              fontSize: 20,
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
            data: xdata,
            // data: ["原州区", "三营", "西吉", "彭阳", "隆德", "泾源"],
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
              show: true,
              width: 1,
              lineStyle: {
                type: "solid",
                color: "#00BFF3",
                opacity: 0.23,
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
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "检修执行计划率",
            type: "line",
            symbol: "circle",
            symbolSize: 12, //转折点的大小
            yAxisIndex: 0,
            z: 99,
            itemStyle: {
              normal: {
                color: "#fff ", //图例的颜色
                borderColor: "#FAD965",
                borderWidth: 3,
                lineStyle: {
                  color: "#78762E", //线的颜色
                },
                label: {
                  show: true,
                  color: "#B8AC34",
                  fontSize: 30,
                  fontFamily: "numFont",
                  position: "bottom",
                  formatter: "{@score}%",
                },
              },
            },
            // data: [65, 85, 90, 86, 90, 93], //data.values
            data: zxldata, //data.values
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
                      color: "#187363", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#012F36", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                label: {
                  show: true,
                  color: "#5AFFEA",
                  fontSize: 30,
                  fontFamily: "numFont",
                  position: "top",
                  offset: [0, -20],
                },
              },
            },

            data: zxdata,
          },
          {
            //柱子顶部圆片
            // name: "",
            type: "pictorialBar",
            symbolSize: [30, 15],
            symbolOffset: [0, -8],
            yAxisIndex: 1,
            symbol: "diamond",
            z: 12,
            itemStyle: {
              opacity: 1,
              color: "#7CEDDE",
            },
            symbolPosition: "end",
            data: zxdata,
          },
          {
            //柱子底部圆片
            // name: "",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [30, 15],
            symbolOffset: [0, 9],
            z: 10,
            yAxisIndex: 1,
            itemStyle: {
              opacity: 1,
              color: "#012F36",
            },
            data: zxdata,
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
  height: 100%;
  width: 100%;
}
.gridOverviewRightPart {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  display: flex;
  flex-wrap: wrap;
  .content {
    background-color: rgba(0, 11, 32, 0.26);
  }
  .bottom_right {
    height: 456px;
    overflow: hidden;
    position: relative;
    section {
      animation: fadeInLeftshow 2s;
    }
    .sectionBox {
      width: 100%;
      height: calc(100% - 85px);
      position: relative;
      overflow: hidden;

      div {
        width: 100%;
        position: absolute;
        animation: 20s move 2s infinite linear;
      }
      div:hover {
        animation-play-state: paused;
      }
    }
  }

  .infoMonitor {
    width: 50%;
    .boxTitle {
      position: relative;
    }
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
      height: 386px;
      display: flex;
      // align-items: center;
      justify-content: space-around;
      padding: 10px 24px 10px 24px;
      .left_chart {
        width: 100%;
        height: 100%;
        // background: url("/image/powerSupplyControl/rightTop_bg.png") no-repeat;
        background-position: center;
        .main_title {
          line-height: 70px;
          font-size: 24px;
          color: #ffffff;
          padding-left: 92px;
          padding-top: 10px;
        }
        .left_chart_content {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          align-items: center;
          height: 100%;
          padding: 10px;
          // padding-top: 70px;
          section {
            width: 49%;
            height: 50%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .left_img {
              width: 120px;
              height: 100%;
            }
            .right_info {
              width: 274px;
              height: 111px;
              background: url("/image/powerSupplyControl/rightTopSec_bg.png")
                no-repeat;
              background-position: 50% 60%;
              background-size: contain;
              text-align: center;
              padding-top: 10px;
              .title {
                font-size: 22px;
                font-weight: 400;
                color: #91d5ff;
                margin-bottom: 6px;
              }
              .num {
                font-size: 42px;
                span {
                  font-size: 20px;
                  color: #ffffff;
                  opacity: 0.85;
                  padding-left: 20px;
                }
              }
            }
          }
        }
      }
      .right_chart {
        width: 48%;
        height: 100%;
        // background: url("/image/powerSupplyControl/rightTop_bg.png") no-repeat;
        background-position: center;
        .title {
          line-height: 70px;
          font-size: 24px;
          color: #ffffff;
          padding-left: 92px;
          padding-top: 10px;
        }
        .right_chart_content {
          height: 100%;
          width: 100%;
          position: relative;
          .unit {
            position: absolute;
            top: 50px;
            left: 20px;
            font-size: 14px;
            color: #d3eeff;
          }
        }
      }
    }
    .head {
      margin-top: 10px;
      height: 75px;
      background: rgba(107, 232, 255, 0.25);
      // opacity: 0.25;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      span {
        color: #65d6ff;
        text-align: center;
      }
    }
    .on {
      background: rgba(255, 255, 255, 0.08);
    }
    .off {
      background: rgba(0, 0, 0, 0.2);
    }
    section {
      height: 74px;
      display: flex;
      align-items: center;
      // justify-content: space-evenly;
      position: relative;
      span {
        // width: 12.5%;
        text-align: center;
        font-size: 18px;
        position: absolute;
      }
      .num {
        font-size: 24px;
        font-family: "numFont";
      }
      span:nth-child(1) {
        left: 10px;
      }
      span:nth-child(2) {
        left: 100px;
      }
      span:nth-child(3) {
        left: 190px;
      }
      span:nth-child(4) {
        left: 274px;
      }
      span:nth-child(5) {
        left: 352px;
      }
      span:nth-child(6) {
        right: 260px;
      }
      span:nth-child(7) {
        right: 170px;
      }
      span:nth-child(8) {
        right: 35px;
      }
    }
  }
  .box {
    display: flex;
    flex-wrap: wrap;
    .electric {
      width: 360px;
      height: 208px;
      margin: 10px auto;
      position: relative;
      > p {
        font-size: 30px;
        position: absolute;
        top: 30px;
        left: 120px;
      }
      .bottom {
        width: 100%;
        height: 50%;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-around;
          > p {
            font-size: 24px;
          }
          > div {
            color: #48d2c4;
            > span:nth-child(1) {
              font-size: 40px;
              font-family: "numFont";
              margin-right: 20px;
            }
            > span:nth-child(2) {
              font-size: 20px;
            }
          }
        }
        .one {
          width: 100%;
          display: block;
          text-align: center;
          line-height: 104px;
          color: #48d2c4;
          > span:nth-child(1) {
            font-size: 60px;
            font-family: "numFont";
            margin-right: 20px;
          }
          > span:nth-child(2) {
            font-size: 20px;
          }
        }
      }
    }
    .electric1 {
      background: url("/image/distributionNetworkMaintenance/1.png");
    }
    .electric2 {
      background: url("/image/distributionNetworkMaintenance/2.png");
    }
    .electric3 {
      background: url("/image/distributionNetworkMaintenance/3.png");
    }
    .electric4 {
      background: url("/image/distributionNetworkMaintenance/4.png");
    }
  }
  .taskMonitor {
    .content {
      height: 386px;
      padding: 24px;
      display: flex;
      justify-content: space-around;
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
