import mongoose from 'mongoose'

const licenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  licenceNo: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  services: { type: String },
  validFrom: { type: Date, default: Date.now },
  validThru: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'active', 'expired'],
    default: 'pending',
  },
}, { timestamps: true })

export default mongoose.model('License', licenseSchema)
