<template>
  <div class="article">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      <div class="share"></div>
    </div>
    <nest-scroll class="app-body">
      <div>
        <div class="details">
          <div class="title">{{ article.title }}</div>
          <div class="content" v-html="article.content"></div>
        </div>
        <div class="banner"></div>
      </div>
    </nest-scroll>
  </div>
</template>

<script>
  import ArticleService from "../../services/ArticleService";

  export default {
    name: "ArticleDetails",
    data() {
      return {
        article: {}
      }
    },
    created() {
      this.initConsts();
    },
    mounted() {
      this.getArticleDetails();
    },
    methods: {
      initConsts() {
        let params = this.$route.params;
        if (params) {
          this.articleId = params.id;
        }
      },
      getArticleDetails() {
        ArticleService.getArticleDetails(this.articleId, res => {
          this.article = res.data;
        });
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
    .banner {
      height: 2rem;
      background: #0f9183;
    }
  }
</style>
