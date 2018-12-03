<template>
  <div class="search">
    <div class="search-wrap">
      <div class="search-box">
        <input class="search-msg" type="text" v-model="searchkey" @input="inputFun" @focus="focusFun" @blur="blurFun">
        <div class="search-img" @click="saveKey"></div>

        <!--首页搜索-->
        <!--<nest-select class="sear-sel" @keyValue="changekey" :seleNum="0"/>-->


        <div class="delete" v-if="deleteShow" @click="clearSearch"></div>
      </div>
      <div class="cancel" @click="cleanAll">
        取消
      </div>
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
          <img class="dele-img" src="../assets/images/dele.png" alt="">
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
  import storageUtil from '../utils/Storage'

  export default {
    name: "search",
    created() {
      // 读取本地数据
      this.listData = storageUtil.fetch('storageKey');
      console.log(this.listData);
      // this.listData = ['马尼拉', 'jazz', '马尼拉', 'jazz'];
    },
    data() {
      return {
        listData: [],
        listShow: true,
        searchkey: '',
        keyValue: '',
        deleteShow:false
      }
    },
    methods: {
      saveKey() {
        var Keyname = this.searchkey.trim();
        if (!Keyname) {
          this.searchkey = '';
          return;
        }
        this.listData.push(Keyname);
        storageUtil.save('storageKey',this.listData);
        this.searchkey = '';
      },
      changekey(keymsg) {
        this.keyValue = keymsg;
      },
      inputFun(ev) {
        // 模糊搜索
        // 模糊列表出现
        this.listShow = false;
        // 列表恢复
        if (!this.searchkey) {
          this.listShow = true;
        }
      },
      cleanList() {
        this.listData = [];
        localStorage.clear();
      },
      cleanAll() {
        this.listShow = true;
        this.searchkey = '';
        this.$router.go(-1);
      },
      blurFun(){
        this.deleteShow = false;
      },
      focusFun(){
        this.deleteShow = true
      },
      clearSearch(){
        this.searchkey = '';
      }
    },
  }
</script>

<style lang="scss" scoped>
  input {
    background: none;
    outline: none;
    border: 0px;
    caret-color: #0f9183;
  }

  @mixin rowcenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    padding: 0.2rem .28rem 0rem;
    background-color: #fff;
    .search-wrap {
      margin-bottom: 0.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search-box {
        position: relative;
        width: 5.06rem;
        height: 0.8rem;
        .delete{
          position: absolute;
          top: 50%;
          right: 0.25rem;
          margin-top: -0.16rem;
          width: 0.32rem;
          height: 0.32rem;
          background: url("../assets/images/delete.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .search-msg {
        box-sizing: border-box;
        padding-left: 0.64rem;
        width: 100%;
        height: 100%;
        border: 1px solid #e8e8ea;
        border-radius: 0.1rem;
        box-shadow: 0px 0px 0.2rem rgba(176, 183, 187, 0.4);
        &:active {
          background-color: #e8e8ea;
        }
      }
      .search-img {
        position: absolute;
        top: 0.26rem;
        left: 0.2rem;
        width: 0.32rem;
        height: 0.32rem;
        background: url("../assets/images/search-img.png") no-repeat;
        background-size: 100% 100%;
      }
      .search-sle {
        @include rowcenter;
        position: absolute;
        top: 0.24rem;
        right: 0rem;
      }
      .types {
        padding-left: 0.2rem;
        padding-top: 0.01rem;
        padding-bottom: 0.01rem;
        font-size: 0.24rem;
        color: #333333;
        border-left: 1px solid #cccccc;
      }
      .point {
        margin-left: 0.14rem;
        margin-right: 0.25rem;
        width: 0.14rem;
        height: 0.09rem;
        background: url("../assets/images/triangle.png") no-repeat;
        background-size: 100% 100%;
      }
      .typelist {
        position: absolute;
        right: 0rem;
        top: 0.8rem;
        width: 1.4rem;
        border: 1px solid #e8e8ea;
        border-radius: 0.1rem;
        box-shadow: 0px 0px 0.2rem rgba(176, 183, 187, 0.4);
        background: #ffffff;
        .typeli {
          box-sizing: border-box;
          height: 0.7rem;
          line-height: 0.7rem;
          padding-left: 0.18rem;
          color: #0f9183;
          font-size: 0.24rem;
          &:hover {
            background: #e7f4f2;
            color: #333333;
          }
        }
      }
      .cancel {
        flex: 1;
        margin-left: 0.28rem;
        width: 2.1rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.28rem;
        color: #333333;
      }
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
