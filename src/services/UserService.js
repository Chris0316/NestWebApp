import axios from '../utils/Request';
import Utils from "../utils/Utils";

const api = {
  user: '/user',
  agent: '/agents/:agent_id',
  favorites:'/user/favorites'
};

let UserService = {
  getUserInfo(callback) {
    axios.get(api.user).then(res => {
      callback(res);
    })
  },
  getAgentInfo(agentId, callback) {
    let keyValueArray = [{
      key: 'agent_id',
      value: agentId
    }];
    let this_api = Utils.replaceApiPlaceholder(api.agent, keyValueArray);
    axios.get(this_api).then(res => {
      callback(res);
    })
  },
  updateUserInfo(userInfo, callback) {
    axios.patch(api.user, userInfo).then(res => {
      callback(res);
    })
  }
};

export default UserService;
