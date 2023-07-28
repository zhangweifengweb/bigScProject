<template>
  <div class="gridOverviewRightPart">
    <div class="infoMonitor">
      <div class="top_left">
        <div class="title">
          <div class="left">
            <div></div>
            <span>{{title1}}</span>
          </div>
          <div class="rightInfo">
            <p :class="{ plan: show === 1 }" @click="change1(1)">周</p>
            <p :class="{ plan: show === 2 }" @click="change1(2)">月</p>
            <p :class="{ plan: show === 3 }" @click="change1(3)">年</p>
          </div>
        </div>
        <div id="topLeftChart"></div>
        <div class="dp"></div>
      </div>
      <div class="top_right">
        <div class="title">
          <div class="title_left">
            <div :class="{ plan: show2 === 1 }" @click="change2(1)">
              平均修复时长
            </div>
            <div :class="{ plan: show2 === 2 }" @click="change2(2)">
              平均到达时长
            </div>
          </div>
          <div class="rightInfo">
            <p :class="{ plan: show3 === 1 }" @click="change3(1)">月</p>
            <p :class="{ plan: show3 === 2 }" @click="change3(2)">年</p>
          </div>
        </div>
        <div id="topRightChart"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{title2}}</div>
        <!-- <div class="img"></div> -->
        <div class="rightInfo">
          <p :class="{ plan: show4 === 1 }" @click="change4(1)">95598工单</p>
          <p :class="{ plan: show4 === 2 }" @click="change4(2)">主抢工单</p>
        </div>
      </div>
      <div class="content">
        <div>
          <pie :id="'bottomChart1'" :option="option1"></pie>
        </div>
        <div>
          <pie :id="'bottomChart2'" :option="option2"></pie>
        </div>
        <div>
          <pie :id="'bottomChart3'" :option="option3"></pie>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import pyramid3dChart from "@/components/pyramid3d.vue";
