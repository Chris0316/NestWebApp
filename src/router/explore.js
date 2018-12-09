import Explore from '@/views/Explore'
import List from '@/views/explore/List'
import Details from '@/views/explore/Details'
import Publish from '@/views/explore/Publish'

export default [
  { path: '/explore', name: 'Explore', component: Explore, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/explore/list/:type', name: 'ExploreList', component: List, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/explore/details/:type/:id', name: 'ExploreDetails', component: Details, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/explore/publish/:type', name: 'ExplorePublish', component: Publish, meta: { keepAlive: false, slideLevel: 1 } }
]
