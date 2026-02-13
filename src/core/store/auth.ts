import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/core/api/client'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isAuthenticated = ref<boolean>(!!token.value)
  // Restore isAdmin state based on token existence (since currently only admin can login)
  const isAdmin = ref<boolean>(!!token.value) 

  const loginUser = async (credentials: any) => {
    try {
      const response = await login(credentials)
      const newToken = response.data.token
      token.value = newToken
      isAuthenticated.value = true
      isAdmin.value = true // Assume admin if login successful for now (as only admin has login)
      localStorage.setItem('auth_token', newToken)
      return true
    } catch (error) {
      console.error('Login failed', error)
      return false
    }
  }

  const logout = () => {
    token.value = null
    isAuthenticated.value = false
    isAdmin.value = false
    localStorage.removeItem('auth_token')
  }

  return {
    token,
    isAuthenticated,
    isAdmin,
    loginUser,
    logout
  }
})
