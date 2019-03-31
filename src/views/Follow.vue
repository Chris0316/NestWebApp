<template>
  <div class="follow">
    <div class="search-wrap">
      <div class="search-box" @click="$router.push({ name: 'FollowList' })">
        搜索经纪人或房源编号
      </div>
    </div>
    <nest-tab-bar class="tabs" v-model="tabSelected">
      <nest-tab-item id="resources">房源</nest-tab-item>
      <nest-tab-item id="agents">经纪人</nest-tab-item>
    </nest-tab-bar>
    <div class="control-wrap" v-if="tabSelected === 'resources'">
      <nest-button :type="tradeBtn" class="mr28" @click="tradeShow = true">{{ tradeBtnTxt }}</nest-button>
      <nest-button :type="typeBtn" class="mr28" @click="typeShow = true">{{ typeBtnTxt }}</nest-button>
      <nest-button :type="dateBtn" class="mr28" @click="dateShow = true">{{ dateBtnTxt }}</nest-button>
    </div>
    <div class="control-wrap" v-else>
      <nest-button :type="dateBtn2" @click="dateShow2 = true">{{ dateBtnTxt2 }}</nest-button>
    </div>
    <nest-tab-container class="app-body" v-model="tabSelected">
      <nest-tab-container-item class="container-item" id="resources">
        <nest-scroll class="list"
                     ref="resourcesScroll"
                     :pullUpLoad="pullUpLoadObj"
                     @pullingUp="onPullingUpResources">
          <nest-swipe-cell v-for="(item, index) in dataList" :key="item.id">
            <div class="search-item" slot="content"
                 @click="$router.push({ name: 'ExploreDetails', params: { id: item.target.id } })">
              <div class="move-wrap">
                <div class="item-img" :style="{ backgroundImage:'url(' + imageUrl(item.target) + ')' }"></div>
                <div class="msg-wrap">
                  <div class="title">{{ item.target.building_name }}</div>
                  <div class="type-wrap" v-if="matchCustomType(item.target) === 'new'">
                    <div class="type-str">{{ item.target.address }}</div>
                  </div>
                  <div class="type-wrap" v-else>
                    <div class="type" v-for="(tag, index) in item.target.tags" :key="index">{{ tag }}</div>
                  </div>
                  <div class="rent">
                    <div class="price"
                         v-if="matchCustomType(item.target) === 'new' || matchCustomType(item.target) === 'rent'">
                      {{ item.target.price }}
                    </div>
                    <div class="price" v-else>{{ item.target.total_amount / 10000 }}</div>
                    <div class="price-msg" v-if="matchCustomType(item.target) === 'new'">P/㎡</div>
                    <div class="price-msg" v-else-if="matchCustomType(item.target) === 'rent'">P/月</div>
                    <div class="price-msg" v-else>万</div>
                    <div class="room-size" v-if="matchCustomType(item.target) === 'new'">{{ item.target.centiare }} ㎡
                    </div>
                    <div class="room-size" v-else-if="matchCustomType(item.target) === 'second'">{{ item.target.price }}
                      P/㎡
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="collect-wrap" slot="controls">
              <div class="collect">
                <div class="heart on" @click="unFollow(item.target, 'house')"></div>
                <div class="share" @click.stop="shareFun"></div>
              </div>
              <div class="collect-del">
                <a class="call-icon" :href="'tel:' + item.user.phone"></a>
              </div>
            </div>
          </nest-swipe-cell>
        </nest-scroll>
      </nest-tab-container-item>
      <nest-tab-container-item class="container-item" id="agents">
        <nest-scroll class="list"
                     ref="agentsScroll"
                     :pullUpLoad="pullUpLoadObj2"
                     @pullingUp="onPullingUpAgents">
          <nest-swipe-cell v-for="(item, index) in dataList2" :key="item.target.id">
            <div class="item" slot="content"
                 @click="$router.push({ name: 'FollowAgent', params: { id: item.target.id } }) ">
              <div class="item-cont">
                <div class="top">
                  <div class="top-l">
                    <div class="cli" :style="{ backgroundImage: 'url(' + item.target.avatar + ')' }"></div>
                    <div class="det">
                      <div class="name">{{ item.target.local_name }}</div>
                      <div class="skill">语言：{{ getSelecteds(DICT.languages, item.target.languages).join('/') }}
                      </div>
                    </div>
                  </div>
                  <div class="top-r">
                    <div class="follow-btn" @click.stop="unFollow(item.target, 'user')">已关注</div>
                    <div class="follow-num">{{ item.target.follows }}人关注</div>
                  </div>
                </div>
                <div class="text1">
                  近一个月：出租 <span class="sp">{{ item.target.monthly_rent_amount }}</span>套 &nbsp;售卖 <span class="sp">{{ item.target.monthly_sold_amount }}</span>
                  套
                </div>
                <div class="text2">
                  {{ item.target.introduction }}
                </div>
              </div>
            </div>
            <div class="collect-wrap" slot="controls">
              <div class="collect-l" @click="shareShow = !shareShow">
                <img class="icon" src="../assets/images/s-share.png" alt="">
              </div>
              <div class="collect-r">
                <a :href="'tel:' + item.target.phone" class="icon"></a>
              </div>
            </div>
          </nest-swipe-cell>
        </nest-scroll>
      </nest-tab-container-item>
    </nest-tab-container>
    <nest-nav page="follow"></nest-nav>
    <nest-modal title="关注时间" :has-clear="false" :has-footer="false" @close="dateShow = false"
                :status="dateShow">
      <nest-radio v-model="date" :count-in-row="1" :options="dateOpts"></nest-radio>
    </nest-modal>
    <nest-modal title="关注时间" :has-clear="false" :has-footer="false" @close="dateShow2 = false"
                :status="dateShow2">
      <nest-radio v-model="date2" :count-in-row="1" :options="dateOpts2"></nest-radio>
    </nest-modal>
    <nest-modal title="分类" :has-clear="false" :has-footer="false" @close="typeShow = false" :status="typeShow">
      <nest-radio v-model="type" :count-in-row="1" :options="typeOpts"></nest-radio>
    </nest-modal>
    <nest-modal title="类型" :has-clear="false" :has-footer="false" @close="tradeShow = false" :status="tradeShow">
      <nest-radio v-model="trade" :count-in-row="1" :options="tradeOpts"></nest-radio>
    </nest-modal>
    <!--弹框确认取消-->
    <nest-modal
      :hasClear="false" :hasCancel="true" modalCancelTxt="按错了" :hasFooter="true"
      :status="false" modal-type="confirm"
      class="textali">
      确定要取消关注该 <span class="keyword">房源 </span> 吗？
    </nest-modal>
    <NestShare :status="shareShow" @close="shareShow = false"></NestShare>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from '../configs/DICT'
  import FollowService from '../services/FollowService'
  import PreviewDefaultImg from '../assets/images/preview-default.png';
  import Utils from '../utils/Utils';

  export default {
    name: "Follow",
    data() {
      return {
        tabSelected: 'resources',
        agentFirstLoad: false,
        tradeShow: false,
        trade: '-1',
        tradeBtn: 'default',
        tradeBtnTxt: '类型',
        typeShow: false,
        type: '-1',
        typeBtn: 'default',
        typeBtnTxt: '分类',
        dateShow: false,
        date: '-1',
        dateBtn: 'default',
        dateBtnTxt: '关注时间',
        dateShow2: false,
        date2: '-1',
        dateBtn2: 'default',
        dateBtnTxt2: '关注时间',
        shareShow: false,
        dataList: [],
        dataList2: [],
        filters: {
          page: 0,
          per_page: 10
        },
        filters2: {
          page: 0,
          per_page: 10
        },
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        pullUpLoadObj2: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        }
      }
    },
    watch: {
      tabSelected(val) {
        if (val === 'agents' && !this.agentFirstLoad) {
          this.onPullingUpAgents(true);
          this.agentFirstLoad = true;
        }
      },
      type(val) {
        this.typeShow = false;
        let selectedLabel = getSelecteds(this.typeOpts, val)[0].label;
        if (val === '-1') {
          this.typeBtn = 'default';
          this.typeBtnTxt = '类型';
          delete this.filters['type'];
        } else {
          this.typeBtn = 'primary';
          this.typeBtnTxt = selectedLabel;
          this.filters.type = val;
        }
        this.onPullingUpResources(true);
      },
      trade(val) {
        this.tradeShow = false;
        let selectedLabel = getSelecteds(this.tradeOpts, val)[0].label;
        if (val === '-1') {
          this.tradeBtn = 'default';
          this.tradeBtnTxt = '分类';
          delete this.filters['trade'];
        } else {
          this.tradeBtn = 'primary';
          this.tradeBtnTxt = selectedLabel;
          this.filters.trade = val;
        }
        this.onPullingUpResources(true);
      },
      date(val) {
        this.dateShow = false;
        let selectedLabel = getSelecteds(this.dateOpts, val)[0].label;
        if (val === '-1') {
          this.dateBtn = 'default';
          this.dateBtnTxt = '关注时间';
          delete this.filters['filter_time'];
        } else {
          this.dateBtn = 'primary';
          this.dateBtnTxt = selectedLabel;
          this.filters.filter_time = val;
        }
        this.onPullingUpResources(true);
      },
      date2(val) {
        this.dateShow2 = false;
        let selectedLabel = getSelecteds(this.dateOpts2, val)[0].label;
        if (val === '-1') {
          this.dateBtn2 = 'default';
          this.dateBtnTxt2 = '关注时间';
          delete this.filters2['filter_time'];
        } else {
          this.dateBtn2 = 'primary';
          this.dateBtnTxt2 = selectedLabel;
          this.filters2.filter_time = val;
        }
        this.onPullingUpAgents(true);
      }
    },
    created() {
      this.initConsts();
    },
    mounted() {
      this.onPullingUpResources(true);
    },
    methods: {
      initConsts() {
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
        this.matchCustomType = Utils.matchCustomType;
        this.tradeOpts = [].concat(DICT.house.trade);
        this.tradeOpts.unshift({'label': '默认', 'value': '-1'});
        this.typeOpts = [].concat(DICT.house.type);
        this.typeOpts.unshift({'label': '默认', 'value': '-1'});
        this.dateOpts = this.dateOpts2 = [{
          label: '默认',
          value: '-1'
        }, {
          label: '今天',
          value: 'today'
        }, {
          label: '近三天',
          value: '3days'
        }, {
          label: '近两周',
          value: '2weeks'
        }, {
          label: '近一个月',
          value: '1month'
        }];
      },
      imageUrl(item) {
        return item.cover ? item.cover : PreviewDefaultImg;
      },
      unFollow(item, type) {
        FollowService.unFollow({
          target_type: type,
          target_id: item.id
        }, res => {
          if (type === 'house') {
            this.onPullingUpResources(true);
          } else {
            this.onPullingUpAgents(true);
          }
        })
      },
      shareFun() {
        this.shareShow = !this.shareShow
      },
      onPullingUpResources(loading = false) {
        this.filters.target_type = 'house';
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          FollowService.getFollowList(params, res => {
            this.dataList = res.data;
            this.$refs.resourcesScroll.scrollTo(0, 0, 300);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.resourcesScroll.forceUpdate(true);
            } else {
              this.$refs.resourcesScroll.forceUpdate(false);
            }
          }, true);
        } else {
          this.filters.page += 1;
          FollowService.getFollowList(params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataList = this.dataList.concat(res.data);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.resourcesScroll.forceUpdate(true);
            } else {
              this.$refs.resourcesScroll.forceUpdate(false);
            }
          }, false);
        }
      },
      onPullingUpAgents(loading = false) {
        this.filters2.target_type = 'user';
        let params = Utils.getEffectiveAttrsByObj(this.filters2);
        if (loading) {
          this.filters2.page = 1;
          FollowService.getFollowList(params, res => {
            this.dataList2 = res.data;
            this.$refs.agentsScroll.scrollTo(0, 0, 300);
            if (this.dataList2.length < res.meta.pagination.total) {
              this.$refs.agentsScroll.forceUpdate(true);
            } else {
              this.$refs.agentsScroll.forceUpdate(false);
            }
          }, true);
        } else {
          this.filters2.page += 1;
          FollowService.getFollowList(params, res => {
            this.filters2.page = res.meta.pagination.current_page;
            this.dataList2 = this.dataList2.concat(res.data);
            if (this.dataList2.length < res.meta.pagination.total) {
              this.$refs.agentsScroll.forceUpdate(true);
            } else {
              this.$refs.agentsScroll.forceUpdate(false);
            }
          }, false);
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .follow {
    display: flex;
    flex-direction: column;
    height: 100%;
    .search-wrap {
      padding: .2rem .28rem;
      .search-box {
        padding-left: .8rem;
        position: relative;
        height: .8rem;
        line-height: .8rem;
        font-size: 0.28rem;
        color: #B2B2B2;
        border: 1px solid #E8E8EA;
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
      }
    }
    .tabs {
      padding: 0 .28rem .2rem;
    }
    .control-wrap {
      display: flex;
      padding: .2rem .28rem;
      .mr28 {
        margin-right: .28rem;
      }
    }
    .app-body {
      position: relative;
      flex: 1;
      overflow: hidden;
    }
    .container-item {
      height: 100%;
    }
    .list {
      margin-top: .2rem;
      height: 100%;
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
    .collect-wrap {
      display: flex;
      .collect {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        flex-shrink: 0;
        width: 1.2rem;
        height: 1.74rem;
        background: rgba(15, 145, 131, 0.1);
      }
      .heart {
        &.on {
          background: url("../assets/images/heart-on.png") no-repeat;
          background-size: 100% 100%;
        }
        width: 0.36rem;
        height: 0.32rem;
        background: url("../assets/images/heart.png") no-repeat;
        background-size: 100% 100%;
      }
      .share {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../assets/images/share.png") no-repeat;
        background-size: 100% 100%;
      }
      .collect-del {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.8rem;
        height: 1.74rem;
        background: rgba(249, 245, 237, 1);
        .call-icon {
          width: 0.38rem;
          height: 0.38rem;
          background: url("../assets/images/s-call.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .item {
      height: 2.15rem;
      margin-bottom: 0.4rem;
      .item-cont {
        box-sizing: border-box;
        padding: 0 0.28rem;
        position: absolute;
        width: 100%;
      }
      .top {
        margin-bottom: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .top-l {
        display: flex;
        align-items: center;
        .cli {
          margin-right: 0.2rem;
          width: 1rem;
          height: 1rem;
          background: #DFDFDF 50% 50% no-repeat;
          background-size: cover;
          border-radius: 50%;
        }
        .det {
          display: flex;
          flex-direction: column;
        }
        .name {
          margin-bottom: 0.18rem;
          font-size: 0.32rem;
          color: #333;
        }
        .skill {
          font-size: 0.24rem;
          color: #B3B3B3;
        }
      }
      .top-r {
        display: flex;
        flex-direction: column;
        align-items: center;
        .follow-btn {
          font-size: 0.28rem;
          color: #B3B3B3;
          position: relative;
          padding: 0 .22rem;
          min-width: 1.2rem;
          max-width: 1.6rem;
          height: .6rem;
          line-height: .6rem;
          text-align: center;
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
        .follow-num {
          margin-top: 0.08rem;
          font-size: 0.24rem;
          color: #B3B3B3;
        }
      }
      .text1 {
        font-size: 0.24rem;
        color: #999;
        .sp {
          font-size: 0.28rem;
          color: #333;
        }
      }
      .text2 {
        font-weight: lighter;
        font-size: 0.24rem;
        line-height: 0.3rem;
        color: #B3B3B3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .collect-wrap {
      display: flex;
      &:last-of-type {
        margin-bottom: 0.8rem;
      }
      .collect-l {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.2rem;
        height: 2.15rem;
        background: rgba(15, 145, 131, 0.1);
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .collect-r {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.8rem;
        height: 2.15rem;
        background: #f9f5ed;
        .icon {
          display: block;
          width: 0.38rem;
          height: 0.38rem;
          background: url("../assets/images/s-call.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    .textali {
      font-size: 0.28rem;
      text-align: center;
      .modal-footer {
        display: flex;
      }
      .modal-btn {
        display: inline-block;
      }
      .keyword {
        color: #0F9183;
      }
    }
  }
</style>
