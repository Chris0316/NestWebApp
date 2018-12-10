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

import FacIcon0 from "../assets/images/facility/fac0.png";
import FacIconSelected0 from "../assets/images/facility/fac-on0.png";
import FacIcon1 from "../assets/images/facility/fac1.png";
import FacIconSelected1 from "../assets/images/facility/fac-on1.png";
import FacIcon2 from "../assets/images/facility/fac2.png";
import FacIconSelected2 from "../assets/images/facility/fac-on2.png";
import FacIcon3 from "../assets/images/facility/fac3.png";
import FacIconSelected3 from "../assets/images/facility/fac-on3.png";
import FacIcon4 from "../assets/images/facility/fac4.png";
import FacIconSelected4 from "../assets/images/facility/fac-on4.png";
import FacIcon5 from "../assets/images/facility/fac5.png";
import FacIconSelected5 from "../assets/images/facility/fac-on5.png";
import FacIcon6 from "../assets/images/facility/fac6.png";
import FacIconSelected6 from "../assets/images/facility/fac-on6.png";
import FacIcon7 from "../assets/images/facility/fac7.png";
import FacIconSelected7 from "../assets/images/facility/fac-on7.png";
import FacIcon8 from "../assets/images/facility/fac8.png";
import FacIconSelected8 from "../assets/images/facility/fac-on8.png";
import FacIcon9 from "../assets/images/facility/fac9.png";
import FacIconSelected9 from "../assets/images/facility/fac-on9.png";

const DICT = {
  "house": {
    "facilities": [{
      "value": 1,
      "label": "电视机",
      "icon": FacIcon5,
      "icon_selected": FacIconSelected5
    }, {
      "value": 2,
      "label": "洗衣机",
      "icon": FacIcon0,
      "icon_selected": FacIconSelected0
    }, {
      "value": 3,
      "label": "冰箱",
      "icon": FacIcon6,
      "icon_selected": FacIconSelected6
    }, {
      "value": 4,
      "label": "沙发",
      "icon": FacIcon8,
      "icon_selected": FacIconSelected8
    }, {
      "value": 5,
      "label": "床",
      "icon": FacIcon4,
      "icon_selected": FacIconSelected4
    }, {
      "value": 6,
      "label": "宽带",
      "icon": FacIcon7,
      "icon_selected": FacIconSelected7
    }, {
      "value": 7,
      "label": "热水器",
      "icon": FacIcon3,
      "icon_selected": FacIconSelected3
    }, {
      "value": 8,
      "label": "衣柜",
      "icon": FacIcon9,
      "icon_selected": FacIconSelected9
    }, {
      "value": 9,
      "label": "静音空调",
      "icon": FacIcon1,
      "icon_selected": FacIconSelected1
    }, {
      "value": 10,
      "label": "普通空调",
      "icon": FacIcon2,
      "icon_selected": FacIconSelected2
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
    }, {
      "label": "土地",
      "value": "land"
    }],
    "purpose": [{
      "label": "居住",
      "value": "live"
    }, {
      "label": "办公",
      "value": "office"
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
    }],
    "carport": [{
      "label": "有(免费)",
      "value": "1"
    }, {
      "label": "有(另议)",
      "value": "2"
    }, {
      "label": "无",
      "value": "0"
    }],
    "region": [{
      "label": "马卡提(Makati)",
      "value": "3"
    }, {
      "label": "帕赛(Pasay)",
      "value": "4"
    }, {
      "label": "马尼拉市(City of Manila)",
      "value": "9"
    }, {
      "label": "曼达卢永(Mandaluyong)",
      "value": "6"
    }, {
      "label": "奎松(Quezon)",
      "value": "5"
    }, {
      "label": "BGC(BGC, Taguig)",
      "value": "7"
    }, {
      "label": "帕西市(Pasig)",
      "value": "8"
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
