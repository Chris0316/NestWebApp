import axios from '../utils/Request';
import Utils from "../utils/Utils";

const api = {
  house: '/houses',
  house_same: '/house/same',
  house_update: '/houses/:house_id/status',
  myHouses: '/user/houses',
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
  },
  updateMyHouseStatus(houseId, status, callback) {
    let keyValueArray = [{
      key: 'house_id',
      value: houseId
    }];
    let this_api = Utils.replaceApiPlaceholder(api.house_update, keyValueArray);
    axios.put(this_api, {
      status: status,
      loading: false
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

export default HouseService;
