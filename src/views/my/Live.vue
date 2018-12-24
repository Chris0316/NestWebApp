<template>
  <div class="live">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      我的帮住
    </div>
    <nest-tab-bar class="tabs" v-model="tabSelected">
      <nest-tab-item id="my">我的</nest-tab-item>
      <nest-tab-item id="collect">收藏</nest-tab-item>
    </nest-tab-bar>
    <div class="btn-wrap">
      <nest-button>发布中</nest-button>
    </div>
    <div class="list">
      <nest-tab-container v-model="tabSelected">
        <nest-tab-container-item id="my">
          <nest-swipe-cell v-for="(item, index) in options" :key="index" class="list-item">
            <div class="item"
                 slot="content"
                 :class="item.type">
              <div class="item-img"></div>
              <div class="item-content">
                <div class="title">
                  <span class="txt">{{ item.title }}</span><span class="tag">{{ item.type === 'rent'? '租赁' : '购置' }}</span>
                </div>
                <div class="desc">
                  预算：{{ item.budget }}<br>
                  地区：{{ item.area }}
                </div>
                <div class="date">{{ item.date }}</div>
              </div>
            </div>
            <div slot="controls" class="item-control">
              <div class="share"></div>
              <div class="delete"></div>
            </div>
          </nest-swipe-cell>
        </nest-tab-container-item>
        <nest-tab-container-item id="collect">456</nest-tab-container-item>
      </nest-tab-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyLive",
    data() {
      return {
        tabSelected: 'my',
        options: [
          {title: '公寓', type: 'rent', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19'},
          {title: '公寓', type: 'buy', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19'},
          {title: '公寓', type: 'rent', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19'},
          {title: '公寓', type: 'rent', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19'}
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .live {
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
    .tabs {
      padding: 0 .28rem;
    }
    .btn-wrap {
      padding: .4rem .28rem 0;
    }
    .list {
      margin-top: .6rem;
    }
    .list-item {
      margin-bottom: .4rem;
    }
    .item {
      display: flex;
      padding: 0 .28rem;
      &.rent {
        .item-img {
          background-color: rgba(139, 181, 223, .15);
        }
        .tag {
          color: #8BB5DF;
          background-color: rgba(139, 181, 223, .15);
        }
      }
      &.buy {
        .item-img {
          background: rgba(213, 190, 136, .15);
        }
        .tag {
          color: #D5BE88;
          background-color: rgba(213, 190, 136, .15);
        }
      }
      .item-img {
        margin-right: .28rem;
        width: 1.74rem;
        height: 1.74rem;
      }
      .item-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .06rem 0;
        flex: 1;
        .title {
          font-size: 0;
          .txt {
            display: inline-block;
            vertical-align: middle;
            font-size: .32rem;
            font-weight: bold;
            color: #333;
          }
          .tag {
            display: inline-block;
            vertical-align: middle;
            margin-left: .2rem;
            width: .8rem;
            height: .36rem;
            line-height: .36rem;
            border-radius: .1rem;
            font-size: .24rem;
            text-align: center;
          }
        }
        .desc {
          font-size: .24rem;
          color: #999;
          line-height: .32rem;
        }
        .date {
          font-size: .22rem;
          color: #b3b3b3;
        }
      }
    }
    .item-control {
      display: flex;
      height: 100%;
    }
    .share {
      width: 1.2rem;
      height: 100%;
      background: rgba(15, 145, 131, .1) url('../../assets/images/share.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
    .delete {
      width: .8rem;
      height: 100%;
      background: #FFE6E6 url('../../assets/images/icon-delete.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
  }
</style>
