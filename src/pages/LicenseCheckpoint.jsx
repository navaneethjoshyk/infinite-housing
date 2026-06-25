import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import client from '../api/client'

export default function LicenseCheckpoint() {
  const navigate = useNavigate()
  const [licenceNo, setLicenceNo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    if (!licenceNo.trim()) { setError('Please enter your licence number'); return }
    try {
      setLoading(true); setError('')
      await client.post('/licenses/verify', { licenceNo })
      navigate('/licence-card')
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Check your licence number.')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-6 max-w-lg mx-auto w-full">
      <BackButton />

      <h1 className="text-3xl font-bold text-black mb-2">License Checkpoint</h1>
      <p className="text-sm text-gray-500 mb-10">
        Quickly confirm your license status and advance to next steps in training.
      </p>

      <div className="flex-1">
        <p className="text-sm font-medium text-black mb-3">Enter the Licence no.</p>
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4">{error}</div>}
        <input
          value={licenceNo}
          onChange={e => setLicenceNo(e.target.value)}
          placeholder="Enter your Licence no"
          className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-[#C4883A] placeholder-gray-300"
        />
      </div>

      <div className="flex gap-3 pb-10">
        <button onClick={() => navigate(-1)} className="btn-outline flex-1 py-4 text-sm">Cancel</button>
        <button onClick={handleContinue} disabled={loading} className="btn-brand flex-1 py-4 text-white text-sm disabled:opacity-50">
          {loading ? 'Verifying...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
