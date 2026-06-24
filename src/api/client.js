/*
  api/client.js — Axios HTTP Client

  WHY a dedicated file?
  If you write axios.get('http://localhost:5000/api/auth/login') in every
  component, and the URL ever changes (e.g., you deploy), you'd need to
  update it in 20 places. Instead, we configure axios ONCE here.

  What this does:
  1. Sets the base URL — all requests automatically prefix with /api
  2. Adds an interceptor — automatically attaches the JWT token to every
     request header so the backend knows who you are.
     Instead of manually adding Authorization: Bearer <token> every time,
     the interceptor does it behind the scenes.
*/

import axios from 'axios'

const client = axios.create({
  baseURL: '/api',          // Vite proxy forwards /api → http://localhost:5000
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: runs before every request
// Reads the token from localStorage and attaches it
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('ih_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: runs after every response
// If the server returns 401 (Unauthorized), auto-logout
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ih_user')
      localStorage.removeItem('ih_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default client
