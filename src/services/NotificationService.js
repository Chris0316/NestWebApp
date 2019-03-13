import axios from '../utils/Request';

const api = {
  notifications: '/user/notifications'
};

let NotificationService = {
  getNotifications(params, callback, loading) {
    axios.get(api.notifications, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    })
  }
};

export default NotificationService;
