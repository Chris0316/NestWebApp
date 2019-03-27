<template>
  <div class="details">
    <nest-scroll class="app-body">
      <div v-if="house">
        <div class="top-banner">
          <div class="head-bar">
            <div class="back" @click="$router.go(-1)"></div>
          </div>
          <swiper class="swiper" :options="swiperOption" ref="swiper" v-if="house.galleries.data.length > 1">
            <swiper-slide v-for="(item, index) in house.galleries.data" class="swiper-slide" :style="{ backgroundImage: 'url(' + item.url + ')' }" :key="index"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div v-else-if="house.galleries.data.length === 1" class="swiper-slide" :style="{ backgroundImage: 'url(' + house.galleries.data[0].url + ')' }"></div>
          <div v-else class="preview-default"></div>
        </div>
        <div class="banner-desc">房源编号：{{ house.id }}</div>
        <div class="details-title">{{ house.building_name }}</div>
        <div class="title-tags">
          <span>{{ getLabelTags() }}</span>
          <a href="javascript:;" class="link">详细地址</a>
        </div>
        <div class="main-info">
          <div class="item">
            <div class="txt-1 bold" v-if="matchCustomType(house) === 'rent'">{{ house.price }} P/月</div>
            <div class="txt-1 bold" v-else-if="matchCustomType(house) === 'new'">{{ house.avg_price }} P/㎡</div>
            <div class="txt-1 bold" v-else>{{ house.total_amount / 10000 }} 万</div>
            <div class="label" v-if="matchCustomType(house) === 'new'">均价</div>
            <div class="label" v-else-if="matchCustomType(house) === 'rent'">租金</div>
            <div class="label" v-else>售价</div>
          </div>
          <div class="item" v-if="matchCustomType(house) === 'second'">
            <div class="txt-1 bold">{{ house.bedroom }}室{{ house.hall }}厅</div>
            <div class="label">户型</div>
          </div>
          <div class="item" v-if="matchCustomType(house) === 'new'">
            <div class="txt-2">{{ house.available_time }}</div>
            <div class="label">开盘时间</div>
          </div>
          <div class="item">
            <div class="txt-1 bold">{{ house.centiare }} ㎡</div>
            <div class="label">面积</div>
          </div>
        </div>
        <div class="details-module" v-if="matchCustomType(house) === 'new' || matchCustomType(house) === 'second'">
          <div class="module-title">基本信息</div>
          <div class="cell">
            <div class="label">单价:</div>
            <div class="value">{{ house.price }}P/㎡</div>
          </div>
          <div class="cell">
            <div class="label">发布时间:</div>
            <div class="value">{{ house.created_at | dateFormat('yyyy-MM-dd') }}</div>
          </div>
          <div class="cell">
            <div class="label">用途:</div>
            <div class="value">{{ getSelecteds(DICT.house.purpose, house.purpose)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.lift">
            <div class="label">电梯:</div>
            <div class="value">{{ getSelecteds(DICT.house.lift, house.lift)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.floor">
            <div class="label">楼层:</div>
            <div class="value">{{ house.floor }}层</div>
          </div>
          <div class="cell" v-if="house.master_direction">
            <div class="label">主卧朝向:</div>
            <div class="value">{{ getSelecteds(DICT.house.master_direction, house.master_direction)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.decor">
            <div class="label">装修:</div>
            <div class="value">{{ getSelecteds(DICT.house.decor, house.decor)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.balcony">
            <div class="label">阳台:</div>
            <div class="value">{{ getSelecteds(DICT.house.balcony, house.balcony)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.pet">
            <div class="label">宠物:</div>
            <div class="value">{{ getSelecteds(DICT.house.pet, house.pet)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.carport">
            <div class="label">车位:</div>
            <div class="value">{{ getSelecteds(DICT.house.carport, house.carport)[0].label }}</div>
          </div>
        </div>
        <div class="details-module" v-if="matchCustomType(house) === 'rent'">
          <div class="module-title">基本信息</div>
          <div class="cell">
            <div class="label">用途:</div>
            <div class="value">{{ getSelecteds(DICT.house.purpose, house.purpose)[0].label }}</div>
          </div>
          <div class="cell">
            <div class="label">发布时间:</div>
            <div class="value">{{ house.created_at | dateFormat('yyyy-MM-dd') }}</div>
          </div>
          <div class="cell" v-if="house.min_stay_month && house.max_stay_month">
            <div class="label">租期:</div>
            <div class="value">{{ house.min_stay_month }}-{{ house.max_stay_month }}个月</div>
          </div>
          <div class="cell" v-if="house.available_time">
            <div class="label">可入住时间:</div>
            <div class="value">{{ house.available_time | dateFormat('yyyy-MM-dd') }}</div>
          </div>
          <div class="cell" v-if="house.lift">
            <div class="label">电梯:</div>
            <div class="value">{{ getSelecteds(DICT.house.lift, house.lift)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.floor">
            <div class="label">楼层:</div>
            <div class="value">{{ house.floor }}层</div>
          </div>
          <div class="cell" v-if="house.decor">
            <div class="label">装修:</div>
            <div class="value">{{ getSelecteds(DICT.house.decor, house.decor)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.master_direction">
            <div class="label">主卧朝向:</div>
            <div class="value">{{ getSelecteds(DICT.house.master_direction, house.master_direction)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.balcony">
            <div class="label">阳台:</div>
            <div class="value">{{ getSelecteds(DICT.house.balcony, house.balcony)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.pet">
            <div class="label">宠物:</div>
            <div class="value">{{ getSelecteds(DICT.house.pet, house.pet)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.carport">
            <div class="label">车位:</div>
            <div class="value">{{ getSelecteds(DICT.house.carport, house.carport)[0].label }}</div>
          </div>
        </div>
        <div class="details-module" v-if="matchCustomType(house) === 'carport'">
          <div class="module-title">基本信息</div>
          <div class="cell">
            <div class="label">单价:</div>
            <div class="value">{{ house.price }}P/㎡</div>
          </div>
          <div class="cell">
            <div class="label">发布时间:</div>
            <div class="value">{{ house.created_at | dateFormat('yyyy-MM-dd') }}</div>
          </div>
          <div class="cell" v-if="house.purpose">
            <div class="label">用途:</div>
            <div class="value">{{ getSelecteds(DICT.house.purpose, house.purpose)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.lift">
            <div class="label">电梯:</div>
            <div class="value">{{ getSelecteds(DICT.house.lift, house.lift)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.floor">
            <div class="label">楼层:</div>
            <div class="value">{{ house.floor }}层</div>
          </div>
        </div>
        <div class="details-module" v-if="matchCustomType(house) === 'land'">
          <div class="module-title">基本信息</div>
          <div class="cell">
            <div class="label">单价:</div>
            <div class="value">{{ house.price }}P/㎡</div>
          </div>
          <div class="cell">
            <div class="label">发布时间:</div>
            <div class="value">{{ house.created_at | dateFormat('yyyy-MM-dd') }}</div>
          </div>
          <div class="cell" v-if="house.lift">
            <div class="label">电梯:</div>
            <div class="value">{{ getSelecteds(DICT.house.lift, house.lift)[0].label }}</div>
          </div>
          <div class="cell" v-if="house.floor">
            <div class="label">楼层:</div>
            <div class="value">{{ house.floor }}层</div>
          </div>
        </div>
        <div class="details-module" v-if="['apartment', 'villa', 'homestay'].indexOf(house.type) > -1">
          <div class="module-title">房屋配套</div>
          <div class="content">
            <div class="item" v-for="item in DICT.house.facilities" :class="{'on': facOn(item)}">
              <img class="item-icon" :src="facIcon(item)" />
              <div class="item-name">{{ item.label }}</div>
            </div>
          </div>
        </div>
        <div class="details-module scroll" v-if="matchCustomType(house) === 'new'">
          <div class="module-title">户型介绍</div>
          <nest-scroll direction="horizontal" class="info-list">
            <div class="info-list-wrap">
              <div class="info-item">
                <div class="info-img"></div>
                <div class="info-text1">3室2厅2卫</div>
                <div class="info-text2">建面 91㎡ 朝向南</div>
                <div class="info-text3">约569万</div>
              </div>
              <div class="info-item">
                <div class="info-img "></div>
                <div class="info-text1 ">3室2厅2卫</div>
                <div class="info-text2 ">建面 91㎡ 朝向南</div>
                <div class="info-text3 ">约569万</div>
              </div>
              <div class="info-item">
                <div class="info-img "></div>
                <div class="info-text1 ">3室2厅2卫</div>
                <div class="info-text2 ">建面 91㎡ 朝向南</div>
                <div class="info-text3 ">约569万</div>
              </div>
            </div>
          </nest-scroll>
        </div>
        <div class="details-module">
          <div class="module-title">介绍</div>
          <div class="publisher-introduce">
            <div class="portrait" :style="{ backgroundImage: 'url(' + house.user.avatar + ')'}"></div>
            <div class="publisher-info">
              <div class="publisher-name">{{ house.user.name }}</div>
              <div class="publisher-desc">
                <span class="type">{{ getSelecteds(DICT.user.is_agent, house.user.is_agent)[0].label }}</span>
                <span>语言：{{ getSelecteds(DICT.languages, house.user.languages).join('/') }}</span>
              </div>
            </div>
            <div class="focus-btn" v-if="house.user.is_agent" :class="{ disabled: house.user.favored }" @click="doFollow(house.user, 'user')">{{ house.user.favored ? '已关注' : '关注' }}</div>
          </div>
          <div class="paragraph">
            {{ house.user.introduction }}
          </div>
        </div>
        <!--地图-->
        <!--<div class="details-map"></div>-->
        <div class="details-module scroll">
          <div class="module-title" v-if="matchCustomType(house) === 'new'">周边楼盘</div>
          <div class="module-title" v-else-if="matchCustomType(house) === 'rent'">同小区在租</div>
          <div class="module-title" v-else-if="matchCustomType(house) === 'land'">同地区在售</div>
          <div class="module-title" v-else>同小区在售</div>
          <nest-scroll direction="horizontal" class="similar">
            <div class="similar-wrap">
              <div class="item" v-for="item in dataList" @click="$router.push({ name: 'ExploreDetails', params: { id: item.id } })">
                <div class="item-img" :style="{ backgroundImage: 'url(' + imageUrl(item) + ')'}"></div>
                <div class="item-title">{{ item.building_name }}</div>
                <div class="item-title mt0" v-if="['apartment', 'villa', 'homestay'].indexOf(item.type) > -1">{{ item.bedroom }}室{{ item.hall }}厅</div>
                <div class="item-sub" v-if="matchCustomType(item) === 'new'">{{ item.address }}</div>
                <div class="unit-size" v-else>
                  <div class="left" v-for="item2 in item.tags">{{ item2 }}</div>
                </div>
                <div class="item-desc">
                  <span class="tag-main">
                    <template v-if="matchCustomType(item) === 'new' || matchCustomType(item) === 'rent'">{{ item.price }}</template>
                    <template v-else>{{ item.total_amount / 10000 }}</template>
                    <template v-if="matchCustomType(item) === 'new'">P/㎡</template>
                    <template v-else-if="matchCustomType(item) === 'rent'">P/月</template>
                    <template v-else>万</template>
                  </span>
                  <span class="tag-sub" v-if="matchCustomType(item) === 'new'">{{ item.centiare }} ㎡</span>
                  <span class="tag-sub" v-else-if="matchCustomType(item) === 'second' || matchCustomType(item) === 'carport' || matchCustomType(item) === 'land'">{{ item.price }} P/平</span>
                </div>
              </div>
            </div>
          </nest-scroll>
          <!--<nest-scroll direction="horizontal" class="similar">-->
            <!--<div class="similar-wrap">-->
              <!--<div class="item">-->
                <!--<div class="item-img"></div>-->
                <!--<div class="item-title">Callisto Towers at Circuit Makati</div>-->
                <!--<div class="unit-size">-->
                  <!--<div class="left">10F</div>-->
                  <!--<div class="left">150.55㎡</div>-->
                <!--</div>-->
                <!--<div class="item-desc"><span class="tag-main">40万</span><span class="tag-sub">210,000 P/平</span></div>-->
              <!--</div>-->
              <!--<div class="item">-->
                <!--<div class="item-img"></div>-->
                <!--<div class="item-title">Callisto Towers at Circuit Makati</div>-->
                <!--<div class="unit-size">-->
                  <!--<div class="left">10F</div>-->
                  <!--<div class="left">150.55㎡</div>-->
                <!--</div>-->
                <!--<div class="item-desc"><span class="tag-main">40万</span><span class="tag-sub">210,000 P/平</span></div>-->
              <!--</div>-->
              <!--<div class="item">-->
                <!--<div class="item-img"></div>-->
                <!--<div class="item-title">Callisto Towers at Circuit Makati</div>-->
                <!--<div class="unit-size">-->
                  <!--<div class="left">10F</div>-->
                  <!--<div class="left">150.55㎡</div>-->
                <!--</div>-->
                <!--<div class="item-desc"><span class="tag-main">40万</span><span class="tag-sub">210,000 P/平</span></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</nest-scroll>-->
        </div>
        <div class="publish">
          <div class="tips">{{ matchCustomType(house) === 'rent' ? '我也要出租？' : '我也要出售？' }}</div>
          <a href="javascript:;" class="publish-btn" v-if="matchCustomType(house) === 'rent'" @click="$router.push({ name: 'ExplorePublish', params: { trade: 'rent', id: 'new' } })">立即发布</a>
          <a href="javascript:;" class="publish-btn" v-else @click="$router.push({ name: 'ExplorePublish', params: { trade: 'sale', id: 'new' } })">立即发布</a>
        </div>
      </div>
    </nest-scroll>
    <div class="control-bar" v-if="house">
      <div class="controls">
        <a href="javascript:;" class="favorite" :class="{ 'on': house.favored }" @click="doFollow(house, 'house')" v-if="!isMine"></a>
        <a href="javascript:;" class="share" @click="shareShow = !shareShow"></a>
      </div>
      <template v-if="isMine">
        <a href="javascript:;" class="control-btn primary" @click="$router.push({ name: 'ExplorePublish', params: { trade: house.trade, id: house.id } })">编辑</a>
        <a href="javascript:;" class="control-btn danger" @click="deleteShow = true">删除</a>
      </template>
      <template v-else>
        <a :href="'sms:' + house.user.phone" class="control-btn info">短信咨询</a>
        <a :href="'tel:' + house.user.phone" class="control-btn primary">电话咨询</a>
      </template>
    </div>
    <NestShare :status="shareShow" @close="shareShow = false"></NestShare>
    <nest-modal modal-type="confirm" :has-clear="false" :has-cancel="true" modal-cancel-txt="按错了" :status="deleteShow" v-if="isMine"
      @cancel="deleteShow = false" @close="deleteShow = false" @confirm="deleteHouseInfo">
      确定要删除该 <span class="hl">房源</span> 吗？
    </nest-modal>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import PreviewDefaultImg from '../../assets/images/preview-default.png';
  import DICT, {getSelecteds} from "../../configs/DICT";
  import FollowService from '../../services/FollowService'
  import HouseService from '../../services/HouseService';
  import Storage from "../../utils/Storage";
  import Utils from '../../utils/Utils';
  import Share from '../../utils/Share';

  export default {
    name: 'ExploreDetails',
    data() {
      return {
        house: null,
        shareShow: false,
        deleteShow: false,
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          }
        },
        dataList: []
      }
    },
    created() {
      this.initConsts();
      this.share();
    },
    mounted() {
      this.getData();
    },
    watch: {
      '$route' () {
        let params = this.$route.params;
        if (params) {
          this.houseId = params.id;
        }
        this.getData();
      }
    },
    methods: {
      initConsts() {
        let params = this.$route.params;
        if (params) {
          this.houseId = params.id;
        }
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
        this.matchCustomType = Utils.matchCustomType;
        this.isMine = false;
      },
      getLabelTags() {
        let arr = [];
        if (this.house.building_no) {
          arr.push(this.house.building_no);
        }
        if (this.house.type) {
          arr.push(getSelecteds(DICT.house.type, this.house.type)[0].label);
        }
        if (this.house.rent_type) {
          arr.push(getSelecteds(DICT.house.rent_type, this.house.rent_type)[0].label);
        }
        if (this.house.deposit_month && this.house.pay_month) {
          arr.push('押' + this.house.deposit_month + '付' + this.house.pay_month);
        }
        return arr.join(' / ');
      },
      imageUrl(item) {
        return item.cover ? item.cover : PreviewDefaultImg;
      },
      facOn(item) {
        let flag = false;
        if (this.house.facilities && this.house.facilities.length !== 0) {
          this.house.facilities.forEach(item2 => {
            if (item2 == item.value) {
              flag = true;
            }
          });
        }
        return flag;
      },
      facIcon(item) {
        let icon = item.icon;
        if (this.house.facilities && this.house.facilities.length !== 0) {
          this.house.facilities.forEach(item2 => {
            if (item2 == item.value) {
              icon = item.icon_selected;
            }
          });
        }
        return icon;
      },
      getData() {
        if (this.houseId) {
          HouseService.getDetailsById(this.houseId, res => {
            this.house = res.data;
            let userId = Storage.getLocalStorage('nest_user_id');
            this.isMine = userId == res.data.user.id;
          });
          let trade = this.matchCustomType(this.house) === 'rent' ? 'rent' : 'sale';
          HouseService.getSameHouse({
            trade: trade,
            house_id: this.houseId
          }, res => {
            this.dataList = res.data;
          })
        }
      },
      deleteHouseInfo() {
        if (this.houseId) {
          HouseService.deleteById(this.houseId, res => {
            this.$router.go(-1);
          });
        }
      },
      doFollow(item, type) {
        if (item.favored) {
          FollowService.unFollow({
            target_type: type,
            target_id: item.id
          }, res => {
            item.favored = false;
          })
        } else {
          FollowService.doFollow({
            target_type: type,
            target_id: item.id
          }, res => {
            item.favored = true;
          });
        }
      },
      share(){
        Share.weixin("分享", "ddd");
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="scss" scoped>
  .details {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .top-banner {
      position: relative;
      height: 4.84rem;
      background-color: #c0c0c0;
      .head-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1.2rem;
        background: linear-gradient(to bottom, rgba(0, 0, 0, .24), rgba(0, 0, 0, 0));
        z-index: 2;
        .back {
          padding-left: .28rem;
          width: .9rem;
          height: 100%;
          background: url('../../assets/images/icon-back.png') no-repeat .28rem center;
          background-size: .42rem .32rem;
        }
      }
      .swiper {
        height: 100%;
      }
      .swiper-slide {
        background: no-repeat center center;
        background-size: contain;
      }
      .preview-default {
        width: 100%;
        height: 100%;
        background: url('../../assets/images/preview-default.png') no-repeat center center;
        background-size: contain;
      }
      .swiper-pagination {
        width: .8rem;
        height: .4rem;
        line-height: .4rem;
        left: unset;
        bottom: .28rem;
        right: .28rem;
        border-radius: .2rem;
        background: rgba(0,0,0,.1);
        color: #fff;
        font-size: .24rem;
      }
    }
    .banner-desc {
      padding: 0 .28rem;
      line-height: 1;
      font-size: .24rem;
      color: #b3b3b3;
      text-align: right;
      margin-top: .1rem;
    }
    .details-title {
      padding: 0 .28rem;
      margin-top: .3rem;
      font-size: .4rem;
      line-height: .4rem;
      color: #333;
      word-break: break-all;
    }
    .title-tags {
      padding: 0 .28rem;
      margin-top: .15rem;
      display: flex;
      justify-content: space-between;
      font-size: .24rem;
      color: #999;
      line-height: 1;
      .link {
        color: #f99c91;
      }
    }
    .main-info {
      padding: 0 .28rem;
      margin-top: .6rem;
      display: flex;
      .item {
        padding-bottom: .4rem;
        flex: 1;
        text-align: center;
      }
      .bold {
        font-weight: bold;
      }
      .txt-1 {
        font-size: .32rem;
        color: #0F9183;
        line-height: .5rem;
      }
      .txt-2 {
        font-size: .28rem;
        color: #333;
        line-height: .5rem;
      }
      .label {
        margin-top: .1rem;
        color: #B3B3B3;
        font-size: .24rem;
        line-height: 1;
      }
    }
    .details-module {
      display: flex;
      flex-wrap: wrap;
      padding: 0 .28rem .6rem;
      &.scroll {
        padding: 0 0 .6rem 0;
        .module-title {
          margin: 0 .28rem;
        }
      }
    }
    .module-title {
      width: 100%;
      position: relative;
      padding-top: .4rem;
      line-height: 1;
      color: #333;
      font-size: .32rem;
      font-weight: bold;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border-top: 1px solid #e6e6e6;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }
    }
    .cell {
      margin-top: .35rem;
      display: flex;
      width: 50%;
      color: #333;
      font-size: .28rem;
      line-height: 1;
      .label {
        width: 1.5rem;
        color: #b2b2b2;
      }
      .value {
        flex: 1;
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      .item {
        margin-top: 0.4rem;
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
    .publisher-introduce {
      margin: .4rem 0 .26rem;
      display: flex;
      width: 100%;
      align-items: center;
      .portrait {
        margin-right: .2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #dfdfdf center center no-repeat;
        background-size: cover;
      }
      .publisher-info {
        flex: 1;
        .publisher-name {
          font-size: .32rem;
          color: #333;
          line-height: 1;
        }
        .publisher-desc {
          margin-top: .18rem;
          font-size: 0;
          color: #b3b3b3;
          line-height: 1;
          span {
            font-size: .24rem;
          }
          .type {
            margin-right: .35rem;
          }
        }
      }
      .focus-btn {
        position: relative;
        padding-left: .48rem;
        width: 1.2rem;
        height: .54rem;
        line-height: .5rem;
        border: .02rem solid #0f9183;
        border-radius: .1rem;
        font-size: .28rem;
        color: #0f9183;
        box-sizing: border-box;
        &::before {
          position: absolute;
          top: .13rem;
          left: .15rem;
          content: "";
          width: .24rem;
          height: .24rem;
          background: url('../../assets/images/icon-plus.png') no-repeat;
          background-size: 100% 100%;
        }
        &.disabled {
          padding-left: 0;
          text-align: center;
          color: #b2b2b2;
          border-color: #b2b2b2;
          &::before {
            display: none;
          }
        }
      }
    }
    .paragraph {
      font-size: .28rem;
      color: #333;
      line-height: .48rem;
    }
    .details-map {
      margin-bottom: .7rem;
      height: 4rem;
      background-color: #dcdcdc;
    }
    .others {
      position: relative;
      padding-bottom: .85rem;
    }
    .similar {
      margin-top: .4rem;
      display: flex;
      overflow: hidden;
      .similar-wrap {
        display: flex;
        padding: 0 .28rem;
      }
      .item {
        flex-shrink: 0;
        width: 3.6rem;
        margin-right: .6rem;
        .item-img {
          width: 100%;
          height: 2.56rem;
          border-radius: .1rem;
          background: #e8e8ea center center no-repeat;
          background-size: cover;
        }
        .item-title {
          margin-top: .2rem;
          font-size: .28rem;
          font-weight: bold;
          color: #333;
          line-height: .3rem;
          white-space: initial;
          &.mt0 {
            margin-top: 0;
          }
        }
        .unit-size {
          display: flex;
          margin-top: 0.15rem;
          margin-bottom: 0.15rem;
          .left {
            margin-right: 0.1rem;
            padding: 0.06rem 0.12rem;
            background: #fbf8f3;
            color: #d5be88;
            font-size: 0.24rem;
            border-radius: 0.1rem;
            line-height: 1;
          }
        }
        .item-sub {
          margin-top: .15rem;
          color: #999;
          font-size: .24rem;
        }
        .item-desc {
          margin-top: .15rem;
        }
        .tag-main {
          margin-right: .2rem;
          font-size: .28rem;
          color: #0f9183;
          font-weight: bold;
        }
        .tag-sub {
          font-size: .22rem;
          color: #b2b2b2;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .publish {
      padding-top: .7rem;
      height: 3.85rem;
      background-color: #f2f2f2;
      .tips {
        font-size: .32rem;
        color: #333;
        text-align: center;
        line-height: 1;
      }
      .publish-btn {
        display: block;
        margin: .6rem auto 0;
        width: 3rem;
        height: .8rem;
        line-height: .72rem;
        border: .04rem solid #0f9183;
        border-radius: .1rem;
        font-size: .28rem;
        color: #0f9183;
        text-align: center;
        box-sizing: border-box;
      }
    }
    .control-bar {
      display: flex;
      background-color: #fff;
      font-size: .28rem;
      text-align: center;
      box-shadow: 0 -1px 5px 0 rgba(234,234,234,1);
      .controls {
        padding: 0 .25rem;
        display: flex;
        justify-content: space-around;
        flex: 1;
        align-items: center;
        .favorite {
          width: .42rem;
          height: .38rem;
          background: url("../../assets/images/favorite.png") no-repeat;
          background-size: 100% 100%;
          &.on {
            background: url("../../assets/images/favorite-on.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .share {
          width: .38rem;
          height: .38rem;
          background: url("../../assets/images/share.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .control-btn {
        display: block;
        width: 2.4rem;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        &.primary {
          background-color: #0F9183;
        }
        &.info {
          background-color: #f99c91;
        }
        &.danger {
          background-color: #F54545;
        }
      }
    }
    .info-list {
      margin-top: 0.4rem;
      display: flex;
      overflow: hidden;
      .info-list-wrap {
        display: flex;
        padding: 0 .28rem;
      }
      .info-item {
        margin-right: 0.34rem;
        display: flex;
        flex-direction: column;
        &:last-child {
          margin-right: 0;
        }
      }
      .info-img {
        width: 3.3rem;
        height: 2.36rem;
        background: #e8e8ea;
        border-radius: 0.1rem;
      }
      .info-text1 {
        margin: 0.1rem 0rem;
        font-size: 0.28rem;
        color: #333333;
        font-weight: bold;
      }
      .info-text2 {
        margin-bottom: 0.1rem;
        font-size: 0.24rem;
        color: #b2b2b2;
      }
      .info-text3 {
        font-size: 0.28rem;
        color: #0F9183;
        font-weight: bold;
      }
    }
  }
</style>
