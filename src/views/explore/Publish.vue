<template>
  <div class="publish">
    <div class="header border-bottom">
      <div class="back" @click="$router.go(-1);"></div>
      发布出租信息
    </div>
    <nest-scroll class="app-body">
      <div>
        <nest-upload></nest-upload>
        <div class="tag border-bottom">
          <nest-radio :options="typeOpts" :count-in-row="3" cell-type="default"></nest-radio>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name">用途</div>
          <div class="realm-content">
            <nest-radio :countInRow="3" size="small" :options="['住房','商业办公','商住两用']"></nest-radio>
          </div>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name">方式</div>
          <div class="realm-content">
            <nest-radio :countInRow="3" size="small" :options="['整租','合租']"></nest-radio>
          </div>
        </div><!--只有出租-->

        <!--关于出租、出售公寓别墅-->
        <div class="realm arrow-right border-bottom">
          <div class="realm-name">小区名称<span class="star-point">*</span></div>
          <div class="realm-content">fgfgfgdfg</div>
        </div>

        <!--关于售卖商业楼-->
        <!--<div class="realm arrow-right border-bottom">-->
        <!--<div class="realm-name">商铺/写字楼<span class="star-point">*</span></div>-->
        <!--<div class="realm-content">fgfgfgdfg</div>-->
        <!--</div>-->

        <!--关于车位-->
        <!--<div class="realm arrow-right border-bottom">-->
        <!--<div class="realm-name">小区/商铺<br/>/写字楼<span class="star-point">*</span></div>-->
        <!--<div class="realm-content">fgfgfgdfg</div>-->
        <!--</div>-->

        <div class="realm border-bottom">
          <div class="realm-name">地址</div>
          <nest-field></nest-field>
        </div>
        <div class="realm arrow-right border-bottom">
          <div class="realm-name">区域</div>
          <div class="realm-content">fgfgfgdfg</div>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name">楼栋号</div>
          <nest-field></nest-field>
        </div>
        <div class="realm border-bottom">
          <div class="realm-name">楼层</div>
          <div class="realm-content floor-deltail">
            <div class="deltails">
              第
              <nest-field type="tel" class="deltail1" textAlign="center"></nest-field>
              层
            </div>
            <div class="deltails">
              共
              <nest-field type="tel" class="deltail1" textAlign="center"></nest-field>
              层
            </div>
          </div>
        </div>

        <!--车位出租-->
        <div>
          <div class="realm border-bottom">
            <div class="realm-name">户型</div>
            <div class="realm-content house-type">
              <div class="deltails">
                <nest-field type="tel" class="deltail1"></nest-field>
                室
              </div>
              <div class="deltails">
                <nest-field type="tel" class="deltail1"></nest-field>
                厅
              </div>
              <div class="deltails">
                <nest-field type="tel" class="deltail1"></nest-field>
                卫
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">面积</div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">平米</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">租金<span class="star-point">*</span></div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">P/月</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">付款方式</div>
            <div class="realm-content pay-mode">
              <div class="inpval-wrap">
                押
                <nest-field type="tel" class="inpval" textAlign="center"></nest-field>
              </div>
              <div class="inpval-wrap">
                付
                <nest-field type="tel" class="inpval" textAlign="center"></nest-field>
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">联系人<span class="star-point">*</span></div>
            <div class="realm-content sex">
              <nest-field></nest-field>
              <div class="sex-btn">
                <nest-radio :countInRow="2" size="small" :options="['男士','女士']"></nest-radio>
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">手机号<span class="star-point">*</span></div>
            <div class="realm-content phone">
              <input type="tel" class="num" max="11" placeholder="无需区号，11位数">
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">车位</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有(免费)','有(另议)','无']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">电梯</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有电梯','无电梯']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">装修</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['精装修','豪华装修','毛坯']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">主卧朝向</div>
            <div class="realm-content">
              <nest-radio :countInRow="4" size="small" :options="['南','北','东','西']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">阳台</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有阳台','无阳台']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">宠物</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['可养宠物','禁止宠物']"></nest-radio>
            </div>
          </div>
          <div class="facilitie">
            <div class="fac-title">配套设施</div>
            <div class="fac-row">
              <div class="fac-item" v-for="(item, i) in facList" :key="i" @click="sleFun(item,i,$event)" :class="{on:item.facFlag}">
                <img class="fac-img fac-img0" :src="item.url1">
                <div class="fac-name">{{item.facName}}</div>
              </div>
            </div>
          </div>
        </div>

        <!--租房-->
        <div v-if="false">
          <div class="realm border-bottom">
            <div class="realm-name">面积</div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">平米</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">租金<span class="star-point">*</span></div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">P/月</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">付款方式</div>
            <div class="realm-content pay-mode">
              <div class="inpval-wrap">
                押
                <nest-field type="tel" class="inpval" textAlign="center"></nest-field>
              </div>
              <div class="inpval-wrap">
                付
                <nest-field type="tel" class="inpval" textAlign="center"></nest-field>
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">联系人<span class="star-point">*</span></div>
            <div class="realm-content sex">
              <nest-field></nest-field>
              <div class="sex-btn">
                <nest-radio :countInRow="2" size="small" :options="['男士','女士']"></nest-radio>
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">手机号<span class="star-point">*</span></div>
            <div class="realm-content phone">
              <input type="tel" class="num" max="11" placeholder="无需区号，11位数">
            </div>
          </div>
          <div class="realm arrow-right border-bottom">
            <div class="realm-name">可入住时间</div>
            <div class="realm-content">fgfgfgdfg</div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">租期</div>
            <div class="realm-content oneinput">
              <div class="lease">
                <nest-field type="tel" class="leaseVal" textAlign="center"></nest-field>
                <span class="leaseLine">-</span>
                <nest-field type="tel" class="leaseVal" textAlign="center"></nest-field>
              </div>
              <span class="set">个月</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">电梯</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有电梯','无电梯']"></nest-radio>
            </div>
          </div>
        </div>


        <!--售卖公寓别墅-->
        <div v-if="false">
          <div class="realm border-bottom">
            <div class="realm-name">户型</div>
            <div class="realm-content house-type">
              <div class="deltails">
                <nest-field type="tel" class="deltail1"></nest-field>
                室
              </div>
              <div class="deltails">
                <nest-field type="tel" class="deltail1"></nest-field>
                厅
              </div>
              <div class="deltails">
                <nest-field type="tel" class="deltail1"></nest-field>
                卫
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">面积</div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">平米</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">售价<span class="star-point">*</span></div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">万</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">联系人<span class="star-point">*</span></div>
            <div class="realm-content sex">
              <nest-field></nest-field>
              <div class="sex-btn">
                <nest-radio :countInRow="2" size="small" :options="['男士','女士']"></nest-radio>
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">手机号<span class="star-point">*</span></div>
            <div class="realm-content phone">
              <input type="tel" class="num" max="11" placeholder="无需区号，11位数">
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">车位</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有(免费)','有(需另议)','无']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">电梯</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有电梯','无电梯']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">装修</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['精装修','豪华装修','毛坯']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">主卧朝向</div>
            <div class="realm-content">
              <nest-radio :countInRow="4" size="small" :options="['南','北','东','西']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">阳台</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有阳台','无阳台']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">宠物</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['可养宠物','禁止宠物']"></nest-radio>
            </div>
          </div>
          <div class="facilitie">
            <div class="fac-title">配套设施</div>
            <div class="fac-row">
              <div class="fac-item" v-for="(item, i) in facList" :key="i" @click="sleFun(item,i,$event)" :class="{on:item.facFlag}">
                <img class="fac-img fac-img0" :src="item.url1">
                <div class="fac-name">{{item.facName}}</div>
              </div>
            </div>
          </div>
        </div>


        <!--售卖商业楼-->
        <div v-if="false">
          <div class="realm border-bottom">
            <div class="realm-name">面积</div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">平米</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">售价<span class="star-point">*</span></div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">万</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">联系人<span class="star-point">*</span></div>
            <div class="realm-content sex">
              <nest-field></nest-field>
              <div class="sex-btn">
                <nest-radio :countInRow="2" size="small" :options="['男士','女士']"></nest-radio>
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">手机号<span class="star-point">*</span></div>
            <div class="realm-content phone">
              <input type="tel" class="num" max="11" placeholder="无需区号，11位数">
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">车位</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有(免费)','有(需另议)','无']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">电梯</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有电梯','无电梯']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">装修</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['精装修','豪华装修','毛坯']"></nest-radio>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">宠物</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['可养宠物','禁止宠物']"></nest-radio>
            </div>
          </div>
        </div>


        <!--出售车位-->
        <div v-if="false">
          <div class="realm border-bottom">
            <div class="realm-name">面积</div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">平米</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">售价<span class="star-point">*</span></div>
            <div class="realm-content oneinput">
              <nest-field type="tel"></nest-field>
              <span class="set">万</span>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">联系人<span class="star-point">*</span></div>
            <div class="realm-content sex">
              <nest-field></nest-field>
              <div class="sex-btn">
                <nest-radio :countInRow="2" size="small" :options="['男士','女士']"></nest-radio>
              </div>
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">手机号<span class="star-point">*</span></div>
            <div class="realm-content phone">
              <input type="tel" class="num" max="11" placeholder="无需区号，11位数">
            </div>
          </div>
          <div class="realm border-bottom">
            <div class="realm-name">电梯</div>
            <div class="realm-content">
              <nest-radio :countInRow="3" size="small" :options="['有电梯','无电梯']"></nest-radio>
            </div>
          </div>
        </div>


        <!--<div class="inp-textarea">-->
        <!--<div class="det-more">-->
        <!--点击填写详细信息，轻松方便出租-->
        <!--<div class="del-more"></div>-->
        <!--</div>-->
        <!--<nest-button type="primary m68">发布</nest-button>-->
        <!--</div>-->


        <!-- notop:去掉上边框 -->
        <div class="intr border-top border-bottom">
          <div class="intr-title">介绍</div>
          <nest-field type="textarea"></nest-field>
        </div>
        <div class="pub-bottom">
          <nest-button type="primary" size="full">发布</nest-button>
        </div>
      </div>
    </nest-scroll>
  </div>
