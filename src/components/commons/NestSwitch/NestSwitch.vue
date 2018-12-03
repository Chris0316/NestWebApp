<template>
  <label class="nest-switch">
    <input type="checkbox" class="switch-actual" v-model="currentVal" @change="switchChange">
    <span class="switch-core"></span>
  </label>
</template>

<script>
  export default {
    name: "nest-switch",
    data() {
      return {
        currentVal: this.value
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      switchChange() {
        this.$emit('input', this.currentVal);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-switch {
    display: inline-block;
    .switch-actual {
      display: none;
      &:checked {
        & + .switch-core {
          border: 1px solid #ADD9D5;
          background-color: #ADD9D5;
          &::after {
            background: #0f9183 url('../../../assets/images/icon-right.png') center center no-repeat;
            background-size: .24rem .16rem;
            transform: translate3d(.4rem, -50%, 0);
          }
        }
      }
    }
    .switch-core {
      position: relative;
      display: block;
      width: 1rem;
      height: .6rem;
      border: 1px solid #d9d9d9;
      border-radius: .6rem;
      background-color: #f2f2f2;
      transition: background-color .3s;
      box-sizing: border-box;
      &::after {
        position: absolute;
        content: "";
        left: 0;
        top: 50%;
        width: .6rem;
        height: .6rem;
        border-radius: .6rem;
        background: #d9d9d9 url('../../../assets/images/icon-wrong.png') center center no-repeat;
        background-size: .18rem .18rem;
        transition: .3s;
        transform: translate3d(0, -50%, 0);
      }
    }
  }
</style>
