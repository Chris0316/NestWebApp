<template>
  <div class="nest-range">
    <div class="range-val">{{convertValueToText(currentStartVal)}} - {{convertValueToText(currentEndVal)}}</div>
    <div class="range-wrap" ref="nestRange">
      <div class="range start"
           :style="{left: rangeStartPos + '%'}"
           @touchstart="rangeTouchStart"
           @touchmove="rangeTouchMove"
           @touchend="rangeTouchEnd">
      </div>
      <div class="range-bar" :style="barStyle"></div>
      <div class="range end"
           :style="{left: rangeEndPos + '%'}"
           @touchstart="rangeTouchStart"
           @touchmove="rangeTouchMove"
           @touchend="rangeTouchEnd">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nest-range",
    props: {
      value: {
        type: Array,
        default: ['不限', '不限']
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 999999999
      },
      step: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        status: false,
        startX: 0,
        currentStartVal: this.value[0]  === '不限' ? this.min - this.step : this.value[0],
        currentEndVal: this.value[1]  === '不限' ? this.max + this.step : this.value[1],
        rangesOldVals: [
          this.value[0] === '不限' ? this.min - this.step : this.value[0],
          this.value[1] === '不限' ? this.max + this.step : this.value[1]
        ]
      }
    },
    computed: {
      range() {
        return (this.max - this.min) + this.step*2;
      },
      slideWidth() {
        return this.$refs.nestRange.offsetWidth;
      },
      barStyle() {
        const style = {
          left: this.rangeStartPos + '%',
          width: (this.rangeEndPos - this.rangeStartPos) + '%'
        };
        return style;
      },
      rangeStartPos() {
        let pos = (this.currentStartVal + this.step) / this.range * 100;
        return pos;
      },
      rangeEndPos() {
        let pos = (this.currentEndVal + this.step) / this.range * 100;
        return pos;
      }
    },
    methods: {
      convertValueToText(val) {
        if (val === this.min - this.step || val === this.max + this.step)
          return '不限';
        return val;
      },
      rangeTouchStart(evt) {
        this.startX = evt.touches[0].clientX;
      },
      rangeTouchMove(evt) {
        let isStart = evt.target.className.indexOf('start') > -1;
        let currentX = evt.touches[0].clientX, // 移动时当前X坐标
            offset = currentX - this.startX; // 偏移量 = 移动时X坐标 - 初始X坐标
        if (isStart) {
          this.currentStartVal = parseInt((this.rangesOldVals[0] + (offset / this.slideWidth * this.range)) / this.step) * this.step;
          if (this.currentStartVal < this.min - this.step) {
            this.currentStartVal = this.min - this.step;
          }
          if (this.currentStartVal > this.max + this.step) {
            this.currentStartVal = this.max + this.step;
          }
          if (this.currentStartVal > this.currentEndVal) {
            this.currentEndVal = this.currentStartVal;
          }
        } else {
          this.currentEndVal = parseInt((this.rangesOldVals[1] + (offset / this.slideWidth * this.range)) / this.step) * this.step;
          if (this.currentEndVal < this.min - this.step) {
            this.currentEndVal = this.min - this.step;
          }
          if (this.currentEndVal > this.max + this.step) {
            this.currentEndVal = this.max + this.step;
          }
          if (this.currentEndVal < this.currentStartVal) {
            this.currentStartVal = this.currentEndVal;
          }
        }
      },
      rangeTouchEnd() {
        this.rangesOldVals = [this.currentStartVal, this.currentEndVal];
        this.$emit('input', this.rangesOldVals);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .range-val {
    margin-top: .4rem;
    font-size: .24rem;
    color: #333;
    line-height: 1;
    text-align: center;
  }

  .range-wrap {
    margin-top: .14rem;
    position: relative;
    height: .1rem;
    border-radius: .1rem;
    background-color: rgba(15, 145, 131, .2);
  }

  .range-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: .1rem;
    background-color: #0f9183;
    z-index: 1;
  }

  .range {
    position: absolute;
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    border: .02rem solid #0f9183;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 2;
    top: -.1rem;
    transform: translateX(-50%);
  }
</style>
