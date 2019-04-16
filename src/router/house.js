import HouseSearch from '@/views/house/Search'
import HouseList from '@/views/house/List'
import HouseDetails from '@/views/house/Details'
import HousePublish from '@/views/house/Publish'

export default [
  { path: '/house/search', name: 'HouseSearch', component: HouseSearch, meta: { slideLevel: 1 } },
  { path: '/houses/:type', name: 'HouseList', component: HouseList, meta: { slideLevel: 1 } },
  { path: '/house/:id', name: 'HouseDetails', component: HouseDetails, meta: { slideLevel: 1 } },
  { path: '/house/publish/:trade/:id', name: 'HousePublish', component: HousePublish, meta: { slideLevel: 1, requireAuth: true } }
]
