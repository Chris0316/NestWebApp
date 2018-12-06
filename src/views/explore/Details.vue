<template>
  <div class="details">
    <div class="head-bar"></div>
    <nest-scroll class="app-body">
      <div>
        <div class="top-banner"></div>
        <div class="banner-desc">房源编号：ZF180915111</div>
        <div class="details-title">Jazz residence Towoerr HDHDowoowoo...</div>
        <div class="title-tags">
          <span>公寓</span>
          <a href="javascript:;" class="link">详细地址</a>
        </div>
        <!--new、 old-->
        <div v-if="propnew" class="main-info">
          <div class="item">
            <div class="txt-1"><span class="bold">100,000</span> P/㎡</div>
            <div class="label">均价</div>
          </div>
          <div class="item">
            <div class="txt-2">2018年8月10日</div>
            <div class="label">开盘时间</div>
          </div>
        </div>
        <div v-if="propsecond" class="main-info">
          <div class="item">
            <div class="txt-1"><span class="bold">660</span> 万</div>
            <div class="label">售价</div>
          </div>
          <div class="item">
            <div class="txt-1"><span class="bold">一室一厅</span> LOFT</div>
            <div class="label">户型</div>
          </div>
          <div class="item">
            <div class="txt-1"><span class="bold">30</span> ㎡</div>
            <div class="label">面积</div>
          </div>
        </div>
        <div v-if="propparking" class="main-info">
          <div class="item">
            <div class="txt-1"><span class="bold">6000</span> P/月</div>
            <div class="label">租金</div>
          </div>
          <div class="item">
            <div class="txt-2">10㎡</div>
            <div class="label">面积</div>
          </div>
        </div>

        <div class="details-module" v-if="propnew || propsecond">
          <div class="module-title">基本信息</div>
          <div class="info-line">
            <div class="cell">
              <div class="label">单价:</div>
              <div class="value">100,000P/㎡</div>
            </div>
            <div class="cell">
              <div class="label">发布时间:</div>
              <div class="value">2018/9/15</div>
            </div>
          </div>
          <div class="info-line">
            <div class="cell">
              <div class="label">用途:</div>
              <div class="value">住房</div>
            </div>
            <div class="cell">
              <div class="label">电梯:</div>
              <div class="value">有</div>
            </div>
          </div>
          <div class="info-line">
            <div class="cell">
              <div class="label">楼型:</div>
              <div class="value">塔楼</div>
            </div>
            <div class="cell">
              <div class="label">楼层:</div>
              <div class="value">11层 (底层)</div>
            </div>
          </div>
          <div class="info-line">
            <div class="cell">
              <div class="label">装修:</div>
              <div class="value">精装修</div>
            </div>
            <div class="cell">
              <div class="label">主卧朝向:</div>
              <div class="value">朝南</div>
            </div>
          </div>
          <div class="info-line">
            <div class="cell">
              <div class="label">阳台:</div>
              <div class="value">有阳台</div>
            </div>
            <div class="cell">
              <div class="label">宠物:</div>
              <div class="value">可养宠物</div>
            </div>
          </div>
          <div class="info-line">
            <div class="cell">
              <div class="label">车位:</div>
              <div class="value">有 (需另议)</div>
            </div>
            <div class="cell">
              <div class="label">权属:</div>
              <div class="value">商品房</div>
            </div>
          </div>
        </div>
        <div class="details-module" v-if="propparking">
          <div class="module-title">基本信息</div>
          <div class="info-line">
            <div class="cell">
              <div class="label">用途:</div>
              <div class="value">住房</div>
            </div>
            <div class="cell">
              <div class="label">发布时间:</div>
              <div class="value">2018/9/15</div>
            </div>
          </div>
          <div class="info-line">
            <div class="cell">
              <div class="label">租期:</div>
              <div class="value">12-24个月</div>
            </div>
            <div class="cell">
              <div class="label">发布时间:</div>
              <div class="value">2018/9/15</div>
            </div>
          </div>
          <div class="info-line">
            <div class="cell">
              <div class="label">电梯:</div>
              <div class="value">有</div>
            </div>
            <div class="cell">
              <div class="label">楼层:</div>
              <div class="value">11层 (底层)</div>
            </div>
          </div>
        </div>
        <!--new才有户型介绍-->
        <div class="details-module details-spe">
          <div class="module-title title-spe">户型介绍</div>


          <nest-scroll direction="horizontal" class="info-list">
            <div class="info-list-wrap">
              <div class="info-item">
                <div class="info-img"></div>
                <div class="info-text1">3室2厅2卫</div>
                <div class="info-text2">建面 91㎡ 朝向南</div>
                <div class="info-text3">约569万</div>
              </div>
              <div class="info-item">
                <div class="info-img "></div>
                <div class="info-text1 ">3室2厅2卫</div>
                <div class="info-text2 ">建面 91㎡ 朝向南</div>
                <div class="info-text3 ">约569万</div>
              </div>
              <div class="info-item">
                <div class="info-img "></div>
                <div class="info-text1 ">3室2厅2卫</div>
                <div class="info-text2 ">建面 91㎡ 朝向南</div>
                <div class="info-text3 ">约569万</div>
              </div>
            </div>
          </nest-scroll>

          <!--<div class="info-list">-->
          <!--<div class="info-item">-->
          <!--<div class="info-img"></div>-->
          <!--<div class="info-text1">3室2厅2卫</div>-->
          <!--<div class="info-text2">建面 91㎡ 朝向南</div>-->
          <!--<div class="info-text3">约569万</div>-->
          <!--</div>-->
          <!--<div class="info-item">-->
          <!--<div class="info-img"></div>-->
          <!--<div class="info-text1">3室2厅2卫</div>-->
          <!--<div class="info-text2">建面 91㎡ 朝向南</div>-->
          <!--<div class="info-text3">约569万</div>-->
          <!--</div>-->
          <!--</div>-->

        </div>
        <div class="details-module">
          <div class="module-title">介绍</div>
          <div class="publisher-introduce">
            <div class="portrait"></div>
            <div class="publisher-info">
              <div class="publisher-name">Govern</div>
              <div class="publisher-desc"><span class="type">经纪人</span><span>语言：汉语/英语/韩语/日语</span></div>
            </div>
            <div class="focus-btn">关注</div>
          </div>
          <div class="paragraph">
            位于普吉岛的长泰 (Choeng Thale) 地区，我们的四卧室豪华别墅距离该地区的所有主要海滩都很近，非常方便。该别墅提供多达 1100 平方米的巨大生活空间，有私人泳池，充满活力。
          </div>
          <div class="paragraph">
            这个位置非常出色，不用走太远就能到达普吉岛上一些最好的海滩。此外，您与普吉岛著名的夜生活，和岛上最好的一些餐馆只有步行的距离。来往的出租车很多，可以方便您在普吉岛周边观
          </div>
        </div>
        <div class="middle-banner"></div>
        <div class="others">
          <div class="details-module">
            <div class="module-title">周边楼盘</div>
          </div>

          <!--new second-->
          <nest-scroll direction="horizontal" v-if="propnew" class="similar">
            <div class="similar-wrap">
              <div class="item">
                <div class="item-img"></div>
                <div class="item-title">Callisto Towers at Circuit Makati</div>
                <div class="item-sub">Makati, 1207 Metro Manila</div>
                <div class="item-desc"><span class="tag-main">210,000 P/㎡</span><span class="tag-sub">28.00-100.55 ㎡</span>
                </div>
              </div>
              <div class="item">
                <div class="item-img"></div>
                <div class="item-title">Callisto Towers</div>
                <div class="item-sub">Makati, 1207 Metro Manila</div>
                <div class="item-desc"><span class="tag-main">210,000 P/㎡</span><span class="tag-sub">28.00-100.55 ㎡</span>
                </div>
              </div>
              <div class="item">
                <div class="item-img"></div>
                <div class="item-title">Callisto Towers at Circuit Makati</div>
                <div class="item-sub">Makati, 1207 Metro Manila</div>
                <div class="item-desc"><span class="tag-main">210,000 P/㎡</span><span class="tag-sub">28.00-100</span></div>
              </div>
            </div>
          </nest-scroll>
          <nest-scroll direction="horizontal" v-if="propsecond" class="similar">
            <div class="similar-wrap">
              <div class="item">
                <div class="item-img"></div>
                <div class="item-title">Callisto Towers at Circuit Makati</div>
                <div class="unit-size">
                  <div class="left">10F</div>
                  <div class="left">150.55㎡</div>
                </div>
                <div class="item-desc"><span class="tag-main">40万</span><span class="tag-sub">210,000 P/平</span></div>
              </div>
              <div class="item">
                <div class="item-img"></div>
                <div class="item-title">Callisto Towers at Circuit Makati</div>
                <div class="unit-size">
                  <div class="left">10F</div>
                  <div class="left">150.55㎡</div>
                </div>
                <div class="item-desc"><span class="tag-main">40万</span><span class="tag-sub">210,000 P/平</span></div>
              </div>
              <div class="item">
                <div class="item-img"></div>
                <div class="item-title">Callisto Towers at Circuit Makati</div>
                <div class="unit-size">
                  <div class="left">10F</div>
                  <div class="left">150.55㎡</div>
                </div>
                <div class="item-desc"><span class="tag-main">40万</span><span class="tag-sub">210,000 P/平</span></div>
              </div>
            </div>
          </nest-scroll>
        </div>
        <div class="publish">
          <div class="tips">我也要出售？</div>
          <a href="javascript:;" class="publish-btn">立即发布</a>
        </div>
      </div>
    </nest-scroll>
    <div class="control-bar">
      <div class="controls">
        <a href="javascript:;" class="favorite"></a>
        <a href="javascript:;" class="share"></a>
      </div>
      <a href="javascript:;" class="msg-btn">短信咨询</a>
      <a href="javascript:;" class="phone-btn">电话咨询</a>
    </div>
    <div class="foot-end" v-if="editShow">
      <div class="end-item">
        <img class="share-icon" src="../../assets/images/share.png" alt="">
      </div>
      <div class="end-item center">编辑</div>
      <div class="end-item last">删除</div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  // {routeType: "rent"} second new parking
  export default {
    props: {
      rent: {
        type: Boolean,
        default: false
      },
      second: {
        type: Boolean,
        default: false
      },
      new: {
        type: Boolean,
        default: true
      },
      parking: {
        type: Boolean,
        default: false
      },
      editShow:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        proprent: this.rent,
        propsecond: this.second,
        propnew: this.new,
        propparking: this.parking,
      }
    },
    methods: {
      initSwiper() {
        new BScroll(this.$refs.swiper1, {
          eventPassthrough: 'vertical',
          scrollX: true,
          click: true
        });
        new BScroll(this.$refs.swiper2, {
          eventPassthrough: 'vertical',
          scrollX: true,
          click: true
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .head-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 1.2rem;
      background: linear-gradient(to bottom, rgba(0, 0, 0, .24), rgba(0, 0, 0, 0));
    }
    .top-banner {
      height: 4.84rem;
      background-color: #c0c0c0;
    }
    .banner-desc {
      padding: 0 .28rem;
      line-height: 1;
      font-size: .24rem;
      color: #b3b3b3;
      text-align: right;
      margin-top: .1rem;
    }
    .details-title {
      padding: 0 .28rem;
      margin-top: .3rem;
      font-size: .4rem;
      line-height: .4rem;
      color: #333;
      word-break: break-all;
    }
    .title-tags {
      padding: 0 .28rem;
      margin-top: .15rem;
      display: flex;
      justify-content: space-between;
      font-size: .24rem;
      color: #999;
      line-height: 1;
      .link {
        color: #f99c91;
      }
    }
    .main-info {
      padding: 0 .28rem;
      margin-top: .6rem;
      display: flex;
      .item {
        padding-bottom: .4rem;
        flex: 1;
        text-align: center;
      }
      .bold {
        font-weight: bold;
      }
      .txt-1 {
        font-size: .32rem;
        color: #0F9183;
        line-height: .5rem;
      }
      .txt-2 {
        font-size: .28rem;
        color: #333;
        line-height: .5rem;
      }
      .label {
        margin-top: .1rem;
        color: #B3B3B3;
        font-size: .24rem;
        line-height: 1;
      }
    }
    .details-module {
      padding: 0 .28rem .6rem;
    }
    .module-title {
      position: relative;
      padding-top: .4rem;
      line-height: 1;
      color: #333;
      font-size: .32rem;
      font-weight: bold;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border-top: 1px solid #e6e6e6;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }
    }
    .info-line {
      margin-top: .35rem;
      display: flex;
      font-size: .28rem;
      line-height: 1;
      .cell {
        display: flex;
        flex: 1;
        color: #333;
      }
      .label {
        width: 1.3rem;
        color: #b2b2b2;
      }
      .value {
        flex: 1;
      }
    }
    .publisher-introduce {
      margin: .4rem 0 .26rem;
      display: flex;
      align-items: center;
      .portrait {
        margin-right: .2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #dfdfdf;
      }
      .publisher-info {
        flex: 1;
        .publisher-name {
          font-size: .32rem;
          color: #333;
          line-height: 1;
        }
        .publisher-desc {
          margin-top: .18rem;
          font-size: .24rem;
          color: #b3b3b3;
          line-height: 1;
          .type {
            margin-right: .35rem;
          }
        }
      }
      .focus-btn {
        position: relative;
        padding-left: .48rem;
        width: 1.2rem;
        height: .54rem;
        line-height: .5rem;
        border: .02rem solid #0f9183;
        border-radius: .1rem;
        font-size: .28rem;
        color: #0f9183;
        box-sizing: border-box;
        &::before {
          position: absolute;
          top: .13rem;
          left: .15rem;
          content: "";
          width: .24rem;
          height: .24rem;
          background: url('../../assets/images/icon-plus.png') no-repeat;
          background-size: 100% 100%;
        }
        &.disabled {
          padding-left: 0;
          text-align: center;
          color: #b2b2b2;
          border-color: #b2b2b2;
          &::before {
            display: none;
          }
        }
      }
    }
    .paragraph {
      font-size: .28rem;
      color: #333;
      line-height: .48rem;
    }
    .middle-banner {
      height: 4rem;
      background-color: #dcdcdc;
    }
    .others {
      position: relative;
      margin-top: .7rem;
      padding-bottom: .85rem;
    }
    .similar {
      display: flex;
      overflow: hidden;
      .similar-wrap {
        display: flex;
        padding: 0 .28rem;
      }
      .item {
        flex-shrink: 0;
        width: 3.6rem;
        margin-right: .6rem;
        .item-img {
          width: 100%;
          height: 2.56rem;
          border-radius: .1rem;
          background-color: #e8e8ea;
        }
        .item-title {
          margin-top: .2rem;
          font-size: .28rem;
          font-weight: bold;
          color: #333;
          line-height: .3rem;
          white-space: initial;
        }
        .unit-size {
          display: flex;
          margin-top: 0.15rem;
          margin-bottom: 0.15rem;
          .left {
            margin-right: 0.1rem;
            padding: 0.06rem 0.12rem;
            background: #fbf8f3;
            color: #d5be88;
            font-size: 0.24rem;
            border-radius: 0.1rem;
            line-height: 1;
          }
        }
        .item-sub {
          margin-top: .15rem;
          color: #999;
          font-size: .24rem;
        }
        .item-desc {
          margin-top: .15rem;
        }
        .tag-main {
          margin-right: .2rem;
          font-size: .28rem;
          color: #0f9183;
          font-weight: bold;
        }
        .tag-sub {
          font-size: .22rem;
          color: #b2b2b2;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .publish {
      padding-top: .7rem;
      height: 3.85rem;
      background-color: #f2f2f2;
      .tips {
        font-size: .32rem;
        color: #333;
        text-align: center;
        line-height: 1;
      }
      .publish-btn {
        display: block;
        margin: .6rem auto 0;
        width: 3rem;
        height: .8rem;
        line-height: .72rem;
        border: .04rem solid #0f9183;
        border-radius: .1rem;
        font-size: .28rem;
        color: #0f9183;
        text-align: center;
        box-sizing: border-box;
      }
    }
    .control-bar {
      display: flex;
      background-color: #fff;
      font-size: .28rem;
      text-align: center;
      .controls {
        flex: 1;
        font-size: 0;
        text-align: left;
        line-height: 1rem;
        .favorite {
          margin: 0 .6rem 0 .65rem;
          display: inline-block;
          vertical-align: middle;
          width: .42rem;
          height: .38rem;
          background: url("../../assets/images/favorite.png") no-repeat;
          background-size: 100% 100%;
        }
        .share {
          display: inline-block;
          vertical-align: middle;
          width: .38rem;
          height: .38rem;
          background: url("../../assets/images/share.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .msg-btn {
        display: block;
        width: 2.4rem;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        background-color: #f99c91;
      }
      .phone-btn {
        display: block;
        width: 2.4rem;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        background-color: #0F9183;
      }
    }
    .info-list {
      margin-top: 0.2rem;
      display: flex;
      overflow: hidden;
      .info-list-wrap {
        display: flex;
        padding: 0 .28rem;
      }
      .info-item {
        margin-right: 0.34rem;
        display: flex;
        flex-direction: column;
        &:last-child {
          margin-right: 0;
        }
      }
      .info-img {
        width: 3.3rem;
        height: 2.36rem;
        background: #e8e8ea;
        border-radius: 0.1rem;
      }
      .info-text1 {
        margin: 0.1rem 0rem;
        font-size: 0.28rem;
        color: #333333;
        font-weight: bold;
      }
      .info-text2 {
        margin-bottom: 0.1rem;
        font-size: 0.24rem;
        color: #b2b2b2;
      }
      .info-text3 {
        font-size: 0.28rem;
        color: #0F9183;
        font-weight: bold;
      }
    }
    .details-spe {
      padding: 0rem 0rem 0.6rem 0rem;
      .title-spe {
        margin-left: 0.28rem;
      }
    }
    .foot-end{
      position: fixed;
      left: 0rem;
      right: 0rem;
      bottom: 0rem;
      display: flex;
      z-index: 2;
      .end-item{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 1rem;
        background: #fff;
        .share-icon{
          width: 0.38rem;
          height: 0.38rem;
        }
      }
      .center{
        font-size: 0.28rem;
        color: #fff;
        background: #0F9183;
      }
      .last{
        font-size: 0.28rem;
        color: #fff;
        background: #F54545;
      }
    }
  }
</style>
