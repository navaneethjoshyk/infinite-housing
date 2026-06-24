/*
  Modules.jsx — Module List Screen

  WHY map() to render lists?
  In React, you never manually write 4 <div> cards for 4 modules.
  Instead, you store the data in an array and call .map() to turn
  each item into a JSX element. When data changes (e.g., from API),
  the list re-renders automatically.

  The key prop on each element is required by React — it helps React
  efficiently update the DOM by tracking which items changed.
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ImageIcon } from '../components/Icons'
import Layout from '../components/Layout'
import client from '../api/client'

// Fallback data while API loads
const MOCK_MODULES = [
  { _id: '1', title: 'Module 1', status: 'completed',  timeLeft: null },
  { _id: '2', title: 'Module 2', status: 'in_progress', timeLeft: '1hr 13min' },
  { _id: '3', title: 'Module 3', status: 'pending',    timeLeft: null },
  { _id: '4', title: 'Module 4', status: 'in_progress', timeLeft: '1hr 13min' },
]

function statusLabel(mod) {
  if (mod.status === 'completed')  return { text: 'Completed',           color: 'text-gray-500' }
  if (mod.status === 'in_progress') return { text: `Hour left:${mod.timeLeft}`, color: 'text-gray-500' }
  return { text: 'Pending', color: 'text-gray-400' }
}

export default function Modules() {
  const navigate = useNavigate()
  const [modules, setModules] = useState(MOCK_MODULES)

  useEffect(() => {
    client.get('/modules').then(({ data }) => {
      if (data?.length) setModules(data)
    }).catch(() => {})
  }, [])

  return (
    <Layout>
      <div className="px-4 sm:px-8 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-600 text-sm mb-4">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Module</h1>
      </div>

      <div className="px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => {
          const { text, color } = statusLabel(mod)
          return (
            <button
              key={mod._id}
              onClick={() => navigate(`/modules/${mod._id}`)}
              className="w-full border border-gray-200 rounded-2xl overflow-hidden text-left hover:shadow-sm transition-shadow"
            >
              <div className="bg-gray-100 h-36 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-semibold text-black">{mod.title}</span>
                <span className={`text-xs ${color}`}>{text}</span>
              </div>
            </button>
          )
        })}
      </div>
    </Layout>
  )
}
