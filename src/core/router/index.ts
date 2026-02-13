import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import { useAuthStore } from '@/core/store/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/core/components/AppLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { title: '管理员登录' }
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
        meta: { title: '管理后台', requiresAuth: true }
      },
      {
        path: 'admin/create/:resource',
        name: 'AdminCreate',
        component: () => import('@/views/AdminEditor.vue'),
        meta: { title: '新增资源', requiresAuth: true }
      },
      {
        path: 'admin/edit/:resource/:id',
        name: 'AdminEdit',
        component: () => import('@/views/AdminEditor.vue'),
        meta: { title: '编辑资源', requiresAuth: true }
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
