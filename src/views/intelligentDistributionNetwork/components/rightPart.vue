<template>
  <div class="intelligentDistributionNetworkRightPart">
    <div class="boxTitle1"></div>
    <div class="content">
      <div class="bg_container">
        <img :src="url" alt="" />
      </div>
      <div class="infoList">
        <section v-for="item,index in listData" :key="item.name+index">
          <p class="num">
            {{item.value}}<span class="unit">{{item.unit}}</span>
          </p>
          <p class="title">{{item.name}}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/image/animationKeyFramesBg/intelligentDistributionNetwork_map.png",
      listData:[
        {name:'三相电压',unit:'V',value:389},
        {name:'剩余电流',unit:'A',value:10},
        {name:'三相电流',unit:'A',value:50},
        {name:'额定容量',unit:'KVA',value:5000},
        {name:'有功功率',unit:'W',value:100},
        {name:'可开放容量',unit:'KVA',value:3000},
        {name:'无功功率',unit:'W',value:100},
      ]
    };
  },
  mounted(){
    setTimeout(()=>{
      this.url='/image/intelligentDistributionNetwork/mapLast.png';
    },13000)
  }
};
</script>

<style lang="scss" scoped>
.intelligentDistributionNetworkRightPart {
  width: 1459px;
  height: 906px;
  position: absolute;
  right: 26px;
  top: 88px;
  background: url("/image/intelligentDistributionNetwork/RightPart.png")
    no-repeat;
  .boxTitle1 {
    height: 77px;
  }
  .content {
    width: 1378px;
    height: 748px;
    background: url("/image/intelligentDistributionNetwork/rightContent.png")
      no-repeat;
    margin: 35px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .bg_container {
      width: 1343px;
      height: 713px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .infoList{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 50px;
      align-items: center;
      section{
        width: 300px;
        height: 110px;
        background: url('/image/intelligentDistributionNetwork/info_bg.png') no-repeat;
        background-position: center;
        text-align: center;
        &:nth-of-type(odd){
          margin-right: 300px;
        }
        .num{
          font-size: 50px;
          .unit{
            font-size: 40px;
            margin-left: 20px;
            font-family: '黑体';
          }
        }
        .title{
          font-size: 30px;
        }
      }
    }
  }
}
</style>