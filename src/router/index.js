import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component:() => import('@/views/Home.vue'),
  },
  {
    path: '/sabian',
    component:() => import('@/views/Sabian.vue'),
    children: [
      {
        name: 'sabian_luminance_org',
        path: 'luminance/org/:px',
        component:() => import('@/views/SabianLuminanceOrg.vue')
      },
      {
        name: 'sabian_luminance_org_flatten_contrast',
        path: 'luminance/org/flatten_contrast/:px',
        component:() => import('@/views/SabianLuminanceFlattenContrast.vue')
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