</template>

<script>
  export default {
    name: "Pulish",
    data() {
      return {
        typeOpts: ['公寓', '别墅', '民居', '商铺/写字楼', '车位'],
        facList:[
          {
            url1:require('../../assets/images/facility/fac0.png'),
            url2:require('../../assets/images/facility/fac-on0.png'),
            facName:'洗衣机',
            facFlag:false,
          },
          {
            url1:require('../../assets/images/facility/fac1.png'),
            url2:require('../../assets/images/facility/fac-on1.png'),
            facName:'静音空调',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac2.png'),
            url2:require('../../assets/images/facility/fac-on2.png'),
            facName:'普通空调',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac3.png'),
            url2:require('../../assets/images/facility/fac-on3.png'),
            facName:'热水器',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac4.png'),
            url2:require('../../assets/images/facility/fac-on4.png'),
            facName:'床',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac5.png'),
            url2:require('../../assets/images/facility/fac-on5.png'),
            facName:'电视',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac6.png'),
            url2:require('../../assets/images/facility/fac-on6.png'),
            facName:'冰箱',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac7.png'),
            url2:require('../../assets/images/facility/fac-on7.png'),
            facName:'宽带',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac8.png'),
            url2:require('../../assets/images/facility/fac-on8.png'),
            facName:'沙发',
            facFlag:false
          },
          {
            url1:require('../../assets/images/facility/fac9.png'),
            url2:require('../../assets/images/facility/fac-on9.png'),
            facName:'衣柜',
            facFlag:false
          }
        ],
        facSleArr:[]
      }
    },
    methods:{
      checkEquip(){

      },
      sleFun(item,i,$event){
        if (!this.facList[i].facFlag){
          this.facList[i].url1 = require(`../../assets/images/facility/fac-on${i}.png`)
          this.facList[i].facFlag = true
          this.facSleArr.push(item.facName)
        }else {
          this.facList[i].url1 = require(`../../assets/images/facility/fac${i}.png`)
          this.facList[i].facFlag = false
          // 数组查找摸一个元素
          var index = this.facSleArr.indexOf(item.facName);
          if (index > -1) {
            this.facSleArr.splice(index, 1);
          }
        }
      },
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
      margin: 0rem 0.28rem;
      padding: 0.2rem 0;
    }
    .app-body {
      flex: 1;
      overflow: hidden;
    }
    .realm {
      position: relative;
      margin: 0rem 0.28rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      .realm-name {
        width: 1.92rem;
      }
      .realm-content {
        flex: 1;
      }
      .star-point {
        color: red;
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
          border: 0rem;
        }
      }
    }
    .house-type {
      display: flex;
      justify-content: space-between;
      .deltails {
        display: flex;
        align-items: center;
      }
      .deltail1 {
        margin-right: 0.1rem;
        width: 0.9rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border: 0rem;
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
      .leaseVal {
        width: 1.2rem;
      }
      .leaseLine {
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
    .sex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sex-btn {
        width: 2.6rem;
      }
    }
    .phone {
      .num {
        width: 100%;
        border: 0rem;
        &::-webkit-input-placeholder {
          color: #B3B3B3;
        }
      }
    }
    .facilitie {
      box-sizing: border-box;
      padding: 0rem 0.28rem;
      display: flex;
      flex-direction: column;
      height: 4.22rem;
      .fac-title {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.28rem;
        color: #333333;
      }
      .fac-row {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0.5rem;
        &:last-child {
          margin-bottom: 0rem;
        }
      }
      .fac-item {
        margin-bottom: 0.4rem;
        margin-right: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 1.2rem;
        height: 1.2rem;
        &:nth-child(5n) {
          margin-right: 0rem;
        }
        &.on{
          .fac-name{
            color: #0f9183;
          }
        }
      }
      .fac-name {
        font-size: 0.24rem;
        color: #B2B2B2;
      }
      .fac-img0 {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
    .intr {
      display: flex;
      padding: 0.36rem 0.28rem 0rem;
      box-sizing: border-box;
      overflow: hidden;
      height: 3.8rem;
      background: #fff;
      margin-bottom: 0.1rem;
      overflow: hidden;
      &.notop {
        border-top: 0rem;
      }
      .intr-title {
        width: 1.92rem;
        height: 3.4rem;
        font-size: 0.28rem;
        color: #333;
      }
    }
    .inp-textarea {
      overflow: hidden;
      width: 100%;
      height: 3.5rem;
      background: #f2f2f2;
    }
    .det-more {
      margin: 0.6rem auto 1rem;
      display: flex;
      justify-content: center;
      color: #F99C91;
    }
    .del-more {
      margin-left: 0.19rem;
      width: 0.35rem;
      height: 0.34rem;
      background: url("../../assets/images/del-more.png") no-repeat;
      background-size: 100% 100%;
    }
    .pub-bottom {
      padding: 0.5rem .68rem 1rem;
      background: #F2F2F2;
    }
    .control-btn {
      margin-bottom: 0.2rem;
      position: relative;
      margin-right: .28rem;
      padding: 0 .22rem;
      min-width: 1.2rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      font-size: .28rem;
      color: #333;
      box-sizing: border-box;
      border-radius: .1rem;
      &.active {
        color: #fff;
        background-color: #0f9183;
        &::after {
          display: none;
        }
      }
      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        border: 1px solid #b2b2b2;
        border-radius: .2rem;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(.5);
        transform-origin: left top;
      }
    }
  }
</style>
