import Follow from '@/views/Follow'
import FollowList from '@/views/follow/List'
import FollowAgent from '@/views/follow/Agent'
export default [
  { path: '/follow', name: 'Follow', component: Follow, meta: { slideLevel: 1 } },
  { path: '/follow/list', name: 'FollowList', component: FollowList, meta: { slideLevel: 1 } },
  { path: '/follow/agent/:id', name: 'FollowAgent', component: FollowAgent, meta: { slideLevel: 1 } }
]
