<template>
  <div class="nest-share">
    <transition name="dialog">
      <div class="modal-dialog" v-show="status">
        <div class="share-line">
          <div class="share-item wechat">
            <div class="icon"></div>
            <div class="text">微信好友</div>
          </div>
          <div class="share-item moments">
            <div class="icon"></div>
            <div class="text">朋友圈</div>
          </div>
          <div class="share-item qq">
            <div class="icon"></div>
            <div class="text">QQ好友</div>
          </div>
          <div class="share-item qqzone">
            <div class="icon"></div>
            <div class="text">QQ空间</div>
          </div>
        </div>
        <div class="share-line mt50">
          <div class="share-item facebook" @click="facebook()">
            <div class="icon"></div>
            <div class="text">Facebook</div>
          </div>
          <div class="share-item messanger">
            <div class="icon"></div>
            <div class="text">Messanger</div>
          </div>
          <div class="share-item line">
            <div class="icon"></div>
            <div class="text">LINE</div>
          </div>
          <div class="share-item link">
            <div class="icon"></div>
            <div class="text">复制链接</div>
          </div>
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
    name: "NestShare",
    props: {
      status: {
        type: Boolean,
        default: false
      }
    },
    created() {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '2238721389736235',
          xfbml: true,
          version: 'v3.2'
        });
        FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    methods: {
      facebook() {
        FB.ui({
          method: 'share',
          mobile_iframe: true,
          href: window.location.href,
        }, function (response) {
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .nest-share {
    .mask-enter-active, .mask-leave-active {
      transition: opacity .5s;
    }
    .mask-enter, .mask-leave-to {
      opacity: 0;
    }
    .dialog-enter-active, .dialog-leave-active {
      transform: translate3d(0, 0, 0);
      transition: .5s;
    }
    .dialog-enter, .dialog-leave-to {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
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
      padding: .4rem .5rem 1rem;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1002;
      box-shadow: 1px 4px .2rem 0 rgba(182, 185, 186, 0.8);
      background-color: #fff;
      box-sizing: border-box;
      .share-line {
        display: flex;
        justify-content: space-between;
        .share-item {
          width: 1.3rem;
          .icon {
            height: 1.02rem;
            background: no-repeat center center;
          }
          .text {
            font-size: .28rem;
            color: #0F9183;
            height: .28rem;
            line-height: 1;
            text-align: center;
          }
          &.wechat {
            .icon {
              background-image: url('../../../assets/images/share/wechat.png');
              background-size: .58rem .47rem;
            }
          }
          &.moments {
            .icon {
              background-image: url('../../../assets/images/share/moments.png');
              background-size: .56rem .56rem;
            }
          }
          &.qq {
            .icon {
              background-image: url('../../../assets/images/share/qq.png');
              background-size: .48rem .54rem;
            }
          }
          &.qqzone {
            .icon {
              background-image: url('../../../assets/images/share/qqzone.png');
              background-size: .58rem .54rem;
            }
          }
          &.facebook {
            .icon {
              background-image: url('../../../assets/images/share/facebook.png');
              background-size: .28rem .54rem;
            }
          }
          &.messanger {
            .icon {
              background-image: url('../../../assets/images/share/messanger.png');
              background-size: .56rem .56rem;
            }
          }
          &.line {
            .icon {
              background-image: url('../../../assets/images/share/line.png');
              background-size: .58rem .56rem;
            }
          }
          &.link {
            .icon {
              background-image: url('../../../assets/images/share/link.png');
              background-size: .57rem .57rem;
            }
          }
        }
        &.mt50 {
          margin-top: .5rem;
        }
      }
    }
  }
</style>
