<template>
  <div class="follow-list">
    <div class="title-wrap">
      <div class="re-icon"></div>
      <div class="search-box">
        <input class="search-msg" type="text" v-model="searchkey" >
        <div class="search-img" ></div>
        <div class="delete" v-if="deleteShow" @click="clearSearch"></div>
      </div>
    </div>
    <div class="result">共搜索到3条相关信息</div>
    <!--房租搜索结果-->
    <div class="search-list">
      <nest-swipe-cell  v-for="(recommend,index) in recommends" :key="index">
        <div class="search-item"  slot="content">
          <div class="move-wrap">
            <div class="item-img"></div>
            <div class="msg-wrap">
              <div class="title">{{recommend.roomplace}}</div>
              <div class="type-wrap" v-if="recommend.roomsizes.constructor === Array">
                <div class="type" v-for="(roomsize,index) in recommend.roomsizes" :key="index">{{roomsize}}</div>
              </div>
              <div class="type-wrap" v-else="!recommend.roomsizes.constructor === Array">
                <div class="type-str">{{recommend.roomsizes}}</div>
              </div>
              <div class="rent" v-if="!recommend.rentsize">
                <div class="price">{{recommend.pricem}}</div>
                <div class="price-msg">P/月</div>
              </div>
              <div class="rent" v-else-if="recommend.rentsize">
                <div class="price">{{recommend.pricem}}</div>
                <div class="price-msg">P/㎡</div>
                <div class="room-size">{{recommend.rentsize}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="collect-wrap"  slot="controls">
          <div class="collect">
            <div class="heart"></div>
            <div class="share"></div>
          </div>
          <div class="collect-del">
            <div class="call-icon"></div>
          </div>
        </div>
      </nest-swipe-cell>
    </div>

    <!--经纪人搜索结果-->
    <div class="peo-list"  v-if="deleteShow">
      <nest-swipe-cell  v-for="(peo,index) in peoList" :key="index">
        <div class="item" slot="content">
          <div class="item-cont">
            <div class="top">
              <div class="top-l">
                <div class="cli"></div>
                <div class="det">
                  <div class="name">Govern</div>
                  <div class="skill">语言：汉语/英语/韩语/日语</div>
                </div>
              </div>
              <div class="top-r">
                <div class="follow-btn">已关注</div>
                <div class="follow-num">67人关注</div>
              </div>
            </div>
            <div class="text1">
              近一个月：出租 <span class="sp">13</span>套 &nbsp;售卖 <span class="sp">24</span> 套
            </div>
            <div class="text2">
              我是来自makati的经纪人，这是个性签名随便写点什么做多两行的
              最后一行在这里最后用“...“表示就行了最后一行在这里最后用“...“表示就行了
            </div>
          </div>
        </div>
        <div class="collect-wrap" slot="controls">
          <div class="collect-l">
            <img class="icon" src="../../assets/images/s-share.png" alt="">
          </div>
          <div class="collect-r">
            <img class="icon" src="../../assets/images/s-call.png" alt="">
          </div>
        </div>
      </nest-swipe-cell>
    </div>
    <nest-nav page="follow"></nest-nav>
  </div>
</template>

<script>
  export default {
    name: "follow-list",
    props:{
      recommends: {
        type: Array,
        default: function () {
          return [
            {
              roomimg: '',
              roomplace: 'Jazz residence户型Jazz residence户型residence户型residence户型',
              roomsizes: "新房旧房Makati,新房旧房Makati,  1207 Metro Manila",
              pricem: 23000,
              rentsize: '28.00-100.55 ㎡'
            },
            {
              roomimg: '',
              roomplace: 'Jazz residence户型',
              roomsizes: "新房旧房Makati, 1207 Metro Manila",
              pricem: 23000,
              rentsize: '28.00-100.55 ㎡'
            },
            {
              roomimg: '',
              roomplace: 'Jazz residence户型Jazz residence户型residence户型residence户型',
              roomsizes: "车位Makati, 1207 Metro Manila",
              pricem: 23000
            },
            {
              roomimg: '',
              roomplace: 'Jazz residence户型Jazz residence户型residence户型residence户型',
              roomsizes: ['10F', '100.55 ㎡'],
              pricem: 23000
            },
            {
              roomimg: '',
              roomplace: 'Jazz residence户型Jazz residence户型residence户型residence户型',
              roomsizes: ['10F', '100.55 ㎡'],
              pricem: 23000
            },
            {
              roomimg: '',
              roomplace: 'Jazz residence户型Jazz residence户型residence户型residence户型',
              roomsizes: ['10F', '100.55 ㎡'],
              pricem: 23000
            }
          ];
        }
      }
    },
    data(){
      return {
        searchkey:'dsfds',
        deleteShow:false,
        peoList:['a','b','c','d','e'],
      }
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  input {
    background: none;
    outline: none;
    border: 0px;
    caret-color: #0f9183;
  }
  @mixin rowcenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .follow-list{
    .title-wrap{
      padding: 0.2rem 0.28rem;
      @include rowcenter;
      justify-content: space-between;
      .re-icon{
        width:0.42rem;
        height: 0.32rem;
        background: url("../../assets/images/return-icon.png") no-repeat;
        background-size: 100% 100%;
      }
      .search-box {
        position: relative;
        width: 6.04rem;
        height: 0.8rem;
        .delete{
          position: absolute;
          top: 50%;
          right: 0.25rem;
          margin-top: -0.16rem;
          width: 0.32rem;
          height: 0.32rem;
          background: url("../../assets/images/delete.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .search-msg {
        box-sizing: border-box;
        padding-left: 0.64rem;
        width: 100%;
        height: 100%;
        border: 1px solid #e8e8ea;
        border-radius: 0.1rem;
        box-shadow: 0px 0px 0.2rem rgba(176, 183, 187, 0.4);
        &:active {
          background-color: #e8e8ea;
        }
      }
      .search-img {
        position: absolute;
        top: 0.26rem;
        left: 0.2rem;
        width: 0.32rem;
        height: 0.32rem;
        background: url("../../assets/images/search-img.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .result{
      margin-top: 0.2rem;
      margin-left: 0.28rem;
      margin-bottom: 0.7rem;
      font-size: 0.28rem;
      color: #999999;
    }
    .search-item {
      display: flex;
      width: 100%;
      height: 1.74rem;
      align-items: center;
      margin-bottom: 0.4rem;
      .move-wrap {
        position: absolute;
        top: 0rem;
        left: 0rem;
        z-index: 1;
        display: flex;
        background: #fff;
        transition: left 0.5s;
      }
      .item-img {
        margin-left: 0.28rem;
        flex-shrink: 0;
        width: 2.7rem;
        height: 1.74rem;
        border-radius: 0.1rem;
        background-color: #e8e8ea;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .msg-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .08rem 0;
        flex-shrink: 0;
        width: 3.96rem;
        margin-left: 0.28rem;
        margin-right: 0.28rem;
      }
      .title {
        word-break: break-all;
        margin-bottom: 0.1rem;
        height: 0.64rem;
        line-height: .32rem;
        font-size: 0.28rem;
        color: #333333;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .type-wrap {
        display: flex;
        margin-bottom: 0.1rem;
      }
      .type {
        margin-right: 0.1rem;
        padding: 0.08rem;
        background: #fbf8f3;
        color: #d5be88;
        font-size: 0.24rem;
        border-radius: 0.1rem;
        line-height: 1;
      }
      .type-str {
        word-break: break-all;
        color: #808080;
        font-size: 0.24rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .rent {
        display: flex;
        align-items: flex-end;
        font-size: 0.28rem;
        color: #0f9183;
      }
      .price {
        font-weight: bold;
      }
      .price-msg {
        margin-left: 0.1rem;
        font-size: 0.24rem;
      }
      .room-size {
        margin-left: 0.25rem;
        font-size: 0.22rem;
        color: #cccccc;
      }
    }
    .collect-wrap {
      display: flex;
      &:last-of-type {
        margin-bottom: 0.8rem;
      }
      .collect {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        flex-shrink: 0;
        width: 1.2rem;
        height: 1.74rem;
        background-color: #e7f4f2;
      }
      .heart {
        width: 0.36rem;
        height: 0.32rem;
        background: url("../../assets/images/heart.png") no-repeat;
        background-size: 100% 100%;
      }
      .share {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../assets/images/share.png") no-repeat;
        background-size: 100% 100%;
      }
      .collect-del {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.8rem;
        height: 1.74rem;
        background:rgba(249,245,237,1);
        .call-icon{
          width: 0.38rem;
          height: 0.38rem;
          background: url("../../assets/images/s-call.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .peo-list{
      .item{
        height: 2.15rem;
        margin-bottom: 0.4rem;
        .item-cont{
          position: absolute;
          margin: 0 0.28rem;
        }
        .top{
          margin-bottom: 0.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .top-l{
          display: flex;
          align-items: center;
          .cli{
            margin-right: 0.2rem;
            width: 1rem;
            height: 1rem;
            background: #DFDFDF;
            border-radius: 50%;
          }
          .det{
            display: flex;
            flex-direction:column;
          }
          .name{
            margin-bottom: 0.18rem;
            font-size: 0.32rem;
            color: #333;
          }
          .skill{
            font-size: 0.24rem;
            color: #B3B3B3;
          }
        }
        .top-r{
          display: flex;
          flex-direction:column ;
          align-items: center;
          .follow-btn{
            font-size: 0.28rem;
            color: #B3B3B3;
            position: relative;
            padding: 0 .22rem;
            min-width: 1.2rem;
            max-width: 1.6rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            box-sizing: border-box;
            border-radius: .1rem;
            &.active {
              color: #fff;
              background-color: #0f9183;
              &::after {
                display: none;
              }
            }
            &::after {
              position: absolute;
              content: "";
              top: 0;
              left: 0;
              border: 1px solid #b2b2b2;
              border-radius: .2rem;
              box-sizing: border-box;
              width: 200%;
              height: 200%;
              transform: scale(.5);
              transform-origin: left top;
            }
          }
          .follow-num{
            margin-top: 0.08rem;
            font-size: 0.24rem;
            color: #B3B3B3;
          }
        }
        .text1{
          font-size: 0.24rem;
          color: #999;
          .sp{
            font-size: 0.28rem;
            color: #333;
          }
        }
        .text2{
          font-weight: lighter;
          font-size: 0.24rem;
          line-height: 0.3rem;
          color: #B3B3B3;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

      }
      .collect-wrap{
        display: flex;
        &:last-child{
          margin-bottom: 0.8rem;
        }
        .collect-l{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.2rem;
          height: 2.15rem;
          background: #e2ebe2;
          .icon{
            width: 0.3rem;
            height: 0.3rem;
          }
        }
        .collect-r{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.8rem;
          height: 2.15rem;
          background: #f9f5ed;
          .icon{
            width: 0.38rem;
            height: 0.38rem;
          }
        }
      }
    }
  }
</style>
