/*
  SelectUserType.jsx

  WHY store userType?
  Different user types (Manufacturer / Developer / Architect) may see
  different content in the app. We save their choice to the backend
  so it persists across devices.

  The "selected" state drives the visual highlighting —
  when you click a card, it sets selected = 'Manufacturers',
  and the card's className conditionally adds a border highlight.
  This is conditional className, a very common React pattern.
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageIcon } from '../components/Icons'
import BackButton from '../components/BackButton'
import client from '../api/client'

const userTypes = [
  { id: 'manufacturers', label: 'Manufacturers', size: 'full' },
  { id: 'developers',    label: 'Developers',    size: 'half' },
  { id: 'architects',    label: 'Architects',    size: 'half' },
]

export default function SelectUserType() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    if (!selected) return
    try {
      setLoading(true)
      await client.patch('/users/me', { userType: selected })
      navigate('/dashboard')
    } catch {
      navigate('/dashboard') // fallback even if update fails
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 pt-6">
      <BackButton />
      <h1 className="text-2xl font-bold text-black mb-6">Select user type</h1>

      <div className="flex flex-col gap-4 flex-1">
        {/* Manufacturers — full width card */}
        <button
          onClick={() => setSelected('manufacturers')}
          className={`w-full rounded-2xl bg-gray-100 p-6 flex flex-col items-center justify-end min-h-[160px] transition-all ${
            selected === 'manufacturers' ? 'ring-2 ring-black' : ''
          }`}
        >
          <ImageIcon className="w-10 h-10 text-gray-400 mb-6" />
          <span className="text-sm font-medium text-black self-start">Manufacturers</span>
        </button>

        {/* Developers + Architects — side by side */}
        <div className="flex gap-4">
          {['developers', 'architects'].map((type) => (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={`flex-1 rounded-2xl bg-gray-100 p-4 flex flex-col items-center justify-end min-h-[140px] transition-all ${
                selected === type ? 'ring-2 ring-black' : ''
              }`}
            >
              <ImageIcon className="w-8 h-8 text-gray-400 mb-4" />
              <span className="text-sm font-medium text-black self-start capitalize">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue button — amber/brown color from your design */}
      <div className="pb-10 pt-6">
        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          className="w-full py-4 rounded-full bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors disabled:opacity-40"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
