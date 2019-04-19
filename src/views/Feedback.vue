<template>
  <div class="bg">
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
          <nest-radio :count-in-row="3" :options="feedCategories" v-model="category"></nest-radio>
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
        <div class="upload-label">上传截图（最多3张）</div>
        <nest-upload v-model="uploadPics" :limit="3" />
      </div>
    </div>
    <div class="btn-area">
      <nest-button type="primary" size="full" @click="submit">提交</nest-button>
    </div>
  </div>
</template>

<script>
  import FeedbackService from '../services/FeedbackService';
  import Utils from "../utils/Utils";

  export default {
    name: "Feedback",
    data() {
      return {
        feedCategories: [{
          label: '使用疑问',
          value: '1'
        }, {
          label: '功能建议',
          value: '2'
        }, {
          label: '异常问题',
          value: '3'
        }],
        category: '1',
        email: '',
        phone: '',
        content: '',
        uploadPics: []
      }
    },
    methods: {
      validate() {
        if (this.email === '') {
          this.$toast.info('请填写邮箱');
          return false;
        }
        return true
      },
      submit() {
        if (!this.validate()) {
          return false;
        }
        let feedback = {
          category_id: this.category,
          phone: this.phone,
          email: this.email,
          content: this.content,
          images: this.uploadPics.join(',')
        };
        feedback = Utils.getEffectiveAttrsByObj(feedback);
        FeedbackService.doPost(feedback, res => {
          this.$toast.success('提交成功');
          this.$router.push({ name: 'My' })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg {
    background-color: #f2f2f2;
  }
  .feedback {
    background-color: #fff;
    box-shadow:0 2px 4px 0 rgba(230,230,230,1);
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
      box-sizing: border-box;
    }
    .upload-label {
      display: flex;
      align-items: center;
      height: 1rem;
      font-size: .28rem;
      color: #333;
    }
  }
  .btn-area {
    padding: .6rem .68rem .94rem;
  }
</style>
