/*
  server.js — Express App Entry Point

  HOW EXPRESS WORKS:
  A request comes in → Express matches the URL to a router →
  the router runs middleware (auth check, validation) → then the handler
  → sends a response back.

  Key packages:
  - express: the web framework (handles routing, middleware)
  - mongoose: connects to MongoDB and gives us models (schemas)
  - cors: allows our React app (port 5173) to call this API (port 5000)
    Browsers block cross-origin requests by default — cors allows it
  - dotenv: loads .env file so we don't hardcode secrets in code
  - bcryptjs: hashes passwords before storing (NEVER store plain text!)
  - jsonwebtoken: creates/verifies JWT tokens for auth
*/

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// In ES modules there's no __dirname by default — we recreate it
const __dirname = dirname(fileURLToPath(import.meta.url))
// Load .env from the same folder as server.js, regardless of where
// the process was started from
dotenv.config({ path: join(__dirname, '.env') })

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import moduleRoutes from './routes/modules.js'
import licenseRoutes from './routes/licenses.js'

const app = express()

// Middleware — runs on EVERY request before it hits a route
app.use(cors({ origin: 'http://localhost:5173' }))  // Allow Vite dev server
app.use(express.json())                               // Parse JSON request bodies

// Routes — each file handles a group of related endpoints
app.use('/api/auth',     authRoutes)
app.use('/api/users',    userRoutes)
app.use('/api/modules',  moduleRoutes)
app.use('/api/licenses', licenseRoutes)

// Health check — useful to verify the server is running
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Connect to MongoDB, then start server
// We connect BEFORE listening so the first request doesn't fail
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'))
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
