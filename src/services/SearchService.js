import axios from '../utils/Request';

const api = {
  suggest: '/search/suggest'
};

let SearchService = {
  getSuggestList(params, callback) {
    axios.get(api.suggest, {
      params: params,
      loading: false
    }).then(res => {
      callback(res);
    })
  }
};

export default SearchService;
