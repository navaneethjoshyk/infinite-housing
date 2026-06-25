import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import client from '../api/client'

const MOCK = {
  title: 'Module 1',
  courseTag: 'COURSE',
  courseName: 'Introduction to Hempcrete',
  description: `HempCrete panels are at the forefront of eco-friendly construction, combining the strength of hemp fibers with the durability of lime. This innovative material offers outstanding thermal insulation, significantly reducing energy costs and promoting a comfortable indoor environment. Weighing less than traditional materials, HempCrete panels are easier to transport and install, making them a smart choice for builders. Additionally, HempCrete is naturally resistant to pests and mold, ensuring a safer and healthier living space.`,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  status: 'Completed',
  length: '1hr 30 min',
  passingGrade: '70%',
  skills: 'Lorem ipsum dolor sit',
}

export default function ModuleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mod, setMod] = useState(MOCK)

  useEffect(() => {
    client.get(`/modules/${id}`).then(({ data }) => setMod(data)).catch(() => {})
  }, [id])

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-2 relative">
        <BackButton className="mb-0 mr-4" />
        <h2 className="text-base font-semibold text-black">{mod.title}</h2>
      </div>

      <div className="px-4 pb-32 overflow-y-auto">
        <p className="text-xs text-gray-400 font-semibold mt-3 uppercase tracking-wide">{mod.courseTag}</p>
        <p className="font-bold text-black text-base mb-2">{mod.courseName}</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{mod.description}</p>

        {/* Video/image */}
        <div className="rounded-2xl overflow-hidden mb-5 h-52 bg-gray-200">
          {mod.image && <img src={mod.image} alt={mod.courseName} className="w-full h-full object-cover" />}
        </div>

        <h3 className="font-bold text-black text-base mb-3">Course overview</h3>
        <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
          <div><span className="font-semibold">Status:</span> <span className="text-gray-600">{mod.status}</span></div>
          <div><span className="font-semibold">Course length:</span> <span className="text-gray-600">{mod.length}</span></div>
          <div><span className="font-semibold">Passing grade:</span> <span className="text-gray-600">{mod.passingGrade}</span></div>
          <div><span className="font-semibold">Skills:</span> <span className="text-gray-600">{mod.skills}</span></div>
        </div>

        <p style={{ color: '#C4883A' }} className="text-xs mb-4">Complete the entire video to unlock the quiz</p>
      </div>

      {/* Bottom buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-gray-100 px-4 py-4 flex gap-3">
        <button onClick={() => navigate(-1)} className="btn-outline flex-1 py-3 text-sm">Not now</button>
        <button className="btn-brand flex-1 py-3 text-white text-sm">Watch video</button>
      </div>
    </div>
  )
}
