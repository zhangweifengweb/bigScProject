<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <div id="nav">
      <div
        class="nav_content"
        :style="{
          background: `url(${$store.state.navImageUrl}) no-repeat`,
        }"
      >
        {{ $store.state.navTitle }}
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      routeArr: [],
      nowRoute: "",
    };
  },
  mounted() {
    // setTimeout(() => {
    //   console.log("看看路由", this.$router.options.routes);
    // }, 500);
    this.routeArr = this.$router.options.routes;
    this.routeArr.shift();
    window.addEventListener("keyup", this.handleKeyup);
  },
  methods: {
    handleKeyup(event) {
      const e = event || window.event || arguments.callee.caller.arguments[0];
      if (!e) return;
      const { key, keyCode } = e;
      let index = 0;
      for (let i = 0; i < this.routeArr.length; i++) {
        const element = this.routeArr[i];
        if (element.path == this.$route.path) {
          index = i;
        }
      }
      if (keyCode == 33) {
        index--;
        if (index < 0) {
          index = this.routeArr.length - 1;
        }
      } else if (keyCode == 34) {
        index++;
        if (index > this.routeArr.length - 1) {
          index = 0;
        }
      }
      this.$router.replace(this.routeArr[index].path);
    },
  },
};
</script>
<style lang="scss">
@import "~@/styles/index.scss";
@font-face {
  font-family: numFont;
  src: url("~@/assets/css/font/LCD_digital_font.TTF");
}
.num {
  &:not(span) {
    font-family: "numFont";
    text-shadow: 0px 0px 8px rgba(116, 232, 255, 0.6);
    color: #00fff8;
  }
}
.anchorBL {
  display: none;
}
.BMap_bubble_pop {
  border: none !important;
  background: none !important;
  .BMap_bubble_top {
    border: none !important;
    .BMap_bubble_title,
    .BMap_bubble_buttons {
      background: none !important;
    }
    .BMap_bubble_buttons:hover {
      background-color: rgb(155, 60, 60) !important;
    }
  }
  img {
    display: none !important;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(3, 13, 66);
  height: 100%;
  position: relative;
}

.boxTitle {
  // width: 1520px;
  height: 88px;
  background: url("/image/animationKeyFramesBg/boxTitle_bg.png") no-repeat;
  background-size: cover;
  // animation: titleAnimation 5s steps(1) infinite;
  color: #fff;
  letter-spacing: 3px;
  font-size: 25px;
  line-height: 50px;
  padding-left: 85px;
  // padding-top: 10px;
  font-weight: bold;
  margin: 0 0 10px 0;
  display: flex;
  // &::after {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 1520px;
  //   height: 11000px;

  //   display: block;
  //   z-index: 1;
  // }
  // .colorside{
  //   height: 26px;
  //   background-color:#D89D58 ;
  //   width: 6px;
  //   margin-top: 13px;
  //   border-radius: 3px;
  // }
  .title {
    padding-left: 20px;
    // width: 170px;
    height: 50px;
    padding-top: 5px;
    line-height: 88px;
    animation: fadeInLeft 1s;
  }
  .img {
    background: url("/image/operationMonitor/ycgdfw_decoration.png") no-repeat;
    width: 60px;
    height: 50px;
    background-position: 50%;
    margin-left: 20px;
  }
}

#nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 5760px;
  // background: url('/image/top.png') no-repeat;
  // background-position: 0 -170px;
  z-index: 9;
  height: 116px;
  // position: relative;
  overflow: hidden;
  .nav_content {
    position: absolute;
    line-height: 100px;
    color: #fff;
    text-shadow: 0px 8px 8px rgba(15, 61, 85, 0.71);
    letter-spacing: 15px;
    opacity: 1;
    text-align: center;
    font-size: 46px;
    font-family: MicrosoftYaHei-Bold;
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;
    // background: url("/image/animationKeyFramesBg/nav_bg.png") no-repeat;
    // background-repeat: no-repeat;
    // background-size: cover;
    // animation: navAnimation 2s steps(1) infinite;
  }
  // animation: navAnimation 2s steps(1) infinite;
  // &::after {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 5760px;
  //   height: 5800px;

  //   display: block;
  //   z-index: 1;
  // }
}
@keyframes navAnimation {
  0% {
    background-position: 0px 0px;
  }
  2.04% {
    background-position: 0px -116px;
  }
  4.08% {
    background-position: 0px -232px;
  }
  6.12% {
    background-position: 0px -348px;
  }
  8.16% {
    background-position: 0px -464px;
  }
  10.20% {
    background-position: 0px -580px;
  }
  12.24% {
    background-position: 0px -696px;
  }
  14.29% {
    background-position: 0px -812px;
  }
  16.33% {
    background-position: 0px -928px;
  }
  18.37% {
    background-position: 0px -1044px;
  }
  20.41% {
    background-position: 0px -1160px;
  }
  22.45% {
    background-position: 0px -1276px;
  }
  24.49% {
    background-position: 0px -1392px;
  }
  26.53% {
    background-position: 0px -1508px;
  }
  28.57% {
    background-position: 0px -1624px;
  }
  30.61% {
    background-position: 0px -1740px;
  }
  32.65% {
    background-position: 0px -1856px;
  }
  34.69% {
    background-position: 0px -1972px;
  }
  36.73% {
    background-position: 0px -2088px;
  }
  38.78% {
    background-position: 0px -2204px;
  }
  40.82% {
    background-position: 0px -2320px;
  }
  42.86% {
    background-position: 0px -2436px;
  }
  44.90% {
    background-position: 0px -2552px;
  }
  46.94% {
    background-position: 0px -2668px;
  }
  48.98% {
    background-position: 0px -2784px;
  }
  51.02% {
    background-position: 0px -2900px;
  }
  53.06% {
    background-position: 0px -3016px;
  }
  55.10% {
    background-position: 0px -3132px;
  }
  57.14% {
    background-position: 0px -3248px;
  }
  59.18% {
    background-position: 0px -3364px;
  }
  61.22% {
    background-position: 0px -3480px;
  }
  63.27% {
    background-position: 0px -3596px;
  }
  65.31% {
    background-position: 0px -3712px;
  }
  67.35% {
    background-position: 0px -3828px;
  }
  69.39% {
    background-position: 0px -3944px;
  }
  71.43% {
    background-position: 0px -4060px;
  }
  73.47% {
    background-position: 0px -4176px;
  }
  75.51% {
    background-position: 0px -4292px;
  }
  77.55% {
    background-position: 0px -4408px;
  }
  79.59% {
    background-position: 0px -4524px;
  }
  81.63% {
    background-position: 0px -4640px;
  }
  83.67% {
    background-position: 0px -4756px;
  }
  85.71% {
    background-position: 0px -4872px;
  }
  87.76% {
    background-position: 0px -4988px;
  }
  89.80% {
    background-position: 0px -5104px;
  }
  91.84% {
    background-position: 0px -5220px;
  }
  93.88% {
    background-position: 0px -5336px;
  }
  95.92% {
    background-position: 0px -5452px;
  }
  97.96% {
    background-position: 0px -5568px;
  }
  100.00% {
    background-position: 0px -5684px;
  }
}
@keyframes navAnimationChange {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -5800px, 0);
  }
}
@keyframes titleAnimation {
  0% {
    background-position: 0px 0px;
  }
  0.81% {
    background-position: 0px -88px;
  }
  1.61% {
    background-position: 0px -176px;
  }
  2.42% {
    background-position: 0px -264px;
  }
  3.23% {
    background-position: 0px -352px;
  }
  4.03% {
    background-position: 0px -440px;
  }
  4.84% {
    background-position: 0px -528px;
  }
  5.65% {
    background-position: 0px -616px;
  }
  6.45% {
    background-position: 0px -704px;
  }
  7.26% {
    background-position: 0px -792px;
  }
  8.06% {
    background-position: 0px -880px;
  }
  8.87% {
    background-position: 0px -968px;
  }
  9.68% {
    background-position: 0px -1056px;
  }
  10.48% {
    background-position: 0px -1144px;
  }
  11.29% {
    background-position: 0px -1232px;
  }
  12.10% {
    background-position: 0px -1320px;
  }
  12.90% {
    background-position: 0px -1408px;
  }
  13.71% {
    background-position: 0px -1496px;
  }
  14.52% {
    background-position: 0px -1584px;
  }
  15.32% {
    background-position: 0px -1672px;
  }
  16.13% {
    background-position: 0px -1760px;
  }
  16.94% {
    background-position: 0px -1848px;
  }
  17.74% {
    background-position: 0px -1936px;
  }
  18.55% {
    background-position: 0px -2024px;
  }
  19.35% {
    background-position: 0px -2112px;
  }
  20.16% {
    background-position: 0px -2200px;
  }
  20.97% {
    background-position: 0px -2288px;
  }
  21.77% {
    background-position: 0px -2376px;
  }
  22.58% {
    background-position: 0px -2464px;
  }
  23.39% {
    background-position: 0px -2552px;
  }
  24.19% {
    background-position: 0px -2640px;
  }
  25.00% {
    background-position: 0px -2728px;
  }
  25.81% {
    background-position: 0px -2816px;
  }
  26.61% {
    background-position: 0px -2904px;
  }
  27.42% {
    background-position: 0px -2992px;
  }
  28.23% {
    background-position: 0px -3080px;
  }
  29.03% {
    background-position: 0px -3168px;
  }
  29.84% {
    background-position: 0px -3256px;
  }
  30.65% {
    background-position: 0px -3344px;
  }
  31.45% {
    background-position: 0px -3432px;
  }
  32.26% {
    background-position: 0px -3520px;
  }
  33.06% {
    background-position: 0px -3608px;
  }
  33.87% {
    background-position: 0px -3696px;
  }
  34.68% {
    background-position: 0px -3784px;
  }
  35.48% {
    background-position: 0px -3872px;
  }
  36.29% {
    background-position: 0px -3960px;
  }
  37.10% {
    background-position: 0px -4048px;
  }
  37.90% {
    background-position: 0px -4136px;
  }
  38.71% {
    background-position: 0px -4224px;
  }
  39.52% {
    background-position: 0px -4312px;
  }
  40.32% {
    background-position: 0px -4400px;
  }
  41.13% {
    background-position: 0px -4488px;
  }
  41.94% {
    background-position: 0px -4576px;
  }
  42.74% {
    background-position: 0px -4664px;
  }
  43.55% {
    background-position: 0px -4752px;
  }
  44.35% {
    background-position: 0px -4840px;
  }
  45.16% {
    background-position: 0px -4928px;
  }
  45.97% {
    background-position: 0px -5016px;
  }
  46.77% {
    background-position: 0px -5104px;
  }
  47.58% {
    background-position: 0px -5192px;
  }
  48.39% {
    background-position: 0px -5280px;
  }
  49.19% {
    background-position: 0px -5368px;
  }
  50.00% {
    background-position: 0px -5456px;
  }
  50.81% {
    background-position: 0px -5544px;
  }
  51.61% {
    background-position: 0px -5632px;
  }
  52.42% {
    background-position: 0px -5720px;
  }
  53.23% {
    background-position: 0px -5808px;
  }
  54.03% {
    background-position: 0px -5896px;
  }
  54.84% {
    background-position: 0px -5984px;
  }
  55.65% {
    background-position: 0px -6072px;
  }
  56.45% {
    background-position: 0px -6160px;
  }
  57.26% {
    background-position: 0px -6248px;
  }
  58.06% {
    background-position: 0px -6336px;
  }
  58.87% {
    background-position: 0px -6424px;
  }
  59.68% {
    background-position: 0px -6512px;
  }
  60.48% {
    background-position: 0px -6600px;
  }
  61.29% {
    background-position: 0px -6688px;
  }
  62.10% {
    background-position: 0px -6776px;
  }
  62.90% {
    background-position: 0px -6864px;
  }
  63.71% {
    background-position: 0px -6952px;
  }
  64.52% {
    background-position: 0px -7040px;
  }
  65.32% {
    background-position: 0px -7128px;
  }
  66.13% {
    background-position: 0px -7216px;
  }
  66.94% {
    background-position: 0px -7304px;
  }
  67.74% {
    background-position: 0px -7392px;
  }
  68.55% {
    background-position: 0px -7480px;
  }
  69.35% {
    background-position: 0px -7568px;
  }
  70.16% {
    background-position: 0px -7656px;
  }
  70.97% {
    background-position: 0px -7744px;
  }
  71.77% {
    background-position: 0px -7832px;
  }
  72.58% {
    background-position: 0px -7920px;
  }
  73.39% {
    background-position: 0px -8008px;
  }
  74.19% {
    background-position: 0px -8096px;
  }
  75.00% {
    background-position: 0px -8184px;
  }
  75.81% {
    background-position: 0px -8272px;
  }
  76.61% {
    background-position: 0px -8360px;
  }
  77.42% {
    background-position: 0px -8448px;
  }
  78.23% {
    background-position: 0px -8536px;
  }
  79.03% {
    background-position: 0px -8624px;
  }
  79.84% {
    background-position: 0px -8712px;
  }
  80.65% {
    background-position: 0px -8800px;
  }
  81.45% {
    background-position: 0px -8888px;
  }
  82.26% {
    background-position: 0px -8976px;
  }
  83.06% {
    background-position: 0px -9064px;
  }
  83.87% {
    background-position: 0px -9152px;
  }
  84.68% {
    background-position: 0px -9240px;
  }
  85.48% {
    background-position: 0px -9328px;
  }
  86.29% {
    background-position: 0px -9416px;
  }
  87.10% {
    background-position: 0px -9504px;
  }
  87.90% {
    background-position: 0px -9592px;
  }
  88.71% {
    background-position: 0px -9680px;
  }
  89.52% {
    background-position: 0px -9768px;
  }
  90.32% {
    background-position: 0px -9856px;
  }
  91.13% {
    background-position: 0px -9944px;
  }
  91.94% {
    background-position: 0px -10032px;
  }
  92.74% {
    background-position: 0px -10120px;
  }
  93.55% {
    background-position: 0px -10208px;
  }
  94.35% {
    background-position: 0px -10296px;
  }
  95.16% {
    background-position: 0px -10384px;
  }
  95.97% {
    background-position: 0px -10472px;
  }
  96.77% {
    background-position: 0px -10560px;
  }
  97.58% {
    background-position: 0px -10648px;
  }
  98.39% {
    background-position: 0px -10736px;
  }
  99.19% {
    background-position: 0px -10824px;
  }
  100.00% {
    background-position: 0px -10912px;
  }
}
@keyframes titleAnimationChange {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -11000px, 0);
  }
}
</style>
