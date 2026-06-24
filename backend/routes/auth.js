/*
  routes/auth.js — Authentication Routes

  POST /api/auth/signup  — create account
  POST /api/auth/login   — get token

  WHY return a JWT on signup?
  Log the user in immediately after they register — no need to redirect
  to login. This is standard UX for mobile apps.

  jwt.sign(payload, secret, options):
  - payload: data embedded in the token (we store just the user id)
  - secret: a string only the server knows — used to sign/verify
  - expiresIn: token auto-expires for security
*/

import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' })
    }

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already registered' })

    const user = await User.create({ name, email, password })
    const token = signToken(user._id)

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body
    // Find by name (matches your design) or email
    const user = await User.findOne({
      $or: [{ name: { $regex: new RegExp(`^${name}$`, 'i') } }, { email: name }],
    })

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = signToken(user._id)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType, gender: user.gender },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
