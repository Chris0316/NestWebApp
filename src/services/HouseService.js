import axios from '../utils/Request';

const api = {
  house: '/houses',
  house_same: '/house/same'
};

let HouseService = {
  publish(houseObj, callback) {
    axios.post(api.house, houseObj).then(res => {
      callback(res);
    });
  },
  updateById(houseId, houseObj, callback) {
    axios.patch(api.house + '/' + houseId, houseObj).then(res => {
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
  getDetailsById(houseId, callback) {
    axios.get(api.house + '/' + houseId).then(res => {
      callback(res);
    });
  },
  deleteById(houseId, callback) {
    axios.delete(api.house + '/' + houseId).then(res => {
      callback(res);
    });
  },
  getSameHouse(params, callback, loading) {
    axios.get(api.house_same, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    });
  }
};

export default HouseService;
