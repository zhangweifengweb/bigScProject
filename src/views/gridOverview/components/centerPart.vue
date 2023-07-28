<template>
  <div class="centerPart_gridOverview">
    <div class="container">
      <div class="info">
        <div class="left">
          <section v-for="(item, index) in leftdata" :key="index">
            <p class="num">
              {{ item.indicatorValue }}<span>{{ item.unit }}</span>
            </p>
            <p class="title">{{ item.indicatorName }}</p>
            <!-- <img src="/image/gridOverview/center_left1.png" alt=""> -->
          </section>
          <!-- <section>
            <p class="num">78<span>公里</span></p>
            <p class="title">10千伏线路长度</p>
            <img src="/image/gridOverview/center_left2.png" alt="">
          </section>
          <section>
            <p class="num">130<span>条</span></p>
            <p class="title">城网线路</p>
            <img src="/image/gridOverview/center_left3.png" alt="">
          </section>
          <section>
            <p class="num">70<span>条</span></p>
            <p class="title">农网线路</p>
            <img src="/image/gridOverview/center_left4.png" alt="">
          </section> -->
        </div>
        <div class="right">
          <section v-for="(item, index) in rightdata" :key="index">
            <p class="num">
              {{ item.indicatorValue }}<span>{{ item.unit }}</span>
            </p>
            <p class="title">{{ item.indicatorName }}</p>
            <!-- <img src="/image/gridOverview/center_left1.png" alt=""> -->
          </section>

          <!-- <section>
            <p class="num">120<span>条</span></p>
            <p class="title">电缆线路</p>
            <img src="/image/gridOverview/center_right1.png" alt="">
          </section>
          <section>
            <p class="num">80<span>条</span></p>
            <p class="title">架空线路</p>
            <img src="/image/gridOverview/center_right2.png" alt="">
          </section>
          <section>
            <p class="num">30<span>条</span></p>
            <p class="title">联络线路</p>
            <img src="/image/gridOverview/center_right3.png" alt="">
          </section>
          <section>
            <p class="num">84<span>%</span></p>
            <p class="title">联络率</p>
            <img src="/image/gridOverview/center_right4.png" alt="">
          </section> -->
        </div>
        <div class="bottom">
          <div class="bottom_container">
            <div class="bottom_content">
              <div
                class="item"
                v-for="(item, index) in bottomdata"
                :key="index"
              >
                <p class="num">
                  {{ item.indicatorValue }}<span>{{ item.unit }}</span>
                </p>
                <p class="title">{{ item.indicatorName }}</p>
              </div>
              <!-- <div class="item">
                <p class="num">35<span>千伏安</span></p>
                <p class="title">容量</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="charts">
        <mapChart
          @changeMap="changeMap"
          ref="mapComponents"
          :seriesArr="series"
          v-if="series.length != 0"
          :legendShow="true"
        />
      </div>
    </div>
  </div>
