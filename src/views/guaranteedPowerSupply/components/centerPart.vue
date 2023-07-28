<template>
  <div class="centerPart_guaranteedPowerSupply">
    <div class="container">
      <div class="charts">
        <p class="title">用电负荷分布图</p>
        <!-- <div class="legend">
          <div class="left">
            <span>高</span>
            <div class="box"></div>
            <span>底</span>
          </div>
          <div class="right">
            <div>
              <div class="alert1 alert"></div>
              <span>严重告警</span>
            </div>
            <div>
              <div class="alert2 alert"></div>
              <span>轻微告警</span>
            </div>
            <div>
              <div class="alert3 alert"></div>
              <span>正常状态</span>
            </div>
          </div>
        </div> -->
        <!-- <div class="hot"></div> -->
        <div
          class="city"
          :class="item.num"
          v-for="(item, index) in centData"
          :key="index"
        >
          <p></p>
          <span>{{ item.columnValue2 }}</span>
          <div>
            <p>
              告警级别：<span>{{ item.columnValue3 }}</span>
            </p>
            <p>
              事件数量：<span>{{ item.columnValue4 }}</span>
            </p>
          </div>
        </div>
        <!-- <div class="city city1">
          <p></p>
          <span>西吉县</span>
          <div>
            <p>告警级别：<span>严重</span></p>
            <p>事件数量：<span>**</span> 件</p>
          </div>
        </div>
        <div class="city city2">
          <p></p>
          <span>原州区</span>
          <div>
            <p>告警级别：<span>严重</span></p>
            <p>事件数量：<span>**</span> 件</p>
          </div>
        </div>
        <div class="city city3">
          <p></p>
          <span>彭阳县</span>
          <div>
            <p>告警级别：<span>严重</span></p>
            <p>事件数量：<span>**</span> 件</p>
          </div>
        </div>
        <div class="city city4">
          <p></p>
          <span>隆德县</span>
          <div>
            <p>告警级别：<span>严重</span></p>
            <p>事件数量：<span>**</span> 件</p>
          </div>
        </div>
        <div class="city city5">
          <p></p>
          <span>泾源县</span>
          <div>
            <p>告警级别：<span>严重</span></p>
            <p>事件数量：<span>**</span> 件</p>
          </div>
        </div> -->
        <mapChart @changeMap="changeMap" ref="mapComponents" />
      </div>
      <!-- <div class="pan"></div> -->
    </div>
  </div>
