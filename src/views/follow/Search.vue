<template>
  <div class="follow-list">
    <div class="title-wrap">
      <div class="re-icon" @click="$router.go(-1)"></div>
      <div class="search-box">
        <input class="search-msg" type="text" v-model="searchkey" >
        <div class="search-img" ></div>
        <div class="delete" v-if="deleteShow" @click="clearSearch"></div>
      </div>
    </div>
    <div class="result">共搜索到{{dataList.length}}条相关信息</div>
    <nest-scroll class="app-body"
                 ref="scroll"
                 :pullUpLoad="pullUpLoadObj"
                 @pullingUp="onPullingUp">
      <!--房租搜索结果-->
      <div class="search-list" v-if="deleteShow">
        <nest-swipe-cell  v-for="(recommend,index) in dataList" :key="index">
          <div class="search-item"  slot="content" @click="$router.push({ name: 'HouseDetails', params: { id: recommend.id } })">
            <div class="move-wrap">
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
              <div :class="recommend.favored?'heart on':'heart'" @click.stop="cancelFollow(recommend,index,'recommends')"></div>
              <div class="share" @click.stop="shareFun"></div>
            </div>
            <div class="collect-del">
              <a class="call-icon" :href="`tel:${recommend.user.phone}`"></a>
            </div>
          </div>
        </nest-swipe-cell>
      </div>
      <!--经纪人搜索结果-->
      <div class="peo-list"  v-if="!deleteShow">
        <nest-swipe-cell v-for="(item, index) in dataList" :key="index">
          <div class="item" slot="content" @click="$router.push({ path: `/follow/agent/${item.id}` }) ">
            <div class="item-cont">
              <div class="top">
                <div class="top-l">
                  <div class="cli" :style="{backgroundImage:'url('+item.avatar+')'}"></div>
                  <div class="det">
                    <div class="name">{{item.local_name}}</div>
                    <div class="skill">语言：
                      <span v-for="(language, i) in item.languages">{{language}}<span v-if="i!=item.languages.length-1">{{item.languages.length}}/</span></span>
                    </div>
                  </div>
                </div>
                <div class="top-r">
                  <div :class="item.favored?'follow-btn':'focus-btn'" @click.stop="cancelFollow(item,index,'peopleArr')">{{item.favored?'已关注':'关注'}}</div>
                  <div class="follow-num">{{item.follows}}人关注</div>
                </div>
              </div>
              <div class="text1">
                近一个月：出租 <span class="sp">{{item.monthly_rent_amount}}</span>套 &nbsp;售卖 <span class="sp">{{item.monthly_sold_amount}}</span> 套
              </div>
              <div class="text2">
                {{item.introduction}}
              </div>
            </div>
          </div>
          <div class="collect-wrap" slot="controls">
            <div class="collect-l" @click="shareShow=!shareShow">
              <img class="icon" src="../../assets/images/s-share.png" alt="">
            </div>
            <div class="collect-r">
              <a :href="`tel:${item.phone}`" class="icon"></a>
            </div>
          </div>
        </nest-swipe-cell>
      </div>
    </nest-scroll>
    <NestShare :status="shareShow" @close="shareShow = false"></NestShare>
  </div>
</template>

