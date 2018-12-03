<template>
  <div class="edit">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      <div class="title">编辑信息</div>
      <div class="right">保存</div>
    </div>
    <div class="uploader">
      <div class="portrait"></div>
      <div class="camera"></div>
    </div>
    <div class="details border-top">
      <div class="form-group auto-height border-bottom">
        <div class="label">个性签名</div>
        <div class="value pr85">个性签名的个性签名的个性签名的的个性签名的</div>
        <span class="num">12</span>
      </div>
      <div class="form-group border-bottom arrow-right">
        <div class="label">国籍</div>
        <div class="value">中国</div>
      </div>
      <div class="form-group border-bottom arrow-right">
        <div class="label">性别</div>
        <div class="value">先生</div>
      </div>
      <div class="form-group border-bottom arrow-right">
        <div class="label">语言能力</div>
        <div class="value">
          <span>汉语</span>
          <span>English</span>
          <span>にほんご</span>
        </div>
      </div>
      <div class="form-group auto-height border-bottom arrow-right">
        <div class="label">手机号</div>
        <div>
          133****7655<br>
          133****7655
        </div>
      </div>
      <div class="form-group border-bottom">
        <div class="label">邮箱</div>
        <nest-field v-model="email"></nest-field>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Edit",
    data() {
      return {
        email: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit {
    .header {
      position: relative;
      display: flex;
      padding: 0 .28rem;
      height: 1.2rem;
      justify-content: space-between;
      align-items: center;
      .back {
        width: .9rem;
        height: 100%;
        background: url('../../assets/images/return-icon.png') no-repeat left center;
        background-size: .42rem .32rem;
      }
      .title {
        font-size: .32rem;
        color: #333;
      }
      .right {
        width: .9rem;
        height: 100%;
        line-height: 1.2rem;
        font-size: .28rem;
        color: #333;
        text-align: right;
      }
    }
    .uploader {
      position: relative;
      background: linear-gradient(0deg, rgba(242, 242, 242, 1), rgba(255, 255, 255, 1));
      .portrait {
        margin: auto;
        width: 2.4rem;
        height: 2.4rem;
        background-color: #dfdfdf;
      }
      .camera {
        position: absolute;
        right: .33rem;
        bottom: .2rem;
        width: .42rem;
        height: .34rem;
        background: url('../../assets/images/icon-photo.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .details {
      margin-top: .6rem;
      padding: 0 .28rem;
    }
    .form-group {
      position: relative;
      display: flex;
      align-items: center;
      height: 1rem;
      font-size: .28rem;
      color: #333;
      .label {
        width: 1.9rem;
      }
      .value {
        flex: 1;
        line-height: .42rem;
        span {
          margin-right: .4rem;
        }
      }
      .num {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -.12rem;
        font-size: .24rem;
        color: #b3b3b3;
        line-height: 1;
      }
      .pr85 {
        padding-right: .85rem
      }
      &.auto-height {
        height: auto;
        padding: .4rem 0;
        align-items: unset;
        line-height: .42rem;
      }
    }
  }
</style>
