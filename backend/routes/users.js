import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import User from '../models/User.js'

const router = Router()

// GET /api/users/me — get logged-in user's profile
router.get('/me', protect, (req, res) => {
  res.json(req.user)
})

// PATCH /api/users/me — update profile (userType, gender, etc.)
router.patch('/me', protect, async (req, res) => {
  try {
    const allowed = ['name', 'userType', 'gender']
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    )
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
