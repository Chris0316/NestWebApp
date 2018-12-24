<template>
  <div class="subject">
    <nest-scroll class="app-body">
      <div class="live-body">
        <div class="banner banner5">
          <div class="title">买房攻略</div>
          <div class="desc">您的疑惑和顾虑，我来消除</div>
        </div>
        <div class="category-container">
          <div class="category banner1">
            <span class="favorite"></span>
            <div class="category-text">
              “外国人”在菲律宾购置房产的政策法规深度解析
            </div>
          </div>
        </div>
        <div class="category-container">
          <div class="category banner2">
            <span class="favorite"></span>
            <div class="category-tag hot">
              <span>购房常识</span>
            </div>
            <div class="category-text">
              菲律宾房产投资入门攻略
            </div>
          </div>
        </div>
        <div class="category-container">
          <div class="category banner3">
            <span class="favorite"></span>
            <div class="category-tag">
              <span>购房常识</span>
            </div>
            <div class="category-text">
              菲律宾租房流程
            </div>
          </div>
          <div class="category banner4">
            <span class="favorite"></span>
            <div class="category-tag">
              <span>投资参考</span>
            </div>
            <div class="category-text">
              华人海外房产投资“新宠”
            </div>
          </div>
        </div>
      </div>
    </nest-scroll>
    <nest-nav page="live"></nest-nav>
  </div>
</template>

<script>
  export default {
    name: "LiveSubject"
  }
</script>

<style lang="scss" scoped>
  .subject {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .live-body {
      padding-bottom: 1.5rem;
    }
    .banner {
      padding-top: .9rem;
      height: 2.6rem;
      box-sizing: border-box;
      .title {
        font-size: .46rem;
        font-weight: bold;
        color: #fff;
        text-align: center;
        line-height: 1;
      }
      .desc {
        margin-top: .28rem;
        font-size: .28rem;
        color: #fff;
        line-height: 1;
        text-align: center;
      }
      &.banner5 {
        background: url('../../assets/images/live/banner5.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .category-container {
      margin-top: .6rem;
      padding: 0 .28rem;
      display: flex;
    }
    .category {
      padding: .2rem;
      margin-right: .34rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      flex: 1;
      height: 2.42rem;
      border-radius: .1rem;
      background-color: #e6e6e6;
      background-size: 100% 100%;
      box-sizing: border-box;
      &.banner1 {
        background-image: url('../../assets/images/live/banner1.png');
      }
      &.banner2 {
        background-image: url('../../assets/images/live/banner2.png');
      }
      &.banner3 {
        background-image: url('../../assets/images/live/banner3.png');
      }
      &.banner4 {
        background-image: url('../../assets/images/live/banner4.png');
      }
      .favorite {
        position: absolute;
        top: .2rem;
        right: .2rem;
        width: .36rem;
        height: .32rem;
        background: url('../../assets/images/favorite-w.png') no-repeat;
        background-size: 100% 100%;
      }
      .category-text {
        font-size: .36rem;
        line-height: .4rem;
        color: #fff;
        box-sizing: border-box;
      }
      .category-tag {
        margin: 0 auto .1rem 0;
        padding: 0 .1rem;
        display: flex;
        align-items: center;
        height: .38rem;
        font-size: .2rem;
        color: #333;
        background-color: #fff;
        border-radius: .1rem;
        box-sizing: border-box;
        &.hot {
          &::before {
            content: '';
            margin-right: .1rem;
            width: .2rem;
            height: .26rem;
            background: url('../../assets/images/hot.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
