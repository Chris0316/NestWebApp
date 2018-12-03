<template>
  <div class="nest-radio" :class="size">
    <div class="radio-row" v-for="(rowNum, rowIndex) in Math.ceil(options.length / countInRow)">
      <div class="radio-cell" v-for="(cellNum, cellIndex) in countInRow">
        <label class="nest-radio-btn" v-if="optionsInCell(rowIndex, cellIndex)">
          <input type="radio" class="nest-radio-input"
                 v-model="currentValue"
                 :value="optionsInCell(rowIndex, cellIndex).value || optionsInCell(rowIndex, cellIndex)"
                 @change="$emit('input', currentValue)" />
          <div class="nest-radio-core" :class="[{ 'text-left': isAlignLeft, 'default-txt': showDefault }, cellType]">
            <span class="radio-img" v-if="optionsInCell(rowIndex, cellIndex).icon" :style="{ backgroundImage: 'url(' + optionsInCell(rowIndex, cellIndex).icon + ')' }"></span>
            <span class="radio-text">{{ optionsInCell(rowIndex, cellIndex).label || optionsInCell(rowIndex, cellIndex) }}</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nest-radio",
    props: {
      value: [String, Number],
      countInRow: {
        type: Number,
        default: 2
      },
      size: {
        type: String,
        default: ''
      },
      isAlignLeft: {
        type: Boolean,
        default: false
      },
      showDefault: {
        type: Boolean,
        default: false
      },
      cellType: String,
      options: Array
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      }
    },
    methods: {
      optionsInCell(rowIndex, cellIndex) {
        let optionsIndex = rowIndex * this.countInRow + cellIndex;
        return this.options[optionsIndex];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-radio {
    .radio-row {
      margin-bottom: .28rem;
      display: flex;
      justify-content: space-between;
      width: 100%;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .radio-cell {
      flex: 1;
      overflow: hidden;
      margin-right: .3rem;
      &:last-child {
        margin-right: 0;
      }
    }
    .nest-radio {
      display: block;
    }
    .nest-radio-input {
      display: none;
      &:checked {
        & + .nest-radio-core {
          position: relative;
          color: #fff;
          background-color: #0f9183;
          &::before {
            display: none;
          }
          &.default-txt {
            &::after {
              position: absolute;
              content: '默认';
              margin-top: -.14rem;
              right: .28rem;
              top: 50%;
              font-size: .28rem;
              line-height: 1;
              color: #fff;
            }
          }
        }
      }
    }
    .nest-radio-core {
      position: relative;
      padding: 0 .28rem;
      display: flex;
      height: .6rem;
      align-items: center;
      border-radius: .1rem;
      background-color: #f2f2f2;
      font-size: .28rem;
      color: #999;
      text-align: center;
      &.text-left {
        text-align: left;
      }
      &.default {
        background-color: transparent;
        color: #333;
        &::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          border: 1px solid #b2b2b2;
          border-radius: .2rem;
          box-sizing: border-box;
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          transform-origin: left top;
        }
      }
      .radio-img {
        margin-right: .2rem;
        width: .7rem;
        height: .46rem;
        background-color: #fff;
        background-size: 100% 100%;
      }
      .radio-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &.large {
      .radio-row {
        margin-bottom: .2rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .radio-cell {
        margin-right: .2rem;
        &:last-child {
          margin-right: 0;
        }
      }
      .nest-radio-core {
        height: .8rem;
        font-size: .3rem;
        color: #333;
      }
    }
    &.small {
      .radio-row {
        margin-bottom: .2rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .radio-cell {
        margin-right: .2rem;
        &:last-child {
          margin-right: 0;
        }
      }
      .nest-radio-core {
        height: .48rem;
        line-height: .48rem;
        font-size: .24rem;
      }
    }
  }
</style>
