<template>
  <div class="lease-list">
    <div class="nest-header">
      <div class="search-wrap">
        <div class="back" @click="$router.go(-1);"></div>
        <div class="search-box">
          <div class="input" @click="$router.push({ name: 'Search' })"></div>
        </div>
        <div class="location">马尼拉</div>
      </div>
      <div class="control-wrap">
        <nest-button class="mr28" @click="locationShow = !locationShow">地点</nest-button>
        <nest-button class="mr28" @click="roomTypeShow = !roomTypeShow" v-if="listType !== 'carport' || listType !== 'land'">户型</nest-button>
        <nest-button class="mr28" @click="conditionShow = !conditionShow">筛选</nest-button>
        <div class="sort-btn" @click="sortShow = !sortShow"></div>
      </div>
      <!--@modalConfirm="locationConfirm" @modalClear="locationClear"-->
      <nest-modal title="地点" modal-confirm-txt="确定" @close="locationShow = false" :status="locationShow">
        <nest-check v-model="locationVal" :options="locationOpts"></nest-check>
      </nest-modal>
      <!--@modalConfirm="typeConfirm" @modalClear="typeClear"-->
      <nest-modal title="户型" modal-confirm-txt="立即发现惊喜房源" @close="roomTypeShow = false" :status="roomTypeShow" v-if="listType !== 'carport' || listType !== 'land'">
        <nest-check v-model="roomTypeVal" :options="roomTypeOpts"></nest-check>
      </nest-modal>
      <nest-modal :is-full="true" :has-cancel="true" modal-cancel-txt="清空条件" @close="conditionShow = false"
                  :status="conditionShow">
        <div class="conditions">
          <div class="condition">
            <div class="condition-title">租金</div>
            <nest-radio v-model="rentalVal" :options="rentalOpts" size="small"></nest-radio>
            <nest-range class="range-container" v-model="rangeVal" :max="125000" :step="5000"></nest-range>
          </div>
          <div class="condition">
            <div class="condition-title">房型</div>
            <nest-radio v-model="houseTypeVal" :options="houseTypeOpts" size="small" :count-in-row="4"></nest-radio>
          </div>
          <div class="condition">
            <div class="condition-title">用途</div>
            <nest-radio v-model="purposeVal" :options="purposeOpts" size="small" :count-in-row="3"></nest-radio>
          </div>
          <div class="condition">
            <div class="condition-title">方式</div>
            <nest-radio v-model="rentWayVal" :options="rentWayOpts" size="small"></nest-radio>
          </div>
          <div class="condition">
            <div class="condition-title">付款</div>
            <nest-radio v-model="payWayVal" :options="payWayOpts" size="small" :count-in-row="3"></nest-radio>
          </div>
          <div class="condition">
            <div class="condition-title">设施</div>
            <nest-radio v-model="deviceVal" :options="deviceOpts" size="small" :count-in-row="3"></nest-radio>
          </div>
          <div class="condition">
            <div class="condition-title">车位</div>
            <nest-radio v-model="parkingVal" :options="parkingOpts" size="small"></nest-radio>
          </div>
        </div>
      </nest-modal>
      <nest-modal title="排序" :has-clear="false" :has-footer="false" @close="sortShow = false" :status="sortShow">
        <nest-radio v-model="sortVal" :count-in-row="1" :options="sortOpts"></nest-radio>
      </nest-modal>
    </div>
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
  import DICT from '../../configs/DICT';

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
      return {
        listType: '',
        locationShow: false,
        roomTypeShow: false,
        conditionShow: false,
        sortShow: false,
        locationVal: [],
        locationOpts: DICT.region,
        roomTypeVal: [],
        roomTypeOpts: ['一居室', '二居室', '三居室', '其他'],
        sortVal: '默认排序',
        sortOpts: ['默认排序', '均价由低到高', '均价由高到低', '开盘时间顺序', '开盘时间倒序'],
        rentalVal: '',
        rentalOpts: ['15000-30000', '30000-40000', '40000-50000', '50000以上'],
        rangeVal: [0, 100000],
        houseTypeVal: '',
        houseTypeOpts: ['公寓', '别墅', '居民', '车位'],
        purposeVal: '',
        purposeOpts: ['住房', '商业办公', '商住两用'],
        rentWayVal: '',
        rentWayOpts: ['整租', '合租'],
        payWayVal: '',
        payWayOpts: ['押二付一', '押一付二', '其他'],
        deviceVal: '',
        deviceOpts: ['阳台', '花园', '静音空调', '冰箱', '洗衣机', '热水器'],
        parkingVal: '',
        parkingOpts: ['带车位', '不带车位'],
        keyValue:''
      }
    },
    created() {
      let params = this.$route.params;
      if (params) {
        this.listType = params.type;
      }
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
    .nest-header {
      padding: 0 .28rem .2rem;
      .search-wrap {
        display: flex;
        align-items: center;
      }
      .back {
        width: .9rem;
        height: .8rem;
        background: url('../../assets/images/return-icon.png') no-repeat left center;
        background-size: .42rem .32rem;
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
          background: url('../../assets/images/search-img.png') no-repeat;
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
          background: url('../../assets/images/position.png') no-repeat;
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
      .sort-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.5rem;
        height: .6rem;
        background: url('../../assets/images/sort.png') no-repeat center center;
        background-size: .36rem .32rem;
      }
      .conditions {
        padding: .6rem .28rem 0;
      }
      .condition {
        margin-bottom: .6rem;
      }
      .condition-title {
        margin-bottom: .27rem;
        font-size: .32rem;
        color: #333;
        line-height: 1;
      }
      .range-container {
        padding: 0 .3rem;
      }
    }
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
