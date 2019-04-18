<template>
  <div class="explore">
    <div class="nest-header">
      <div class="search-wrap">
        <div class="search-box">
          <div class="input-wrap" @click="$router.push({ name: 'HouseSearch' })"></div>
          <nest-select v-model="selectType" :options="DICT.filters.select"/>
        </div>
        <div class="location">马尼拉</div>
      </div>
      <div class="control-wrap">
        <nest-button :type="regionBtn" class="mr28" @click="regionShow = !regionShow">{{ regionBtnTxt }}</nest-button>
        <nest-button :type="bedroomBtn" class="mr28" @click="bedroomShow = !bedroomShow">{{ bedroomBtnTxt }}
        </nest-button>
      </div>
      <nest-modal title="地点" modal-confirm-txt="确定" :status="regionShow"
                  @close="regionShow = false" @confirm="regionShow = false" @clear="region = []">
        <nest-check v-model="region" :options="DICT.region"></nest-check>
      </nest-modal>
      <nest-modal title="户型" modal-confirm-txt="确定" :status="bedroomShow"
                  @close="bedroomShow = false" @confirm="bedroomShow = false" @clear="bedroom = []">
        <nest-check v-model="bedroom" :options="DICT.filters.bedroom"></nest-check>
      </nest-modal>
    </div>
    <nest-scroll class="app-body" ref="bodyScroll" :listen-scroll="true" @scroll="bodyScroll" :probe-type="2">
      <div class="explore-body">
        <nest-scroll direction="horizontal" class="menus">
          <div class="menus-wrap">
            <div class="menu-item" @click="tradeShow = true">
              <div class="menu-icon icon1"></div>
              <div class="name">发布房源</div>
            </div>
            <div class="menu-item" @click="$router.push({ name: 'HouseList', params: { type: 'rent' } })">
              <div class="menu-icon icon2"></div>
              <div class="name">租房</div>
            </div>
            <div class="menu-item" @click="$router.push({ name: 'HouseList', params: { type: 'second' } })">
              <div class="menu-icon icon3"></div>
              <div class="name">二手房</div>
            </div>
            <div class="menu-item" @click="$router.push({ name: 'HouseList', params: { type: 'new' } })">
              <div class="menu-icon icon4"></div>
              <div class="name">新房</div>
            </div>
            <div class="menu-item" @click="$router.push({ name: 'HouseList', params: { type: 'carport' } })">
              <div class="menu-icon icon5"></div>
              <div class="name">车位</div>
            </div>
            <div class="menu-item" @click="$router.push({ name: 'HouseList', params: { type: 'land' } })">
              <div class="menu-icon icon6"></div>
              <div class="name">土地</div>
            </div>
          </div>
        </nest-scroll>
        <nest-scroll direction="horizontal" class="topics">
          <div class="topics-wrap">
            <a :href="item.url" v-for="(item, index) in topAdvertisements">
              <div class="topic" :style="{ backgroundImage: 'url(' + item.cover + ')' }">
                <div class="title">{{item.title}}</div>
                <div class="msg">{{item.content}}</div>
              </div>
            </a>
          </div>
        </nest-scroll>
        <nest-scroll direction="horizontal" class="topics budget">
          <div class="topics-wrap">
            <a :href="item.url" v-for="(item, index) in middleAdvertisements">
              <div class="topic" :style="{ backgroundImage: 'url(' + item.cover + ')' }">
                <div class="title">{{item.title}}</div>
                <div class="msg">{{item.content}}</div>
              </div>
            </a>
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
        <nest-tab-container class="app-body" v-model="tabSelected">
          <nest-tab-container-item class="container-item list-wrap" id="rent">
            <div class="unit" v-for="(house, index) in rentList"
                 @click="$router.push({ name: 'HouseDetails', params: { id: house.id } })">
              <div class="unit-img" :style="{ backgroundImage: 'url(' + imageUrl(house) + ')' }"></div>
              <div class="unit-place">{{house.building_name}}</div>
              <div class="unit-size" v-if="typeof house.tags === 'object'">
                <div class="left" v-for="(tag,index) in house.tags" :key="index">{{tag}}</div>
              </div>
              <div class="unit-size" v-else="typeof house.tags !== 'object'">
                <div class="left-str">{{house.tags}}</div>
              </div>
              <div class="price-m" v-if="house.trade == 'rent'">
                <div class="num">{{house.price}}</div>
                <div class="month">P/月</div>
              </div>
              <div class="price-m" v-if="house.trade == 'sale' && house.is_new">
                <div class="num">{{house.price}}</div>
                <div class="month">P/㎡</div>
                <div class="size">{{house.centiare_min}}-{{house.centiare_max}} ㎡</div>
              </div>
              <div class="price-m" v-if="house.trade == 'sale' && !house.is_new">
                <div class="num">{{house.total_amount}}</div>
                <div class="month">万</div>
                <div class="size">{{house.price}} P/平</div>
              </div>
            </div>
          </nest-tab-container-item>
          <nest-tab-container-item class="container-item list-wrap" id="sale">
            <div class="unit" v-for="(house, index) in saleList"
                 @click="$router.push({ name: 'HouseDetails', params: { id: house.id } })">
              <div class="unit-img" :style="{ backgroundImage: 'url(' + imageUrl(house) + ')' }"></div>
              <div class="unit-place">{{house.building_name}}</div>
              <div class="unit-size" v-if="typeof house.tags === 'object'">
                <div class="left" v-for="(tag,index) in house.tags" :key="index">{{tag}}</div>
              </div>
              <div class="unit-size" v-else="typeof house.tags !== 'object'">
                <div class="left-str">{{house.tags}}</div>
              </div>
              <div class="price-m" v-if="house.trade == 'rent'">
                <div class="num">{{house.price}}</div>
                <div class="month">P/月</div>
              </div>
              <div class="price-m" v-if="house.trade == 'sale' && house.is_new">
                <div class="num">{{house.price}}</div>
                <div class="month">P/㎡</div>
                <div class="size">{{house.centiare_min}}-{{house.centiare_max}} ㎡</div>
              </div>
              <div class="price-m" v-if="house.trade == 'sale' && !house.is_new">
                <div class="num">{{house.total_amount}}</div>
                <div class="month">万</div>
                <div class="size">{{house.price}} P/平</div>
              </div>
            </div>
          </nest-tab-container-item>
        </nest-tab-container>
      </div>
    </nest-scroll>
    <div class="return-top" @click="returnTop" v-show="returnTopShow">^</div>
    <nest-modal title="类型" :has-clear="false" :has-footer="false" @close="tradeShow = false" :status="tradeShow">
      <nest-radio v-model="trade" :options="DICT.house.trade" :count-in-row="1"></nest-radio>
    </nest-modal>
    <nest-nav page="explore"></nest-nav>
  </div>
