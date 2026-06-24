/*
  auth.js — JWT Middleware

  HOW JWT AUTH WORKS:
  1. User logs in → server creates a JWT signed with a secret key
  2. Frontend stores it and sends it with every request as:
     Authorization: Bearer <token>
  3. This middleware extracts and verifies the token on every
     protected route. If valid, it attaches req.user and calls next().
     If invalid/expired, it returns 401 Unauthorized.

  WHY middleware?
  Instead of copy-pasting token verification into every route handler,
  we write it once here and add it as a parameter to any route that
  needs protection: router.get('/me', protect, handler)
*/

import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function protect(req, res, next) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = header.split(' ')[1]

  try {
    // jwt.verify throws if token is tampered with or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Attach user to req so route handlers can access it
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) return res.status(401).json({ message: 'User not found' })
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
