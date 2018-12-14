import FacIcon5 from "../assets/images/facility/fac5.png";
import FacIconSelected5 from "../assets/images/facility/fac-on5.png";
import FacIcon0 from "../assets/images/facility/fac0.png";
import FacIconSelected0 from "../assets/images/facility/fac-on0.png";
import FacIcon6 from "../assets/images/facility/fac6.png";
import FacIconSelected6 from "../assets/images/facility/fac-on6.png";
import FacIcon8 from "../assets/images/facility/fac8.png";
import FacIconSelected8 from "../assets/images/facility/fac-on8.png";

const filters = {
  "select": [{
    "dbkey1": "trade",
    "dbvalue1": "rent",
    "label": "租房",
    "value": "rent"
  }, {
    "dbkey1": "is_new",
    "dbvalue1": "0",
    "label": "二手房",
    "value": "second"
  }, {
    "dbkey1": "is_new",
    "dbvalue1": "1",
    "label": "新房",
    "value": "new"
  }, {
    "dbkey1": "type",
    "dbvalue1": "carport",
    "label": "车位",
    "value": "carport"
  }, {
    "dbkey1": "type",
    "dbvalue1": "land",
    "label": "土地",
    "value": "land"
  }],
  "bedroom": [{
    "label": "一居室",
    "value": "1"
  }, {
    "label": "二居室",
    "value": "2"
  }, {
    "label": "三居室",
    "value": "3"
  }, {
    "label": "其他",
    "value": "其他"
  }],
  "sort": {
    "rent": [{
      "dbkey1": "order",
      "dbvalue1": "default",
      "dbkey2": "orderway",
      "dbvalue2": "",
      "label": "默认排序",
      "value": "0"
    }, {
      "dbkey1": "order",
      "dbvalue1": "created_at",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "最新发布",
      "value": "1"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "租金由低到高",
      "value": "2"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "租金由高到低",
      "value": "3"
    }, {
      "dbkey1": "order",
      "dbvalue1": "centiare",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "面积从小到大",
      "value": "4"
    }, {
      "dbkey1": "order",
      "dbvalue1": "centiare",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "面积从大到小",
      "value": "5"
    }],
    "second": [{
      "dbkey1": "order",
      "dbvalue1": "default",
      "dbkey2": "orderway",
      "dbvalue2": "",
      "label": "默认排序",
      "value": "0"
    }, {
      "dbkey1": "order",
      "dbvalue1": "created_at",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "最新发布",
      "value": "1"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "总价由低到高",
      "value": "2"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "总价由高到低",
      "value": "3"
    }, {
      "dbkey1": "order",
      "dbvalue1": "avg_price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "单价由低到高",
      "value": "4"
    }, {
      "dbkey1": "order",
      "dbvalue1": "centiare",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "面积从大到小",
      "value": "5"
    }],
    "carport": [{
      "dbkey1": "order",
      "dbvalue1": "default",
      "dbkey2": "orderway",
      "dbvalue2": "",
      "label": "默认排序",
      "value": "0"
    }, {
      "dbkey1": "order",
      "dbvalue1": "created_at",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "最新发布",
      "value": "1"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "总价由低到高",
      "value": "2"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "总价由高到低",
      "value": "3"
    }, {
      "dbkey1": "order",
      "dbvalue1": "avg_price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "单价由低到高",
      "value": "4"
    }],
    "land": [{
      "dbkey1": "order",
      "dbvalue1": "default",
      "dbkey2": "orderway",
      "dbvalue2": "",
      "label": "默认排序",
      "value": "0"
    }, {
      "dbkey1": "order",
      "dbvalue1": "created_at",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "最新发布",
      "value": "1"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "总价由低到高",
      "value": "2"
    }, {
      "dbkey1": "order",
      "dbvalue1": "price",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "总价由高到低",
      "value": "3"
    }, {
      "dbkey1": "order",
      "dbvalue1": "avg_price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "单价由低到高",
      "value": "4"
    }],
    "new": [{
      "dbkey1": "order",
      "dbvalue1": "default",
      "dbkey2": "orderway",
      "dbvalue2": "",
      "label": "默认排序",
      "value": "0"
    }, {
      "dbkey1": "order",
      "dbvalue1": "avg_price",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "均价由低到高",
      "value": "1"
    }, {
      "dbkey1": "order",
      "dbvalue1": "avg_price",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "均价由高到低",
      "value": "2"
    }, {
      "dbkey1": "order",
      "dbvalue1": "available_time",
      "dbkey2": "orderway",
      "dbvalue2": "desc",
      "label": "开盘时间顺序",
      "value": "3"
    }, {
      "dbkey1": "order",
      "dbvalue1": "available_time",
      "dbkey2": "orderway",
      "dbvalue2": "asc",
      "label": "开盘时间倒序",
      "value": "4"
    }]
  },
  "price": {
    "rent": [{
      "label": "15000-30000",
      "value": "15000-30000"
    }, {
      "label": "30000-40000",
      "value": "30000-40000"
    }, {
      "label": "40000-50000",
      "value": "40000-50000"
    }, {
      "label": "50000以上",
      "value": "50000-0"
    }],
    "new": [{
      "label": "200万-400万",
      "value": "2000000-4000000"
    }, {
      "label": "400万-600万",
      "value": "4000000-6000000"
    }, {
      "label": "600万-800万",
      "value": "6000000-8000000"
    }, {
      "label": "800万以上",
      "value": "8000000-0"
    }],
    "second": [{
      "label": "200万-400万",
      "value": "2000000-4000000"
    }, {
      "label": "400万-600万",
      "value": "4000000-6000000"
    }, {
      "label": "600万-800万",
      "value": "6000000-8000000"
    }, {
      "label": "800万以上",
      "value": "8000000-0"
    }],
    "carport": [{
      "label": "50万以下",
      "value": "0-500000"
    }, {
      "label": "50万-100万",
      "value": "500000-1000000"
    }, {
      "label": "100万-150万",
      "value": "1000000-1500000"
    }, {
      "label": "150万以上",
      "value": "1500000-0"
    }],
    "land": [{
      "label": "500万以下",
      "value": "0-5000000"
    }, {
      "label": "500万-1000万",
      "value": "5000000-10000000"
    }, {
      "label": "1000万-2000万",
      "value": "10000000-20000000"
    }, {
      "label": "2000万以上",
      "value": "20000000-0"
    }]
  },
  "type": {
    "rent": [{
      "label": "公寓",
      "value": "apartment"
    }, {
      "label": "别墅",
      "value": "villa"
    }, {
      "label": "民居",
      "value": "homestay"
    }, {
      "label": "写字楼",
      "value": "office"
    }, {
      "label": "土地",
      "value": "land"
    }],
    "second": [{
      "label": "公寓",
      "value": "apartment"
    }, {
      "label": "别墅",
      "value": "villa"
    }, {
      "label": "民居",
      "value": "homestay"
    }, {
      "label": "写字楼",
      "value": "office"
    }],
    "new": [{
      "label": "公寓",
      "value": "apartment"
    }, {
      "label": "别墅",
      "value": "villa"
    }, {
      "label": "民居",
      "value": "homestay"
    }, {
      "label": "写字楼",
      "value": "office"
    }]
  },
  "facilities": [{
    "value": 9,
    "label": "静音空调"
  }, {
    "value": 2,
    "label": "洗衣机"
  }, {
    "value": 3,
    "label": "冰箱"
  }, {
    "value": 7,
    "label": "热水器"
  }],
  "centiare": {
    "second": [{
      "label": "30m²以下",
      "value": "0-30"
    }, {
      "label": "30-50m²",
      "value": "30-50"
    }, {
      "label": "50-70m²",
      "value": "50-70"
    }, {
      "label": "70-100m²",
      "value": "70-100"
    }, {
      "label": "100-150m²",
      "value": "100-150"
    }, {
      "label": "150m²以上",
      "value": "150-0"
    }],
    "land": [{
      "label": "200m²以下",
      "value": "0-200"
    }, {
      "label": "200-1000m²",
      "value": "200-1000"
    }, {
      "label": "1000-5000m²",
      "value": "1000-5000"
    }, {
      "label": "5000m²以上",
      "value": "5000-0"
    }],
    "new": [{
      "label": "30m²以下",
      "value": "0-30"
    }, {
      "label": "30-50m²",
      "value": "30-50"
    }, {
      "label": "50-70m²",
      "value": "50-70"
    }, {
      "label": "70-100m²",
      "value": "70-100"
    }, {
      "label": "100-150m²",
      "value": "100-150"
    }, {
      "label": "150m²以上",
      "value": "150-0"
    }]
  },
  "carport": [{
    "label": "带车位",
    "value": "1"
  }, {
    "label": "不带车位",
    "value": "0"
  }],
  "floor": {
    "second": [{
      "label": "低楼层1-20",
      "value": "1-20"
    }, {
      "label": "中楼层20-40",
      "value": "20-40"
    }, {
      "label": "高楼层40以上",
      "value": "40-0"
    }],
    "carport": [{
      "label": "地下",
      "value": "down"
    }, {
      "label": "地上",
      "value": "up"
    }],
    "new": [{
      "label": "低楼层1-20",
      "value": "1-20"
    }, {
      "label": "中楼层20-40",
      "value": "20-40"
    }, {
      "label": "高楼层40以上",
      "value": "40-0"
    }]
  }
};

export default filters;