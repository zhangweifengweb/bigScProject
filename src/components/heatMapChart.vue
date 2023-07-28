<template>
  <div id="heatMap"></div>
</template>
<script>
import guyuan from "../assets/json/map/guyuan.json";
export default {
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
    this.drawHeatMap();
  },
  methods: {
    drawHeatMap() {
      let data = [
        ["106.343166", "38.658778", 8],
        ["106.443166", "38.658778", 2],
        ["106.742473", "37.795676", 10],
      ];
      let areaData = [];
      data.map((item) => {
        // 扩大热力图效果
        areaData.push(...new Array(3).fill(item));
      });
      let mapMax = Math.max(...data.map((item) => item[2]));
      let mapMin = Math.min(...data.map((item) => item[2]));
      let option = {
        geo: {
          map: "固原",
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false,
            },
          },
          layoutSize: "110%",
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
          itemStyle: {
            normal: {
              color: "rgba(2,81,130,.6)",
              borderColor: "rgba(94,206,255,1)",
              borderWidth: 0.3,
              shadowColor: "rgba(2,81,130,1)",
              shadowOffsetY: 0,
              shadowBlur: 60,
            },
          },
        },
        grid: {
          height: "80%",
          width: "80%",
        },
        visualMap: {
          //   bottom: 20,
          //   left: 20,
          show: false,
          color: ["#ff4601", "#fffc00", "#87cffa"],
          min: mapMin,
          max: mapMax,
          calculable: false,
          //   textStyle: {
          //     color: "#fff",
          //     fontSize: 12,
          //   },
        },
        series: [
          {
            mapType: "固原",
            top: "center",
            left: "center",
            width: "100%",
            height: "100%",
            name: "AQI",
            type: "heatmap",
            coordinateSystem: "geo",
            blurSize: 10,
            data: areaData,
            pointSize: 5,
            // 鼠标移入
            emphasis: {
              show: true,
              itemStyle: {
                areaColor: "rgb(255,255,0,1)",
              },
            },
          },
        ],
      };
      let myChart = this.$echarts.init(document.getElementById("heatMap"));
      window.onresize = myChart.resize;
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss">
#heatMap {
  width: 230px;
  height: 200px;
  padding: 15px 20px 20px 40px;
}
</style>