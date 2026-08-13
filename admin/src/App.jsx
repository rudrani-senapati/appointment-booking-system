import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminHome from './pages/Admin/AdminHome'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import CareerApplications from './pages/Admin/CareerApplications'
import AdminProfile from './pages/Admin/AdminProfile'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointment from './pages/Doctor/DoctorAppointment'
import DoctorProfile from './pages/Doctor/DoctorProfile'

import Footer from './components/Footer'

import DepartmentManagement from './pages/Admin/DepartmentManagement'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-slate-50/60 min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white'>
      <ToastContainer />
      <Navbar />
      
      {/* 🚀 Main Page Container (Full-Width Responsive Layout, No Sidebar Margins) */}
      <main className='w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex-1 min-h-[calc(100vh-5rem)] flex flex-col justify-between gap-8 box-border overflow-x-hidden'>
        <div>
          <Routes>
            {/* Admin Routes */}
            {aToken && <Route path='/' element={<AdminHome />} />}
            {aToken && <Route path='/admin-dashboard' element={<Dashboard />} />}
            {aToken && <Route path='/admin-profile' element={<AdminProfile />} />}
            {aToken && <Route path='/all-appointments' element={<AllAppointments />} />}
            {aToken && <Route path='/add-doctor' element={<AddDoctor />} />}
            {aToken && <Route path='/doctor-list' element={<DoctorsList />} />}
            {aToken && <Route path='/departments' element={<DepartmentManagement />} />}
            {aToken && <Route path='/career-applications' element={<CareerApplications />} />}

            {/* Doctor Routes */}
            {dToken && <Route path='/' element={<DoctorDashboard />} />}
            {dToken && <Route path='/doctor-dashboard' element={<DoctorDashboard />} />}
            {dToken && <Route path='/doctor-appointments' element={<DoctorAppointment />} />}
            {dToken && <Route path='/doctor-profile' element={<DoctorProfile />} />}
          </Routes>
        </div>

        <Footer />
      </main>

    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
