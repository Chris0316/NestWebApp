<template>
  <div class="live">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      我的帮住
    </div>
    <nest-tab-bar class="tabs" v-model="tabSelected">
      <nest-tab-item id="my">我的</nest-tab-item>
      <nest-tab-item id="favorite">收藏</nest-tab-item>
    </nest-tab-bar>
    <div class="control-wrap" v-if="tabSelected === 'my'">
      <nest-button :type="publishBtn.type" @click="switchPublishStatus">{{ publishBtn.txt }}</nest-button>
    </div>
    <nest-tab-container class="app-body" v-model="tabSelected">
      <nest-tab-container-item class="container-item" id="my">
        <nest-scroll class="scroll-body" :pullUpLoad="pullUpLoadObj"
                     @pullingUp="getMyData"
                     ref="myScroll">
          <div class="list">
            <nest-swipe-cell v-for="item in dataList" :key="item.id" class="list-item">
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
              <div slot="controls" class="item-control" v-if="filters.status === 1">
                <div class="share"></div>
                <div class="cancel" @click="updateStatus(item.id, 0)"></div>
              </div>
              <div slot="controls" class="item-control" v-else>
                <div class="publish" @click="updateStatus(item.id, 1)"></div>
                <div class="delete"></div>
              </div>
            </nest-swipe-cell>
          </div>
        </nest-scroll>
      </nest-tab-container-item>
      <nest-tab-container-item class="container-item" id="favorite">
        <nest-scroll class="scroll-body" :pullUpLoad="pullUpLoadObj"
                     @pullingUp="getMyData"
                     ref="favoriteScroll">
          <div class="list">
            <nest-swipe-cell v-for="item in dataList" :key="item.id" class="list-item">
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
                <div class="favorite"></div>
                <div class="share-2"></div>
              </template>
            </nest-swipe-cell>
          </div>
        </nest-scroll>
      </nest-tab-container-item>
    </nest-tab-container>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from "../../configs/DICT";
  import Utils from '../../utils/Utils';
  import UserService from '../../services/UserService';
  import WantsService from '../../services/WantsService';
  import Storage from "../../utils/Storage";

  export default {
    name: "MyLives",
    data() {
      return {
        tabSelected: 'my',
        publishBtn: {
          type: 'primary',
          txt: '已发布'
        },
        filters: {
          status: 1
        },
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
      this.getMyData(true);
    },
    methods: {
      initConsts() {
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
        this.userId = Storage.getLocalStorage('nest_user_id');
      },
      switchPublishStatus() {
        if (this.publishBtn.txt === '已发布') {
          this.filters.status = 0;
          this.getMyData(true, () => {
            this.publishBtn.txt = '待发布';
            this.publishBtn.type = 'default';
          });
        } else {
          this.filters.status = 1;
          this.getMyData(true, () => {
            this.publishBtn.txt = '已发布';
            this.publishBtn.type = 'primary';
          });
        }

      },
      getListTitle(item) {
        let title = getSelecteds(DICT.house.type, item.type).map(item2 => item2.label).join('·');
        if (title.length > 8) {
          return title.substring(0, 8);
        }
        return title;
      },
      updateStatus(wantsId, status) {
        WantsService.updateMyWantsStatus(wantsId, status, res => {
          this.getMyData(true);
        })
      },
      getMyData(loading = false, callback) {
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          UserService.getMyWants(params, res => {
            this.dataList = res.data;
            this.$refs.myScroll.scrollTo(0, 0, 300);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.myScroll.forceUpdate(true);
            } else {
              this.$refs.myScroll.forceUpdate(false);
            }
            if (callback)
              callback();
          }, true);
        } else {
          this.filters.page += 1;
          UserService.getMyWants(params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataList = this.dataList.concat(res.data);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.myScroll.forceUpdate(true);
            } else {
              this.$refs.myScroll.forceUpdate(false);
            }
            if (callback)
              callback();
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
      padding: 0 .28rem .2rem;
    }
    .control-wrap {
      padding: .2rem .28rem;
    }
    .app-body {
      position: relative;
      flex: 1;
      overflow: hidden;
    }
    .container-item {
      height: 100%;
    }
    .scroll-body {
      height: 100%;
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
            background: rgba(139, 181, 223, .15) url('../../assets/images/my/apartment-rent.png') no-repeat center center;
            background-size: .66rem .65rem;
          }
          &.villa {
            background: rgba(139, 181, 223, .15) url('../../assets/images/my/villa-rent.png') no-repeat center center;
            background-size: .69rem .6rem;
          }
          &.office {
            background: rgba(139, 181, 223, .15) url('../../assets/images/my/office-rent.png') no-repeat center center;
            background-size: .75rem .75rem;
          }
          &.homestay {
            background: rgba(139, 181, 223, .15) url('../../assets/images/my/homestay-rent.png') no-repeat center center;
            background-size: .69rem .71rem;
          }
          &.land {
            background: rgba(139, 181, 223, .15) url('../../assets/images/my/land-rent.png') no-repeat center center;
            background-size: .73rem .61rem;
          }
        }
        .tag {
          color: #8BB5DF;
          background-color: rgba(139, 181, 223, .15);
        }
      }
      &.sale {
        .item-img {
          &.apartment {
            background: rgba(213, 190, 136, .15) url('../../assets/images/my/apartment-sale.png') no-repeat center center;
            background-size: .66rem .65rem;
          }
          &.villa {
            background: rgba(213, 190, 136, .15) url('../../assets/images/my/villa-sale.png') no-repeat center center;
            background-size: .69rem .6rem;
          }
          &.office {
            background: rgba(213, 190, 136, .15) url('../../assets/images/my/office-sale.png') no-repeat center center;
            background-size: .75rem .75rem;
          }
          &.homestay {
            background: rgba(213, 190, 136, .15) url('../../assets/images/my/homestay-sale.png') no-repeat center center;
            background-size: .69rem .71rem;
          }
          &.land {
            background: rgba(213, 190, 136, .15) url('../../assets/images/my/land-sale.png') no-repeat center center;
            background-size: .73rem .61rem;
          }
        }
        .tag {
          color: #D5BE88;
          background-color: rgba(213, 190, 136, .15);
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
    .publish {
      width: 1.2rem;
      height: 100%;
      background: #D5EAFF url('../../assets/images/icon-send.png') no-repeat center center;
      background-size: .34rem .34rem;
    }
    .cancel {
      width: .8rem;
      height: 100%;
      background: #FFE6E6 url('../../assets/images/icon-cancel.png') no-repeat center center;
      background-size: .31rem .31rem;
    }
    .delete {
      width: .8rem;
      height: 100%;
      background: #FFE6E6 url('../../assets/images/icon-delete.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
    .favorite {
      width: 1.2rem;
      height: .87rem;
      background: rgba(15,145,131,.1) url('../../assets/images/heart.png') no-repeat center center;
      background-size: .36rem .32rem;
    }
    .share-2 {
      width: 1.2rem;
      height: .87rem;
      background: rgba(15,145,131,.1) url('../../assets/images/share.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
  }
</style>
