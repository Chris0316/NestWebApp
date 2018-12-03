<template>
  <div class="nest-nav">
    <div class="nav-item explore" :class="{'on' : page === 'explore'}" @click="$router.push({ name: 'Explore' });">探索</div>
    <div class="nav-item follow" :class="{'on' : page === 'follow'}" @click="$router.push({ name: 'Follow' });">关注</div>
    <div class="nav-item live" :class="{'on' : page === 'live'}" @click="$router.push({ name: 'Live' });">帮住</div>
    <div class="nav-item my" :class="{'on' : page === 'my'}" @click="$router.push({ name: 'My' });">我的</div>
  </div>
</template>

<script>
  export default {
    name: "nest-nav",
    props: {
      page: {
        type: String,
        default: 'explore'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-nav {
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    display: flex;
    height: .8rem;
    background: #fff;
    box-shadow: 0 -.01rem .05rem 0 rgba(234, 234, 234, 1);
    z-index: 2;
  }
  .nav-item {
    position: relative;
    padding-top: .5rem;
    flex: 1;
    color: #333;
    font-size: .2rem;
    text-align: center;
    box-sizing: border-box;
    &.explore {
      &::before {
        position: absolute;
        content: '';
        top: .12rem;
        left: 50%;
        width: .32rem;
        height: .3rem;
        background: url('../../assets/images/explore.png') no-repeat;
        background-size: 100% 100%;
        transform: translateX(-50%);
      }
    }
    &.follow {
      &::before {
        position: absolute;
        content: '';
        top: .12rem;
        left: 50%;
        width: .34rem;
        height: .3rem;
        background: url('../../assets/images/follow.png') no-repeat;
        background-size: 100% 100%;
        transform: translateX(-50%);
      }
    }
    &.live {
      &::before {
        position: absolute;
        content: '';
        top: .12rem;
        left: 50%;
        width: .34rem;
        height: .3rem;
        background: url('../../assets/images/live.png') no-repeat;
        background-size: 100% 100%;
        transform: translateX(-50%);
      }
    }
    &.my {
      &::before {
        position: absolute;
        content: '';
        top: .12rem;
        left: 50%;
        width: .36rem;
        height: .3rem;
        background: url('../../assets/images/my.png') no-repeat;
        background-size: 100% 100%;
        transform: translateX(-50%);
      }
    }
    &.on {
      color: #0f9183;
      &.explore {
        &::before {
          background: url('../../assets/images/explore-on.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      &.follow {
        &::before {
          background: url('../../assets/images/follow-on.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      &.live {
        &::before {
          background: url('../../assets/images/live-on.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      &.my {
        &::before {
          background: url('../../assets/images/my-on.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
