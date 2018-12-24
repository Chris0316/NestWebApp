<template>
  <div class="live-ground">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      帮住广场
    </div>
    <div class="row-wrapper">
      <div class="control-bar">
        <button class="control-btn" @click="typeShow = true">类型</button>
        <button class="control-btn" @click="locationShow = true">区域</button>
      </div>
    </div>
    <nest-scroll class="scroll-wrapper"
                 ref="scroll"
                 :pullDownRefresh="pullDownRefreshObj"
                 :pullUpLoad="pullUpLoadObj"
                 :startY="parseInt(startY)"
                 @pullingDown="onPullingDown"
                 @pullingUp="onPullingUp">
      <div class="list">
        <nest-swipe-cell v-for="(item, index) in options" :key="index" class="list-item">
          <div class="item"
               slot="content"
               :class="item.type">
            <div class="item-img"></div>
            <div class="item-content">
              <div class="title"><span class="txt">{{ item.title }}</span><span class="tag">{{ item.type === 'rent'? '租赁' : '购置' }}</span></div>
              <div class="desc">
                预算：{{ item.budget }}<br>
                地区：{{ item.area }}
              </div>
              <div class="date">{{ item.date }}</div>
            </div>
          </div>
          <template slot="controls">
            <div class="follow"></div>
            <div class="share"></div>
          </template>
        </nest-swipe-cell>
      </div>
    </nest-scroll>
    <nest-modal title="类型" modal-confirm-txt="确定" @close="typeShow = false" :status="typeShow">
      <nest-check v-model="typeVal" :options="typeOpts"></nest-check>
    </nest-modal>
    <nest-modal title="地点" modal-confirm-txt="确定" @close="locationShow = false" :status="locationShow">
      <nest-check v-model="locationVal" :options="locationOpts"></nest-check>
    </nest-modal>
  </div>
</template>

<script>
  export default {
    name: "MyGround",
    data() {
      return {
        locationShow: false,
        typeShow: false,
        locationVal: [],
        locationOpts: ['马卡提(Makati)', '帕赛(Pasay)', '马尼拉市(City of Manila)', '曼达卢永(Mandaluyong)', '奎松(Quezon)', 'BGC(BGC, Taguig)', '帕西市(Pasig)'],
        typeVal: [],
        typeOpts: ['购置', '租赁'],
        options: [
          { title: '公寓', type: 'rent', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19' },
          { title: '公寓', type: 'buy', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19' },
          { title: '公寓', type: 'rent', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19' },
          { title: '公寓', type: 'rent', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19' }
        ],
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 90,
          stop: 40
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
      }
    },
    mounted () {
      this.onPullingDown()
    },
    methods: {
      // 滚动到页面顶部
      scrollTo () {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      // 模拟数据请求
      getData () {
        return new Promise(resolve => {
          setTimeout(() => {
            const arr = []
            for (let i = 0; i < 20; i++) {
              arr.push({ title: '公寓', type: 'rent', budget: '400-500万Peso', area: '马卡提（Makati）', date: '2018-08-19' })
            }
            resolve(arr)
          }, 1000)
        })
      },
      onPullingDown () {
        // 模拟下拉刷新
        console.log('下拉刷新')
        // count = 0
        this.getData().then(res => {
          this.options = res
          this.$refs.scroll.forceUpdate(true)
        })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        this.getData().then(res => {
          this.options = this.options.concat(res)
          if(this.options.length<50){
            this.$refs.scroll.forceUpdate(true)
          }else{
            this.$refs.scroll.forceUpdate(false)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .live-ground {
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
    .row-wrapper {
      padding: 0 .28rem;
    }
    .control-bar {
      padding: .2rem 0 .6rem;
    }
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
    .scroll-wrapper {
      position: relative;
      height: 300px;
      overflow: hidden;
    }
    .list-item {
      margin-bottom: .4rem;
    }
    .item {
      display: flex;
      padding: 0 .28rem;
      &.rent {
        .item-img {
          background-color: rgba(139,181,223,.15);
        }
        .tag {
          color: #8BB5DF;
          background-color: rgba(139,181,223,.15);
        }
      }
      &.buy {
        .item-img {
          background: rgba(213,190,136,.15);
        }
        .tag {
          color: #D5BE88;
          background-color: rgba(213,190,136,.15);
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
    .follow {
      width: 1.2rem;
      height: .87rem;
      background: rgba(15,145,131,.1) url('../../assets/images/heart.png') no-repeat center center;
      background-size: .36rem .32rem;
    }
    .share {
      width: 1.2rem;
      height: .87rem;
      background: rgba(15,145,131,.1) url('../../assets/images/share.png') no-repeat center center;
      background-size: .3rem .3rem;
    }
  }
</style>
