<template>
  <div class="live-ground">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      帮住广场
    </div>
    <div class="control-bar">
      <nest-button :type="tradeBtn" class="mr28" @click="tradeShow = !tradeShow">{{ tradeBtnTxt }}</nest-button>
      <nest-button :type="regionBtn" @click="regionShow = !regionShow">{{ regionBtnTxt }}</nest-button>
    </div>
    <nest-scroll class="app-body"
                 ref="scroll"
                 :pullUpLoad="pullUpLoadObj"
                 @pullingUp="getData">
      <div class="list">
        <nest-swipe-cell v-for="(item, index) in dataList" :key="index" class="list-item">
          <div class="item"
               slot="content"
               :class="item.trade">
            <div class="item-img" :class="[item.type[0]]"></div>
            <div class="item-content">
              <div class="title">
                <span class="tag">{{ getSelecteds(DICT.house.trade2, item.trade)[0].label }}</span>
                <span class="txt">{{ getListTitle(item) }}</span>
              </div>
              <div class="desc">
                <div v-if="item.trade === 'rent'">预算：{{ item.budget_min }}-{{ item.budget_max }}Peso</div>
                <div v-else>预算：{{ item.budget_min/10000 }}-{{ item.budget_max/10000 }}万Peso</div>
                <div>地区：{{ getSelecteds(DICT.region, item.region_ids).map(item2 => item2.label).join(' ') }}</div>
              </div>
              <div class="date">{{ item.date }}</div>
            </div>
          </div>
          <template slot="controls">
            <div class="follow"></div>
            <div class="share"></div>
          </template>
        </nest-swipe-cell>
      </div>
    </nest-scroll>
    <nest-modal title="类型" modal-confirm-txt="确定" @close="tradeShow = false" :status="tradeShow">
      <nest-check v-model="trade" :options="DICT.house.trade2"></nest-check>
    </nest-modal>
    <nest-modal title="地点" modal-confirm-txt="确定" @close="regionShow = false" :status="regionShow">
      <nest-check v-model="region_ids" :options="DICT.region"></nest-check>
    </nest-modal>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from '../../configs/DICT';
  import Utils from '../../utils/Utils';
  import WantsService from '../../services/WantsService';

  export default {
    name: "MyGround",
    data() {
      return {
        tradeBtn: 'default',
        regionBtn: 'default',
        tradeBtnTxt: '类型',
        regionBtnTxt: '区域',
        regionShow: false,
        tradeShow: false,
        region_ids: [],
        trade: [],
        dataList: [],
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
      trade(val) {
        if (val.length === 0) {
          this.tradeBtn = 'default';
          this.tradeBtnTxt = '类型';
        } else {
          this.tradeBtn = 'primary';
          if (val.length === 1) {
            let label = getSelecteds(DICT.house.trade2, val[0])[0].label;
            this.tradeBtnTxt = label;
          } else {
            this.tradeBtnTxt = '类型(' + val.length + ')';
          }
        }
      },
      region_ids(val) {
        if (val.length === 0) {
          this.regionBtn = 'default';
          this.regionBtnTxt = '区域';
        } else {
          this.regionBtn = 'primary';
          if (val.length === 1) {
            let label = getSelecteds(DICT.region, val[0])[0].label;
            this.regionBtnTxt = label.split('(')[0];
          } else {
            this.regionBtnTxt = '区域(' + val.length + ')';
          }
        }
      }
    },
    created() {
      this.initConsts();
    },
    mounted() {
      this.getData(true);
    },
    methods: {
      initConsts() {
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
      },
      getListTitle(item) {
        let title = getSelecteds(DICT.house.type, item.type).map(item2 => item2.label).join('·');
        if (title.length > 8) {
          return title.substring(0, 8);
        }
        return title;
      },
      getData (loading = false) {
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          WantsService.getList(params, res => {
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
          WantsService.getList(params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataList = this.dataList.concat(res.data);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.scroll.forceUpdate(true);
            } else {
              this.$refs.scroll.forceUpdate(false);
            }
          }, false);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .live-ground {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .header {
      position: relative;
      display: flex;
      padding: 0 .28rem;
      height: 1.2rem;
      justify-content: center;
      align-items: center;
    }
    .back {
      position: absolute;
      top: 0;
      left: .28rem;
      width: .9rem;
      height: 100%;
      background: url('../../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .control-bar {
      display: flex;
      padding: .2rem .28rem .6rem;
    }
    .mr28 {
      margin-right: .28rem;
    }
    .control-btn {
      position: relative;
      margin-right: .28rem;
      padding: 0 .22rem;
      min-width: 1.2rem;
      max-width: 1.6rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      font-size: .28rem;
      color: #333;
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
    .app-body {
      position: relative;
      flex: 1;
      overflow: hidden;
    }
    .list-item {
      margin-bottom: .4rem;
    }
    .item {
      display: flex;
      padding: 0 .28rem;
      &.rent {
        .item-img {
          &.apartment {
            background: rgba(139,181,223,.15) url('../../assets/images/my/apartment-rent.png') no-repeat center center;
            background-size: .66rem .65rem;
          }
          &.villa {
            background: rgba(139,181,223,.15) url('../../assets/images/my/villa-rent.png') no-repeat center center;
            background-size: .69rem .6rem;
          }
          &.office {
            background: rgba(139,181,223,.15) url('../../assets/images/my/office-rent.png') no-repeat center center;
            background-size: .75rem .75rem;
          }
          &.homestay {
            background: rgba(139,181,223,.15) url('../../assets/images/my/homestay-rent.png') no-repeat center center;
            background-size: .69rem .71rem;
          }
          &.land {
            background: rgba(139,181,223,.15) url('../../assets/images/my/land-rent.png') no-repeat center center;
            background-size: .73rem .61rem;
          }
        }
        .tag {
          color: #8BB5DF;
          background-color: rgba(139,181,223,.15);
        }
      }
      &.sale {
        .item-img {
          &.apartment {
            background: rgba(213,190,136,.15) url('../../assets/images/my/apartment-sale.png') no-repeat center center;
            background-size: .66rem .65rem;
          }
          &.villa {
            background: rgba(213,190,136,.15) url('../../assets/images/my/villa-sale.png') no-repeat center center;
            background-size: .69rem .6rem;
          }
          &.office {
            background: rgba(213,190,136,.15) url('../../assets/images/my/office-sale.png') no-repeat center center;
            background-size: .75rem .75rem;
          }
          &.homestay {
            background: rgba(213,190,136,.15) url('../../assets/images/my/homestay-sale.png') no-repeat center center;
            background-size: .69rem .71rem;
          }
          &.land {
            background: rgba(213,190,136,.15) url('../../assets/images/my/land-sale.png') no-repeat center center;
            background-size: .73rem .61rem;
          }
        }
        .tag {
          color: #D5BE88;
          background-color: rgba(213,190,136,.15);
        }
      }
      .item-img {
        margin-right: .28rem;
        width: 1.74rem;
        height: 1.74rem;
      }
      .item-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .06rem 0;
        flex: 1;
        .title {
          font-size: 0;
          .txt {
            display: inline-block;
            vertical-align: middle;
            font-size: .32rem;
            font-weight: bold;
            color: #333;
          }
          .tag {
            display: inline-block;
            vertical-align: middle;
            margin-right: .2rem;
            width: .8rem;
            height: .36rem;
            line-height: .36rem;
            border-radius: .1rem;
            font-size: .24rem;
            text-align: center;
          }
        }
        .desc {
          font-size: .24rem;
          color: #999;
          line-height: .32rem;
        }
        .date {
          font-size: .22rem;
          color: #b3b3b3;
        }
      }
    }
    .follow {
      width: 1.2rem;
      height: .87rem;
      background: rgba(15,145,131,.1) url('../../assets/images/heart.png') no-repeat center center;
      background-size: .36rem .32rem;
    }
    .share {
      width: 1.2rem;
      height: .87rem;
      background: rgba(15,145,131,.1) url('../../assets/images/share.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
  }
</style>
