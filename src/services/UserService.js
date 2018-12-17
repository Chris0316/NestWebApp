import axios from '../utils/Request';

const api = {
  userInfo: '/user',
  agent:'/agents'
};

let UserService = {
  getUserInfo(callback) {
    axios.get(api.userInfo).then(res => {
      callback(res);
    })
  },
  updateUserInfo(userInfo, callback) {
    axios.patch(api.userInfo, userInfo).then(res => {
      callback(res);
    })
  },
  getAgentList(params,callback){
    axios.get(api.agent,{
      params:params
    }).then(res=>{
      callback(res)
    })
  }
};

export default UserService;
