import ChinaFlag from "../assets/images/flags/China.png";
import ChinaFlag2 from "../assets/images/flags/China-r.png";
import PhilippineFlag from "../assets/images/flags/Philippine.png";
import PhilippineFlag2 from "../assets/images/flags/Philippine-r.png";
import JapanFlag from "../assets/images/flags/Japan.png";
import JapanFlag2 from "../assets/images/flags/Japan-r.png";
import KoreaFlag from "../assets/images/flags/Korea.png";
import KoreaFlag2 from "../assets/images/flags/Korea-r.png";
import USAFlag from "../assets/images/flags/USA.png";
import USAFlag2 from "../assets/images/flags/USA-r.png";
import EuropeFlag from "../assets/images/flags/Europe.png";
import EuropeFlag2 from "../assets/images/flags/Europe-r.png";
import EarthFlag from "../assets/images/flags/Earth.png";
import EarthFlag2 from "../assets/images/flags/Earth-r.png";

const DICT = {
  "house": {
    "facilities": [{
      "value": 1,
      "label": "电视机",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 2,
      "label": "洗衣机",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 3,
      "label": "冰箱",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 4,
      "label": "沙发",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 5,
      "label": "床",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 6,
      "label": "宽带",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 7,
      "label": "电脑桌",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 8,
      "label": "衣柜",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 9,
      "label": "静音空调",
      "icon": "",
      "icon_selected": ""
    }, {
      "value": 10,
      "label": "普通空调",
      "icon": "",
      "icon_selected": ""
    }],
    "trade": [{
      "label": "出租",
      "value": "rent"
    }, {
      "label": "出售",
      "value": "sale"
    }],
    "type": [{
      "label": "公寓",
      "value": "apartment"
    }, {
      "label": "别墅",
      "value": "villa"
    }, {
      "label": "民宿",
      "value": "homestay"
    }, {
      "label": "商铺/写字楼",
      "value": "office"
    }, {
      "label": "车库",
      "value": "carport"
    }],
    "purpose": [{
      "label": "办公",
      "value": "office"
    }, {
      "label": "居住",
      "value": "live"
    }, {
      "label": "商住两用",
      "value": "office_live"
    }],
    "rent_type": [{
      "label": "整租",
      "value": "sole"
    }, {
      "label": "合租",
      "value": "shared"
    }],
    "decor": [{
      "label": "精装修",
      "value": "1"
    }, {
      "label": "豪华装修",
      "value": "2"
    }, {
      "label": "毛坯",
      "value": "3"
    }],
    "master_direction": [{
      "label": "东",
      "value": "1"
    }, {
      "label": "西",
      "value": "2"
    }, {
      "label": "南",
      "value": "3"
    }, {
      "label": "北",
      "value": "4"
    }]
  },
  "user": {
    "gender": [{
      "label": "先生",
      "value": "1"
    }, {
      "label": "女士",
      "value": "2"
    }, {
      "label": "其他",
      "value": "3"
    }]
  },
  "country": [{
    "label": "中国",
    "value": "0086",
    "icon": ChinaFlag,
    "icon2": ChinaFlag2
  }, {
    "label": "菲律宾",
    "value": "0063",
    "icon": PhilippineFlag,
    "icon2": PhilippineFlag2
  }, {
    "label": "日本",
    "value": "0081",
    "icon": JapanFlag,
    "icon2": JapanFlag2
  }, {
    "label": "韩国",
    "value": "0082",
    "icon": KoreaFlag,
    "icon2": KoreaFlag2
  }, {
    "label": "美国",
    "value": "0001",
    "icon": USAFlag,
    "icon2": USAFlag2
  }, {
    "label": "欧洲",
    "value": "euro",
    "icon": EuropeFlag,
    "icon2": EuropeFlag2
  }, {
    "label": "其他",
    "value": "others",
    "icon": EarthFlag,
    "icon2": EarthFlag2
  }],
  "languages": ['中文', '한국어', 'にほんご', 'English']
};

let getSelecteds = (array, values) => {
  let arr = array.filter(item => {
    let temp = item.value || item;
    if (values instanceof Array) {
      return values.indexOf(item) > -1;
    } else {
      return values == temp;
    }
  });
  return arr;
};

export default DICT;
export {getSelecteds};
