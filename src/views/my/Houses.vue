<template>
  <div class="publish">
    <div class="top border-bottom">
      <div class="return" @click="$router.go(-1)"></div>
      我的发布
    </div>
    <nest-tab-container-item>
      <div class="control-wrap">
        <div class="control-btn" @click="typeModalFun">类型</div>
        <div class="control-btn active" @click="classifyModalFun">分类</div>
        <div class="control-btn" @click="followtimeModalFun">关注时间</div>
      </div>
    </nest-tab-container-item>
    <div class="the-time-list">
      <div class="the-time">今天</div>
      <nest-swipe-cell  v-for="(recommend,index) in recommends" :key="index">
        <div class="search-item"  slot="content">
          <div class="move-wrap">
            <div class="item-img"></div>
            <div class="msg-wrap">
              <div class="title">{{recommend.roomplace}}</div>
              <div class="type-wrap" v-if="recommend.roomsizes.constructor === Array">
                <div class="type" v-for="(roomsize,index) in recommend.roomsizes" :key="index">{{roomsize}}</div>
              </div>
              <div class="type-wrap" v-else="!recommend.roomsizes.constructor === Array">
                <div class="type-str">{{recommend.roomsizes}}</div>
              </div>
              <div class="rent" v-if="!recommend.rentsize">
                <div class="price">{{recommend.pricem}}</div>
                <div class="price-msg">P/月</div>
              </div>
              <div class="rent" v-else-if="recommend.rentsize">
                <div class="price">{{recommend.pricem}}</div>
                <div class="price-msg">P/㎡</div>
                <div class="room-size">{{recommend.rentsize}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="collect-wrap"  slot="controls">
          <div class="share-icon"></div>
        </div>
      </nest-swipe-cell>
    </div>
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

  </div>
</template>

<script>
  export default {
    name: "MyHouses",
    props: {
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
      }
    },
    data(){
      return {
        settleOpts: ['默认', '出租', '售卖'],
        settleShow: false,
        settleVal: '默认',
        classifyOpts: ['默认', '公寓', '别墅', '民居', '商铺/写字楼', '车位'],
        classifyShow: false,
        classifyVal: '默认',
        followtimeOpts: ['默认', '今天', '近三天', '近两周', '近一个月'],
        followtimeShow: false,
        followtimeVal: '默认'
      }
    },
    methods:{
      typeModalFun() {
        this.settleShow = !this.settleShow
      },
      classifyModalFun() {
        this.classifyShow = !this.classifyShow
      },
      followtimeModalFun() {
        this.followtimeShow = !this.followtimeShow
      }
    }
  }
</script>

<style lang="scss" scoped>
  .publish {

  }

  .top {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
    font-size: 0.32rem;
    color: #333333;
    .return {
      position: absolute;
      left: 0.28rem;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: 0.42rem;
      height: 0.32rem;
      background: url("../../assets/images/return-icon.png") no-repeat;
      background-size: 100%;
    }
  }

  .control-wrap {
    margin-top: 0.2rem;
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
  .the-time-list{
    margin-top: 0.6rem;
    .the-time{
      margin-left: 0.28rem;
      margin-bottom: 0.4rem;
      font-size:0.32rem ;
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
  .collect-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.2rem;
    height: 1.74rem;
    background:rgba(15,145,131,0.1);
    .share-icon{
      width: 0.38rem;
      height: 0.38rem;
      background: url("../../assets/images/share.png") no-repeat;
      background-size: 100%;
    }
  }
</style>
