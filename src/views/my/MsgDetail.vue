<template>
  <div class="msg-detail">
    <div class="title border-bottom">
      <div class="re-img" @click="$router.go(-1)"></div>
      我的消息
    </div>
    <div class="date">2018-08-19  14:30</div>
    <div class="paragraph">
      欢迎加入阿萨德哈所大所大所大所大所大所所大所大所
      啊大所大所大所大所大所所大所大所大所大所大所大所
      大所大所大所大所大所所大所大所大所大所大所大所大
      所所大所大所大所所大所大所
    </div>
    <div class="paragraph">
      欢迎加入阿萨德哈所大所大所大所大所大所所大所大所
      啊大所大所大所大所大所所大所大所大所大所大所大所
      大所大所大所大所大所所大所大所大所大所大所大所大
      所所大所大所大所所大所大所
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyMsgDetail"
  }
</script>

<style lang="scss" scoped>
  .msg-detail{
    .title{
      position: relative;
      height: 1.2rem;
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.32rem;
      color: #333333;
      .re-img{
        position: absolute;
        left: 0.28rem;
        top: 50%;
        transform: translate3d(0,-50%,0);
        width: 0.42rem;
        height: 0.32rem;
        background: url("../../assets/images/return-icon.png") no-repeat;
        background-size: 100%;
      }
    }
    .date{
      margin-top: 0.4rem;
      margin-bottom: 0.6rem;
      text-align: center;
      font-size: 0.24rem;
      color: #B3B3B3;
    }
    .paragraph{
      margin: 0px 0.28rem 0.4rem;
      color: #333333;
      font-size: 0.28rem;
    }
  }

</style>
