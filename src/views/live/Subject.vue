<template>
  <div class="subject">
    <nest-scroll ref="scroll"
                 :pullUpLoad="pullUpLoadObj"
                 @pullingUp="getData"
                 class="app-body">
      <div class="live-body">
        <div class="banner" :class="bannerClass">
          <div class="head-bar">
            <div class="back" @click="$router.go(-1)"></div>
          </div>
          <div class="title">{{ name }}</div>
          <div class="desc">{{ description }}</div>
        </div>
        <div class="category-container" v-if="dataList.length !== 0">
          <div class="category banner1">
            <span class="favorite"></span>
            <div class="category-tag" v-if="dataList[0].content">
              <span>{{ dataList[0].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList[0].title }}
            </div>
          </div>
        </div>
        <div class="category-container" v-if="dataList.length === 2 || dataList.length === 4 || dataList.length > 4">
          <div class="category banner2">
            <span class="favorite"></span>
            <div class="category-tag" v-if="dataList[1].content">
              <span>{{ dataList[1].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList[1].title }}
            </div>
          </div>
        </div>
        <div class="category-container" v-if="dataList.length === 3 || dataList.length === 4 || dataList.length > 4">
          <div class="category banner3">
            <span class="favorite"></span>
            <div class="category-tag" v-if="(dataList.length === 3 && dataList[1].content) || (dataList.length === 4 && dataList[2].content)">
              <span>{{ dataList.length === 3 ? dataList[1].content : dataList[2].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList.length === 3 ? dataList[1].title : dataList[2].title }}
            </div>
          </div>
          <div class="category banner4">
            <span class="favorite"></span>
            <div class="category-tag" v-if="(dataList.length === 3 && dataList[2].content) || (dataList.length === 4 && dataList[3].content)">
              <span>{{ dataList.length === 3 ? dataList[2].content : dataList[3].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList.length === 3 ? dataList[2].title : dataList[3].title }}
            </div>
          </div>
        </div>
        <div class="category-list">
          <div class="category-item border-bottom" v-for="(item, index) in dataList" v-if="index > 3">
            <div class="title">{{ item.title }}</div>
            <div class="info">{{ item.created_at }}</div>
          </div>
        </div>
      </div>
    </nest-scroll>
    <nest-nav page="live"></nest-nav>
  </div>
</template>

<script>
  import ArticleService from "../../services/ArticleService";

  export default {
    name: "LiveSubject",
    data() {
      return {
        bannerClass: '',
        name: '',
        description: '',
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
        dataList: []
      }
    },
    created() {
      this.randomBanner();
      this.initConsts();
    },
    mounted() {
      this.getData(true);
    },
    methods: {
      initConsts() {
        let params = this.$route.params;
        if (params) {
          this.type = params.type;
        }
      },
      randomBanner() {
        let ran = Math.random(),
          bannerArr = ['banner5', 'banner6'],
          index = Math.round(ran);
        this.bannerClass = bannerArr[index];
      },
      getData(loading) {
        if (loading) {
          this.filters.page = 1;
          this.filters.category = this.type;
          ArticleService.getArticleList(this.filters, res => {
            this.name = res.meta.category.name;
            this.description = res.meta.category.description;
            this.dataList = res.data;
            this.$refs.scroll.scrollTo(0, 0, 300);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.scroll.forceUpdate(true);
            } else {
              this.$refs.scroll.forceUpdate(false);
            }
          }, true);
        } else {
          this.filters.page += 1;
          ArticleService.getArticleList(this.filters, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataList = this.dataList.concat(res.data);
            if (this.dataList.length < res.meta.pagination.total) {
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
  .subject {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .banner {
      position: relative;
      padding-top: .9rem;
      height: 2.6rem;
      box-sizing: border-box;
      .head-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1.2rem;
        z-index: 2;
        .back {
          padding-left: .28rem;
          width: .9rem;
          height: 100%;
          background: url('../../assets/images/icon-back.png') no-repeat .28rem center;
          background-size: .42rem .32rem;
        }
      }
      .title {
        font-size: .46rem;
        font-weight: bold;
        color: #fff;
        text-align: center;
        line-height: 1;
      }
      .desc {
        margin-top: .28rem;
        font-size: .28rem;
        color: #fff;
        line-height: 1;
        text-align: center;
      }
      &.banner5 {
        background: url('../../assets/images/live/banner5.png') no-repeat;
        background-size: 100% 100%;
      }
      &.banner6 {
        background: url('../../assets/images/live/banner6.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .category-container {
      margin-top: .6rem;
      padding: 0 .28rem;
      display: flex;
    }
    .category {
      padding: .2rem;
      margin-right: .34rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      flex: 1;
      height: 2.42rem;
      border-radius: .1rem;
      background-color: #e6e6e6;
      background-size: 100% 100%;
      box-sizing: border-box;
      &.banner1 {
        background-image: url('../../assets/images/live/banner1.png');
      }
      &.banner2 {
        background-image: url('../../assets/images/live/banner2.png');
      }
      &.banner3 {
        background-image: url('../../assets/images/live/banner3.png');
      }
      &.banner4 {
        background-image: url('../../assets/images/live/banner4.png');
      }
      .favorite {
        position: absolute;
        top: .2rem;
        right: .2rem;
        width: .36rem;
        height: .32rem;
        background: url('../../assets/images/favorite-w.png') no-repeat;
        background-size: 100% 100%;
      }
      .category-text {
        font-size: .36rem;
        line-height: .4rem;
        color: #fff;
        box-sizing: border-box;
      }
      .category-tag {
        margin: 0 auto .1rem 0;
        padding: 0 .1rem;
        display: flex;
        align-items: center;
        height: .38rem;
        font-size: .2rem;
        color: #333;
        background-color: #fff;
        border-radius: .1rem;
        box-sizing: border-box;
        &.hot {
          &::before {
            content: '';
            margin-right: .1rem;
            width: .2rem;
            height: .26rem;
            background: url('../../assets/images/hot.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .category-list {
      padding: 0 .28rem;
    }
    .category-item {
      padding: .3rem 0;
      .title {
        font-size: .32rem;
        color: #333;
      }
      .info {
        margin-top: .25rem;
        font-size: .24rem;
        color: #b2b2b2;
      }
    }
  }
</style>
