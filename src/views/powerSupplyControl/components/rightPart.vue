<template>
  <div class="gridOverviewRightPart">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">保电完成情况</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="animate_container">
          <div class="left_chart">
            <div class="main_title">保电设备</div>
            <div class="left_chart_content">
              <section
                v-for="(item, index) in rightArr"
                :key="`${item.name}_${index}`"
              >
                <div
                  class="left_img"
                  :style="{
                    background: `url(${item.imgSrc})`,
                    backgroundPosition: 'center',
                  }"
                ></div>
                <div class="right_info">
                  <p class="title">{{ item.title }}</p>
                  <p class="num">
                    {{ item.num }}<span>{{ item.unit }}</span>
                  </p>
                </div>
              </section>
            </div>
          </div>
          <div class="right_chart">
            <div class="title">保电完成情况</div>
            <div class="right_chart_content">
              <div class="unit">单位：家</div>
              <pie
                :id="'topRightPie1'"
                :option="option"
                :arrdata="alldata"
              ></pie>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="taskMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">主要保电措施</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <flashAnimation />
        <div class="animate_container">
          <section
            v-for="(item, index) in rightStepArr"
            :key="`${item.title}_${index}`"
          >
            <div class="step_title">
              <p class="no">{{ item.index }}</p>
              <p class="title_info">{{ item.title }}</p>
            </div>
            <div class="step_content">
              <div class="step_content_pic">
                <div>
                  <img :src="item.leftPig" alt="" />
                </div>
                <div>
                  <img :src="item.rightPig" alt="" />
                </div>
              </div>
              <div class="step_content_info" v-html="item.info"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import pyramid3dChart from "@/components/pyramid3d.vue";
