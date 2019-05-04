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
    <div class="signature border-bottom">{{ signature }}</div>
    <div class="form-group border-bottom">
      <div class="label">性别</div>
      <div>{{ gender }}</div>
    </div>
    <div class="form-group border-bottom">
      <div class="label">语言能力</div>
      <div class="value">
        <span v-for="item in languages">{{ item }}</span>
      </div>
    </div>
    <div class="form-group auto-height border-bottom">
      <div class="label">手机号</div>
      <div class="value">
        <div v-for="item in contacts">{{ item.phone }}</div>
      </div>
    </div>
    <div class="form-group border-bottom">
      <div class="label">邮箱</div>
      <div class="value">{{ email }}</div>
    </div>
    <div class="form-group border-bottom">
      <div class="label">注册时间</div>
      <div>{{ regDate }}</div>
    </div>
    <div class="form-group logout">
      <div class="label" @click="logoutShow = true">退出登录</div>
    </div>
    <nest-modal modal-type="confirm" :has-clear="false" :has-cancel="true" modal-cancel-txt="按错了" :status="logoutShow"
                @cancel="logoutShow = false" @close="logoutShow = false" @confirm="logout">
      确定要退出登录吗？
    </nest-modal>
  </div>
</template>

<script>
  import UserService from '../../services/UserService';
  import DICT, { getSelecteds } from '../../configs/DICT';
  import AuthService from "../../services/AuthService";
  import Storage from "../../utils/Storage";

  export default {
    name: "MyProfile",
    data() {
      return {
        logoutShow: false,
        name: '',
        account: '',
        country: '',
        portrait: '',
        signature: '',
        gender: '',
        languages: [],
        contacts: [],
        email: '',
        regDate: ''
      }
    },
    mounted() {
      UserService.getUserInfo(res => {
        this.name = res.data.local_name;
        this.account = res.data.name;
        this.portrait = res.data.avatar;
        this.country = getSelecteds(DICT.country, res.data.nation)[0].icon2;
        this.signature = res.data.introduction;
        this.gender = getSelecteds(DICT.user.gender, res.data.gender)[0].label;
        this.languages = getSelecteds(DICT.languages, res.data.languages);
        this.contacts = res.data.extra.phones;
        this.email = res.data.email;
        this.regDate = res.data.created_at;
      })
    },
    methods: {
      logout() {
        AuthService.logout(res => {
          this.logoutShow = false;
          Storage.removeLocalStorage('nest_access_token');
          Vue.prototype.$cookie.delete('nest_access_token');
          this.$router.push({ name: 'Explore' });
        });
      }
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
      background: #e6e6e6 center center no-repeat;
      background-size: cover;
      .country {
        position: absolute;
        top: 0;
        right: 0;
        width: .44rem;
        height: .44rem;
        border-radius: .44rem;
        border: 1px solid #fff;
        background: #a1a1a1 no-repeat center center;
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
        flex: 1;
        line-height: .42rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          margin-right: .4rem;
        }
      }
      &.auto-height {
        min-height: 1rem;
        height: auto;
        align-items: unset;
        box-sizing: border-box;
        .label {
          line-height: 1rem;
        }
        .value {
          padding: .29rem 0;
          line-height: .42rem;
        }
      }
      &.logout {
        .label {
          color: #999;
        }
      }
    }
  }
</style>
