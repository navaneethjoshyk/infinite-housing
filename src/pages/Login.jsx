/*
  Login.jsx

  Key concepts:
  - Controlled inputs: each input's value is stored in React state.
    onChange updates state on every keystroke. This is the React way —
    the UI always reflects state, not the other way around.
  - useState for form fields keeps the data in React's control so we
    can validate, show errors, or submit programmatically.
  - async/await: calling the API takes time (network). async/await
    lets us write async code that reads like synchronous code.
  - try/catch: if the API call fails, catch prevents a crash and
    shows the user an error message instead.
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoogleIcon, FacebookIcon, AppleIcon, ImageIcon } from '../components/Icons'
import BackButton from '../components/BackButton'
import client from '../api/client'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Controlled form state
  const [form, setForm] = useState({ name: '', password: '' })
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Generic handler: updates whichever field changed
  // e.target.name matches the `name` attribute on the input
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async () => {
    if (!form.name || !form.password) {
      setError('Please fill in all fields')
      return
    }
    try {
      setLoading(true)
      setError('')
      const { data } = await client.post('/auth/login', form)
      login(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto w-full">
      <div className="px-4 pt-4">
        <BackButton />
      </div>

      {/* Logo placeholder */}
      <div className="flex justify-center mt-6 mb-2">
        <div className="w-20 h-20 border-2 border-gray-300 rounded-2xl flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-gray-400" />
        </div>
      </div>

      {/* Card form — matches the rounded card in your design */}
      <div className="mx-4 mt-4 bg-gray-100 rounded-3xl p-6 flex-1">
        <h1 className="text-2xl font-bold text-black mb-6">Welcome back</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Your full name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              Remember me
            </label>
            <button className="text-sm text-gray-800 underline">Forgot Password?</button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 py-4 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-xs text-gray-400">Sign up with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="flex justify-center gap-6">
          <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
            <GoogleIcon />
          </button>
          <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
            <FacebookIcon />
          </button>
          <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
            <AppleIcon />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="font-semibold text-black">
            Sign up
          </button>
        </p>
      </div>
      <div className="h-6" />
    </div>
  )
}
