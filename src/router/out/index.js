import Login from '@/views/Login'
import Error from '@/views/Error'
import Transform from '@/views/Transform'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/transform',
    name: 'transform',
    component: Transform
  },
  { path: '*', name: '404', component: Error, hidden: true }
]