<script>
  import HouseService from '../../services/HouseService'
  import UserService from '../../services/UserService'
  import Utils from '../../utils/Utils';
  export default {
    name: "FollowSearch",
    props:{

    },
    mounted(){

    },
    data(){
      return {
        searchkey:'',
        deleteShow:false,
        shareShow:false,
        dataList:[],
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
            let params = {
              target_type:'house',
              target_id:item.id
            }
            UserService.cancelFavorites(params,()=>{})
            this.$toast.info('取消了')
          }else {
            item.favored = !item.favored
            let params = {
              target_type:'house',
              target_id:item.id,
              loading:false
            }
            UserService.addFavorites(params,()=>{})
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
            UserService.addFavorites(params,()=>{})
            this.$toast.info('关注了')
          }
          // this.peopleArr.splice(index, 1)
        }
      },
      clearSearch(){
        this.searchkey=''
      },
      onPullingUp(loading = false,type) {
          if(type == 1){
            this.deleteShow = true;
            let params = Utils.getEffectiveAttrsByObj(this.filters);
            if (loading) {
              this.filters.page = 1;
              HouseService.getList(params, res => {
                this.dataList = res.data;
                // this.$refs.scroll.scrollTo(0, 0, 300);
                this.$refs.scroll.forceUpdate(true);
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
          }else {
            this.deleteShow = false;
            let params = Utils.getEffectiveAttrsByObj(this.filters);
            if (loading) {
              this.filters.page = 1;
              UserService.getAgentList(params, res => {
                this.dataList = res.data;
                // this.$refs.scroll.scrollTo(0, 0, 300);
                this.$refs.scroll.forceUpdate(true);
              }, true);
            } else {
              this.filters.page += 1;
              UserService.getAgentList(params, res => {
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
    },
    watch:{
      searchkey(nextValue,prevValue){
        console.log(nextValue.trim(),prevValue.trim());
        let keywords = nextValue.trim();
        if (keywords == ''){
          return;
        }
        if (typeof keywords ==='string'){
          this.filters.keywords = keywords;
          this.onPullingUp(true,2);
        }else {
          this.filters.keywords = keywords;
          this.onPullingUp(true,1);
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  input {
    background: none;
    outline: none;
    border: 0;
    caret-color: #0f9183;
  }
  @mixin rowcenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .follow-list{
    display: flex;
    flex-direction: column;
    height: 100%;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .title-wrap{
      padding: 0.2rem 0.28rem;
      @include rowcenter;
      justify-content: space-between;
      .re-icon{
        width:0.42rem;
        height: 0.32rem;
        background: url("../../assets/images/return-icon.png") no-repeat;
        background-size: 100% 100%;
      }
      .search-box {
        position: relative;
        width: 6.04rem;
        height: 0.8rem;
        .delete{
          position: absolute;
          top: 50%;
          right: 0.25rem;
          margin-top: -0.16rem;
          width: 0.32rem;
          height: 0.32rem;
          background: url("../../assets/images/delete.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .search-msg {
        box-sizing: border-box;
        padding-left: 0.64rem;
        width: 100%;
        height: 100%;
        border: 1px solid #e8e8ea;
        border-radius: 0.1rem;
        box-shadow: 0 0 0.2rem rgba(176, 183, 187, 0.4);
        &:active {
          background-color: #e8e8ea;
        }
      }
      .search-img {
        position: absolute;
        top: 0.26rem;
        left: 0.2rem;
        width: 0.32rem;
        height: 0.32rem;
        background: url("../../assets/images/search-img.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .result{
      margin-top: 0.2rem;
      margin-left: 0.28rem;
      margin-bottom: 0.7rem;
      font-size: 0.28rem;
      color: #999999;
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
      &:last-of-type {
        margin-bottom: 0.8rem;
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
        &.on{
          background: url("../../assets/images/heart-on.png") no-repeat;
          background-size: 100% 100%;
        }
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
    .peo-list{
      .item{
        height: 2.15rem;
        margin-bottom: 0.4rem;
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
            background: #DFDFDF no-repeat 50% 50%;
            background-size: cover;
            border-radius: 50%;
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
          .focus-btn {
            position: relative;
            padding-left: .48rem;
            width: 1.28rem;
            height: .6rem;
            line-height: 0.6rem;
            border: .02rem solid #0f9183;
            border-radius: .1rem;
            font-size: .28rem;
            color: #0f9183;
            box-sizing: border-box;
            &::before {
              position: absolute;
              top: .16rem;
              left: .15rem;
              content: "";
              width: .24rem;
              height: .24rem;
              background: url('../../assets/images/icon-plus.png') no-repeat;
              background-size: 100% 100%;
            }
            &.disabled {
              padding-left: 0;
              text-align: center;
              color: #b2b2b2;
              border-color: #b2b2b2;
              &::before {
                display: none;
              }
            }
          }
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

      }
      .collect-wrap{
        display: flex;
        &:last-child{
          margin-bottom: 0.8rem;
        }
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
            display: block;
            width: 0.38rem;
            height: 0.38rem;
            background: url("../../assets/images/s-call.png") no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
</style>
