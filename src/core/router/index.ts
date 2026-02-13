import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/core/components/AppLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { title: '首页' }
        },
        {
          path: 'admin',
          name: 'Admin',
          component: () => import('@/views/Admin.vue'),
          meta: { title: '管理后台' }
        },
        {
          path: 'tools/:id',
          name: 'ToolContainer',
          component: () => import('@/core/components/ToolContainer.vue'),
          meta: { title: '工具' }
        },
        {
          path: 'tools/:id/detail/:itemId',
          name: 'ToolDetailContainer',
          component: () => import('@/core/components/ToolDetailContainer.vue'),
          meta: { title: '详情' }
        }
      ]
    }
  ]
})

export default router
