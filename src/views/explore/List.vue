<template>
  <div class="lease-list">
    <nest-header :header-type="$route.params.type || 'all'"></nest-header>
    <nest-scroll class="app-body">
      <div class="list-top">
        <nest-swipe-cell v-for="(recommend,index) in recommends" :key="index">
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
          <div class="collect" slot="controls">
            <div class="heart"></div>
            <div class="share"></div>
          </div>
        </nest-swipe-cell>
      </div>
    </nest-scroll>
  </div>
</template>

<script>
  export default {
    props: {
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
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .lease-list {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding-top: 0.2rem;
    background-color: #fff;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .list-top {
      padding-top: 0.5rem;
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
  }
</style>
