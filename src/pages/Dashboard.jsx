import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import { ImageIcon } from '../components/Icons'
import client from '../api/client'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    client.get('/modules/progress').catch(() => {})
  }, [])

  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-8 pt-10 pb-8" style={{ background: 'var(--bg)' }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-5">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Profile card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="font-bold text-black text-base capitalize">{user?.name || 'John doe'}</p>
              <p className="text-gray-500 text-sm">{user?.email || 'Jhondoe12@gmail.com'}</p>
              <p className="text-gray-500 text-sm capitalize">{user?.userType || 'Manufacturer'}</p>
              <p className="text-gray-500 text-sm capitalize">{user?.gender || 'Male'}</p>
            </div>
          </div>

          {/* Continue Training */}
          <div className="bg-white rounded-2xl p-5">
            <h2 className="text-xl font-bold text-black mb-1">Continue training</h2>
            <p className="text-sm font-semibold text-gray-700 mb-1">HempBase Eco-Friendly Build Techniques.</p>
            <p className="text-xs text-gray-400 mb-4">Learn the step-by-step methods to basic construction techniques with HempBase Panels for eco-friendly building.</p>
            <div className="flex justify-end">
              <button onClick={() => navigate('/modules')} className="btn-brand px-5 py-2 text-white text-sm">Proceed</button>
            </div>
          </div>

          {/* Get Licensed */}
          <div className="bg-white rounded-2xl p-5">
            <h2 className="text-xl font-bold text-black mb-2">Get Licensed to Build</h2>
            <p className="text-xs text-gray-400 mb-4">Get your license to start your journey by completing the required license to work with eco-friendly materials.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => navigate('/products')} className="btn-outline px-4 py-2 text-sm">Learn more</button>
              <button onClick={() => navigate('/license-checkpoint')} className="btn-brand px-4 py-2 text-white text-sm">Get License</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
