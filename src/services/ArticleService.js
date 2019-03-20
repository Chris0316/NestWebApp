import axios from '../utils/Request';

const api = {
  articles: '/articles'
};

let ArticleService = {
  getArticleList(params, callback) {
    axios.get(api.articles, {
      params: params
    }).then(res => {
      callback(res);
    })
  },
  getArticleDetails(articleId, callback) {
    axios.get(api.articles + '/' + articleId).then(res => {
      callback(res);
    })
  }
};

export default ArticleService;
