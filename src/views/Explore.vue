<template>
  <div class="explore">
    <div class="nest-header">
      <div class="search-wrap">
        <div class="search-box">
          <div class="input" @click="$router.push({ name: 'Search', params: { type: 'explore' } })"></div>
          <nest-select v-model="selectType" :options="DICT.filters.select"/>
        </div>
        <div class="location">马尼拉</div>
      </div>
      <div class="control-wrap">
        <nest-button :type="regionBtn" class="mr28" @click="regionShow = !regionShow">{{ regionBtnTxt }}</nest-button>
        <nest-button :type="bedroomBtn" class="mr28" @click="bedroomShow = !bedroomShow">{{ bedroomBtnTxt }}</nest-button>
      </div>
      <nest-modal title="地点" modal-confirm-txt="确定" :status="regionShow"
                  @close="regionShow = false" @confirm="regionConfirm" @clear="region = []">
        <nest-check v-model="region" :options="DICT.region"></nest-check>
      </nest-modal>
      <nest-modal title="户型" modal-confirm-txt="立即发现惊喜房源" :status="bedroomShow"
                  @close="bedroomShow = false" @confirm="bedroomConfirm" @clear="bedroom = []">
        <nest-check v-model="bedroom" :options="DICT.filters.bedroom"></nest-check>
      </nest-modal>
    </div>
    <nest-scroll class="app-body">
      <div class="explore-body">
        <div class="menus">
          <div class="menu-item" @click="tradeShow = true">
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
          <div class="menu-item" @click="$router.push({ name: 'ExploreList', params: { type: 'carport' } })">
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
              <nest-tab-item id="sale">售卖</nest-tab-item>
            </nest-tab-bar>
          </div>
        </div>
        <div class="list-wrap">
          <div class="unit" v-for="(recommend,index) in recommends">
            <div class="unit-img"></div>
            <div class="unit-place">{{recommend.roomplace}}</div>
            <div class="unit-size" v-if="recommend.roomsizes.constructor === Array">
              <div class="left" v-for="(roomsize,index) in recommend.roomsizes" :key="index">{{roomsize}}</div>
            </div>
            <div class="unit-size" v-else="!recommend.roomsizes.constructor === Array">
              <div class="left-str">{{recommend.roomsizes}}</div>
            </div>
            <div class="price-m" v-if="proprent">
              <div class="num">{{recommend.pricem}}</div>
              <div class="month">P/月</div>
            </div>
            <div class="price-m" v-if="propnew">
              <div class="num">{{recommend.pricem}}</div>
              <div class="month">P/㎡</div>
              <div class="size">28.00-100.55 ㎡</div>
            </div>
            <div class="price-m" v-if="propsecond">
              <div class="num">{{recommend.pricem}}</div>
              <div class="month">万</div>
              <div class="size">210,000 P/平</div>
            </div>
          </div>
        </div>
      </div>
    </nest-scroll>
    <nest-modal title="类型" :has-clear="false" :has-footer="false" @close="tradeShow = false" :status="tradeShow">
      <nest-radio v-model="trade" :options="DICT.house.trade" :count-in-row="1"></nest-radio>
    </nest-modal>
    <nest-nav page="explore"></nest-nav>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from '../configs/DICT';

  export default {
    data() {
      return {
        selectType: '',
        regionShow: false,
        regionBtn: 'default',
        regionBtnTxt: '地点',
        region: [],
        bedroomBtn: 'default',
        bedroomBtnTxt: '户型',
        bedroomShow: false,
        bedroom: [],
        tradeShow: false,
        trade: '',
        tabSelected: 'rent',
        proprent: true,
        propsecond: false,
        propnew: false,
        propparking: false,
        recommends: [
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
        ]
      }
    },
    watch: {
      trade(val) {
        this.tradeShow = false;
        setTimeout(() => {
          this.$router.push({name: 'ExplorePublish', params: {type: val}});
        }, 500);
      },
      region(val) {
        if (val.length === 0) {
          this.regionBtn = 'default';
          this.regionBtnTxt = '地点';
        } else {
          this.regionBtn = 'primary';
          if (val.length === 1) {
            let label = getSelecteds(DICT.region, val[0])[0].label;
            this.regionBtnTxt = label.split('(')[0];
          } else {
            this.regionBtnTxt = '地点(' + val.length + ')';
          }
        }
      },
      bedroom(val) {
        if (val.length === 0) {
          this.bedroomBtn = 'default';
          this.bedroomBtnTxt = '户型';
        } else {
          this.bedroomBtn = 'primary';
          if (val.length === 1) {
            let label = getSelecteds(DICT.filters.bedroom, val[0])[0].label;
            this.bedroomBtnTxt = label;
          } else {
            this.bedroomBtnTxt = '户型(' + val.length + ')';
          }
        }
      }
    },
    created() {
      this.initOpts();
    },
    methods: {
      initOpts() {
        this.DICT = DICT;
      },
      regionConfirm() {
        this.regionShow = false;
        // todo 筛选发请求
      },
      bedroomConfirm() {
        this.bedroomShow = false;
        // todo 筛选发请求
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
    .nest-header {
      padding: 0 .28rem .2rem;
      .search-wrap {
        display: flex;
        align-items: center;
      }
      .search-box {
        position: relative;
        display: flex;
        flex: 1;
        height: .8rem;
        border: 1px solid #e8e8ea;
        border-radius: 0.1rem;
        box-shadow: 0px 0px 0.2rem rgba(176, 183, 187, 0.4);
        box-sizing: border-box;
        z-index: 1;
        &::before {
          position: absolute;
          content: "";
          top: .24rem;
          left: .24rem;
          width: .32rem;
          height: .32rem;
          background: url('../assets/images/search-img.png') no-repeat;
          background-size: 100% 100%;
        }
        &:active {
          &::after {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #e8e8ea;
            z-index: -1;
          }
        }
        .input {
          width: 3.65rem;
        }
      }
      .location {
        position: relative;
        padding-left: .88rem;
        width: 1.88rem;
        height: .8rem;
        line-height: .8rem;
        font-size: .28rem;
        color: #333;
        box-sizing: border-box;
        &::before {
          position: absolute;
          content: "";
          left: .48rem;
          top: .22rem;
          width: .26rem;
          height: .35rem;
          background: url('../assets/images/position.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .control-wrap {
        position: relative;
        margin-top: .28rem;
        display: flex;
      }
      .mr28 {
        margin-right: .28rem;
      }
    }

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
    .list-wrap {
      margin-left: 0.28rem;
      display: flex;
      flex-wrap: wrap;
      .unit {
        margin-right: 0.34rem;
        margin-bottom: 0.45rem;
        display: flex;
        flex-direction: column;
        width: 3.3rem;
        &:nth-of-type(even) {
          margin-right: 0rem;
        }
      }
      .unit-img {
        width: 3.3rem;
        height: 2.36rem;
        border-radius: 0.1rem;
        background-color: #e8e8ea;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .unit-place {
        word-break: break-all;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        height: .64rem;
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
      .unit-size {
        display: flex;
        margin-bottom: 0.2rem;
        .left {
          margin-right: 0.1rem;
          padding: 0.06rem 0.12rem;
          background: #fbf8f3;
          color: #d5be88;
          font-size: 0.24rem;
          border-radius: 0.1rem;
          line-height: 1;
        }
        .left-str {
          color: #808080;
          font-size: 0.24rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      }
      .price-m {
        display: flex;
        align-items: flex-end;
        font-size: 0.28rem;
        color: #0f9183;
        .num {
          font-weight: bold;
        }
        .month {
          margin-left: 0.1rem;
          margin-right: 0.1rem;
          font-size: 0.24rem;
        }
        .size {
          font-size: 0.22rem;
          color: #B2B2B2;
        }
      }
    }
  }
</style>
