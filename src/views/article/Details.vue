<template>
  <div class="article">
    <div class="download">
      <div class="logo"></div>
      <div class="text">
        <div class="main">鸟窝APP</div>
        <div class="sub">找寻温馨小窝</div>
      </div>
      <div class="download-btn">立即打开</div>
    </div>
    <div class="header border-bottom" v-if="article">
      <div class="back" @click="$router.go(-1);"></div>
      <div class="heart" :class="article.favored ? 'on' : ''" @click="doFollow(article)"></div>
      <div class="share"></div>
    </div>
    <nest-scroll class="app-body" v-if="article">
      <div class="details">
        <div class="title">{{ article.title }}</div>
        <div class="content" v-html="article.content"></div>
      </div>
      <div class="banner"></div>
    </nest-scroll>
  </div>
</template>

<script>
  import ArticleService from "../../services/ArticleService";
  import FollowService from "../../services/FollowService";

  export default {
    name: "ArticleDetails",
    props: ['id'],
    data() {
      return {
        article: null
      }
    },
    mounted() {
      this.getArticleDetails();
    },
    methods: {
      getArticleDetails() {
        ArticleService.getArticleDetails(this.id, res => {
          this.article = res.data;
        });
      },
      doFollow(item) {
        if (item.favored) {
          FollowService.unFollow({
            target_type: 'news',
            target_id: item.id
          }, res => {
            this.$toast.info('取消成功');
            item.favored = false;
          })
        } else {
          FollowService.doFollow({
            target_type: 'news',
            target_id: item.id
          }, res => {
            this.$toast.info('关注成功');
            item.favored = true;
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article {
    display: flex;
    flex-direction: column;
    background-color: #fff;
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
    .heart {
      position: absolute;
      top: 0;
      right: .88rem;
      width: .36rem;
      height: 100%;
      background: url('../../assets/images/heart_dark.png') no-repeat right center;
      background-size: .36rem .32rem;
      &.on {
        background-image: url("../../assets/images/heart-on.png");
      }
    }
    .share {
      position: absolute;
      top: 0;
      right: .28rem;
      width: .3rem;
      height: 100%;
      background: url('../../assets/images/icon_share_black.png') no-repeat right center;
      background-size: .3rem .3rem;
    }
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .details {
      padding: 0 .28rem;
    }
    .title {
      padding: .3rem 0;
      font-size: .46rem;
      color: #333;
    }
    .content {
      padding-bottom: .9rem;
    }
    .banner {
      height: 2rem;
      background: url('../../assets/images/banner_article.png') no-repeat;
      background-size: 100% 100%;
    }
    .download {
      position: relative;
      padding: 0 .28rem;
      display: flex;
      align-items: center;
      height: 1rem;
      .logo {
        margin-right: .4rem;
        width: .66rem;
        height: .66rem;
        background: url('../../assets/images/logo_download.png') no-repeat;
        background-size: 100% 100%;
      }
      .text {
        .main {
          font-size: .3rem;
          color: #333;
          font-weight: bold;
        }
        .sub {
          margin-top: .1rem;
          font-size: .22rem;
          color: #b3b3b3;
        }
      }
      .download-btn {
        position: absolute;
        top: .22rem;
        right: .28rem;
        width: 1.6rem;
        height: .56rem;
        line-height: .56rem;
        text-align: center;
        font-size: .28rem;
        color: #fff;
        background-color: #0f9183;
        border-radius: .1rem;
      }
    }
  }
</style>
