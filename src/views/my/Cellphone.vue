<template>
  <div class="cellphone">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
      <div class="right" @click="$router.push({ name: 'MyAddCellphone' });">添加手机号</div>
    </div>
    <div class="title">手机号</div>
    <nest-radio class="mt60" :options="cellphoneList" v-model="cellphone"
                size="large"
                :show-default="true"
                :is-align-left="true"
                :count-in-row="1">
    </nest-radio>
  </div>
</template>

<script>
  export default {
    name: "Cellphone",
    data() {
      return {
        cellphone: '',
        cellphoneList: ['09162502441', '09162502442', '09162502443']
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
      .right {
        height: 100%;
        line-height: 1.2rem;
        font-size: .28rem;
        color: #333;
      }
    }
    .title {
      margin-top: .4rem;
      font-size: .46rem;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .mt60 {
      margin-top: .6rem;
    }
  }
</style>
