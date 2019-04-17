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
          <div class="category banner1" @click="$router.push({ name: 'ArticleDetails', params: { id: dataList[0].id } })">
            <span class="favorite" :class="dataList[0].favored ? 'on' : ''" @click.stop="doFollow(dataList[0])"></span>
            <div class="category-tag" v-if="dataList[0].content">
              <span>{{ dataList[0].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList[0].title }}
            </div>
          </div>
        </div>
        <div class="category-container" v-if="dataList.length === 2 || dataList.length === 4 || dataList.length > 4">
          <div class="category banner2" @click="$router.push({ name: 'ArticleDetails', params: { id: dataList[1].id } })">
            <span class="favorite" :class="dataList[1].favored ? 'on' : ''" @click.stop="doFollow(dataList[1])"></span>
            <div class="category-tag" v-if="dataList[1].content">
              <span>{{ dataList[1].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList[1].title }}
            </div>
          </div>
        </div>
        <div class="category-container" v-if="dataList.length === 3 || dataList.length === 4 || dataList.length > 4">
          <div class="category banner3" @click="$router.push({ name: 'ArticleDetails', params: { id: dataList.length === 3 ? dataList[1].id : dataList[2].id } })">
            <span class="favorite" :class="dataList[1].favored ? 'on' : ''" v-if="dataList.length === 3" @click.stop="doFollow(dataList[1])"></span>
            <span class="favorite" :class="dataList[2].favored ? 'on' : ''" v-else @click.stop="doFollow(dataList[2])"></span>
            <div class="category-tag" v-if="(dataList.length === 3 && dataList[1].content) || (dataList.length === 4 && dataList[2].content)">
              <span>{{ dataList.length === 3 ? dataList[1].content : dataList[2].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList.length === 3 ? dataList[1].title : dataList[2].title }}
            </div>
          </div>
          <div class="category banner4" @click="$router.push({ name: 'ArticleDetails', params: { id: dataList.length === 3 ? dataList[2].id : dataList[3].id } })">
            <span class="favorite" :class="dataList[2].favored ? 'on' : ''" v-if="dataList.length === 3" @click.stop="doFollow(dataList[2])"></span>
            <span class="favorite" :class="dataList[3].favored ? 'on' : ''" v-else @click.stop="doFollow(dataList[3])"></span>
            <div class="category-tag" v-if="(dataList.length === 3 && dataList[2].content) || (dataList.length === 4 && dataList[3].content)">
              <span>{{ dataList.length === 3 ? dataList[2].content : dataList[3].content }}</span>
            </div>
            <div class="category-text">
              {{ dataList.length === 3 ? dataList[2].title : dataList[3].title }}
            </div>
          </div>
        </div>
        <div class="category-list">
          <nest-swipe-cell v-for="(item, index) in dataList" v-if="index > 3" :key="item.id">
            <div class="category-item border-bottom gap" slot="content"
                 @click="$router.push({ name: 'ArticleDetails', params: { id: item.id } })">
              <div class="title">{{ item.title }}</div>
              <div class="info"><span class="read"></span><span class="read-num">{{ item.views }}</span><span>{{ item.created_at }}</span></div>
            </div>
            <div class="controls" slot="controls">
              <div class="heart" :class="item.favored ? 'on' : ''" @click="doFollow(item)"></div>
              <div class="share"></div>
            </div>
          </nest-swipe-cell>
        </div>
      </div>
    </nest-scroll>
    <nest-nav page="live"></nest-nav>
  </div>
</template>

<script>
  import ArticleService from "../../services/ArticleService";
  import FollowService from "../../services/FollowService";

  export default {
    name: "ArticleSubject",
    props: ['type'],
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
    },
    mounted() {
      this.getData(true);
    },
    methods: {
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
        background: url('../../assets/images/heart_white.png') no-repeat;
        background-size: 100% 100%;
        &.on {
          background-image: url('../../assets/images/heart_white_on.png');
        }
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
      margin-top: .2rem;
    }
    .controls {
      display: flex;
      height: 100%;
      .heart {
        width: .8rem;
        background: #e7f4f2 url("../../assets/images/heart.png") no-repeat center center;
        background-size: .36rem .32rem;
        &.on {
          background-image: url("../../assets/images/heart-on.png");
        }
      }
      .share {
        width: .8rem;
        background: #e7f4f2 url("../../assets/images/share.png") no-repeat center center;
        background-size: .3rem .3rem;
      }
    }
    .category-item {
      padding: .3rem .28rem;
      .title {
        font-size: .32rem;
        color: #333;
      }
      .info {
        margin-top: .25rem;
        display: flex;
        align-items: center;
        font-size: .24rem;
        color: #b2b2b2;
      }
      .read {
        margin-right: .15rem;
        display: block;
        width: .22rem;
        height: .16rem;
        background: url('../../assets/images/read.png') no-repeat;
        background-size: 100% 100%;
      }
      .read-num {
        margin-right: .25rem;
      }
    }
  }
</style>
