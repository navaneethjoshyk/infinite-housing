import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from './Icons'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      style={{ fontSize: '16px', fontWeight: '500', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <ChevronLeftIcon className="w-5 h-5" />
      Back
    </button>
  )
}
