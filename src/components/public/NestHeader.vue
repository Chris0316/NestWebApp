<template>
  <div class="nest-header">
    <div class="search-wrap">
      <div class="back" v-if="headerType !== 'explore'" @click="$router.go(-1);"></div>
      <div class="search-box" @click="$router.push({ name: 'Search' })">
        <div class="input"></div>
        <nest-select v-model="searchType"/>
      </div>
      <div class="location">马尼拉</div>
    </div>
    <div class="control-wrap">
      <nest-button class="mr28" @click="locationShow = !locationShow">地点</nest-button>
      <nest-button class="mr28" @click="roomTypeShow = !roomTypeShow" v-if="headerType !== 'parking'">户型</nest-button>
      <nest-button class="mr28" @click="conditionShow = !conditionShow" v-if="headerType !== 'explore'">筛选</nest-button>
      <div class="sort-btn" @click="sortShow = !sortShow" v-if="headerType !== 'explore'"></div>
    </div>
    <!--@modalConfirm="locationConfirm" @modalClear="locationClear"-->
    <nest-modal title="地点" modal-confirm-txt="确定" @close="locationShow = false" :status="locationShow">
      <nest-check v-model="locationVal" :options="locationOpts"></nest-check>
    </nest-modal>
    <!--@modalConfirm="typeConfirm" @modalClear="typeClear"-->
    <nest-modal title="户型" modal-confirm-txt="立即发现惊喜房源" @close="roomTypeShow = false" :status="roomTypeShow">
      <nest-check v-model="roomTypeVal" :options="roomTypeOpts"></nest-check>
    </nest-modal>
    <nest-modal :is-full="true" :has-cancel="true" modal-cancel-txt="清空条件" @close="conditionShow = false"
                :status="conditionShow" v-if="headerType !== 'explore'">
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
    <nest-modal title="排序" :has-clear="false" :has-footer="false" @close="sortShow = false" :status="sortShow"
                v-if="headerType !== 'explore'">
      <nest-radio v-model="sortVal" :count-in-row="1" :options="sortOpts"></nest-radio>
    </nest-modal>
  </div>
</template>

<script>
  export default {
    name: "nest-header",
    props: {
      headerType: String
    },
    data() {
      return {
        searchType: '',
        locationShow: false,
        roomTypeShow: false,
        conditionShow: false,
        sortShow: false,
        locationVal: [],
        locationOpts: ['马卡提(Makati)', '帕赛(Pasay)', '马尼拉市(City of Manila)', '曼达卢永(Mandaluyong)', '奎松(Quezon)', 'BGC(BGC, Taguig)', '帕西市(Pasig)'],
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
    watch: {
      searchType(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
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
</style>
