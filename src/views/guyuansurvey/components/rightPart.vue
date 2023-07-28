<template>
  <div class="guyuansurveyRightPart">
    <div class="infoMonitor">
      <div class="boxTitle">
        <div class="title">管理理念</div>
      </div>
      <div class="content">
        <div class="contentTop">
          <div class="contentTopCenter"></div>
          <div class="contentTop1">
            <div class="contentTop1main1">
              <p>{{ staticData[0].indicatorName }}</p>
              <p>{{ staticData[0].indicatorValue }}</p>
              <img src="/image/guyuansurvey/l1.png" alt="" />
            </div>
            <div class="contentTop1main2">
              <p>{{ staticData[2].indicatorName }}</p>
              <p>{{ staticData[2].indicatorValue }}</p>
              <!-- <p>战略定位</p>
              <p>国名经济保障者<br />能源革命践行者<br />美好生活服务者</p> -->
              <img src="/image/guyuansurvey/l2.png" alt="" />
            </div>
          </div>
          <div class="contentTop2">
            <div class="contentTop2main1">
              <p>{{ staticData[1].indicatorName }}</p>
              <p>{{ staticData[1].indicatorValue }}</p>
              <!-- <p>企业宗旨</p>
              <p>人民电业为人民</p> -->
              <img src="/image/guyuansurvey/l3.png" alt="" />
            </div>
            <div class="contentTop2main2">
              <p>{{ staticData[3].indicatorName }}</p>
              <p>{{ staticData[3].indicatorValue }}</p>
              <!-- <p>公司使命</p>
              <p>为美好生活充电<br />为美丽中国赋能</p> -->
              <img src="/image/guyuansurvey/l4.png" alt="" />
            </div>
          </div>
        </div>
        <div class="contentBottom">
          <p>
            {{ staticData[4].indicatorValue }}
          </p>
          <!-- <p>
            固原供电营业区内共设营业网点100个,其中城市和县城营业网点13个，农村营业网点87个(乡镇供
            电所站)。全局共有客户37.2万户。固原电网负荷以工业、居民生活、交通运输及农业用电为主。
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initData: {
      type: Object,
      default() {
        return {
          tiemr: null,
        };
      },
    },
  },
  data() {
    return {
      staticData: [
        {
          indicatorName: "",
          indicatorValue: "",
        },
        {
          indicatorName: "",
          indicatorValue: "",
        },
        {
          indicatorName: "",
          indicatorValue: "",
        },
        {
          indicatorName: "",
          indicatorValue: "",
        },
        {
          indicatorName: "",
          indicatorValue: "",
        },
      ],
    };
  },
  watch: {
    initData(val) {
      // console.log("右边数据", val);
      this.staticData = [];
      val.screenTargetPart01Data[0].targetContent.forEach((item) => {
        this.staticData.push({
          indicatorName: item.indicatorName.split("/")[1],
          indicatorValue: item.indicatorValue.split("/")[1],
        });
      });
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@keyframes myAnimation {
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

.guyuansurveyRightPart {
  position: absolute;
  right: 26px;
  top: 88px;
  width: 1480px;
  background-position: 100% 0%;
  .infoMonitor {
    height: 906px;
    width: 100%;
    background: url("/image/guyuansurvey/rightbg.png") no-repeat;
    background-size: 100%;
    .content {
      display: flex;
      flex-direction: column;
      .contentTop {
        width: 100%;
        height: 640px;
        // border: 1px solid fuchsia;
        display: flex;
        padding: 40px 60px;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .contentTopCenter {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          width: 800px;
          height: 800px;
          // border: 1px solid firebrick;
          background: url("/image/guyuansurvey/rightmainbg.png") no-repeat;
          // animation: 5s myAnimation 2s steps(1) infinite;
          // background-position: 0% 0%;
        }
        .contentTop1 {
          display: flex;
          justify-content: space-between;
          div {
            width: 382px;
            height: 202px;
            background: url("/image/guyuansurvey/rightbg2.png") no-repeat;
            p:nth-of-type(1) {
              font-size: 34px;
              font-family: YouSheBiaoTiHei;
              font-weight: 400;
              line-height: 56px;
              color: #03ffe2;
              text-shadow: 0px 0px 18px rgba(3, 255, 226, 0.53);
              text-align: center;
              // letter-spacing: 60px;
            }
            p:nth-of-type(2) {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 32px;
              color: #ffffff;
              opacity: 0.8;
              text-align: center;
            }
          }
          .contentTop1main1 {
            position: relative;
            p:nth-of-type(2) {
              width: 262px;
              margin-top: 28px;
              margin-left: 52px;
            }
            img {
              position: absolute;
              left: 95%;
              top: 36%;
            }
          }
          .contentTop1main2 {
            position: relative;
            p:nth-of-type(2) {
              width: 198px;
              margin-top: 12px;
              margin-left: 98px;
            }
            img {
              position: absolute;
              left: -43%;
              top: 34%;
            }
          }
        }
        .contentTop2 {
          display: flex;
          justify-content: space-between;
          div {
            width: 382px;
            height: 202px;
            // border: 1px solid wheat;
            background: url("/image/guyuansurvey/rightbg2.png") no-repeat;
            p:nth-of-type(1) {
              font-size: 34px;
              font-family: YouSheBiaoTiHei;
              font-weight: 400;
              line-height: 56px;
              color: #03ffe2;
              text-shadow: 0px 0px 18px rgba(3, 255, 226, 0.53);
              text-align: center;
              // letter-spacing: 60px;
            }
            p:nth-of-type(2) {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 32px;
              color: #ffffff;
              opacity: 0.8;
              text-align: center;
            }
          }
          .contentTop2main1 {
            position: relative;
            p:nth-of-type(2) {
              margin-top: 50px;
            }
            img {
              position: absolute;
              left: 95%;
              top: 35%;
            }
          }
          .contentTop2main2 {
            position: relative;
            p:nth-of-type(2) {
              width: 196px;
              margin-top: 28px;
              margin-left: 94px;
            }
            img {
              position: absolute;
              left: -43%;
              top: 36%;
            }
          }
        }
      }
      .contentBottom {
        width: 100%;
        height: 164px;
        background: rgba(23, 62, 90, 0.4);

        padding: 34px 80px 16px 82px;
        p {
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 50px;
          color: #eaf7ff;
          // letter-spacing: 10px;
        }
      }
    }
  }
}
</style>
