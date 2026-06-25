import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import client from '../api/client'

const types = [
  { id: 'manufacturers', label: 'Manufacturers', bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', full: true },
  { id: 'developers',    label: 'Developers',    bg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', full: false },
  { id: 'architects',    label: 'Architects',    bg: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400', full: false },
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
    } catch { navigate('/dashboard') }
    finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-6 max-w-lg mx-auto w-full">
      <BackButton />
      <h1 className="text-3xl font-bold text-black mb-6">Choose your path</h1>

      <div className="flex flex-col gap-3 flex-1">
        {/* Manufacturers — full width */}
        <button
          onClick={() => setSelected('manufacturers')}
          className="w-full rounded-2xl overflow-hidden relative h-44"
          style={{ outline: selected === 'manufacturers' ? '2.5px solid #C4883A' : 'none' }}
        >
          <div
            className="w-full h-full"
            style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("${types[0].bg}") center/cover` }}
          />
          <span className="absolute bottom-3 left-4 text-white font-medium text-sm">Manufacturers</span>
        </button>

        {/* Developers + Architects */}
        <div className="flex gap-3">
          {types.slice(1).map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className="flex-1 rounded-2xl overflow-hidden relative h-44"
              style={{ outline: selected === t.id ? '2.5px solid #C4883A' : 'none' }}
            >
              <div
                className="w-full h-full"
                style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("${t.bg}") center/cover` }}
              />
              <span className="absolute bottom-3 left-3 text-white font-medium text-sm">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="py-8">
        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          className="btn-brand w-full py-4 text-white font-medium disabled:opacity-40"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
