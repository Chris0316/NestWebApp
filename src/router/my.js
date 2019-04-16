import MyWants from '@/views/my/Wants'
import MyProfile from '@/views/my/Profile'
import MyEdit from '@/views/my/Edit'
import Messages from '@/views/my/Messages'
import MsgDetail from '@/views/my/MsgDetail'
import MyHouses from '@/views/my/Houses'

export default [
  { path: '/my/wants', name: 'MyWants', component: MyWants, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/my/profile', name: 'MyProfile', component: MyProfile, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/my/profile/edit', name: 'MyEdit', component: MyEdit, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/my/messages', name: 'MyMessages', component: Messages, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/my/message/:id', name: 'MyMessageDetail', component: MsgDetail, meta: { slideLevel: 1, requireAuth: true } },
  { path: '/my/houses', name: 'MyHouses', component: MyHouses, meta: { slideLevel: 1, requireAuth: true } },
]
