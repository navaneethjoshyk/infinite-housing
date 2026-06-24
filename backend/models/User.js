/*
  User.js — Mongoose Model

  WHY Mongoose?
  MongoDB stores raw JSON documents. Mongoose adds a schema layer —
  it defines what fields a document must have, their types, and
  validation rules. This prevents bad data from sneaking in.

  WHY hash the password in a pre-save hook?
  The hook runs automatically before every .save(). This ensures
  the password is ALWAYS hashed, even if you forget to hash it
  in a route handler. bcryptjs uses a "salt" (random data) so
  two identical passwords hash to different values — making
  rainbow table attacks useless.
*/

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  userType: {
    type: String,
    enum: ['manufacturers', 'developers', 'architects'],
    default: null,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null,
  },
  licenceNo: { type: String, default: null },
  licenceVerified: { type: Boolean, default: false },
}, {
  timestamps: true,  // Adds createdAt and updatedAt automatically
})

// Pre-save hook: hash password before storing
userSchema.pre('save', async function (next) {
  // Only hash if password was changed (not on other updates)
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12)  // 12 rounds = secure and reasonably fast
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Instance method: compare a plain password to the stored hash
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

export default mongoose.model('User', userSchema)
