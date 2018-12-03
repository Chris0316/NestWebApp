<template>
  <div class="nest-tab-bar" :class="[layout, align]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "nest-tab-bar",
    props: {
      value: String,
      layout: {
        type: String,
        default: 'auto'
      },
      align: {
        type: String,
        default: 'left'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-tab-bar {
    display: flex;
    align-items: center;
    font-size: .28rem;
    &.avg {
      .tab-item {
        margin-right: 0;
        text-align: center;
        flex: 1;
      }
    }
    &.right {
      justify-content: flex-end;
      .tab-item {
        margin-right: 0;
        margin-left: .45rem;
      }
    }
  }
</style>
