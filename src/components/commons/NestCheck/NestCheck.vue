<template>
  <div class="nest-check" :class="size">
    <div class="check-row" v-for="(rowNum, rowIndex) in Math.ceil(options.length / countInRow)">
      <div class="check-cell" v-for="(cellNum, cellIndex) in countInRow">
        <label class="nest-checkbox" v-if="optionsInCell(rowIndex, cellIndex)">
          <input type="checkbox" class="nest-checkbox-input"
                 v-model="currentValue"
                 :value="optionsInCell(rowIndex, cellIndex).value || optionsInCell(rowIndex, cellIndex)"
                 @change="$emit('input', currentValue)"/>
          <div class="nest-checkbox-core" :class="[{ 'text-left': isAlignLeft }, cellType]">
            <span class="check-img" v-if="optionsInCell(rowIndex, cellIndex).icon" :style="{ backgroundImage: 'url(' + optionsInCell(rowIndex, cellIndex).icon + ')' }"></span>
            <span class="check-text">{{ optionsInCell(rowIndex, cellIndex).label || optionsInCell(rowIndex, cellIndex) }}</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nest-check",
    props: {
      value: {
        type: Array,
        default: () => {
          return [];
        }
      },
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
  .nest-check {
    .check-row {
      margin-bottom: .28rem;
      display: flex;
      justify-content: space-between;
      width: 100%;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .check-cell {
      flex: 1;
      overflow: hidden;
      margin-right: .3rem;
      &:last-child {
        margin-right: 0;
      }
    }
    .nest-checkbox {
      display: block;
    }
    .nest-checkbox-input {
      display: none;
      &:checked {
        & + .nest-checkbox-core {
          color: #fff;
          background-color: #0f9183;
          &::before {
            display: none;
          }
        }
      }
    }
    .nest-checkbox-core {
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
      .check-img {
        margin-right: .2rem;
        width: .7rem;
        height: .46rem;
        background-color: #fff;
        background-size: 100% 100%;
      }
      .check-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &.large {
      .check-row {
        margin-bottom: .2rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .check-cell {
        margin-right: .2rem;
        &:last-child {
          margin-right: 0;
        }
      }
      .nest-checkbox-core {
        height: .8rem;
        font-size: .3rem;
        color: #333;
      }
    }
    &.small {
      .check-row {
        margin-bottom: .2rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .check-cell {
        margin-right: .2rem;
        &:last-child {
          margin-right: 0;
        }
      }
      .nest-checkbox-core {
        height: .48rem;
        font-size: .24rem;
      }
    }
  }
</style>
