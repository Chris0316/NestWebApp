import axios from '../utils/Request';

const api = {
  advertisement: '/advertisement'
};

export default {
  getItemsList(position, callback) {
    axios.get(api.advertisement + "/positions/" + position + "/items").then(res => {
      callback(res);
    })
  }
};
