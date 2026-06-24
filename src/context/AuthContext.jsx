/*
  AuthContext.jsx — Global Auth State

  THE PROBLEM it solves:
  Imagine you have 10 screens and ALL of them need to know "is the user
  logged in?" and "what is their name?". Without Context, you'd pass
  this as props from App → Dashboard → Header → Avatar — every level.
  That's called "prop drilling" and it's messy.

  THE SOLUTION — React Context:
  We create a "context" (a shared data store), wrap the whole app in it,
  and any component can just call useAuth() to get the data directly.
  No prop drilling needed.

  What we store:
  - user: the logged-in user object { name, email, role, ... }
  - token: the JWT (JSON Web Token) from our backend — proves identity
  - login() / logout(): functions to update state and localStorage
*/

import { createContext, useContext, useState, useEffect } from 'react'

// Step 1: Create the context (think of it as an empty box)
const AuthContext = createContext(null)

// Step 2: The Provider — wraps the app and fills the box with data
export function AuthProvider({ children }) {
  // Why localStorage?
  // When the user refreshes the page, useState resets to null.
  // localStorage persists across refreshes, so we pre-populate from there.
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ih_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('ih_token'))

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('ih_user', JSON.stringify(userData))
    localStorage.setItem('ih_token', authToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('ih_user')
    localStorage.removeItem('ih_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Step 3: Custom hook — makes consuming context one clean line
// Usage in any component: const { user, login, logout } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
