import WantPublish from '@/views/want/Publish'
import WantList from '@/views/want/List'
import WantDetails from '@/views/want/Details'

export default [
  { path: '/want/publish', name: 'WantPublish', component: WantPublish, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/wants', name: 'WantList', component: WantList, meta: { slideLevel: 1 } },
  { path: '/want/:id', name: 'WantDetails', component: WantDetails, props: true, meta: { slideLevel: 1 } }
]
