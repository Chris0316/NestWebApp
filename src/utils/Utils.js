export default {
  /**
   * 去除对象中未赋值的属性
   * */
  getEffectiveAttrsByObj(params) {
    for(let key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[key] === "" || params[key] === null || params[key] === undefined) {
          delete params[key];
        } else if (params[key] instanceof Array && params[key].length === 0) {
          delete params[key];
        }
      }
    }
    return params;
  },
  /**
   * 替换api中的占位符
   * */
  replaceApiPlaceholder(api, keyValueArray) {
    let varCount = api.split(':').length - 1;
    if (keyValueArray && keyValueArray.length === varCount) {
      keyValueArray.forEach(item => {
        api = api.replace(':' + item.key, item.value);
      });
    }
    return api;
  },
  /**
   * 通过房屋对象匹配自定义房屋类型
   * */
  matchCustomType(house) {
    if (house && house instanceof Object) {
      let type = house.type,
        trade = house.trade,
        isNew = house.is_new,
        finalResult = '';
      if (trade === 'rent') {
        finalResult = 'rent';
      } else if (trade === 'sale' && isNew == '1' && (['apartment', 'villa', 'homestay', 'office'].indexOf(type) > -1)) {
        finalResult = 'new';
      } else if (trade === 'sale' && isNew == '0' && (['apartment', 'villa', 'homestay', 'office'].indexOf(type) > -1)) {
        finalResult = 'second';
      } else if (trade === 'sale' && type === 'carport') {
        finalResult = 'carport';
      } else if (trade === 'sale' && type === 'land') {
        finalResult = 'land';
      }
      return finalResult;
    }
    return null;
  }
};
