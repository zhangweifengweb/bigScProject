<template>
  <div class="centerPart_operationIndexMonitoring">
    <div class="container">
      <div class="info">
        <div class="left">
          <section>
            <p class="num">
              {{ value[0] }}<span>{{ unit[0] }}</span>
            </p>
            <p class="title">{{ key[0] }}</p>
            <!-- <img src="/image/gridOverview/center_left1.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ value[1] }}<span>{{ unit[1] }}</span>
            </p>
            <p class="title">{{ key[1] }}</p>
            <!-- <img src="/image/gridOverview/center_left2.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ value[2] }}<span>{{ unit[2] }}</span>
            </p>
            <p class="title">{{ key[2] }}</p>
            <!-- <img src="/image/gridOverview/center_left3.png" alt=""> -->
          </section>
          <section>
            <p class="title title2">{{ key[3] }}</p>
            <p class="num num2">
              {{ value[3] }}<span>{{ unit[3] }}</span>
            </p>
          </section>
        </div>
        <div class="right">
          <section>
            <p class="num">
              {{ value[10] }}<span>{{ unit[10] }}</span>
            </p>
            <p class="title">{{ key[10] }}</p>
            <!-- <img src="/image/gridOverview/center_right1.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ value[11] }}<span>{{ unit[11] }}</span>
            </p>
            <p class="title">{{ key[11] }}</p>
            <!-- <img src="/image/gridOverview/center_right2.png" alt=""> -->
          </section>
          <section>
            <p class="num">
              {{ value[12] }}<span>{{ unit[12] }}</span>
            </p>
            <p class="title">{{ key[12] }}</p>
            <!-- <img src="/image/gridOverview/center_right3.png" alt=""> -->
          </section>
          <section>
            <p class="title title2">{{ key[9] }}</p>
            <p class="num num2">
              {{ value[9] }}<span>{{ unit[9] }}</span>
            </p>
          </section>
        </div>
      </div>
      <div class="charts">
        <div class="city city1">
          <p></p>
          <span>西吉县</span>
          <div>
            <p>
              {{ key[4] }} ： <span>{{ value[4] }}</span> {{ unit[4] }}
            </p>
          </div>
        </div>
        <div class="city city2">
          <p></p>
          <span>原州区</span>
          <div>
            <p>
              {{ key[5] }} ： <span>{{ value[5] }}</span> {{ unit[5] }}
            </p>
          </div>
        </div>
        <div class="city city3">
          <p></p>
          <span>彭阳县</span>
          <div>
            <p>
              {{ key[6] }} ： <span>{{ value[6] }}</span> {{ unit[6] }}
            </p>
          </div>
        </div>
        <div class="city city4">
          <p></p>
          <span>隆德县</span>
          <div>
            <p>
              {{ key[7] }} ： <span>{{ value[7] }}</span> {{ unit[7] }}
            </p>
          </div>
        </div>
        <div class="city city5">
          <p></p>
          <span>泾源县</span>
          <div>
            <p>
              {{ key[8] }} ： <span>{{ value[8] }}</span> {{ unit[8] }}
            </p>
          </div>
        </div>
        <mapChart @changeMap="changeMap" ref="mapComponents" />
      </div>
      <div class="pan"></div>
    </div>
  </div>
