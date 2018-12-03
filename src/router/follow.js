import Follow from '@/views/Follow'
import FollowList from '@/views/follow/FollowList'
import EconomicMan from '@/views/follow/EconomicMan'
export default [
  { path: '/follow', name: 'Follow', component: Follow, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/follow/list', name: 'FollowList', component: FollowList, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/follow/economic', name: 'EconomicMan', component: EconomicMan, meta: { keepAlive: false, slideLevel: 1 } }
]
