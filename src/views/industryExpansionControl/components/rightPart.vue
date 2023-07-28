<template>
  <div class="industryExpansionControlRightPart">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">高低压接电时长统计</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="title">
          <p :class="{ show: show === 1 }" @click="change(1)">高压</p>
          <p :class="{ show: show === 2 }" @click="change(2)">低压</p>
        </div>
        <div id="leftChart"></div>
        <div id="rightChart"></div>
      </div>
    </div>
    <div class="taskMonitor">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">业扩配套项目工程</div>
        <!-- <div class="img"></div> -->
      </div>
      <div class="content">
        <div class="title">
          <span v-for="(item, index) in engineering" :key="index">{{
            item
          }}</span>
        </div>
        <div class="box">
          <ul>
            <li
              v-for="(item, index) in project"
              :key="item.number"
              :class="{ on: index % 2 == 0, off: index % 2 != 0 }"
            >
              <span>{{ item.number }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.people }}</span>
              <span>{{ item.schedule }}</span>
              <span>{{ item.startTime }}</span>
              <span>{{ item.endTime }}</span>
              <span>{{ item.content }}</span>
            </li>
            <li
              v-for="(item, index) in project"
              :key="'right'+index"
              :class="{ on: index % 2 == 0, off: index % 2 != 0 }"
            >
              <span>{{ item.number }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.people }}</span>
              <span>{{ item.schedule }}</span>
              <span>{{ item.startTime }}</span>
              <span>{{ item.endTime }}</span>
              <span>{{ item.content }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import pyramid3dChart from "@/components/pyramid3d.vue";
import pie from "@/components/pie.vue";
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
      this.gxdata = val.screenTargetPart01Data[0].targetContent.xaxis
      this.gydata = val.screenTargetPart01Data[0].targetContent.yaxis
      this.dxdata = val.screenTargetPart01Data[1].targetContent.xaxis
      this.dydata = val.screenTargetPart01Data[1].targetContent.yaxis
      let data1 = val.screenTargetPart02Data[0].targetContent
      data1.forEach(item=>{
        item.value = item.y
        delete item['y']
      })
      let data2 = val.screenTargetPart02Data[1].targetContent
      data2.forEach(item=>{
        item.value = item.y
        delete item['y']
      })
      this.data1 = data1
      this.data2 = data2
      this.tarGetName = val.screenTargetPart01Data[0].targetTitle
      this.getIndex(this.tarGetName)
    },
    initData2(val){
      console.log(val);
      let data = val.screenTargetPart01Data[0].targetContent
      data.forEach(item=>{
        item.key1 = item.columnValue1.split('/')[0]
        item.key2 = item.columnValue2.split('/')[0]
        item.key3 = item.columnValue3.split('/')[0]
        item.key4 = item.columnValue4.split('/')[0]
        item.key5 = item.columnValue5.split('/')[0]
        item.key6 = item.columnValue6.split('/')[0]
        item.key7 = item.columnValue7.split('/')[0]
        item.number = item.columnValue1.split('/')[1]
        item.name = item.columnValue2.split('/')[1]
        item.people = item.columnValue3.split('/')[1]
        item.schedule = item.columnValue4.split('/')[1]
        item.startTime = item.columnValue5.split('/')[1]
        item.endTime = item.columnValue6.split('/')[1]
        item.content = item.columnValue7.split('/')[1]
      })
      this.engineering.push(data[0].key1,data[0].key2,data[0].key3,data[0].key4,data[0].key5,data[0].key6,data[0].key7,)
      // console.log(data)
      this.project = data
      // console.log(this.engineering)
    }
  },
  data() {
    return {
      show: 0,
      tarGetName:'',
      seriesList: [],
      //折线图
      gxdata: [],//高压X轴
      dxdata: [],//低压X轴
      gydata: [],//高压Y轴
      dydata: [],//低压Y轴
      //饼图
      data1:[],//高压数据
      data2:[],//低压数据
      engineering: [],
      project: [],
    };
  },
  created(){
    
  },
  mounted() {
    // this.topLeftChart();
    // this.rightChart();
  },
  methods: {
     getIndex(name) {
      axios
        .get(
          "/JBTSHJ/GuYuanScreen/getScreenById/TableIndex",
          { params: { tarGetName: name } }
        )
        .then((res) => {
          if(res.status===200 && res.data.code===200){
            this.change(res.data.data)
          }
        });
    },
    change(e){
      this.show = e
      if(e===1){
        this.topLeftChart(this.gxdata,this.gydata)
        this.rightChart(this.data1)
      }
      if(e===2){
        this.topLeftChart(this.dxdata,this.dydata)
        this.rightChart(this.data2)
      }
    },
    topLeftChart(xdata,ydata) {
      let myChart = this.$echarts.init(document.getElementById("leftChart"));
      // console.log(xdata,ydata);
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
              fontSize: "20px",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 3,
            mix: 0,
            // max: 300,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#244266",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#A2ABB7",
                fontSize: "20px",
              },
            },
          },
        ],
        grid: {
          top: 100,
          left: 70,
          bottom: 70,
          right: 10,
        },
        title: {
          text: "单位: 天",
          left: 30,
          top: 50,
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
          },
        },
        // legend: {
        //   itemWidth: 20,
        //   itemHeight: 10,
        //   left: "5%",
        //   itemGap: 40,
        //   icon: "roundRect",
        //   textStyle: {
        //     //图例文字的样式
        //     color: "#fff",
        //     fontSize: 14,
        //   },
        // },
        series: [
          {
            name: "高低压接电时长统计",
            data: ydata,
            type: "line",
            smooth: true,
            symbolSize: 0,
            lineStyle: {
              color: "#2BB2F8",
              width: 5,
            },
            color: "#3BEB48", //图例的颜色
            label: {
              show: true,
              position: "top",
              distance: 25,
              textStyle: {
                color: "#2BB2F8",
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
                      color: "#0C4063", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#05264D", // 100% 处的颜色
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
    rightChart(e) {
      let myChart = this.$echarts.init(document.getElementById("rightChart"));
      let data = e;
      let sum = 0;
      let legendData = [];
      if(data.length==6){
          data.forEach((item) => {
          sum += item.value * 1; // *1保证sum值为数值
          legendData.push(item.name);
        });
        data.push({
          name: "",
          value: sum,
          itemStyle: { normal: { color: "rgba(0, 0, 0, 0)" } },
          label: { show: false },
        });
      }
      myChart.setOption({
        color: [
          "#0DBBD3",
          "#0D56D3",
          "#1682CF",
          "#75EDFF",
          "#74FDDA",
          "#AE90FF",
        ],
        tooltip: {
          trigger: "item",
          // formatter: '{a}<br/>{b}:{c}({d}%)'
          formatter: "{b}:{c}天",
        },
        // legend: {
        //   orient: "horizontal", // vertical 设置图例展示方向
        //   data: legendData,
        // },
        title: {
          text: "单位: 天",
          left: 50,
          top: 50,
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
          },
        },

        series: [
          {
            name: "高低压接电时长统计", // 上面formatter的a，不显示a可不设置
            type: "pie",
            startAngle: 180, // 重点！这里设置饼图从180°初渲染，刚好从上下将饼图平分成两部分
            radius: ["100%", "60%"],
            center: ["50%", "100%"],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            labelLine: {
              show: true,
              length: 100,
              length2: 30,
            },
            label: {
              color: "#fff",
              show: true,
              // formatter: "{b}\n{c}",
              formatter: "{b}\n{num|{c}}",
              fontSize: 20,
              rich: {
                num: {
                  fontSize: 35,
                  fontFamily: "numFont",
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes flashAnimation {
  0% {
    left: -100%;
  }
  50% {
    left: 150%;
  }
  100% {
    left: -100%;
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
.industryExpansionControlRightPart {
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
      background: RGBA(5, 38, 77, 0.6);
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
        width: 55%;
        // padding: 20px 46px;
        display: flex;
        flex-direction: column;
      }
      #rightChart {
        width: 45%;
        height: 100%;
        padding-bottom: 40px;
      }
    }
  }
  .taskMonitor {
    .content {
      height: 386px;
      overflow: hidden;
      background: RGBA(5, 38, 77, 0.6);
      padding-left: 40px;
      padding-right: 40px;
      .title {
        position: relative;
        height: 43px;
        font-size: 20px;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        span {
          position: absolute;
        }
        span:nth-child(1) {
          left: 12px;
        }
        span:nth-child(2) {
          left: 130px;
        }
        span:nth-child(3) {
          left: 280px;
        }
        span:nth-child(4) {
          left: 430px;
        }
        span:nth-child(5) {
          left: 585px;
        }
        span:nth-child(6) {
          left: 765px;
        }
        span:nth-child(7) {
          left: 1115px;
        }
      }
      .box {
        height: 346px;
        position: relative;
        overflow: hidden;
      }
      ul {
        list-style: none;
        // height: 346px;
        width: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
        position: absolute;
        animation: 20s move 3s infinite linear ;
        ul:hover {
          animation-play-state: paused;
        }
        li {
          margin-top: 9px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          color: #dbedff;
          span:nth-child(1) {
            margin-left: 20px;
          }
          span:nth-child(2) {
            width: 81px;
          }
          span:nth-child(3) {
            width: 50px;
            text-align: center;
          }
          span:nth-child(6) {
            width: 97px;
            text-align: center;
          }
          span:nth-child(7) {
            width: 454px;
            overflow: hidden;
            text-overflow: ellipsis; //文本溢出显示省略号
            white-space: nowrap; //文本不会换行（单行文本溢出）
          }
        }
        .on {
          background: #1e4a7d;
        }
        .off {
          background: #0c3a6e;
        }
      }
      ul:hover {
        animation-play-state: paused;
      }
    }
  }
}
</style>