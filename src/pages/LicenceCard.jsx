import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import BackButton from '../components/BackButton'

export default function LicenceCard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen px-5 pt-6 max-w-lg mx-auto w-full" style={{ background: 'var(--bg)' }}>
      <BackButton />
      <h1 className="text-3xl font-bold text-black mb-8">Licence</h1>

      {/* Licence card */}
      <div className="bg-white rounded-2xl p-5 flex justify-between items-start mb-6 shadow-sm">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-400">Name</p>
            <p className="text-sm font-bold text-black uppercase">{user?.name || 'JOHN DOE'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Licence No.</p>
            <p className="text-sm font-semibold text-black">N1234567890</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Validity: 08/24</p>
          </div>
        </div>

        {/* Profile photo placeholder */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex gap-3 pb-10">
        <button onClick={() => navigate('/dashboard')} className="btn-outline flex-1 py-4 text-sm">Not now</button>
        <button onClick={() => navigate('/dashboard')} className="btn-brand flex-1 py-4 text-white text-sm">Start Learning</button>
      </div>
    </div>
  )
}
