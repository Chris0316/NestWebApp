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
          <div class="item-label top">我需要</div>
          <nest-radio class="mt20" :options="requireOpts"></nest-radio>
          <div class="item-label">类型</div>
          <nest-radio class="mt20" :options="typeOpts"></nest-radio>
          <div class="item-label">区域</div>
          <nest-check class="mt20" :options="regionOpts"></nest-check>
          <div class="item-label">预算范围</div>
          <div class="form-group border-bottom">
            <nest-field placeholder="最小金额" text-align="center"></nest-field>
            <span class="split"></span>
            <nest-field placeholder="最大金额" text-align="center"></nest-field>
            <span class="unit">万(Peso)</span>
          </div>
          <div class="detail-link" v-if="!detailShow" @click="detailShow = true">
            <span>点击填写详细信息，轻松方便出租</span>
          </div>
          <template v-if="detailShow">
            <div class="item-label">方式</div>
            <nest-radio class="mt20" :options="waysOpts"></nest-radio>
            <div class="item-label">面积</div>
            <div class="form-group border-bottom">
              <nest-field placeholder="最小面积" text-align="center"></nest-field>
              <span class="split"></span>
              <nest-field placeholder="最大面积" text-align="center"></nest-field>
              <span class="unit">平米</span>
            </div>
            <div class="item-label">户型</div>
            <nest-check class="mt20" :options="typeOpts"></nest-check>
            <div class="item-label">可入住时间</div>
            <div class="form-group border-bottom" @click="calendarShow = true">
              <nest-field placeholder="起始日期" text-align="center" :readonly="true" v-model="startDate"></nest-field>
              <span class="split"></span>
              <nest-field placeholder="截止日期" text-align="center" :readonly="true" v-model="endDate"></nest-field>
            </div>
          </template>
          <div class="form-group mt80 border-top border-bottom">
            <span class="label">联系人</span>
            <nest-field></nest-field>
            <div class="radio">
              <nest-radio :options="sexOpts" size="small"></nest-radio>
            </div>
          </div>
          <div class="form-group border-bottom">
            <span class="label">手机号</span>
            <nest-field placeholder="无需区号，11位数"></nest-field>
          </div>
          <div class="form-textarea">
            <span class="label">其他需求</span>
            <nest-field type="textarea"></nest-field>
          </div>
        </div>
        <div class="btn-wrapper">
          <nest-button type="primary" size="full">提交</nest-button>
        </div>
      </div>
    </nest-scroll>
    <nest-modal :status="calendarShow" title="选择日期" :body-full="true" @modalClose="calendarShow = false">
      <nest-calendar :range="true" v-model="selectedDate"></nest-calendar>
    </nest-modal>
  </div>
</template>

<script>
  export default {
    name: "Publish",
    data() {
      return {
        requireOpts: ['租赁', '购置'],
        typeOpts: ['公寓', '别墅', '民居', '商铺/写字楼'],
        // regionVal: [],
        regionOpts: ['马卡提(Makati)', '帕赛(Pasay)', '马尼拉市(City of Manila)', '曼达卢永(Mandaluyong)', '奎松(Quezon)', 'BGC(BGC, Taguig)', '帕西市(Pasig)'],
        detailShow: false,
        waysOpts: ['整租', '合租'],
        typeOpts: ['一居室', '二居室', '三居室', '其他'],
        sexOpts: ['先生', '女士'],
        calendarShow: false,
        selectedDate: [],
        startDate: '',
        endDate: ''
      }
    },
    watch: {
      selectedDate(val) {
        this.startDate = val[0].getFullYear() + '-' + (val[0].getMonth() + 1) + '-' + val[0].getDate();
        this.endDate = val[1].getFullYear() + '-' + (val[1].getMonth() + 1) + '-' + val[1].getDate();
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
    }
    .mt20 {
      margin-top: .2rem;
    }
    .mt80 {
      margin-top: .8rem;
    }
    .form-group {
      display: flex;
      align-items: center;
      height: 1rem;
      .radio {
        width: 2.6rem;
      }
    }
    .label {
      width: 1.9rem;
      font-size: .28rem;
      color: #333;
    }
    .form-textarea {
      padding-top: .36rem;
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
