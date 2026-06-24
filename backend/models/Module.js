import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseTag: { type: String, default: 'COURSE' },
  courseName: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, default: null },
  length: { type: String, default: '1hr 30 min' },
  passingGrade: { type: String, default: '70%' },
  skills: { type: String, default: '' },
  order: { type: Number, default: 0 },  // Sort order
}, { timestamps: true })

export default mongoose.model('Module', moduleSchema)
