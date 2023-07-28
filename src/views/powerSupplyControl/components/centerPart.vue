<template>
  <div class="centerPart_powerSupplyControl">
    <div class="container">
      <div class="info">
        <div class="left">
          <section v-for="item in leftData" :key="item.screenTargetId">
            <p class="num">{{ item.indicatorValue }}<span>次</span></p>
            <p class="title">{{ item.indicatorName }}</p>
            <!-- <img src="/image/gridOverview/center_left1.png" alt=""> -->
          </section>
          <!-- <section>
            <p class="num">24<span>%</span></p>
            <p class="title">任务完成率</p>
            <img src="/image/gridOverview/center_left2.png" alt="">
          </section>
          <section>
            <p class="num">24<span>户</span></p>
            <p class="title">保电用户</p>
            <img src="/image/gridOverview/center_left3.png" alt="">
          </section> -->
        </div>
        <div class="right">
          <section v-for="item in rightData" :key="item.screenTargetId">
            <p class="num">{{ item.indicatorValue }}<span>次</span></p>
            <p class="title">{{ item.indicatorName }}</p>
            <!-- <img src="/image/gridOverview/center_left1.png" alt=""> -->
          </section>
          <!-- <section>
            <p class="num">60<span>人</span></p>
            <p class="title">出动人数</p>
            <img src="/image/gridOverview/center_right1.png" alt="">
          </section>
          <section>
            <p class="num">26<span>次</span></p>
            <p class="title">出动车次</p>
            <img src="/image/gridOverview/center_right2.png" alt="">
          </section>
          <section>
            <p class="num">16<span>次</span></p>
            <p class="title">排除隐患</p>
            <img src="/image/gridOverview/center_right3.png" alt="">
          </section> -->
        </div>
        <div class="bottom">
          <div
            class="bottom_info"
            v-for="item in bottomData"
            :key="item.screenTargetId"
          >
            {{ item.indicatorName }}
            <p class="num">{{ item.indicatorValue }}</p>
            次
          </div>
          <!-- <div class="bottom_info">
            重要保电
            <p class="num">108</p>
            次
          </div> -->
        </div>
      </div>
      <div class="charts">
        <mapChart
          @changeMap="changeMap"
          ref="mapComponents"
          :seriesArr="series"
          v-if="series.length != 0"
          :legendShow="false"
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
      leftData: [
        {
          screenTargetId: "1",
          indicatorName: "任务总数",
          indicatorValue: "4",
        },
        {
          screenTargetId: "2",
          indicatorName: "任务完成率",
          indicatorValue: "4",
        },
        {
          screenTargetId: "3",
          indicatorName: "保电用户",
          indicatorValue: "4",
        },
      ],
      rightData: [
        {
          screenTargetId: "1",
          indicatorName: "任务总数",
          indicatorValue: "4",
        },
        {
          screenTargetId: "2",
          indicatorName: "任务完成率",
          indicatorValue: "4",
        },
        {
          screenTargetId: "3",
          indicatorName: "保电用户",
          indicatorValue: "4",
        },
      ],
      bottomData: [
        {
          screenTargetId: "1",
          indicatorName: "保电用户",
          indicatorValue: "4",
        },
        {
          screenTargetId: "2",
          indicatorName: "保电用户",
          indicatorValue: "4",
        },
      ],
    };
  },
  methods: {
    changeMap(e) {
      this.$refs.mapComponents.renderMap(this.city[e]);
    },
  },
  watch: {
    initData(val) {
      // console.log("中间数据", val);
      this.rightData = [];
      this.leftData = [];
      this.bottomData = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item, index) => {
        if (index <= 2) {
          this.leftData.push({
            screenTargetId: index,
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 2 && index <= 5) {
          this.rightData.push({
            screenTargetId: index,
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        } else if (index > 5) {
          this.bottomData.push({
            screenTargetId: index,
            indicatorName: item.indicatorName.split("/")[1],
            indicatorValue: item.indicatorValue.split("/")[1],
          });
        }
      });
    },
  },
  mounted() {
    this.series = [
      {
        name: "一级",
        type: "scatter3D",
        coordinateSystem: "geo3D",
        // minHeight: 100,
        // symbol:
        //   "path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z",
        symbolSize: [0, 0],
        opacity: 1,
        label: {
          show: true,
          formatter: "{b}",
          textStyle: {
            color: "#fff",
            fontSize: 26,
            fontWeight: 900,
          },
        },
        emphasis: {
          //当鼠标放上去  地区区域是否显示名称
          label: { show: true },
        },
        itemStyle: {
          color: "#DE5C42",
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: [
          {
            name: "西吉县",
            value: [105.731801, 35.965384, 0],
          },
          {
            name: "原州区",
            value: [106.28477, 36.005337, 0],
          },
          {
            name: "隆德县",
            value: [106.12344, 35.618234, 0],
          },
          {
            name: "彭阳县",
            value: [106.641512, 35.849975, 0],
          },
          {
            name: "泾源县",
            value: [106.338674, 35.49344, 0],
          },
        ],
        zlevel: 3,
      },
      {
        name: "二级",
        type: "scatter3D",
        coordinateSystem: "geo3D",
        // minHeight: 100,
        // symbol:
        //   "path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z",
        symbolSize: [30, 30],
        opacity: 1,
        label: {
          show: false,
          // formatter: "{b}",
          // textStyle: {
          //   color: "#fff",
          //   fontSize: 16,
          //   fontWeight: 900,
          // },
        },
        emphasis: {
          //当鼠标放上去  地区区域是否显示名称
          label: {
            show: true,
            formatter: "{b}",
            textStyle: {
              color: "#fff",
              fontSize: 16,
              fontWeight: 900,
            },
          },
        },
        itemStyle: {
          color: "#DE5C42",
          borderColor: "#fff",
          borderWidth: 2,
        },
        // data: [
        //   {
        //     name: "西吉县广\n播电视局",
        //     value: [105.534685,35.972329, 0],
        //   },
        //   {
        //     name: "西吉县政\n府",
        //     value: [105.735497,35.770125, 0],
        //   },
        //   {
        //     name: "西吉县广\n电网络公\n司",
        //     value: [105.734685,36.172329, 0],
        //   },
        //   {
        //     name: "西吉县委",
        //     value: [105.936278,35.970128, 0],
        //   },
        //   {
        //     name: "隆德县行\n政中心",
        //     value: [106.01879,35.631557, 0],
        //   },
        //   {
        //     name: "隆德县广\n电网络有\n限公司",
        //     value: [106.091695,35.709785, 0],
        //   },
        //   {
        //     name: "隆德县医\n院",
        //     value: [106.122655,35.509234, 0],
        //   },
        //   {
        //     name: "隆德县广\n播电视局",
        //     value: [106.123289,35.550764, 0],
        //   },
        //   {
        //     name: "泾源县行\n政中心",
        //     value: [106.276024,35.555893, 0],
        //   },
        //   {
        //     name: "泾源县广\n播转播台",
        //     value: [106.345495,35.620771, 0],
        //   },
        //   {
        //     name: "泾源县广\n电网络公\n司",
        //     value: [106.345373,35.400887, 0],
        //   },
        //   {
        //     name: "泾源县医\n院",
        //     value: [106.288564,35.451694, 0],
        //   },
        //   {
        //     name: "泾源县广\n播电视局",
        //     value: [106.385373,35.450887, 0],
        //   },
        //   {
        //     name: "六盘山红\n军长征纪\n念馆",
        //     value: [106.213254,35.674448, 0],
        //   },
        //   {
        //     name: "将台堡红\n军长征纪\n念馆",
        //     value: [105.847305,35.824291, 0],
        //   },
        //   {
        //     name: "市广播电\n视电影出\n版局",
        //     value: [106.291695,36.309785, 0],
        //   },
        //   {
        //     name: "固原广电\n中波台",
        //     value: [106.103575,36.217547, 0],
        //   },
        //   {
        //     name: "固原市博\n物馆",
        //     value: [106.284031,36.111044, 0],
        //   },
        //   {
        //     name: "固原日报\n社",
        //     value: [106.104768,36.037567, 0],
        //   },
        //    {
        //     name: "市政府",
        //     value: [106.249153,36.021832, 0],
        //   },
        //    {
        //     name: "固原市中\n医医院",
        //     value: [106.116531,35.936131, 0],
        //   },
        //    {
        //     name: "原州区医\n院",
        //     value: [106.288398,35.91509, 0],
        //   },
        //    {
        //     name: "原州区委",
        //     value: [106.431171,36.009645, 0],
        //   },
        //    {
        //     name: "原州区政\n府",
        //     value: [106.394426,36.100297, 0],
        //   },
        //    {
        //     name: "彭阳县广\n电网络公\n司",
        //     value: [106.626405,36.156459, 0],
        //   },
        //   {
        //     name: "彭阳县广\n播电视局",
        //     value: [106.746405,35.956459, 0],
        //   },
        //   {
        //     name: "彭阳县行\n政中心",
        //     value: [106.746405,36.056459, 0],
        //   },
        //   {
        //     name: "彭阳县广\n播电视局",
        //     value: [106.546405,35.956459, 0],
        //   },
        //   {
        //     name: "彭阳县医\n院",
        //     value: [106.746405,35.786459, 0],
        //   },
        // ],
        data: [
          {
            name: "宁夏博江炭山煤业\n有限公司",
            value: [106.630085, 36.128919, 0],
          },
          {
            name: "固原市行政中心",
            value: [106.249469, 36.023899, 0],
          },
          {
            name: "固原市公安局",
            value: [106.262415, 36.031935, 0],
          },
          {
            name: "固原市机关事务管理局(会议中心)",
            value: [106.249823, 36.023612, 0],
          },
          {
            name: "固原市电信局",
            value: [106.093133, 36.011363, 0],
          },
          {
            name: "固原市联通公司",
            value: [106.066142, 35.910577, 0],
          },
          {
            name: "中国移动通信集团宁夏有限公司\n固原分公司(第二生产中心)",
            value: [106.237582, 36.10514, 0],
          },
          {
            name: "宁夏广播电视台六盘山调频转播台",
            value: [106.353575, 35.917547, 0],
          },
          {
            name: "宁夏广播电视网络有限公司固原分公司",
            value: [106.291695, 36.009785, 0],
          },
          {
            name: "宁夏固原中波实验台",
            value: [106.253575, 36.017547, 0],
          },
          {
            name: "中铝宁夏能源集团\n有限公司\n六盘山热电厂",
            value: [106.076357, 36.145929, 0],
          },
          {
            name: "宁夏机场公司固原分公司",
            value: [106.232401, 36.381396, 0],
          },
          {
            name: "固原市人民医院",
            value: [106.246509, 36.003753, 0],
          },
          {
            name: "银川新华百货商业集团股份有限公司固原店",
            value: [106.290194, 35.913647, 0],
          },
          {
            name: "固原宁新房地产开发有限公司\n金海帝豪商业广场",
            value: [106.286635, 36.215866, 0],
          },
          {
            name: "宁夏上陵房地产开发有限公司固原(新时代)购物中心",
            value: [106.289697, 36.014693, 0],
          },
          {
            name: "宁夏家道旅游文化投资有限公司(六盘玩美乐园)",
            value: [106.270238, 36.014054, 0],
          },
        ],
        zlevel: 2,
      },
      {
        name: "三级",
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
            fontSize: 14,
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
            name: "西吉回中",
            value: [105.454444, 35.875649, 0],
          },
          {
            name: "西吉县教\n育局",
            value: [105.734701, 36.069806, 0],
          },
          {
            name: "西吉中学",
            value: [105.608195, 35.856395, 0],
          },
          {
            name: "固原八中",
            value: [106.37868, 36.239332, 0],
          },
          {
            name: "原州区教\n育局",
            value: [106.191805, 35.846877, 0],
          },
          {
            name: "固原六中",
            value: [106.194507, 35.800851, 0],
          },
          {
            name: "固原一中",
            value: [106.085159, 35.800984, 0],
          },
          {
            name: "固原七中",
            value: [106.057583, 35.849451, 0],
          },
          {
            name: "彭阳一中",
            value: [106.528069, 35.800631, 0],
          },
          {
            name: "彭阳县教\n育局",
            value: [106.400534, 35.783421, 0],
          },
          {
            name: "彭阳三中",
            value: [106.428045, 35.855031, 0],
          },
          {
            name: "隆德中学",
            value: [105.909349, 35.625889, 0],
          },
          {
            name: "隆德高级\n中学",
            value: [105.940891, 35.582538, 0],
          },
          {
            name: "隆德县教\n育局",
            value: [105.991695, 35.55159, 0],
          },
          {
            name: "泾源高级\n中学",
            value: [106.344202, 35.345966, 0],
          },
          {
            name: "泾源县教\n育局",
            value: [106.387945, 35.551786, 0],
          },
        ],
        zlevel: 1,
      },
    ];
  },
};
</script>
<style lang="scss" scoped>
.centerPart_powerSupplyControl {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  // background: url("/image/gridOverview/center_bg.png") no-repeat;
  background-position: 68% 190%;
  background-size: 75%;
  .container {
    height: 100%;
    position: relative;
    // background: url("/image/gridOverview/center_bottom_bg.png") no-repeat;
    background-position: bottom;
    background-size: 100% 60%;
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
          margin-bottom: 140px;
        }
        &:nth-of-type(1) {
          margin-top: 140px;
        }
        .title {
          font-size: 26px;
          color: #fff;
          margin-top: 5px;
          letter-spacing: 3px;
        }
        .num {
          font-size: 50px;
          // color: #00cbff;
          span {
            font-size: 24px;
            color: #b1d9fb;
            margin-left: 0.5em;
            text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
            color: #00fff8;
          }
        }
      }
      .left {
        padding-left: 55px;
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
          background: url("/image/powerSupplyControl/left_info_bg1.png")
            no-repeat;
          margin-left: 90px;
        }
        section:nth-of-type(2) {
          background: url("/image/powerSupplyControl/left_info_bg2.png")
            no-repeat;
        }
        section:nth-of-type(3) {
          background: url("/image/powerSupplyControl/left_info_bg3.png")
            no-repeat;
          margin-left: 90px;
        }
      }
      .right {
        text-align: right;
        padding-right: 55px;
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
          background: url("/image/powerSupplyControl/right_info_bg1.png")
            no-repeat;
          margin-left: -90px;
        }
        section:nth-of-type(2) {
          background: url("/image/powerSupplyControl/right_info_bg2.png")
            no-repeat;
          margin-right: 0;
          padding-right: 85px;
        }
        section:nth-of-type(3) {
          background: url("/image/powerSupplyControl/right_info_bg3.png")
            no-repeat;
          margin-left: -90px;
        }
      }
      .bottom {
        position: absolute;
        bottom: 211px;
        left: 577px;
        height: 165px;
        width: 301px;
        background: url("/image/powerSupplyControl/center_box.png") no-repeat;
        background-position: center;
        z-index: 999;
        padding: 37px 37px 30px 64px;
        .bottom_info {
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .num {
            font-size: 44px;
            color: #ffe543;
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
      #mapChart {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
