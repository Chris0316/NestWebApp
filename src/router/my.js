import My from '@/views/My'
import MyLive from '@/views/my/Live'
import MyProfile from '@/views/my/Profile'
import MyEdit from '@/views/my/Edit'
import Message from '@/views/my/Message'
import MsgDetail from '@/views/my/MsgDetail'
import MyPublish from '@/views/my/Publish'

export default [
  { path: '/my', name: 'My', component: My, meta: { slideLevel: 1 } },
  { path: '/my/live', name: 'MyLive', component: MyLive, meta: { slideLevel: 1 } },
  { path: '/my/profile', name: 'MyProfile', component: MyProfile, meta: { slideLevel: 1 } },
  { path: '/my/edit', name: 'MyEdit', component: MyEdit, meta: { slideLevel: 1 } },
  { path: '/my/message', name: 'MyMessage', component: Message, meta: { slideLevel: 1 } },
  { path: '/my/message/detail', name: 'MyMessageDetail', component: MsgDetail, meta: { slideLevel: 1 } },
  { path: '/my/publish', name: 'MyPublish', component: MyPublish, meta: { slideLevel: 1 } },
]
