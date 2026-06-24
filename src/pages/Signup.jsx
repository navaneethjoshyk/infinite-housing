/*
  Signup.jsx

  After signup, we navigate to /select-user-type so users can
  pick Manufacturer / Developer / Architect before going to dashboard.
  This matches your design flow.
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoogleIcon, FacebookIcon } from '../components/Icons'
import BackButton from '../components/BackButton'
import client from '../api/client'

export default function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    if (!agreed) {
      setError('Please agree to use your personal info')
      return
    }
    try {
      setLoading(true)
      setError('')
      const { data } = await client.post('/auth/signup', form)
      login(data.user, data.token)
      navigate('/select-user-type')  // Next step in onboarding flow
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto w-full">
      <div className="px-4 pt-4">
        <BackButton />
      </div>

      {/* Pink/warm background card — matches your design */}
      <div className="mx-4 mt-4 bg-rose-50 rounded-3xl p-6 flex-1">
        <h1 className="text-2xl font-bold text-black mb-6">Get started</h1>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter the password"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            I agree to use my personal info
          </label>
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full mt-6 py-4 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Log in'}
        </button>

        <button className="w-full mt-3 py-4 bg-gray-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-500 transition-colors">
          <GoogleIcon /> Sign up with Google
        </button>

        <button className="w-full mt-3 py-4 bg-gray-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-500 transition-colors">
          <FacebookIcon /> Sign up with Facebook
        </button>

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
