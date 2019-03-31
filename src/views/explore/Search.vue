<template>
  <div class="search">
    <div class="search-wrap">
      <div class="search-box">
        <div class="input-wrap">
          <input class="search-inp" type="text" v-model="keywords" @input="doSearch">
          <div class="clear" v-show="clearShow" @click="clearInput"></div>
        </div>
        <nest-select v-model="selectType" :options="selectOpts" />
      </div>
      <div class="cancel" @click="$router.go(-1)">取消</div>
    </div>
    <div class="no-act" v-if="listShow">

      <!--首页搜索-->
      <!--<div class="near">我的附近</div>-->
      <!--<div class="near-place">-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--<div class="one-place">jazz</div>-->
      <!--</div>-->


      <div class="search-pre">
        <div class="left">历史搜索</div>
        <div class="right" @click="cleanList">
          <img class="dele-img" src="../../assets/images/dele.png" alt="">
          <div class="dele">删除历史</div>
        </div>
      </div>
      <div class="search-item" v-for="(searitem,i) in listData" :key="i">{{searitem}}</div>
    </div>
    <div class="act" v-else="!listShow">
      <div class="search-item" @click="$router.push({ name: 'Details', params: { type: 'rent',id:456 }})">马尼拉</div>
      <div class="search-item">jazz</div>
    </div>
  </div>
</template>

<script>
  import DICT from '../../configs/DICT';
  import Storage from '../../utils/Storage';
  import SearchService from '../../services/SearchService';

  export default {
    name: "ExploreSearch",
    created() {

    },
    data() {
      return {
        selectType: '',
        selectOpts: DICT.filters.select,
        clearShow: false,
        keywords: ''
      }
    },
    watch: {
      keywords(val) {
        if (val === '') {
          this.clearShow = false;
        } else {
          this.clearShow = true;
        }
      }
    },
    methods: {
      doSearch() {
        // SearchService.getSuggestList({
        //   keywords: this.keywords
        // }, res => {
        //   console.log(res);
        // })
      },
      clearInput() {
        this.keywords = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    padding: .2rem .28rem 0;
    background-color: #fff;
    .search-wrap {
      margin-bottom: .6rem;
      display: flex;
      align-items: center;
    }
    .search-box {
      position: relative;
      display: flex;
      flex: 1;
      height: .8rem;
      border: 1px solid #e8e8ea;
      border-radius: .1rem;
      box-shadow: 0 0 0.2rem rgba(176, 183, 187, .4);
      box-sizing: border-box;
      z-index: 1;
      &::before {
        position: absolute;
        content: "";
        top: .24rem;
        left: .24rem;
        width: .32rem;
        height: .32rem;
        background: url('../../assets/images/search-img.png') no-repeat;
        background-size: 100% 100%;
        z-index: 1;
      }
      .input-wrap {
        position: relative;
        width: 3.65rem;
        .search-inp {
          padding: 0 .7rem 0 .78rem;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          font-size: .28rem;
          border: none;
          border-radius: .1rem 0 0 .1rem;
        }
        .clear {
          position: absolute;
          top: 50%;
          right: 0.25rem;
          margin-top: -0.16rem;
          width: 0.32rem;
          height: 0.32rem;
          background: url("../../assets/images/delete.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .cancel {
      position: relative;
      padding-left: .8rem;
      width: 1.88rem;
      height: .8rem;
      line-height: .8rem;
      font-size: .28rem;
      color: #333;
      box-sizing: border-box;
    }
    .near {
      color: #b2b2b2;
      font-size: 0.28rem;
    }
    .near-place {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
      /*word-break:break-all;*/
    }
    .one-place {
      /*flex: 1;*/
      /*flex-shrink: 0;*/
      padding: 0.06rem 0.12rem;
      line-height: 1;
    }
    .search-pre {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 0.36rem;
      border-bottom: 1px solid #e6e6e6;
      .left {
        color: #b2b2b2;
        font-size: 0.28rem;
      }
      .right {
        display: flex;
        align-items: center;
        .dele-img {
          width: 0.3rem;
          height: 0.3rem;
        }
        .dele {
          margin-left: 0.1rem;
          color: #b2b2b2;
          font-size: 0.24rem;
        }
      }
    }
    .search-item {
      box-sizing: border-box;
      font-size: 0.28rem;
      color: #333333;
      line-height: 1rem;
      height: 1rem;
      border-bottom: 1px solid #e6e6e6;
    }
    .act {

    }
  }

  .nest-select.sear-sel {
    top: 0rem;
  }

</style>
