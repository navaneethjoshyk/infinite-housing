/*
  App.jsx — The Router

  Why React Router?
  A traditional website loads a new HTML page for every URL.
  React Router intercepts navigation and swaps components instead —
  no full page reload, instant transitions.

  BrowserRouter wraps everything and listens to the URL.
  Routes is the switch-case of URLs.
  Each Route maps a URL path to a component (screen).

  AuthContext (below) is our "global state" — it stores whether
  the user is logged in and their data, so any screen can read it
  without passing props through every level.
*/

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// Screens
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SelectUserType from './pages/SelectUserType'
import Dashboard from './pages/Dashboard'
import Modules from './pages/Modules'
import ModuleDetail from './pages/ModuleDetail'
import ProductSelect from './pages/ProductSelect'
import ProductOverview from './pages/ProductOverview'
import FillForm from './pages/FillForm'
import LicenseCheckpoint from './pages/LicenseCheckpoint'
import LicenceCard from './pages/LicenceCard'

// ProtectedRoute: if user isn't logged in, send them to /login
// This is the standard pattern for auth-gated pages
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="phone-frame w-full">
          <Routes>
            {/* Public routes — anyone can visit */}
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/select-user-type" element={<SelectUserType />} />

            {/* Protected routes — must be logged in */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/modules" element={<ProtectedRoute><Modules /></ProtectedRoute>} />
            <Route path="/modules/:id" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductSelect /></ProtectedRoute>} />
            <Route path="/products/:id" element={<ProtectedRoute><ProductOverview /></ProtectedRoute>} />
            <Route path="/fill-form" element={<ProtectedRoute><FillForm /></ProtectedRoute>} />
            <Route path="/license-checkpoint" element={<ProtectedRoute><LicenseCheckpoint /></ProtectedRoute>} />
            <Route path="/licence-card" element={<ProtectedRoute><LicenceCard /></ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
