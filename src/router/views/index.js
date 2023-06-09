import Layout from '@/views/layout/Layout'

export default function (routes = []) {
  return [
    {
      path: '/',
      name: 'Layout',
      redirect: { name: 'Main' },
      component: Layout,
      children: [
        {
          path: '/main',
          name: 'Main',
          // props: {
          //   paths: {
          //     query: '/data/page/menu/header-menu.model.json'
          //   }
          // },
          component: () => import('@/views/main/main.component'),
          // component: async () => {
          //   const mark = await LoadJs('http://127.0.0.1:8088/js/mark-list.umd.js')
          //   // Vue.use(mark.default)
          //   console.log(mark.default)
          //   // const key = Object.keys(mark.default.default)
          //   // if (key.includes("render")) {
          //   //   return mark.default.default
          //   // } else {
          //   //   return mark.default.default[1]
          //   // }
          //   return mark.default.default
          // }, // import('@/views/main/main.component'), // Sys_loadJs('http://127.0.0.1:8088/js/mark-list.umd.js'), //
          meta: {
            auth: true
          }
        },
        ...routes
      ]
    }
  ]
}
