import { createWebHistory, createRouter } from "vue-router"

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
        path: 'luminance/org',
        component:() => import('@/views/SabianLuminanceOrg.vue')
      },
      {
        name: 'sabian_luminance_org_flatten_contrast',
        path: 'luminance/org/flatten_contrast',
        component:() => import('@/views/SabianLuminanceFlattenContrast.vue')
      },

    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
