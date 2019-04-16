import UserDetails from '@/views/user/Details'

export default [
  { path: '/user/:id', name: 'UserDetails', component: UserDetails, meta: { slideLevel: 1 } }
]