</template>
<script>
import mapChart from "@/components/mapChart4";
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
      centData: [
        {
          num: "city1",
          columnValue2: "西吉县",
          columnValue3: "严重1",
          columnValue4: "**件2",
        },
        {
          num: "city2",
          columnValue2: "隆德县",
          columnValue3: "严重1",
          columnValue4: "**件2",
        },
        {
          num: "city3",
          columnValue2: "泾源县",
          columnValue3: "严重1",
          columnValue4: "**件2",
        },
        {
          num: "city4",
          columnValue2: "彭阳县",
          columnValue3: "严重1",
          columnValue4: "**件2",
        },
        {
          num: "city5",
          columnValue2: "原州区",
          columnValue3: "严重1",
          columnValue4: "**件2",
        },
      ],
    };
  },
  watch: {
    initData(val) {
      // console.log("中间的数据", val);
      this.centData = [];
      val.screenTargetPart01Data.targetContent.forEach((item, index) => {
        if (index < 5) {
          this.centData.push({
            num: "city" + (index + 1),
            columnValue2: item.columnValue2.split("/")[1],
            columnValue3: item.columnValue3.split("/")[1],
            columnValue4: item.columnValue4.split("/")[1],
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
  mounted() {},
};
</script>
<style lang="scss" scoped>
@keyframes biaodianAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.67% {
    background-position: -400px 0px;
  }
  1.34% {
    background-position: -800px 0px;
  }
  2.01% {
    background-position: -1200px 0px;
  }
  2.68% {
    background-position: -1600px 0px;
  }
  3.36% {
    background-position: -2000px 0px;
  }
  4.03% {
    background-position: -2400px 0px;
  }
  4.70% {
    background-position: -2800px 0px;
  }
  5.37% {
    background-position: -3200px 0px;
  }
  6.04% {
    background-position: -3600px 0px;
  }
  6.71% {
    background-position: -4000px 0px;
  }
  7.38% {
    background-position: -4400px 0px;
  }
  8.05% {
    background-position: 0px -400px;
  }
  8.72% {
    background-position: -400px -400px;
  }
  9.40% {
    background-position: -800px -400px;
  }
  10.07% {
    background-position: -1200px -400px;
  }
  10.74% {
    background-position: -1600px -400px;
  }
  11.41% {
    background-position: -2000px -400px;
  }
  12.08% {
    background-position: -2400px -400px;
  }
  12.75% {
    background-position: -2800px -400px;
  }
  13.42% {
    background-position: -3200px -400px;
  }
  14.09% {
    background-position: -3600px -400px;
  }
  14.77% {
    background-position: -4000px -400px;
  }
  15.44% {
    background-position: -4400px -400px;
  }
  16.11% {
    background-position: 0px -800px;
  }
  16.78% {
    background-position: -400px -800px;
  }
  17.45% {
    background-position: -800px -800px;
  }
  18.12% {
    background-position: -1200px -800px;
  }
  18.79% {
    background-position: -1600px -800px;
  }
  19.46% {
    background-position: -2000px -800px;
  }
  20.13% {
    background-position: -2400px -800px;
  }
  20.81% {
    background-position: -2800px -800px;
  }
  21.48% {
    background-position: -3200px -800px;
  }
  22.15% {
    background-position: -3600px -800px;
  }
  22.82% {
    background-position: -4000px -800px;
  }
  23.49% {
    background-position: -4400px -800px;
  }
  24.16% {
    background-position: 0px -1200px;
  }
  24.83% {
    background-position: -400px -1200px;
  }
  25.50% {
    background-position: -800px -1200px;
  }
  26.17% {
    background-position: -1200px -1200px;
  }
  26.85% {
    background-position: -1600px -1200px;
  }
  27.52% {
    background-position: -2000px -1200px;
  }
  28.19% {
    background-position: -2400px -1200px;
  }
  28.86% {
    background-position: -2800px -1200px;
  }
  29.53% {
    background-position: -3200px -1200px;
  }
  30.20% {
    background-position: -3600px -1200px;
  }
  30.87% {
    background-position: -4000px -1200px;
  }
  31.54% {
    background-position: -4400px -1200px;
  }
  32.21% {
    background-position: 0px -1600px;
  }
  32.89% {
    background-position: -400px -1600px;
  }
  33.56% {
    background-position: -800px -1600px;
  }
  34.23% {
    background-position: -1200px -1600px;
  }
  34.90% {
    background-position: -1600px -1600px;
  }
  35.57% {
    background-position: -2000px -1600px;
  }
  36.24% {
    background-position: -2400px -1600px;
  }
  36.91% {
    background-position: -2800px -1600px;
  }
  37.58% {
    background-position: -3200px -1600px;
  }
  38.26% {
    background-position: -3600px -1600px;
  }
  38.93% {
    background-position: -4000px -1600px;
  }
  39.60% {
    background-position: -4400px -1600px;
  }
  40.27% {
    background-position: 0px -2000px;
  }
  40.94% {
    background-position: -400px -2000px;
  }
  41.61% {
    background-position: -800px -2000px;
  }
  42.28% {
    background-position: -1200px -2000px;
  }
  42.95% {
    background-position: -1600px -2000px;
  }
  43.62% {
    background-position: -2000px -2000px;
  }
  44.30% {
    background-position: -2400px -2000px;
  }
  44.97% {
    background-position: -2800px -2000px;
  }
  45.64% {
    background-position: -3200px -2000px;
  }
  46.31% {
    background-position: -3600px -2000px;
  }
  46.98% {
    background-position: -4000px -2000px;
  }
  47.65% {
    background-position: -4400px -2000px;
  }
  48.32% {
    background-position: 0px -2400px;
  }
  48.99% {
    background-position: -400px -2400px;
  }
  49.66% {
    background-position: -800px -2400px;
  }
  50.34% {
    background-position: -1200px -2400px;
  }
  51.01% {
    background-position: -1600px -2400px;
  }
  51.68% {
    background-position: -2000px -2400px;
  }
  52.35% {
    background-position: -2400px -2400px;
  }
  53.02% {
    background-position: -2800px -2400px;
  }
  53.69% {
    background-position: -3200px -2400px;
  }
  54.36% {
    background-position: -3600px -2400px;
  }
  55.03% {
    background-position: -4000px -2400px;
  }
  55.70% {
    background-position: -4400px -2400px;
  }
  56.38% {
    background-position: 0px -2800px;
  }
  57.05% {
    background-position: -400px -2800px;
  }
  57.72% {
    background-position: -800px -2800px;
  }
  58.39% {
    background-position: -1200px -2800px;
  }
  59.06% {
    background-position: -1600px -2800px;
  }
  59.73% {
    background-position: -2000px -2800px;
  }
  60.40% {
    background-position: -2400px -2800px;
  }
  61.07% {
    background-position: -2800px -2800px;
  }
  61.74% {
    background-position: -3200px -2800px;
  }
  62.42% {
    background-position: -3600px -2800px;
  }
  63.09% {
    background-position: -4000px -2800px;
  }
  63.76% {
    background-position: -4400px -2800px;
  }
  64.43% {
    background-position: 0px -3200px;
  }
  65.10% {
    background-position: -400px -3200px;
  }
  65.77% {
    background-position: -800px -3200px;
  }
  66.44% {
    background-position: -1200px -3200px;
  }
  67.11% {
    background-position: -1600px -3200px;
  }
  67.79% {
    background-position: -2000px -3200px;
  }
  68.46% {
    background-position: -2400px -3200px;
  }
  69.13% {
    background-position: -2800px -3200px;
  }
  69.80% {
    background-position: -3200px -3200px;
  }
  70.47% {
    background-position: -3600px -3200px;
  }
  71.14% {
    background-position: -4000px -3200px;
  }
  71.81% {
    background-position: -4400px -3200px;
  }
  72.48% {
    background-position: 0px -3600px;
  }
  73.15% {
    background-position: -400px -3600px;
  }
  73.83% {
    background-position: -800px -3600px;
  }
  74.50% {
    background-position: -1200px -3600px;
  }
  75.17% {
    background-position: -1600px -3600px;
  }
  75.84% {
    background-position: -2000px -3600px;
  }
  76.51% {
    background-position: -2400px -3600px;
  }
  77.18% {
    background-position: -2800px -3600px;
  }
  77.85% {
    background-position: -3200px -3600px;
  }
  78.52% {
    background-position: -3600px -3600px;
  }
  79.19% {
    background-position: -4000px -3600px;
  }
  79.87% {
    background-position: -4400px -3600px;
  }
  80.54% {
    background-position: 0px -4000px;
  }
  81.21% {
    background-position: -400px -4000px;
  }
  81.88% {
    background-position: -800px -4000px;
  }
  82.55% {
    background-position: -1200px -4000px;
  }
  83.22% {
    background-position: -1600px -4000px;
  }
  83.89% {
    background-position: -2000px -4000px;
  }
  84.56% {
    background-position: -2400px -4000px;
  }
  85.23% {
    background-position: -2800px -4000px;
  }
  85.91% {
    background-position: -3200px -4000px;
  }
  86.58% {
    background-position: -3600px -4000px;
  }
  87.25% {
    background-position: -4000px -4000px;
  }
  87.92% {
    background-position: -4400px -4000px;
  }
  88.59% {
    background-position: 0px -4400px;
  }
  89.26% {
    background-position: -400px -4400px;
  }
  89.93% {
    background-position: -800px -4400px;
  }
  90.60% {
    background-position: -1200px -4400px;
  }
  91.28% {
    background-position: -1600px -4400px;
  }
  91.95% {
    background-position: -2000px -4400px;
  }
  92.62% {
    background-position: -2400px -4400px;
  }
  93.29% {
    background-position: -2800px -4400px;
  }
  93.96% {
    background-position: -3200px -4400px;
  }
  94.63% {
    background-position: -3600px -4400px;
  }
  95.30% {
    background-position: -4000px -4400px;
  }
  95.97% {
    background-position: -4400px -4400px;
  }
  96.64% {
    background-position: 0px -4800px;
  }
  97.32% {
    background-position: -400px -4800px;
  }
  97.99% {
    background-position: -800px -4800px;
  }
  98.66% {
    background-position: -1200px -4800px;
  }
  99.33% {
    background-position: -1600px -4800px;
  }
  100.00% {
    background-position: -2000px -4800px;
  }
}
@keyframes hotAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -800px 0px;
  }
  1.61% {
    background-position: -1600px 0px;
  }
  2.42% {
    background-position: -2400px 0px;
  }
  3.23% {
    background-position: -3200px 0px;
  }
  4.03% {
    background-position: -4000px 0px;
  }
  4.84% {
    background-position: 0px -800px;
  }
  5.65% {
    background-position: -800px -800px;
  }
  6.45% {
    background-position: -1600px -800px;
  }
  7.26% {
    background-position: -2400px -800px;
  }
  8.06% {
    background-position: -3200px -800px;
  }
  8.87% {
    background-position: -4000px -800px;
  }
  9.68% {
    background-position: 0px -1600px;
  }
  10.48% {
    background-position: -800px -1600px;
  }
  11.29% {
    background-position: -1600px -1600px;
  }
  12.10% {
    background-position: -2400px -1600px;
  }
  12.90% {
    background-position: -3200px -1600px;
  }
  13.71% {
    background-position: -4000px -1600px;
  }
  14.52% {
    background-position: 0px -2400px;
  }
  15.32% {
    background-position: -800px -2400px;
  }
  16.13% {
    background-position: -1600px -2400px;
  }
  16.94% {
    background-position: -2400px -2400px;
  }
  17.74% {
    background-position: -3200px -2400px;
  }
  18.55% {
    background-position: -4000px -2400px;
  }
  19.35% {
    background-position: 0px -3200px;
  }
  20.16% {
    background-position: -800px -3200px;
  }
  20.97% {
    background-position: -1600px -3200px;
  }
  21.77% {
    background-position: -2400px -3200px;
  }
  22.58% {
    background-position: -3200px -3200px;
  }
  23.39% {
    background-position: -4000px -3200px;
  }
  24.19% {
    background-position: 0px -4000px;
  }
  25.00% {
    background-position: -800px -4000px;
  }
  25.81% {
    background-position: -1600px -4000px;
  }
  26.61% {
    background-position: -2400px -4000px;
  }
  27.42% {
    background-position: -3200px -4000px;
  }
  28.23% {
    background-position: -4000px -4000px;
  }
  29.03% {
    background-position: 0px -4800px;
  }
  29.84% {
    background-position: -800px -4800px;
  }
  30.65% {
    background-position: -1600px -4800px;
  }
  31.45% {
    background-position: -2400px -4800px;
  }
  32.26% {
    background-position: -3200px -4800px;
  }
  33.06% {
    background-position: -4000px -4800px;
  }
  33.87% {
    background-position: 0px -5600px;
  }
  34.68% {
    background-position: -800px -5600px;
  }
  35.48% {
    background-position: -1600px -5600px;
  }
  36.29% {
    background-position: -2400px -5600px;
  }
  37.10% {
    background-position: -3200px -5600px;
  }
  37.90% {
    background-position: -4000px -5600px;
  }
  38.71% {
    background-position: 0px -6400px;
  }
  39.52% {
    background-position: -800px -6400px;
  }
  40.32% {
    background-position: -1600px -6400px;
  }
  41.13% {
    background-position: -2400px -6400px;
  }
  41.94% {
    background-position: -3200px -6400px;
  }
  42.74% {
    background-position: -4000px -6400px;
  }
  43.55% {
    background-position: 0px -7200px;
  }
  44.35% {
    background-position: -800px -7200px;
  }
  45.16% {
    background-position: -1600px -7200px;
  }
  45.97% {
    background-position: -2400px -7200px;
  }
  46.77% {
    background-position: -3200px -7200px;
  }
  47.58% {
    background-position: -4000px -7200px;
  }
  48.39% {
    background-position: 0px -8000px;
  }
  49.19% {
    background-position: -800px -8000px;
  }
  50.00% {
    background-position: -1600px -8000px;
  }
  50.81% {
    background-position: -2400px -8000px;
  }
  51.61% {
    background-position: -3200px -8000px;
  }
  52.42% {
    background-position: -4000px -8000px;
  }
  53.23% {
    background-position: 0px -8800px;
  }
  54.03% {
    background-position: -800px -8800px;
  }
  54.84% {
    background-position: -1600px -8800px;
  }
  55.65% {
    background-position: -2400px -8800px;
  }
  56.45% {
    background-position: -3200px -8800px;
  }
  57.26% {
    background-position: -4000px -8800px;
  }
  58.06% {
    background-position: 0px -9600px;
  }
  58.87% {
    background-position: -800px -9600px;
  }
  59.68% {
    background-position: -1600px -9600px;
  }
  60.48% {
    background-position: -2400px -9600px;
  }
  61.29% {
    background-position: -3200px -9600px;
  }
  62.10% {
    background-position: -4000px -9600px;
  }
  62.90% {
    background-position: 0px -10400px;
  }
  63.71% {
    background-position: -800px -10400px;
  }
  64.52% {
    background-position: -1600px -10400px;
  }
  65.32% {
    background-position: -2400px -10400px;
  }
  66.13% {
    background-position: -3200px -10400px;
  }
  66.94% {
    background-position: -4000px -10400px;
  }
  67.74% {
    background-position: 0px -11200px;
  }
  68.55% {
    background-position: -800px -11200px;
  }
  69.35% {
    background-position: -1600px -11200px;
  }
  70.16% {
    background-position: -2400px -11200px;
  }
  70.97% {
    background-position: -3200px -11200px;
  }
  71.77% {
    background-position: -4000px -11200px;
  }
  72.58% {
    background-position: 0px -12000px;
  }
  73.39% {
    background-position: -800px -12000px;
  }
  74.19% {
    background-position: -1600px -12000px;
  }
  75.00% {
    background-position: -2400px -12000px;
  }
  75.81% {
    background-position: -3200px -12000px;
  }
  76.61% {
    background-position: -4000px -12000px;
  }
  77.42% {
    background-position: 0px -12800px;
  }
  78.23% {
    background-position: -800px -12800px;
  }
  79.03% {
    background-position: -1600px -12800px;
  }
  79.84% {
    background-position: -2400px -12800px;
  }
  80.65% {
    background-position: -3200px -12800px;
  }
  81.45% {
    background-position: -4000px -12800px;
  }
  82.26% {
    background-position: 0px -13600px;
  }
  83.06% {
    background-position: -800px -13600px;
  }
  83.87% {
    background-position: -1600px -13600px;
  }
  84.68% {
    background-position: -2400px -13600px;
  }
  85.48% {
    background-position: -3200px -13600px;
  }
  86.29% {
    background-position: -4000px -13600px;
  }
  87.10% {
    background-position: 0px -14400px;
  }
  87.90% {
    background-position: -800px -14400px;
  }
  88.71% {
    background-position: -1600px -14400px;
  }
  89.52% {
    background-position: -2400px -14400px;
  }
  90.32% {
    background-position: -3200px -14400px;
  }
  91.13% {
    background-position: -4000px -14400px;
  }
  91.94% {
    background-position: 0px -15200px;
  }
  92.74% {
    background-position: -800px -15200px;
  }
  93.55% {
    background-position: -1600px -15200px;
  }
  94.35% {
    background-position: -2400px -15200px;
  }
  95.16% {
    background-position: -3200px -15200px;
  }
  95.97% {
    background-position: -4000px -15200px;
  }
  96.77% {
    background-position: 0px -16000px;
  }
  97.58% {
    background-position: -800px -16000px;
  }
  98.39% {
    background-position: -1600px -16000px;
  }
  99.19% {
    background-position: -2400px -16000px;
  }
  100.00% {
    background-position: -3200px -16000px;
  }
}

.centerPart_guaranteedPowerSupply {
  position: absolute;
  left: 1522px;
  top: 0;
  height: 100%;
  width: 2716px;
  // background: url("/image/emergencyRepair/bj2.png") no-repeat;
  background-position: center;
  background-size: 100%;
  animation: center_bg_animation 1s linear;
  .container {
    height: 100%;
    position: relative;
    // background: url("/image/gridOverview/center_bottom_bg.png") no-repeat;
    background-position: bottom;
    background-size: 100% 60%;
    overflow: hidden;
    .info {
      height: 100%;
      // background: url("/image/operationMonitor/center_arrow.png") no-repeat;
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
          color: #b1d9fb;
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
          background: url("/image/distributionNetworkMaintenance/left_info_bg1.png")
            no-repeat;
          margin-left: 56px;
        }
        section:nth-of-type(2) {
          background: url("/image/distributionNetworkMaintenance/left_info_bg2.png")
            no-repeat;
        }
        section:nth-of-type(3) {
          background: url("/image/distributionNetworkMaintenance/left_info_bg3.png")
            no-repeat;
        }
        section:nth-of-type(4) {
          background: url("/image/distributionNetworkMaintenance/left_info_bg4.png")
            no-repeat;
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
          background: url("/image/distributionNetworkMaintenance/right_info_bg1.png")
            no-repeat;
          margin-left: -56px;
        }
        section:nth-of-type(2) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg2.png")
            no-repeat;
          margin-right: 0;
        }
        section:nth-of-type(3) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg3.png")
            no-repeat;
        }
        section:nth-of-type(4) {
          background: url("/image/distributionNetworkMaintenance/right_info_bg4.png")
            no-repeat;
          margin-left: -56px;
        }
      }
      .box {
        display: flex;
        align-items: center;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 25px;
        }
        span {
          font-family: "numFont";
          font-size: 50px;
          color: #efff29;
        }
      }
      .left2 {
        width: 163px;
        height: 604px;
        position: absolute;
        background: url("/image/emergencyRepair/left.png");
        left: 420px;
        padding-left: 42px;
      }
      .right2 {
        width: 163px;
        height: 604px;
        position: absolute;
        background: url("/image/emergencyRepair/right.png");
        right: 420px;
      }
    }
    .charts {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      // perspective: 2000px;
      .title {
        position: absolute;
        width: 326px;
        height: 76px;
        font-size: 40px;
        line-height: 76px;
        text-align: center;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.42) 0%,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.38) 100%
        );
        top: 117px;
        left: 420px;
      }
      .legend {
        // width: 362px;
        // height: 222px;
        position: absolute;
        bottom: 12px;
        left: 400px;
        display: flex;
        .left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          font-size: 22px;
          .box {
            width: 36px;
            height: 184.5px;
            background: url("/image/guaranteedPowerSupply/colour.png");
            background-position-y: -22px;
          }
          span {
            margin-right: 13px;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: 190px;
          font-size: 22px;
          > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              margin-left: 10px;
            }
          }
          .alert1 {
            width: 47px;
            height: 47px;
            margin-left: 3px;
            background: url("/image/guaranteedPowerSupply/red.png");
          }
          .alert2 {
            width: 56px;
            height: 58px;
            background: url("/image/guaranteedPowerSupply/yellow.png");
          }
          .alert3 {
            width: 53px;
            height: 54px;
            background: url("/image/guaranteedPowerSupply/blue.png");
          }
        }
      }
      .hot {
        position: absolute;
        width: 800px;
        height: 800px;
        // animation: hotAnimation 5s steps(1) infinite;
        background: url("/image/guaranteedPowerSupply/hot.png") no-repeat;
        top: 40%;
        left: 46%;
        margin-left: -400px;
        margin-top: -400px;
        z-index: 2;
      }
      .city {
        position: absolute;
        // font-size: 40px;
        font-weight: 400;
        // opacity: 0.7;
        // color: rgba(255, 255, 255, .74);
        top: 400px;
        left: 930px;
        z-index: 1;
        > span {
          display: block;
          animation: fadeInDownBig 2s;
          font-size: 30px;
          position: absolute;
          color: rgba(255, 255, 255, 0.6);
          width: 120px;
          letter-spacing: 5px;
        }
        > p {
          position: absolute;
          top: -235px;
          left: -117px;
          width: 400px;
          height: 400px;
          animation: biaodianAnimation 6s steps(1) infinite;
          background: url("/image/guaranteedPowerSupply/biaodian.png") no-repeat;
          // background-position:-545px 0px;
        }
        div {
          // background: url("/image/emergencyRepair/kuang.png") no-repeat;
          width: 251px;
          height: 130px;
          position: absolute;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-evenly;
          font-size: 20px;
          color: #fff;
          p:nth-child(1) {
            margin-top: 10px;
          }
        }
      }
      .city1 {
        > span {
          top: 0;
          left: -110px;
        }
        div {
          background: url("/image/guaranteedPowerSupply/1.png") no-repeat;
          width: 249px;
          top: -200px;
          left: -280px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 95px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 255px;
          top: 88px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 45px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 338px;
          top: 107px;
          transform: rotate(60deg);
        }
      }
      .city2 {
        left: 1180px;
        top: 390px;
        > span {
          top: -80px;
          left: 180px;
        }
        div {
          background: url("/image/guaranteedPowerSupply/3.png") no-repeat;
          background-position-x: -286px;
          width: 260px;
          top: -200px;
          left: 160px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 50px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -50px;
          top: 88px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 40px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -78px;
          top: 106px;
          transform: rotate(-65deg);
        }
      }
      .city3 {
        left: 1500px;
        top: 350px;
        > span {
          top: 30px;
          left: 180px;
        }
        > p {
          top: -158px;
          left: -230px;
        }
        div {
          background: url("/image/guaranteedPowerSupply/5.png") no-repeat;
          background-position-x: -140px;
          width: 260px;
          top: -85px;
          left: 160px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 160px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -160px;
          top: 60px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 39px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -190px;
          top: 75px;
          transform: rotate(-54deg);
        }
      }
      .city4 {
        left: 1215px;
        top: 691px;
        > p {
          top: -230px;
          left: -170px;
        }
        > span {
          top: -140px;
          left: 60px;
        }
        div {
          background: url("/image/guaranteedPowerSupply/2.png") no-repeat;
          background-position-x: 0px;
          width: 260px;
          top: -120px;
          left: -350px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 95px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 255px;
          top: 60px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 30px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 349px;
          top: 63px;
          transform: rotate(12deg);
        }
      }
      .city5 {
        left: 1500px;
        top: 670px;
        > p {
          top: -260px;
          left: -190px;
        }
        > span {
          top: 60px;
          left: 140px;
        }
        div {
          background: url("/image/guaranteedPowerSupply/4.png") no-repeat;
          background-position-x: -158px;
          width: 260px;
          top: -225px;
          left: 75px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 45px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -45px;
          top: 88px;
        }
        div::after {
          content: " ";
          display: block;
          position: absolute;
          width: 45px;
          border: 2px solid rgba(255, 255, 255, 0.74);
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -72px;
          top: 110px;
          transform: rotate(-76deg);
        }
      }
    }
    .pan {
      position: absolute;
      bottom: 35px;
      left: 50%;
      width: 832px;
      height: 293px;
      margin-left: -416px;
      border-radius: 50%;
      background: url("/image/emergencyRepair/yp.png") no-repeat;
      animation: bounceInUp 2s, heartBeat 4s infinite linear 2s;
    }
  }
}
</style>
