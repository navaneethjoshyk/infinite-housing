import { useNavigate, useParams } from 'react-router-dom'
import { ImageIcon } from '../components/Icons'
import BackButton from '../components/BackButton'

export default function ProductOverview() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-center px-4 pt-6 pb-2 relative">
        <div className="absolute left-4">
          <BackButton />
        </div>
        <h2 className="text-base font-semibold">Product Overview</h2>
      </div>

      <div className="px-4 pb-28 overflow-y-auto">
        <div className="mt-4">
          <p className="font-bold text-sm mb-2">Getting started</p>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Infinite Housing began with a mission to transform the construction industry by
            introducing sustainable and eco-friendly building solutions. Our focus is on providing
            innovative materials that reduce environmental impact while maintaining structural
            integrity. By pioneering the use of products like hempcrete and straw/batten panels,
            we aim to build a greener, more sustainable future.
          </p>

          <p className="font-bold text-sm mb-2">Hemp Crete Panels</p>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Hempcrete is a natural, breathable building material made from hemp fibers and lime.
            It provides excellent insulation, is highly durable, and offers a low-carbon alternative
            to traditional construction materials. Hempcrete is ideal for eco-conscious builders
            looking to reduce their environmental footprint.
          </p>

          {/* Image placeholder */}
          <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center mb-4">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>

          <p className="font-bold text-sm mb-2">Why Choose HempCrete?</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            HempCrete reduces your carbon footprint while offering durable, high-performance
            insulation. It's perfect for eco-friendly projects, easy to work with, and adaptable
            to different climates. Build greener and stronger with HempCrete.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-gray-100 px-4 py-4 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3 border border-gray-300 rounded-full text-sm font-medium"
        >
          Come back later
        </button>
        <button
          onClick={() => navigate('/fill-form')}
          className="flex-1 py-3 bg-black text-white rounded-full text-sm font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
