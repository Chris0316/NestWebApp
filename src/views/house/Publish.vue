<template>
  <div class="publish">
    <div class="header border-bottom">
      <div class="back" @click="goBack();"></div>
      {{ houseId === 'new' ? '发布' : '编辑' }}{{ getSelecteds(DICT.house.trade, trade)[0].label }}信息
    </div>
    <nest-scroll class="app-body">
      <div>
        <nest-upload v-model="uploadPics"></nest-upload>
        <div class="tag border-bottom">
          <nest-radio :options="DICT.house.type" v-model="type" :count-in-row="3" cell-type="default"></nest-radio>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name">用途</div>
          <div class="realm-content">
            <nest-radio :count-in-row="3" size="small" v-model="purpose" :options="DICT.house.purpose"></nest-radio>
          </div>
        </div>
        <div class="realm border-bottom"
             v-if="trade === 'rent' && ['apartment', 'villa', 'homestay', 'office'].indexOf(type) > -1">
          <div class="realm-name">方式</div>
          <div class="realm-content">
            <nest-radio :count-in-row="3" size="small" v-model="rentType" :options="DICT.house.rent_type"></nest-radio>
          </div>
        </div>
        <div class="realm arrow-right border-bottom">
          <div class="realm-name" :class="{ 'required' : type !== 'land' }" v-html="estateNameLabel"></div>
          <nest-field v-model="estateName"></nest-field>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name" :class="{ 'required': type === 'land' }">地址</div>
          <nest-field v-model="address"></nest-field>
        </div>
        <div class="realm arrow-right border-bottom" @click="regionShow = true">
          <div class="realm-name">区域</div>
          <div class="realm-content">{{ regionName[0].label }}</div>
        </div>
        <div class="realm border-bottom" v-if="type !== 'land'">
          <div class="realm-name">楼栋号</div>
          <nest-field v-model="buildingNo"></nest-field>
        </div>
        <div class="realm border-bottom" v-if="type !== 'land'">
          <div class="realm-name">楼层</div>
          <div class="realm-content floor-deltail">
            <div class="deltails">
              第<nest-field type="tel" class="deltail1" text-align="center" v-model="floor"></nest-field>层
            </div>
            <div class="deltails">
              共<nest-field type="tel" class="deltail1" text-align="center" v-model="floorMax"></nest-field>层
            </div>
          </div>
        </div>
        <div class="realm border-bottom" v-if="['apartment', 'villa', 'homestay'].indexOf(type) > -1">
          <div class="realm-name required">户型</div>
          <div class="realm-content house-type">
            <div class="deltails">
              <nest-field type="tel" class="deltail1" text-align="center" v-model="bedroom"></nest-field>室
            </div>
            <div class="deltails">
              <nest-field type="tel" class="deltail1" text-align="center" v-model="hall"></nest-field>厅
            </div>
            <div class="deltails">
              <nest-field type="tel" class="deltail1" text-align="center" v-model="toilet"></nest-field>卫
            </div>
          </div>
        </div>
        <div class="realm border-bottom" v-if="!(type === 'carport' && trade === 'rent')">
          <div class="realm-name">面积</div>
          <div class="realm-content oneinput">
            <nest-field type="tel" v-model="centiare"></nest-field>
            <span class="set">平米</span>
          </div>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name required">{{ trade === 'rent' ? '租金' : '售价' }}</div>
          <div class="realm-content oneinput">
            <nest-field type="tel" v-model="price"></nest-field>
            <span class="set">{{ trade === 'rent' ? 'P/月' : '万' }}</span>
          </div>
        </div>
        <div class="realm border-bottom" v-if="trade === 'rent'">
          <div class="realm-name">付款方式</div>
          <div class="realm-content pay-mode">
            <div class="inpval-wrap">
              押<nest-field type="tel" class="inpval" text-align="center" v-model="depositMonth"></nest-field>
            </div>
            <div class="inpval-wrap">
              付<nest-field type="tel" class="inpval" text-align="center" v-model="payMonth"></nest-field>
            </div>
          </div>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name">联系人</div>
          <div class="realm-content">{{ contact_name }}</div>
        </div>
        <div class="realm border-bottom arrow-right" @click="$router.push({ name: 'Cellphone' })">
          <div class="realm-name">手机号</div>
          <div class="realm-content">{{ contact_phone }}</div>
        </div>
        <template v-if="detailShow">
          <div class="realm arrow-right border-bottom" v-if="trade === 'rent'" @click="calendarShow = true">
            <div class="realm-name">可入住时间</div>
            <div class="realm-content">{{ availableTime }}</div>
          </div>
          <div class="realm border-bottom" v-if="trade === 'rent'">
            <div class="realm-name">租期</div>
            <div class="realm-content oneinput">
              <div class="lease">
                <nest-field type="tel" class="lease-val" text-align="center" v-model="minStayMonth"></nest-field>
                <span class="lease-line">-</span>
                <nest-field type="tel" class="lease-val" text-align="center" v-model="maxStayMonth"></nest-field>
              </div>
              <span class="set">个月</span>
            </div>
          </div>
          <div class="realm border-bottom" v-if="type !== 'carport' && type !== 'land'">
            <div class="realm-name">车位</div>
            <div class="realm-content">
              <nest-radio :count-in-row="3" size="small" :options="DICT.house.carport" v-model="carport"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom" v-if="!(trade === 'rent' && type === 'land')">
            <div class="realm-name">电梯</div>
            <div class="realm-content">
              <nest-radio :count-in-row="3" size="small" :options="DICT.house.lift" v-model="lift"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom" v-if="type !== 'carport' && type !== 'land'">
            <div class="realm-name">装修</div>
            <div class="realm-content">
              <nest-radio :count-in-row="3" size="small" :options="DICT.house.decor" v-model="decor"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom" v-if="['apartment', 'villa', 'homestay'].indexOf(type) > -1">
            <div class="realm-name">主卧朝向</div>
            <div class="realm-content">
              <nest-radio :count-in-row="4" size="small" :options="DICT.house.master_direction" v-model="masterDirection"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom" v-if="['apartment', 'villa', 'homestay'].indexOf(type) > -1">
            <div class="realm-name">阳台</div>
            <div class="realm-content">
              <nest-radio :count-in-row="3" size="small" :options="DICT.house.balcony" v-model="balcony"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom" v-if="['apartment', 'villa', 'homestay', 'office'].indexOf(type) > -1">
            <div class="realm-name">宠物</div>
            <div class="realm-content">
              <nest-radio :count-in-row="3" size="small" :options="DICT.house.pet" v-model="pet"></nest-radio>
            </div>
          </div>
          <div class="facilities border-bottom" v-if="['apartment', 'villa', 'homestay'].indexOf(type) > -1">
            <div class="title">配套设施</div>
            <div class="content">
              <div class="item" v-for="item in DICT.house.facilities" :class="{'on': facOn(item)}" @click="selectFac(item)">
                <img class="item-icon" :src="facIcon(item)" />
                <div class="item-name">{{ item.label }}</div>
              </div>
            </div>
          </div>
          <div class="description border-bottom">
            <div class="description-title">介绍</div>
            <nest-field type="textarea" v-model="description"></nest-field>
          </div>
        </template>
        <div class="detail-link" @click="detailShow = !detailShow">
          <span>{{ detailShowText }}</span>
        </div>
        <div class="pub-bottom">
          <nest-button type="primary" size="full" @click="publish">{{ houseId === 'new' ? '发布' : '保存' }}</nest-button>
        </div>
      </div>
    </nest-scroll>
    <nest-modal title="区域" :has-clear="false" :has-footer="false" @close="regionShow = false" :status="regionShow">
      <nest-radio v-model="region" :options="DICT.region" @input="regionShow = false"></nest-radio>
    </nest-modal>
    <nest-modal :status="calendarShow" title="选择日期" modal-type="calendar"
                @close="calendarShow = false"
                @confirm="calendarShow = false"
                @clear="selectedDate = []"
                v-if="trade === 'rent'">
      <nest-calendar v-model="selectedDate"></nest-calendar>
    </nest-modal>
  </div>
