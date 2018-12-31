<template>
  <div class="details" :class="{ 'pb60': isMine }">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      帮住广场-{{ getSelecteds(DICT.house.trade2, trade)[0].label }}信息
    </div>
    <div class="content">
      <div class="banner"></div>
      <div class="card">
        <div class="card-top" :class="trade">
          <span class="title">公寓</span>
          <span class="date" :class="{ 'is-mine': isMine }">{{ created_at }}</span>
          <span class="share" v-if="isMine"></span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <div class="info-label">预算:</div>
            <div class="info-value">{{ budget_min }}-{{ budget_max }}{{ trade === 'sale' ? '万' : '' }}Peso</div>
          </div>
          <div class="info-row">
            <div class="info-label">区域:</div>
            <div class="info-value">{{ getSelecteds(DICT.region, region_ids).map(item => item.label).join('、') }}</div>
          </div>
          <div class="info-row" v-if="centiare_min !== 0 && centiare_max !== 0">
            <div class="info-label">面积:</div>
            <div class="info-value">{{ centiare_min }}-{{ centiare_max }}㎡</div>
          </div>
          <div class="info-row" v-if="bedroom.length !== 0">
            <div class="info-label">户型:</div>
            <div class="info-value">{{ getSelecteds(DICT.filters.bedroom, bedroom).map(item => item.label).join('、') }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">可入住时间:</div>
            <div class="info-value">{{ available_time_start }}-{{ available_time_end }}</div>
          </div>
          <div class="info-agent border-top" v-if="!isMine">
            <div class="portrait"></div>
            <div class="agent-txt">
              <div class="name">Govern</div>
              <div class="desc"><span>经纪人</span><span>语言：汉语/英语/韩语/日语</span></div>
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
      <a href="javascript:;" class="msg-btn">短信</a>
      <a href="javascript:;" class="phone-btn">电话</a>
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
        trade: 'sale',
        type: '',
        created_at: '',
        budget_min: '',
        budget_max: '',
        region_ids: [],
        bedroom: [],
        centiare_min: '',
        centiare_max: '',
        available_time_start: '',
        available_time_end: ''
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
      getData() {
        let userId = Storage.getLocalStorage('nest_user_id');
        WantsService.getDetailsById(this.liveId, res => {
          if (userId == res.data.user.id) {
            this.isMine = true;
          }
          this.trade = res.data.trade;
          this.created_at = res.data.created_at.split(' ')[0];
          this.budget_min = this.trade === 'sale' ? res.data.budget_min / 10000 : res.data.budget_min;
          this.budget_max = this.trade === 'sale' ? res.data.budget_max / 10000 : res.data.budget_max;
          this.region_ids = res.data.region_ids;
          this.bedroom = res.data.bedroom;
          this.centiare_min = res.data.centiare_min;
          this.centiare_max = res.data.centiare_max;
          this.available_time_start = res.data.available_time_start;
          this.available_time_end = res.data.available_time_end;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details {
    background-color: #fff;
    padding-bottom: 2rem;
    &.pb60 {
      padding-bottom: .6rem;
    }
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        border-radius: .2rem .2rem 0 0;
        &.sale {
          background-color: #D5BE88;
          .date {
            color: #FDECC3;
          }
        }
        &.rent {
          background-color: #8BB5DF;
          .date {
            color: #D5EAFF;
          }
        }
        .title {
          font-size: .46rem;
          font-weight: bold;
          color: #fff;
        }
        .date {
          font-size: .24rem;
          &.is-mine {
            width: 4.06rem;
          }
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
            background-color: #dfdfdf;
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
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      padding: 0 .68rem .6rem;
    }
    .control-bar {
      display: flex;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      font-size: .28rem;
      text-align: center;
      z-index: 1;
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
