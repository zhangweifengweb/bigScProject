<template>
  <div class="centerPart_partyConstruction">
    <div class="title">
      <!-- <p class="left_arrow"></p> -->
      <p class="title_info">党建+安全</p>
      <!-- <p class="right_arrow"></p> -->
    </div>
    <div class="content">
      <section>
        <p></p>
        <p>
          <!-- <img src="/image/partyConstruction/img_middlepart_zr.png" alt="" /> -->
          <img src="/image/partyConstruction/pic_middle_01zr.png" alt="" />
          <!-- <span class="mask"></span> -->
        </p>
        <p>
          严格落实责任，认真做好安全 生产各项工作，确保电力系统运行
          安全，坚决遏制重特大事故发生。
          <span class="section"></span>
        </p>
      </section>
      <section>
        <!-- <video src="/image/party.mp4" autoplay='autoplay' loop='true'></video> -->
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </section>
      <section>
        <p></p>
        <p>
          <!-- <img src="/image/partyConstruction/img_middlepart_aq.png" alt="" /> -->
          <img src="/image/partyConstruction/pic_middle_03aq.png" alt="" />
          <!-- <span class="mask"></span> -->
        </p>
        <p>
          将安全生产引入党风廉政建设,强
          化超前防控和过程管控,全面落实党委的主体责任。
          <span class="section"></span>
        </p>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "baiduMap",
  components: {},
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
      // 视频播放
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "/image/party.mp4", //url地址
          },
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // controlBar: {
        //   timeDivider: true, //当前时间和持续时间的分隔符
        //   durationDisplay: true, //显示持续时间
        //   remainingTimeDisplay: false, //是否显示剩余时间功能
        //   fullscreenToggle: true, //全屏按钮
        // },
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss">
.centerPart_partyConstruction {
  position: absolute;
  left: 1835px;
  top: 0;
  width: 2149px;
  height: 871px;
  background: url("/image/partyConstruction/center_bg.png") no-repeat;
  background-position: 50% 50%;
  margin-top: 180px;
  background-size: cover;
  .title {
    height: 109px;
    // margin-top: 83px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    // padding: 0 233px;
    p {
      height: 100%;
      text-align: center;
    }
    // .left_arrow {
    //   background: url("/image/partyConstruction/img_middlepart_lineleft_big.png")
    //     no-repeat;
    //   background-position: 50%;
    //   width: 640px;
    // }
    // .right_arrow {
    //   background: url("/image/partyConstruction/img_middlepart_lineright_big.png")
    //     no-repeat;
    //   background-position: 50%;
    //   width: 640px;
    // }
    .title_info {
      font-size: 44px;
      width: 275px;
      margin-right: 75px;
      padding-top: 10px;
      line-height: 109px;
    }
  }
  .content {
    height: 742px;
    display: flex;
    justify-content: space-between;
    padding: 35px 50px;
    section {
      height: 100%;
      width: 443px;
      &:nth-of-type(2) {
        width: 1067px;
        height: 100%;
        border: 5px solid #225f8e;
        .video-player {
          margin-top: 30px;
        }
      }
      p:nth-of-type(1) {
        height: 30px;
        // background: url("/image/partyConstruction/img_middlepart_line_small.png")
        //   no-repeat;
      }
      p:nth-of-type(2) {
        height: 346px;
        position: relative;
        img {
          position: absolute;
          &:nth-of-type(1) {
            z-index: 3;
            // margin-top: 12px;
            // margin-left: 12px;
          }
          &:nth-of-type(2) {
            z-index: 1;
          }
        }
        .mask {
          display: inline-block;
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: linear-gradient(
            to right,
            #0e4072 0%,
            rgba(15, 62, 111, 0) 100%
          );
        }
      }
      p:nth-of-type(3) {
        font-size: 29px;
        background: rgba(0, 88, 179, 0.2);
        height: 245px;
        padding: 30px 25px;
        margin-top: 55px;
        position: relative;
        letter-spacing: 7px;
        // .section {
        //   display: inline-block;
        //   width: 9px;
        //   height: 47px;
        //   background: #ffba00;
        //   position: absolute;
        //   top: 28px;
        //   left: 0;
        // }
      }
    }
  }
}
</style>