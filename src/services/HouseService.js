import axios from '../utils/Request';

const api = {
  publishRent: '/houses'
};

let HouseService = {
  publishRent(houseObj, callback) {
    axios.post(api.publishRent, houseObj).then(res => {
      callback(res);
    })
  }
};

export default HouseService;
