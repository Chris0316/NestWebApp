<template>
  <div class="base-info">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
    </div>
    <div class="content">
      <div class="title">基本信息设置</div>
      <div class="title-tip">设置基本信息，更智能的使用鸟巢</div>
      <div class="radio-tit">性别</div>
      <nest-radio class="radio-spacing border-bottom" v-model="gender" :options="sexTypeOpts" :count-in-row="3"></nest-radio>
      <div class="form-group border-bottom arrow-right" @click="languageShow = !languageShow">
        <div class="label">语言</div>
        <div class="group-right">{{ languages.join(', ') }}</div>
      </div>
      <div class="form-group border-bottom">
        <div class="label">E-mail</div>
        <nest-field class="group-right" v-model="email"></nest-field>
      </div>
      <div class="form-tip">设置邮箱，更好的使用帮住功能</div>
      <nest-button class="mt90" type="primary" size="full" :disabled="btnDisabled" @click="handleSave">完成</nest-button>
    </div>
    <language :show="languageShow" v-model="languages" @languageClose="languageClose"></language>
  </div>
</template>

<script>
  import UserService from '../../services/UserService';

  export default {
    name: "BaseInfo2",
    data() {
      return {
        btnDisabled: true,
        languageShow: false,
        gender: '',
        sexTypeOpts: [{
          label: '先生',
          value: '1'
        }, {
          label: '女士',
          value: '2'
        }, {
          label: '其他',
          value: '3'
        }],
        languages: [],
        email: ''
      }
    },
    mounted() {
      UserService.getUserInfo(res => {
        this.gender = res.data.gender;
        this.languages = res.data.languages;
        this.email = res.data.email;
      });
    },
    watch: {
      gender() {
        this.lightenBtn();
      },
      languages() {
        this.lightenBtn();
      },
      email() {
        this.lightenBtn();
      }
    },
    methods: {
      languageClose() {
        this.languageShow = false;
      },
      lightenBtn() {
        if (this.gender && this.languages.length > 0 && this.email) {
          this.btnDisabled = false;
        } else {
          this.btnDisabled = true;
        }
      },
      handleSave() {
        let userInfo = {
          gender: this.gender,
          languages: this.languages,
          email: this.email
        };
        UserService.updateUserInfo(userInfo, res => {
          this.$router.push({ name: 'Explore' })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-info {
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
      margin-top: .4rem;
      line-height: 1;
      font-size: .46rem;
      font-weight: bold;
      color: #333;
    }
    .title-tip {
      margin-top: .2rem;
      font-size: .24rem;
      color: #b3b3b3;
      line-height: 1;
    }
    .radio-tit {
      margin-top: .6rem;
      font-size: .28rem;
      color: #333;
      line-height: 1;
    }
    .radio-spacing {
      margin-top: .2rem;
      padding-bottom: .6rem;
    }
    .form-group {
      display: flex;
      align-items: center;
      height: 1rem;
    }
    .label {
      width: 1.9rem;
      font-size: .28rem;
      color: #333;
    }
    .group-right {
      padding-right: .3rem;
      flex: 1;
      font-size: .28rem;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .form-tip {
      margin-top: .2rem;
      font-size: .24rem;
      color: #b3b3b3;
      line-height: 1;
    }
    .mt90 {
      margin-top: .9rem;
    }
  }
</style>
