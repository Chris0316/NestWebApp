import My from '@/views/My'
import MyLives from '@/views/my/Lives'
import MyProfile from '@/views/my/Profile'
import MyEdit from '@/views/my/Edit'
import Message from '@/views/my/Message'
import MsgDetail from '@/views/my/MsgDetail'
import MyHouses from '@/views/my/Houses'

export default [
  { path: '/my', name: 'My', component: My, meta: { slideLevel: 1 } },
  { path: '/my/lives', name: 'MyLives', component: MyLives, meta: { slideLevel: 1 } },
  { path: '/my/profile', name: 'MyProfile', component: MyProfile, meta: { slideLevel: 1 } },
  { path: '/my/edit', name: 'MyEdit', component: MyEdit, meta: { slideLevel: 1 } },
  { path: '/my/message', name: 'MyMessage', component: Message, meta: { slideLevel: 1 } },
  { path: '/my/message/detail', name: 'MyMessageDetail', component: MsgDetail, meta: { slideLevel: 1 } },
  { path: '/my/houses', name: 'MyHouses', component: MyHouses, meta: { slideLevel: 1 } },
]
