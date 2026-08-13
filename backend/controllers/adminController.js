import validator   from 'validator'
import bcrypt      from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import jwt         from 'jsonwebtoken'

import doctorModel      from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel        from '../models/userModel.js'
import departmentModel  from '../models/departmentModel.js'

// ── Default departments matching the speciality options in AddDoctor ──────────
const DEFAULT_DEPARTMENTS = [
  { name: 'General Physician',   icon: '🩺', description: 'Primary care and general medicine' },
  { name: 'Gynecologist',        icon: '🤰', description: "Women's health and obstetrics" },
  { name: 'Dentist',             icon: '🪥', description: 'Oral health and dental care' },
  { name: 'Dermatologist',       icon: '🧴', description: 'Skin, hair and nail conditions' },
  { name: 'Pediatricians',       icon: '🧸', description: 'Child healthcare from birth to adolescence' },
  { name: 'Neurologist',         icon: '🧠', description: 'Brain and nervous system disorders' },
  { name: 'Gastroenterologist',  icon: '🥗', description: 'Digestive system and gut health' },
  { name: 'Ophthalmologist',     icon: '👁️', description: 'Eye care and vision disorders' },
  { name: 'Orthopedic',          icon: '🦴', description: 'Bones, joints and musculoskeletal system' },
  { name: 'Cardiologist',        icon: '❤️', description: 'Heart and cardiovascular health' },
  { name: 'Pulmonologist',       icon: '🫁', description: 'Lung and respiratory conditions' },
  { name: 'ENT Specialist',      icon: '👂', description: 'Ear, nose and throat disorders' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Add Doctor
// ─────────────────────────────────────────────────────────────────────────────
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: 'Missing required details' })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' })
    }
    if (password.length < 8) {
      return res.json({ success: false, message: 'Password must be at least 8 characters' })
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
    const imageUpload    = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })

    const newDoctor = new doctorModel({
      name, email,
      image:     imageUpload.secure_url,
      password:  hashedPassword,
      speciality, degree, experience, about, fees,
      address:   JSON.parse(address),
      date:      Date.now(),
    })

    await newDoctor.save()
    res.json({ success: true, message: 'Doctor added successfully' })
  } catch (error) {
    console.error('addDoctor error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Login
// ─────────────────────────────────────────────────────────────────────────────
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      return res.json({ success: true, token })
    }
    res.json({ success: false, message: 'Invalid credentials' })
  } catch (error) {
    console.error('loginAdmin error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// All Doctors
// ─────────────────────────────────────────────────────────────────────────────
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({ success: true, doctors })
  } catch (error) {
    console.error('allDoctors error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// All Appointments
// ─────────────────────────────────────────────────────────────────────────────
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })
  } catch (error) {
    console.error('appointmentsAdmin error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Cancel Appointment
// ─────────────────────────────────────────────────────────────────────────────
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointment = await appointmentModel.findById(appointmentId)
    if (!appointment) return res.json({ success: false, message: 'Appointment not found' })

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    const { docId, slotDate, slotTime } = appointment
    const doctor       = await doctorModel.findById(docId)
    const slots_booked = { ...doctor.slots_booked }
    slots_booked[slotDate] = (slots_booked[slotDate] || []).filter(t => t !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment cancelled' })
  } catch (error) {
    console.error('appointmentCancel error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Dashboard
// ─────────────────────────────────────────────────────────────────────────────
const adminDashboard = async (req, res) => {
  try {
    const [doctors, users, appointments] = await Promise.all([
      doctorModel.find({}),
      userModel.find({}),
      appointmentModel.find({}),
    ])

    res.json({
      success: true,
      dashData: {
        doctors:            doctors.length,
        appointments:       appointments.length,
        patients:           users.length,
        latestAppointments: [...appointments].reverse().slice(0, 5),
      },
    })
  } catch (error) {
    console.error('adminDashboard error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Get Departments  (auto-seeds the 12 defaults on first call)
// ─────────────────────────────────────────────────────────────────────────────
const getDepartments = async (req, res) => {
  try {
    let departments = await departmentModel.find({ isActive: true }).sort({ createdAt: 1 })

    // Seed defaults when collection is empty
    if (departments.length === 0) {
      await departmentModel.insertMany(DEFAULT_DEPARTMENTS)
      departments = await departmentModel.find({ isActive: true }).sort({ createdAt: 1 })
    }

    // Attach live doctor count per department (case-insensitive match)
    const doctors = await doctorModel.find({}).select('speciality name')

    const enriched = departments.map(dept => {
      const matched = doctors.filter(
        d => d.speciality.toLowerCase() === dept.name.toLowerCase()
      )
      return { ...dept.toObject(), doctorCount: matched.length, doctors: matched.map(d => d.name) }
    })

    res.json({ success: true, departments: enriched })
  } catch (error) {
    console.error('getDepartments error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Add Department
// ─────────────────────────────────────────────────────────────────────────────
const addDepartment = async (req, res) => {
  try {
    const { name, icon = '🏥', description = '', headDoctor = '' } = req.body

    if (!name || !name.trim()) {
      return res.json({ success: false, message: 'Department name is required' })
    }

    const existing = await departmentModel.findOne({ name: name.trim() })
    if (existing) return res.json({ success: false, message: 'Department already exists' })

    const department = new departmentModel({ name: name.trim(), icon, description, headDoctor })
    await department.save()

    res.json({ success: true, message: `Department "${name.trim()}" created`, department })
  } catch (error) {
    console.error('addDepartment error:', error.message)
    res.json({ success: false, message: error.message })
  }
}

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  getDepartments,
  addDepartment,
}