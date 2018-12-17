import axios from '../utils/Request';

const api = {
  house: '/houses',
  agent:'/agents'
};

let HouseService = {
  publish(houseObj, callback) {
    axios.post(api.house, houseObj).then(res => {
      callback(res);
    });
  },
  getHomeList(params, callback) {
    axios.get(api.house, {
      params: params
    }).then(res => {
      callback(res);
    });
  },
  getAgentList(params,callback){
    axios.get(api.agent,{
      params:params
    }).then(res=>{
      callback(res)
    })
  }
};

export default HouseService;
