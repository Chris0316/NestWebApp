import axios from '../utils/Request';

const api = {
  wants: '/wants'
};

let WantsService = {
  publish(wantsObj, callback) {
    axios.post(api.wants, wantsObj).then(res => {
      callback(res);
    });
  }
};

export default WantsService;