</template>

<script>
  import DICT, {getSelecteds} from '../../configs/DICT';
  import Utils from '../../utils/Utils';
  import UserService from '../../services/UserService';
  import HouseService from '../../services/HouseService';
  import HouseAdaptor from '../../adaptor/HouseAdaptor';

  export default {
    name: "HousePublish",
    data() {
      return {
        detailShow: false,
        calendarShow: false,
        regionShow: false,
        uploadPics: [],
        type: 'apartment',
        purpose: 'live',
        rentType: 'sole',
        estateName: '',
        address: '',
        region: '3',
        buildingNo: '',
        floor: '',
        floorMax: '',
        bedroom: '',
        hall: '',
        toilet: '',
        centiare: '',
        price: '',
        depositMonth: '',
        payMonth: '',
        selectedDate: [],
        minStayMonth: '',
        maxStayMonth: '',
        carport: '',
        lift: '',
        decor: '',
        masterDirection: '',
        balcony: '',
        pet: '',
        facilities: [],
        description: '',
        contact_name: '',
        contact_phone: ''
      }
    },
    computed: {
      availableTime() {
        if (this.selectedDate.length > 0) {
          return this.selectedDate[0].getFullYear() + '-' + (this.selectedDate[0].getMonth() + 1) + '-' + this.selectedDate[0].getDate();
        }
        return '';
      },
      estateNameLabel() {
        if (this.type === 'apartment' || this.type === 'villa' || this.type === 'homestay') {
          return '小区名称';
        } else if (this.type === 'office') {
          return '商铺/写字楼';
        } else {
          return '小区/商铺<br/>/写字楼';
        }
      },
      regionName() {
        return getSelecteds(DICT.region, this.region);
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
          vm.getData();
        }
      });
    },
    beforeRouteLeave(to, from, next) {
      let index = this.$keepAlives.indexOf(this.$options.name);
      if (to.name === 'Explore') {
        this.$keepAlives.splice(index, 1);
      }
      next();
    },
    mounted() {
      this.getData();
    },
    methods: {
      initConsts() {
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
        let params = this.$route.params;
        if (params) {
          this.trade = this.$route.params.trade;
          this.houseId = this.$route.params.id;
        }
      },
      getData() {
        if (this.houseId && this.houseId !== 'new') {
          HouseService.getDetailsById(this.houseId, res => {
            this.uploadPics = res.data.galleries.data.map(item => item.url);
            this.type = res.data.type ? res.data.type.toString() : '';
            this.purpose = res.data.purpose ? res.data.purpose.toString() : '';
            this.rentType = res.data.rent_type ? res.data.rent_type.toString() : '';
            this.estateName = res.data.building_name ? res.data.building_name.toString() : '';
            this.address = res.data.address ? res.data.address.toString() : '';
            this.region = res.data.region_id ? res.data.region_id.toString() : '';
            this.buildingNo = res.data.building_no ? res.data.building_no.toString() : '';
            this.floor = res.data.floor ? res.data.floor.toString() : '';
            this.floorMax = res.data.floor_max ? res.data.floor_max.toString() : '';
            this.bedroom = res.data.bedroom ? res.data.bedroom.toString() : '';
            this.hall = res.data.hall ? res.data.hall.toString() : '';
            this.toilet = res.data.toilet ? res.data.toilet.toString() : '';
            this.centiare = res.data.centiare ? res.data.centiare.toString() : '';
            this.price = res.data.price ? res.data.price.toString() : '';
            this.depositMonth = res.data.deposit_month ? res.data.deposit_month.toString() : '';
            this.payMonth = res.data.pay_month ? res.data.pay_month.toString() : '';
            this.selectedDate = res.data.available_time ? [new Date(res.data.available_time.replace(/-/g, '/'))] : [];
            this.minStayMonth = res.data.min_stay_month ? res.data.min_stay_month.toString() : '';
            this.maxStayMonth = res.data.max_stay_month ? res.data.max_stay_month.toString() : '';
            this.carport = res.data.carport.toString();
            this.lift = res.data.lift.toString();
            this.decor = res.data.decor.toString();
            this.masterDirection = res.data.master_direction.toString();
            this.balcony = res.data.balcony.toString();
            this.pet = res.data.pet.toString();
            this.facilities = res.data.facilities || [];
            this.description = res.data.description ? res.data.description.toString() : '';
          });
        }
        UserService.getUserInfo(res => {
          this.contact_name = res.data.name;
          let phones = res.data.extra.phones,
            index = phones.findIndex(item => {
              return item.default === '1';
            });
          this.contact_phone = phones[index].phone;
        })
      },
      facOn(item) {
        let flag = false;
        if (this.facilities && this.facilities.length !== 0) {
          this.facilities.forEach(item2 => {
            if (item2 == item.value) {
              flag = true;
            }
          });
        }
        return flag;
      },
      facIcon(item) {
        let icon = item.icon;
        if (this.facilities && this.facilities.length !== 0) {
          this.facilities.forEach(item2 => {
            if (item2 == item.value) {
              icon = item.icon_selected;
            }
          });
        }
        return icon;
      },
      selectFac(item) {
        let index = this.facilities.indexOf(item.value);
        if (index > -1) {
          this.facilities.splice(index, 1);
        } else {
          this.facilities.push(item.value);
        }
      },
      validate() {
        if (this.type !== 'land' && this.estateName === '') {
          this.$toast.info('请填写小区/商铺/写字楼名称');
          return false;
        }
        if (this.type === 'land' && this.address === '') {
          this.$toast.info('请填写地址');
          return false;
        }
        if (this.type === 'apartment' || this.type === 'villa' || this.type === 'homestay') {
          if (this.bedroom === '' || this.hall === '' || this.toilet === '') {
            this.$toast.info('请完善户型');
            return false;
          }
        }
        if (this.price === '') {
          if (this.trade === 'rent') {
            this.$toast.info('请填写租金');
          } else {
            this.$toast.info('请填写售价');
          }
          return false;
        }
        return true;
      },
      publish() {
        if (!this.validate()) {
          return false;
        }
        let params = {
          is_new: 0,
          galleries: this.uploadPics.join(','),
          trade: this.trade,
          type: this.type,
          purpose: this.purpose,
          rent_type: this.rentType,
          building_name: this.estateName,
          address: this.address,
          region_id: this.region,
          building_no: this.buildingNo,
          floor: this.floor,
          floor_max: this.floorMax,
          bedroom: this.bedroom,
          hall: this.hall,
          toilet: this.toilet,
          centiare: this.centiare,
          price: this.trade === 'rent' ? this.price : this.price + '0000',
          deposit_month: this.depositMonth,
          pay_month: this.payMonth,
          contact_name: this.contact_name,
          contact_phone: this.contact_phone,
          available_time: this.availableTime,
          min_stay_month: this.minStayMonth,
          max_stay_month: this.maxStayMonth,
          carport: this.carport,
          lift: this.lift,
          decor: this.decor,
          master_direction: this.masterDirection,
          balcony: this.balcony,
          pet: this.pet,
          facilities: this.facilities.join(','),
          description: this.description
        };
        let house = Utils.getEffectiveAttrsByObj(new HouseAdaptor(params));
        if (this.houseId === 'new') {
          HouseService.publish(house, res => {
            this.$toast.success('发布成功！');
            this.$router.push({ name: 'Explore' });
          });
        } else {
          HouseService.updateById(this.houseId, house, res => {
            this.$toast.success('编辑成功！');
            this.goBack();
          })
        }
      },
      goBack() {
        let index = this.$keepAlives.indexOf(this.$options.name);
        this.$keepAlives.splice(index, 1);
        this.$router.go(-1);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .publish {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    font-size: 0.28rem;
    color: #333;
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
    .upload {
      width: 100%;
      height: 2rem;
      background: #F1F1F1;
      font-size: 0.28rem;
      text-align: center;
      line-height: 2rem;
    }
    .tag {
      margin: 0 0.28rem;
      padding: 0.2rem 0;
    }
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .realm {
      position: relative;
      padding: .26rem 0;
      margin: 0 0.28rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 1rem;
      box-sizing: border-box;
      .realm-name {
        width: 1.92rem;
        &.required {
          &::after {
            content: '*';
            color: #f99c91;
          }
        }
      }
      .realm-content {
        flex: 1;
      }
    }
    .floor-deltail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .deltails {
        display: flex;
        align-items: center;
        .deltail1 {
          width: 1.2rem;
          height: 0.6rem;
          text-align: center;
          line-height: 0.6rem;
          border: 0;
        }
      }
    }
    .house-type {
      display: flex;
      justify-content: space-between;
      .deltails {
        display: flex;
        flex: 1;
        align-items: center;
      }
      .deltail1 {
        width: 0.9rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border: 0;
        text-align: center;
      }
    }
    .oneinput {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .set {
        font-size: 0.28rem;
        color: #333333;
      }
    }
    .lease {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 3rem;
      .lease-val {
        width: 1.2rem;
      }
      .lease-line {
        color: #B2B2B2;
      }
    }
    .pay-mode {
      display: flex;
      .inpval-wrap {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        color: #333;
      }
      .inpval {
        width: 1.2rem;
      }
    }
    .facilities {
      box-sizing: border-box;
      padding: 0 0.28rem;
      display: flex;
      flex-direction: column;
      .title {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.28rem;
        color: #333333;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        margin-bottom: 0.4rem;
        margin-right: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 1.2rem;
        height: 1.2rem;
        &:nth-child(5n) {
          margin-right: 0;
        }
        &.on {
          .item-name {
            color: #0f9183;
          }
        }
      }
      .item-name {
        font-size: 0.24rem;
        color: #B2B2B2;
      }
      .item-icon {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
    .description {
      display: flex;
      padding: 0.36rem 0.28rem 0;
      box-sizing: border-box;
      height: 3.8rem;
      background: #fff;
      overflow: hidden;
      .description-title {
        width: 1.92rem;
        height: 3.4rem;
        font-size: 0.28rem;
        color: #333;
      }
    }
    .detail-link {
      padding-top: .6rem;
      font-size: 0;
      text-align: center;
      line-height: 1;
      background-color: #F2F2F2;
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
    .pub-bottom {
      padding: 1rem .68rem 1rem;
      background: #F2F2F2;
    }
  }
</style>
