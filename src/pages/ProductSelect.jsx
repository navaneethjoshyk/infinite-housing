import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ImageIcon } from '../components/Icons'

const products = [
  { id: 'hempbase',   label: 'HempBase Panel' },
  { id: 'strawshield', label: 'Straw Shield Panel' },
]

export default function ProductSelect() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 pt-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-600 text-sm mb-8">
        <ChevronLeftIcon /> Back
      </button>

      <div className="flex-1 space-y-4">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`w-full rounded-2xl bg-gray-100 p-4 flex flex-col items-center justify-end min-h-[160px] transition-all ${
              selected === p.id ? 'ring-2 ring-black' : ''
            }`}
          >
            <ImageIcon className="w-10 h-10 text-gray-400 mb-6" />
            <span className="text-sm font-medium text-black self-start">{p.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3 pb-10 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 border border-gray-300 rounded-full text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => selected && navigate(`/products/${selected}`)}
          disabled={!selected}
          className="flex-1 py-4 bg-black text-white rounded-full text-sm font-medium disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
