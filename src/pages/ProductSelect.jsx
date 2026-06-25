import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'

const products = [
  { id: 'hempbase',    label: 'HempBase Panel',     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { id: 'strawshield', label: 'Straw Shield Panel',  image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600' },
]

export default function ProductSelect() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-6 max-w-lg mx-auto w-full">
      <BackButton />

      <h1 className="text-3xl font-bold text-black mb-1">Shape the future<br />with choice.</h1>
      <p className="text-sm font-semibold text-gray-700 mb-6">Pick a material to continue...</p>

      <div className="flex flex-col gap-4 flex-1">
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className="relative rounded-2xl overflow-hidden h-44 text-left w-full"
            style={{ outline: selected === p.id ? '2.5px solid #C4883A' : 'none' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%), url("${p.image}") center/cover` }}
            />
            <span className="absolute bottom-3 left-4 text-white font-medium text-sm">{p.label}</span>
          </button>
        ))}
      </div>

      <div className="py-8">
        <button
          onClick={() => selected && navigate(`/products/${selected}`)}
          disabled={!selected}
          className="btn-brand w-full py-4 text-white font-medium disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
