<template>
  <div class="country">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
    </div>
    <div class="content">
      <div class="title">语言</div>
      <nest-check class="mt60" :options="languageOpts" v-model="language" size="large" :count-in-row="1"></nest-check>
      <nest-button class="mt263" type="primary" size="full" :disabled="true">保存</nest-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Language",
    data() {
      return {
        language: [],
        languageOpts: ['中文', '한국어', 'にほんご', 'English']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .country {
    padding: 0 .28rem;
    box-sizing: border-box;
    .header {
      height: 1.2rem;
    }
    .back {
      width: .9rem;
      height: 100%;
      background: url('../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .content {
      padding: 0 .4rem;
    }
    .title {
      margin-top: .4rem;
      line-height: 1;
      font-size: .46rem;
      font-weight: bold;
      color: #333;
    }
    .mt60 {
      margin-top: .6rem;
    }
    .mt263 {
      margin-top: 2.63rem;
    }
  }
</style>
