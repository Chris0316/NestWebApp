<template>
  <div class="follow">
    <div class="search" @click="$router.push({path:'/follow/list'})">
      <div class="search-img"></div>
      <div class="search-text">搜索经纪人或房源编号</div>
    </div>
    <div class="tabs">
      <nest-tab-bar class="tab-wrap" v-model="tabSelected">
        <nest-tab-item id="houseres">房源</nest-tab-item>
        <nest-tab-item id="econman">经纪人</nest-tab-item>
      </nest-tab-bar>
    </div>
    <nest-tab-container v-model="tabSelected">
      <nest-tab-container-item id="houseres">
        <div class="control-wrap">
          <div class="control-btn" @click="typeModalFun">类型</div>
          <div class="control-btn active" @click="classifyModalFun">分类</div>
          <div class="control-btn" @click="followtimeModalFun">关注时间</div>
        </div>
      </nest-tab-container-item>
      <nest-tab-container-item id="econman">
        <div class="control-wrap">
          <div class="control-btn" @click="followtimeModalFun">关注时间</div>
        </div>
      </nest-tab-container-item>
    </nest-tab-container>
    <nest-tab-container class="wrap-out" v-model="tabSelected">
      <nest-tab-container-item class="wrap-in" id="houseres">
        <nest-scroll class="app-body"
                     ref="scrollHouses"
                     :pullUpLoad="pullUpLoadObj"
                     @pullingUp="onPullingUpHouses">
          <nest-swipe-cell v-for="(recommend,index) in recommends" :key="index">
            <div class="search-item" slot="content">
              <div class="move-wrap">
                <!--<div class="item-img" :style="{backgroundImage:'url(http://img0.imgtn.bdimg.com/it/u=1415442510)'}"></div>-->
                <div class="item-img" :style="{backgroundImage:'url('+ imageUrl(recommend) +')'}"></div>
                <div class="msg-wrap">
                  <div class="title">{{recommend.building_name}}</div>
                  <div class="type-wrap" v-if="recommend.trade == 'rent'">
                    <div class="type" v-for="(feature,index) in recommend.features" :key="index">{{feature}}</div>
                  </div>
                  <div class="type-wrap" v-else="recommend.trade != 'rent'">
                    <div class="type-str">{{recommend.address}}</div>
                  </div>
                  <div class="rent" v-if="recommend.trade == 'rent'">
                    <div class="price">{{recommend.price}}</div>
                    <div class="price-msg">P/月</div>
                  </div>
                  <div class="rent" v-else-if="recommend.trade == 'sale'">
                    <div class="price">{{recommend.price}}</div>
                    <div class="price-msg">P/㎡</div>
                    <div class="room-size">{{recommend.centiare}} ㎡</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="collect-wrap" slot="controls">
              <div class="collect">
                <div class="heart" @click.stop="cancelFollow(recommend,index,'recommends')"></div>
                <div class="share" @click.stop="shareFun"></div>
              </div>
              <div class="collect-del">
                <a class="call-icon" :href="`tel:${recommend.user.phone}`"></a>
              </div>
            </div>
          </nest-swipe-cell>
        </nest-scroll>
      </nest-tab-container-item>
      <nest-tab-container-item class="wrap-in" id="econman">
        <nest-scroll class="app-body"
                     ref="scrollEconman"
                     :pullUpLoad="pullUpLoadObj"
                     @pullingUp="onPullingUpEconman">
          <nest-swipe-cell v-for="(item, index) in peopleArr" :key="index">
            <div class="item" slot="content" @click="$router.push({ path: `/follow/agent/${item.id}` }) ">
              <div class="item-cont">
                <div class="top">
                  <div class="top-l">
                    <div class="cli" :style="{backgroundImage:'url('+item.avatar+')'}"></div>
                    <div class="det">
                      <div class="name">{{item.local_name}}</div>
                      <div class="skill">语言：
                        <span v-for="(language, i) in item.languages">{{language}}<span
                          v-if="i!=item.languages.length-1">{{item.languages.length}}/</span></span>
                      </div>
                    </div>
                  </div>
                  <div class="top-r">
                    <div class="follow-btn" :class="item.favored?'':'wblack'" @click.stop="cancelFollow(item,index,'peopleArr')">{{item.favored?'已关注':'未关注'}}</div>
                    <div class="follow-num">{{item.follows}}人关注</div>
                  </div>
                </div>
                <div class="text1">
                  近一个月：出租 <span class="sp">{{item.monthly_rent_amount}}</span>套 &nbsp;售卖 <span class="sp">{{item.monthly_sold_amount}}</span>
                  套
                </div>
                <div class="text2">
                  {{item.introduction}}
                </div>
              </div>
            </div>
            <div class="collect-wrap" slot="controls">
              <div class="collect-l" @click="shareShow=!shareShow">
                <img class="icon" src="../assets/images/s-share.png" alt="">
              </div>
              <div class="collect-r">
                <a :href="`tel:${item.phone}`" class="icon"></a>
              </div>
            </div>
          </nest-swipe-cell>
        </nest-scroll>
      </nest-tab-container-item>
    </nest-tab-container>
    <nest-nav page="follow"></nest-nav>
    <!--关注时间-->
    <!--followtime-->
    <nest-modal title="关注时间" :has-clear="false" :has-footer="false" @close="followtimeShow = false"
                :status="followtimeShow">
      <nest-radio v-model="followtimeVal" :count-in-row="1" :options="followtimeOpts"></nest-radio>
    </nest-modal>
    <!--分类-->
    <!--classify-->
    <nest-modal title="分类" :has-clear="false" :has-footer="false" @close="classifyShow = false"
                :status="classifyShow">
      <nest-radio v-model="classifyVal" :count-in-row="1" :options="classifyOpts"></nest-radio>
    </nest-modal>
    <!--类型-->
    <nest-modal title="类型" :has-clear="false" :has-footer="false" @close="settleShow = false" :status="settleShow">
      <nest-radio v-model="settleVal" :count-in-row="1" :options="settleOpts"></nest-radio>
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
  import HouseService from '../services/HouseService'
  import UserService from '../services/UserService'
  import Utils from '../utils/Utils';
  import NestScroll from "../components/commons/NestScroll/NestScroll";

  export default {
    components: {NestScroll},
    name: "Follow",
    props: {
      housesList: {
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
        tabSelected: 'econman',
        peopleArr: [],
        houseArr: [],
        settleOpts: ['默认', '出租', '售卖'],
        settleShow: false,
        settleVal: '默认',
        classifyOpts: ['默认', '公寓', '别墅', '民居', '商铺/写字楼', '车位'],
        classifyShow: false,
        classifyVal: '默认',
        followtimeOpts: ['默认', '今天', '近三天', '近两周', '近一个月'],
        followtimeShow: false,
        followtimeVal: '默认',
        recommends: null,
        shareShow: false,
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
    created() {
      this.onPullingUpHouses(true)
      this.onPullingUpEconman(true)
    },
    methods: {
      typeModalFun() {
        this.settleShow = !this.settleShow
      },
      classifyModalFun() {
        this.classifyShow = !this.classifyShow
      },
      followtimeModalFun() {
        this.followtimeShow = !this.followtimeShow
      },
      imageUrl(item) {
        if (item.galleries.data.length > 0) {
          return item.galleries.data[0].url;
        } else {
          return require('../assets/images/preview-default.png');
        }
      },
      cancelFollow(item, index, list) {
        if (list == 'recommends') {
          if (item.favored == true){
            item.favored = !item.favored
            this.$toast.info('取消了')
          }else {
            item.favored = !item.favored
            this.$toast.info('收藏了')
          }
          // this.recommends.splice(index, 1)
        } else {
          if (item.favored == true){
            item.favored = !item.favored
            let params = {
              target_type:'user',
              target_id:item.id
            }
            UserService.cancelFavorites(params,()=>{})
            this.$toast.info('取消了')
          }else {
            item.favored = !item.favored
            let params = {
              target_type:'user',
              target_id:item.id
            }
            UserService.addFavorites(params)
            this.$toast.info('关注了')
          }
          // this.peopleArr.splice(index, 1)
        }
      },
      shareFun() {
        this.shareShow = !this.shareShow
      },
      onPullingUpHouses(loading = false, callback) {
        this.deleteShow = true;
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          HouseService.getList(params, res => {
            this.recommends = res.data;
            this.$refs.scrollHouses.scrollTo(0, 0, 300);
            this.$refs.scrollHouses.forceUpdate(true);
          }, true);
        } else {
          this.filters.page += 1;
          HouseService.getList(params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.recommends = this.recommends.concat(res.data);
            if (this.recommends.length < res.meta.pagination.total) {
              this.$refs.scrollHouses.forceUpdate(true);
            } else {
              this.$refs.scrollHouses.forceUpdate(false);
            }
          }, false);
        }
      },
      onPullingUpEconman(loading = false, callback) {
        this.deleteShow = false;
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          UserService.getAgentList(params, res => {
            this.peopleArr = res.data;
            this.$refs.scrollEconman.scrollTo(0, 0, 300);
            this.$refs.scrollEconman.forceUpdate(true);
          }, true);
        } else {
          this.filters.page += 1;
          UserService.getAgentList(params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.peopleArr = this.peopleArr.concat(res.data);
            if (this.peopleArr.length < res.meta.pagination.total) {
              this.$refs.scrollEconman.forceUpdate(true);
            } else {
              this.$refs.scrollEconman.forceUpdate(false);
            }
          }, false);
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  input {
    background: none;
    outline: none;
    border: 0px;
  }

  .follow {
    display: flex;
    flex-direction: column;
    height: 100%;
    .search {
      position: relative;
      flex-shrink: 0;
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
      display: flex;
      align-items: center;
      margin: 0.2rem auto 0.4rem;
      width: 6.94rem;
      height: 0.8rem;
      border: 1px solid #E8E8EA;
      border-radius: 0.1rem;
      box-shadow: 0px 0px 0.2rem rgba(176, 183, 187, 0.4);
      .search-img {
        margin-left: 0.24rem;
        margin-right: 0.3rem;
        width: 0.32rem;
        height: 0.32rem;
        background: url("../assets/images/search-img.png") no-repeat;
        background-size: 100% 100%;
      }
      .search-text {
        font-size: 0.28rem;
        color: #B2B2B2;
      }
    }
    .tabs {
      margin-bottom: 0.4rem;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      .tab-wrap {
        margin-left: 0.28rem;
      }
    }
    .control-wrap {
      margin-bottom: 0.7rem;
      position: relative;
      margin-left: .28rem;
      display: flex;
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
    }
    .wrap-out{
      flex: 1;
      overflow: hidden;
    }
    .wrap-in{
      height: 100%;
    }
    .app-body {
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
          background: #DFDFDF;
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
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
        .wblack{
          color: #333;
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
