import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'

export default function ProductOverview() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto w-full">
      <div className="px-5 pt-6 pb-28 overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <BackButton className="mb-0" />
          <span className="text-base font-semibold text-black">Product Overview</span>
        </div>

        <p className="font-bold text-black mb-2">Hemp Crete Panels</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          Hempcrete is a natural, breathable building material made from hemp fibers and lime. It provides excellent insulation, is highly durable, and offers a low-carbon alternative to traditional construction materials. Hempcrete is ideal for eco-conscious builders looking to reduce their environmental footprint.
        </p>

        <div className="rounded-2xl overflow-hidden mb-5 h-52 bg-gray-200">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" alt="Hemp Crete" className="w-full h-full object-cover" />
        </div>

        <p className="font-bold text-black mb-2">Why Choose HempCrete?</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          HempCrete reduces your carbon footprint while offering durable, high-performance insulation. It's perfect for eco-friendly projects, easy to work with, and adaptable to different climates. Build greener and stronger with HempCrete.
        </p>

        <p className="text-sm text-gray-500">Click on Get License to proceed to next stage</p>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-gray-100 px-5 py-4 flex gap-3">
        <button onClick={() => navigate(-1)} className="btn-outline flex-1 py-3 text-sm">Not now</button>
        <button onClick={() => navigate('/fill-form')} className="btn-brand flex-1 py-3 text-white text-sm">Get License</button>
      </div>
    </div>
  )
}
