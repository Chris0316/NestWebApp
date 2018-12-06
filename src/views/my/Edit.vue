<template>
  <div class="edit">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      <div class="title">编辑信息</div>
      <div class="right">保存</div>
    </div>
    <label class="uploader">
      <div class="portrait"></div>
      <div class="camera"></div>
      <input type="file" accept="image/*" class="hidden" />
    </label>
    <div class="details border-top">
      <div class="form-group auto-height border-bottom">
        <div class="label">个性签名</div>
        <nest-field type="textarea" class="textarea" v-model="signature" :area-style="areaStyle"></nest-field>
        <span class="num">12</span>
      </div>
      <div class="form-group border-bottom arrow-right" @click="countryShow = true">
        <div class="label">国籍</div>
        <div class="value">{{ countryName }}</div>
      </div>
      <div class="form-group border-bottom arrow-right" @click="genderShow = true">
        <div class="label">性别</div>
        <div class="value">{{ genderLabel }}</div>
      </div>
      <div class="form-group border-bottom arrow-right" @click="languageShow = true">
        <div class="label">语言能力</div>
        <div class="value">
          <span>汉语</span>
          <span>English</span>
          <span>にほんご</span>
        </div>
      </div>
      <div class="form-group auto-height border-bottom arrow-right">
        <div class="label">手机号</div>
        <div>
          133****7655<br>
          133****7655
        </div>
      </div>
      <div class="form-group border-bottom">
        <div class="label">邮箱</div>
        <nest-field v-model="email"></nest-field>
      </div>
    </div>
    <country :show="countryShow" v-model="country"></country>
    <nest-modal title="性别" :has-clear="false" :has-footer="false" @modalClose="genderShow = false" :status="genderShow">
      <nest-radio v-model="gender" :options="genderOpts" :count-in-row="1"></nest-radio>
    </nest-modal>
    <language :show="languageShow" v-model="languages" @languageClose="languageShow = false"></language>
  </div>
</template>

<script>
  import UserService from '../../services/UserService';
  import DICT, { getSelecteds } from '../../configs/DICT';

  export default {
    name: "Edit",
    data() {
      return {
        countryShow: false,
        areaStyle: {
          lineHeight: .42 + 'rem'
        },
        signature: '',
        country: '',
        genderShow: false,
        genderOpts: DICT.user.gender,
        gender: '',
        languageShow: false,
        languages: [],
        email: ''
      }
    },
    computed: {
      genderLabel() {
        return getSelecteds(DICT.user.gender, this.gender)[0] ? getSelecteds(DICT.user.gender, this.gender)[0].label : ''
      },
      countryName() {
        return getSelecteds(DICT.country, this.country)[0] ? getSelecteds(DICT.country, this.country)[0].label : ''
      }
    },
    watch: {
      gender() {
        this.genderShow = false;
      }
    },
    mounted() {
      UserService.getUserInfo(res => {
        this.signature = res.data.introduction;
        this.country = res.data.nation;
        this.gender = res.data.gender;
        this.languages = res.data.languages;
        this.email = res.data.email;
      });
    }
  }
</script>

<style lang="scss" scoped>
  .edit {
    .header {
      position: relative;
      display: flex;
      padding: 0 .28rem;
      height: 1.2rem;
      justify-content: space-between;
      align-items: center;
      .back {
        width: .9rem;
        height: 100%;
        background: url('../../assets/images/return-icon.png') no-repeat left center;
        background-size: .42rem .32rem;
      }
      .title {
        font-size: .32rem;
        color: #333;
      }
      .right {
        width: .9rem;
        height: 100%;
        line-height: 1.2rem;
        font-size: .28rem;
        color: #333;
        text-align: right;
      }
    }
    .uploader {
      display: block;
      position: relative;
      background: linear-gradient(0deg, rgba(242, 242, 242, 1), rgba(255, 255, 255, 1));
      .portrait {
        margin: auto;
        width: 2.4rem;
        height: 2.4rem;
        background-color: #dfdfdf;
      }
      .camera {
        position: absolute;
        right: .33rem;
        bottom: .2rem;
        width: .42rem;
        height: .34rem;
        background: url('../../assets/images/icon-photo.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .details {
      margin-top: .6rem;
      padding: 0 .28rem;
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
      .value {
        flex: 1;
        line-height: .42rem;
        span {
          margin-right: .4rem;
        }
      }
      .num {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -.12rem;
        font-size: .24rem;
        color: #b3b3b3;
        line-height: 1;
      }
      .textarea {
        padding-right: .85rem;
        height: .84rem;
      }
      &.auto-height {
        height: auto;
        padding: .4rem 0;
        align-items: unset;
        line-height: .42rem;
      }
    }
  }
</style>
