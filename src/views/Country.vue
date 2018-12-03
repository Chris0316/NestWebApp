<template>
  <div class="country">
    <div class="header">
      <div class="back" @click="$router.go(-1);"></div>
    </div>
    <div class="content">
      <div class="title">{{ title }}</div>
      <nest-radio class="mt60" :options="countryOpts" v-model="selectedVal" :is-align-left="true" size="large" :count-in-row="1"></nest-radio>
    </div>
  </div>
</template>

<script>
  import ChinaFlag from '../assets/images/flags/China.png';
  import JapanFlag from '../assets/images/flags/Japan.png';
  import KoreaFlag from '../assets/images/flags/Korea.png';
  import PhilippineFlag from '../assets/images/flags/Philippine.png';
  import USAFlag from '../assets/images/flags/USA.png';
  import EuropeFlag from '../assets/images/flags/Europe.png';
  import EarthFlag from '../assets/images/flags/Earth.png';

  export default {
    name: "Country",
    data() {
      return {
        title: '国籍',
        selectedVal: '',
        countryOpts: [{
          label: '中国',
          value: '1',
          area: '0086',
          icon: ChinaFlag
        }, {
          label: '日本',
          value: '2',
          area: '0081',
          icon: JapanFlag
        }, {
          label: '韩国',
          value: '3',
          area: '0082',
          icon: KoreaFlag
        }, {
          label: '菲律宾',
          value: '4',
          area: '0063',
          icon: PhilippineFlag
        }, {
          label: '美国',
          value: '5',
          area: '0001',
          icon: USAFlag
        }, {
          label: '欧洲',
          value: '6',
          area: '',
          icon: EuropeFlag
        }, {
          label: '其他',
          value: '7',
          area: '',
          icon: EarthFlag
        }]
      }
    },
    created() {
      let query = this.$route.query;
      if (query.type === 'number') {
        this.title = '国家';
        this.countryOpts = this.countryOpts.splice(0, 4);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .country {
    padding: 0 .28rem;
    box-sizing: border-box;
    .header {
      height: 1.2rem;
    }
    .back {
      width: .9rem;
      height: 100%;
      background: url('../assets/images/return-icon.png') no-repeat left center;
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
    .mt60 {
      margin-top: .6rem;
    }
  }
</style>
