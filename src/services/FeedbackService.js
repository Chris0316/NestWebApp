import axios from '../utils/Request';

const api = {
  feedbacks: '/feedbacks'
};

let FeedbackService = {
  doPost(feedback, callback) {
    axios.post(api.feedbacks, feedback).then(res => {
      callback(res);
    })
  }
};

export default FeedbackService;
