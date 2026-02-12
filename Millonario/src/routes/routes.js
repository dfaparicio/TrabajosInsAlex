import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/inicio.vue') },

  { path: '/juego', component: () => import('../components/juego.vue') },

  { path: '/instrucciones', component: () => import('../components/instrucciones.vue') }
]


export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
