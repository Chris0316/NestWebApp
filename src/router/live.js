import Live from '@/views/Live'
import LivePublish from '@/views/live/Publish'
import LiveSubject from '@/views/live/Subject'

export default [
  { path: '/live', name: 'Live', component: Live, meta: { slideLevel: 1 } },
  { path: '/live/publish', name: 'LivePublish', component: LivePublish, meta: { slideLevel: 1 } },
  { path: '/live/subject', name: 'LiveSubject', component: LiveSubject, meta: { slideLevel: 1 } }
]
