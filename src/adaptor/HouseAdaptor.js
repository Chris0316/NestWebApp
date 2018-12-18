'use strict';

class HouseAdaptor {
  constructor(params) {
    let result = undefined;

    switch (params.type) {
      case 'apartment':
        result = new ResidenceImpl(params);
        break;
      case 'villa':
        result = new ResidenceImpl(params);
        break;
      case 'homestay':
        result = new ResidenceImpl(params);
        break;
      case 'office':
        result = new OfficeImpl(params);
        break;
      case 'carport':
        result = new CarportImpl(params);
        break;
      case 'land':
        result = new LandImpl(params);
        break;
      default:
        result = undefined;
    }
    return result;
  }
}

class House {
  constructor(params) {
    // 设置房屋公共属性
    this.trade = params.trade;
    this.type = params.type;
    this.galleries = params.galleries;
    this.purpose = params.purpose;
    this.building_name = params.building_name;
    this.address = params.address;
    this.region_id = params.region_id;
    this.price = params.price;
    this.contact_name = params.contact_name;
    this.contact_phone = params.contact_phone;
    this.description = params.description;
  }
}

class ResidenceImpl extends House {
  constructor(params) {
    super(params);
    // 设置住宅类型房产专有属性
    if (params.trade === 'rent') {
      this.rent_type = params.rent_type;
      this.deposit_month = params.deposit_month;
      this.pay_month = params.pay_month;
      this.available_time = params.available_time;
      this.min_stay_month = params.min_stay_month;
      this.max_stay_month = params.max_stay_month;
    } else {
      this.is_new = params.is_new;
    }
    this.building_no = params.building_no;
    this.floor = params.floor;
    this.floor_max = params.floor_max;
    this.bedroom = params.bedroom;
    this.hall = params.hall;
    this.toilet = params.toilet;
    this.centiare = params.centiare;
    this.carport = params.carport;
    this.lift = params.lift;
    this.decor = params.decor;
    this.master_direction = params.master_direction;
    this.balcony = params.balcony;
    this.pet = params.pet;
    this.facilities = params.facilities;
  }
}

class OfficeImpl extends House {
  constructor(params) {
    super(params);
    // 设置商铺写字楼类型专有属性
    if (params.trade === 'rent') {
      this.rent_type = params.rent_type;
      this.deposit_month = params.deposit_month;
      this.pay_month = params.pay_month;
      this.available_time = params.available_time;
      this.min_stay_month = params.min_stay_month;
      this.max_stay_month = params.max_stay_month;
    } else {
      this.is_new = params.is_new;
    }
    this.building_no = params.building_no;
    this.floor = params.floor;
    this.floor_max = params.floor_max;
    this.centiare = params.centiare;
    this.carport = params.carport;
    this.lift = params.lift;
    this.decor = params.decor;
    this.pet = params.pet;
  }
}

class CarportImpl extends House {
  constructor(params) {
    super(params);
    // 设置停车位类型专有属性
    if (params.trade === 'rent') {
      this.deposit_month = params.deposit_month;
      this.pay_month = params.pay_month;
      this.available_time = params.available_time;
      this.min_stay_month = params.min_stay_month;
      this.max_stay_month = params.max_stay_month;
    } else {
      this.centiare = params.centiare;
      this.is_new = params.is_new;
    }
    this.building_no = params.building_no;
    this.floor = params.floor;
    this.floor_max = params.floor_max;
    this.lift = params.lift;
  }
}

class LandImpl extends House {
  constructor(params) {
    super(params);
    // 设置土地类型专有属性
    if (params.trade === 'rent') {
      this.deposit_month = params.deposit_month;
      this.pay_month = params.pay_month;
      this.available_time = params.available_time;
      this.min_stay_month = params.min_stay_month;
      this.max_stay_month = params.max_stay_month;
    } else {
      this.lift = params.lift;
      this.is_new = params.is_new;
    }
    this.centiare = params.centiare;
  }
}

export default HouseAdaptor;
