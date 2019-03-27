import Explore from '@/views/Explore'
import Search from '@/views/explore/Search'
import List from '@/views/explore/List'
import Details from '@/views/explore/Details'
import Publish from '@/views/explore/Publish'

export default [
  { path: '/explore', name: 'Explore', component: Explore, meta: { slideLevel: 1 } },
  { path: '/explore/search', name: 'ExploreSearch', component: Search, meta: { slideLevel: 1 } },
  { path: '/explore/list/:type', name: 'ExploreList', component: List, meta: { slideLevel: 1 } },
  { path: '/explore/details/:id', name: 'ExploreDetails', component: Details, meta: { slideLevel: 1 } },
  { path: '/explore/publish/:trade/:id', name: 'ExplorePublish', component: Publish, meta: { slideLevel: 1 } }
]
