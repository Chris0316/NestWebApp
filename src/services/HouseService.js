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
  getList(params, callback) {
    axios.get(api.house, {
      params: params
    }).then(res => {
      callback(res);
    });
  }
};

export default HouseService;
