// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/Drawer.vue'),
    children: [
      {
        path: 'users',

        component: () => import('@/views/Users.vue'),
      },
      {
        path: 'i18n',
        component: () => import('@/views/i18n.vue'),
      },
      {
        path: 'app-config',
        component: () => import('@/views/AppConfigList.vue'),
      },
      {
        path: 'labels',
        component: () => import('@/views/Labels.vue'),
      },
      {
        path: 'airports',
        component: () => import('@/views/Airports.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
