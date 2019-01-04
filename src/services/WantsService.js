import axios from '../utils/Request';

const api = {
  wants: '/wants',
  myWants: '/user/wants'
};

let WantsService = {
  getList(params, callback, loading) {
    axios.get(api.wants, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    });
  },
  publish(wantsObj, callback) {
    axios.post(api.wants, wantsObj).then(res => {
      callback(res);
    });
  },
  getDetailsById(id, callback) {
    axios.get(api.wants + '/' + id).then(res => {
      callback(res);
    });
  },
  getMyWants(params, callback, loading) {
    axios.get(api.myWants, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    })
  },
  updateMyWantsStatus(wantsId, status, callback) {
    axios.put(api.wants + '/' + wantsId + '/status', {
      status: status,
      loading: false
    }).then(res => {
      callback(res);
    })
  }
};

export default WantsService;
