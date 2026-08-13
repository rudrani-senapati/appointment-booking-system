import express from 'express'
import {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  getDepartments,
  addDepartment,
} from '../controllers/adminController.js'
import upload    from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const adminRouter = express.Router()

// ── Auth ──────────────────────────────────────────────────────────────────────
adminRouter.post('/login', loginAdmin)

// ── Doctors ───────────────────────────────────────────────────────────────────
adminRouter.post('/add-doctor',         authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/all-doctors',        authAdmin, allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailablity)

// ── Appointments ──────────────────────────────────────────────────────────────
adminRouter.get('/appointments',        authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

// ── Dashboard ─────────────────────────────────────────────────────────────────
adminRouter.get('/dashboard',           authAdmin, adminDashboard)

// ── Departments ───────────────────────────────────────────────────────────────
adminRouter.get('/departments',         authAdmin, getDepartments)
adminRouter.post('/add-department',     authAdmin, addDepartment)

export default adminRouter