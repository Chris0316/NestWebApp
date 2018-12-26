export default {
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
  }
};
