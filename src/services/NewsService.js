import axios from '../utils/Request';

const api = {
  news: '/articles?category=news'
};

let NewsService = {
  getNewsList(callback) {
    axios.get(api.news).then(res => {
      callback(res);
    })
  }
};

export default NewsService;
