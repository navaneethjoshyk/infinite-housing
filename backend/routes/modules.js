import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import Module from '../models/Module.js'

const router = Router()

// GET /api/modules — list all modules (sorted by order)
router.get('/', protect, async (req, res) => {
  try {
    const modules = await Module.find().sort('order')
    res.json(modules)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/modules/progress — stub for current user progress
router.get('/progress', protect, async (req, res) => {
  res.json({ currentModule: 1, completedModules: [] })
})

// GET /api/modules/:id — single module detail
router.get('/:id', protect, async (req, res) => {
  try {
    const module = await Module.findById(req.params.id)
    if (!module) return res.status(404).json({ message: 'Module not found' })
    res.json(module)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
