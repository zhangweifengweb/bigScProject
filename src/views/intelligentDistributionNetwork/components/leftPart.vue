<template>
  <div class="intelligentDistributionNetworkLeftPart">
    <div class="top">
      <div class="title"></div>
      <div class="content">
        <div id="topChart1"></div>
        <div id="topChart2"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="title"></div>
      <div class="content">
        <div class="bottomChart1box">
          <div id="bottomChart1"></div>
        </div>
        <div class="bottomRight">
          <div class="bottomRight1">
            <p>{{item1.title}}</p>
            <div>
              <div><span>{{item1.value1}}</span>{{item1.unit1}}</div>
              <div><span>{{item1.value2}}</span>{{item1.unit2}}</div>
            </div>
          </div>
          <div class="bottomRight2">
            <p>{{item2.title}}</p>
            <div>
              <div><span>{{item2.value1}}</span>{{item2.unit1}}</div>
              <div><span>{{item2.value2}}</span>{{item2.unit2}}</div>
            </div>
          </div>
          <div class="bottomRight3">
            <p>{{item3.title}}</p>
            <div>
              <div><span>{{item3.value1}}</span>{{item3.unit1}}</div>
              <div><span>{{item3.value2}}</span>{{item3.unit2}}</div>
            </div>
          </div>
          <div class="bottomRight4">
            <p>{{item4.title}}</p>
            <div>
              <div><span>{{item4.value1}}</span>{{item4.unit1}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      xAxis1:[],
      yAxis1:[],
      xAxis2:[],
      yAxis2:[],
      xAxis3:[],
      yAxis3:[],
      item1:{},
      item2:{},
      item3:{},
      item4:{},
    }
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
  watch:{
    initData(val){
      // console.log(val)
      this.xAxis1=val.screenTargetPart01Data[0].targetContent.xaxis
      this.yAxis1=val.screenTargetPart01Data[0].targetContent.yaxis
      this.xAxis2=val.screenTargetPart01Data[1].targetContent.xaxis
      val.screenTargetPart01Data[1].targetContent.yaxis.forEach(item=>{
        this.yAxis2.push(item.replace('%',"")) ;
      })
      // console.log(this.yAxis2);
      this.topChart1();
      this.topChart2();
    },
    initData2(val){
      this.xAxis3=val.screenTargetPart01Data[0].targetContent.xaxis
      val.screenTargetPart01Data[0].targetContent.yaxis.forEach(item=>{
        this.yAxis3.push(item.replace('%',"")) ;
      })
      this.bottomChart1();
      let data = val.screenTargetPart02Data[0].targetContent
      data.forEach((item)=>{
        item.title=item.columnValue1.split('/')[1]
        item.value1=item.columnValue2.split('/')[1]
        item.unit1=item.columnValue3.split('/')[1]
        if(item.columnValue4 && item.columnValue4 !='' && item.columnValue5 && item.columnValue5 !=''){
          item.value2=item.columnValue4.split('/')[1]
        item.unit2=item.columnValue5.split('/')[1]
        }
      })
      this.item1=data[0]
      this.item2=data[1]
      this.item3=data[2]
      this.item4=data[3]
    }
  },
  mounted() {
    
  },
  methods: {
    topChart1() {
      let myChart = this.$echarts.init(document.getElementById("topChart1"));
      let xData = this.xAxis1;
      let data1 = this.yAxis1;
      let option = {
        title: {
          text: `终端数量\n单位: 台`,
          left: "35",
          top: "0",
          textStyle: {
            color: "#fff",
            fontSize: 20,
            fontWeight: 400,
          },
        },
        grid: {
          borderWidth: 0,
          top: 60,
          left: 100,
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
            // max: 3000,
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
              color: "#999999",
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
                      color: "#00C6FB", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#005BEA", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  distance: 20,
                  textStyle: {
                    //数值样式
                    color: "#00FFF8",
                    fontFamily: "numFont",
                    fontSize: 24,
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
            color: "#0087C9",
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
            color: "#005FEB",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    topChart2() {
      let myChart = this.$echarts.init(document.getElementById("topChart2"));
      let xData = this.xAxis2;
      let data1 = this.yAxis2;
      // console.log(xData,data1);
      let option = {
        title: {
          text: `各区县终端在线率`,
          left: "35",
          top: "0",
          textStyle: {
            color: "#fff",
            fontSize: 20,
            fontWeight: 400,
          },
        },
        grid: {
          borderWidth: 0,
          top: 60,
          left: 100,
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
            // max: 100,
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
              color: "#999999",
              fontSize: 18,
              formatter: "{value}%",
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
                      color: "#00C6FB", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#005BEA", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  distance: 20,
                  formatter: function (v) {
                    var val = v.data;
                    return val + "%";
                  },
                  textStyle: {
                    //数值样式
                    color: "#00FFF8",
                    fontFamily: "numFont",
                    fontSize: 24,
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
            color: "#0087C9",
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
            color: "#005FEB",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    bottomChart1() {
      let myChart = this.$echarts.init(document.getElementById("bottomChart1"));
      let yData = this.xAxis3;
      let data1 = this.yAxis3;
      let option = {
        grid: {
          left: "15%",
          right: "5%",
          bottom: "0",
          top: "5%",
          containLabel: true,
        },
        // backgroundColor: "#101129",
        xAxis: {
          show: false,
          type: "value",
          max: 100,
        },
        yAxis: [
          {
            type: "category",
            offset: 60,
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: "20",
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: yData,
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "#205692",
              borderRadius: 30,
            },
            label: {
              show: true,
              offset: [-10, -4],
              position: "insideRight",
              formatter: "{@score}%",
              textStyle: {
                color: "#fff",
                fontSize: "24",
                fontFamily: "numFont",
              },
            },
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#04aadc",
              },
            },
            barWidth: 20,
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
.intelligentDistributionNetworkLeftPart {
  position: absolute;
  top: 88px;
  left: 48px;
  width: 1458px;
  height: 920px;
  background: linear-gradient(
    180deg,
    rgba(0, 91, 234, 0.1) 0%,
    rgba(0, 198, 251, 0.1) 100%
  );
  display: flex;
  flex-direction: column;
  > div {
    height: 50%;
    .title {
      height: 77px;
    }
    .content {
      height: calc(100% - 77px);
      display: flex;
      > div {
        width: 50%;
        height: 100%;
        #bottomChart1 {
          width: 633px;
          height: 379px;
          margin: 0 auto;
          background: url("/image/intelligentDistributionNetwork/bottomChart1.png")
            no-repeat;
        }
      }
    }
  }
  .top {
    background: url("/image/intelligentDistributionNetwork/leftTop.png")
      no-repeat;
    background-size: 100% 100%;
  }
  .bottom {
    background: url("/image/intelligentDistributionNetwork/leftBottom.png")
      no-repeat;
    .bottomRight {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      > div {
        width: 316px;
        height: 185px;
        p {
          margin-left: 106px;
          margin-top: 28px;
          font-size: 26px;
          color: #a1b7c7;
        }
        > div {
          width: 294px;
          height: 81px;
          margin: 38px auto;
          display: flex;
          > div {
            width: 50%;
            height: 100%;
            font-size: 24px;
            color: #5affea;
            text-align: center;
            span {
              font-size: 60px;
              font-family: "numFont";
              margin-right: 20px;
            }
          }
        }
      }
      .bottomRight1 {
        background: url("/image/intelligentDistributionNetwork/bottomRight1.png")
          no-repeat;
      }
      .bottomRight2 {
        background: url("/image/intelligentDistributionNetwork/bottomRight2.png")
          no-repeat;
      }
      .bottomRight3 {
        background: url("/image/intelligentDistributionNetwork/bottomRight3.png")
          no-repeat;
      }
      .bottomRight4 {
        background: url("/image/intelligentDistributionNetwork/bottomRight4.png")
          no-repeat;
      }
    }
  }
}
</style>