import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import BackButton from '../components/BackButton'
import client from '../api/client'

const MOCK_MODULES = [
  { _id: '1', title: 'Introduction',                       status: 'completed',   timeLeft: null,      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { _id: '2', title: 'Safe Handling and Preparation of Hempcrete', status: 'pending',    timeLeft: null,      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600' },
  { _id: '3', title: 'Application Techniques',             status: 'in_progress', timeLeft: '1hr13min', image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600' },
  { _id: '4', title: 'Maintenance of Hempcrete Structures', status: 'in_progress', timeLeft: '1hr13min', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600' },
]

function statusText(mod) {
  if (mod.status === 'completed')   return 'Completed'
  if (mod.status === 'in_progress') return `Time left:${mod.timeLeft}`
  return 'Pending'
}

export default function Modules() {
  const navigate = useNavigate()
  const [modules, setModules] = useState(MOCK_MODULES)

  useEffect(() => {
    client.get('/modules').then(({ data }) => { if (data?.length) setModules(data) }).catch(() => {})
  }, [])

  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-8 pt-6 pb-8" style={{ background: 'var(--bg)' }}>
        <BackButton />
        <h1 className="text-3xl font-bold text-black mb-5">Modules</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(mod => (
            <button
              key={mod._id}
              onClick={() => navigate(`/modules/${mod._id}`)}
              className="relative rounded-2xl overflow-hidden h-44 text-left w-full"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.75) 100%), url("${mod.image || ''}") center/cover`,
                  backgroundColor: '#555',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
                <span className="text-white font-semibold text-sm leading-tight max-w-[65%]">{mod.title}</span>
                <span style={{ color: '#C4883A' }} className="text-xs font-medium shrink-0">{statusText(mod)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  )
}
