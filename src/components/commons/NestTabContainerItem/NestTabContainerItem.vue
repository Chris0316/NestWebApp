<template>
  <div class="nest-tab-container-item"
      v-show="id === $parent.value">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "nest-tab-container-item",
    props: {
      id: String
    }
  }
</script>

<style scoped>

</style>
