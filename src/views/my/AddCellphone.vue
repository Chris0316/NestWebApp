<template>
  <div class="cellphone">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
    </div>
    <div class="title">添加手机号</div>
    <div class="form border-top">
      <div class="form-group border-bottom arrow-right" @click="countryShow = true">
        <div class="label">区号</div>
        <div>{{ country }}</div>
      </div>
      <div class="form-group border-bottom">
        <div class="label">手机号</div>
        <nest-field type="tel" v-model="phone" max-length="11"></nest-field>
      </div>
      <div class="form-group border-bottom">
        <div class="label">验证码</div>
        <nest-field v-model="sms" max-length="6"></nest-field>
        <div class="verify-link" :class="{ 'disabled': sent }" @click="getSms">{{ smsBtnTxt }}</div>
      </div>
    </div>
    <div class="btn-wrapper">
      <nest-button type="primary" size="full" :disabled="btnDisabled" @click="confirm">确定</nest-button>
    </div>
    <country type="number" :show="countryShow" v-model="country" @close="countryShow = false"></country>
  </div>
</template>

<script>
  import AuthService from '../../services/AuthService';
  import UserService from '../../services/UserService';

  export default {
    name: "AddCellphone",
    data() {
      return {
        countryShow: false,
        country: '0063',
        phone: '',
        sms: '',
        key: '',
        sent: false,
        btnDisabled: true,
        counter: 60,
        smsBtnTxt: '获取验证码'
      }
    },
    watch: {
      phone() {
        this.validate();
      },
      sms() {
        this.validate();
      }
    },
    methods: {
      validate() {
        if (this.phone.length === 11 && this.sms.length === 6)
          this.btnDisabled = false;
        else
          this.btnDisabled = true;
      },
      getSms() {
        if (this.sent) {
          return false;
        }
        AuthService.getSms(this.country, this.phone, res => {
          this.key = res.data.key;
          this.counterDown();
        })
      },
      confirm() {
        AuthService.smsLogin(this.country, this.phone, this.sms, this.key, () => {
          UserService.getUserInfo(res => {
            let phones = res.data.extra.phones || [],
              phone = {
                'phone': this.phone,
                'phone_prefix': this.country,
                'default': 0
              },
              arr = phones.filter(item => {
                return item.phone === this.phone;
              });
            if (arr.length > 0) {
              this.$toast.info('您已添加过此手机号！！！')
            } else {
              phones.push(phone);
              let userInfo = {
                extra: {
                  phones: phones
                }
              };
              UserService.updateUserInfo(userInfo, res2 => {
                this.$router.go(-1);
              })
            }
          })
        })
      },
      counterDown() {
        this.sent = true;
        this.smsBtnTxt = this.counter + 's后重试';
        let interval = setInterval(() => {
          this.counter--;
          this.smsBtnTxt = this.counter + 's后重试';
          if (this.counter < 1) {
            this.sent = false;
            this.smsBtnTxt = '重新获取验证码';
            this.counter = 60;
            clearInterval(interval);
          }
        }, 1000);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cellphone {
    padding: 0 .28rem;
    box-sizing: border-box;
    .header {
      position: relative;
      display: flex;
      height: 1.2rem;
      justify-content: space-between;
      align-items: center;
      .back {
        width: .9rem;
        height: 100%;
        background: url('../../assets/images/return-icon.png') no-repeat left center;
        background-size: .42rem .32rem;
      }
    }
    .title {
      margin-top: .4rem;
      font-size: .46rem;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .form {
      margin-top: .6rem;
    }
    .form-group {
      position: relative;
      display: flex;
      align-items: center;
      height: 1rem;
      font-size: .28rem;
      color: #333;
      .label {
        width: 1.9rem;
      }
      .verify-link {
        font-size: .28rem;
        color: #0f9183;
        &.disabled {
          color: #d9d9d9;
        }
      }
    }
    .btn-wrapper {
      padding: 0 .68rem .6rem;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
