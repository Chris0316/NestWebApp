import axios from '../utils/Request';

const api = {
  categories: '/categories'
};

let CategoryService = {
  getCategoryByAlias(alias, callback) {
    axios.get(api.categories, {
      params: {
        alias: alias
      }
    }).then(res => {
      callback(res);
    })
  }
};

export default CategoryService;
