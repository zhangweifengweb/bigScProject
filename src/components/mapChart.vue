<template>
  <div id="jqfbid" style="height: 100%; width: 100%"></div>
</template>
 
<script>
/* eslint-disable */
import guyuan from "../assets/json/map/guyuan.json";
import "echarts-gl";

export default {
  name: "echart-map",
  props:{
    seriesArr: {
      type: Array,
      default() {
        return [];
      },
    },
    legendShow: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    let jsonMap = {
      固原: guyuan,
    };
    //循环遍历注册地图
    for (let index in jsonMap) {
      this.$echarts.registerMap(index, jsonMap[index]);
    }
    return {};
  },
  mounted() {
    this.chinaConfigure();
  },
  methods: {
    chinaConfigure() {
      // console.log(this.userJson);
      let myChart = this.$echarts.init(document.getElementById("jqfbid")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      // let symbolImg = 'image://'+ require('@/assets/ycgdfw_middlepart_icon_map_heavy.png');
      myChart.setOption({
        // 进行相关配置
        // backgroundColor: "#02AFDB",
        // tooltip: {}, // 鼠标移到图里面的浮动提示框
        // dataRange: {
        //   show: false,
        //   min: 0,
        //   max: 500,
        //   text: ["High", "Low"],
        //   realtime: true,
        //   calculable: true,
        //   color: ["orangered", "yellow", "lightskyblue"],
        // },
        // geo: {
        //   // 这个是重点配置区
        //   map: "固原", // 根据名字显示中国地图，省或市地图，
        //   roam: true,
        //   label: {
        //     normal: {
        //       show: true, // 是否显示对应地名
        //       textStyle: {
        //         color: "rgba(0,0,0,0.4)",
        //       },
        //     },
        //   },
        //   itemStyle: {
        //     normal: {
        //       borderColor: "rgba(0, 0, 0, 0.2)",
        //     },
        //     emphasis: {
        //       areaColor: null,
        //       shadowOffsetX: 0,
        //       shadowOffsetY: 0,
        //       shadowBlur: 20,
        //       borderWidth: 0,
        //       shadowColor: "rgba(0, 0, 0, 0.5)",
        //     },
        //   },
        // },
        geo3D: {
          map: "固原",
          show: true,
          itemStyle: {
            // color: "rgba(1,99,197,.9)", //地图颜色
            color: "rgba(10,90,211,.9)",
            borderWidth: 2, //设置外层边框
            borderColor: "rgba(78,191,238,1)",
            shadowColor: "rgba(0,54,255, 1)",
            shadowBlur: 200,
            // borderColor: "#459bca" //分界线颜色
            // shadowColor: "red",
            // shadowBlur: 10
          },
          label: {
            show: false, //是否显示市
            textStyle: {
              color: "#fff", //文字颜色
              fontSize: 20, //文字大小
            },
          },
          emphasis: {
            //当鼠标放上去  地区区域是否显示名称
            label: {
              show: false,
              distance: 20,
              textStyle: {
                color: [1, 1, 1],
              },
            },
            itemStyle: {
              color: "rgba(120,196,236,.6)",
              // fontSize: 16,
              // backgroundColor: "rgba(1,101,197,.9)",
            },
          },
          viewControl: {
            distance: 90, //地图视角 控制初始大小
            rotateSensitivity: 1, //禁止旋转
            zoomSensitivity: 1, //禁止缩放
            alpha: 40,
            beta: 0,
            center: [5, -20, 0],
          },
          zoom: 7,
          roam: true,
          light: {
            //光照阴影
            main: {
              color: "#fff", //光照颜色
              intensity: 0.6, //光照强度
              //shadowQuality: 'high', //阴影亮度
              shadow: true, //是否显示阴影
              alpha: 55,
              beta: 10,
            },
            ambient: {
              intensity: 0.6,
            },
          },
          // environment: new echarts.graphic.LinearGradient(
          //   0,
          //   0,
          //   0,
          //   1,
          //   [
          //     {
          //       // 配置为垂直渐变的背景
          //       offset: 0,
          //       color: "#00aaff", // 天空颜色
          //     },
          //     {
          //       offset: 0.7,
          //       color: "#998866", // 地面颜色
          //     },
          //     {
          //       offset: 1,
          //       color: "#998866", // 地面颜色
          //     },
          //   ],
          //   false
          // ),
        },
        legend: {
          show: this.legendShow,
          right: 0,
          bottom: 200,
          orient: "vertical",
          textStyle: {
            fontSize: 25,
            color: "#B1D9FB",
            padding: [20, 10],
          },
          // itemHeight: 200,

          // icon:"path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z"
        },
        // tooltip: {
        //   show: true,
        //   backgroundColor:'none',
        //   borderColor:'none',
        //   borderWidth: "0",
        //   padding:0,
        // formatter: function (params) {
        //   // console.info(params);
        //   return `<div class="markIcon_bg">
        //   <p>异常类型：<span>重载</span></p>
        //   <p>异常地址：XXX路段XXX号变压器</p>
        //   </div>`
        // },
        // },
        series:this.seriesArr,
      });
      myChart.on("click", (params) => {
        console.log(params.data.name);
        window.open('https://www.baidu.com/',1)
      });
    },
  },
};
</script>
<style lang="scss">
.markIcon_bg {
  background: url("/image/operationMonitor/mark_bg.png") no-repeat;
  background-position: 70% 20%;
  height: 200px;
  min-width: 520px;
  padding: 25px 30px;
  letter-spacing: 5px;
  p:nth-of-type(1) {
    color: #d3eeff;
    font-size: 24px;
    margin: 40px 0 14px 20px;
    span {
      font-size: 30px;
    }
  }
  p:nth-of-type(2) {
    color: #ffffff;
    font-size: 24px;
    margin: 0 0 0 20px;
  }
}
</style>