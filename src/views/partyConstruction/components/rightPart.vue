<template>
  <div class="rightPart_partyConstruction">
    <section>
      <div class="title">党建+创新</div>
      <div class="content">
        <p v-for="(item,index) in arr" :key="item+index">{{item}}</p>
        <!-- <p>低电压召测策略和表计端治理手段首创新.</p> -->
      </div>
      <img src="/image/partyConstruction/img_rightpart_sy_fw.png" alt="" />
    </section>
    <section>
      <div class="title">党建+服务</div>
      <div class="content">
        <p v-for="(item,index) in arr1" :key="item+index">{{item}}</p>
      </div>
      <img src="/image/partyConstruction/img_rightpart_sy_cx.png" alt="" />
    </section>
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
      arr:[
        '“党员创新团队”激发工作动能,提升工作质效.',
        '低电压召测策略和表计端治理手段首创新.'
      ],
      arr1:[
        '与区供电中心成立“联合共产党员服务队”,疫情期间发挥党员先锋模范作用.',
        '成立“保供电工程党员服务队”,编制“一户一案”保电方案,确保安全可靠供电.'
      ]
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.rightPart_partyConstruction {
  position: absolute;
  right: 0px;
  top: 156px;
  width: 1776px;
  padding-left: 218px;
  section {
    width: 1486px;
    height: 407px;
    background: url("/image/partyConstruction/bg_leftpart_text.png") no-repeat;
    position: relative;
    &:nth-of-type(1) {
      margin-bottom: 54px;
      .content {
        background: url("/image/partyConstruction/img_rightpart_djcx.png")
          no-repeat;
        background-position: 0 100%;
        padding-top: 60px;
      }
    }
    &:nth-of-type(2) {
      .content {
        background: url("/image/partyConstruction/img_rightpart_djfw.png")
          no-repeat;
        background-position: 0 100%;
        padding-top: 20px;
      }
    }
    > img {
      position: absolute;
      right: 20px;
      top: 95px;
    }
    .title {
      height: 95px;
      font-size: 44px;
      font-weight: 800;
      line-height: 90px;
      padding-left: 110px;
    }
    .content {
      height: 313px;
      padding-left: 367px;
      padding-right: 196px;
      p {
        font-size: 38px;
        font-weight: 400;
        letter-spacing: 6px;
        background: url("/image/partyConstruction/img_rightpart_rightsjx.png")
          no-repeat;
        background-position: 0 50%;
        padding-left: 60px;
        &:nth-of-type(1) {
          margin-bottom: 50px;
        }
      }
    }
  }
}
</style>