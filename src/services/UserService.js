import axios from '../utils/Request';

const api = {
  userInfo: '/user'
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
  }
};

export default UserService;
