import axios from '../utils/Request';

const api = {
  ads: '/ads'
};

export default {
  getItemsList(position, callback) {
    axios.get(api.ads + "/positions/" + position + "/items").then(res => {
      callback(res);
    })
  }
};
