<template>
  <div class="nest-modal" :class="modalType">
    <transition :name="dialogTranName">
      <div class="modal-dialog" v-show="status">
        <div class="modal-header" v-if="modalType === '' || modalType === 'calendar'">{{ title }}</div>
        <a href="javascript:;" class="modal-close" v-if="hasClear" @click="$emit('clear')">清空</a>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="hasFooter">
          <button class="modal-btn cancel" v-if="hasCancel" @click="$emit('cancel')">{{ modalCancelTxt }}</button>
          <button class="modal-btn confirm" @click="$emit('confirm')">{{ modalConfirmTxt }}</button>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="modal-backdrop" @click="$emit('close')" v-show="status"></div>
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
      modalType: {
        type: String,
        default: '' // confirm、calendar、full
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
      }
    },
    computed: {
      dialogTranName() {
        if (this.modalType === 'full') {
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
    }
    .modal-footer {
      padding: .2rem .4rem .4rem;
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
    &.calendar {
      .modal-body {
        padding: 0;
      }
    }
    &.confirm {
      .modal-dialog {
        top: 28%;
        right: .95rem;
        width: 5.6rem;
      }
      .modal-body {
        padding: 1rem .4rem;
        font-size: .28rem;
        color: #333;
        text-align: center;
      }
      .modal-footer {
        padding: 0 .2rem .2rem;
        display: flex;
      }
      .modal-btn {
        &.confirm {
          flex: 1;
        }
        &.cancel {
          margin-right: .2rem;
          flex: 1;
          color: #999;
          background-color: #f2f2f2;
        }
      }
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
