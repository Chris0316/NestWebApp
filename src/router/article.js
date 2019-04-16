import ArticleSubject from '@/views/article/Subject'
import ArticleDetails from '@/views/article/Details'

export default [
  { path: '/articles/:type', name: 'ArticleSubject', component: ArticleSubject, meta: { slideLevel: 1 } },
  { path: '/article/:id', name: 'ArticleDetails', component: ArticleDetails, meta: { slideLevel: 1 } }
]
