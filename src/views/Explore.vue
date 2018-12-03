<template>
  <div class="explore">
    <nest-header header-type="explore"></nest-header>
    <nest-scroll class="app-body">
      <div class="explore-body">
        <div class="menus">
          <div class="menu-item" @click="$router.push({ name: 'ExplorePublish' })">
            <div class="menu-icon icon1"></div>
            <div class="name">发布房源</div>
          </div>
          <div class="menu-item" @click="$router.push({ name: 'ExploreList', params: { type: 'rent' } })">
            <div class="menu-icon icon2"></div>
            <div class="name">租房</div>
          </div>
          <div class="menu-item" @click="$router.push({ name: 'ExploreList', params: { type: 'second' } })">
            <div class="menu-icon icon3"></div>
            <div class="name">二手房</div>
          </div>
          <div class="menu-item" @click="$router.push({ name: 'ExploreList', params: { type: 'new' } })">
            <div class="menu-icon icon4"></div>
            <div class="name">新房</div>
          </div>
          <div class="menu-item" @click="$router.push({ name: 'ExploreList', params: { type: 'parking' } })">
            <div class="menu-icon icon5"></div>
            <div class="name">车位</div>
          </div>
        </div>
        <nest-scroll direction="horizontal" class="topics">
          <div class="topics-wrap">
            <div class="topic icon1">
              <div class="title">温馨一居室</div>
              <div class="msg">属于你的独享空间</div>
            </div>
            <div class="topic icon2">
              <div class="title">温馨一居室</div>
              <div class="msg">属于你的独享空间</div>
            </div>
            <div class="topic icon3">
              <div class="title">温馨一居室</div>
              <div class="msg">属于你的独享空间</div>
            </div>
          </div>
        </nest-scroll>
        <nest-scroll direction="horizontal" class="topics budget">
          <div class="topics-wrap">
            <div class="topic icon4">
              <div class="title">500万预算</div>
              <div class="msg">小资一族上车</div>
            </div>
            <div class="topic icon5">
              <div class="title">500万预算</div>
              <div class="msg">小资一族上车</div>
            </div>
            <div class="topic icon6">
              <div class="title">500万预算</div>
              <div class="msg">小资一族上车</div>
            </div>
          </div>
        </nest-scroll>
        <div class="recommend">
          <div class="left">为你推荐</div>
          <div class="right">
            <nest-tab-bar class="tabs" v-model="tabSelected" align="right">
              <nest-tab-item id="rent">出租</nest-tab-item>
              <nest-tab-item id="sell">出售</nest-tab-item>
            </nest-tab-bar>
          </div>
        </div>
        <nest-list-view double/>
      </div>
    </nest-scroll>
    <nest-nav page="explore"></nest-nav>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        tabSelected: 'rent'
      }
    },
    methods: {
      leaseChange(i) {
        this.curindex = i;
      },
      initSwiper() {
        new BScroll(this.$refs.swiper2, {
          eventPassthrough: 'vertical',
          scrollX: true,
          click: true
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  @mixin rowcenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .explore {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0.2rem 0 0;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .explore-body {
      padding-top: .5rem;
    }
    .menus {
      margin-left: 0.28rem;
      padding-right: 0.28rem;
      display: flex;
      justify-content: space-between;
      .menu-item {
        @include rowcenter;
        flex-direction: column;
        .menu-icon {
          margin-bottom: 0.25rem;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background-color: #e8e8ea;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.icon1 {
            background-image: url('../assets/images/explore/publish.png');
          }
          &.icon2 {
            background-image: url('../assets/images/explore/rent.png');
          }
          &.icon3 {
            background-image: url('../assets/images/explore/second.png');
          }
          &.icon4 {
            background-image: url('../assets/images/explore/new.png');
          }
          &.icon5 {
            background-image: url('../assets/images/explore/parking.png');
          }
        }
        .name {
          font-size: 0.28rem;
          color: #333333;
        }
      }
    }
    .topics {
      margin-top: 1rem;
      display: flex;
      overflow: hidden;
      .topics-wrap {
        display: flex;
        padding: 0 .28rem;
      }
      .topic {
        flex-shrink: 0;
        margin-right: 0.1rem;
        width: 2.8rem;
        height: 2rem;
        background-color: #f5f5f7;
        border-radius: 0.1rem;
        background-repeat: no-repeat;
        background-position: bottom right;
        &:first-child {
          margin-left: 0;
        }
        &.icon1 {
          background-image: url('../assets/images/explore/icon1.png');
          background-size: 1.09rem 1.01rem;
        }
        &.icon2 {
          background-image: url('../assets/images/explore/icon2.png');
          background-size: 1.05rem .98rem;
        }
        &.icon3 {
          background-image: url('../assets/images/explore/icon3.png');
          background-size: .99rem .9rem;
        }
        &.icon4 {
          background-image: url('../assets/images/explore/icon4.png');
          background-size: .83rem 1.6rem;
        }
        &.icon5 {
          background-image: url('../assets/images/explore/icon5.png');
          background-size: 1.16rem 1.65rem;
        }
        &.icon6 {
          background-image: url('../assets/images/explore/icon6.png');
          background-size: 2.21rem 1.1rem;
        }
        .title {
          margin-top: 0.2rem;
          margin-left: 0.2rem;
          font-size: 0.3rem;
          color: #333333;
        }
        .msg {
          margin-left: 0.2rem;
          margin-top: 0.1rem;
          font-size: 0.24rem;
          color: #b2b2b2;
          font-weight: lighter;
        }
      }
    }
    .budget {
      margin-top: 0.7rem;
    }
    .recommend {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .left {
        margin-left: 0.28rem;
        font-size: 0.46rem;
        color: #333333;
        font-weight: bold;
      }
      .right {
        display: flex;
        font-size: 0.28rem;
        color: #999999;
        .tabs {
          padding-right: .28rem;
        }
        .on {
          color: #0f9183;
          border-bottom: 0.04rem solid #0f9183;
        }
      }
    }
  }
</style>
