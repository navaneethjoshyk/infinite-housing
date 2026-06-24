/*
  Dashboard.jsx

  WHY useEffect here?
  When this component first renders, we want to fetch the user's
  latest data from the backend (in case they updated their profile
  elsewhere). useEffect runs after render, so it doesn't block the UI.
  The [] dependency array means "run only on first mount" — not on
  every re-render.

  The dashboard shows:
  1. User profile card (name, email, role, gender)
  2. Continue training card (their current course)
  3. Get Licensed to Build card (CTA)
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import { ImageIcon } from '../components/Icons'
import client from '../api/client'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [courseProgress, setCourseProgress] = useState(null)

  useEffect(() => {
    // Fetch latest user progress from backend
    client.get('/modules/progress').then(({ data }) => {
      setCourseProgress(data)
    }).catch(() => {}) // silently fail — dashboard still works without it
  }, [])

  return (
    <Layout>
      <div className="px-4 sm:px-8 pt-10 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Dashboard</h1>
      </div>

      <div className="px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile — full width */}
        <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-4 sm:p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-black text-base capitalize">{user?.name || 'Jhon doe'}</p>
            <p className="text-gray-500 text-sm">{user?.email || 'Jhondoe12@gmail.com'}</p>
            <p className="text-gray-500 text-sm capitalize">{user?.userType || 'Manufacturer'}</p>
            <p className="text-gray-500 text-sm capitalize">{user?.gender || 'Male'}</p>
          </div>
        </div>

        {/* Continue Training */}
        <div className="border border-gray-200 rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-black mb-1">Continue training</h2>
          <p className="text-sm font-semibold text-gray-700 mb-1">HempBase Eco-Friendly Build Techniques.</p>
          <p className="text-xs text-gray-500 mb-4">Learn the step-by-step methods to basic construction techniques with HempBase Panels for eco-friendly building.</p>
          <div className="flex justify-end">
            <button onClick={() => navigate('/modules')} className="px-5 py-2 bg-amber-700 text-white text-sm rounded-xl font-medium hover:bg-amber-800 transition-colors">Proceed</button>
          </div>
        </div>

        {/* Get Licensed */}
        <div className="border border-gray-200 rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-black mb-2">Get Licensed to Build</h2>
          <p className="text-xs text-gray-500 mb-4">Get your license to start your journey by completing the required license to work with eco-friendly materials.</p>
          <div className="flex gap-3 justify-end">
            <button onClick={() => navigate('/products')} className="px-4 py-2 border border-gray-300 text-sm rounded-xl font-medium hover:bg-gray-50">Learn more</button>
            <button onClick={() => navigate('/license-checkpoint')} className="px-4 py-2 bg-amber-700 text-white text-sm rounded-xl font-medium hover:bg-amber-800">Get License</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
