<template>
  <div class="agent">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      经纪人详情
    </div>
    <nest-scroll ref="scroll"
                 class="app-body">
      <div class="user-info">
        <div class="agent-base">
          <div class="portrait" :style="{ backgroundImage: 'url(' + agent.avatar + ')'}"></div>
          <div class="agent-info">
            <div class="agent-name">{{ agent.name }}</div>
            <div class="agent-desc">
              <span>语言：{{ getSelecteds(DICT.languages, agent.languages).join('/') }}</span>
            </div>
          </div>
          <div class="focus-btn" :class="{ disabled: agent.favored }">{{ agent.favored ? '已关注' : '关注' }}</div>
        </div>
        <div class="deal-info">近一个月: 出租<span class="hl">{{ agent.monthly_rent_amount }}</span>套 售卖<span class="hl">{{ agent.monthly_sold_amount }}</span>套</div>
        <div class="agent-sign">{{ agent.introduction }}</div>
        <div class="agent-sec border-bottom">
          <div class="agent-cell">
            <div class="main">{{ agent.join_days }}天</div>
            <div class="sub">加入时间</div>
          </div>
          <div class="agent-cell">
            <div class="main">{{ agent.house_count }}套</div>
            <div class="sub">TA的房源</div>
          </div>
          <div class="agent-cell">
            <div class="main">{{ agent.follows }}人</div>
            <div class="sub">关注人数</div>
          </div>
        </div>
        <!--<div class="star-wrap border-bottom">-->
        <!--<div class="evaluate">用户评价</div>-->
        <!--<div class="eval-stars"></div>-->
        <!--</div>-->
        <div class="resources">
          <div class="left">TA的房源</div>
          <div class="right">
            <nest-tab-bar class="tabs" v-model="tabSelected" align="right">
              <nest-tab-item id="rent">出租</nest-tab-item>
              <nest-tab-item id="sale">售卖</nest-tab-item>
            </nest-tab-bar>
          </div>
        </div>
      </div>
      <nest-tab-container class="house-info" v-model="tabSelected">
        <nest-tab-container-item id="rent">
          <nest-swipe-cell v-for="item in rentList" :key="item.id">
            <div class="search-item" slot="content" @click="$router.push({ name: 'ExploreDetails', params: { id: item.id }})">
              <div class="move-wrap">
                <div class="item-img" :style="{ backgroundImage: 'url(' + imageUrl(item) + ')'}"></div>
                <div class="msg-wrap">
                  <div class="title">{{ item.building_name }}</div>
                  <div class="type-wrap" v-if="matchCustomType(item) === 'new'">
                    <div class="type-str">{{ item.address }}</div>
                  </div>
                  <div class="type-wrap" v-else>
                    <div class="type" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</div>
                  </div>
                  <div class="rent">
                    <div class="price" v-if="matchCustomType(item) === 'new' || matchCustomType(item) === 'rent'">{{ item.price }}</div>
                    <div class="price" v-else>{{ item.total_amount / 10000 }}</div>
                    <div class="price-msg" v-if="matchCustomType(item) === 'new'">P/㎡</div>
                    <div class="price-msg" v-else-if="matchCustomType(item) === 'rent'">P/月</div>
                    <div class="price-msg" v-else>万</div>
                    <div class="room-size" v-if="matchCustomType(item) === 'new'">{{ item.centiare }} ㎡</div>
                    <div class="room-size" v-else-if="matchCustomType(item) === 'second'">{{ item.price }} P/㎡</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="collect" slot="controls">
              <div class="heart" :class="item.favored ? 'on' : ''" @click="doFollow(item)"></div>
              <div class="share" @click="doShare"></div>
            </div>
            <!--<div slot="controls" class="collect-wrap" v-if="filters.status === 1">-->
              <!--<div class="share"></div>-->
              <!--<div class="cancel" @click="updateStatus(item.id, 0)"></div>-->
            <!--</div>-->
            <!--<div slot="controls" class="collect-wrap" v-else>-->
              <!--<div class="publish" @click="updateStatus(item.id, 1)"></div>-->
              <!--<div class="delete"></div>-->
            <!--</div>-->
          </nest-swipe-cell>
        </nest-tab-container-item>
        <nest-tab-container-item id="sale">
          <nest-swipe-cell v-for="item in saleList" :key="item.id">

          </nest-swipe-cell>
        </nest-tab-container-item>
      </nest-tab-container>
    </nest-scroll>
    <div class="control-bar">
      <div class="controls">
        <a href="javascript:;" class="share" @click="shareShow = !shareShow"></a>
      </div>
      <a :href="'sms:' + agent.phone" class="control-btn info">短信咨询</a>
      <a :href="'tel:' + agent.phone" class="control-btn primary">电话咨询</a>
    </div>
    <NestShare :status="shareShow" @close="shareShow = false"></NestShare>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from "../../configs/DICT";
  import Utils from '../../utils/Utils';
  import UserService from '../../services/UserService';
  import HouseService from "../../services/HouseService";
  import PreviewDefaultImg from '../../assets/images/preview-default.png';

  export default {
    name: "FollowAgent",
    data() {
      return {
        tabSelected: 'rent',
        shareShow: false,
        agent: {},
        rentList: [],
        saleList: []
      }
    },
    created() {
      this.initConsts();
    },
    mounted() {
      this.getAgentInfo();
      this.getRentData();
    },
    methods: {
      initConsts() {
        let params = this.$route.params;
        if (params) {
          this.agentId = params.id;
        }
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
        this.matchCustomType = Utils.matchCustomType;
      },
      getAgentInfo() {
        UserService.getAgentInfo(this.agentId, res => {
          this.agent = res.data;
        });
      },
      imageUrl(item) {
        return item.cover ? item.cover : PreviewDefaultImg;
      },
      getRentData() {
        HouseService.getHousesByUserId(this.agentId, {
          trade: 'rent'
        }, res => {
          this.rentList = res.data;
        })
      },
      doFollow(item) {},
      doShare() {}
    }
  }
