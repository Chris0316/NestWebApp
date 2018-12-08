import Follow from '@/views/Follow'
import FollowList from '@/views/follow/List'
import FollowAgent from '@/views/follow/Agent'
export default [
  { path: '/follow', name: 'Follow', component: Follow, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/follow/list', name: 'FollowList', component: FollowList, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/follow/agent/:id', name: 'FollowAgent', component: FollowAgent, meta: { keepAlive: false, slideLevel: 1 } }
]
