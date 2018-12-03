<template>
  <div class="profile">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
      <div class="right" @click="$router.push({ name: 'MyEdit' })">编辑</div>
    </div>
    <div class="personal-info">
      <div>
        <div class="name">{{ name }}</div>
        <div class="account">{{ account }}</div>
      </div>
      <div class="portrait" :style="{ backgroundImage: 'url(' + portrait + ')'}">
        <div class="country" :style="{ backgroundImage: 'url(' + country + ')'}"></div>
      </div>
    </div>
    <div class="signature border-bottom">My son. The day you were born, the very forests of Lordaeron whispered the name, Arthas.</div>
    <div class="form-group border-bottom">
      <div class="label">性别</div>
      <div>先生</div>
    </div>
    <div class="form-group border-bottom">
      <div class="label">语言能力</div>
      <div class="value">
        <span>汉语</span>
        <span>English</span>
        <span>にほんご</span>
      </div>
    </div>
    <div class="form-group auto-height border-bottom">
      <div class="label">手机号</div>
      <div>
        133****7655<br>
        133****7655
      </div>
    </div>
    <div class="form-group border-bottom">
      <div class="label">邮箱</div>
      <div>1231231@123.com</div>
    </div>
    <div class="form-group border-bottom">
      <div class="label">注册时间</div>
      <div>2018-10-10</div>
    </div>
  </div>
</template>

<script>
  import UserService from '../../services/UserService';
  import CountryDict from '../../configs/dict/Country';

  export default {
    name: "Profile",
    data() {
      return {
        name: '',
        account: '',
        country: '',
        portrait: '',
        signature: '',
        gender: '',
        languages: [],
        contact: '',
        email: '',
        regDate: ''
      }
    },
    mounted() {
      UserService.getUserInfo(res => {
        this.name = res.data.local_name;
        this.account = res.data.name;
        this.portrait = res.data.avatar;
        this.country = CountryDict(res.data.nation) ? CountryDict(res.data.nation).icon : '';
      })
    }
  }
</script>

<style lang="scss" scoped>
  .profile {
    padding: 0 .28rem;
    box-sizing: border-box;
    .header {
      position: relative;
      display: flex;
      height: 1.2rem;
      justify-content: space-between;
      align-items: center;
    }
    .back {
      width: .9rem;
      height: 100%;
      background: url('../../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .right {
      height: 100%;
      line-height: 1.2rem;
      font-size: .28rem;
      color: #333;
    }
    .personal-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .name {
      font-size: .6rem;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .account {
      margin-top: .17rem;
      font-size: .28rem;
      color: #333;
      line-height: 1;
    }
    .portrait {
      position: relative;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 1.2rem;
      background-color: #e6e6e6;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .country {
        position: absolute;
        top: 0;
        right: 0;
        width: .44rem;
        height: .44rem;
        border-radius: .44rem;
        border: 1px solid #fff;
        background-color: #a1a1a1;
        background-repeat: no-repeat;
        background-size: .44rem .44rem;
        box-sizing: border-box;
      }
    }
    .signature {
      margin-top: .4rem;
      padding-bottom: .8rem;
      font-size: .28rem;
      line-height: .36rem;
      color: #999;
    }
    .form-group {
      display: flex;
      align-items: center;
      height: 1rem;
      font-size: .28rem;
      color: #333;
      .label {
        width: 1.9rem;
      }
      .value {
        line-height: .42rem;
        span {
          margin-right: .4rem;
        }
      }
      &.auto-height {
        height: auto;
        padding: .4rem 0;
        align-items: unset;
      }
    }
  }
</style>
