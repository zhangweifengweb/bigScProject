<template>
  <div class="container">
    <div :id="id" :option="option" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
/* eslint-disable */
import HighCharts from "highcharts";
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
    },
  },
  data() {
    return {
      counter: 0,
    };
  },
  watch:{
    option(val){
      this.drawPie(this.id);
      console.log(val)
    }
  },
  mounted() {
    // console.log(this.option.series[0],'=====');
    // HighCharts.chart(this.id, this.option);
    this.$nextTick(()=>{
      if(this.option.series[0].data){
        this.drawPie(this.id);
      }
      
    });
    
  },
  methods: {
    drawPie(id) {
      // 修改3d饼图绘制过程
      let counter = this.counter;
      var each = HighCharts.each,
        round = Math.round,
        cos = Math.cos,
        sin = Math.sin,
        deg2rad = Math.deg2rad;
      HighCharts.wrap(
        HighCharts.seriesTypes.pie.prototype,
        "translate",
        function (proceed) {
          proceed.apply(this, [].slice.call(arguments, 1));
          // Do not do this if the chart is not 3D
          if (!this.chart.is3d()) {
            return;
          }
          var series = this,
            chart = series.chart,
            options = chart.options,
            seriesOptions = series.options,
            depth = seriesOptions.depth || 0,
            options3d = options.chart.options3d,
            alpha = options3d.alpha,
            beta = options3d.beta,
            z = seriesOptions.stacking
              ? (seriesOptions.stack || 0) * depth
              : series._i * depth;
          z += depth / 2;
          if (seriesOptions.grouping !== false) {
            z = 0;
          }
          each(series.data, function (point) {
            var shapeArgs = point.shapeArgs,
              angle;
            point.shapeType = "arc3d";
            var ran = point.options.h;
            shapeArgs.z = z;
            shapeArgs.depth = depth * 0.75 + ran;
            shapeArgs.alpha = alpha;
            shapeArgs.beta = beta;
            shapeArgs.center = series.center;
            shapeArgs.ran = ran;
            angle = (shapeArgs.end + shapeArgs.start) / 2;
            point.slicedTranslation = {
              translateX: round(
                cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
              ),
              translateY: round(
                sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
              ),
            };
          });
        }
      );
      (function (H) {
        H.wrap(
          HighCharts.SVGRenderer.prototype,
          "arc3dPath",
          function (proceed) {
            // Run original proceed method
            var ret = proceed.apply(this, [].slice.call(arguments, 1));
            ret.zTop = (ret.zOut + 0.5) / 100;
            return ret;
          }
        );
      })(HighCharts);
      let baseOption = {
        chart: {
          type: "pie",
          animation: false,
          backgroundColor: "none",
          // spacing:[200,0,0,0],
          events: {
            load: function () {
              var each = HighCharts.each,
                points = this.series[0].points;
              each(points, function (p, i) {
                p.graphic.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side1.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side2.attr({
                  translateY: -p.shapeArgs.ran,
                });
              });
            },
            render: function () {
              var each = HighCharts.each,
                points = this.series[0].points;
              each(points, function (p, i) {
                p.graphic.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side1.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side2.attr({
                  translateY: -p.shapeArgs.ran,
                });
              });
            },
          },
          options3d: {
            enabled: true,
            alpha: 65,
            beta: 0,
          },
        },
        credits: {
          enabled: false,
        },
        colors: [],
        // title: {
        //   text: "",
        //   useHTML: true,
        //   align:'center',
        //   // floating: true,
        //   style: {
        //     color: "#74B4FF",
        //     // fontSize:24,
        //     display:'flex'
        //   },
        // },
        // subTitle:{
        //   text:'单位：家',
        //   align:'left',
        //   style:{
        //     color:'#fff'
        //   }
        // },
        legend: {
          //控制图例显示位置
          // layout: 'vertical',
          floating: true,
          // squareSymbol: true,
          align: "center",
          verticalAlign: "top",
          borderWidth: 0,
          itemStyle: {
            color: "#d3eeff",
            fontSize: 16,
            fontWeight: 500,
            // margin:[20,0]
          },
          // itemWidth: 100,
          itemDistance: 20,
          itemHoverStyle: "none",
          width: "100%",
        },

        tooltip: {
          enabled: true,
        },
        plotOptions: {
          pie: {
            // allowPointSelect: true,
            cursor: "pointer",
            depth: 20,
            innerSize: 120,
            center: ["50%", "50%"],
            size: "80%",
            dataLabels: {
              enabled: true,
              color: "#eaf8ff",
              // connectorColor: this.point.color,
              distance:25,
              padding: 0,
              connectorPadding: 0,
              connectorWidth: 2,
              softConnector: false,
              style: {
                fontSize: 18,
                fontFamily: "numFont",
              },
              // useHTML: true,
              formatter: function () {
                return `<div class="pieLabel"><p class="pie_title"></p><br><p style='font-size:20px;color:${this.point.color}' class="num pie_num">${this.point.y}</p></div>`;
                // return this.point.name+this.point.y+'%';
              },
            },
            showInLegend: true,
            point: {
              events: {
                legendItemClick: function () {
                  return flase;
                },
              },
            },
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
rect.highcharts-point {
  width: 20px;
  height: 15px;
  border-radius: 1px !important;
  margin-right: 4px;
  //  transform: scale(0.5);//缩放
  //  transform-origin: 5% 10%;//调整位置
}
.pieTitle {
  display: flex;
  margin-top: 40px;
  font-size: 18px;
  letter-spacing: 3px;
  &:nth-of-type(2) {
    margin-left: 30px;
  }
  .num {
    font-size: 26px;
    line-height: 24px;
  }
}
/* 容器 */
.container {
  width: 100%;
  height: 100%;
  .pieLabel {
    //   padding-right: 100px;
    text-align: left;
    padding-bottom: 50px;
    .pie_title {
      color: #eaf8ff;
      font-size: 30px;
    }
    .pie_num {
      font-weight: 700;
      color: #74e8ff;
      font-size: 90px;
      margin-left: 20px;
    }
  }
}
</style>