import pie from "./pie.vue";
import axios from 'axios';
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
    initData2: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch:{
    initData(val){
      this.title1 = val.screenTargetPart01Data[0].targetTitle
      this.zxdata = val.screenTargetPart01Data[0].targetContent.xaxis
      this.zydata1 = val.screenTargetPart01Data[0].targetContent.yaxis
      this.zydata2 = val.screenTargetPart01Data[1].targetContent.yaxis
      this.zydata3 = val.screenTargetPart01Data[2].targetContent.yaxis
      this.yxdata = val.screenTargetPart01Data[3].targetContent.xaxis
      this.yydata1 = val.screenTargetPart01Data[3].targetContent.yaxis
      this.yydata2 = val.screenTargetPart01Data[4].targetContent.yaxis
      this.yydata3 = val.screenTargetPart01Data[5].targetContent.yaxis
      this.nxdata = val.screenTargetPart01Data[6].targetContent.xaxis
      this.nydata1 = val.screenTargetPart01Data[6].targetContent.yaxis
      this.nydata2 = val.screenTargetPart01Data[7].targetContent.yaxis
      this.nydata3 = val.screenTargetPart01Data[8].targetContent.yaxis
      this.getIndex(this.title1)
      let data = val.screenTargetPart02Data
      // console.log(data)
      this.xdata2 = data[0].targetContent.xaxis
      this.xfyydata1 = data[0].targetContent.yaxis
      this.xfyydata2 = data[1].targetContent.yaxis
      this.xfnydata1 = data[2].targetContent.yaxis
      this.xfnydata2 = data[3].targetContent.yaxis
      this.ddyydata1 = data[4].targetContent.yaxis
      this.ddyydata2 = data[5].targetContent.yaxis
      this.ddnydata1 = data[6].targetContent.yaxis
      this.ddnydata2 = data[7].targetContent.yaxis
      this.getIndex(data[0].targetTitle)
    },
    initData2(val){
      // console.log(val);
      this.title2 = val.targetGroupTitle
      let data = val.screenTargetPart01Data
      data.forEach(item=>{
        let maxy = Math.max.apply(Math, item.targetContent.map(function(o) {return o.y}))
        item.targetContent.forEach(item2=>{
          item2['h'] = 5
          if(item2.y == maxy){
            item2.h = 30
          }
        })
      })
      this.data1 = data[0].targetContent
      this.data2 = data[1].targetContent
      this.data3 = data[2].targetContent
      this.data4 = data[3].targetContent
      this.data5 = data[4].targetContent
      this.data6 = data[5].targetContent
      this.getIndex(this.title2)
      // console.log(data)
    }
  },
  data() {
    return {
      show: 0,
      showArr:[1,0],
      show2:1,
      show3:0,
      show4: 0,
      //工单曲线图
      title1:'',
      zxdata: [],//周
      zydata1: [],
      zydata2: [],
      zydata3: [],
      yxdata: [],//月
      yydata1: [],
      yydata2: [],
      yydata3: [],
      nxdata: [],//年
      nydata1: [],
      nydata2: [],
      nydata3: [],
      //"工单柱状图"
      xdata2:[],
      //修复 月x
      xfyydata1:[],//95598
      xfyydata2:[],//主抢
      //修复 年x
      xfnydata1:[],//95598
      xfnydata2:[],//主抢
      //到达 月x
      ddyydata1:[],//95598
      ddyydata2:[],//主抢
      //到达 年x
      ddnydata1:[],//95598
      ddnydata2:[],//主抢
      //故障工单分类
      title2:'',
      //95598
      data1:[],
      data2:[],
      data3:[],
      //主抢工单
      data4:[],
      data5:[],
      data6:[],
      option1: {
        colors: ["#4A97DC", "#FFC855", "#44D6AA"],
        title: {
          text: "故障分类现场",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#74B4FF",
            fontSize: "20px",
          },
        },
        series: [
          {
            type: "pie",
            name: "故障分类现场",
            data: [
              // { name: "城市", y: 37, h: 30 },
              // { name: "郊区", y: 15, h: 5 },
              // { name: "偏远地区", y: 58, h: 5 },
            ],
          },
        ],
      },
      option2: {
        colors: [
          "#5092E9",
          "#CE404A",
          "#CD8591",
          "#D28133",
          "#0BE04D",
          "#33F3CB",
          "#1765F8",
        ],
        title: {
          text: "故障一级分类",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#74B4FF",
            fontSize: "20px",
          },
        },
        series: [
          {
            type: "pie",
            name: "故障一级分类",
            data: [
              // { name: "低压故障", y: 46, h: 30 },
              // { name: "高压故障", y: 10, h: 5 },
              // { name: "计量故障", y: 7, h: 5 },
              // { name: "客户内部故障", y: 12, h: 5 },
              // { name: "停电原因查询", y: 13, h: 5 },
              // { name: "电能质量故障", y: 8, h: 5 },
              // { name: "非电力故障", y: 4, h: 5 },
            ],
          },
        ],
      },
      option3: {
        colors: ["#5092E9", "#D28133", "#0BE04D", "#33F3CB", "#1765F8","#e9f133"],
        title: {
          text: "各单位工单总数",
          verticalAlign: "bottom",
          // // y:-80,
          // margin:0,
          style: {
            color: "#74B4FF",
            fontSize: "20px",
          },
        },
        plotOptions: {
          pie: {
            cursor: "pointer",
            depth: 30,
            innerSize: 180,
            center: ["50%", "65%"],
            size: "80%",
            dataLabels: {
              enabled: true,
              color: "#eaf8ff",
              // connectorColor: point.color,
              connectorWidth: 2,
              softConnector: true,
              style: {
                fontSize: 18,
                fontFamily: "numFont",
              },
              formatter: function () {
                return `<div class="pieLabel"><p class="pie_title"></p><br><p style='font-size:26px;color:${this.point.color};letter-spacing: 4px;' class="num pie_num">${this.point.y}<span style='font-size:20px;color:${this.point.color};text-shadow: 0px 0px 1px #fff;'>张</span></p></div>`;
                // return this.point.name+this.point.y+'%';
              },
            },
            showInLegend: true,
            point: {
              events: {
                legendItemClick: function () {
                  return false;
                },
              },
            },
            series: {
              events: {
                legendItemClick: function () {
                  return false;
                },
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            name: "各单位工单总数",
            data: [
              // { name: "隆德县", y: 456, h: 30 },
              // { name: "泾源县", y: 456, h: 5 },
              // { name: "原州区", y: 72, h: 5 },
              // { name: "西吉县", y: 62, h: 5 },
              // { name: "彭阳县", y: 56, h: 5 },
              // { name: "三营", y: 456, h: 5 },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    // this.rightTopLeft();
    // this.rightTopRight();
  },
  methods: {
    change1(e){
      this.show =e
      // console.log(e)
      if(e === 1){
        this.rightTopLeft(this.zxdata,this.zydata1,this.zydata2,this.zydata3)
      }else if(e === 2){
        this.rightTopLeft(this.yxdata,this.yydata1,this.yydata2,this.yydata3)
      }else{
        this.rightTopLeft(this.nxdata,this.nydata1,this.nydata2,this.nydata3)
      }
    },
    change2(e){
      this.show2 = e
      this.showArr[0]=e
      // console.log(this.showArr);
      // if(this.showArr[1]===1)
      // console.log(e,n);
      if(this.showArr[1]===1){
        if(e===1){
          this.rightTopRight(this.xdata2,this.xfyydata1,this.xfyydata2)
        }else{
          this.rightTopRight(this.xdata2,this.ddyydata1,this.ddyydata2)
        }
      }
      if(this.showArr[1]===2){
        if(e===1){
          this.rightTopRight(this.xdata2,this.xfnydata1,this.xfnydata2)
        }else{
          this.rightTopRight(this.xdata2,this.ddnydata1,this.ddnydata2)
        }
      }
    },
    change3(e){
      this.show3 = e
      this.showArr[1]=e
      // console.log(this.showArr);
      this.change2(this.show2)
    },
    change4(e){
      this.show4 = e
      if(e===1){
        this.option1.series[0].data = this.data1
        this.option2.series[0].data = this.data2
        this.option3.series[0].data = this.data3
      }else{
        this.option1.series[0].data = this.data4
        this.option2.series[0].data = this.data5
        this.option3.series[0].data = this.data6
      }
    },
    getIndex(name){
      axios.get('/JBTSHJ/GuYuanScreen/getScreenById/TableIndex',{params:{tarGetName:name}}).then(res=>{
        if(res.data.code === 200){
          if(name==='工单曲线图'){
            this.change1(res.data.data)
          }
          if(name==="工单柱状图"){
            // console.log(res)
            this.change3(res.data.data)
          }
          if(name==="故障工单分类"){
            // console.log(res)
            this.change4(res.data.data)
          }
        }
      })
    },
    rightTopLeft(x,y1,y2,y3) {
      let myChart = this.$echarts.init(document.getElementById("topLeftChart"));
      let xdata = x
      let ydata1 = y1
      let ydata2 = y2
      let ydata3 = y3
      myChart.setOption({
        xAxis: {
          type: "category",
          data: xdata,
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: "14px",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 3,
            mix: 0,
            // max: 300,
          },
        ],
        grid: {
          containLabel: false,
        },
        title: {
          text: "单位: 件",
          left: "5%",
          top: "25px",
          textStyle: {
            color: "#fff",
            fontSize: 14,
            fontWeight: 400,
          },
        },
        legend: {
          itemWidth: 20,
          itemHeight: 10,
          left: "5%",
          itemGap: 40,
          icon: "roundRect",
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
          },
        },
        series: [
          {
            name: "95598工单日曲线",
            data: ydata1,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#3BEB48",
              width: 3,
            },
            color: "#3BEB48", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#3BEB48",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "主动工单日曲线",
            data: ydata2,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#FFB522",
              width: 3,
            },
            color: "#FFB522", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#FFB522",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
          {
            name: "万户工单数日曲线",
            data: ydata3,
            type: "line",
            symbolSize: 0,
            lineStyle: {
              color: "#58B2FF",
              width: 3,
            },
            color: "#58B2FF", //图例的颜色
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#58B2FF",
                fontFamily: "numFont",
                fontSize: "20px",
              },
            },
          },
        ],
      });
    },
    rightTopRight(x,y1,y2) {
      let myChart = this.$echarts.init(
        document.getElementById("topRightChart")
      );
      let xData = x;
      let data1 = y1,
        data2 = y2;
      let option = {
        title: {
          text: "单位: 分钟",
          left: "0px",
          top: "35px",
          textStyle: {
            color: "#fff",
            fontSize: 14,
            fontWeight: 100,
          },
        },
        grid: {
          borderWidth: 0,
          top: 70,
          left: 40,
          bottom: 70,
          right: 10,
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
              "分钟" +
              "<br><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F6FF8D;'></span> " +
              params[1].seriesName +
              ": " +
              params[1].value +
              "分钟"
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
          left: "0",
          top: "10px",
          itemGap: 40,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14,
          },
          selectedMode: true,
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
            max: 70,
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
            name: "95598工单",
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
                      color: "#28D0D4", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#034792", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#63c7ff",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data1,
          },
          {
            name: "主动抢修",
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
                      color: "#C5962F", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#303328", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#ffcc22",
                    fontFamily: "numFont",
                    fontSize: 22,
                  },
                },
              },
            },

            data: data2,
          },
          {
            name: "主动抢修",
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
            name: "95598工单",
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
            name: "主动抢修",
            type: "pictorialBar",
            symbol: "diamond",
            symbolSize: [24, 10],
            symbolOffset: [18, 5],
            // symbolPosition: 'end',
            z: 12,
            color: "#303328",
            data: data2,
          },
          {
            name: "95598工单",
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
@keyframes right_bg_animation {
  0% {
    background-position: bottom;
  }
  100% {
    background-position: center;
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
  height: calc(100% - 88px);
  width: 1480px;
  display: flex;
  flex-wrap: wrap;
  background: url("/image/emergencyRepair/bj3.png") 0 0 no-repeat;
  background-position: center;
  background-size: 100%;
  animation: right_bg_animation 1s linear;
  .infoMonitor {
    width: 100%;
    height: 50%;
    display: flex;
    background-color: RGBA(8, 35, 83, 0.5);
    > div {
      position: relative;
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      .title {
        position: absolute;
        width: 100%;
        height: 85px;
        .left {
          position: absolute;
          //   width: 100%;
          height: 100%;
          line-height: 85px;
          font-size: 26px;
          margin-left: 40px;
          display: flex;
          align-items: center;
          div {
            width: 8px;
            height: 8px;
            background: #55ebfe;
            opacity: 0.5;
            margin-right: 9px;
          }
        }
      }
    }
    .top_left,
    .top_right {
      .title {
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
      }
      #topLeftChart {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 411px;
      }
      .dp {
        position: absolute;
        width: 647px;
        height: 79px;
        left: 50%;
        margin-left: -337px;
        bottom: 60px;
        background: url("/image/emergencyRepair/topLeft.png");
        animation: bounce 2s;
      }
    }
    .top_right {
      .title {
        position: relative;
        .title_left {
          width: 360px;
          height: 48px;
          display: flex;
          position: absolute;
          bottom: 0;
          div {
            width: 50%;
            height: 100%;
            font-size: 20px;
            text-align: center;
            line-height: 48px;
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
      #topRightChart {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 411px;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 50%;
    background-color: RGBA(8, 35, 83, 0.5);
    .boxTitle {
      position: relative;
      .rightInfo {
        position: absolute;
        right: 15px;
        display: flex;
        top: 30px;
        p {
          width: 180px;
          height: 48px;
          font-size: 20px;
          color: #ffffff;
          text-align: center;
          // font-weight: 400;
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
      width: 100%;
      height: 386px;
      display: flex;
      justify-content: space-between;
      > div {
        width: 33%;
        height: 100%;
        position: relative;
        // .unit {
        //   position: absolute;
        //   top: 50px;
        //   left: 20px;
        //   font-size: 14px;
        //   color: #d3eeff;
        // }
      }
    }
  }
}
</style>