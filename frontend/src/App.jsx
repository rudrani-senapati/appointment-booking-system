import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import Careers from './pages/Careers'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ScrollToTop, LiveChatWidget } from './components/ScrollToTop'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MyRecords from './pages/MyRecords'

// Protected Route Guard Component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext)
  
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

const App = () => {
  const { token } = useContext(AppContext)

  return (
    <div className='w-full max-w-full min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white bg-[#eef2f6]/90 overflow-x-hidden relative'>
      <div className='w-full max-w-full overflow-x-hidden'>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} />
        {token && <Navbar />}
        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${token ? 'pt-2 pb-0' : 'py-6'}`}>
          <Routes>
            <Route path='/login' element={<Login initialState="Login" />} />
            <Route path='/signup' element={<Login initialState="Sign Up" />} />
            
            {/* All Application Features Protected Behind Login */}
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/doctors' element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
            <Route path='/doctors/:speciality' element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
            <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path='/careers' element={<ProtectedRoute><Careers /></ProtectedRoute>} />
            <Route path='/my-appointments' element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
            <Route path='/my-records' element={<ProtectedRoute><MyRecords /></ProtectedRoute>} />
            <Route path='/my-profile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path='/appointment/:docId' element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
            <Route path='*' element={<Navigate to={token ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
      {token && <LiveChatWidget />}
      {token && <Footer />}
    </div>
  )
}

export default App