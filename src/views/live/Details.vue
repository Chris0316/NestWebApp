<template>
  <div class="details" v-if="live">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      帮住广场-{{ getSelecteds(DICT.house.trade2, live.trade)[0].label }}信息
    </div>
    <div class="content">
      <div class="banner"></div>
      <div class="card">
        <div class="card-top" :class="live.trade">
          <div class="line-main border-bottom">
            <span class="title-main">{{ getSelecteds(DICT.house.type2, live.type)[0].label }}</span>
            <span class="title-sub">{{ getSubTitle() }}</span>
            <span class="share" v-if="isMine"></span>
          </div>
          <div class="line-sub">{{ live.created_at | dateFormat('yyyy-MM-dd') }}</div>
        </div>
        <div class="card-body">
          <div class="info-row">
            <div class="info-label">预算:</div>
            <div class="info-value">{{ live.trade === 'sale' ? live.budget_min / 10000 : live.budget_min }}-{{ live.trade === 'sale' ? live.budget_max / 10000 : live.budget_max }}{{ live.trade === 'sale' ? '万' : '' }}Peso</div>
          </div>
          <div class="info-row">
            <div class="info-label">区域:</div>
            <div class="info-value">{{ getSelecteds(DICT.region, live.region_ids).map(item => item.label).join('、') }}</div>
          </div>
          <div class="info-row" v-if="live.centiare_min !== 0 && live.centiare_max !== 0">
            <div class="info-label">面积:</div>
            <div class="info-value">{{ live.centiare_min }}-{{ live.centiare_max }}㎡</div>
          </div>
          <div class="info-row" v-if="live.bedroom && live.bedroom.length !== 0">
            <div class="info-label">户型:</div>
            <div class="info-value">{{ getSelecteds(DICT.filters.bedroom, live.bedroom).map(item => item.label).join('、') }}</div>
          </div>
          <div class="info-row" v-if="live.available_time">
            <div class="info-label">可入住时间:</div>
            <div class="info-value">{{ live.available_time | dateFormat('yyyy-MM-dd') }}</div>
          </div>
          <div class="info-row" v-if="live.description">
            <div class="info-label">其他需求:</div>
            <div class="info-value">{{ live.description }}</div>
          </div>
          <div class="info-agent border-top" v-if="!isMine">
            <div class="portrait" :style="{ backgroundImage: 'url(' + live.user.avatar + ')'}"></div>
            <div class="agent-txt">
              <div class="name">{{ live.user.name }}</div>
              <div class="desc"><span>{{ getSelecteds(DICT.user.is_agent, live.user.is_agent)[0].label }}</span><span>语言：{{ getSelecteds(DICT.languages, live.user.languages).join('/') }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-wrapper" v-if="isMine">
      <nest-button type="primary" size="full" @click="$router.push({ name: 'LivePublish' })">发布新的帮住</nest-button>
    </div>
    <div class="control-bar" v-else>
      <div class="controls">
        <a href="javascript:;" class="favorite"></a>
        <a href="javascript:;" class="share"></a>
      </div>
      <a href="javascript:;" class="msg-btn">短信咨询</a>
      <a href="javascript:;" class="phone-btn">电话咨询</a>
    </div>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from "../../configs/DICT";
  import WantsService from '../../services/WantsService';
  import Storage from "../../utils/Storage";

  export default {
    name: "MyDetails",
    data() {
      return {
        isMine: false,
        live: null
      }
    },
    created() {
      this.initConsts();
    },
    mounted() {
      this.getData();
    },
    methods: {
      initConsts() {
        let params = this.$route.params;
        if (params) {
          this.liveId = params.id;
        }
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
      },
      getSubTitle() {
        let arr = getSelecteds(DICT.house.type2, this.live.type).map(item => item.label);
        arr.shift();
        if (arr.length > 0) {
          return '·' + arr.join('·');
        } else {
          return '';
        }
      },
      getData() {
        let userId = Storage.getLocalStorage('nest_user_id');
        WantsService.getDetailsById(this.liveId, res => {
          if (userId == res.data.user.id) {
            this.isMine = true;
          }
          this.live = res.data;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details {
    display: flex;
    flex-direction: column;
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
    .content {
      flex: 1;
      padding: .2rem .28rem 0;
    }
    .banner {
      font-size: .28rem;
      color: #333;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      border-radius: .2rem;
      background: url('../../assets/images/live/live-details-adv.png') no-repeat;
      background-size: 100% 100%;
    }
    .card {
      margin-top: .2rem;
      border-radius: .2rem;
      box-shadow:1px .04rem .28rem 0 rgba(182,185,186,0.3);
      .card-top {
        padding: 0 .4rem;
        border-radius: .2rem .2rem 0 0;
        &.sale {
          background-color: #D5BE88;
          .line-sub {
            color: #FDECC3;
          }
        }
        &.rent {
          background-color: #8BB5DF;
          .line-sub {
            color: #D5EAFF;
          }
        }
        .line-main {
          display: flex;
          align-items: center;
          height: .9rem;
          &.border-bottom {
            &::after {
              border-bottom-color: #fff;
            }
          }
        }
        .line-sub {
          display: flex;
          align-items: center;
          height: .6rem;
          font-size: .24rem;
        }
        .title-main {
          font-size: .46rem;
          font-weight: bold;
          color: #fff;
        }
        .title-sub {
          flex: 1;
          margin-left: .2rem;
          font-size: .28rem;
          color: #fff;
        }
        .share {
          width: .38rem;
          height: .38rem;
          background: url('../../assets/images/live/share-white.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .card-body {
        padding: .2rem .4rem;
        .info-row {
          display: flex;
          line-height: .64rem;
          font-size: .28rem;
        }
        .info-label {
          padding-right: .2rem;
          width: 1.6rem;
          color: #b3b3b3;
          text-align: right;
        }
        .info-value {
          color: #333;
          flex: 1;
        }
        .info-agent {
          margin-top: .2rem;
          padding: .4rem 0 .2rem;
          display: flex;
          .portrait {
            margin-right: .2rem;
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            background: center center no-repeat;
            background-size: cover;
          }
          .agent-txt {
            padding: .16rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            line-height: 1;
            .name {
              font-size: .32rem;
              color: #333;
            }
            .desc {
              font-size: .24rem;
              color: #b3b3b3;
              span {
                margin-right: .4rem;
              }
            }
          }
        }
      }
    }
    .btn-wrapper {
      padding: 0 .68rem .6rem;
    }
    .control-bar {
      display: flex;
      background-color: #fff;
      font-size: .28rem;
      text-align: center;
      box-shadow: 0 -1px 5px 0 rgba(234,234,234,1);
      .controls {
        flex: 1;
        font-size: 0;
        text-align: left;
        line-height: 1rem;
        .favorite {
          margin: 0 .6rem 0 .65rem;
          display: inline-block;
          vertical-align: middle;
          width: .42rem;
          height: .38rem;
          background: url("../../assets/images/favorite.png") no-repeat;
          background-size: 100% 100%;
        }
        .share {
          display: inline-block;
          vertical-align: middle;
          width: .38rem;
          height: .38rem;
          background: url("../../assets/images/share.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .msg-btn {
        display: block;
        width: 2.4rem;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        background-color: #f99c91;
      }
      .phone-btn {
        display: block;
        width: 2.4rem;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        background-color: #0F9183;
      }
    }
  }
</style>
