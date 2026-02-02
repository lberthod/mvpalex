import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import IntakePage from '../pages/IntakePage.vue'
import ResultPage from '../pages/ResultPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/intake',
    name: 'intake',
    component: IntakePage
  },
  {
    path: '/result/:sessionId',
    name: 'result',
    component: ResultPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
