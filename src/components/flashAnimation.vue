<template>
  <div class="loadMask" v-if="maskShow">
    <div class="scrollBar"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      maskShow: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.maskShow = false;
    }, 4000);
  },
};
</script>
<style lang="scss" scoped>
.loadMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  .scrollBar {
    height: 100%;
    overflow: hidden;
    position: relative;
    &:after {
      position: absolute;
      left: -100%; /*改变left的值，让其相对box影藏*/
      top: 0;
      width: 30%;
      height: 100%;
      content: "";
      /* Safari 5.1 - 6.0 */
      background: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      /* Opera 11.1 - 12.0 */
      background: -o-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      /* Firefox 3.6 - 15 */
      background: -moz-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      /* 标准的语法 */
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-45deg);
      // left: 150%;
      // transition: 2s ease;
      animation: flashAnimation 3s ease-in-out 1s;
    }
  }
}
@keyframes flashAnimation {
  0% {
    left: -100%;
  }
  50% {
    left: 150%;
  }
  100% {
    left: -100%;
  }
}
</style>