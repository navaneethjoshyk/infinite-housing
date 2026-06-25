import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from './Icons'

export default function BackButton({ className = '' }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-1 text-gray-700 font-medium mb-6 bg-transparent border-none cursor-pointer p-0 text-sm lg:text-base ${className}`}
    >
      <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5" />
      Back
    </button>
  )
}
