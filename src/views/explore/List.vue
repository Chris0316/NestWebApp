<template>
  <div class="lease-list">
    <nest-header :header-type="$route.params.type || 'all'"></nest-header>
    <nest-scroll class="app-body">
      <nest-list-view class="list-top" :routeType="$route.params"></nest-list-view>
    </nest-scroll>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .lease-list {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding-top: 0.2rem;
    background-color: #fff;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .list-top {
      padding-top: 0.5rem;
    }
  }
</style>
