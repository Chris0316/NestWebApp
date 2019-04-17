<template>
  <div class="msg-detail" v-if="details">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      {{ details.data.title }}
    </div>
    <div class="app-body">
      <div class="date">{{ details.created_at }}</div>
      <div v-html="details.data.content"></div>
    </div>
  </div>
</template>

<script>
  import NotificationService from "../../services/NotificationService";

  export default {
    name: "MyMsgDetail",
    props: ['id'],
    data() {
      return {
        details: null
      }
    },
    mounted() {
      this.getDetails();
    },
    methods: {
      getDetails() {
        NotificationService.getNotificationDetails(this.id, res => {
          this.details = res.data;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .msg-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
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
      background: url('../../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .app-body {
      padding: 0 .28rem;
      flex: 1;
      overflow: hidden;
    }
    .date {
      margin-top: 0.4rem;
      margin-bottom: 0.6rem;
      text-align: center;
      font-size: 0.24rem;
      color: #B3B3B3;
    }
    .paragraph {
      margin: 0px 0.28rem 0.4rem;
      color: #333333;
      font-size: 0.28rem;
    }
  }

</style>
