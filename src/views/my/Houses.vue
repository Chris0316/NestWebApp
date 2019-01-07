<template>
  <div class="publish">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      我的发布
    </div>
    <div class="control-wrap">
      <nest-button :type="publishBtn.type" class="mr28">{{ publishBtn.txt }}</nest-button>
      <nest-button class="mr28" @click="tradeShow = true">类型</nest-button>
      <nest-button class="mr28" @click="typeShow = true">分类</nest-button>
      <nest-button class="mr28">关注时间</nest-button>
    </div>
    <nest-scroll class="app-body" :pullUpLoad="pullUpLoadObj"
                 @pullingUp="getMyData"
                 ref="myScroll">
      <div class="the-time-list">
        <div class="the-time">今天</div>
        <nest-swipe-cell v-for="(item, index) in dataList" :key="index">
          <!--<div class="search-item" slot="content" @click="$router.push({ name: 'ExploreDetails', params: { type: listType, id: item.id }})">-->
            <!--<div class="move-wrap">-->
              <!--<div class="item-img" :style="{ backgroundImage: 'url(' + imageUrl(item) + ')'}"></div>-->
              <!--<div class="msg-wrap">-->
                <!--<div class="title">{{ item.building_name }}</div>-->
                <!--<div class="type-wrap" v-if="listType === 'new'">-->
                  <!--<div class="type-str">{{ item.address }}</div>-->
                <!--</div>-->
                <!--<div class="type-wrap" v-else>-->
                  <!--<div class="type" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</div>-->
                <!--</div>-->
                <!--<div class="rent">-->
                  <!--<div class="price" v-if="listType === 'new' || listType === 'rent'">{{ item.price }}</div>-->
                  <!--<div class="price" v-else>{{ item.total_amount / 10000 }}</div>-->
                  <!--<div class="price-msg" v-if="listType === 'new'">P/㎡</div>-->
                  <!--<div class="price-msg" v-else-if="listType === 'rent'">P/月</div>-->
                  <!--<div class="price-msg" v-else>万</div>-->
                  <!--<div class="room-size" v-if="listType === 'new'">{{ item.centiare }} ㎡</div>-->
                  <!--<div class="room-size" v-else-if="listType === 'second'">{{ item.price }} P/㎡</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="collect" slot="controls" v-if="userId == item.user_id">-->
            <!--<div class="share" @click="doShare"></div>-->
          <!--</div>-->

          <div class="search-item" slot="content">
            <div class="move-wrap">
              <div class="item-img"></div>
              <div class="msg-wrap">
                <div class="title">{{ item.building_name }}</div>
                <div class="type-wrap">
                  <div class="type" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</div>
                </div>
                <!--<div class="type-wrap">-->
                  <!--<div class="type-str">{{ item.address }}</div>-->
                <!--</div>-->
                <div class="rent">
                  <div class="price">{{ item.price }}</div>
                  <div class="price-msg">P/月</div>
                </div>
              </div>
            </div>
          </div>
          <div class="collect-wrap" slot="controls">
            <div class="share-icon"></div>
          </div>
        </nest-swipe-cell>
      </div>
    </nest-scroll>

    <!--关注时间-->
    <!--followtime-->
    <nest-modal title="关注时间" :has-clear="false" :has-footer="false" @close="followtimeShow = false"
                :status="followtimeShow">
      <nest-radio v-model="followtimeVal" :count-in-row="1" :options="followtimeOpts"></nest-radio>
    </nest-modal>
    <!--分类-->
    <!--classify-->
    <nest-modal title="分类" :has-clear="false" :has-footer="false" @close="typeShow = false" :status="typeShow">
      <nest-radio v-model="type" :count-in-row="1" :options="typeOpts"></nest-radio>
    </nest-modal>
    <!--类型-->
    <nest-modal title="类型" :has-clear="false" :has-footer="false" @close="tradeShow = false" :status="tradeShow">
      <nest-radio v-model="trade" :count-in-row="1" :options="tradeOpts"></nest-radio>
    </nest-modal>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from "../../configs/DICT";
  import Utils from '../../utils/Utils';
  import UserService from '../../services/UserService';

  export default {
    name: "MyHouses",
    data() {
      return {
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
        dataList: [],
        tradeShow: false,
        trade: '-1',
        typeShow: false,
        type: '-1',
        followtimeOpts: ['默认', '今天', '近三天', '近两周', '近一个月'],
        followtimeShow: false,
        followtimeVal: '默认'
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
        this.tradeOpts = DICT.house.trade2;
        this.tradeOpts.unshift({ 'label': '默认', 'value': '-1' });
        this.typeOpts = DICT.house.type;
        this.typeOpts.unshift({ 'label': '默认', 'value': '-1' });
      },
      typeModalFun() {
        this.settleShow = !this.settleShow
      },
      classifyModalFun() {
        this.classifyShow = !this.classifyShow
      },
      followtimeModalFun() {
        this.followtimeShow = !this.followtimeShow
      },
      getMyData(loading = false, callback) {
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          UserService.getMyHouses(params, res => {
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
          UserService.getMyHouses(params, res => {
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
  .publish {
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
    .control-wrap {
      padding: .2rem .28rem;
      display: flex;
      .mr28 {
        margin-right: .28rem;
      }
    }
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .the-time-list {
      padding-top: 0.6rem;
      .the-time {
        margin-left: 0.28rem;
        margin-bottom: 0.4rem;
        font-size: 0.32rem;
        color: #333333;
      }
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
    .collect-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.2rem;
      height: 1.74rem;
      background: rgba(15, 145, 131, 0.1);
      .share-icon {
        width: 0.38rem;
        height: 0.38rem;
        background: url("../../assets/images/share.png") no-repeat;
        background-size: 100%;
      }
    }
  }
</style>
