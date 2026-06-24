/*
  ModuleDetail.jsx

  WHY useParams()?
  The route is /modules/:id — the :id is a URL parameter.
  useParams() extracts it: { id: '1' }.
  Then we fetch /api/modules/1 to get that specific module's data.

  This pattern (dynamic routes + useParams) is how you build
  detail pages: /products/42, /users/profile, /articles/slug, etc.
*/

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/Icons'
import client from '../api/client'

const MOCK = {
  title: 'Module 1',
  courseTag: 'COURSE',
  courseName: 'Hemp Crete Panels',
  description: `HempCrete panels are at the forefront of eco-friendly construction, combining the strength of hemp fibers with the durability of lime. This innovative material offers outstanding thermal insulation, significantly reducing energy costs and promoting a comfortable indoor environment. Weighing less than traditional materials, HempCrete panels are easier to transport and install, making them a smart choice for builders. Additionally, HempCrete is naturally resistant to pests and mold, ensuring a safer and healthier living space. By opting for HempCrete, you're not only enhancing your building's performance but also supporting sustainable practices that help mitigate climate change.`,
  status: 'Completed',
  length: '1hr 30 min',
  passingGrade: '70%',
  skills: 'Lorem ipsum dolor sit',
}

export default function ModuleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [module, setModule] = useState(MOCK)

  useEffect(() => {
    client.get(`/modules/${id}`).then(({ data }) => setModule(data)).catch(() => {})
  }, [id])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-center px-4 pt-6 pb-2 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 text-gray-600"
        >
          <ChevronLeftIcon />
        </button>
        <h2 className="text-base font-semibold text-black">{module.title}</h2>
      </div>

      <div className="px-4 pb-28 overflow-y-auto">
        {/* Course info */}
        <p className="text-xs text-gray-400 font-semibold mt-4 uppercase">{module.courseTag}</p>
        <p className="font-bold text-black text-sm mb-2">{module.courseName}</p>
        <p className="text-xs text-gray-600 leading-relaxed mb-4">{module.description}</p>

        {/* Video placeholder */}
        <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/>
            <polyline points="21 15 16 10 5 21" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Course overview */}
        <h3 className="font-bold text-black mb-3">Course overview</h3>
        <div className="grid grid-cols-2 gap-y-3 text-sm mb-6">
          <div>
            <span className="font-semibold">Status:</span>{' '}
            <span className="text-gray-600">{module.status}</span>
          </div>
          <div>
            <span className="font-semibold">Course length:</span>{' '}
            <span className="text-gray-600">{module.length}</span>
          </div>
          <div>
            <span className="font-semibold">Passing grade:</span>{' '}
            <span className="text-gray-600">{module.passingGrade}</span>
          </div>
          <div>
            <span className="font-semibold">Skills:</span>{' '}
            <span className="text-gray-600">{module.skills}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6">Complete the entire video to unlock the quiz</p>
      </div>

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-gray-100 px-4 py-4 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50"
        >
          Come back later
        </button>
        <button className="flex-1 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800">
          Watch video
        </button>
      </div>
    </div>
  )
}
