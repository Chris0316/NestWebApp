import FollowSearch from '@/views/follow/Search'

export default [
  { path: '/follow/search', name: 'FollowSearch', component: FollowSearch, meta: { slideLevel: 1, requireAuth: true } },
]
