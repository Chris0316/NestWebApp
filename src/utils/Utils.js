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
  replaceApiPlaceholder(api, key, value) {
    return api.replace(':' + key, value);
  }
};
