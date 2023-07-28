<template>
  <div class="guaranteedPowerSupplyRightPart">
    <div class="box">
      <div class="title">
        <span>24小时负荷异常设备数（台）</span>
      </div>
      <div class="content" id="topleft_chart"></div>
    </div>
    <div class="box box2">
      <div class="title">
        <span>各区县当前用电负荷（万千瓦时）</span>
      </div>
      <div class="content" id="topright_chart"></div>
    </div>
    <div class="box box3">
      <div class="title">
        <span>专项运维工作安排</span>
        <!-- <p>当前可用抢修车辆（辆）：<span>200</span></p> -->
      </div>
      <div class="content" id="chart3">
        <div class="top"></div>
        <div class="title3">
          <span>序号</span>
          <span>任务</span>
          <span>用户名称</span>
          <span>保电人员</span>
          <span>当前进度</span>
          <span>保电开始时间</span>
          <span>保电结束时间</span>
          <span>消除隐患</span>
          <span>抢修车辆</span>
        </div>
        <div class="text" id="text">
          <div>
            <section
              v-for="(item, index) in bottomArr"
              :key="'aa' + item.index"
              :class="{ on: index % 2 != 0, off: index % 2 == 0 }"
            >
              <span>{{ item.index }}</span>
              <span>{{ item.work }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.people }}</span>
              <span>{{ item.progress }}</span>
              <span>{{ item.startTime }}</span>
              <span>{{ item.endTime }}</span>
              <span>{{ item.removeDanger }}</span>
              <span>{{ item.licensePlate }}</span>
            </section>
            <section
              v-for="(item, index) in bottomArr"
              :key="'bb' + item.index"
              :class="{ on: index % 2 != 0, off: index % 2 == 0 }"
            >
              <span>{{ item.index }}</span>
              <span>{{ item.work }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.people }}</span>
              <span>{{ item.progress }}</span>
              <span>{{ item.startTime }}</span>
              <span>{{ item.endTime }}</span>
              <span>{{ item.removeDanger }}</span>
              <span>{{ item.licensePlate }}</span>
            </section>
          </div>
        </div>
      </div>
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
    return {
      bottomArr: [
        {
          index: "01",
          work: "春节保电任务",
          name: "新百商场",
          people: "张三",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "13",
          licensePlate: "宁A45871",
        },
        {
          index: "02",
          work: "春节保电任务",
          name: "新百商场",
          people: "栗学",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "3",
          licensePlate: "宁A45871",
        },
        {
          index: "03",
          work: "春节保电任务",
          name: "新百商场",
          people: "上官梁",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "7",
          licensePlate: "宁A45871",
        },
        {
          index: "04",
          work: "春节保电任务",
          name: "新百商场",
          people: "展筠莎",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "7",
          licensePlate: "宁A45871",
        },
        {
          index: "05",
          work: "春节保电任务",
          name: "新百商场",
          people: "那强宜",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "3",
          licensePlate: "宁A45871",
        },
        {
          index: "06",
          work: "春节保电任务",
          name: "新百商场",
          people: "那强宜",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "3",
          licensePlate: "宁A45871",
        },
        {
          index: "07",
          work: "春节保电任务",
          name: "新百商场",
          people: "那强宜",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "3",
          licensePlate: "宁A45871",
        },
        {
          index: "08",
          work: "春节保电任务",
          name: "新百商场",
          people: "那强宜",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "3",
          licensePlate: "宁A45871",
        },
        {
          index: "09",
          work: "春节保电任务",
          name: "新百商场",
          people: "那强宜",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "3",
          licensePlate: "宁A45871",
        },
        {
          index: "10",
          work: "春节保电任务",
          name: "新百商场",
          people: "那强宜",
          progress: "进行中",
          startTime: "2022.01.10",
          endTime: "2022.03.15",
          removeDanger: "3",
          licensePlate: "宁A45871",
        },
      ],
    };
  },
  watch: {
    initData1(val) {
      //24小时负荷异常设备数
      this.fhXnumdata = val.screenTargetPart01Data.targetContent.xaxis;
      this.fhYnumdata = val.screenTargetPart01Data.targetContent.yaxis;
      this.topleft_chart(this.fhXnumdata, this.fhYnumdata);
      //各区县当前用电负荷
      this.ydfeXnumdata = val.screenTargetPart02Data.targetContent.xaxis;
      this.ydfeYnumdata = val.screenTargetPart02Data.targetContent.yaxis;
      this.topright_chart(this.ydfeXnumdata, this.ydfeYnumdata);
    },
    initData2(val) {
      // console.log("右边数据", val);
      this.bottomArr = [];
      val.screenTargetPart01Data.targetContent.forEach((item) => {
        this.bottomArr.push({
          index: item.columnValue1.split("/")[1],
          work: item.columnValue2.split("/")[1],
          name: item.columnValue3.split("/")[1],
          people: item.columnValue4.split("/")[1],
          progress: item.columnValue5.split("/")[1],
          startTime: item.columnValue6.split("/")[1],
          endTime: item.columnValue7.split("/")[1],
          removeDanger: item.columnValue8.split("/")[1],
          licensePlate: item.columnValue9.split("/")[1],
        });
      });
    },
  },
  mounted() {
    // this.topleft_chart();
    // this.topright_chart();
  },
  methods: {
    topleft_chart(fexdata, feydata) {
      let myChart = this.$echarts.init(
        document.getElementById("topleft_chart")
      );
      let xdata = fexdata;
      let data1 = feydata;
      myChart.setOption({
        xAxis: {
          type: "category",
          data: xdata,
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
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
            // max: 2.5,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, 0.36)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: "20px",
              },
            },
          },
        ],
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
        // legend: {
        //   itemWidth: 20,
        //   itemHeight: 12,
        //   icon: 'roundRect',
        //   left: 25,
        //   top: "10px",
        //   itemGap: 40,
        //   textStyle: {
        //     //图例文字的样式
        //     color: "#fff",
        //     fontSize: 14,
        //   },
        //   selectedMode: false,
        // },
        series: [
          {
            name: "线路",
            data: data1,
            type: "line",
            // smooth: true,
            symbolSize: 0,
            lineStyle: {
              color: "#CCBA16",
              width: 5,
            },
            color: "#CCBA16", //图例的颜色
            label: {
              show: false,
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
    topright_chart(ydfexdata, ydfeydata) {
      let myChart = this.$echarts.init(
        document.getElementById("topright_chart")
      );
      // let xData = ["区县01", "区县02", "区县03", "区县04", "区县05", "区县06"];
      // let data1 = [20, 30, 24, 24, 31, 22];
      let xData = ydfexdata;
      let data1 = ydfeydata;
      let option = {
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
            max: 50,
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
@keyframes move {
  0% {
    top: 0;
  }
  10% {
    top: 0;
  }
  100% {
    top: -90%;
  }
}
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

.guaranteedPowerSupplyRightPart {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1730px;
  display: flex;
  flex-wrap: wrap;
  .box {
    width: 849px;
    height: 460px;
    // background: url("/image/guaranteedPowerSupply/left_box.png") no-repeat;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // overflow: hidden;
    overflow: hidden;
    .title {
      background: url("/image/guaranteedPowerSupply/head_bg.png") no-repeat;
      // width: 1520px;
      height: 88px;
      // animation: myAnimation2 5s steps(1) infinite;
      // margin-top: 12px;
      line-height: 100px;
      > span {
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
    margin-left: 32px;
  }
  .box3 {
    width: 1730px;
    height: 459px;
    margin-top: 40px;
    overflow: hidden;
    position: relative;
    #chart3 {
      display: flex;
      flex-direction: column;
      align-items: center;
      .top {
        position: relative;
        width: 1656px;
        height: 29px;
        background: linear-gradient(
          180deg,
          rgba(69, 49, 1, 0) 0%,
          rgba(255, 228, 0, 0.69) 100%
        );
      }
      .top::before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        left: 0;
        top: 0;
        border-left: solid 80px #5b0502;
        border-bottom: solid 29px transparent;
      }
      .top::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        right: 0;
        top: 0;
        border-right: solid 80px #600c14;
        border-bottom: solid 29px transparent;
      }
      .title3 {
        width: 1656px;
        height: 51px;
        background: rgba(249, 255, 78, 0.25);
        // opacity: 0.25;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          color: #ffffff;
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
        width: 1656px;
        height: calc(100% - 100px);
        position: relative;
        overflow: hidden;
        div {
          position: absolute;
          animation: 5s move 3s infinite linear;
        }
        div:hover {
          animation-play-state: paused;
        }
        section {
          width: 1656px;
          height: 51px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          // position: absolute;
          span {
            width: 10%;
            text-align: center;
            font-size: 20px;
          }
        }
      }
    }
    .title {
      // line-height: 50px;
      // width: 100%;
      // background-position-x:0px ;
      position: relative;
      p {
        position: absolute;
        font-size: 20px;
        top: 0;
        right: 40px;
        display: flex;
        span {
          font-family: "numFont";
          font-size: 40px;
          color: #fff341;
        }
      }
    }
    .content {
      width: 1724px;
      height: 369px;
    }
  }
}
</style>