import pie from "@/components/pie.vue";
import flashAnimation from "@/components/flashAnimation.vue";
export default {
  components: {
    // pyramid3dChart,
    pie,
    flashAnimation,
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
      seriesList: [],
      rightArr: [
        {
          title: "330千伏变电站",
          num: 4,
          unit: "座",
          imgSrc: "/image/animationKeyFramesBg/elec.png",
        },
        {
          title: "110千伏变电站",
          num: 39,
          unit: "座",
          imgSrc: "/image/animationKeyFramesBg/elec2.png",
        },
        {
          title: "环网柜，开闭所",
          num: 76,
          unit: "个",
          imgSrc: "/image/animationKeyFramesBg/elec3.png",
        },
        {
          title: "保电线路",
          num: 122,
          unit: "条",
          imgSrc: "/image/animationKeyFramesBg/elec_line.png",
        },
      ],
      rightStepArr: [
        // {
        //   title: "合理安排电网运行方式",
        //   index: 1,
        //   info: "保电期间不安排保电线路及其上级电源的计划检修工作。<br>保持全接线前，保护方式运行",
        // },
        // {
        //   title: "对用户设备进行用电检查",
        //   index: 2,
        //   info: "加强对用电设备进行检查，对发现的供电隐患及时督促用户进行整改。<br>安排专人指导用户安装。",
        // },
        // {
        //   title: "制定保电应急处置预案",
        //   index: 3,
        //   info: "细化保电工作方案，逐一追溯保电场所对供电线路及其上级电源。<br>做到一点一案。",
        // },
        // {
        //   title: "督促落实保供电措施",
        //   index: 4,
        //   info: "加强组织领导，每一个保电场所指定一个保电负责人，及时解决保电期间对供电问题。",
        // },
      ],
      option: {
        colors: [
          "#3279D8",
          "#1C75D1",
          "#0DBA9F",
          "#30A95C",
          "#BDAE35",
          "#C57C37",
          "#D54953",
          "#972950",
        ],
        series: [
          {
            type: "pie",
            name: "保电完成情况",
            data: [
              { name: "党政", y: 58, h: 30 },
              { name: "通信", y: 26, h: 10 },
              { name: "学校", y: 26, h: 10 },
              { name: "新闻媒体", y: 26, h: 10 },
              { name: "购物中心", y: 26, h: 10 },
              { name: "游乐园", y: 26, h: 10 },
              { name: "医疗卫生", y: 26, h: 10 },
              { name: "其他", y: 26, h: 10 },
            ],
          },
        ],
      },
      alldata: [],
      option3D: {
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
              ["原州区", 35],
              ["西吉县", 8],
              ["彭阳县", 6],
              ["隆德县", 13],
              ["泾源县", 10],
              ["三营", 24],
            ],
          },
        ],
      },
    };
  },
  watch: {
    initData1(val) {
      this.rightArr[0].num =
        val.screenTargetPart01Data[0].targetContent[0].indicatorValue.split(
          "/"
        )[1];
      this.rightArr[1].num =
        val.screenTargetPart01Data[0].targetContent[1].indicatorValue.split(
          "/"
        )[1];
      this.rightArr[2].num =
        val.screenTargetPart01Data[0].targetContent[2].indicatorValue.split(
          "/"
        )[1];
      this.rightArr[3].num =
        val.screenTargetPart01Data[0].targetContent[3].indicatorValue.split(
          "/"
        )[1];
      this.option.series[0].data = [];
      val.screenTargetPart01Data[1].targetContent.forEach((item, index) => {
        if (index == 0) {
          this.option.series[0].data.push({
            name: item.name,
            y: item.y,
            h: 30,
          });
        } else if (index > 0 && index <= 7) {
          this.option.series[0].data.push({
            name: item.name,
            y: item.y,
            h: 10,
          });
        } else if (index > 7) {
          this.alldata.push({
            name: item.name,
            y: item.y,
          });
        }
      });
    },
    initData2(val) {
      // console.log("右边数据", val);
      this.rightStepArr = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item, index) => {
        this.rightStepArr.push({
          index: index + 1,
          title: item.columnValue1.split("/")[1],
          info: item.columnValue2.split("/")[1],
          leftPig: this.getUrl(item.columnValue3),
          rightPig: this.getUrl(item.columnValue4),
        });
      });
      // console.log("处理好的数组", this.rightStepArr);
    },
  },
  mounted() {},
  methods: {
    getUrl(val) {
      let arr = val.split("/");
      arr.shift();
      let newStr = arr.join("/");
      return newStr;
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes elecAnimation {
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
    background-position: 0px -200px;
  }
  8.87% {
    background-position: -200px -200px;
  }
  9.68% {
    background-position: -400px -200px;
  }
  10.48% {
    background-position: -600px -200px;
  }
  11.29% {
    background-position: -800px -200px;
  }
  12.10% {
    background-position: -1000px -200px;
  }
  12.90% {
    background-position: -1200px -200px;
  }
  13.71% {
    background-position: -1400px -200px;
  }
  14.52% {
    background-position: -1600px -200px;
  }
  15.32% {
    background-position: -1800px -200px;
  }
  16.13% {
    background-position: 0px -400px;
  }
  16.94% {
    background-position: -200px -400px;
  }
  17.74% {
    background-position: -400px -400px;
  }
  18.55% {
    background-position: -600px -400px;
  }
  19.35% {
    background-position: -800px -400px;
  }
  20.16% {
    background-position: -1000px -400px;
  }
  20.97% {
    background-position: -1200px -400px;
  }
  21.77% {
    background-position: -1400px -400px;
  }
  22.58% {
    background-position: -1600px -400px;
  }
  23.39% {
    background-position: -1800px -400px;
  }
  24.19% {
    background-position: 0px -600px;
  }
  25.00% {
    background-position: -200px -600px;
  }
  25.81% {
    background-position: -400px -600px;
  }
  26.61% {
    background-position: -600px -600px;
  }
  27.42% {
    background-position: -800px -600px;
  }
  28.23% {
    background-position: -1000px -600px;
  }
  29.03% {
    background-position: -1200px -600px;
  }
  29.84% {
    background-position: -1400px -600px;
  }
  30.65% {
    background-position: -1600px -600px;
  }
  31.45% {
    background-position: -1800px -600px;
  }
  32.26% {
    background-position: 0px -800px;
  }
  33.06% {
    background-position: -200px -800px;
  }
  33.87% {
    background-position: -400px -800px;
  }
  34.68% {
    background-position: -600px -800px;
  }
  35.48% {
    background-position: -800px -800px;
  }
  36.29% {
    background-position: -1000px -800px;
  }
  37.10% {
    background-position: -1200px -800px;
  }
  37.90% {
    background-position: -1400px -800px;
  }
  38.71% {
    background-position: -1600px -800px;
  }
  39.52% {
    background-position: -1800px -800px;
  }
  40.32% {
    background-position: 0px -1000px;
  }
  41.13% {
    background-position: -200px -1000px;
  }
  41.94% {
    background-position: -400px -1000px;
  }
  42.74% {
    background-position: -600px -1000px;
  }
  43.55% {
    background-position: -800px -1000px;
  }
  44.35% {
    background-position: -1000px -1000px;
  }
  45.16% {
    background-position: -1200px -1000px;
  }
  45.97% {
    background-position: -1400px -1000px;
  }
  46.77% {
    background-position: -1600px -1000px;
  }
  47.58% {
    background-position: -1800px -1000px;
  }
  48.39% {
    background-position: 0px -1200px;
  }
  49.19% {
    background-position: -200px -1200px;
  }
  50.00% {
    background-position: -400px -1200px;
  }
  50.81% {
    background-position: -600px -1200px;
  }
  51.61% {
    background-position: -800px -1200px;
  }
  52.42% {
    background-position: -1000px -1200px;
  }
  53.23% {
    background-position: -1200px -1200px;
  }
  54.03% {
    background-position: -1400px -1200px;
  }
  54.84% {
    background-position: -1600px -1200px;
  }
  55.65% {
    background-position: -1800px -1200px;
  }
  56.45% {
    background-position: 0px -1400px;
  }
  57.26% {
    background-position: -200px -1400px;
  }
  58.06% {
    background-position: -400px -1400px;
  }
  58.87% {
    background-position: -600px -1400px;
  }
  59.68% {
    background-position: -800px -1400px;
  }
  60.48% {
    background-position: -1000px -1400px;
  }
  61.29% {
    background-position: -1200px -1400px;
  }
  62.10% {
    background-position: -1400px -1400px;
  }
  62.90% {
    background-position: -1600px -1400px;
  }
  63.71% {
    background-position: -1800px -1400px;
  }
  64.52% {
    background-position: 0px -1600px;
  }
  65.32% {
    background-position: -200px -1600px;
  }
  66.13% {
    background-position: -400px -1600px;
  }
  66.94% {
    background-position: -600px -1600px;
  }
  67.74% {
    background-position: -800px -1600px;
  }
  68.55% {
    background-position: -1000px -1600px;
  }
  69.35% {
    background-position: -1200px -1600px;
  }
  70.16% {
    background-position: -1400px -1600px;
  }
  70.97% {
    background-position: -1600px -1600px;
  }
  71.77% {
    background-position: -1800px -1600px;
  }
  72.58% {
    background-position: 0px -1800px;
  }
  73.39% {
    background-position: -200px -1800px;
  }
  74.19% {
    background-position: -400px -1800px;
  }
  75.00% {
    background-position: -600px -1800px;
  }
  75.81% {
    background-position: -800px -1800px;
  }
  76.61% {
    background-position: -1000px -1800px;
  }
  77.42% {
    background-position: -1200px -1800px;
  }
  78.23% {
    background-position: -1400px -1800px;
  }
  79.03% {
    background-position: -1600px -1800px;
  }
  79.84% {
    background-position: -1800px -1800px;
  }
  80.65% {
    background-position: 0px -2000px;
  }
  81.45% {
    background-position: -200px -2000px;
  }
  82.26% {
    background-position: -400px -2000px;
  }
  83.06% {
    background-position: -600px -2000px;
  }
  83.87% {
    background-position: -800px -2000px;
  }
  84.68% {
    background-position: -1000px -2000px;
  }
  85.48% {
    background-position: -1200px -2000px;
  }
  86.29% {
    background-position: -1400px -2000px;
  }
  87.10% {
    background-position: -1600px -2000px;
  }
  87.90% {
    background-position: -1800px -2000px;
  }
  88.71% {
    background-position: 0px -2200px;
  }
  89.52% {
    background-position: -200px -2200px;
  }
  90.32% {
    background-position: -400px -2200px;
  }
  91.13% {
    background-position: -600px -2200px;
  }
  91.94% {
    background-position: -800px -2200px;
  }
  92.74% {
    background-position: -1000px -2200px;
  }
  93.55% {
    background-position: -1200px -2200px;
  }
  94.35% {
    background-position: -1400px -2200px;
  }
  95.16% {
    background-position: -1600px -2200px;
  }
  95.97% {
    background-position: -1800px -2200px;
  }
  96.77% {
    background-position: 0px -2400px;
  }
  97.58% {
    background-position: -200px -2400px;
  }
  98.39% {
    background-position: -400px -2400px;
  }
  99.19% {
    background-position: -600px -2400px;
  }
  100.00% {
    background-position: -800px -2400px;
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
  height: calc(100% - 40px);
  width: 100%;
}
.gridOverviewRightPart {
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
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 24px 10px 24px;
        flex-wrap: wrap;
      }
      .left_chart {
        width: 48%;
        height: 100%;
        background: url("/image/powerSupplyControl/rightTop_bg.png") no-repeat;
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
          height: calc(100% - 84px);
          padding: 10px;
          // padding-top: 70px;
          section {
            width: 49%;
            height: 50%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-left: 120px;
            position: relative;
            .left_img {
              // width: 120px;
              // height: 100%;
              position: absolute;
              top: -40px;
              left: -45px;
              width: 200px;
              height: 200px;
              animation: elecAnimation 5s steps(1) infinite;
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
        background: url("/image/powerSupplyControl/rightTop_bg.png") no-repeat;
        background-position: center;
        .title {
          line-height: 70px;
          font-size: 24px;
          color: #ffffff;
          padding-left: 92px;
          padding-top: 10px;
        }
        .right_chart_content {
          height: calc(100% - 90px);
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
        align-items: center;
        flex-wrap: wrap;
        padding: 24px;
      }
      section {
        width: 352px;
        height: 100%;
        cursor: pointer;
        .step_title {
          display: flex;
          height: 60px;
          background: url("/image/powerSupplyControl/right_bottom_title.png")
            no-repeat;
          background-position: center;
          font-size: 22px;
          color: #ffffff;
          font-weight: 400;
          line-height: 66px;
          .no {
            width: 64px;
            text-align: center;
            -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
          }
          .title_info {
            padding-left: 10px;
          }
        }
        .step_content {
          background: url("/image/powerSupplyControl/chart_bg1.png") no-repeat;
          background-position: 32% 50%;
          width: 100%;
          height: 270px;
          padding: 20px;
          color: #ffffff;
          .step_content_pic {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            margin-top: 10px;
            padding-right: 10px;
            div {
              width: 144px;
              height: 97px;
              background-color: rgba($color: #000000, $alpha: 0.2);
              img {
                width: 144px;
                height: 97px;
              }
            }
          }
          .step_content_info {
            opacity: 0.8;
            line-height: 25px;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>
