<template>
  <div class="publish">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      我的发布
    </div>
    <div class="control-wrap">
      <nest-button :type="publishBtn.type" class="mr28" @click="switchPublishStatus">{{ publishBtn.txt }}</nest-button>
      <nest-button :type="tradeBtn.type" class="mr28" @click="tradeShow = true">{{ tradeBtn.txt }}</nest-button>
      <nest-button :type="typeBtn.type" class="mr28" @click="typeShow = true">{{ typeBtn.txt }}</nest-button>
      <nest-button :type="publishDateBtn.type" class="mr28" @click="publishDateShow = true">{{ publishDateBtn.txt }}</nest-button>
    </div>
    <nest-scroll class="app-body" :pullUpLoad="pullUpLoadObj"
                 @pullingUp="getMyData"
                 ref="myScroll">
      <div class="the-time-list">
        <div v-for="(item, index) in dataList" :key="item.id">
          <div class="the-time" v-if="item.created_at">{{ item.created_at }}</div>
          <nest-swipe-cell>
            <div class="search-item" slot="content" @click="$router.push({ name: 'HouseDetails', params: { id: item.id }})">
              <div class="move-wrap">
                <div class="item-img" :style="{ backgroundImage: 'url(' + imageUrl(item) + ')'}"></div>
                <div class="msg-wrap">
                  <div class="title">{{ item.building_name }}</div>
                  <div class="type-wrap" v-if="matchCustomType(item) === 'new'">
                    <div class="type-str">{{ item.address }}</div>
                  </div>
                  <div class="type-wrap" v-else>
                    <div class="type" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</div>
                  </div>
                  <div class="rent">
                    <div class="price" v-if="matchCustomType(item) === 'new' || matchCustomType(item) === 'rent'">{{ item.price }}</div>
                    <div class="price" v-else>{{ item.total_amount / 10000 }}</div>
                    <div class="price-msg" v-if="matchCustomType(item) === 'new'">P/㎡</div>
                    <div class="price-msg" v-else-if="matchCustomType(item) === 'rent'">P/月</div>
                    <div class="price-msg" v-else>万</div>
                    <div class="room-size" v-if="matchCustomType(item) === 'new'">{{ item.centiare }} ㎡</div>
                    <div class="room-size" v-else-if="matchCustomType(item) === 'second'">{{ item.price }} P/㎡</div>
                  </div>
                </div>
              </div>
            </div>
            <div slot="controls" class="collect-wrap" v-if="item.status === 1">
              <div class="share"></div>
              <div class="cancel" @click="updateStatus(item.id, 0)"></div>
            </div>
            <div slot="controls" class="collect-wrap" v-else>
              <div class="publish" @click="updateStatus(item.id, 1)"></div>
              <div class="delete"></div>
            </div>
          </nest-swipe-cell>
        </div>
      </div>
    </nest-scroll>
    <nest-modal title="发布时间" :has-clear="false" :has-footer="false" @close="publishDateShow = false"
                :status="publishDateShow">
      <nest-radio v-model="publishDate" :count-in-row="1" :options="publishDateOpts"></nest-radio>
    </nest-modal>
    <nest-modal title="分类" :has-clear="false" :has-footer="false" @close="typeShow = false" :status="typeShow">
      <nest-radio v-model="type" :count-in-row="1" :options="typeOpts"></nest-radio>
    </nest-modal>
    <nest-modal title="类型" :has-clear="false" :has-footer="false" @close="tradeShow = false" :status="tradeShow">
      <nest-radio v-model="trade" :count-in-row="1" :options="tradeOpts"></nest-radio>
    </nest-modal>
  </div>
</template>

