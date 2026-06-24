import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import License from '../models/License.js'
import User from '../models/User.js'

const router = Router()

// POST /api/licenses/apply — submit license application form
router.post('/apply', protect, async (req, res) => {
  try {
    const { fullName, company, phone, email, address, services } = req.body
    // Generate a simple licence number (in production, use a proper system)
    const licenceNo = `N${Date.now().toString().slice(-10)}`
    const license = await License.create({
      user: req.user._id,
      licenceNo, fullName, company, phone, email, address, services,
      validThru: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    })
    res.status(201).json(license)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/licenses/verify — verify a licence number
router.post('/verify', protect, async (req, res) => {
  try {
    const { licenceNo } = req.body
    const license = await License.findOne({ licenceNo, user: req.user._id })
    if (!license) return res.status(404).json({ message: 'Licence not found' })

    // Mark as verified on the user
    await User.findByIdAndUpdate(req.user._id, { licenceNo, licenceVerified: true })
    res.json({ verified: true, license })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