</script>

<style lang="scss" scoped>
  .agent {
    display: flex;
    flex-direction: column;
    height: 100%;
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
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .user-info {
      padding: 0 .28rem;
    }
    .agent-base {
      margin: .4rem 0 .26rem;
      display: flex;
      width: 100%;
      align-items: center;
      .portrait {
        margin-right: .2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #dfdfdf center center no-repeat;
        background-size: cover;
      }
      .agent-info {
        flex: 1;
        .agent-name {
          font-size: .32rem;
          color: #333;
          line-height: 1;
        }
        .agent-desc {
          margin-top: .18rem;
          font-size: 0;
          color: #b3b3b3;
          line-height: 1;
          span {
            font-size: .24rem;
          }
          .type {
            margin-right: .35rem;
          }
        }
      }
      .focus-btn {
        position: relative;
        padding-left: .48rem;
        width: 1.2rem;
        height: .54rem;
        line-height: .5rem;
        border: .02rem solid #0f9183;
        border-radius: .1rem;
        font-size: .28rem;
        color: #0f9183;
        box-sizing: border-box;
        &::before {
          position: absolute;
          top: .13rem;
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
    }
    .deal-info {
      font-size: .24rem;
      color: #999;
      .hl {
        margin: 0 .05rem;
        font-weight: bold;
        color: #333;
      }
    }
    .agent-sign {
      font-size: .24rem;
      color: #b3b3b3;
      line-height: .36rem;
    }
    .agent-sec {
      margin-top: .28rem;
      display: flex;
    }
    .agent-cell {
      padding: .4rem 0;
      flex: 1;
      text-align: center;
      .main {
        font-size: .32rem;
        font-weight: bold;
        color: #0F9183;
      }
      .sub {
        margin-top: .18rem;
        font-size: .24rem;
        color: #b3b3b3;
      }
    }
    .resources {
      margin-top: .3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-size: .46rem;
        color: #333;
        font-weight: bold;
      }
      .right {
        display: flex;
        font-size: 0.28rem;
        color: #999999;
      }
    }
    .house-info {
      margin-top: .3rem;
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
      &.on {
        background: url("../../assets/images/heart-on.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .share {
      width: 0.3rem;
      height: 0.3rem;
      background: url("../../assets/images/share.png") no-repeat;
      background-size: 100% 100%;
    }
    .control-bar {
      display: flex;
      background-color: #fff;
      font-size: .28rem;
      text-align: center;
      box-shadow: 0 -1px 5px 0 rgba(234,234,234,1);
      .controls {
        padding: 0 .25rem;
        display: flex;
        justify-content: space-around;
        flex: 1;
        align-items: center;
        .share {
          width: .38rem;
          height: .38rem;
          background: url("../../assets/images/share.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .control-btn {
        display: block;
        width: 2.4rem;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        &.primary {
          background-color: #0F9183;
        }
        &.info {
          background-color: #f99c91;
        }
      }
    }
  }
</style>
