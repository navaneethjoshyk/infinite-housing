import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/Icons'
import client from '../api/client'

export default function LicenseCheckpoint() {
  const navigate = useNavigate()
  const [licenceNo, setLicenceNo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    if (!licenceNo.trim()) {
      setError('Please enter your licence number')
      return
    }
    try {
      setLoading(true)
      setError('')
      await client.post('/licenses/verify', { licenceNo })
      navigate('/licence-card')
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Check your licence number.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 pt-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-600 text-sm mb-6">
        <ChevronLeftIcon /> Back
      </button>

      <h1 className="text-2xl font-bold text-black mb-2">License Checkpoint</h1>
      <p className="text-sm text-gray-500 mb-12">
        Quickly verify your license status.{'\n'}
        Let's keep your sustainable building journey on track!
      </p>

      <div className="flex-1">
        <p className="text-sm font-medium text-black mb-3">Enter the Licence no.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <input
          value={licenceNo}
          onChange={(e) => setLicenceNo(e.target.value)}
          placeholder="Enter your Licence no"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-300"
        />
      </div>

      <div className="flex gap-3 pb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 bg-gray-200 rounded-full text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          disabled={loading}
          className="flex-1 py-4 bg-gray-300 rounded-full text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
