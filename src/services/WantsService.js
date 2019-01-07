import axios from '../utils/Request';
import Utils from '../utils/Utils'

const api = {
  wants: '/wants',
  wants_update: '/wants/:wantId/status'
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
  updateMyWantsStatus(wantId, status, callback) {
    let keyValueArray = [{
      key: 'wantId',
      value: wantId
    }];
    let this_api = Utils.replaceApiPlaceholder(api.wants_update, keyValueArray);
    axios.put(this_api, {
      status: status,
      loading: false
    }).then(res => {
      callback(res);
    })
  }
};

export default WantsService;
