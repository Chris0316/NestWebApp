<template>
  <div class="contact-us">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
      联系我们
    </div>
    <div class="main">
      <div class="logo"></div>
      <div class="title">鸟窝 OhMyNest</div>
      <div class="description">
        鸟窝是一款高端物业租赁售卖信息获取与交流<br>
        平台，让您更快的获取想要的信息，更方便的管理和推广您的资源，构建公平完备的信用评价体系，从而提升行业效率，规范市场秩序。
      </div>
    </div>
    <div class="form">
      <div class="form-group border-bottom">
        <div class="form-title">E-mail</div>
        <div class="form-value">kunkka@ohmynest.com</div>
      </div>
      <div class="form-group border-bottom" @click="tel">
        <div class="form-title">Tel</div>
        <div class="form-value link">+(63)9154900090</div>
      </div>
      <div class="form-group border-bottom">
        <div class="form-title">WeChat</div>
        <div class="form-value">kunkkacaptain</div>
      </div>
    </div>
    <div class="footer">
      <div>Copyright(C)2019-2022</div>
      <div>鸟窝科技版权所有</div>
      <div>Version 1.0</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ContactUs",
    methods: {
      tel() {
        location.href='tel:00639154900090';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contact-us {
    display: flex;
    flex-direction: column;
    height: 100%;
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
      background: url('../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .main {
      background-color: #f2f2f2;
    }
    .logo {
      margin: .65rem auto 0;
      width: 1.28rem;
      height: 1.28rem;
      background: url("../assets/images/logo_large.png");
      background-size: 100% 100%;
    }
    .title {
      margin-top: .25rem;
      font-size: .36rem;
      color: #333;
      text-align: center;
    }
    .description {
      margin-top: .3rem;
      padding: 0 .4rem .8rem;
      font-size: .28rem;
      color: #999;
      text-align: center;
      line-height: .42rem;
    }
    .form {
      padding: 0 .28rem;
      flex: 1;
    }
    .form-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: .28rem;
      height: 1rem;
    }
    .form-title {
      color: #333;
    }
    .form-value {
      color: #b2b2b2;
      user-select: text;
      &.link {
        color: #0f9183;
      }
    }
    .footer {
      font-size: .22rem;
      color: #b2b2b2;
      line-height: .4rem;
      text-align: center;
    }
  }
</style>
