/*
  BottomNav.jsx — Bottom Navigation Bar

  WHY a separate component?
  The bottom nav appears on 4+ screens (Dashboard, License, Search, Profile).
  By extracting it, we write it once and just drop <BottomNav /> anywhere.
  This is the DRY principle: Don't Repeat Yourself.

  useLocation() tells us the current URL so we can highlight the active tab.
*/

// Navigation is now handled by Layout.jsx
// This file is kept for backwards compatibility but Layout should be used directly
export { default } from './Layout'
