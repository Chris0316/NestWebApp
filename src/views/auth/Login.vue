<template>
  <div class="login">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
    </div>
    <div class="content">
      <div class="title border-bottom">欢迎登录鸟窝</div>
      <div class="form-group border-bottom">
        <div class="left" @click="countryShow = !countryShow">{{ country }} <span class="flag"
                                                                                  :style="{ backgroundImage: 'url(' + flag + ')' }"></span>
          <div class="arrow-down"></div>
        </div>
        <div class="right">
          <nest-field type="tel" class="form-input" placeholder="请输入手机号" max-length="11" v-model="phone"></nest-field>
        </div>
      </div>
      <div class="form-tip">
        未注册的手机号自动创建鸟窝账户
      </div>
      <nest-button class="mt60" type="primary" size="full" @click="getSms">获取短信验证码</nest-button>
      <div class="login-tip">其他登录方式</div>
      <div class="third-login">
        <div class="third wechat" @click="thirdLogin('wechat')"></div>
        <div class="third fb" @click="thirdLogin('facebook')"></div>
        <div class="third line" @click="thirdLogin('line')"></div>
      </div>
      <div class="contract-tip">登录代表你已同意鸟窝用户协议及隐私政策</div>
    </div>
    <country type="number" :show="countryShow" v-model="country" @close="countryShow = false"></country>
  </div>
</template>

<script>
  import Storage from '../../utils/Storage'
  import DICT, {getSelecteds} from '../../configs/DICT'
  import AuthService from '../../services/AuthService'

  export default {
    name: "AuthLogin",
    data() {
      return {
        country: '0063',
        phone: '09888888888',
        countryShow: false
      }
    },
    computed: {
      flag() {
        return getSelecteds(DICT.country, this.country)[0].icon;
      }
    },
    methods: {
      getSms() {
        let smsListStr = Storage.getLocalStorage('nest_sms_list'),
          smsList = smsListStr ? JSON.parse(smsListStr) : {},
          sendTime = smsList[this.phone];
        if (sendTime) {
          let now = new Date().getTime(),
            diff = parseInt((now - sendTime) / 1000);
          if (diff < 60) {
            // 同个手机号发送短信小于60秒间隔
            this.$router.push({name: 'AuthSmsCode'});
          } else {
            // 同个手机号发送短信大于60秒间隔
            smsList[this.phone] = new Date().getTime();
            Storage.setLocalStorage('nest_sms_list', JSON.stringify(smsList));
            AuthService.getSms(this.country, this.phone, res => {
              let key = res.data.key;
              Storage.setLocalStorage('nest_auth_phone_prefix', this.country);
              Storage.setLocalStorage('nest_auth_phone', this.phone);
              Storage.setLocalStorage('nest_auth_key', key);
              this.$router.push({name: 'AuthSmsCode'})
            });
          }
        } else {
          smsList[this.phone] = new Date().getTime();
          Storage.setLocalStorage('nest_sms_list', JSON.stringify(smsList));
          AuthService.getSms(this.country, this.phone, res => {
            let key = res.data.key;
            Storage.setLocalStorage('nest_auth_phone_prefix', this.country);
            Storage.setLocalStorage('nest_auth_phone', this.phone);
            Storage.setLocalStorage('nest_auth_key', key);
            this.$router.push({name: 'AuthSmsCode'})
          });
        }
      },
      thirdLogin(type) {
        if (document.referrer) {
          window.location.href = process.env.API_SERVER.replace('com/api', 'com') + "/auth/" + type + "?referer=" + encodeURI(document.referrer);
        } else {
          window.location.href = process.env.API_SERVER.replace('com/api', 'com') + "/auth/" + type;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    padding: 0 .28rem;
    box-sizing: border-box;
    .header {
      height: 1.2rem;
    }
    .back {
      width: .9rem;
      height: 100%;
      background: url('../../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .content {
      padding: 0 .4rem;
    }
    .title {
      height: 1.16rem;
      margin-top: .4rem;
      font-size: .46rem;
      font-weight: bold;
      color: #333;
      box-sizing: border-box;
    }
    .form-group {
      display: flex;
      align-items: center;
      height: 1rem;
      .left {
        position: relative;
        width: 1.85rem;
        font-size: .28rem;
        color: #333;
        .flag {
          position: absolute;
          top: 50%;
          right: .48rem;
          width: .4rem;
          height: .26rem;
          background-color: #fff;
          background-size: 100% 100%;
          transform: translateY(-50%);
        }
        .arrow-down {
          position: absolute;
          top: 50%;
          right: .24rem;
          width: .14rem;
          height: .09rem;
          background: url('../../assets/images/triangle.png') no-repeat;
          background-size: 100% 100%;
          transform: translateY(-50%);
        }
        &::after {
          position: absolute;
          content: "";
          top: 50%;
          right: 0;
          width: 1px;
          height: .32rem;
          background-color: #ccc;
          transform: scaleX(.5) translateY(-50%);
          transform-origin: 100% 0;
        }
      }
      .right {
        flex: 1;
        .form-input {
          padding: 0 .2rem;
        }
      }
    }
    .form-tip {
      margin-top: .2rem;
      font-size: .24rem;
      color: #b3b3b3;
      line-height: 1;
    }
    .mt60 {
      margin-top: .6rem;
    }
    .login-tip {
      margin-top: 1.7rem;
      font-size: .24rem;
      color: #999;
      line-height: 1;
      text-align: center;
    }
    .third-login {
      margin-top: .4rem;
      display: flex;
      justify-content: space-between;
      padding: 0 .97rem;
      .third {
        width: 1rem;
        height: 1rem;
        &.wechat {
          background: url('../../assets/images/icon-wechat.png') no-repeat;
          background-size: 100% 100%;
        }
        &.fb {
          background: url('../../assets/images/icon-facebook.png') no-repeat;
          background-size: 100% 100%;
        }
        &.line {
          background: url('../../assets/images/icon-line.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .contract-tip {
      margin-top: 1.2rem;
      line-height: 1;
      font-size: .24rem;
      text-align: center;
      color: #b3b3b3;
    }
  }
</style>
