import axios from '../utils/Request';

const api = {
  notifications: '/user/notifications'
};

let NotificationService = {
  getNotifications(callback) {
    axios.get(api.notifications).then(res => {
      callback(res);
    })
  }
};

export default NotificationService;
