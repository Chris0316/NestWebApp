import axios from '../utils/Request';

const api = {
  house: '/houses'
};

let HouseService = {
  publish(houseObj, callback) {
    axios.post(api.house, houseObj).then(res => {
      callback(res);
    });
  },
  getList(params, callback, loading) {
    axios.get(api.house, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    });
  },
  getDetailsById(id, callback) {
    axios.get(api.house + '/' + id).then(res => {
      callback(res);
    })
  }
};

export default HouseService;
