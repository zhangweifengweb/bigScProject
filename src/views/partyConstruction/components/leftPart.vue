<template>
  <div class="leftPart_partyConstruction">
    <div class="content">
      <img class="slogan" src="/image/partyConstruction/slogan.png" alt="" />
      <img
        class="sub_slogan"
        src="/image/partyConstruction/sub_slogan.png"
        alt=""
      />
      <div class="outline">
        <p v-for="(item,index) in infoList" :key="item+index">{{item}}</p>
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
        return {};
      },
    },
  },
  data() {
    return {
      infoList:[
        '团队战斗力',
        '组织凝聚力',
        '党建引领力'
      ]
    };
  },
};
</script>
<style lang="scss" scoped>
.leftPart_partyConstruction {
  position: absolute;
  top: 0;
  left: 0;
  width: 1835px;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    .slogan {
      position: absolute;
      right: 26px;
      top: 225px;
    }
    .sub_slogan {
      position: absolute;
      left: 187px;
      bottom: 204px;
    }
    .outline {
      position: absolute;
      right: 60px;
      bottom: 80px;
      font-size: 60px;
      line-height: 94px;
      p {
        background: url("/image/partyConstruction/img_leftpart_leftsjx.png")
          no-repeat;
        background-position: 0 50%;
        padding-left: 60px;
      }
    }
  }
}
</style>