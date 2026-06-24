import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ImageIcon } from '../components/Icons'
import BackButton from '../components/BackButton'

export default function LicenceCard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 pt-6">
      <BackButton />

      <h1 className="text-2xl font-bold text-black mb-8">Licence</h1>

      {/* Licence Card — the gray card in your design */}
      <div className="bg-gray-200 rounded-2xl p-5 flex justify-between items-start mb-6">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-sm font-semibold text-black uppercase">
              {user?.name || 'JHON DOE'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Licence No.</p>
            <p className="text-sm font-semibold text-black">N1234567890</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-gray-500">Good thru MM/YY</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Good thru MM/YY</p>
            </div>
          </div>
        </div>

        {/* Photo placeholder */}
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Terms and conditions checkbox */}
      <label className="flex items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-5 h-5 rounded"
        />
        Terms and conditions
      </label>

      <div className="flex-1" />

      <div className="flex gap-3 pb-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex-1 py-4 border border-gray-300 rounded-full text-sm font-medium"
        >
          Cancel
        </button>
        <button
          disabled={!agreed}
          onClick={() => navigate('/dashboard')}
          className="flex-1 py-4 bg-black text-white rounded-full text-sm font-medium disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
