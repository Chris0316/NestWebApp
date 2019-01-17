<template>
  <div class="economic">
    <div class="ec-title">
      经纪人详情
      <div class="reback" @click="$router.go(-1)"></div>
    </div>
    <div class="item">
      <div class="item-cont">
        <div class="top">
          <div class="top-l">
            <div class="cli"></div>
            <div class="det">
              <div class="name">{{agentData.name}}</div>
              <div class="skill">语言：
                <span v-for="(language, i) in agentData.languages">{{language}}<span v-if="i!=agentData.languages.length-1">{{agentData.languages.length}}/</span></span>
              </div>
            </div>
          </div>
          <div class="top-r">
            <div class="follow-btn" :class="agentData.favored?'':'wblack'" @click.stop="cancelFollow(agentData)">{{agentData.favored?'已关注':'未关注'}}</div>
          </div>
        </div>
        <div class="text1">
          近一个月：出租 <span class="sp">{{agentData.monthly_rent_amount}}</span>套 &nbsp;售卖 <span class="sp">{{agentData.monthly_sold_amount}}</span> 套
        </div>
        <div class="text2">
          {{agentData.introduction}}
        </div>
      </div>
    </div>
    <div class="summary-warp">
      <div class="summary border-bottom">
        <div class="one">
          <div class="top">{{agentData.join_days}}天</div>
          <div class="bottom">加入时间</div>
        </div>
        <div class="one">
          <div class="top">{{agentData.house_count}}套</div>
          <div class="bottom">TA的房源</div>
        </div>
        <div class="one">
          <div class="top">{{agentData.follows}}人</div>
          <div class="bottom">关注人数</div>
        </div>
      </div>
    </div>
    <div class="star-wrap border-bottom">
      <div class="evaluate">用户评价</div>
      <div class="eval-stars"></div>
    </div>
    <div class="his-resour">
      <div class="resour-l">TA的房源</div>
      <nest-tab-bar class="tabs" v-model="tabSelected">
        <nest-tab-item id="ecrent">出租</nest-tab-item>
        <nest-tab-item id="ecsale">售卖</nest-tab-item>
      </nest-tab-bar>
    </div>

    <nest-tab-container class="app-body" v-model="tabSelected">
      <nest-tab-container-item class="container-item" id="ecrent">
        <nest-scroll class="scroll-body" :pullUpLoad="pullUpLoadObj"
                     @pullingUp="getMyDataRent"
                     ref="ecrent">
          <nest-swipe-cell  v-for="(recommend,index) in dataListRent" :key="index">
            <div class="search-item"  slot="content">
              <div class="move-wrap">
                <!--<div class="item-img" :style="{backgroundImage:'url(http://img0.imgtn.bdimg.com/it/u=1415442510)'}"></div>-->
                <div class="item-img" v-if="recommend.galleries instanceof Object"  :style="{backgroundImage:'url('+ imageUrl(recommend) +')'}"></div>
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
            <div class="collect-wrap"  slot="controls">
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

      <nest-tab-container-item class="container-item" id="ecsale">
        <nest-scroll class="scroll-body" :pullUpLoad="pullUpLoadObj"
                     @pullingUp="getMyDataSale"
                     ref="ecsale">
          <nest-swipe-cell  v-for="(recommend,index) in dataListSale" :key="index">
            <div class="search-item"  slot="content">
              <div class="move-wrap">
                <!--<div class="item-img" :style="{backgroundImage:'url(http://img0.imgtn.bdimg.com/it/u=1415442510)'}"></div>-->
                <div class="item-img" v-if="recommend.galleries instanceof Object"  :style="{backgroundImage:'url('+ imageUrl(recommend) +')'}"></div>
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
            <div class="collect-wrap"  slot="controls">
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
    </nest-tab-container>
    <div class="foot-end">
      <div class="end-item" @click="shareShow=!shareShow">
        <img class="share-icon" src="../../assets/images/share.png" alt="">
      </div>
      <div class="end-item center" :href="`sms:${agentData.phone}`">短信咨询</div>
      <a class="end-item last" :href="`tel:${agentData.phone}`">电话咨询</a>
    </div>
    <NestShare :status="shareShow" @close="shareShow = false"></NestShare>
  </div>
</template>

