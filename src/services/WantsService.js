import axios from '../utils/Request';

const api = {
  wants: '/wants'
};

let WantsService = {
  getList(params, callback, loading) {
    axios.get(api.wants, {
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
  }
};

export default WantsService;
