<template>
  <div class="lease-list">
    <div class="nest-header">
      <div class="search-wrap">
        <div class="back" @click="$router.go(-1)"></div>
        <div class="search-box">
          <div class="input" @click="$router.push({ name: 'Search', params: { type: 'list'}})"></div>
        </div>
        <div class="location">马尼拉</div>
      </div>
      <div class="control-wrap">
        <nest-button :type="regionBtn" class="mr28" @click="regionShow = !regionShow">{{ regionBtnTxt }}</nest-button>
        <nest-button :type="bedroomBtn" class="mr28" @click="bedroomShow = !bedroomShow"
                     v-if="listType !== 'carport' || listType !== 'land'">{{ bedroomBtnTxt }}
        </nest-button>
        <nest-button class="mr28" @click="filtersShow = !filtersShow">筛选</nest-button>
        <div class="sort-btn" @click="sortShow = !sortShow"></div>
      </div>
      <nest-modal title="地点" modal-confirm-txt="确定" :status="regionShow"
                  @close="regionShow = false" @confirm="regionConfirm" @clear="region = []">
        <nest-check v-model="region" :options="DICT.region"></nest-check>
      </nest-modal>
      <nest-modal title="户型" modal-confirm-txt="立即发现惊喜房源" :status="bedroomShow"
                  v-if="listType !== 'carport' || listType !== 'land'"
                  @close="bedroomShow = false" @confirm="bedroomConfirm" @clear="bedroom = []">
        <nest-check v-model="bedroom" :options="DICT.filters.bedroom"></nest-check>
      </nest-modal>
      <nest-modal modal-type="full" :has-clear="false" :has-cancel="true" modal-cancel-txt="清空条件" :status="filtersShow"
                  @close="filtersShow = false"
                  @confirm="filterConfirm"
                  @cancel="filterClear">
        <div class="conditions">
          <div class="condition">
            <div class="condition-title">{{ listType === 'rent' ? '租金' : '价格' }}</div>
            <nest-radio v-model="price" :options="DICT.filters.price[listType]" size="small"></nest-radio>
            <nest-range class="range-container" v-model="range" :max="rangeMax" :step="rangeStep"></nest-range>
          </div>
          <div class="condition" v-if="listType !== 'carport' && listType !== 'land'">
            <div class="condition-title">房型</div>
            <nest-radio v-model="type" :options="DICT.filters.type[listType]" size="small" :count-in-row="3"></nest-radio>
          </div>
          <div class="condition" v-if="listType === 'rent'">
            <div class="condition-title">用途</div>
            <nest-radio v-model="purpose" :options="DICT.house.purpose" size="small" :count-in-row="3"></nest-radio>
          </div>
          <div class="condition" v-if="listType === 'rent'">
            <div class="condition-title">方式</div>
            <nest-radio v-model="rent_type" :options="DICT.house.rent_type" size="small"></nest-radio>
          </div>
          <div class="condition" v-if="listType === 'rent'">
            <div class="condition-title">付款</div>
            <nest-radio v-model="rentPay" :options="DICT.filters.rent_pay" size="small" :count-in-row="3"></nest-radio>
          </div>
          <div class="condition" v-if="listType === 'rent'">
            <div class="condition-title">设施</div>
            <nest-check v-model="facilities" :options="DICT.filters.facilities" size="small" :count-in-row="3"></nest-check>
          </div>
          <div class="condition" v-if="listType === 'rent'">
            <div class="condition-title">阳台</div>
            <nest-radio v-model="balcony" :options="DICT.house.balcony" size="small"></nest-radio>
          </div>
          <div class="condition" v-if="listType !== 'rent' && listType !== 'carport'">
            <div class="condition-title">面积</div>
            <nest-radio v-model="centiare" :options="DICT.filters.centiare[listType]" size="small"></nest-radio>
          </div>
          <div class="condition" v-if="listType === 'rent' || listType === 'second'">
            <div class="condition-title">车位</div>
            <nest-radio v-model="carport" :options="DICT.filters.carport" size="small"></nest-radio>
          </div>
          <div class="condition" v-if="listType !== 'rent' && listType !== 'land'">
            <div class="condition-title">楼层</div>
            <nest-radio v-model="floor" :options="DICT.filters.floor[this.listType]" size="small"></nest-radio>
          </div>
          <div class="condition" v-if="listType === 'new' || listType === 'second'">
            <div class="condition-title">装修</div>
            <nest-radio v-model="decor" :options="DICT.house.decor" size="small" :count-in-row="3"></nest-radio>
          </div>
        </div>
      </nest-modal>
      <nest-modal title="排序" :has-clear="false" :has-footer="false" @close="sortShow = false" :status="sortShow">
        <nest-radio v-model="sort" :count-in-row="1" :options="DICT.filters.sort[listType]"></nest-radio>
      </nest-modal>
    </div>
    <nest-scroll class="app-body"
                 ref="scroll"
                 :pullUpLoad="pullUpLoadObj"
                 @pullingUp="getData">
      <div class="list-container">
        <nest-swipe-cell v-for="(item, index) in dataList" :key="index">
          <div class="search-item" slot="content" @click="$router.push({ name: 'ExploreDetails', params: { type: listType, id: item.id }})">
            <div class="move-wrap">
              <div class="item-img" :style="{ backgroundImage: 'url(' + imageUrl(item) + ')'}"></div>
              <div class="msg-wrap">
                <div class="title">{{ item.building_name }}</div>
                <div class="type-wrap" v-if="listType === 'new'">
                  <div class="type-str">{{ item.address }}</div>
                </div>
                <div class="type-wrap" v-else>
                  <div class="type" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</div>
                </div>
                <div class="rent">
                  <div class="price" v-if="listType === 'new' || listType === 'rent'">{{ item.price }}</div>
                  <div class="price" v-else>{{ item.total_amount / 10000 }}</div>
                  <div class="price-msg" v-if="listType === 'new'">P/㎡</div>
                  <div class="price-msg" v-else-if="listType === 'rent'">P/月</div>
                  <div class="price-msg" v-else>万</div>
                  <div class="room-size" v-if="listType === 'new'">{{ item.centiare }} ㎡</div>
                  <div class="room-size" v-else-if="listType === 'second'">{{ item.price }} P/㎡</div>
                </div>
              </div>
            </div>
          </div>
          <div class="collect" slot="controls" v-if="userId == item.user_id">
            <div class="share" @click="doShare"></div>
          </div>
          <div class="collect" slot="controls" v-else>
            <div class="heart" @click="doFavorite"></div>
            <div class="share" @click="doShare"></div>
          </div>
        </nest-swipe-cell>
      </div>
    </nest-scroll>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from '../../configs/DICT';
  import Utils from '../../utils/Utils';
  import HouseService from '../../services/HouseService';
  import PreviewDefaultImg from '../../assets/images/preview-default.png';
  import Storage from '../../utils/Storage';

  export default {
    name: 'ExploreList',
    data() {
      return {
        dataList: [],
        regionShow: false,
        regionBtn: 'default',
        regionBtnTxt: '地点',
        bedroomShow: false,
        bedroomBtn: 'default',
        bedroomBtnTxt: '户型',
        sortShow: false,
        filtersShow: false,
        region: [],
        bedroom: [],
        type: '',
        is_new: '',
        sort: '0',
        price: '',
        range: [],
        purpose: '',
        rent_type: '',
        rentPay: '',
        facilities: [],
        balcony: '',
        centiare: '',
        carport: '',
        floor: '',
        decor: '',
        filters: {
          page: 0,
          per_page: 10
        },
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        }
      }
    },
    watch: {
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
      },
      sort(val) {
        this.sortShow = false;
        let selectedObj = getSelecteds(DICT.filters.sort[this.listType], val)[0];
        this.filters[selectedObj.dbkey1] = selectedObj.dbvalue1;
        this.filters[selectedObj.dbkey2] = selectedObj.dbvalue2;
        this.getData(true);
      },
      range(val) {
        if (val !== [0, this.rangeMax + this.rangeStep]) {
          this.price = '';
        }
      }
    },
    created() {
      this.initConsts();
    },
    mounted() {
      this.filters.trade = this.trade;
      this.filters.type = this.type;
      this.filters.is_new = this.is_new;
      this.getData(true);
    },
    methods: {
      initConsts() {
        let params = this.$route.params;
        if (params) {
          this.listType = params.type;
          if (this.listType === 'rent' || this.listType === 'new' || this.listType === 'second') {
            this.type = '';
          } else if (this.listType === 'carport') {
            this.type = 'carport';
          } else if (this.listType === 'land') {
            this.type = 'land';
          }
        }
        this.userId = Storage.getLocalStorage('nest_user_id');
        this.DICT = DICT;
        if (this.listType === 'rent') {
          this.trade = 'rent';
          this.rangeMax = 400000;
          this.rangeStep = 5000;
        } else if (this.listType === 'second') {
          this.trade = 'sale';
          this.is_new = '0';
          this.rangeMax = 20000000;
          this.rangeStep = 100000;
        } else if (this.listType === 'carport') {
          this.trade = 'sale';
          this.rangeMax = 5000000;
          this.rangeStep = 50000;
        } else if (this.listType === 'land') {
          this.trade = 'sale';
          this.rangeMax = 200000000;
          this.rangeStep = 1000000;
        } else if (this.listType === 'new') {
          this.trade = 'sale';
          this.is_new = '1';
          this.rangeMax = 20000000;
          this.rangeStep = 100000;
        }
        this.range = [0, this.rangeMax + this.rangeStep];
      },
      imageUrl(item) {
        if (item.galleries.data.length > 0) {
          return item.galleries.data[0].url;
        } else {
          return PreviewDefaultImg;
        }
      },
      regionConfirm() {
        this.regionShow = false;
        this.filters.region_id = this.region;
        this.getData(true);
      },
      bedroomConfirm() {
        this.bedroomShow = false;
        this.filters.bedroom = this.bedroom;
        this.getData(true);
      },
      filterConfirm() {
        this.filters.type = this.type;
        this.filters.is_new = this.is_new;
        let rangeLower = this.range[0] === -this.rangeStep ? 0 : this.range[0],
          rangeUpper = this.range[1] === this.rangeMax + this.rangeStep ? 0 : this.range[1];
        this.filters.price = this.price;
        if (rangeLower !== 0 || rangeUpper !== 0) {
          this.filters.price = rangeLower + '-' + rangeUpper;
        }
        this.filters.purpose = this.purpose;
        this.filters.rent_type = this.rent_type;
        if (this.rentPay && this.rentPay !== '2') {
          let selectedObj = getSelecteds(DICT.filters.rent_pay, this.rentPay)[0];
          this.filters[selectedObj.dbkey1] = selectedObj.dbvalue1;
          this.filters[selectedObj.dbkey2] = selectedObj.dbvalue2;
        }
        this.filters.facilities_ids = this.facilities;
        this.filters.balcony = this.balcony;
        this.filters.centiare = this.centiare;
        this.filters.carport = this.carport;
        this.filters.floor = this.floor;
        this.filters.decor = this.decor;
        this.filtersShow = false;
        this.getData(true);
      },
      filterClear() {
        this.type = '';
        this.price = '';
        this.range = [0, this.rangeMax + this.rangeStep];
        this.purpose = '';
        this.rent_type = '';
        this.rentPay = '';
        this.facilities = [];
        this.balcony = '';
        this.centiare = '';
        this.carport = '';
        this.floor = '';
        this.decor = '';
      },
      getData(loading = false) {
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          HouseService.getList(params, res => {
            this.dataList = res.data;
            this.$refs.scroll.scrollTo(0, 0, 300);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.scroll.forceUpdate(true);
            } else {
              this.$refs.scroll.forceUpdate(false);
            }
          }, true);
        } else {
          this.filters.page += 1;
          HouseService.getList(params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataList = this.dataList.concat(res.data);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.scroll.forceUpdate(true);
            } else {
              this.$refs.scroll.forceUpdate(false);
            }
          }, false);
        }
      },
      doFavorite() {
        this.$toast.info('收藏了')
      },
      doShare() {
        this.$toast.info('分享了')
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
    .list-container {
      padding: 0.5rem 0 0;
    }
    .search-item {
      display: flex;
      width: 100%;
      height: 1.74rem;
      align-items: center;
      margin-bottom: 0.4rem;
      .move-wrap {
        position: absolute;
        top: 0;
        left: 0;
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
        background: #e8e8ea no-repeat;
        background-size: cover;
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
