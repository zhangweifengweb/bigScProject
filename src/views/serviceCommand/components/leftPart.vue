<template>
  <div class="leftPart_serviceCommand">
    <div class="resources">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{title1}}</div>
      </div>
      <div class="content">
        <div class="animate_container">
          <div class="changeRange">
            <p
              :class="activeIndex == 1 ? 'active' : ''"
              @click="change(1)"
            >
              周
            </p>
            <p
              :class="activeIndex == 2 ? 'active' : ''"
              @click="change(2)"
            >
              月
            </p>
            <p
              :class="activeIndex == 3 ? 'active' : ''"
              @click="change(3)"
            >
              年
            </p>
          </div>
          <section v-for="(item, index) in leftArr" :key="`power_item${index}`">
            <p class="title">{{ item.name }}</p>
            <p class="num">
              {{ item.value }}<span>{{ item.unit }}</span>
            </p>
            <div class="animated_icon">
              <div class="animated_icon_container"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="boxTitle">
        <div class="colorside"></div>
        <div class="title">{{title2}}</div>
      </div>
      <div class="content">
        <div class="animate_container">
          <div id="leftBottompBar"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
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
      // console.log(val);
      this.title1 = val.targetGroupTitle
      let data = val.screenTargetPart01Data
      data.forEach(item=>{
        // console.log(item);
        item.targetContent.forEach(item2=>{
          item2.name = item2.indicatorName.split('/')[0]
          item2.value = item2.indicatorName.split('/')[1]
          item2.unit = item2.indicatorValue.split('/')[1]
          // console.log(item2)
        })
        // console.log(item)
      })
      this.arr1 = data[0].targetContent
      this.arr2 = data[1].targetContent
      this.arr3 = data[2].targetContent
      this.getIndex()
      // console.log(data)
    },
    initData2(val){
      this.title2 = val.targetGroupTitle
      this.xdata = val.screenTargetPart01Data[0].targetContent.xaxis
      this.ydata1 = val.screenTargetPart01Data[0].targetContent.yaxis
      this.ydata2 = val.screenTargetPart01Data[1].targetContent.yaxis
      this.leftBottompBar(this.xdata,this.ydata1,this.ydata2)
      // console.log(val)
    }
  },
  data() {
    return {
      title1:'',
      title2:'',
      // left_bg_class: ["repair_car", "elec_car", "repait_person", "repair_eqp",''],
      activeIndex: 0,
      arr1:[],
      arr2:[],
      arr3:[],
      leftArr: [],
      xdata:[],
      ydata1:[],//当期
      ydata2:[],//同期
    };
  },
  computed: {
    // leftOrder: function () {
    //   let data = this.initData.indicatorsTabFormMap["非抢工单管控"];
    //   for (const key in data) {
    //     if (Object.hasOwnProperty.call(data, key)) {
    //       const element = data[key];
    //       if (this.activeIndex == 0 && key == "日") {
    //         return element;
    //       } else if (this.activeIndex == 1 && key == "月") {
    //         return element;
    //       } else if (this.activeIndex == 2 && key == "年") {
    //         return element;
    //       }
    //     }
    //   }
    // },
  },
  mounted() {
    // this.getIndex();
    // this.leftBottompBar();
  },
  methods: {
    getIndex(){
      axios.get('/JBTSHJ/GuYuanScreen/getScreenById/TableIndex',{params:{tarGetName:this.title1}}).then(res=>{
        if(res.status===200 && res.data.code === 200){
          this.change(res.data.data)
        }
        // console.log(res)
      })
    },
    change(e){
      this.activeIndex = e
      if(e===1){
        this.leftArr = this.arr1
      }else if(e===2){
        this.leftArr = this.arr2
      }else{
        this.leftArr = this.arr3
      }
    },
    leftBottompBar(x,y1,y2) {
      let myChart = this.$echarts.init(
        document.getElementById("leftBottompBar")
      );
      let arr1 = y1,
        arr2 = y2,
        xAxisArr = x;
      myChart.setOption({
        grid: {
          top: "25%",
          left: "8%",
          right: "5%",
          bottom: "12%",
          // containLabel:true,
        },
        legend: {
          x: "left",
          y: "top",
          padding: [15, 0, 45, 50],
          textStyle: {
            //图例文字的样式
            color: "#fefefe",
            fontSize: 20,
          },
          itemGap: 20,
          icon: "roundRect",
          show: true,
          selectedMode: false,
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
            min: 0,
            showMinLabel: false,
            name: "单位：件",
            nameLocation: "end",
            nameTextStyle: {
              padding: [20, 0, 10, -70],
              fontSize: 16, // 四个数字分别为上右下左与原位置距离
              color: "#fff",
            },
            // max: 100,
            // splitNumber: 3,
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
              offset: [0, -10],
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
              color: "#BF8013",
              fontSize: 20,
              fontFamily: "numFont",
              position: "top",
              offset: [0, -10],
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
                    color: "#E7D428", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#BE7F12", // 100% 处的颜色
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
              color: "#D59D37",
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
              color: "#BF8013",
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
@keyframes leftTopIconAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -300px 0px;
  }
  1.61% {
    background-position: -600px 0px;
  }
  2.42% {
    background-position: -900px 0px;
  }
  3.23% {
    background-position: -1200px 0px;
  }
  4.03% {
    background-position: -1500px 0px;
  }
  4.84% {
    background-position: -1800px 0px;
  }
  5.65% {
    background-position: -2100px 0px;
  }
  6.45% {
    background-position: -2400px 0px;
  }
  7.26% {
    background-position: -2700px 0px;
  }
  8.06% {
    background-position: -3000px 0px;
  }
  8.87% {
    background-position: -3300px 0px;
  }
  9.68% {
    background-position: -3600px 0px;
  }
  10.48% {
    background-position: -3900px 0px;
  }
  11.29% {
    background-position: -4200px 0px;
  }
  12.10% {
    background-position: -4500px 0px;
  }
  12.90% {
    background-position: 0px -300px;
  }
  13.71% {
    background-position: -300px -300px;
  }
  14.52% {
    background-position: -600px -300px;
  }
  15.32% {
    background-position: -900px -300px;
  }
  16.13% {
    background-position: -1200px -300px;
  }
  16.94% {
    background-position: -1500px -300px;
  }
  17.74% {
    background-position: -1800px -300px;
  }
  18.55% {
    background-position: -2100px -300px;
  }
  19.35% {
    background-position: -2400px -300px;
  }
  20.16% {
    background-position: -2700px -300px;
  }
  20.97% {
    background-position: -3000px -300px;
  }
  21.77% {
    background-position: -3300px -300px;
  }
  22.58% {
    background-position: -3600px -300px;
  }
  23.39% {
    background-position: -3900px -300px;
  }
  24.19% {
    background-position: -4200px -300px;
  }
  25.00% {
    background-position: -4500px -300px;
  }
  25.81% {
    background-position: 0px -600px;
  }
  26.61% {
    background-position: -300px -600px;
  }
  27.42% {
    background-position: -600px -600px;
  }
  28.23% {
    background-position: -900px -600px;
  }
  29.03% {
    background-position: -1200px -600px;
  }
  29.84% {
    background-position: -1500px -600px;
  }
  30.65% {
    background-position: -1800px -600px;
  }
  31.45% {
    background-position: -2100px -600px;
  }
  32.26% {
    background-position: -2400px -600px;
  }
  33.06% {
    background-position: -2700px -600px;
  }
  33.87% {
    background-position: -3000px -600px;
  }
  34.68% {
    background-position: -3300px -600px;
  }
  35.48% {
    background-position: -3600px -600px;
  }
  36.29% {
    background-position: -3900px -600px;
  }
  37.10% {
    background-position: -4200px -600px;
  }
  37.90% {
    background-position: -4500px -600px;
  }
  38.71% {
    background-position: 0px -900px;
  }
  39.52% {
    background-position: -300px -900px;
  }
  40.32% {
    background-position: -600px -900px;
  }
  41.13% {
    background-position: -900px -900px;
  }
  41.94% {
    background-position: -1200px -900px;
  }
  42.74% {
    background-position: -1500px -900px;
  }
  43.55% {
    background-position: -1800px -900px;
  }
  44.35% {
    background-position: -2100px -900px;
  }
  45.16% {
    background-position: -2400px -900px;
  }
  45.97% {
    background-position: -2700px -900px;
  }
  46.77% {
    background-position: -3000px -900px;
  }
  47.58% {
    background-position: -3300px -900px;
  }
  48.39% {
    background-position: -3600px -900px;
  }
  49.19% {
    background-position: -3900px -900px;
  }
  50.00% {
    background-position: -4200px -900px;
  }
  50.81% {
    background-position: -4500px -900px;
  }
  51.61% {
    background-position: 0px -1200px;
  }
  52.42% {
    background-position: -300px -1200px;
  }
  53.23% {
    background-position: -600px -1200px;
  }
  54.03% {
    background-position: -900px -1200px;
  }
  54.84% {
    background-position: -1200px -1200px;
  }
  55.65% {
    background-position: -1500px -1200px;
  }
  56.45% {
    background-position: -1800px -1200px;
  }
  57.26% {
    background-position: -2100px -1200px;
  }
  58.06% {
    background-position: -2400px -1200px;
  }
  58.87% {
    background-position: -2700px -1200px;
  }
  59.68% {
    background-position: -3000px -1200px;
  }
  60.48% {
    background-position: -3300px -1200px;
  }
  61.29% {
    background-position: -3600px -1200px;
  }
  62.10% {
    background-position: -3900px -1200px;
  }
  62.90% {
    background-position: -4200px -1200px;
  }
  63.71% {
    background-position: -4500px -1200px;
  }
  64.52% {
    background-position: 0px -1500px;
  }
  65.32% {
    background-position: -300px -1500px;
  }
  66.13% {
    background-position: -600px -1500px;
  }
  66.94% {
    background-position: -900px -1500px;
  }
  67.74% {
    background-position: -1200px -1500px;
  }
  68.55% {
    background-position: -1500px -1500px;
  }
  69.35% {
    background-position: -1800px -1500px;
  }
  70.16% {
    background-position: -2100px -1500px;
  }
  70.97% {
    background-position: -2400px -1500px;
  }
  71.77% {
    background-position: -2700px -1500px;
  }
  72.58% {
    background-position: -3000px -1500px;
  }
  73.39% {
    background-position: -3300px -1500px;
  }
  74.19% {
    background-position: -3600px -1500px;
  }
  75.00% {
    background-position: -3900px -1500px;
  }
  75.81% {
    background-position: -4200px -1500px;
  }
  76.61% {
    background-position: -4500px -1500px;
  }
  77.42% {
    background-position: 0px -1800px;
  }
  78.23% {
    background-position: -300px -1800px;
  }
  79.03% {
    background-position: -600px -1800px;
  }
  79.84% {
    background-position: -900px -1800px;
  }
  80.65% {
    background-position: -1200px -1800px;
  }
  81.45% {
    background-position: -1500px -1800px;
  }
  82.26% {
    background-position: -1800px -1800px;
  }
  83.06% {
    background-position: -2100px -1800px;
  }
  83.87% {
    background-position: -2400px -1800px;
  }
  84.68% {
    background-position: -2700px -1800px;
  }
  85.48% {
    background-position: -3000px -1800px;
  }
  86.29% {
    background-position: -3300px -1800px;
  }
  87.10% {
    background-position: -3600px -1800px;
  }
  87.90% {
    background-position: -3900px -1800px;
  }
  88.71% {
    background-position: -4200px -1800px;
  }
  89.52% {
    background-position: -4500px -1800px;
  }
  90.32% {
    background-position: 0px -2100px;
  }
  91.13% {
    background-position: -300px -2100px;
  }
  91.94% {
    background-position: -600px -2100px;
  }
  92.74% {
    background-position: -900px -2100px;
  }
  93.55% {
    background-position: -1200px -2100px;
  }
  94.35% {
    background-position: -1500px -2100px;
  }
  95.16% {
    background-position: -1800px -2100px;
  }
  95.97% {
    background-position: -2100px -2100px;
  }
  96.77% {
    background-position: -2400px -2100px;
  }
  97.58% {
    background-position: -2700px -2100px;
  }
  98.39% {
    background-position: -3000px -2100px;
  }
  99.19% {
    background-position: -3300px -2100px;
  }
  100.00% {
    background-position: -3600px -2100px;
  }
}
@keyframes textScrollShow {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
.leftPart_serviceCommand {
  position: absolute;
  top: 88px;
  left: 48px;
  width: 1458px;
  .content {
    background-color: rgba(0, 11, 32, 0.26);
  }
  .resources {
    .content {
      height: 386px;
      position: relative;
      // overflow: hidden;
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
        justify-content: space-between;
        align-items: center;
        padding: 35px 46px;
      }
      .changeRange {
        position: absolute;
        display: flex;
        right: 36px;
        top: -64px;
        height: 46px;
        font-size: 20px;
        line-height: 46px;
        z-index: 9;
        p {
          width: 60px;
          text-align: center;
          cursor: pointer;
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
      section {
        width: 330px;
        height: 334px;
        position: relative;
       .animated_icon {
          position: absolute;
          bottom: -90px;
          left: -10px;
          width: 300px;
          height: 300px;
          animation: fadeInUp 2s;
          .animated_icon_container {
            width: 100%;
            height: 100%;
            background: url("/image/animationKeyFramesBg/animate_square.png")
              no-repeat;
            background-position: center;
            transform: scale(1.5);
            animation: leftTopIconAnimation 5s steps(1) infinite;
          }
        }
        // background: url("/image/serviceCommand/dyhgl.png") no-repeat;
        &:nth-of-type(1) {
          background: url("/image/serviceCommand/left_icon1.png") no-repeat;
          background-position: 50% 0%;
          background-size: 86%;
        }
        &:nth-of-type(2) {
          background: url("/image/serviceCommand/left_icon2.png") no-repeat;
          background-position: 50% 0%;
          background-size: 86%;
        }
        &:nth-of-type(3) {
          background: url("/image/serviceCommand/left_icon3.png") no-repeat;
          background-position: 50% 0%;
          background-size: 86%;
        }
        &:nth-of-type(4) {
          background: url("/image/serviceCommand/left_icon4.png") no-repeat;
          background-position: 50% 0%;
          background-size: 86%;
        }
        &:nth-of-type(5) {
          background: url("/image/serviceCommand/left_icon5.png") no-repeat;
          background-position: 50% 0%;
          background-size: 86%;
        }
        background-size: 100%;
        .title {
          color: #b1d9fb;
          font-size: 23px;
          padding: 30px 20px 0 106px;
          height: 70px;
          display: flex;
          align-items: center;
          overflow: hidden;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          animation: textScrollShow 2s;
        }
        .num {
          color: #5affea;
          font-size: 69px;
          height: 260px;
          // padding-left: 70px;
          padding-top: 48px;
          text-align: center;
          animation: fadeInDown 2s;
          span {
            font-size: 24px;
            // color: #999;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .maintenance {
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
      }
      #leftBottompBar {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>