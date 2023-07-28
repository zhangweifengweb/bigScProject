<template>
  <div class="industryExpansionControlLeftPart">
    <div class="resources">
      <div class="topLeft">
        <div class="boxTitle">
          <div class="colorside"></div>
          <div class="title">{{title1}}</div>
          <!-- <div class="img"></div> -->
        </div>
        <div class="content">
          <div id="topLeftChart"></div>
        </div>
      </div>
      <div class="topRight">
        <div class="boxTitle">
          <div class="colorside"></div>
          <div class="title">{{title2}}</div>
          <!-- <div class="img"></div> -->
        </div>
        <div class="content">
          <div id="topRightChart"></div>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{title3}}</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="animate_container">
          <div class="left_chart">
            <div id="bottomChart"></div>
          </div>
          <!-- <div class="split_line"></div> -->
          <div class="right_chart">
            <div v-for="(item,index) in bottomArr" :key="index">
              <div :class="'left'+(index+1)"></div>
              <div class="right">
                <span>{{item.name}}</span>
                <p><span>{{item.value}}</span>{{item.unit2}}</p>
                <div class="heng"></div>
                <div class="heng2"></div>
              </div>
            </div>
          </div>
        </div>
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
      this.gxAxis = val.screenTargetPart01Data[0].targetContent.xaxis
      this.gjyAxis = val.screenTargetPart01Data[0].targetContent.yaxis
      this.gqyAxis = val.screenTargetPart01Data[1].targetContent.yaxis
      this.dxAxis = val.screenTargetPart02Data[0].targetContent.xaxis
      this.djyAxis = val.screenTargetPart02Data[0].targetContent.yaxis
      this.dqyAxis = val.screenTargetPart02Data[1].targetContent.yaxis
      this.title1 = val.screenTargetPart01Data[0].targetTitle
      this.title2 = val.screenTargetPart02Data[0].targetTitle
      this.name1 = val.screenTargetPart01Data[0].targetTabTitle
      this.name2 = val.screenTargetPart01Data[1].targetTabTitle
      this.name3 = val.screenTargetPart02Data[0].targetTabTitle
      this.name4 = val.screenTargetPart02Data[1].targetTabTitle
      this.topLeftChart();
      this.topRightChart();
    },
    initData2(val){
      this.zxAxis = val.screenTargetPart01Data[0].targetContent.xaxis
      this.gzyAxis = val.screenTargetPart01Data[0].targetContent.yaxis
      this.dzyAxis = val.screenTargetPart01Data[1].targetContent.yaxis
      this.title3 = val.screenTargetPart01Data[0].targetTitle
      this.name5 = val.screenTargetPart01Data[0].targetTabTitle
      this.name6 = val.screenTargetPart01Data[1].targetTabTitle
      this.bottomChart();
      this.bottomArr = val.screenTargetPart02Data[0].targetContent
      this.bottomArr.forEach(item=>{
        item.name = item.indicatorName.split('/')[1]
        item.value = item.indicatorValue.split('/')[1]
        item.unit2 = item.unit.split('/')[1]
      })
      console.log(this.bottomArr)
    }
  },
  data() {
    return {
      gxAxis:[],//高压报装数量 X轴
      gjyAxis:[],//高压今年 y
      gqyAxis:[],//高压去年 y
      dxAxis:[],//低压报装数量 X轴
      djyAxis:[],//低压今年 y
      dqyAxis:[],//低压去年 y
      zxAxis:[],//总量 x
      gzyAxis:[],//高压总量 y
      dzyAxis:[],//低压总量 y
      title1:'',
      title2:'',
      title3:'',
      name1:'',
      name2:'',
      name3:'',
      name4:'',
      name5:'',
      name6:'',
      bottomArr:[]
    };
  },
  mounted() {},
  methods: {
    topLeftChart() {
      let myChart = this.$echarts.init(document.getElementById("topLeftChart"));
      let xData = this.gxAxis;
      let data1 = this.gjyAxis,
        data2 = this.gqyAxis;
      let option = {
        title: {
          text: "单位: 户",
          left: 40,
          top: "35px",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 100,
          },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 80,
          bottom: 50,
          right: 80,
          textStyle: {
            color: "#D3EEFF",
          },
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
              params[0].name +
              "<br>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#54FD69;'></span> " +
              params[0].seriesName +
              ": " +
              params[0].value +
              "户" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F96AFF;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "户"
            );
          },
        },
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
          left: 40,
          top: "10px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
          },
          // data: ["三级作业风险", "四级作业风险", "五级作业风险"],
          selectedMode: false,
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
            max: 80,
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
              color: "#BDCEE5",
              fontSize: 14,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: this.name1,
            type: "bar",
            barMaxWidth: 24,
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
                      color: "#56CB67", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#37A56B", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#54FD69",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: this.name2,
            type: "bar",
            barMaxWidth: 24,
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
                      color: "#AA4CB0", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#402C62", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#F96AFF",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: this.name2,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#FFA1E1",
            data: data2,
          },
          {
            name: this.name1,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#AEFFA4",
            data: data1,
          },
          {
            name: this.name2,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#3C2B5F",
            data: data2,
          },
          {
            name: this.name1,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#37A56B",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    topRightChart() {
      let myChart = this.$echarts.init(
        document.getElementById("topRightChart")
      );
      let xData = this.dxAxis;
      let data1 = this.djyAxis,
        data2 = this.dqyAxis;
      let option = {
        title: {
          text: "单位: 户",
          left: 40,
          top: "35px",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 100,
          },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 80,
          bottom: 50,
          right: 80,
          textStyle: {
            color: "#D3EEFF",
          },
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
              params[0].name +
              "<br>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#50E9F2;'></span> " +
              params[0].seriesName +
              ": " +
              params[0].value +
              "户" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F96AFF;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "户"
            );
          },
        },
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
          left: 40,
          top: "10px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
          },
          // data: ["三级作业风险", "四级作业风险", "五级作业风险"],
          selectedMode: false,
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
            max: 80,
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
              color: "#BDCEE5",
              fontSize: 14,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: this.name3,
            type: "bar",
            barMaxWidth: 24,
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
                      color: "#53EDF4", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#0271A9", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#50E9F2",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: this.name4,
            type: "bar",
            barMaxWidth: 24,
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
                      color: "#AA4CB0", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#402C62", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#F96AFF",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: this.name4,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#FFA1E1",
            data: data2,
          },
          {
            name: this.name3,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#9BE5FF",
            data: data1,
          },
          {
            name: this.name4,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#3C2B5F",
            data: data2,
          },
          {
            name: this.name3,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#0271A9",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    bottomChart() {
      let myChart = this.$echarts.init(document.getElementById("bottomChart"));
      let xData = this.zxAxis;
      let data1 = this.gzyAxis,
        data2 = this.dzyAxis;
      let option = {
        title: {
          text: "单位: 户",
          left: 40,
          top: "35px",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 100,
          },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 80,
          bottom: 50,
          right: 50,
          textStyle: {
            color: "#D3EEFF",
          },
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
              params[0].name +
              "<br>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#54FD69;'></span> " +
              params[0].seriesName +
              ": " +
              params[0].value +
              "户" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6AFBFF;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "户"
            );
          },
        },
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
          left: 40,
          top: "10px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
          },
          // data: ["三级作业风险", "四级作业风险", "五级作业风险"],
          selectedMode: false,
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
            max: 200,
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
              color: "#BDCEE5",
              fontSize: 14,
              // fontFamily: "numFont",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: this.name5,
            type: "bar",
            barMaxWidth: 12,
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
                      color: "#56CB67", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#37A56B", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#54FD69",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: this.name6,
            type: "bar",
            barMaxWidth: 12,
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
                      color: "#53EDF4", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#0271A9", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#50E9F2",
                    fontFamily: "numFont",
                    fontSize: 30,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: this.name6,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [12, 10],
            symbolOffset: [9, -5],
            symbolPosition: "end",
            z: 12,
            color: "#9BE5FF",
            data: data2,
          },
          {
            name: this.name5,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [12, 10],
            symbolOffset: [-9, -5],
            symbolPosition: "end",
            z: 12,
            color: "#AEFFA4",
            data: data1,
          },
          {
            name: this.name6,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [12, 10],
            symbolOffset: [9, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#0271A9",
            data: data2,
          },
          {
            name: this.name5,
            type: "pictorialBar",
            // symbol: "diamond",
            symbolSize: [12, 10],
            symbolOffset: [-9, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#37A56B",
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
@keyframes brAnimation {
	0% { background-position: 0px 0px; }
	0.81% { background-position: -400px 0px; }
	1.61% { background-position: -800px 0px; }
	2.42% { background-position: -1200px 0px; }
	3.23% { background-position: -1600px 0px; }
	4.03% { background-position: -2000px 0px; }
	4.84% { background-position: -2400px 0px; }
	5.65% { background-position: -2800px 0px; }
	6.45% { background-position: -3200px 0px; }
	7.26% { background-position: -3600px 0px; }
	8.06% { background-position: -4000px 0px; }
	8.87% { background-position: -4400px 0px; }
	9.68% { background-position: 0px -400px; }
	10.48% { background-position: -400px -400px; }
	11.29% { background-position: -800px -400px; }
	12.10% { background-position: -1200px -400px; }
	12.90% { background-position: -1600px -400px; }
	13.71% { background-position: -2000px -400px; }
	14.52% { background-position: -2400px -400px; }
	15.32% { background-position: -2800px -400px; }
	16.13% { background-position: -3200px -400px; }
	16.94% { background-position: -3600px -400px; }
	17.74% { background-position: -4000px -400px; }
	18.55% { background-position: -4400px -400px; }
	19.35% { background-position: 0px -800px; }
	20.16% { background-position: -400px -800px; }
	20.97% { background-position: -800px -800px; }
	21.77% { background-position: -1200px -800px; }
	22.58% { background-position: -1600px -800px; }
	23.39% { background-position: -2000px -800px; }
	24.19% { background-position: -2400px -800px; }
	25.00% { background-position: -2800px -800px; }
	25.81% { background-position: -3200px -800px; }
	26.61% { background-position: -3600px -800px; }
	27.42% { background-position: -4000px -800px; }
	28.23% { background-position: -4400px -800px; }
	29.03% { background-position: 0px -1200px; }
	29.84% { background-position: -400px -1200px; }
	30.65% { background-position: -800px -1200px; }
	31.45% { background-position: -1200px -1200px; }
	32.26% { background-position: -1600px -1200px; }
	33.06% { background-position: -2000px -1200px; }
	33.87% { background-position: -2400px -1200px; }
	34.68% { background-position: -2800px -1200px; }
	35.48% { background-position: -3200px -1200px; }
	36.29% { background-position: -3600px -1200px; }
	37.10% { background-position: -4000px -1200px; }
	37.90% { background-position: -4400px -1200px; }
	38.71% { background-position: 0px -1600px; }
	39.52% { background-position: -400px -1600px; }
	40.32% { background-position: -800px -1600px; }
	41.13% { background-position: -1200px -1600px; }
	41.94% { background-position: -1600px -1600px; }
	42.74% { background-position: -2000px -1600px; }
	43.55% { background-position: -2400px -1600px; }
	44.35% { background-position: -2800px -1600px; }
	45.16% { background-position: -3200px -1600px; }
	45.97% { background-position: -3600px -1600px; }
	46.77% { background-position: -4000px -1600px; }
	47.58% { background-position: -4400px -1600px; }
	48.39% { background-position: 0px -2000px; }
	49.19% { background-position: -400px -2000px; }
	50.00% { background-position: -800px -2000px; }
	50.81% { background-position: -1200px -2000px; }
	51.61% { background-position: -1600px -2000px; }
	52.42% { background-position: -2000px -2000px; }
	53.23% { background-position: -2400px -2000px; }
	54.03% { background-position: -2800px -2000px; }
	54.84% { background-position: -3200px -2000px; }
	55.65% { background-position: -3600px -2000px; }
	56.45% { background-position: -4000px -2000px; }
	57.26% { background-position: -4400px -2000px; }
	58.06% { background-position: 0px -2400px; }
	58.87% { background-position: -400px -2400px; }
	59.68% { background-position: -800px -2400px; }
	60.48% { background-position: -1200px -2400px; }
	61.29% { background-position: -1600px -2400px; }
	62.10% { background-position: -2000px -2400px; }
	62.90% { background-position: -2400px -2400px; }
	63.71% { background-position: -2800px -2400px; }
	64.52% { background-position: -3200px -2400px; }
	65.32% { background-position: -3600px -2400px; }
	66.13% { background-position: -4000px -2400px; }
	66.94% { background-position: -4400px -2400px; }
	67.74% { background-position: 0px -2800px; }
	68.55% { background-position: -400px -2800px; }
	69.35% { background-position: -800px -2800px; }
	70.16% { background-position: -1200px -2800px; }
	70.97% { background-position: -1600px -2800px; }
	71.77% { background-position: -2000px -2800px; }
	72.58% { background-position: -2400px -2800px; }
	73.39% { background-position: -2800px -2800px; }
	74.19% { background-position: -3200px -2800px; }
	75.00% { background-position: -3600px -2800px; }
	75.81% { background-position: -4000px -2800px; }
	76.61% { background-position: -4400px -2800px; }
	77.42% { background-position: 0px -3200px; }
	78.23% { background-position: -400px -3200px; }
	79.03% { background-position: -800px -3200px; }
	79.84% { background-position: -1200px -3200px; }
	80.65% { background-position: -1600px -3200px; }
	81.45% { background-position: -2000px -3200px; }
	82.26% { background-position: -2400px -3200px; }
	83.06% { background-position: -2800px -3200px; }
	83.87% { background-position: -3200px -3200px; }
	84.68% { background-position: -3600px -3200px; }
	85.48% { background-position: -4000px -3200px; }
	86.29% { background-position: -4400px -3200px; }
	87.10% { background-position: 0px -3600px; }
	87.90% { background-position: -400px -3600px; }
	88.71% { background-position: -800px -3600px; }
	89.52% { background-position: -1200px -3600px; }
	90.32% { background-position: -1600px -3600px; }
	91.13% { background-position: -2000px -3600px; }
	91.94% { background-position: -2400px -3600px; }
	92.74% { background-position: -2800px -3600px; }
	93.55% { background-position: -3200px -3600px; }
	94.35% { background-position: -3600px -3600px; }
	95.16% { background-position: -4000px -3600px; }
	95.97% { background-position: -4400px -3600px; }
	96.77% { background-position: 0px -4000px; }
	97.58% { background-position: -400px -4000px; }
	98.39% { background-position: -800px -4000px; }
	99.19% { background-position: -1200px -4000px; }
	100.00% { background-position: -1600px -4000px; }
}


#bottomLeftPie {
  width: 100%;
  height: 100%;
}
.industryExpansionControlLeftPart {
  position: absolute;
  top: 88px;
  left: 48px;
  width: 1458px;
  .content {
    background: RGBA(5, 38, 77, 0.6);
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
    display: flex;
    > div {
      width: 50%;
    }
    .content {
      height: 386px;
      position: relative;
      overflow: hidden;
      background: RGBA(5, 38, 77, 0.6);
      div {
        width: 100%;
        height: 100%;
      }
    }
  }
  .maintenance {
    .content {
      height: 386px;
      position: relative;
      overflow: hidden;
      .animate_container {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        // padding: 30px 67px 10px 67px;
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
      .left_chart {
        width: 50%;
        height: 100%;
        div {
          width: 100%;
          height: 100%;
        }
      }
      .right_chart {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        > div {
          width: 100%;
          height: 149px;
          display: flex;
          justify-content: space-around;
          position: relative;
          .left1 {
            width: 400px;
            height: 400px;
            // animation: brAnimation 5s steps(1) infinite;
            background: url("/image/industryExpansionControl/br11.png") no-repeat;
            position: absolute;
            top: -120px;
            left: -95px;
          }
          .left2 {
            width: 400px;
            height: 400px;
            // animation: brAnimation 5s steps(1) infinite;
            background: url("/image/industryExpansionControl/br22.png") no-repeat;
            position: absolute;
            top: -140px;
            left: -95px;
          }
          .right {
            height: 149px;
            width: 471px;
            background: url("/image/industryExpansionControl/br3.png") no-repeat;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            position: absolute;
            top: 0;
            right: 29px;
            > span {
              font-size: 24px;
              color: #91d5ff;
            }
            p {
              font-size: 20px;
              span {
                font-family: "numFont";
                font-size: 50px;
                color: #45ffff;
                margin-right: 20px;
              }
            }
            .heng {
              width: 235px;
              height: 6px;
              background: rgba(0, 188, 255, 0.4);
            }
            .heng2 {
              width: 266px;
              height: 6px;
              background: rgba(0, 188, 255, 0.1);
            }
          }
        }
      }
    }
  }
}
</style>