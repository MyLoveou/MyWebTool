import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export default apiClient

export const login = (data: any) => apiClient.post('/auth/login/', data)

export const getAuthors = () => apiClient.get('/authors/')
export const getNovels = () => apiClient.get('/novels/')
export const getSoftware = () => apiClient.get('/software/')
export const getQuickLinks = () => apiClient.get('/quick-links/')

// Generic CRUD
export const createResource = (resource: string, data: any) => apiClient.post(`/${resource}/`, data)
export const updateResource = (resource: string, id: number | string, data: any) => apiClient.put(`/${resource}/${id}/`, data)
export const deleteResource = (resource: string, id: number | string) => apiClient.delete(`/${resource}/${id}/`)
export const getResource = (resource: string) => apiClient.get(`/${resource}/`)

