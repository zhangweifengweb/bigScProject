<template>
  <div class="container">
    <div :id="id" :option="option" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
/* eslint-disable */
import HighCharts from "highcharts/highcharts";
import pyramid3d from "highcharts/modules/pyramid3d";
import funnel3d from "highcharts/modules/funnel3d";
import cylinder from "highcharts/modules/cylinder";
export default {
  props: {
    id: {
      type: String,
    },
    //option 是图表的配置数据
    option: {
      type: Object,
      default() {
        return {};
      },
      //   示例数据
    },
  },
  data() {
    return {
      counter: 0,
    };
  },
  watch: {
    option: {
      handler() {
        cylinder(HighCharts);
        funnel3d(HighCharts);
        pyramid3d(HighCharts);
        this.drawPyramid(this.id);
      },
      deep: true,
    },
  },
  mounted() {
    // HighCharts.chart(this.id, this.option);
    // cylinder(HighCharts);
    // funnel3d(HighCharts);
    // pyramid3d(HighCharts);
    // this.drawPyramid(this.id);
  },
  methods: {
    drawPyramid(id) {
      let baseOption = {
        chart: {
          type: "pyramid3d",
          animation: false,
          backgroundColor: "none",
          options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50,
          },
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        colors: [],
        legend: {
          layout: "vertical",
          backgroundColor: "#FFFFFF",
          align: "left",
          verticalAlign: "top",
          x: 100,
          y: 70,
          floating: true,
          shadow: true,
        },
        plotOptions: {
          series: {
            dataLabels: {
              crop: false,
              connectorWidth: 5,
              connectorColor: "blue",
              // connectorShape:'crookedLine',
              softConnector: true,
              enabled: true,
              format: "<b>{point.name} </b>({point.y:,.0f})",
              color: "#fff",
              allowOverlap: false,
              x: 10,
              y: -5,
            },
            width: "60%",
            height: "70%",
            center: ["50%", "35%"],
          },
        },
        series: [],
      };
      let option = Object.assign({}, baseOption, this.option);
      // console.log(option)
      // 生成不同高度的3d饼图
      HighCharts.chart(id, option);
    },
  },
};
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>
