<template>
  <transition name="slide">
    <div class="country" v-show="show">
      <div class="header">
        <div class="back" @click="$emit('close')"></div>
      </div>
      <div class="content">
        <div class="title">{{ title }}</div>
        <nest-radio class="mt60" :options="countryOpts" v-model="selectedVal" :is-align-left="true" size="large" :count-in-row="1"></nest-radio>
      </div>
    </div>
  </transition>
</template>

<script>
  import DICT from '../../configs/DICT';

  export default {
    name: "Country",
    props: {
      value: String,
      type: {
        type: String,
        default: 'citizenship'
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedVal: this.value,
        options: DICT.country
      }
    },
    watch: {
      value(val) {
        this.selectedVal = val;
      },
      selectedVal(val) {
        this.$emit('close');
        this.$emit('input', val);
      }
    },
    computed: {
      title() {
        return this.type === 'citizenship' ? '国籍' : '国家';
      },
      countryOpts() {
        if (this.type === 'citizenship') {
          return this.options;
        } else if (this.type === 'number') {
          this.options = this.options.slice(0, 2);
          return this.options;
        }
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
      color: #333;
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
  }
</style>
