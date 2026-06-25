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

export default function Splash() {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col min-h-screen px-6 relative"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%), url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800") center/cover no-repeat',
      }}
    >
      <div className="flex-1 flex flex-col justify-end pb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Welcome back!</h1>
        <p className="text-white/80 text-sm leading-relaxed mb-10">
          Ready to reshape the future of construction? With Infinite Housing.{'\n'}
          Master eco-friendly building techniques and lead the way in sustainable construction. Start your journey today.
        </p>

        <div className="flex gap-3">
          <button onClick={() => navigate('/onboarding')} className="flex-1 py-4 btn-brand text-white font-medium">
            Sign up
          </button>
          <button onClick={() => navigate('/login')} className="flex-1 py-4 btn-brand text-white font-medium">
            Log in
          </button>
        </div>
      </div>
    </div>
  )
}