<script>
  import UserService from '../../services/UserService'
  import Utils from '../../utils/Utils';
  export default {
    name: "FollowAgent",
    props:{
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
      },
    },
    mounted(){
      UserService.getAgentInfo(this.id,(res)=>{
        this.agentData = res.data
      })
      // UserService.getAgentInfoHouses(this.id,)
      this.getMyDataRent(false)
      this.getMyDataSale(false)
    },
    data(){
      return {
        tabSelected:'ecrent',
        agentData:{},
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
        dataListRent:[],
        dataListSale:[],
        shareShow:false,
        id:this.$route.params.id,
      }
    },
    methods: {
      imageUrl(item) {
        if (item.galleries.data.length > 0) {
          return item.galleries.data[0].url;
        } else {
          return require('../../assets/images/preview-default.png');
        }
      },
      shareFun(){
        this.shareShow = !this.shareShow
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
            this.$toast.info('取消了')
          }else {
            item.favored = !item.favored
            this.$toast.info('收藏了')
          }
          // this.peopleArr.splice(index, 1)
        }
      },
      getMyDataRent(loading = false, callback) {
        this.filters.trade='rent'
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          UserService.getAgentInfoHouses(this.id,params, res => {
            this.dataListRent = res.data;
            this.$refs.ecrent.scrollTo(0, 0, 300);
            if (this.dataListRent.length < res.meta.pagination.total) {
              this.$refs.ecrent.forceUpdate(true);
            } else {
              this.$refs.ecrent.forceUpdate(false);
            }
            if (callback)
              callback();
          });
        } else {
          this.filters.page += 1;
          UserService.getAgentInfoHouses(this.id,params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataListRent = this.dataListRent.concat(res.data);
            if (this.dataListRent.length < res.meta.pagination.total) {
              this.$refs.ecrent.forceUpdate(true);
            } else {
              this.$refs.ecrent.forceUpdate(false);
            }
            if (callback)
              callback();
          });
        }
      },
      getMyDataSale(loading = false, callback) {
        this.filters.trade='sale'
        let params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          UserService.getAgentInfoHouses(this.id,params, res => {
            this.dataListSale = res.data;
            this.$refs.ecsale.scrollTo(0, 0, 300);
            if (this.dataListSale.length < res.meta.pagination.total) {
              this.$refs.ecsale.forceUpdate(true);
            } else {
              this.$refs.ecsale.forceUpdate(false);
            }
            if (callback)
              callback();
          });
        } else {
          this.filters.page += 1;
          UserService.getAgentInfoHouses(this.id,params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataListSale = this.dataListSale.concat(res.data);
            if (this.dataListSale.length < res.meta.pagination.total) {
              this.$refs.ecsale.forceUpdate(true);
            } else {
              this.$refs.ecsale.forceUpdate(false);
            }
            if (callback)
              callback();
          });
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.economic{
  .ec-title{
    position: relative;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: 0.32rem;
    color: #333333;
    .reback{
      position: absolute;
      top: 50%;
      left: 0.28rem;
      transform: translate3d(0,-50%,0);
      width: 0.42rem;
      height: 0.32rem;
      background: url("../../assets/images/return-icon.png") no-repeat;
      background-size: 100%;
    }
  }
  .item{
    position: relative;
    height: 2.1rem;
    margin-bottom: 0.4rem;
    &:last-child{
      margin-bottom: 0.8rem;
    }
    .item-cont{
      box-sizing: border-box;
      padding: 0 0.28rem;
      position: absolute;
      width: 100%;
    }
    .top{
      margin-bottom: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .top-l{
      display: flex;
      align-items: center;
      .cli{
        margin-right: 0.2rem;
        width: 1rem;
        height: 1rem;
        background-color: #DFDFDF;
        border-radius: 50%;
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
      }
      .det{
        display: flex;
        flex-direction:column;
      }
      .name{
        margin-bottom: 0.18rem;
        font-size: 0.32rem;
        color: #333;
      }
      .skill{
        font-size: 0.24rem;
        color: #B3B3B3;
      }
    }
    .top-r{
      display: flex;
      flex-direction:column ;
      align-items: center;
      .follow-btn{
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
      .follow-num{
        margin-top: 0.08rem;
        font-size: 0.24rem;
        color: #B3B3B3;
      }
    }
    .text1{
      font-size: 0.24rem;
      color: #999;
      .sp{
        font-size: 0.28rem;
        color: #333;
      }
    }
    .text2{
      font-weight: lighter;
      font-size: 0.24rem;
      line-height: 0.3rem;
      color: #B3B3B3;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .collect-wrap{
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;
      .collect-l{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.2rem;
        height: 2.15rem;
        background: #e2ebe2;
        .icon{
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .collect-r{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.8rem;
        height: 2.15rem;
        background: #f9f5ed;
        .icon{
          width: 0.38rem;
          height: 0.38rem;
        }
      }
    }
  }
  .summary-warp{
    .summary{
      margin-left: 0.28rem;
      margin-right: 0.28rem;
      padding-bottom: 0.4rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      /*border-bottom: 1px solid #F2F2F2;*/
    }
    .one{
      display: flex;
      flex-direction: column;
      align-items: center;
      .top{
margin-bottom: 0.18rem;
        font-size: 0.32rem;
        color: #0F9183;
      }
      .bottom{
        font-size: 0.24rem;
        color: #B3B3B3;
      }
    }
  }
  .star-wrap{
    margin-left: 0.28rem;
    margin-right: 0.28rem;
    height: 1.06rem;
    display: flex;
    align-items: center;
    .evaluate{
      color: #222222;
      font-size: 0.28rem;
    }
  }
  .his-resour{
    margin: 0.42rem 0.28rem 0.54rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .resour-l{
      color: #333333;
      font-size: 0.46rem;
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
    &:last-of-type {
      margin-bottom: 1rem;
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
    .collect-del {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.8rem;
      height: 1.74rem;
      background:rgba(249,245,237,1);
      .call-icon{
        width: 0.38rem;
        height: 0.38rem;
        background: url("../../assets/images/s-call.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .foot-end{
    position: fixed;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    display: flex;
    z-index: 2;
    .end-item{
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 1rem;
      background: #fff;
      .share-icon{
        width: 0.38rem;
        height: 0.38rem;
      }
    }
    .center{
      font-size: 0.28rem;
      color: #fff;
      background: #F99C91;
    }
    .last{
      font-size: 0.28rem;
      color: #fff;
      background: #0F9183;
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
  .scroll-body {
    height:4.8rem;
  }
}
</style>
