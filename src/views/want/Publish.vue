<template>
  <div class="publish">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      帮住
    </div>
    <nest-scroll class="app-body">
      <div>
        <div class="content">
          <div class="title">您的需求</div>
          <div class="title-desc">给我您的需求，帮您淘满意的房子</div>
          <div class="item-label top required">我需要</div>
          <nest-radio class="mt20" v-model="trade" :options="DICT.house.trade2" :count-in-row="4"></nest-radio>
          <div class="item-label">类型</div>
          <nest-check class="mt20" v-model="type" :options="DICT.house.type2" :count-in-row="3"></nest-check>
          <div class="item-label required">区域</div>
          <nest-check class="mt20" v-model="region_ids" :options="DICT.region"></nest-check>
          <div class="item-label required">预算范围</div>
          <div class="form-group border-bottom">
            <nest-field type="tel" placeholder="最小金额" text-align="center" v-model="budget_min"></nest-field>
            <span class="split"></span>
            <nest-field type="tel" placeholder="最大金额" text-align="center" v-model="budget_max"></nest-field>
            <span class="unit">{{ unit }}</span>
          </div>
          <template v-if="detailShow">
            <template v-if="showRentType">
              <div class="item-label">方式</div>
              <nest-radio class="mt20" v-model="rent_type" :options="DICT.house.rent_type" :count-in-row="4"></nest-radio>
            </template>
            <div class="item-label">面积</div>
            <div class="form-group border-bottom">
              <nest-field type="tel" placeholder="最小面积" text-align="center" v-model="centiare_min"></nest-field>
              <span class="split"></span>
              <nest-field type="tel" placeholder="最大面积" text-align="center" v-model="centiare_max"></nest-field>
              <span class="unit">平米</span>
            </div>
            <div class="item-label">户型</div>
            <nest-check class="mt20" :options="DICT.filters.bedroom" :count-in-row="4" v-model="bedroom"></nest-check>
            <div class="border-top mt40">
              <div class="form-group arrow-right border-bottom" @click="calendarShow = true">
                <div class="label">可入住时间</div>
                <div class="value">{{ availableTime }}</div>
              </div>
            </div>
          </template>
          <div class="detail-link" @click="detailShow = !detailShow">
            <span>{{ detailShowText }}</span>
          </div>
          <div class="form-group mt80 border-top border-bottom">
            <span class="label">联系人</span>
            <div class="value">{{ contact_name }}</div>
          </div>
          <div class="form-group border-bottom arrow-right" @click="$router.push({ name: 'Cellphone' })">
            <span class="label">手机号</span>
            <div class="value">{{ contact_phone }}</div>
          </div>
          <div class="form-textarea">
            <span class="label">其他需求</span>
            <nest-field type="textarea" v-model="description"></nest-field>
          </div>
        </div>
        <div class="btn-wrapper">
          <nest-button type="primary" size="full" @click="publish">提交</nest-button>
        </div>
      </div>
    </nest-scroll>
    <nest-modal :status="calendarShow" title="选择日期" modal-type="calendar"
                @close="calendarShow = false" @confirm="calendarShow = false">
      <nest-calendar v-model="selectedDate"></nest-calendar>
    </nest-modal>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from '../../configs/DICT';
  import Utils from '../../utils/Utils';
  import UserService from '../../services/UserService';
  import WantsService from '../../services/WantsService';

  export default {
    name: "WantPublish",
    data() {
      return {
        detailShow: false,
        calendarShow: false,
        trade: '',
        type: [],
        region_ids: [],
        budget_min: '',
        budget_max: '',
        rent_type: '',
        centiare_min: '',
        centiare_max: '',
        bedroom: [],
        selectedDate: [],
        description: '',
        contact_name: '',
        contact_phone: ''
      }
    },
    computed: {
      showRentType() {
        if (this.trade === 'sale') {
          return false;
        }
        return true;
      },
      unit() {
        if (this.trade === 'sale') {
          return '万(Peso)';
        }
        return 'Peso';
      },
      availableTime() {
        if (this.selectedDate.length > 0) {
          return this.selectedDate[0].getFullYear() + '-' + (this.selectedDate[0].getMonth() + 1) + '-' + this.selectedDate[0].getDate();
        }
        return '';
      },
      detailShowText() {
        if (this.detailShow) {
          return '收起详细信息';
        } else {
          return '点击填写详细信息，轻松方便出租'
        }
      }
    },
    created() {
      if (this.$keepAlives.indexOf(this.$options.name) === -1)
        this.$keepAlives.push(this.$options.name);
      this.initConsts();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from.name === 'Cellphone') {
          vm.getUserInfo();
        }
      });
    },
    beforeRouteLeave(to, from, next) {
      let index = this.$keepAlives.indexOf(this.$options.name);
      if (to.name === 'Live') {
        this.$keepAlives.splice(index, 1);
      }
      next();
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      initConsts() {
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
      },
      validate() {
        if (this.trade === '') {
          this.$toast.info('请确定您的需要租赁或是购置');
          return false;
        }
        if (this.region_ids.length === 0) {
          this.$toast.info('请选择区域');
          return false;
        }
        if (this.budget_min === '' || this.budget_max === '') {
          this.$toast.info('请填写您的预算范围');
          return false;
        }
        return true;
      },
      getUserInfo() {
        UserService.getUserInfo(res => {
          this.contact_name = res.data.name;
          let phones = res.data.extra.phones,
            index = phones.findIndex(item => {
              return item.default === '1';
            });
          this.contact_phone = phones[index].phone;
        })
      },
      publish() {
        if (!this.validate()) {
          return false;
        }
        let wantsObj = {};
        wantsObj.trade = this.trade;
        wantsObj.type = this.type;
        wantsObj.region_ids = this.region_ids;
        wantsObj.budget_min = this.trade === 'sale' ? this.budget_min * 10000 : this.budget_min;
        wantsObj.budget_max = this.trade === 'sale' ? this.budget_max * 10000 : this.budget_max;
        wantsObj.rent_type = this.rent_type;
        wantsObj.centiare_min = this.centiare_min;
        wantsObj.centiare_max = this.centiare_max;
        wantsObj.bedroom = this.bedroom;
        wantsObj.avilable_time_start = this.availableTime;
        wantsObj.contact_name = this.contact_name;
        wantsObj.contact_phone = this.contact_phone;
        wantsObj.description = this.description;
        wantsObj = Utils.getEffectiveAttrsByObj(wantsObj);
        WantsService.publish(wantsObj, res => {
          this.$toast.success('发布成功！');
          this.$router.push({ name: 'Live' });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .publish {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .header {
      position: relative;
      display: flex;
      padding: 0 .28rem;
      height: 1.2rem;
      justify-content: center;
      align-items: center;
    }
    .back {
      position: absolute;
      top: 0;
      left: .28rem;
      width: .9rem;
      height: 100%;
      background: url('../../assets/images/return-icon.png') no-repeat left center;
      background-size: .42rem .32rem;
    }
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .content {
      padding: .4rem .28rem 0;
    }
    .title {
      font-size: .46rem;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .title-desc {
      margin-top: .2rem;
      font-size: .24rem;
      color: #b2b2b2;
      line-height: 1;
    }
    .item-label {
      margin-top: .4rem;
      font-size: .28rem;
      color: #333;
      line-height: 1;
      &.top {
        margin-top: .58rem;
      }
      &.required {
        &::after {
          content: '*';
          color: #f99c91;
        }
      }
    }
    .mt20 {
      margin-top: .2rem;
    }
    .mt40 {
      margin-top: .4rem;
    }
    .mt80 {
      margin-top: .8rem;
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
    .value {
      font-size: .28rem;
      color: #333;
    }
    .form-textarea {
      padding-top: .36rem;
      height: 3.4rem;
      display: flex;
    }
    .split {
      margin: 0 .2rem;
      width: .2rem;
      height: 1px;
      background-color: #b2b2b2;
    }
    .unit {
      margin-left: .3rem;
      width: 1.12rem;
      text-align: right;
      font-size: .28rem;
      color: #333;
      white-space: nowrap;
    }
    .detail-link {
      margin-top: .6rem;
      font-size: 0;
      text-align: center;
      line-height: 1;
      span {
        display: inline-block;
        vertical-align: middle;
        color: #f99c91;
        font-size: .28rem;
      }
      &::after {
        margin-left: .2rem;
        display: inline-block;
        vertical-align: middle;
        content: "";
        width: .35rem;
        height: .34rem;
        background: url('../../assets/images/publish.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .btn-wrapper {
      padding: .6rem .68rem 1rem;
      background-color: #f2f2f2;
    }
  }
</style>