<script>
  import Vue from 'vue';
  import DICT, {getSelecteds} from "../../configs/DICT";
  import Utils from '../../utils/Utils';
  import PreviewDefaultImg from '../../assets/images/preview-default.png';
  import HouseService from '../../services/HouseService';

  let dateTemp = '';

  export default {
    name: "MyHouses",
    data() {
      return {
        publishBtn: {
          type: 'primary',
          txt: '已发布'
        },
        filters: {
          status: 1,
          page: 0,
          per_page: 10
        },
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        dataList: [],
        tradeShow: false,
        trade: '-1',
        tradeBtn: {
          type: 'default',
          txt: '类型'
        },
        typeShow: false,
        type: '-1',
        typeBtn: {
          type: 'default',
          txt: '分类'
        },
        publishDateShow: false,
        publishDate: '-1',
        publishDateBtn: {
          type: 'default',
          txt: '发布时间'
        },
      }
    },
    created() {
      this.initConsts();
    },
    mounted() {
      this.getMyData(true);
    },
    watch: {
      trade(val) {
        this.tradeShow = false;
        let selectedLabel = getSelecteds(this.tradeOpts, val)[0].label;
        if (val === '-1') {
          this.tradeBtn.type = 'default';
          this.tradeBtn.txt = '分类';
          delete this.filters['trade'];
        } else {
          this.tradeBtn.type = 'primary';
          this.tradeBtn.txt = selectedLabel;
          this.filters.trade = val;
        }
        this.getMyData(true);
      },
      type(val) {
        this.typeShow = false;
        let selectedLabel = getSelecteds(this.typeOpts, val)[0].label;
        if (val === '-1') {
          this.typeBtn.type = 'default';
          this.typeBtn.txt = '类型';
          delete this.filters['type'];
        } else {
          this.typeBtn.type = 'primary';
          this.typeBtn.txt = selectedLabel;
          this.filters.type = val;
        }
        this.getMyData(true);
      },
      publishDate(val) {
        this.publishDateShow = false;
        let selectedLabel = getSelecteds(this.publishDateOpts, val)[0].label;
        if (val === '-1') {
          this.publishDateBtn.type = 'default';
          this.publishDateBtn.txt = '发布时间';
          delete this.filters['filter_time'];
        } else {
          this.publishDateBtn.type = 'primary';
          this.publishDateBtn.txt = selectedLabel;
          this.filters.filter_time = val;
        }
        this.getMyData(true);
      }
    },
    methods: {
      initConsts() {
        this.DICT = DICT;
        this.getSelecteds = getSelecteds;
        this.matchCustomType = Utils.matchCustomType;
        this.tradeOpts = [].concat(DICT.house.trade);
        this.tradeOpts.unshift({ 'label': '默认', 'value': '-1' });
        this.typeOpts = [].concat(DICT.house.type);
        this.typeOpts.unshift({ 'label': '默认', 'value': '-1' });
        this.publishDateOpts = [{
          label: '默认',
          value: '-1'
        }, {
          label: '今天',
          value: 'today'
        }, {
          label: '近三天',
          value: '3days'
        }, {
          label: '近两周',
          value: '2weeks'
        }, {
          label: '近一个月',
          value: '1month'
        }];
      },
      imageUrl(item) {
        return item.cover ? item.cover : PreviewDefaultImg;
      },
      switchPublishStatus() {
        if (this.publishBtn.txt === '已发布') {
          this.filters.status = 0;
          this.getMyData(true, () => {
            this.publishBtn.txt = '待发布';
            this.publishBtn.type = 'default';
          });
        } else {
          this.filters.status = 1;
          this.getMyData(true, () => {
            this.publishBtn.txt = '已发布';
            this.publishBtn.type = 'primary';
          });
        }
      },
      updateStatus(houseId, status) {
        HouseService.updateMyHouseStatus(houseId, status, res => {
          this.getMyData(true);
        })
      },
      getMyData(loading = false, callback) {
        let dateFormat = Vue.filter('dateFormat'),
          todayStr = dateFormat(new Date(), 'yyyy-MM-dd'),
          params = Utils.getEffectiveAttrsByObj(this.filters);
        if (loading) {
          this.filters.page = 1;
          HouseService.getMyHouses(params, res => {
            this.dataList = res.data.map(item => {
              let dateStr = dateFormat(item.created_at, 'yyyy-MM-dd');
              if (dateTemp === dateStr) {
                item.created_at = '';
              } else {
                dateTemp = dateStr;
                item.created_at = dateStr === todayStr ? '今天' : dateStr;
              }
              return item;
            });
            this.$refs.myScroll.scrollTo(0, 0, 300);
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.myScroll.forceUpdate(true);
            } else {
              this.$refs.myScroll.forceUpdate(false);
            }
            if (callback)
              callback();
          }, true);
        } else {
          this.filters.page += 1;
          HouseService.getMyHouses(params, res => {
            this.filters.page = res.meta.pagination.current_page;
            this.dataList = this.dataList.concat(res.data.map(item => {
              let dateStr = dateFormat(item.created_at, 'yyyy-MM-dd');
              if (dateTemp === dateStr) {
                item.created_at = '';
              } else {
                dateTemp = dateStr;
                item.created_at = dateStr === todayStr ? '今天' : dateStr;
              }
              return item;
            }));
            if (this.dataList.length < res.meta.pagination.total) {
              this.$refs.myScroll.forceUpdate(true);
            } else {
              this.$refs.myScroll.forceUpdate(false);
            }
            if (callback)
              callback();
          }, false);
        }
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
    .control-wrap {
      padding: .2rem .28rem;
      display: flex;
      .mr28 {
        margin-right: .28rem;
      }
    }
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .the-time-list {
      padding-top: 0.6rem;
      .the-time {
        margin-left: 0.28rem;
        margin-bottom: 0.4rem;
        font-size: 0.32rem;
        color: #333333;
      }
    }
    .search-item {
      display: flex;
      width: 100%;
      height: 1.74rem;
      align-items: center;
      margin-bottom: 0.4rem;
      .move-wrap {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        background: #fff;
        transition: left 0.5s;
      }
      .item-img {
        margin-left: 0.28rem;
        width: 2.7rem;
        height: 1.74rem;
        border-radius: 0.1rem;
        background: #e8e8ea no-repeat;
        background-size: cover;
      }
      .msg-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .08rem 0;
        flex-shrink: 0;
        width: 3.96rem;
        margin-left: 0.28rem;
        margin-right: 0.28rem;
      }
      .title {
        word-break: break-all;
        margin-bottom: 0.1rem;
        height: 0.64rem;
        line-height: .32rem;
        font-size: 0.28rem;
        color: #333333;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .type-wrap {
        display: flex;
        margin-bottom: 0.1rem;
      }
      .type {
        margin-right: 0.1rem;
        padding: 0.08rem;
        background: #fbf8f3;
        color: #d5be88;
        font-size: 0.24rem;
        border-radius: 0.1rem;
        line-height: 1;
      }
      .type-str {
        word-break: break-all;
        color: #808080;
        font-size: 0.24rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .rent {
        display: flex;
        align-items: flex-end;
        font-size: 0.28rem;
        color: #0f9183;
      }
      .price {
        font-weight: bold;
      }
      .price-msg {
        margin-left: 0.1rem;
        font-size: 0.24rem;
      }
      .room-size {
        margin-left: 0.25rem;
        font-size: 0.22rem;
        color: #cccccc;
      }
    }
    .collect-wrap {
      display: flex;
      height: 100%;
      .share {
        width: 1.2rem;
        height: 100%;
        background: rgba(15, 145, 131, .1) url('../../assets/images/share.png') no-repeat center center;
        background-size: .3rem .3rem;
      }
      .publish {
        width: 1.2rem;
        height: 100%;
        background: #D5EAFF url('../../assets/images/icon-send.png') no-repeat center center;
        background-size: .34rem .34rem;
      }
      .cancel {
        width: .8rem;
        height: 100%;
        background: #FFE6E6 url('../../assets/images/icon-cancel.png') no-repeat center center;
        background-size: .31rem .31rem;
      }
      .delete {
        width: .8rem;
        height: 100%;
        background: #FFE6E6 url('../../assets/images/icon-delete.png') no-repeat center center;
        background-size: .3rem .3rem;
      }
    }
  }
</style>
