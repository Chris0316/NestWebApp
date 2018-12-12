<template>
  <div class="nest-select" :class="{ 'tran': listShow }" @click="listShow = !listShow">
    <div class="select-label">{{ getLabelByValue(currentValue) }}</div>
    <div class="select-list" v-show="listShow">
      <div class="list-item" :class="{ 'on': currentValue === item.value }" v-for="item in options" @click.stop="select(item)">{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nest-select",
    props: {
      value: String,
      options: Array
    },
    data() {
      return {
        currentValue: this.value || this.options[0].value,
        listShow: false
      }
    },
    methods: {
      getLabelByValue(value) {
        let arr = this.options.filter(item => {
          return value === item.value;
        });
        return arr[0].label;
      },
      select(item) {
        this.currentValue = item.value;
        this.$emit('input', this.currentValue);
        this.listShow = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-select {
    position: relative;
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    .select-label {
      color: #333;
      font-size: .24rem;
      padding: 0 .12rem 0 .2rem;
    }
    &::before {
      content: '';
      width: 1px;
      height: .32rem;
      background-color: #ccc;
      transform: scaleX(.5);
      transform-origin: 0 0;
    }
    &::after {
      position: absolute;
      content: '';
      margin-top: -.04rem;
      top: 50%;
      right: .24rem;
      width: .14rem;
      height: .09rem;
      background: url("../../../assets/images/triangle.png") no-repeat;
      background-size: 100% 100%;
      transform: rotate(180deg);
      transition: transform 0.3s;
      transform-origin: 50% 50%;
    }
    &.tran {
      &::after {
        transform: rotate(0);
      }
    }
  }
  .select-list {
    position: absolute;
    top: .78rem;
    right: 0;
    width: 100%;
    border: 1px solid #e8e8ea;
    border-radius: 0.1rem;
    box-shadow: 0 0 .2rem rgba(176, 183, 187, .4);
    background: #fff;
    overflow: hidden;
    .list-item {
      box-sizing: border-box;
      height: .7rem;
      line-height: .7rem;
      padding-left: .18rem;
      background: #fff;
      color: #333;
      font-size: .24rem;
      &:active {
        background: #e7f4f2;
      }
      &.on {
        color: #0f9183;
      }
    }
  }
</style>
