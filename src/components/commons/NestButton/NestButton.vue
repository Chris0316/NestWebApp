<template>
  <button class="nest-button" type="button" :class="[type, size]" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "nest-button",
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-button {
    display: block;
    padding: 0 .22rem;
    border-radius: .1rem;
    text-align: center;
    min-width: 1.2rem;
    max-width: 1.6rem;
    height: .6rem;
    line-height: .6rem;
    font-size: .28rem;
    box-sizing: border-box;
    border: none;
    &.default {
      position: relative;
      color: #333;
      &.active {
        background-color: #0f9183;
        color: #fff;
        &::after {
          display: none;
        }
      }
      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        border: 1px solid #b2b2b2;
        border-radius: .2rem;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(.5);
        transform-origin: left top;
      }
    }
    &.primary {
      background-color: #0f9183;
      color: #fff;
    }
    &.full {
      font-size: .3rem;
      max-width: 100%;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
    }
    &[disabled], &.disabled {
      background-color: #d9d9d9;
      color: #fff;
    }
  }
</style>
