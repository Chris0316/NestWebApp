import axios from '../utils/Request';

const api = {
  advertisement: '/advertisement'
};

export function getItemsList(postion, callback){
  axios.get(api.advertisement + "/positions/" + postion + "/items").then(res => {
    callback(res);
  })
}
