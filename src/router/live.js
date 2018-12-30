import Live from '@/views/Live'
import LivePublish from '@/views/live/Publish'
import LiveSubject from '@/views/live/Subject'
import LiveGround from '@/views/live/Ground'
import LiveDetails from '@/views/live/Details'

export default [
  { path: '/live', name: 'Live', component: Live, meta: { slideLevel: 1 } },
  { path: '/live/publish', name: 'LivePublish', component: LivePublish, meta: { slideLevel: 1 } },
  { path: '/live/subject', name: 'LiveSubject', component: LiveSubject, meta: { slideLevel: 1 } },
  { path: '/live/ground', name: 'LiveGround', component: LiveGround, meta: { slideLevel: 1 } },
  { path: '/live/details/:id', name: 'LiveDetails', component: LiveDetails, meta: { slideLevel: 1 } }
]
