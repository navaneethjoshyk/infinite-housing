import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    title: 'HempCrete/Straw',
    subtitle: 'Eco-friendly material with excellent insulation and thermal mass.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    title: 'Eco-Homes',
    subtitle: 'Offering energy-efficient and sustainable living solutions.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
  },
  {
    title: 'Eco-Homes',
    subtitle: 'Offering energy-efficient and sustainable living solutions.',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
    else navigate('/login')
  }

  const slide = slides[current]

  return (
    <div
      className="flex flex-col min-h-screen px-6 relative transition-all duration-500"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 70%), url("${slide.image}") center/cover no-repeat`,
      }}
    >
      <div className="flex-1" />

      {/* Text content */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">{slide.title}</h1>
        <p className="text-white/80 text-sm leading-relaxed">
          <span className="font-bold text-white">{slide.subtitle[0]}</span>
          {slide.subtitle.slice(1)}
        </p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === current ? '24px' : '8px',
              background: i === current ? 'white' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center pb-12">
        <button onClick={() => navigate('/login')} className="text-white/80 text-sm font-medium">
          Skip
        </button>
        <button onClick={next} className="btn-brand px-10 py-3 text-white text-sm font-medium">
          Next
        </button>
      </div>
    </div>
  )
}
