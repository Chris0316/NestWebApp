import Live from '@/views/Live'
import LivePublish from '@/views/live/Publish'
import LiveGround from '@/views/live/Ground'
import LiveDetails from '@/views/live/Details'
import ArticleSubject from '@/views/article/Subject'
import ArticleDetails from '@/views/article/Details'

export default [
  { path: '/live', name: 'Live', component: Live, meta: { slideLevel: 1 } },
  { path: '/live/publish', name: 'LivePublish', component: LivePublish, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/live/ground', name: 'LiveGround', component: LiveGround, meta: { slideLevel: 1 } },
  { path: '/live/details/:id', name: 'LiveDetails', component: LiveDetails, meta: { slideLevel: 1 } },
  { path: '/article/subject/:type', name: 'ArticleSubject', component: ArticleSubject, meta: { slideLevel: 1 } },
  { path: '/article/details/:id', name: 'ArticleDetails', component: ArticleDetails, meta: { slideLevel: 1 } }
]
