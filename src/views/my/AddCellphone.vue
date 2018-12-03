<template>
  <div class="cellphone">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
    </div>
    <div class="title">添加手机号</div>
    <div class="form border-top">
      <div class="form-group border-bottom">
        <div class="label">手机号</div>
        <nest-field type="tel"></nest-field>
      </div>
      <div class="form-group border-bottom">
        <div class="label">验证码</div>
        <nest-field></nest-field>
        <div class="verify-link" :class="{ 'disabled': sent }">获取验证码</div>
      </div>
    </div>
    <div class="btn-wrapper">
      <nest-button type="primary" size="full">确定</nest-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddCellphone",
    data() {
      return {
        sent: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cellphone {
    padding: 0 .28rem;
    box-sizing: border-box;
    .header {
      position: relative;
      display: flex;
      height: 1.2rem;
      justify-content: space-between;
      align-items: center;
      .back {
        width: .9rem;
        height: 100%;
        background: url('../../assets/images/return-icon.png') no-repeat left center;
        background-size: .42rem .32rem;
      }
    }
    .title {
      margin-top: .4rem;
      font-size: .46rem;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .form {
      margin-top: .6rem;
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
      .verify-link {
        font-size: .28rem;
        color: #0f9183;
        &.disabled {
          color: #d9d9d9;
        }
      }
    }
    .btn-wrapper {
      padding: 0 .68rem .6rem;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
