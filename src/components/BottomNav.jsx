/*
  BottomNav.jsx — Bottom Navigation Bar

  WHY a separate component?
  The bottom nav appears on 4+ screens (Dashboard, License, Search, Profile).
  By extracting it, we write it once and just drop <BottomNav /> anywhere.
  This is the DRY principle: Don't Repeat Yourself.

  useLocation() tells us the current URL so we can highlight the active tab.
*/

import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon, LicenseIcon, SearchIcon, ProfileIcon } from './Icons'

const tabs = [
  { label: 'Home',    icon: HomeIcon,    path: '/dashboard' },
  { label: 'License', icon: LicenseIcon, path: '/licence-card' },
  { label: 'Search',  icon: SearchIcon,  path: '/search' },
  { label: 'Profile', icon: ProfileIcon, path: '/profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-gray-200 flex justify-around py-3 z-50">
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = pathname === path
        return (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1 px-4"
          >
            <Icon className={`w-6 h-6 ${active ? 'text-black' : 'text-gray-400'}`} />
            <span className={`text-xs ${active ? 'text-black font-medium' : 'text-gray-400'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
