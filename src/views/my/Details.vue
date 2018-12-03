<template>
  <div class="details" :class="pageType">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      {{ title }}
    </div>
    <div class="content">
      <div class="banner">给我您的需求，帮您淘满意的房子</div>
      <div class="card">
        <div class="card-top" :class="detailsType">
          <span class="title">公寓</span>
          <span class="date" :class="pageType">2018-08-19</span>
          <span class="share" v-if="pageType === 'my'"></span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <div class="info-label">预算:</div>
            <div class="info-value">400-500万Peso</div>
          </div>
          <div class="info-row">
            <div class="info-label">区域:</div>
            <div class="info-value">马卡提 (Makati)</div>
          </div>
          <div class="info-row">
            <div class="info-label">面积:</div>
            <div class="info-value">20-40㎡</div>
          </div>
          <div class="info-row">
            <div class="info-label">楼层:</div>
            <div class="info-value">11-20层</div>
          </div>
          <div class="info-row">
            <div class="info-label">户型:</div>
            <div class="info-value">一居室、二居室</div>
          </div>
          <div class="info-row">
            <div class="info-label">阳台:</div>
            <div class="info-value">有阳台</div>
          </div>
          <div class="info-agent border-top" v-if="pageType !== 'my'">
            <div class="portrait"></div>
            <div class="agent-txt">
              <div class="name">Govern</div>
              <div class="desc"><span>经纪人</span><span>语言：汉语/英语/韩语/日语</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-wrapper" v-if="pageType === 'my'">
      <nest-button type="primary" size="full">发布新的帮住</nest-button>
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
  export default {
    name: "Details",
    data() {
      return {
        title: '帮住广场-购置信息',
        pageType: 'my',
        detailsType: 'buy'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details {
    background-color: #fff;
    &.my {
      padding-bottom: .6rem;
    }
    &.ground {
      padding-bottom: 2rem;
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
      background-color: #f2f2f2;
      border-radius: .2rem;
    }
    .card {
      margin-top: .2rem;
      border-radius: .2rem;
      box-shadow:1px .04rem .28rem 0px rgba(182,185,186,0.3);
      .card-top {
        padding: 0 .4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        border-radius: .2rem .2rem 0 0;
        &.buy {
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
          &.my {
            width: 4.06rem;
          }
        }
        .share {
          width: .38rem;
          height: .38rem;
          background-color: #fff;
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
          width: .85rem;
          color: #b3b3b3;
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
      box-shadow:0px -1px 5px 0px rgba(234,234,234,1);
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
