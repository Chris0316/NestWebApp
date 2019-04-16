import Explore from '@/views/Explore'
import Follow from '@/views/Follow'
import Live from '@/views/Live'
import My from '@/views/My'
import ContactUs from '@/views/ContactUs'
import Feedback from '@/views/Feedback'
import Map from '@/views/Map'
import Cellphone from '@/views/Cellphone'
import AddCellphone from '@/views/AddCellphone'

export default [
  { path: '/explore', name: 'Explore', component: Explore, meta: { slideLevel: 1 } },
  { path: '/follow', name: 'Follow', component: Follow, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/live', name: 'Live', component: Live, meta: { slideLevel: 1 } },
  { path: '/my', name: 'My', component: My, meta: { slideLevel: 1 } },
  { path: '/contact', name: 'ContactUs', component: ContactUs, meta: { slideLevel: 1 } },
  { path: '/feedback', name: 'Feedback', component: Feedback, meta: { slideLevel: 1 } },
  { path: '/map', name: 'Map', component: Map, meta: { slideLevel: 1 } },
  { path: '/cellphone', name: 'Cellphone', component: Cellphone, meta: { slideLevel: 1 } },
  { path: '/cellphone/add', name: 'AddCellphone', component: AddCellphone, meta: { slideLevel: 1 } },
]
