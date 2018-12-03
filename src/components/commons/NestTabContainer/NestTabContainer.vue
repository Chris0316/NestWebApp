<template>
  <div class="nest-tab-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "nest-tab-container",
    props: {
      value: String
    }
  }
</script>

<style lang="scss" scoped>
</style>
