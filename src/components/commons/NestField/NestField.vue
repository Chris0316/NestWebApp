<template>
  <div class="nest-field">
    <span class="indicator" :class="{ 'textarea': type === 'textarea', 'center': textAlign === 'center'}"
          v-if="hasIndicator"
          v-show="!hasFocused && !currentVal && !placeholder">
    </span>
    <input class="nest-input" :class="textAlign"
           v-if="type !== 'textarea'"
           :type="type"
           :maxlength="maxLength"
           :placeholder="placeholder"
           :readonly="readonly"
           :disabled="disabled"
           :value="currentVal"
           @focus="hasFocused = true"
           @blur="hasFocused = false"
           @change="$emit('change', currentVal)"
           @input="handleInput" />
    <textarea class="nest-textarea" :style="areaStyle" v-else
              :placeholder="placeholder"
              v-model="currentVal"
              :rows="rows"
              :readonly="readonly"
              :disabled="disabled"
              @focus="hasFocused = true"
              @blur="hasFocused = false"
              @change="$emit('change', currentVal)">
    </textarea>
  </div>
</template>

<script>
  export default {
    name: "nest-field",
    data() {
      return {
        currentVal: this.value,
        hasFocused: false
      }
    },
    props: {
      value: String,
      hasIndicator: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'text'
      },
      textAlign: {
        type: String,
        default: 'left'
      },
      areaStyle: Object,
      rows: String,
      disabled: Boolean,
      readonly: Boolean,
      maxLength: String,
      placeholder: String
    },
    watch: {
      value(val) {
        this.currentVal = val;
      },
      currentVal (val) {
        this.$emit('input', val);
      }
    },
    methods: {
      handleInput(e) {
        this.currentVal = e.target.value;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-field {
    position: relative;
    flex: 1;
    .indicator {
      position: absolute;
      content: '';
      margin-top: -.05rem;
      top: 50%;
      left: 0;
      width: .1rem;
      height: .1rem;
      border-radius: .1rem;
      background-color: #d9d9d9;
      pointer-events: none;
      &.center{
        margin-left: -.05rem;
        left: 50%;
      }
      &.textarea {
        top: .14rem;
        margin-top: 0;
      }
    }
    .nest-input {
      padding: 0;
      width: 100%;
      border: none;
      font-size: .28rem;
      color: #333;
      &.center {
        text-align: center;
      }
      &::-webkit-input-placeholder {
        color: #b3b3b3;
      }
    }
    .nest-textarea {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
      resize: none;
      font-size: .28rem;
      color: #333;
      &::-webkit-input-placeholder {
        color: #b3b3b3;
      }
    }
  }
</style>
