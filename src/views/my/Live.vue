<template>
  <div class="live">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      我的帮住
    </div>
    <nest-tab-bar class="tabs" v-model="tabSelected">
      <nest-tab-item id="my">我的</nest-tab-item>
      <nest-tab-item id="collect">收藏</nest-tab-item>
    </nest-tab-bar>
    <div class="btn-wrap">
      <nest-button>发布中</nest-button>
    </div>
    <nest-scroll class="app-body"
                 :pullUpLoad="pullUpLoadObj"
                 @pullingUp="getData"
                 ref="scroll">
      <div class="list">
        <nest-tab-container v-model="tabSelected">
          <nest-tab-container-item id="my">
            <nest-swipe-cell v-for="(item, index) in dataList" :key="index" class="list-item">
              <div class="item" slot="content" :class="item.trade"
                   @click="$router.push({ name: 'LiveDetails', params: { id: item.id } })">
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
          </nest-tab-container-item>
          <nest-tab-container-item id="collect">

          </nest-tab-container-item>
        </nest-tab-container>
      </div>
    </nest-scroll>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from "../../configs/DICT";
  import Utils from '../../utils/Utils';
  import WantsService from '../../services/WantsService';

  export default {
    name: "MyLive",
    data() {
      return {
        tabSelected: 'my',
        filters: {},
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        dataList: []
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
  .live {
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
    .tabs {
      padding: 0 .28rem;
    }
    .btn-wrap {
      padding: .4rem .28rem 0;
    }
    .app-body {
      position: relative;
      flex: 1;
      overflow: hidden;
    }
    .list {
      padding-top: .6rem;
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
    .item-control {
      display: flex;
      height: 100%;
    }
    .share {
      width: 1.2rem;
      height: 100%;
      background: rgba(15, 145, 131, .1) url('../../assets/images/share.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
    .delete {
      width: .8rem;
      height: 100%;
      background: #FFE6E6 url('../../assets/images/icon-delete.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
  }
</style>
