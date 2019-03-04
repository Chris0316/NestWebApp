import axios from '../utils/Request';

const api = {
  favorites: '/user/favorites'
};

let FollowService = {
  getFollowList (params, callback, loading) {
    axios.get(api.favorites, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    })
  },
  doFollow (params, callback) {
    axios.post(api.favorites, params).then(res => {
      callback(res);
    })
  },
  unFollow (params, callback) {
    axios.delete(api.favorites, {
      params: params
    }).then(res => {
      callback(res);
    })
  }
};

export default FollowService;
