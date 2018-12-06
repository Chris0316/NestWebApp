<template>
  <div class="my">
    <nest-scroll class="app-body">
      <div class="my-body">
        <div class="personal-info" @click="login">
          <div>
            <div class="name">{{ name }}</div>
            <div class="account" v-if="isLogin">{{ account }}</div>
          </div>
          <div class="portrait" :style="{ backgroundImage: 'url(' + portrait + ')'}"></div>
        </div>
        <div class="personal-sign arrow-right" v-if="isLogin" @click="login">{{ signature }}</div>
        <div class="menu-panel">
          <div class="menu-item">
            <div class="item-icon icon1"></div>
            <div class="item-label">我的发布</div>
          </div>
          <div class="menu-item">
            <div class="item-icon icon2"></div>
            <div class="item-label">我的帮住</div>
          </div>
          <div class="menu-item">
            <div class="item-icon icon3"></div>
            <div class="item-label">我的资讯</div>
          </div>
        </div>
        <div class="live-ground border-bottom">
          <div class="banner" @click="$router.push({ name: 'MyGround' })">帮住广场</div>
        </div>
        <div class="form-group border-bottom arrow-right">
          <div class="label">我的信息</div>
        </div>
        <div class="form-group border-bottom arrow-right">
          <div class="label">我的消息</div>
        </div>
        <div class="form-group border-bottom"></div>
        <div class="form-group border-bottom arrow-right">
          <div class="label">语言显示</div>
        </div>
        <div class="form-group border-bottom">
          <div class="label">新消息通知</div>
          <nest-switch v-model="msgSwitch"></nest-switch>
        </div>
        <div class="form-group border-bottom">
          <div class="label">加入我们</div>
          <nest-switch v-model="joinSwitch"></nest-switch>
        </div>
        <div class="footer-links">
          <div class="links-item">
            <div class="link-icon icon4"></div>
            <div class="link-label">给我反馈</div>
          </div>
          <div class="links-item">
            <div class="link-icon icon5"></div>
            <div class="link-label">联系我们</div>
          </div>
          <div class="links-item">
            <div class="link-icon icon6"></div>
            <div class="link-label">商业合作</div>
          </div>
        </div>
      </div>
    </nest-scroll>
    <nest-nav page="my"></nest-nav>
  </div>
</template>

<script>
  import Storage from '../utils/Storage';
  import UserService from '../services/UserService';

  export default {
    name: "My",
    data() {
      return {
        name: '点击登录',
        account: 'Arthas',
        signature: '',
        portrait: '',
        msgSwitch: false,
        joinSwitch: false
      }
    },
    computed: {
      isLogin() {
        let token = Storage.getLocalStorage('nest_access_token');
        return token ? true : false;
      }
    },
    created() {
      if (this.isLogin) {
        UserService.getUserInfo(res => {
          this.name = res.data.local_name;
          this.account = res.data.name;
          this.signature = res.data.introduction;
        });
      }
    },
    methods: {
      login() {
        if (!this.isLogin) {
          this.$router.push({ name: 'AuthLogin' });
        } else {
          this.$router.push({ name: 'MyProfile' });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .my-body {
      padding: .4rem .28rem 2rem;
    }
    .personal-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .name {
      font-size: .6rem;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .account {
      margin-top: .17rem;
      font-size: .28rem;
      color: #333;
      line-height: 1;
    }
    .portrait {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 1.2rem;
      background-color: #e6e6e6;
      background-size: 100% 100%;
    }
    .personal-sign {
      margin-top: .4rem;
      padding-right: .78rem;
      height: .35rem;
      line-height: .35rem;
      font-size: .28rem;
      color: #999;
      box-sizing: border-box;
    }
    .menu-panel {
      margin-top: .8rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 1.6rem;
      border-radius: .4rem;
      box-shadow: 1px 3px 20px 0px rgba(176,183,187,0.4);
    }
    .item-icon {
      margin: 0 auto;
      width: .6rem;
      height: .6rem;
      &.icon1 {
        background: url('../assets/images/my/icon1.png') no-repeat center center;
        background-size: .56rem .6rem;
      }
      &.icon2 {
        background: url('../assets/images/my/icon2.png') no-repeat center center;
        background-size: .49rem .6rem;
      }
      &.icon3 {
        background: url('../assets/images/my/icon3.png') no-repeat center center;
        background-size: .46rem .6rem;
      }
    }
    .item-label {
      margin-top: .2rem;
      font-size: .28rem;
      color: #333;
      line-height: 1;
    }
    .live-ground {
      padding: .6rem 0 .8rem;
    }
    .banner {
      font-size: .34rem;
      color: #fff;
      letter-spacing: .1rem;
      height: 1rem;
      line-height: 1rem;
      border-radius: 1rem;
      text-align: center;
      background: url('../assets/images/my/banner.png') no-repeat;
      background-size: 100% 100%;
    }
    .form-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1rem;
      .label {
        width: 1.9rem;
        font-size: .28rem;
        color: #333;
      }
    }
    .footer-links {
      margin-top: 1rem;
      display: flex;
      justify-content: space-around;
      .link-icon {
        margin: 0 auto;
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 1.1rem;
        border: 1px solid #add9d5;
        background-position: center center;
        background-repeat: no-repeat;
        &.icon4 {
          background-image: url('../assets/images/my/icon4.png');
          background-size: .46rem .41rem;
        }
        &.icon5 {
          background-image: url('../assets/images/my/icon5.png');
          background-size: .48rem .43rem;
        }
        &.icon6 {
          background-image: url('../assets/images/my/icon6.png');
          background-size: .38rem .5rem;
        }
      }
      .link-label {
        margin-top: .2rem;
        font-size: .28rem;
        color: #999;
      }
    }
  }
</style>
