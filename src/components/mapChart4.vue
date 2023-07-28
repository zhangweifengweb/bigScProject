<template>
  <div id="jqfbid" style="height: 100%; width: 100%"></div>
</template>
 
<script>
/* eslint-disable */
import guyuan from "../assets/json/map/guyuan.json";
import "echarts-gl";

export default {
  name: "echart-map",
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
      // console.log(symbolImg)
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
            color: "rgba(158, 21, 7, .6)", //地图颜色
            borderWidth: 1, //设置外层边框
            borderColor: "#fff",
            shadowColor: "rgba(0,54,255, 1)",
            shadowBlur: 200,
            // borderColor: "#459bca" //分界线颜色
            // shadowColor: "red",
            // shadowBlur: 10
          },
          label: {
            show: false, //是否显示市
            color: "rgba(255, 255, 255, .74)", //文字颜色
            fontSize: 30, //文字大小
            // textStyle: {
            //   color: "#fff", //文字颜色
            //   fontSize: 40, //文字大小
            // },
          },
          emphasis: {
            //当鼠标放上去  地区区域是否显示名称
            label: {
              show: false, //是否显示市
              color: "rgba(255, 255, 255, .74)", //文字颜色
              fontSize: 30, //文字大小
              //   textStyle: {
              //     color: [1, 1, 1],
              //   },
            },
            itemStyle: {
              color: "RGBA(235, 156, 148, 1)",
              // fontSize: 16,
              // backgroundColor: "rgba(1,101,197,.9)",
            },
          },
          viewControl: {
            distance: 90, //地图视角 控制初始大小
            rotateSensitivity: 0, //禁止旋转
            zoomSensitivity: 0, //禁止缩放
            alpha: 35,
            beta: -10,
            center: [5, -10, 0],
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
          show: true,
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
        series: [
          //   {
          //     name: "110千伏变电站",
          //     type: "scatter3D",
          //     coordinateSystem: "geo3D",
          //     // minHeight: 100,
          //     // symbol:
          //     //   "path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z",
          //     symbolSize: [30, 30],
          //     opacity: 1,
          //     label: {
          //       show: false,
          //     },
          //     emphasis: {
          //       //当鼠标放上去  地区区域是否显示名称
          //       label: { show: false },
          //     },
          //     itemStyle: {
          //       color: "#DE5C42",
          //       borderColor:'#fff',
          //       borderWidth:2
          //     },
          //     data: [
          //       {
          //         name: "隆德变",
          //         value: [106.050804,36.144126,0],
          //       },
          //       {
          //         name: "香水变",
          //         value: [106.483715,36.166507,0],
          //       },
          //       {
          //         name: "李寨变",
          //         value: [106.157163,35.878801,0],
          //       },
          //     ],
          //     zlevel: 1,
          //   },
          //   {
          //     name: "35千伏变电站",
          //     type: "scatter3D",
          //     coordinateSystem: "geo3D",
          //     // symbol:
          //     //   "path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z",
          //     // symbolSize: [60, 80],
          //     label: {
          //       show: false,
          //     },
          //     emphasis: {
          //       //当鼠标放上去  地区区域是否显示名称
          //       label: { show: false },
          //     },
          //     opacity: 1,
          //     // label: {
          //     //   show: true,
          //     //   formatter: "{b}",
          //     // },
          //     itemStyle: {
          //       color: "#FFF262",
          //     },
          //     data: [
          //       {
          //         name: "11",
          //         value: [106.085874,35.881609,0],
          //       },
          //       {
          //         name: "22",
          //         value: [105.814514,35.983544,0],
          //       },
          //       {
          //         name: "33",
          //         value: [106.124968,35.983544,0],
          //       },
          //     ],
          //     zlevel: 2,
          //   },
          //   {
          //     // 这个就是普通连线
          //     type: "lines3D",
          //     name:'变电线路',
          //     coordinateSystem: "geo3D", // 这句的意思是连线是基于地理坐标的,geo组件将在下面给出
          //     polyline: true, // 这表示连线是否为多端点的连线
          //     zlevel: 3,
          //     data: [
          //       {
          //         value: 100,
          //         coords: [
          //           [106.085874,35.881609, 0],
          //           [106.483715,36.166507, 0],
          //         ],
          //       },
          //       {
          //         value: 100,
          //         coords: [
          //           [106.050804,36.144126, 0],
          //           [106.124968,35.983544, 0],
          //         ],
          //       },
          //       {
          //         value: 100,
          //         coords: [
          //           [106.4176,36.169304, 0],
          //           [106.067477,35.884884, 0],
          //         ],
          //       },
          //     ], // 这里就是连线的数据了 上面组装的数据就在这里使用
          //     label:{
          //       show:true,
          //     },
          //     lineStyle: {
          //       normal: {
          //         opacity: 1,
          //         width: 5,
          //         color: "#48FF79",
          //       },
          //     },
          //     effect: {
          //       show: true,
          //     },
          //     // blendMode: "lighter",
          //   },
        ],
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