<template>
  <div class="operationIndexMonitoringRightPart">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">线路负载top5 & 配电变压器负载率top5</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div id="leftChart"></div>
        <div id="rightChart"></div>
      </div>
    </div>
    <div class="taskMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">固原 10 千伏配网线路负载分布情况</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in pieTitle" :key="index">
            <div :class="item.class" id="legend"></div>
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <p>单位：条</p>
        <div class="allChart">
          <div>
            <pie :id="'bottomChart1'" :option="option1" v-if="show"></pie>
          </div>
          <div><pie :id="'bottomChart2'" :option="option2" v-if="show"></pie></div>
          <div><pie :id="'bottomChart3'" :option="option3" v-if="show"></pie></div>
          <div><pie :id="'bottomChart4'" :option="option4" v-if="show"></pie></div>
          <div><pie :id="'bottomChart5'" :option="option5" v-if="show"></pie></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import pyramid3dChart from "@/components/pyramid3d.vue";
import pie from "./pie.vue";
export default {
  components: {
    // pyramid3dChart,
    pie,
  },
  props: {
    initData: {
      type: Object,
      default() {
        return {};
      },
    },
    screen: {
      type: Object,
    },
    screen2: {
      type: Object,
    },
  },
  watch: {
    screen(value) {
      this.xaxis1 = value.screenTargetPart01Data[0].targetContent.xaxis;
      value.screenTargetPart01Data.forEach((val) => {
        this.yaxis1.push(val.targetContent.yaxis);
      });
      this.xaxis2 = value.screenTargetPart02Data[1].targetContent.xaxis;
      value.screenTargetPart02Data.forEach((val) => {
        this.yaxis2.push(val.targetContent.yaxis);
      });
      this.leftChart();
      this.rightChart();
    },
    screen2(value) {
      let a = [];
      value.screenTargetPart01Data.forEach((val) => {
        a.push(val);
      });
      this.option1.series[0].data=a[0].targetContent
      this.option2.series[0].data=a[1].targetContent
      this.option3.series[0].data=a[2].targetContent
      this.option4.series[0].data=a[3].targetContent
      this.option5.series[0].data=a[4].targetContent
      this.option1.series[0].data.forEach(val=>{
        val['h']=5
      })
      this.option2.series[0].data.forEach(val=>{
        val['h']=5
      })
      this.option3.series[0].data.forEach(val=>{
        val['h']=5
      })
      this.option4.series[0].data.forEach(val=>{
        val['h']=5
      })
      this.option5.series[0].data.forEach(val=>{
        val['h']=5
      })
      // console.log(this.option5.series[0])
      let i1= this.option1.series[0].data
      let i2= this.option2.series[0].data
      let i3= this.option3.series[0].data
      let i4= this.option4.series[0].data
      let i5= this.option5.series[0].data
      let arr1=[]
      let arr2=[]
      let arr3=[]
      let arr4=[]
      let arr5=[]
      for(let i =0;i<i1.length;i++){
        // console.log(i1[i].y)
        arr1.push(i1[i].y)
        arr2.push(i2[i].y)
        arr3.push(i3[i].y)
        arr4.push(i4[i].y)
        arr5.push(i5[i].y)
      }
      let max1 = Math.max(...arr1)
      let max2 = Math.max(...arr2)
      let max3 = Math.max(...arr3)
      let max4 = Math.max(...arr4)
      let max5 = Math.max(...arr5)
      for(let i =0;i<i1.length;i++){
        if(i1[i].y==max1){
          i1[i].h=30
        }
      }
      for(let i =0;i<i1.length;i++){
        if(i2[i].y==max2){
          i2[i].h=30
        }
      }
      for(let i =0;i<i1.length;i++){
        if(i3[i].y==max3){
          i3[i].h=30
        }
      }
      for(let i =0;i<i1.length;i++){
        if(i4[i].y==max4){
          i4[i].h=30
        }
      }
      for(let i =0;i<i1.length;i++){
        if(i5[i].y==max5){
          i5[i].h=30
        }
      }
      this.show =true
    //   // for (let i = 0; i < 6; i++) {
    //   //   // console.log(Number(a[0].targetContent[i].value))
    //   //   this.option1.series[0].data[i].y = Number(a[0].targetContent[i].y);
    //   //   this.option2.series[0].data[i].y = Number(a[1].targetContent[i].y);
    //   //   this.option3.series[0].data[i].y = Number(a[2].targetContent[i].y);
    //   //   this.option4.series[0].data[i].y = Number(a[3].targetContent[i].y);
    //   //   this.option5.series[0].data[i].y = Number(a[4].targetContent[i].y);
    //   //   console.log(this.option5.series[0].data[i]);
    //   // }
    },
  },
  data() {
    return {
      show:false,
      pieTitle: [
        { name: "原州区", class: "legend1" },
        { name: "西吉县", class: "legend2" },
        { name: "隆德县", class: "legend3" },
        { name: "彭阳县", class: "legend4" },
        { name: "泾源县", class: "legend5" },
        { name: "三营", class: "legend6" },
      ],
      option1: {
        colors: [
          "#4093E6",
          "#13D6AF",
          "#E36AE5",
          "#2BE4FD",
          "#EAEA4B",
          "#55E34F",
        ],
        title: {
          text: "负载率<20%",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#E6F6FF",
            fontSize: "20px",
          },
        },
        series: [
          {
            type: "pie",
            name: "负载率<20%",
            data: [
              // { name: "原州区", y: 53, h: 30 },
              // { name: "西吉县", y: 22, h: 5 },
              // { name: "隆德县", y: 28, h: 5 },
              // { name: "彭阳县", y: 36, h: 5 },
              // { name: "泾源县", y: 10, h: 5 },
              // { name: "三营", y: 53, h: 5 },
            ],
          },
        ],
        legend: {
          enabled: false,
        },
      },
      option2: {
        colors: [
          "#4093E6",
          "#13D6AF",
          "#E36AE5",
          "#2BE4FD",
          "#EAEA4B",
          "#55E34F",
        ],
        title: {
          text: "负载率20%-50%",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#E6F6FF",
            fontSize: "20px",
          },
        },
        series: [
          {
            type: "pie",
            name: "负载率20%-50%",
            data: [
              // { name: "原州区", y: 53, h: 30 },
              // { name: "西吉县", y: 22, h: 5 },
              // { name: "隆德县", y: 28, h: 5 },
              // { name: "彭阳县", y: 36, h: 5 },
              // { name: "泾源县", y: 10, h: 5 },
              // { name: "三营", y: 53, h: 5 },
            ],
          },
        ],
        legend: {
          enabled: false,
        },
      },
      option3: {
        colors: [
          "#4093E6",
          "#13D6AF",
          "#E36AE5",
          "#2BE4FD",
          "#EAEA4B",
          "#55E34F",
        ],
        title: {
          text: "负载率50%-80%",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#E6F6FF",
            fontSize: "20px",
          },
        },
        series: [
          {
            type: "pie",
            name: "负载率50%-80%",
            data: [
              // { name: "原州区", y: 53, h: 30 },
              // { name: "西吉县", y: 22, h: 5 },
              // { name: "隆德县", y: 28, h: 5 },
              // { name: "彭阳县", y: 36, h: 5 },
              // { name: "泾源县", y: 10, h: 5 },
              // { name: "三营", y: 53, h: 5 },
            ],
          },
        ],
        legend: {
          enabled: false,
        },
      },
      option4: {
        colors: [
          "#4093E6",
          "#13D6AF",
          "#E36AE5",
          "#2BE4FD",
          "#EAEA4B",
          "#55E34F",
        ],
        title: {
          text: "负载率90%-100%",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#E6F6FF",
            fontSize: "20px",
          },
        },
        series: [
          {
            type: "pie",
            name: "负载率90%-100%",
            data: [
              // { name: "原州区", y: 53, h: 30 },
              // { name: "西吉县", y: 22, h: 5 },
              // { name: "隆德县", y: 28, h: 5 },
              // { name: "彭阳县", y: 36, h: 5 },
              // { name: "泾源县", y: 10, h: 5 },
              // { name: "三营", y: 53, h: 5 },
            ],
          },
        ],
        legend: {
          enabled: false,
        },
      },
      option5: {
        colors: [
          "#4093E6",
          "#13D6AF",
          "#E36AE5",
          "#2BE4FD",
          "#EAEA4B",
          "#55E34F",
        ],
        title: {
          text: "负载率>100%",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#E6F6FF",
            fontSize: "20px",
          },
        },
        series: [
          {
            type: "pie",
            name: "负载率>100%",
            data: [
              // { name: "原州区", y: 53, h: 30 },
              // { name: "西吉县", y: 22, h: 5 },
              // { name: "隆德县", y: 28, h: 5 },
              // { name: "彭阳县", y: 36, h: 5 },
              // { name: "泾源县", y: 10, h: 5 },
              // { name: "三营", y: 53, h: 5 },
            ],
          },
        ],
        legend: {
          enabled: false,
        },
      },
      yaxis1: [],
      xaxis1: {},
      yaxis2: [],
      xaxis2: {},
    };
  },
  created() {
    // this.getYYJC();
  },
  mounted() {
    // this.leftChart();
    // this.rightChart();
  },
  methods: {
    leftChart() {
      let myChart = this.$echarts.init(document.getElementById("leftChart"));
      let xData = this.xaxis1;
      let data1 = this.yaxis1[0],
        data2 = this.yaxis1[1];
      let option = {
        title: {
          text: "线路负载 TOP 5",
          left: "30px",
          top: "20px",
          textStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: 500,
          },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 70,
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
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ad2ff;'></span> " +
              params[0].seriesName +
              ": " +
              params[0].value +
              "%" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F6FF8D;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "%"
            );
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          right: "50px",
          top: "20px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 16,
          },
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
            // max: 100,
            name: "(%)",
            nameLocation: "start",
            nameTextStyle: {
              align: "right",
              color: "#EAF7FF",
              fontSize: 15,
            },
            splitLine: {
              show: true,
              lineStyle: {
                // type: "dashed",
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
            name: "线路负载率",
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
                      color: " rgba(67, 174, 255, 0.94)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 97, 195, 0.44)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#21A8FC",
                    fontFamily: "numFont",
                    fontSize: 26,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: "同期",
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
                      color: "#FFB850", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(203, 120, 0, 0.26)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#D3A562",
                    fontFamily: "numFont",
                    fontSize: 26,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: "同期",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#ECD179",
            data: data2,
          },
          {
            name: "线路负载率",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#9CDCFF",
            data: data1,
          },
          {
            name: "同期",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#3D4A40",
            data: data2,
          },
          {
            name: "线路负载率",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#034792",
            data: data1,
          },
        ],
      };
      myChart.setOption(option);
    },
    rightChart() {
      let myChart = this.$echarts.init(document.getElementById("rightChart"));
      let xData = this.xaxis2;
      let data1 = this.yaxis2[0],
        data2 = this.yaxis2[1];
      let option = {
        title: {
          text: "配电变压器负载率 TOP 5",
          left: "30px",
          top: "20px",
          textStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: 500,
          },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 70,
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
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ad2ff;'></span> " +
              params[0].seriesName +
              ": " +
              params[0].value +
              "%" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F6FF8D;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "%"
            );
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          right: "50px",
          top: "20px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 16,
          },
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
            // max: 100,
            name: "(%)",
            nameLocation: "start",
            nameTextStyle: {
              align: "right",
              color: "#EAF7FF",
              fontSize: 15,
            },
            splitLine: {
              show: true,
              lineStyle: {
                // type: "dashed",
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
            name: "当期",
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
                      color: " rgba(67, 174, 255, 0.94)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 97, 195, 0.44)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#21A8FC",
                    fontFamily: "numFont",
                    fontSize: 26,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: "同期",
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
                      color: "#FFB850", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(203, 120, 0, 0.26)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#D3A562",
                    fontFamily: "numFont",
                    fontSize: 26,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: "同期",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#ECD179",
            data: data2,
          },
          {
            name: "当期",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, -5],
            symbolPosition: "end",
            z: 12,
            color: "#9CDCFF",
            data: data1,
          },
          {
            name: "同期",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#3D4A40",
            data: data2,
          },
          {
            name: "当期",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [-18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#034792",
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
.operationIndexMonitoringRightPart {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  background: url("/image/operationIndexMonitoring/left_bg.png") no-repeat;
  background-position: bottom;
  background-size: 100%;
  .content {
    background-color: rgba(0, 11, 32, 0.26);
  }
  .infoMonitor {
    .content {
      height: 386px;
      position: relative;
      overflow: hidden;
      background: RGBA(4, 59, 94, 0.8);
      display: flex;
      .title {
        display: flex;
        height: 33px;
        position: absolute;
        top: 5px;
        left: 35px;
        z-index: 1;
        p {
          cursor: pointer;
          width: 60px;
          height: 33px;
          font-size: 16px;
          text-align: center;
          line-height: 33px;
        }
        .show {
          font-size: 20px;
          border-bottom: 2px solid rgba(64, 218, 253, 0.596078431372549);
          background: linear-gradient(
            180deg,
            rgba(82, 255, 235, 0) 0%,
            #0c6081 100%
          );
        }
      }
      #leftChart {
        height: 100%;
        width: 50%;
      }
      #rightChart {
        width: 50%;
        height: 100%;
      }
    }
  }
  .taskMonitor {
    .content {
      height: 386px;
      overflow: hidden;
      background: linear-gradient(
        114deg,
        rgba(2, 72, 94, 0.3) 0%,
        rgba(0, 42, 83, 0.09) 100%
      );
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        margin: 20px 25px;
        li {
          display: flex;
          align-items: center;
          margin-right: 50px;
          #legend {
            width: 20px;
            height: 12px;
            border-radius: 3px;
          }
          .legend1 {
            background: #4093e6;
          }
          .legend2 {
            background: #13d6af;
          }
          .legend3 {
            background: #e36ae5;
          }
          .legend4 {
            background: #2be4fd;
          }
          .legend5 {
            background: #eaea4b;
          }
          .legend6 {
            background: #55e34f;
          }
          span {
            font-size: 16px;
            margin-left: 10px;
          }
        }
      }
      > p {
        color: #ffffff;
        opacity: 0.6;
        margin-left: 25px;
        font-size: 16px;
      }
      .allChart {
        width: 100%;
        height: calc(100% - 80px);
        display: flex;
        > div {
          width: 25%;
          height: 100%;
        }
      }
    }
  }
}
</style>