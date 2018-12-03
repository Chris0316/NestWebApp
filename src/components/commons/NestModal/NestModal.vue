<template>
  <div class="nest-modal" :class="{ full: isFull }">
    <transition :name="dialogTranName">
      <div class="modal-dialog" v-show="status">
        <div class="modal-header" v-if="!isFull">{{ title }}</div>
        <a href="javascript:;" class="modal-close" v-if="hasClear && !isFull" @click="$emit('modalClear')">清空</a>
        <div class="modal-body" :class="{ full: bodyFull }">
          <slot></slot>
        </div>
        <div :class="oneline?'modal-oneline':'modal-footer'" v-if="hasFooter">
          <button class="modal-btn cancel" v-if="hasCancel" @click="$emit('modalCancel')">{{ modalCancelTxt }}</button>
          <button class="modal-btn confirm" @click="$emit('modalConfirm')">{{ modalConfirmTxt }}</button>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="modal-backdrop" @click="$emit('modalClose')" v-show="status"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "nest-modal",
    props: {
      status: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '标题'
      },
      isFull: {
        type: Boolean,
        default: false
      },
      modalCancelTxt: {
        type: String,
        default: '取消'
      },
      modalConfirmTxt: {
        type: String,
        default: '确定'
      },
      hasClear: {
        type: Boolean,
        default: true
      },
      hasCancel: {
        type: Boolean,
        default: false
      },
      hasFooter: {
        type: Boolean,
        default: true
      },
      bodyFull: {
        type: Boolean,
        default: false
      },
      oneline: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      dialogTranName() {
        if (this.isFull) {
          return 'dialog-full'
        } else {
          return 'dialog'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nest-modal {
    .mask-enter-active, .mask-leave-active {
      transition: opacity .5s;
    }
    .mask-enter, .mask-leave-to {
      opacity: 0;
    }
    .dialog-enter-active, .dialog-leave-active,
    .dialog-full-enter-active, .dialog-full-leave-active {
      transform: translate3d(0,0,0);
      transition: .5s;
    }
    .dialog-enter, .dialog-leave-to {
      opacity: 0;
      transform: translate3d(0,-.2rem,0);
    }
    .dialog-full-enter, .dialog-full-leave-to {
      opacity: 0;
      transform: translate3d(.2rem,0,0);
    }
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1001;
      background-color: rgba(255, 255, 255, .8);
    }
    .modal-dialog {
      position: fixed;
      top: 1.45rem;
      right: .28rem;
      width: 6.94rem;
      border-radius: .2rem;
      box-shadow: 0 .04rem .2rem rgba(182, 185, 186, .8);
      z-index: 1002;
      background-color: #fff;
    }
    .modal-header {
      line-height: 1.1rem;
      height: 1.1rem;
      font-size: .32rem;
      color: #333333;
      text-align: center;
    }
    .modal-close {
      position: absolute;
      top: .4rem;
      right: .4rem;
      color: #999;
      font-size: .28rem;
      line-height: 1;
    }
    .modal-body {
      padding: .2rem .4rem .4rem;
      &.full {
        padding: 0;
      }
    }
    .modal-footer {
      padding: .2rem .4rem .4rem;
    }
    .modal-oneline{
      display: flex;
      justify-content: space-around;
      padding: .2rem .4rem .4rem;
      .modal-btn{
        width:2.5rem;
      }
      .cancel{
        color: #999999;
        background: #F2F2F2;
      }
    }
    .modal-btn {
      display: block;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      border: none;
      border-radius: .1rem;
      text-align: center;
      font-size: .3rem;
      color: #fff;
      background-color: #0f9183;
    }
    &.full {
      .modal-dialog {
        display: flex;
        flex-direction: column;
        top: 0;
        right: 0;
        border-radius: 0;
        width: 6rem;
        height: 100%;
      }
      .modal-body {
        padding: 0;
        flex: 1;
        overflow-y: scroll;
      }
      .modal-footer {
        display: flex;
        padding: 0;
      }
      .modal-btn {
        border-radius: 0;
        height: 1rem;
        line-height: 1rem;
        &.confirm {
          flex: 1;
        }
        &.cancel {
          width: 2.4rem;
          color: #999;
          background-color: #f2f2f2;
        }
      }
    }
  }
</style>
