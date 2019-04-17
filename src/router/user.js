import UserDetails from '@/views/user/Details'

export default [
  { path: '/user/:id', name: 'UserDetails', component: UserDetails, props: true, meta: { slideLevel: 1 } }
]
