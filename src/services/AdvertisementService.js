import axios from '../utils/Request';

const api = {
  banner: '/banner'
};

export default {
  getItemsList(position, callback) {
    axios.get(api.banner + "/positions/" + position + "/items").then(res => {
      callback(res);
    })
  }
};
