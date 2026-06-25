import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoogleIcon, FacebookIcon } from '../components/Icons'
import BackButton from '../components/BackButton'
import { LogoIcon } from '../components/Logo'
import client from '../api/client'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleLogin = async () => {
    if (!form.name || !form.password) { setError('Please fill in all fields'); return }
    try {
      setLoading(true); setError('')
      const { data } = await client.post('/auth/login', { name: form.name, password: form.password })
      login(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto w-full px-6 pt-6">
      <BackButton />

      <div className="flex justify-center mb-6">
        <LogoIcon size={72} />
      </div>

      <h1 className="text-3xl font-bold text-black mb-1">Welcome back!</h1>
      <p className="text-gray-500 text-sm mb-6">Log in and start your licence journey now.</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4">{error}</div>}

      {/* Login only needs name + password */}
      <div className="bg-gray-100 rounded-2xl p-5 mb-4 space-y-3">
        {[
          { name: 'name',     label: 'Your full name', placeholder: 'Enter your name',    type: 'text'     },
          { name: 'password', label: 'Password',        placeholder: 'Enter the password', type: 'password' },
        ].map(f => (
          <div key={f.name} className="bg-white rounded-xl px-4 py-3">
            <label className="text-xs text-gray-400 block mb-1">{f.label}</label>
            <input
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="w-full text-sm outline-none text-gray-800 placeholder-gray-300 bg-transparent"
            />
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" className="w-4 h-4 accent-[#C4883A]" />
            Remember me
          </label>
          <button className="text-sm text-gray-500 underline">Forgot Password?</button>
        </div>
      </div>

      <button onClick={handleLogin} disabled={loading} className="btn-brand w-full py-4 text-white font-medium mb-3 disabled:opacity-50">
        {loading ? 'Logging in...' : 'Log in'}
      </button>

      <button className="w-full py-4 btn-brand text-white font-medium mb-3 flex items-center justify-center gap-2">
        <GoogleIcon className="w-5 h-5" /> Log in with Google
      </button>

      <button className="w-full py-4 btn-brand text-white font-medium mb-6 flex items-center justify-center gap-2">
        <FacebookIcon className="w-5 h-5" /> Log in with Facebook
      </button>

      <p className="text-center text-sm text-gray-500 pb-8">
        Don't have an account?{' '}
        <button onClick={() => navigate('/signup')} className="font-semibold text-black">Sign up</button>
      </p>
    </div>
  )
}
