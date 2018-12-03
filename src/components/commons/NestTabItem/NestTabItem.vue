<template>
  <div class="tab-item" :class="{ 'on': id === $parent.value }"
       @click="$parent.$emit('input', id)">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "nest-tab-item",
    props: {
      id: String
    }
  }
</script>

<style lang="scss" scoped>
  .tab-item {
    margin-right: .45rem;
    color: #999;
    line-height: .68rem;
    box-sizing: border-box;
    border-bottom: .04rem solid transparent;
    &.on {
      color: #0f9183;
      border-bottom-color: #0f9183;
    }
  }
</style>
