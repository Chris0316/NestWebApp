<template>
  <div class="feedback">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
      反馈问题
    </div>
    <div class="form">
      <div class="form-group border-bottom">
        <div class="form-label">反馈类型</div>
      </div>
      <div class="form-group radio-line auto-height border-bottom">
        <nest-radio :count-in-row="3" :options="feedType" v-model="type"></nest-radio>
      </div>
      <div class="form-group border-bottom">
        <div class="form-label required">联系邮箱</div>
        <nest-field v-model="email" />
      </div>
      <div class="form-group border-bottom">
        <div class="form-label">联系电话</div>
        <nest-field v-model="phone" />
      </div>
      <div class="form-textarea border-bottom">
        <div class="form-label">反馈内容</div>
        <nest-field type="textarea" v-model="content" placeholder="您的建议会使我们更加优秀"/>
      </div>
      <nest-upload v-model="uploadPics" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "Feedback",
    data() {
      return {
        feedType: [{
          label: '使用疑问',
          value: '1'
        }, {
          label: '功能建议',
          value: '2'
        }, {
          label: '异常问题',
          value: '3'
        }],
        type: '1',
        email: '',
        phone: '',
        content: '',
        uploadPics: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
    background-color: #f2f2f2;
  }
  .feedback {
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
    .form {
      padding: 0 .28rem;
    }
    .form-group {
      display: flex;
      align-items: center;
      height: 1rem;
      &.radio-line {
        display: block;
      }
      &.auto-height {
        padding: .36rem 0;
        min-height: 1rem;
        height: auto;
        box-sizing: border-box;
      }
    }
    .form-label {
      width: 1.92rem;
      font-size: .28rem;
      color: #333;
      &.required {
        &::after {
          content: '*';
          color: #f99c91;
        }
      }
    }
    .form-textarea {
      display: flex;
      padding-top: .36rem;
      height: 3.4rem;
    }
  }
</style>
