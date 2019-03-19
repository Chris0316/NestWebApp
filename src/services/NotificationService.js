import axios from '../utils/Request';
import Utils from "../utils/Utils";

const api = {
  notifications: '/user/notifications',
  details: '/user/notifications/:notify_id'
};

let NotificationService = {
  getNotifications(params, callback, loading) {
    axios.get(api.notifications, {
      params: params,
      loading: loading
    }).then(res => {
      callback(res);
    })
  },
  getNotificationDetails(notify_id, callback) {
    let keyValueArray = [{
      key: 'notify_id',
      value: notify_id
    }];
    let this_api = Utils.replaceApiPlaceholder(api.details, keyValueArray);
    axios.get(this_api).then(res => {
      callback(res);
    })
  }
};

export default NotificationService;
