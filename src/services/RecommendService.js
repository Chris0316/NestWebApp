import axios from '../utils/Request';

const api = {
  houses: '/house/recommends'
};

export function getHouseList(type, callback) {
  let url = type ? api.houses + "?trade=" + type : api.house;
  axios.get(url).then(res => {
    callback(res);
  })
}

