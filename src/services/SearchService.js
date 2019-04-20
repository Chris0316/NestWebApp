import axios from '../utils/Request';

const api = {
  house: '/house/suggest',
  follow: '/search/suggest'
};

let SearchService = {
  searchFromHouse(params, callback) {
    axios.get(api.house, {
      params: params,
      loading: false
    }).then(res => {
      callback(res);
    })
  },
  searchFromFollow(params, callback) {
    axios.get(api.follow, {
      params: params,
      loading: false
    }).then(res => {
      callback(res);
    })
  }
};

export default SearchService;
