/*
  Splash.jsx — First screen the user sees

  WHY useNavigate?
  React Router's useNavigate hook lets us programmatically change screens.
  Instead of <a href="/login">, we call navigate('/login') inside button
  onClick handlers. This keeps it a SPA (no full page reload).

  Design notes from your mockup:
  - Large placeholder image/logo at top
  - Bold "Welcome back!" heading
  - Description text for Infinite Housing
  - Two buttons side by side at the bottom: Sign up | Log in
*/

import { useNavigate } from 'react-router-dom'
import { ImageIcon } from '../components/Icons'

export default function Splash() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-white px-6">
      {/* Logo area — top center */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 border-2 border-gray-300 rounded-2xl flex items-center justify-center mb-12">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>

        <h1 className="text-3xl font-bold text-black mb-4">Welcome back!</h1>

        <p className="text-gray-600 text-sm text-center leading-relaxed">
          Ready to reshape the future of construction?{' '}
          With <strong>Infinite Housing</strong>, you'll master eco-friendly
          building techniques and lead the way in sustainable construction.
          Start your journey today.
        </p>
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-3 pb-10 pt-6">
        {/*
          Why onClick={() => navigate('/signup')}?
          The arrow function delays execution — if we wrote
          onClick={navigate('/signup')} it would navigate immediately
          on render, not on click.
        */}
        <button
          onClick={() => navigate('/signup')}
          className="flex-1 py-4 rounded-full bg-gray-200 text-black font-medium hover:bg-gray-300 transition-colors"
        >
          Sign up
        </button>
        <button
          onClick={() => navigate('/login')}
          className="flex-1 py-4 rounded-full bg-gray-200 text-black font-medium hover:bg-gray-300 transition-colors"
        >
          Log in
        </button>
      </div>
    </div>
  )
}
