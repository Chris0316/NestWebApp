<template>
  <div class="search">
    <div class="search-wrap">
      <div class="search-box">
        <div class="input-wrap">
          <input class="search-inp" type="text" v-model="keywords" placeholder="搜索经纪人或房源编号" autofocus>
          <div class="clear" v-show="clearShow" @click="clearInput"></div>
        </div>
      </div>
      <div class="cancel" @click="$router.go(-1)">取消</div>
    </div>
    <div class="result-list" v-show="keywords && resultList.length">
      <div class="search-item border-bottom" @click="doSearch(item)" v-for="item in resultList">{{ item.type === 'house' ? '房' : '人'}} - {{ item.keyword }}</div>
    </div>
    <div class="result-list" v-show="!keywords">
      <div class="search-item border-bottom">
        <div class="title">历史搜索</div>
        <div class="title" @click="clearHistory">
          <div class="del-icon"></div>
          <div>删除历史</div>
        </div>
      </div>
      <div class="search-item border-bottom" @click="doSearch(item)" v-for="item in historyList">{{ item.type === 'house' ? '房' : '人'}} - {{ item.keyword }}</div>
    </div>
  </div>
</template>

<script>
  import Storage from '../../utils/Storage';
  import SearchService from '../../services/SearchService';

  export default {
    name: "FollowSearch",
    data() {
      return {
        clearShow: false,
        keywords: '',
        timeId: null,
        resultList: [],
        historyList: []
      }
    },
    watch: {
      keywords(val) {
        this.clearShow = val !== '';
        if (val) {
          clearTimeout(this.timeId);
          this.timeId = setTimeout(() => {
            SearchService.searchFromFollow({
              keywords: val
            }, res => {
              this.resultList = res.data;
            });
          }, 300);
        } else {
          this.resultList = [];
        }
      }
    },
    created() {
      this.initHistoryList();
    },
    methods: {
      initHistoryList() {
        let keywordsStr = Storage.getLocalStorage('nest_search_follow_keywords');
        this.historyList = keywordsStr ? JSON.parse(keywordsStr) : [];
      },
      clearInput() {
        this.keywords = '';
        this.resultList = [];
      },
      clearHistory() {
        Storage.removeLocalStorage('nest_search_follow_keywords');
        this.historyList = [];
      },
      doSearch(item) {
        let keywordsStr = Storage.getLocalStorage('nest_search_follow_keywords'),
          keywordsArr = keywordsStr ? JSON.parse(keywordsStr) : [],
          newArr = keywordsArr.filter((item1, index) => {
            return item1.keyword !== item.keyword;
          });
        newArr.unshift(item);
        Storage.setLocalStorage('nest_search_follow_keywords', JSON.stringify(newArr));
        if (item.type === 'house') {
          this.$router.push({ name: 'HouseDetails', params: { id: item.id }});
        } else {
          this.$router.push({ name: 'UserDetails', params: { id: item.id }});
        }
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
      margin-bottom: .3rem;
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
        width: 100%;
        .search-inp {
          padding: 0 .7rem 0 .78rem;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          font-size: .28rem;
          border: none;
          border-radius: .1rem;
          &::-webkit-input-placeholder {
            font-size: 0.28rem;
            color: #B2B2B2;
          }
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
    .search-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      font-size: .28rem;
      color: #333;
      .title {
        display: flex;
        align-items: center;
        font-size: .24rem;
        color: #b2b2b2;
      }
      .del-icon {
        margin-right: .1rem;
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../assets/images/dele.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
