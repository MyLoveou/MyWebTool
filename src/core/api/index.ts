import apiClient from './client'

export const getAuthors = () => apiClient.get('/authors/')
export const getAuthorByName = (name: string) => apiClient.get(`/authors/${name}/`)

export const getNovels = () => apiClient.get('/novels/')
export const getNovelByName = (name: string) => apiClient.get(`/novels/${name}/`)

export const getSoftware = () => apiClient.get('/software/')
export const getSoftwareByName = (name: string) => apiClient.get(`/software/${name}/`)

export const getQuickLinks = () => apiClient.get('/quick-links/')
export const getQuickLinkByName = (name: string) => apiClient.get(`/quick-links/${name}/`)