</template>
<script>
import mapChart from "@/components/mapChart";
export default {
  name: "baiduMap",
  components: {
    mapChart,
  },
  props: {
    initData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      series: [],
      leftdata: [],
      bottomdata: [],
      rightdata: [],
    };
  },
  watch: {
    initData(val) {
      // console.log("中间数据", val);
      this.leftdata = [];
      this.bottomdata = [];
      this.rightdata = [];
      val.screenTargetPart01Data.targetContent.forEach((item, index) => {
        if (index < 4) {
          this.leftdata.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
            unit: item.unit.split("/")[1],
          });
        } else if (index >= 4 && index < 6) {
          this.bottomdata.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
            unit: item.unit.split("/")[1],
          });
        } else {
          this.rightdata.push({
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
            unit: item.unit.split("/")[1],
          });
        }
      });
    },
  },
  methods: {
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
  },
  mounted() {
    this.series = [
      {
        name: "110千伏变电站",
        type: "scatter3D",
        coordinateSystem: "geo3D",
        // minHeight: 100,
        // symbol:
        //   "path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z",
        symbolSize: [30, 30],
        opacity: 1,
        label: {
          show: true,
          formatter: "{b}",
          textStyle: {
            color: "#fff",
            fontSize: 18,
            fontWeight: 900,
          },
        },
        emphasis: {
          //当鼠标放上去  地区区域是否显示名称
          label: { show: false },
        },
        itemStyle: {
          color: "#DE5C42",
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: [
          {
            name: "张湾变",
            value: [105.438778, 35.971569, 0],
          },
          {
            name: "西吉变",
            value: [105.729112, 35.96385, 0],
          },
          {
            name: "将台变",
            value: [105.856824, 35.824491, 0],
          },
          {
            name: "渝河变",
            value: [105.834831, 35.560177, 0],
          },
          {
            name: "隆德变",
            value: [106.02134, 35.699089, 0],
          },
          {
            name: "香水变",
            value: [106.345042, 35.501023, 0],
          },
          {
            name: "泾源变",
            value: [106.326413, 35.634447, 0],
          },
          {
            name: "蒿店变",
            value: [106.415991, 35.671396, 0],
          },
          {
            name: "瓦亭变",
            value: [106.302543, 35.699773, 0],
          },
          {
            name: "中河变",
            value: [106.079948, 36.337105, 0],
          },
          {
            name: "南郊变",
            value: [106.158258, 35.860557, 0],
          },
          {
            name: "北郊变",
            value: [106.191442, 35.935196, 0],
          },
          {
            name: "高平变",
            value: [106.36934, 36.138473, 0],
          },
          {
            name: "申庄变",
            value: [106.131442, 36.135196, 0],
          },
          {
            name: "黄铎堡变",
            value: [106.078846, 36.210122, 0],
          },
          {
            name: "三营变",
            value: [106.258367, 36.297223, 0],
          },
          {
            name: "李寨变",
            value: [106.614568, 35.854066, 0],
          },
          {
            name: "彭阳变",
            value: [106.417715, 36.006951, 0],
          },
          {
            name: "任湾变",
            value: [106.684542, 35.827488, 0],
          },
        ],
        zlevel: 1,
      },
      {
        name: "35千伏变电站",
        type: "scatter3D",
        coordinateSystem: "geo3D",
        // symbol:
        //   "path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z",
        // symbolSize: [60, 80],
        label: {
          show: true,
          formatter: "{b}",
          textStyle: {
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
          },
        },
        emphasis: {
          //当鼠标放上去  地区区域是否显示名称
          label: { show: false },
        },
        opacity: 1,
        // label: {
        //   show: true,
        //   formatter: "{b}",
        // },
        itemStyle: {
          color: "#FFF262",
        },
        data: [
          {
            name: "杨明变",
            value: [106.514035, 35.820305, 0],
          },
          {
            name: "火石寨变",
            value: [105.755264, 36.087568, 0],
          },
          {
            name: "袁河变",
            value: [105.674894, 35.990697, 0],
          },
          {
            name: "新营变",
            value: [105.604725, 36.073643, 0],
          },
          {
            name: "红耀变",
            value: [105.516014, 36.045474, 0],
          },
          {
            name: "马建变",
            value: [105.497148, 35.947227, 0],
          },
          {
            name: "苏堡变",
            value: [105.515624, 35.873, 0],
          },
          {
            name: "平峰变",
            value: [105.574078, 35.747435, 0],
          },
          {
            name: "兴坪变",
            value: [105.671936, 35.848469, 0],
          },
          {
            name: "西滩变",
            value: [105.752831, 35.887491, 0],
          },
          {
            name: "王民变",
            value: [105.748171, 35.807519, 0],
          },
          {
            name: "白崖变",
            value: [106.575599, 35.903377, 0],
          },
          {
            name: "下堡变",
            value: [105.915369, 36.006435, 0],
          },
          {
            name: "南台变",
            value: [106.018289, 35.743206, 0],
          },
          {
            name: "玉桥变",
            value: [105.817061, 35.627714, 0],
          },
          {
            name: "恒光变",
            value: [105.839068, 35.56444, 0],
          },
          {
            name: "温堡变",
            value: [105.966603, 35.456461, 0],
          },
          {
            name: "桃山变",
            value: [106.077627, 35.50249, 0],
          },
          {
            name: "燕山变",
            value: [106.077627, 35.40249, 0],
          },
          {
            name: "白面变",
            value: [106.410792, 35.416017, 0],
          },
          {
            name: "黄花变",
            value: [106.415472, 35.510728, 0],
          },
          {
            name: "沟口变",
            value: [106.560965, 35.791743, 0],
          },
          {
            name: "开城变",
            value: [106.263217, 35.85854, 0],
          },
          {
            name: "观庄变",
            value: [106.115879, 35.757947, 0],
          },
          {
            name: "奠安变",
            value: [106.136822, 35.455566, 0],
          },
          {
            name: "城阳变",
            value: [106.777029, 35.823759, 0],
          },
          {
            name: "石岔变",
            value: [106.559226, 36.01458, 0],
          },
        ],
        zlevel: 2,
      },
    ];
  },
};
</script>
<style lang="scss">
@keyframes center_bottom_animation {
  0% {
    background-position: 0 200%;
  }
  50% {
    background-position: 0 120%;
  }
  100% {
    background-position: 0 100%;
  }
}
@keyframes center_bg_animation {
  0% {
    background-size: 75%;
    background-position: center;
  }
  50% {
    background-size: 100%;
    background-position: center;
  }
  100% {
    background-size: 75%;
    background-position: center;
  }
}
.centerPart_gridOverview {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  // background: url("/image/gridOverview/center_bg.png") no-repeat;
  // background-position: center;
  // background-size: 75%;
  // background-origin: border-box;
  // animation: center_bg_animation 1s linear;
  .container {
    height: 100%;
    position: relative;
    // background: url("/image/gridOverview/center_bottom_bg.png") no-repeat;
    // background-position: 0 100%;
    // background-size: 100% 60%;
    // animation: center_bottom_animation 1s linear;
    .info {
      height: 100%;
      background: url("/image/operationMonitor/center_arrow.png") no-repeat;
      background-position: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      animation: zoomIn 2s;
      section {
        width: 300px;
        height: 110px;
        &:nth-of-type(-n + 4) {
          margin-bottom: 60px;
        }
        &:nth-of-type(1) {
          margin-top: 60px;
        }
        .title {
          font-size: 26px;
          color: #fff;
          margin-top: 5px;
          letter-spacing: 3px;
        }
        .num {
          font-size: 50px;
          span {
            font-size: 24px;
            // color: #b1d9fb;
            margin-left: 0.5em;
            text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
            color: #00fff8;
          }
        }
      }
      .left {
        padding-left: 95px;
        section {
          padding-left: 50px;
          position: relative;
          img {
            position: absolute;
            right: 50px;
            top: 20px;
          }
        }
        section:nth-of-type(1) {
          background: url("/image/gridOverview/left_info_bg1.png") no-repeat;
          margin-left: 56px;
        }
        section:nth-of-type(2) {
          background: url("/image/gridOverview/left_info_bg2.png") no-repeat;
        }
        section:nth-of-type(3) {
          background: url("/image/gridOverview/left_info_bg3.png") no-repeat;
        }
        section:nth-of-type(4) {
          background: url("/image/gridOverview/left_info_bg4.png") no-repeat;
          margin-left: 56px;
        }
      }
      .right {
        text-align: right;
        padding-right: 95px;
        section {
          padding-right: 50px;
          position: relative;
          img {
            position: absolute;
            left: 50px;
            top: 15px;
          }
        }
        section:nth-of-type(1) {
          background: url("/image/gridOverview/right_info_bg1.png") no-repeat;
          margin-left: -56px;
        }
        section:nth-of-type(2) {
          background: url("/image/gridOverview/right_info_bg2.png") no-repeat;
          margin-right: 0;
        }
        section:nth-of-type(3) {
          background: url("/image/gridOverview/right_info_bg3.png") no-repeat;
        }
        section:nth-of-type(4) {
          background: url("/image/gridOverview/right_info_bg4.png") no-repeat;
          margin-left: -56px;
        }
      }
      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 160px;
        width: 100%;
        background: url("/image/gridOverview/center_bottom.png") no-repeat;
        background-position: center;
        z-index: 999;
        text-align: center;
        .bottom_container {
          display: inline-block;
          height: 100%;
          width: 920px;
          // display: flex;
          .bottom_content {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 20px 200px 0 200px;
            .item {
              text-align: left;
              .num {
                font-size: 50px;
                span {
                  font-size: 24px;
                  margin-left: 1em;
                }
              }
              .title {
                font-size: 26px;
                font-weight: 400;
                line-height: 42px;
                color: #fff;
                letter-spacing: 4px;
              }
            }
          }
        }
      }
    }
    .charts {
      position: absolute;
      width: 1600px;
      height: calc(100% - 180px);
      top: 140px;
      left: 558px;
      animation: bounceIn 1s;
      #mapChart {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
