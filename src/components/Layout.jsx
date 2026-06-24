/*
  Layout.jsx — Shell for authenticated pages

  WHY a Layout component?
  Instead of adding sidebar/padding logic to every single page,
  we wrap all protected pages in this shell once.
  It handles the sidebar on desktop and bottom nav on mobile automatically.
*/

import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon, LicenseIcon, SearchIcon, ProfileIcon } from './Icons'

const tabs = [
  { label: 'Home',    icon: HomeIcon,    path: '/dashboard' },
  { label: 'License', icon: LicenseIcon, path: '/licence-card' },
  { label: 'Search',  icon: SearchIcon,  path: '/search' },
  { label: 'Profile', icon: ProfileIcon, path: '/profile' },
]

function NavItems({ vertical = false }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return tabs.map(({ label, icon: Icon, path }) => {
    const active = pathname === path
    if (vertical) {
      return (
        <button
          key={label}
          onClick={() => navigate(path)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-colors ${
            active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Icon className="w-5 h-5" />
          {label}
        </button>
      )
    }
    return (
      <button
        key={label}
        onClick={() => navigate(path)}
        className="flex flex-col items-center gap-1 px-4"
      >
        <Icon className={`w-6 h-6 ${active ? 'text-black' : 'text-gray-400'}`} />
        <span className={`text-xs ${active ? 'text-black font-medium' : 'text-gray-400'}`}>{label}</span>
      </button>
    )
  })
}

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">

      {/* Sidebar — desktop only */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-gray-100 px-4 py-8">
        <div className="mb-10 px-2">
          <h1 className="text-xl font-bold text-black">Infinite Housing</h1>
          <p className="text-xs text-gray-400 mt-1">Eco-friendly building</p>
        </div>
        <nav className="flex flex-col gap-1">
          <NavItems vertical />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 pb-20 lg:pb-8">
        {children}
      </main>

      {/* Bottom nav — mobile & tablet only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-50">
        <NavItems />
      </nav>

    </div>
  )
}
