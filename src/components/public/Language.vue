<template>
  <transition name="slide">
    <div class="country" v-show="show">
      <div class="header">
        <div class="back" @click="$emit('languageClose')"></div>
      </div>
      <div class="content">
        <div class="title">语言</div>
        <nest-check class="mt60" :options="languageOpts" v-model="currentVal" size="large" :count-in-row="1"></nest-check>
        <nest-button class="mt263" type="primary" size="full" :disabled="btnDisabled" @click="handleSave">保存</nest-button>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Language",
    props: {
      value: Array,
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentVal: this.value,
        btnDisabled: true,
        languageOpts: ['中文', '한국어', 'にほんご', 'English']
      }
    },
    watch: {
      value (val) {
        this.currentVal = val;
      },
      currentVal(val) {
        if (val.length !== 0) {
          this.btnDisabled = false;
        } else {
          this.btnDisabled = true;
        }
      }
    },
    methods: {
      handleSave() {
        this.$emit('input', this.currentVal);
        this.$emit('languageClose');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slide-enter-active,
  .slide-leave-active {
    transform: translate3d(0, 0, 0);
    transition: transform .5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .country {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 .28rem;
    box-sizing: border-box;
    background-color: #fff;
    .header {
      height: 1.2rem;
    }
    .back {
      width: .9rem;
      height: 100%;
      background: url('../../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .content {
      padding: 0 .4rem;
    }
    .title {
      margin-top: .4rem;
      line-height: 1;
      font-size: .46rem;
      font-weight: bold;
      color: #333;
    }
    .mt60 {
      margin-top: .6rem;
    }
    .mt263 {
      margin-top: 2.63rem;
    }
  }
</style>
