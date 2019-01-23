import axios from '../utils/Request';

const api = {
  userInfo: '/user',
  agent: '/agents',
  myWants: '/user/wants',
  myHouses: '/user/houses',
  favorites:'/user/favorites'
};

let UserService = {
  addFavorites(params,callback){
    axios.post(api.favorites,params,{loading:false}
    ).then(res => {
      callback(res)
    })
  },
  cancelFavorites(params,callback){
    axios.delete(api.favorites, {params:params,loading:false}
    ).then(res => {
      callback(res)
    })
  },
  getUserInfo(callback) {
    axios.get(api.userInfo).then(res => {
      callback(res);
    })
  },
  getAgentInfo(id, callback) {
    axios.get(api.agent + "/" + id).then(res => {
      callback(res);
    })
  },
  updateUserInfo(userInfo, callback) {
    axios.patch(api.userInfo, userInfo).then(res => {
      callback(res);
    })
  },
  getAgentList(params, callback) {
    axios.get(api.agent, {
      params: params
    }).then(res => {
      callback(res)
    })
  },
  getAgentInfo(id, callback) {
    axios.get(api.agent+"/"+id).then(res => {
      callback(res)
    })
  },
  getAgentInfoHouses(id,params, callback) {
    axios.get(`users/${id}/houses?trade=${params.trade}`).then(res => {
      callback(res)
    })
  },
  getMyWants(params, callback, loading) {
    axios.get(api.myWants, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    })
  },
  getMyHouses(params, callback, loading) {
    axios.get(api.myHouses, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    })
  }
};

export default UserService;
