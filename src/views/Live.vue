<template>
  <div class="live" v-if="categoryList.length && advList.length">
    <nest-scroll class="app-body">
      <div class="live-body">
        <div class="live-title">帮住</div>
        <nest-scroll direction="horizontal" class="live-modules">
          <div class="modules-wrap">
            <div class="module icon1" @click="$router.push({ name: 'LivePublish' })">
              <div class="title">帮住</div>
              <div class="desc">给我您的需求<br>帮您淘满意的房源</div>
            </div>
            <div class="module icon2" v-for="item in categoryList" :key="item.id"
                 @click="$router.push({ name: 'LiveSubject', params: { type: item.alias } })">
              <div class="title">{{ item.name }}</div>
              <div class="desc">{{ item.description }}</div>
            </div>
            <!--<div class="module icon2">-->
              <!--<div class="title">入门攻略</div>-->
              <!--<div class="desc">帮您了解海外购置房产全流程</div>-->
            <!--</div>-->
            <!--<div class="module icon3">-->
              <!--<div class="title">买房攻略</div>-->
              <!--<div class="desc">您的疑惑和顾虑我来消除</div>-->
            <!--</div>-->
            <!--<div class="module icon4">-->
              <!--<div class="title">开盘快报</div>-->
              <!--<div class="desc">最新的楼盘资讯早班车，勿错过</div>-->
            <!--</div>-->
            <!--<div class="module icon5">-->
              <!--<div class="title">时政经济</div>-->
              <!--<div class="desc">政策先知道，紧握投资形势</div>-->
            <!--</div>-->
          </div>
        </nest-scroll>
        <div class="category-container">
          <div class="category" :style="{ backgroundImage: 'url(' + advList[0].cover + ')'}">
            <span class="favorite" :class="{ 'on': advList[0].favored }" @click="doFollow(advList[0])"></span>
            <div class="category-tag" v-if="advList[0].title">
              <span>{{ advList[0].title }}</span>
            </div>
            <div class="category-text">
              {{ advList[0].content }}
            </div>
          </div>
        </div>
        <div class="category-container">
          <div class="category" :style="{ backgroundImage: 'url(' + advList[1].cover + ')'}">
            <span class="favorite" :class="{ 'on': advList[1].favored }" @click="doFollow(advList[1])"></span>
            <div class="category-tag" v-if="advList[1].title">
              <span>{{ advList[1].title }}</span>
            </div>
            <div class="category-text">
              {{ advList[1].content }}
            </div>
          </div>
        </div>
        <div class="category-container">
          <div class="category" :style="{ backgroundImage: 'url(' + advList[2].cover + ')'}">
            <span class="favorite" :class="{ 'on': advList[2].favored }" @click="doFollow(advList[2])"></span>
            <div class="category-tag" v-if="advList[2].title">
              <span>{{ advList[2].title }}</span>
            </div>
            <div class="category-text">
              {{ advList[2].content }}
            </div>
          </div>
          <div class="category" :style="{ backgroundImage: 'url(' + advList[3].cover + ')'}">
            <span class="favorite" :class="{ 'on': advList[3].favored }" @click="doFollow(advList[3])"></span>
            <div class="category-tag" v-if="advList[3].title">
              <span>{{ advList[3].title }}</span>
            </div>
            <div class="category-text">
              {{ advList[3].content }}
            </div>
          </div>
        </div>
      </div>
    </nest-scroll>
    <nest-nav page="live"></nest-nav>
  </div>
</template>

<script>
  import CategoryService from '../services/CategoryService';
  import AdvertisementService from "../services/AdvertisementService";
  import FollowService from "../services/FollowService";

  export default {
    name: "Live",
    data() {
      return {
        categoryList: [],
        advList: []
      }
    },
    mounted() {
      this.getCategory();
      this.getItemsList();
    },
    methods: {
      getCategory() {
        CategoryService.getCategoryByAlias('news', res => {
          this.categoryList = res.data;
        })
      },
      getItemsList() {
        AdvertisementService.getItemsList('3', res => {
          this.advList = res.data;
        })
      },
      doFollow(item) {
        if (item.favored) {
          FollowService.unFollow({
            target_type: 'news',
            target_id: item.url
          }, res => {
            item.favored = false;
          })
        } else {
          FollowService.doFollow({
            target_type: 'news',
            target_id: item.url
          }, res => {
            item.favored = true;
          });
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .live {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .live-body {
      padding: .5rem 0 1.5rem;
    }
    .live-title {
      padding: 0 .28rem;
      font-size: .6rem;
      color: #333;
      line-height: 1;
    }
    .live-modules {
      display: flex;
      margin-top: .6rem;
      overflow: hidden;
      .modules-wrap {
        display: flex;
        padding: 0 .28rem;
      }
      .module {
        position: relative;
        flex-shrink: 0;
        padding: .2rem;
        width: 2.8rem;
        height: 2rem;
        margin-right: .1rem;
        background-color: #fafafa;
        box-sizing: border-box;
        &.icon1 {
          &::after {
            position: absolute;
            content: '';
            right: .25rem;
            bottom: .04rem;
            width: .62rem;
            height: .63rem;
            background: url('../assets/images/live/icon1.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &.icon2 {
          &::after {
            position: absolute;
            content: '';
            right: .23rem;
            bottom: .04rem;
            width: .42rem;
            height: .68rem;
            background: url('../assets/images/live/icon2.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &.icon3 {
          &::after {
            position: absolute;
            content: '';
            right: .15rem;
            bottom: .04rem;
            width: .59rem;
            height: .6rem;
            background: url('../assets/images/live/icon3.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &.icon4 {
          &::after {
            position: absolute;
            content: '';
            right: .15rem;
            bottom: .04rem;
            width: .75rem;
            height: .75rem;
            background: url('../assets/images/live/icon4.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &.icon5 {
          &::after {
            position: absolute;
            content: '';
            right: .15rem;
            bottom: .04rem;
            width: .75rem;
            height: .63rem;
            background: url('../assets/images/live/icon5.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:last-child {
          margin-right: 0;
        }
        .title {
          font-size: .3rem;
          color: #333;
          line-height: 1;
        }
        .desc {
          margin-top: .14rem;
          font-size: .24rem;
          color: #b2b2b2;
          line-height: .3rem;
        }
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
      .favorite {
        position: absolute;
        top: .2rem;
        right: .2rem;
        width: .36rem;
        height: .32rem;
        background: url('../assets/images/favorite-w.png') no-repeat;
        background-size: 100% 100%;
        &.on {
          background: #fff;
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
            background: url('../assets/images/hot.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
