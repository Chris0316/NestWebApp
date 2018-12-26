<template>
  <div class="nest-swipe-cell">
    <div class="swipe-wrapper"
         :class="transitionClass"
         :style="{ transform: 'translate3d(' + offsetX + 'px,0,0)' }"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd"
         @transitionend="removeTransition">
      <slot name="content"></slot>
    </div>
    <div class="swipe-control" ref="control">
      <slot name="controls" ref="controlBar"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nest-swipe-cell",
    data() {
      return {
        transitionClass: '',
        startX: 0,
        startY: 0,
        offsetX: 0,
        controlWidth: 0,
        distance: 0
      }
    },
    methods: {
      handleTouchStart(event) {
        this.flag = false; // 标注是否是进行过move操作
        this.startX = event.touches[0].clientX; // 手指触点X位置
        this.startY = event.touches[0].clientY; // 手指触点Y位置
        this.controlWidth = this.$refs.control.offsetWidth; // 操作按钮栏宽度
        this._swipeX = true;
        this._swipeY = true;
      },
      handleTouchMove(event) {
        let currentX = event.touches[0].clientX,
          currentY = event.touches[0].clientY,
          absPos = (currentX - this.startX) + this.distance;
        if (absPos > 0)
          absPos = 0;
        else if (absPos < 0 - this.controlWidth)
          absPos = 0 - this.controlWidth;
        if (this._swipeX && Math.abs(currentX - this.startX) >= Math.abs(currentY - this.startY)) {
          // 左右滑动
          this.flag = true;
          event.stopPropagation();
          event.preventDefault();
          this._swipeY = false;
          this.offsetX = absPos; // 移动位置
        } else if (this._swipeY && Math.abs(currentX - this.startX) < Math.abs(currentY - this.startY))
          // 上下滑动
          this._swipeX = false;
      },
      handleTouchEnd(event) {
        if (this.flag) {
          event.stopPropagation();
          this.transitionClass = 'release';
          let cond1 = this.offsetX,
            cond2 = 0 - this.controlWidth;
          if (cond1 < cond2 || cond1 < cond2 / 2) {
            this.offsetX = -this.controlWidth;
          } else if (cond1 > 0 || cond1 >= cond2 / 2) {
            this.offsetX = 0;
          }
          this.distance = this.offsetX;
        }
      },
      removeTransition() {
        this.transitionClass = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-swipe-cell, .swipe-wrapper {
    position: relative;
  }

  .swipe-wrapper {
    position: relative;
    z-index: 2;
    background-color: #fff;
    &.release {
      transition: transform .3s ease-out;
    }
  }

  .swipe-control {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
</style>
