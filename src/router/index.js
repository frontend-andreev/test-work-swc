import { createMemoryHistory, createRouter } from 'vue-router'


const routes = [
  { path: '/', name: 'Vechicles', component: () => import('@/views/Vechicles.vue')  },
  { path: '/setting', name: 'Setting', component: () => import('@/views/Setting.vue')  },
  { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue')  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router