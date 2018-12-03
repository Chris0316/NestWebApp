import axios from '../utils/Request';

// const base_api = 'http://api.ohmynest.com/api';
const api = {
  getSms: '/captchas/sms',
  smsLogin: '/users/sms/login'
};

let AuthService = {
  getSms(phonePrefix, phone, callback) {
    axios.post(api.getSms, {
      phone_prefix: phonePrefix,
      phone: phone
    }).then(res => {
      callback(res);
    })
  },
  smsLogin(phonePrefix, phone, sms, key, callback) {
    axios.post(api.smsLogin, {
      phone_prefix: phonePrefix,
      phone: phone,
      code: sms,
      key: key
    }).then(res => {
      callback(res);
    })
  }
};

export default AuthService;
