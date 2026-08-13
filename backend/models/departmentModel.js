import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, unique: true, trim: true },
    icon:        { type: String, default: '🏥' },
    description: { type: String, default: '' },
    headDoctor:  { type: String, default: '' },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
)

const departmentModel =
  mongoose.models.department ||
  mongoose.model('department', departmentSchema)

export default departmentModel
