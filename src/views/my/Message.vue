<template>
  <div class="message">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      我的消息
    </div>
    <nest-scroll ref="scroll"
                 :pullUpLoad="pullUpLoadObj"
                 @pullingUp="getData"
                 class="app-body">
      <nest-swipe-cell v-for="(item, i) in msgList" :key="item.id">
        <div class="msg-item" slot="content" @click="$router.push({ name: 'MyMessageDetail', params: { id: item.id } })">
          <div class="left"></div>
          <div class="right">
            <div class="text">{{ item.data.title }}</div>
            <div class="time">{{ item.created_at }}</div>
          </div>
        </div>
        <div class="del-wrap" slot="controls">
          <div class="red-del"></div>
        </div>
      </nest-swipe-cell>
    </nest-scroll>
  </div>
</template>

<script>
  import NotificationService from '../../services/NotificationService'

  export default {
    name: "MyMessage",
    data() {
      return {
        filters: {
          page: 0,
          per_page: 10
        },
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        msgList: []
      }
    },
    mounted() {
      this.getData(true);
    },
    methods: {
      getData(loading) {
        if (loading) {
          this.filters.page = 1;
          NotificationService.getNotifications(this.filters, res => {
            this.msgList = res.data;
            this.$refs.scroll.scrollTo(0, 0, 300);
            if (this.msgList.length < res.meta.pagination.total) {
              this.$refs.scroll.forceUpdate(true);
            } else {
              this.$refs.scroll.forceUpdate(false);
            }
          }, true);
        } else {
          this.filters.page += 1;
          NotificationService.getNotifications(this.filters, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.msgList = this.msgList.concat(res.data);
            if (this.msgList.length < res.meta.pagination.total) {
              this.$refs.scroll.forceUpdate(true);
            } else {
              this.$refs.scroll.forceUpdate(false);
            }
          }, false);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message {
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
      flex: 1;
      overflow: hidden;
    }
    .msg-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 0.28rem;
      margin-right: 0.28rem;
      height: 1.6rem;
      .left {
        margin-right: 0.2rem;
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        background: #0F9183;
        border-radius: 0.1rem;
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .text {
        height: 0.64rem;
        color: #333333;
        font-size: 0.28rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .time {
        margin-top: 0.14rem;
        font-size: 0.24rem;
        color: #B3B3B3;
      }
    }
    .del-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.2rem;
      height: 1.6rem;
      background: #FFE6E6;
      .red-del {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../assets/images/red-del.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
