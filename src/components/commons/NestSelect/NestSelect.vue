<template>
  <div class="nest-select">
    <div class="search-sle" v-if="select" @click.stop="dropDown">
      <div class="types">
        <div class="type-text">{{selectedVal}}</div>
      </div>
      <div class="point" :class="{trans: pointtran===true }"></div>
    </div>
    <div class="typelist" v-if="listShow">
      <div class="typeli" :class="{on: currentIndex===i}" @click.stop="chooseVal(i,$event)" v-for="(option,i) in options"
           :value="option.val" :key="i">
        {{option.val}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nest-select",
    props: {
      seleNum:{
        type:Number,
        default:0
      },
      options: {
        type: Array,
        default: function () {
          return [
            {
              val: '二手房',
              id: 'second'
            },
            {
              val: '租房',
              id: 'rent'
            }
          ]
        }
      }
    },
    data() {
      return {
        selectedIndex: this.seleNum,
        listShow: false,
        pointtran: false,
        select: true
      }
    },
    methods: {
      dropDown() {
        this.listShow = !this.listShow;
        this.pointtran = !this.pointtran;
      },
      chooseVal(i, ev) {
        // 向后台发送的值
        var keyValue = ev.target.innerHTML.trim();
        // console.log(keyValue);
        this.$emit('keyValue',keyValue);
        this.selectedIndex = i;
        this.listShow = false;
        this.pointtran = !this.pointtran;
      }
    },
    computed: {
      selectedVal: {
        get: function () {
          return this.options[this.selectedIndex].val;
        },
        set: function (newValue) {
          return this.options[this.selectedIndex].val;
        }
      },
      currentIndex() {
        return this.selectedIndex;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .nest-select {
    position: absolute;
    right: 0rem;
    z-index: 1;
    .search-sle {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 1.47rem;
      height: 0.8rem;
    }
    .types {
      display: flex;
      align-items: center;
      padding-top: 0.01rem;
      padding-bottom: 0.01rem;
      font-size: 0.24rem;
      color: #333333;
      .type-text{
        display: flex;
        align-items: center;
      }
      .type-text::before{
        display: block;
        content: '';
        margin-right: 0.2rem;
        width: 1px;
        height: 0.34rem;
        background: #cccccc;
      }

    }
    .point {
      position: absolute;
      right: 0.04rem;
      top: 0.35rem;
      margin-left: 0.14rem;
      margin-right: 0.25rem;
      width: 0.14rem;
      height: 0.09rem;
      background: url("../../../assets/images/triangle.png") no-repeat;
      background-size: 100% 100%;
      transition: transform 0.3s;
      &.trans {
        transform: rotate(180deg);
      }
    }
    .typelist {
      position: absolute;
      top: 0.78rem;
      right: 0rem;
      width: 1.4rem;
      border: 1px solid #e8e8ea;
      border-radius: 0.1rem;
      box-shadow: 0px 0px 0.2rem rgba(176, 183, 187, 0.4);
      background: #ffffff;
      overflow: hidden;
      .typeli {
        box-sizing: border-box;
        height: 0.7rem;
        line-height: 0.7rem;
        padding-left: 0.18rem;
        background: #fff;
        color: #333333;
        font-size: 0.24rem;
        &:active {
          background: #e7f4f2;
        }
        &.on {
          color: #0f9183;
        }
      }
    }
  }


</style>