</template>
<script>
  import DICT, {getSelecteds} from '../configs/DICT';
  import AdvertisementService from '../services/AdvertisementService';
  import HouseService from '../services/HouseService';
  import PreviewDefaultImg from '../assets/images/preview-default.png';
  import Storage from "../utils/Storage";

  export default {
    name: 'Explore',
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
        topAdvertisements: [],
        middleAdvertisements: [],
        rentList: [],
        saleList: [],
        returnTopShow: false
      }
    },
    watch: {
      trade(val) {
        this.tradeShow = false;
        setTimeout(() => {
          this.$router.push({name: 'HousePublish', params: {trade: val, id: 'new'}});
        }, 500);
      },
      selectType(val) {
        Storage.setLocalStorage('nest_search_conditions_pagetype', val);
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
        Storage.setLocalStorage('nest_search_conditions_region', JSON.stringify(val));
      },
      bedroom(val) {
        if (val.length === 0) {
          this.bedroomBtn = 'default';
          this.bedroomBtnTxt = '户型';
        } else {
          this.bedroomBtn = 'primary';
          if (val.length === 1) {
            this.bedroomBtnTxt = getSelecteds(DICT.filters.bedroom, val[0])[0].label;
          } else {
            this.bedroomBtnTxt = '户型(' + val.length + ')';
          }
        }
        Storage.setLocalStorage('nest_search_conditions_region', JSON.stringify(val));
      }
    },
    created() {
      this.initOpts();
    },
    mounted() {
      this.getRecommends();
      this.getTopAdvertisements();
      this.getMiddleAdvertisements();
    },
    methods: {
      initOpts() {
        this.DICT = DICT;
        let regionStr = Storage.getLocalStorage('nest_search_conditions_region');
        this.region = regionStr ? JSON.parse(regionStr) : [];
        let bedroomStr = Storage.getLocalStorage('nest_search_conditions_bedroom');
        this.bedroom = bedroomStr ? JSON.parse(bedroomStr) : [];
        this.selectType = Storage.getLocalStorage('nest_search_conditions_pagetype');
      },
      imageUrl(item) {
        return item.cover ? item.cover : PreviewDefaultImg;
      },
      getTopAdvertisements() {
        AdvertisementService.getItemsList(1, res => {
          this.topAdvertisements = res.data;
        });
      },
      getMiddleAdvertisements() {
        AdvertisementService.getItemsList(2, res => {
          this.middleAdvertisements = res.data;
        });
      },
      getRecommends() {
        HouseService.getRecommendHouses({
          trade: 'rent'
        }, res => {
          this.rentList = res.data;
        });
        HouseService.getRecommendHouses({
          trade: 'sale'
        }, res => {
          this.saleList = res.data;
        });
      },
      returnTop() {
        this.$refs.bodyScroll.scrollTo(0, 0, 300);
        this.returnTopShow = false;
      },
      bodyScroll(obj) {
        this.returnTopShow = obj.y < -500;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
        box-shadow: 0 0 0.2rem rgba(176, 183, 187, 0.4);
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
        .input-wrap {
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
      display: flex;
      overflow: hidden;
    }
    .menus-wrap {
      display: flex;
      padding: 0 .28rem;
      .menu-item {
        margin-right: .3rem;
        .menu-icon {
          margin: 0 auto;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background: #e8e8ea no-repeat;
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
          &.icon6 {
            background-image: url('../assets/images/explore/land.png');
          }
        }
        .name {
          margin-top: .25rem;
          font-size: 0.28rem;
          color: #333;
          text-align: center;
          white-space: nowrap;
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
        border-radius: 0.1rem;
        background: #f5f5f7 no-repeat bottom right;
        background-size: 100% 100%;
        &:first-child {
          margin-left: 0;
        }
        .title {
          padding: .2rem 0 0 .2rem;
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
      align-items: center;
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
          margin-right: 0;
        }
      }
      .unit-img {
        width: 3.3rem;
        height: 2.36rem;
        border-radius: 0.1rem;
        background: #e8e8ea center center no-repeat;
        background-size: cover;
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
    .return-top {
      position: fixed;
      right: .6rem;
      bottom: 1.5rem;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background-color: #fff;
      font-size: .6rem;
      border-radius: 1rem;
      box-shadow: 0 0 .18rem 0 rgba(176, 183, 187, .6);
    }
  }
</style>