</template>
<script>
import mapChart from "@/components/mapChart2";
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
    screen: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    screen(value) {
      value.screenTargetPart01Data[0].targetContent.forEach((val) => {
        let arr = val.indicatorValue.split("/");
        let arr2 = val.unit.split("/")[1];
        this.key.push(arr[0]);
        this.value.push(arr[1]);
        this.unit.push(arr2);
      });
      // this.target = value.screenTargetPart01Data[0].targetContent
      // console.log(this.target)
    },
  },
  data() {
    return {
      key: [],
      value: [],
      unit: [],
    };
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
@keyframes center_bg_animation {
  0% {
    background-size: 100%;
    background-position: center;
  }
  50% {
    background-size: 130%;
    background-position: center;
  }
  100% {
    background-size: 100%;
    background-position: center;
  }
}
@keyframes redAnimation {
  0% {
    background-position: -145px -40px;
  }
  0.81% {
    background-position: -545px -40px;
  }
  1.61% {
    background-position: -945px -40px;
  }
  2.42% {
    background-position: -1345px -40px;
  }
  3.23% {
    background-position: -1745px -40px;
  }
  4.03% {
    background-position: -2145px -40px;
  }
  4.84% {
    background-position: -2545px -40px;
  }
  5.65% {
    background-position: -2945px -40px;
  }
  6.45% {
    background-position: -3345px -40px;
  }
  7.26% {
    background-position: -3745px -40px;
  }
  8.06% {
    background-position: -4145px -40px;
  }
  8.87% {
    background-position: -4545px -40px;
  }
  9.68% {
    background-position: -145px -440px;
  }
  10.48% {
    background-position: -545px -440px;
  }
  11.29% {
    background-position: -945px -440px;
  }
  12.10% {
    background-position: -1345px -440px;
  }
  12.90% {
    background-position: -1745px -440px;
  }
  13.71% {
    background-position: -2145px -440px;
  }
  14.52% {
    background-position: -2545px -440px;
  }
  15.32% {
    background-position: -2945px -440px;
  }
  16.13% {
    background-position: -3345px -440px;
  }
  16.94% {
    background-position: -3745px -440px;
  }
  17.74% {
    background-position: -4145px -440px;
  }
  18.55% {
    background-position: -4545px -440px;
  }
  19.35% {
    background-position: -145px -840px;
  }
  20.16% {
    background-position: -545px -840px;
  }
  20.97% {
    background-position: -945px -840px;
  }
  21.77% {
    background-position: -1345px -840px;
  }
  22.58% {
    background-position: -1745px -840px;
  }
  23.39% {
    background-position: -2145px -840px;
  }
  24.19% {
    background-position: -2545px -840px;
  }
  25.00% {
    background-position: -2945px -840px;
  }
  25.81% {
    background-position: -3345px -840px;
  }
  26.61% {
    background-position: -3745px -840px;
  }
  27.42% {
    background-position: -4145px -840px;
  }
  28.23% {
    background-position: -4545px -840px;
  }
  29.03% {
    background-position: -145px -1240px;
  }
  29.84% {
    background-position: -545px -1240px;
  }
  30.65% {
    background-position: -945px -1240px;
  }
  31.45% {
    background-position: -1345px -1240px;
  }
  32.26% {
    background-position: -1745px -1240px;
  }
  33.06% {
    background-position: -2145px -1240px;
  }
  33.87% {
    background-position: -2545px -1240px;
  }
  34.68% {
    background-position: -2945px -1240px;
  }
  35.48% {
    background-position: -3345px -1240px;
  }
  36.29% {
    background-position: -3745px -1240px;
  }
  37.10% {
    background-position: -4145px -1240px;
  }
  37.90% {
    background-position: -4545px -1240px;
  }
  38.71% {
    background-position: -145px -1640px;
  }
  39.52% {
    background-position: -545px -1640px;
  }
  40.32% {
    background-position: -945px -1640px;
  }
  41.13% {
    background-position: -1345px -1640px;
  }
  41.94% {
    background-position: -1745px -1640px;
  }
  42.74% {
    background-position: -2145px -1640px;
  }
  43.55% {
    background-position: -2545px -1640px;
  }
  44.35% {
    background-position: -2945px -1640px;
  }
  45.16% {
    background-position: -3345px -1640px;
  }
  45.97% {
    background-position: -3745px -1640px;
  }
  46.77% {
    background-position: -4145px -1640px;
  }
  47.58% {
    background-position: -4545px -1640px;
  }
  48.39% {
    background-position: -145px -2040px;
  }
  49.19% {
    background-position: -545px -2040px;
  }
  50.00% {
    background-position: -945px -2040px;
  }
  50.81% {
    background-position: -1345px -2040px;
  }
  51.61% {
    background-position: -1745px -2040px;
  }
  52.42% {
    background-position: -2145px -2040px;
  }
  53.23% {
    background-position: -2545px -2040px;
  }
  54.03% {
    background-position: -2945px -2040px;
  }
  54.84% {
    background-position: -3345px -2040px;
  }
  55.65% {
    background-position: -3745px -2040px;
  }
  56.45% {
    background-position: -4145px -2040px;
  }
  57.26% {
    background-position: -4545px -2040px;
  }
  58.06% {
    background-position: -145px -2440px;
  }
  58.87% {
    background-position: -545px -2440px;
  }
  59.68% {
    background-position: -945px -2440px;
  }
  60.48% {
    background-position: -1345px -2440px;
  }
  61.29% {
    background-position: -1745px -2440px;
  }
  62.10% {
    background-position: -2145px -2440px;
  }
  62.90% {
    background-position: -2545px -2440px;
  }
  63.71% {
    background-position: -2945px -2440px;
  }
  64.52% {
    background-position: -3345px -2440px;
  }
  65.32% {
    background-position: -3745px -2440px;
  }
  66.13% {
    background-position: -4145px -2440px;
  }
  66.94% {
    background-position: -4545px -2440px;
  }
  67.74% {
    background-position: -145px -2840px;
  }
  68.55% {
    background-position: -545px -2840px;
  }
  69.35% {
    background-position: -945px -2840px;
  }
  70.16% {
    background-position: -1345px -2840px;
  }
  70.97% {
    background-position: -1745px -2840px;
  }
  71.77% {
    background-position: -2145px -2840px;
  }
  72.58% {
    background-position: -2545px -2840px;
  }
  73.39% {
    background-position: -2945px -2840px;
  }
  74.19% {
    background-position: -3345px -2840px;
  }
  75.00% {
    background-position: -3745px -2840px;
  }
  75.81% {
    background-position: -4145px -2840px;
  }
  76.61% {
    background-position: -4545px -2840px;
  }
  77.42% {
    background-position: -145px -3240px;
  }
  78.23% {
    background-position: -545px -3240px;
  }
  79.03% {
    background-position: -945px -3240px;
  }
  79.84% {
    background-position: -1345px -3240px;
  }
  80.65% {
    background-position: -1745px -3240px;
  }
  81.45% {
    background-position: -2145px -3240px;
  }
  82.26% {
    background-position: -2545px -3240px;
  }
  83.06% {
    background-position: -2945px -3240px;
  }
  83.87% {
    background-position: -3345px -3240px;
  }
  84.68% {
    background-position: -3745px -3240px;
  }
  85.48% {
    background-position: -4145px -3240px;
  }
  86.29% {
    background-position: -4545px -3240px;
  }
  87.10% {
    background-position: -145px -3640px;
  }
  87.90% {
    background-position: -545px -3640px;
  }
  88.71% {
    background-position: -945px -3640px;
  }
  89.52% {
    background-position: -1345px -3640px;
  }
  90.32% {
    background-position: -1745px -3640px;
  }
  91.13% {
    background-position: -2145px -3640px;
  }
  91.94% {
    background-position: -2545px -3640px;
  }
  92.74% {
    background-position: -2945px -3640px;
  }
  93.55% {
    background-position: -3345px -3640px;
  }
  94.35% {
    background-position: -3745px -3640px;
  }
  95.16% {
    background-position: -4145px -3640px;
  }
  95.97% {
    background-position: -4545px -3640px;
  }
  96.77% {
    background-position: -145px -4040px;
  }
  97.58% {
    background-position: -545px -4040px;
  }
  98.39% {
    background-position: -945px -4040px;
  }
  99.19% {
    background-position: -1345px -4040px;
  }
  100.00% {
    background-position: -1745px -4040px;
  }
}
@keyframes panAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: -1500px 0px;
  }
  1.61% {
    background-position: -3000px 0px;
  }
  2.42% {
    background-position: -4500px 0px;
  }
  3.23% {
    background-position: -6000px 0px;
  }
  4.03% {
    background-position: -7500px 0px;
  }
  4.84% {
    background-position: -9000px 0px;
  }
  5.65% {
    background-position: -10500px 0px;
  }
  6.45% {
    background-position: -12000px 0px;
  }
  7.26% {
    background-position: -13500px 0px;
  }
  8.06% {
    background-position: -15000px 0px;
  }
  8.87% {
    background-position: -16500px 0px;
  }
  9.68% {
    background-position: -18000px 0px;
  }
  10.48% {
    background-position: 0px -1080px;
  }
  11.29% {
    background-position: -1500px -1080px;
  }
  12.10% {
    background-position: -3000px -1080px;
  }
  12.90% {
    background-position: -4500px -1080px;
  }
  13.71% {
    background-position: -6000px -1080px;
  }
  14.52% {
    background-position: -7500px -1080px;
  }
  15.32% {
    background-position: -9000px -1080px;
  }
  16.13% {
    background-position: -10500px -1080px;
  }
  16.94% {
    background-position: -12000px -1080px;
  }
  17.74% {
    background-position: -13500px -1080px;
  }
  18.55% {
    background-position: -15000px -1080px;
  }
  19.35% {
    background-position: -16500px -1080px;
  }
  20.16% {
    background-position: -18000px -1080px;
  }
  20.97% {
    background-position: 0px -2160px;
  }
  21.77% {
    background-position: -1500px -2160px;
  }
  22.58% {
    background-position: -3000px -2160px;
  }
  23.39% {
    background-position: -4500px -2160px;
  }
  24.19% {
    background-position: -6000px -2160px;
  }
  25.00% {
    background-position: -7500px -2160px;
  }
  25.81% {
    background-position: -9000px -2160px;
  }
  26.61% {
    background-position: -10500px -2160px;
  }
  27.42% {
    background-position: -12000px -2160px;
  }
  28.23% {
    background-position: -13500px -2160px;
  }
  29.03% {
    background-position: -15000px -2160px;
  }
  29.84% {
    background-position: -16500px -2160px;
  }
  30.65% {
    background-position: -18000px -2160px;
  }
  31.45% {
    background-position: 0px -3240px;
  }
  32.26% {
    background-position: -1500px -3240px;
  }
  33.06% {
    background-position: -3000px -3240px;
  }
  33.87% {
    background-position: -4500px -3240px;
  }
  34.68% {
    background-position: -6000px -3240px;
  }
  35.48% {
    background-position: -7500px -3240px;
  }
  36.29% {
    background-position: -9000px -3240px;
  }
  37.10% {
    background-position: -10500px -3240px;
  }
  37.90% {
    background-position: -12000px -3240px;
  }
  38.71% {
    background-position: -13500px -3240px;
  }
  39.52% {
    background-position: -15000px -3240px;
  }
  40.32% {
    background-position: -16500px -3240px;
  }
  41.13% {
    background-position: -18000px -3240px;
  }
  41.94% {
    background-position: 0px -4320px;
  }
  42.74% {
    background-position: -1500px -4320px;
  }
  43.55% {
    background-position: -3000px -4320px;
  }
  44.35% {
    background-position: -4500px -4320px;
  }
  45.16% {
    background-position: -6000px -4320px;
  }
  45.97% {
    background-position: -7500px -4320px;
  }
  46.77% {
    background-position: -9000px -4320px;
  }
  47.58% {
    background-position: -10500px -4320px;
  }
  48.39% {
    background-position: -12000px -4320px;
  }
  49.19% {
    background-position: -13500px -4320px;
  }
  50.00% {
    background-position: -15000px -4320px;
  }
  50.81% {
    background-position: -16500px -4320px;
  }
  51.61% {
    background-position: -18000px -4320px;
  }
  52.42% {
    background-position: 0px -5400px;
  }
  53.23% {
    background-position: -1500px -5400px;
  }
  54.03% {
    background-position: -3000px -5400px;
  }
  54.84% {
    background-position: -4500px -5400px;
  }
  55.65% {
    background-position: -6000px -5400px;
  }
  56.45% {
    background-position: -7500px -5400px;
  }
  57.26% {
    background-position: -9000px -5400px;
  }
  58.06% {
    background-position: -10500px -5400px;
  }
  58.87% {
    background-position: -12000px -5400px;
  }
  59.68% {
    background-position: -13500px -5400px;
  }
  60.48% {
    background-position: -15000px -5400px;
  }
  61.29% {
    background-position: -16500px -5400px;
  }
  62.10% {
    background-position: -18000px -5400px;
  }
  62.90% {
    background-position: 0px -6480px;
  }
  63.71% {
    background-position: -1500px -6480px;
  }
  64.52% {
    background-position: -3000px -6480px;
  }
  65.32% {
    background-position: -4500px -6480px;
  }
  66.13% {
    background-position: -6000px -6480px;
  }
  66.94% {
    background-position: -7500px -6480px;
  }
  67.74% {
    background-position: -9000px -6480px;
  }
  68.55% {
    background-position: -10500px -6480px;
  }
  69.35% {
    background-position: -12000px -6480px;
  }
  70.16% {
    background-position: -13500px -6480px;
  }
  70.97% {
    background-position: -15000px -6480px;
  }
  71.77% {
    background-position: -16500px -6480px;
  }
  72.58% {
    background-position: -18000px -6480px;
  }
  73.39% {
    background-position: 0px -7560px;
  }
  74.19% {
    background-position: -1500px -7560px;
  }
  75.00% {
    background-position: -3000px -7560px;
  }
  75.81% {
    background-position: -4500px -7560px;
  }
  76.61% {
    background-position: -6000px -7560px;
  }
  77.42% {
    background-position: -7500px -7560px;
  }
  78.23% {
    background-position: -9000px -7560px;
  }
  79.03% {
    background-position: -10500px -7560px;
  }
  79.84% {
    background-position: -12000px -7560px;
  }
  80.65% {
    background-position: -13500px -7560px;
  }
  81.45% {
    background-position: -15000px -7560px;
  }
  82.26% {
    background-position: -16500px -7560px;
  }
  83.06% {
    background-position: -18000px -7560px;
  }
  83.87% {
    background-position: 0px -8640px;
  }
  84.68% {
    background-position: -1500px -8640px;
  }
  85.48% {
    background-position: -3000px -8640px;
  }
  86.29% {
    background-position: -4500px -8640px;
  }
  87.10% {
    background-position: -6000px -8640px;
  }
  87.90% {
    background-position: -7500px -8640px;
  }
  88.71% {
    background-position: -9000px -8640px;
  }
  89.52% {
    background-position: -10500px -8640px;
  }
  90.32% {
    background-position: -12000px -8640px;
  }
  91.13% {
    background-position: -13500px -8640px;
  }
  91.94% {
    background-position: -15000px -8640px;
  }
  92.74% {
    background-position: -16500px -8640px;
  }
  93.55% {
    background-position: -18000px -8640px;
  }
  94.35% {
    background-position: 0px -9720px;
  }
  95.16% {
    background-position: -1500px -9720px;
  }
  95.97% {
    background-position: -3000px -9720px;
  }
  96.77% {
    background-position: -4500px -9720px;
  }
  97.58% {
    background-position: -6000px -9720px;
  }
  98.39% {
    background-position: -7500px -9720px;
  }
  99.19% {
    background-position: -9000px -9720px;
  }
  100.00% {
    background-position: -10500px -9720px;
  }
}
.centerPart_operationIndexMonitoring {
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
      background: url(/image/operationMonitor/center_arrow.png) no-repeat;
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
          font-size: 25px;
          color: #fff;
          margin-top: 5px;
          letter-spacing: 3px;
        }
        .num {
          white-space: nowrap;
          font-size: 50px;
          color: #00fff8;
          span {
            font-size: 18px;
            margin-left: 20px;
            text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
            color: #b1d9fb;
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
          background: url("/image/industryExpansionControl/left1.png") no-repeat;
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
        section:nth-of-type(4) {
          width: 154px;
          height: 120px;
          background: url("/image/operationIndexMonitoring/center.png")
            no-repeat;
          background-position-x: -70px;
          // margin-left: 90px;
          position: absolute;
          top: 50%;
          margin-top: -60px;
          left: 460px;
          .num2 {
            font-size: 44px;
            color: #ffe543;
            span {
              font-size: 22px;
              color: #ffffff;
            }
          }
          .title2 {
            font-size: 22px;
            margin-top: 25px;
          }
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
        section:nth-of-type(4) {
          width: 154px;
          height: 120px;
          background: url("/image/operationIndexMonitoring/center.png")
            no-repeat;
          background-position-x: -70px;
          // margin-left: 90px;
          padding-right: 10px;
          position: absolute;
          top: 50%;
          margin-top: -60px;
          right: 460px;
          .num2 {
            font-size: 44px;
            color: #ffe543;
            span {
              font-size: 22px;
              color: #ffffff;
            }
          }
          .title2 {
            font-size: 22px;
            margin-top: 25px;
          }
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
      width: 1600px;
      height: calc(100% - 270px);
      top: 140px;
      left: 558px;
      z-index: 1;
      // perspective: 2000px;
      .city {
        position: absolute;
        font-size: 30px;
        font-weight: 400;
        // opacity: 0.7;
        color: #b3d1f0;
        top: 260px;
        left: 465px;
        z-index: 1;
        > span {
          display: inline-block;
          animation: fadeInDownBig 2s;
        }
        > p {
          position: absolute;
          top: -180px;
          left: 40px;
          width: 105px;
          height: 200px;
          background: url("/image/emergencyRepair/biaodian.png") no-repeat;
          animation: redAnimation 5s steps(1) infinite;
          // background-position:-545px 0px;
        }
        div {
          background: url("/image/emergencyRepair/kuang.png") no-repeat;
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
        div {
          background: url("/image/emergencyRepair/kuang2.png") no-repeat;
          width: 260px;
          top: -200px;
          left: -280px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 95px;
          border: 2px solid #a8614e;
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
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 338px;
          top: 107px;
          transform: rotate(60deg);
        }
      }
      .city2 {
        left: 700px;
        top: 210px;
        div {
          top: -200px;
          left: 160px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 50px;
          border: 2px solid #a8614e;
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
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -78px;
          top: 106px;
          transform: rotate(-65deg);
        }
      }
      .city3 {
        left: 900px;
        top: 220px;
        > p {
          top: -100px;
          left: -70px;
        }
        div {
          top: -85px;
          left: 160px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 160px;
          border: 2px solid #a8614e;
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
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: -190px;
          top: 75px;
          transform: rotate(-54deg);
        }
      }
      .city4 {
        left: 650px;
        top: 450px;
        > p {
          top: -185px;
          left: -15px;
        }
        div {
          background: url("/image/emergencyRepair/kuang2.png") no-repeat;
          width: 260px;
          top: -120px;
          left: -350px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 95px;
          border: 2px solid #a8614e;
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
          border: 2px solid #a8614e;
          border-left: none;
          border-right: none;
          border-bottom: none;
          left: 349px;
          top: 63px;
          transform: rotate(12deg);
        }
      }
      .city5 {
        left: 970px;
        top: 535px;
        > p {
          top: -180px;
          left: -30px;
        }
        div {
          top: -225px;
          left: 75px;
        }
        div::before {
          content: " ";
          display: block;
          position: absolute;
          width: 45px;
          border: 2px solid #a8614e;
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
          border: 2px solid #a8614e;
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
      bottom: 0;
      left: 50%;
      // width: 2210px;
      // height: 800px;
      width: 1500px;
      height: 1080px;
      margin-left: -700px;
      // border-radius: 50%;
      z-index: 0;
      background: url("/image/operationIndexMonitoring/bottom.png") no-repeat;
      // animation: panAnimation 5s steps(1) infinite;
    }
  }
}
</style>
