import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRightIcon } from '../components/Icons'
import BackButton from '../components/BackButton'
import client from '../api/client'

export default function FillForm() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    try {
      setLoading(true)
      await client.post('/licenses/apply', { phone })
      navigate('/license-checkpoint')
    } catch { navigate('/license-checkpoint') }
    finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-6 max-w-lg mx-auto w-full">
      <BackButton />

      <h1 className="text-3xl font-bold text-black mb-8">Almost Ready!</h1>

      <div className="flex-1 space-y-3">
        {/* Phone field */}
        <div className="relative border border-gray-300 rounded-xl px-4 pt-5 pb-3">
          <label className="absolute top-1.5 left-4 text-xs text-gray-400">Your Phone no</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Enter your Phone no"
            className="w-full text-sm outline-none text-gray-700 placeholder-gray-300 bg-transparent"
          />
        </div>

        {/* Services */}
        <button className="w-full border border-gray-300 rounded-xl px-4 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-700">Services</span>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </button>

        {/* Terms */}
        <label className="flex items-center gap-3 text-sm text-gray-700 pt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-5 h-5 accent-[#C4883A]"
          />
          Terms and conditions
        </label>
      </div>

      <div className="flex gap-3 pb-10 pt-6">
        <button onClick={() => navigate(-1)} className="btn-outline flex-1 py-4 text-sm">Cancel</button>
        <button onClick={handleContinue} disabled={loading} className="btn-brand flex-1 py-4 text-white text-sm disabled:opacity-50">
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
