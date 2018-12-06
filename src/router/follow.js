import Follow from '@/views/Follow'
import List from '@/views/follow/List'
import Agent from '@/views/follow/Agent'
export default [
  { path: '/follow', name: 'Follow', component: Follow, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/follow/list', name: 'List', component: List, meta: { keepAlive: false, slideLevel: 1 } },
  { path: '/follow/agent/:id', name: 'Agent', component: Agent, meta: { keepAlive: false, slideLevel: 1 } }
]
