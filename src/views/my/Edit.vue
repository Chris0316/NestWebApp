<template>
  <div class="edit">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      <div class="title">编辑信息</div>
      <div class="right" @click="save">保存</div>
    </div>
    <label class="uploader">
      <div class="portrait" :style="{ backgroundImage: 'url(' + portrait + ')'}"></div>
      <div class="camera"></div>
      <input type="file" accept="image/*" class="hidden" @change="selectMedia" />
    </label>
    <div class="details border-top">
      <div class="form-group auto-height border-bottom">
        <div class="label">个性签名</div>
        <div class="value">
          <nest-field type="textarea" class="textarea" v-model="signature" :area-style="areaStyle"></nest-field>
          <span class="num">{{ signatureNum }}</span>
        </div>
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
          <span v-for="item in languages">{{ item }}</span>
        </div>
      </div>
      <div class="form-group auto-height border-bottom arrow-right" @click="$router.push({ name: 'Cellphone' })">
        <div class="label">手机号</div>
        <div class="value">
          <div v-for="item in contacts">{{ item.phone }}</div>
        </div>
      </div>
      <div class="form-group border-bottom">
        <div class="label">邮箱</div>
        <nest-field v-model="email"></nest-field>
      </div>
    </div>
    <country :show="countryShow" v-model="country" @close="countryShow = false"></country>
    <nest-modal title="性别" :has-clear="false" :has-footer="false" @close="genderShow = false" :status="genderShow">
      <nest-radio v-model="gender" :options="genderOpts" :count-in-row="1"></nest-radio>
    </nest-modal>
    <language :show="languageShow" v-model="languages" @close="languageShow = false"></language>
  </div>
</template>

<script>
  import UploadService from '../../services/UploadService';
  import lrz from 'lrz';
  import UserService from '../../services/UserService';
  import DICT, { getSelecteds } from '../../configs/DICT';

  export default {
    name: "MyEdit",
    data() {
      return {
        portrait: '',
        countryShow: false,
        areaStyle: {
          lineHeight: .42 + 'rem'
        },
        signature: '',
        signatureNum: 30,
        country: '',
        genderShow: false,
        gender: '',
        languageShow: false,
        languages: [],
        contacts: [],
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
      },
      signature(val) {
        let len = val.length;
        this.signatureNum = 30 - len;
        if (this.signatureNum < 0) {

        }
      }
    },
    created() {
      this.genderOpts = DICT.user.gender;
    },
    mounted() {
      UserService.getUserInfo(res => {
        this.portrait = res.data.avatar;
        this.signature = res.data.introduction;
        this.country = res.data.nation;
        this.gender = res.data.gender;
        this.languages = res.data.languages;
        this.contacts = res.data.extra.phones;
        this.email = res.data.email;
      });
    },
    methods: {
      save() {
        let obj = {};
        obj.introduction = this.signature;
        obj.avatar = this.portrait;
        obj.nation = this.country;
        obj.gender = this.gender;
        obj.languages = this.languages;
        obj.phones = this.contacts;
        UserService.updateUserInfo(obj, res => {
          this.$router.go(-1);
        });
      },
      selectMedia(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let file = files[0];
        lrz(file).then(rst => {
          // 上传
          let image = rst.file;
          UploadService.uploadImage(image, 'avatar', res => {
            this.portrait = res.data.path;
          });
          return rst;
        }).catch(err => {
          console.log(err);
        }).always(() => {

        });
      }
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
        background: #dfdfdf no-repeat center center;
        background-size: cover;
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
      span.num {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -.12rem;
        margin-right: 0;
        font-size: .24rem;
        color: #b3b3b3;
        line-height: 1;
      }
      .textarea {
        padding-right: .85rem;
        height: .84rem;
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
          padding-top: .29rem;
          padding-bottom: .29rem;
          line-height: .42rem;
        }
      }
    }
  }
</style>
