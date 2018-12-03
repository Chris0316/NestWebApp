<template>
  <div class="message">
    <div class="title border-bottom">
        <div class="re-img"></div>
        我的消息
      </div>
    <nest-swipe-cell v-for="(item,i) in msgList" :key="i">
      <div class="msg-item" slot="content">
        <div class="left"></div>
        <div class="right">
          <div class="text">
            欢迎加入阿萨德哈所大所大所大所多所大所是
            所大所大所所大所大所所大所所大所所大欢迎加入阿萨德哈所大所大所大所多所大所是
            所大所大所所大所大所所大所所大所所大
          </div>
          <div class="time">2018-08-19  14:30</div>
        </div>
      </div>
      <div class="del-wrap" slot="controls">
        <div class="red-del"></div>
      </div>
    </nest-swipe-cell>
  </div>
</template>

<script>
  export default {
    name: "message",
    props:{
      msgList:{
        type: Array,
        default:function () {
          return ['a','b','c']
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.message{
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
  .msg-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.28rem;
    margin-right: 0.28rem;
    height: 1.6rem;
    .left{
      margin-right: 0.2rem;
      flex-shrink:0;
      width: 1rem;
      height: 1rem;
      background: #0F9183;
      border-radius: 0.1rem;
    }
    .right{
      flex: 1;
      display: flex;
      flex-direction:column;
    }
    .text{
      height: 0.64rem;
      color: #333333;
      font-size: 0.28rem;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .time{
      margin-top: 0.14rem;
      font-size: 0.24rem;
      color: #B3B3B3;
    }
  }
  .del-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.2rem;
    height: 1.6rem;
    background: #FFE6E6;
    .red-del{
      width: 0.3rem;
      height: 0.3rem;
      background: url("../../assets/images/red-del.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
