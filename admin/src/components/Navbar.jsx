import React, { useContext, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Navbar = () => {

  const { aToken, setAToken, adminProfile } = useContext(AdminContext)
  const { dToken, setDToken, profileData, getProfileData } = useContext(DoctorContext)
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (dToken && !profileData) {
      getProfileData()
    }
  }, [dToken])

  // Lock body & html scrolling + touch gestures when mobile menu drawer is active
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [showMenu])

  const logout = () => {
    setShowMenu(false)
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    toast.success("🚪 Logged out successfully!")
    navigate('/')
  }

  const userImage = aToken 
    ? (adminProfile?.image || assets.admin_logo) 
    : (profileData?.image || assets.doctor_icon)

  const userName = aToken 
    ? (adminProfile?.name || "System Admin") 
    : (profileData?.name || "Doctor Specialist")

  const userSubtext = aToken 
    ? (adminProfile?.email || "admin@carepulse.com") 
    : (profileData?.speciality ? `🩺 ${profileData.speciality}` : "Clinical Specialist")

  return (
    <nav className='w-full sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md shadow-slate-100/50 select-none'>
      
      {/* Top Colorful Accent Line */}
      <div className='h-1 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4'>
        
        {/* Brand Logo & Name */}
        <div className='flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0' onClick={() => { setShowMenu(false); navigate('/'); }}>
          <div className='w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300 shrink-0'>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className='flex flex-col'>
            <span className='text-lg sm:text-2xl font-black tracking-tight text-slate-900 leading-none group-hover:text-indigo-600 transition-colors'>
              Care<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>Pulse</span>
            </span>
            <span className='text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400 leading-tight mt-0.5'>
              {aToken ? 'Admin Portal' : 'Doctor Portal'}
            </span>
          </div>
        </div>

        {/* ------------ Desktop Nav Links (Exact Match to Frontend Styling) ------------ */}
        <ul className='hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 shadow-inner text-xs font-black'>
          
          {/* ADMIN DESKTOP NAV LINKS */}
          {aToken && (
            <>
              <NavLink 
                to='/' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                HOME
              </NavLink>
              <NavLink 
                to='/admin-dashboard' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                ANALYTICS
              </NavLink>
              <NavLink 
                to='/all-appointments' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                APPOINTMENTS
              </NavLink>
              <NavLink 
                to='/doctor-list' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                DOCTORS
              </NavLink>
              <NavLink 
                to='/departments' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                UNITS
              </NavLink>
              <NavLink 
                to='/career-applications' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                CAREERS
              </NavLink>
            </>
          )}

          {/* DOCTOR DESKTOP NAV LINKS */}
          {dToken && (
            <>
              <NavLink 
                to='/doctor-dashboard' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                DASHBOARD
              </NavLink>
              <NavLink 
                to='/doctor-appointments' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                APPOINTMENTS
              </NavLink>
              <NavLink 
                to='/doctor-profile' 
                className={({ isActive }) => `px-5 py-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300' : 'text-slate-600 hover:text-indigo-600 hover:bg-white'}`}
              >
                PROFILE
              </NavLink>
            </>
          )}

        </ul>

        {/* ------------ Right Side User Profile Photo Dropdown (Clean & Minimal like Frontend) ------------ */}
        <div className='flex items-center gap-3 sm:gap-4 shrink-0'>
          
          {(aToken || dToken) && (
            <div className='flex items-center gap-2 cursor-pointer group relative bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/80 p-1 sm:p-1.5 pr-2 sm:pr-3 rounded-full transition-all'>
              <img className='w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-indigo-500/40 bg-white' src={userImage} alt="User Profile Avatar" />
              <span className='hidden sm:block text-xs font-bold text-slate-800 max-w-28 truncate'>{userName}</span>
              
              {/* Dropdown Chevron */}
              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>

              {/* Hover Dropdown Menu Popover (Minimal & Clean like Frontend) */}
              <div className='absolute top-full right-0 pt-3 text-sm font-medium text-slate-600 z-50 hidden group-hover:block transition-all'>
                <div className='min-w-52 bg-white border border-slate-100 shadow-2xl rounded-2xl flex flex-col gap-1 p-2 text-xs'>
                  
                  {/* User Profile Header in Dropdown */}
                  <div className='px-3 py-2 border-b border-slate-100 mb-1'>
                    <p className='font-bold text-slate-900 text-sm truncate'>{userName}</p>
                    <p className='text-slate-400 text-xs truncate'>{userSubtext}</p>
                  </div>

                  {/* Clean Minimal Dropdown Links for Admin */}
                  {aToken && (
                    <>
                      <p onClick={() => navigate('/admin-profile')} className='hover:text-indigo-600 hover:bg-indigo-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2'>
                        <span>👤</span> Admin Profile
                      </p>
                      <p onClick={() => navigate('/doctor-list')} className='hover:text-indigo-600 hover:bg-indigo-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2'>
                        <span>🩺</span> Doctors Directory
                      </p>
                      <p onClick={() => navigate('/add-doctor')} className='hover:text-indigo-600 hover:bg-indigo-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2'>
                        <span>➕</span> Add Doctor
                      </p>
                    </>
                  )}

                  {/* Clean Minimal Dropdown Links for Doctor */}
                  {dToken && (
                    <>
                      <p onClick={() => navigate('/doctor-profile')} className='hover:text-indigo-600 hover:bg-indigo-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2'>
                        <span>👤</span> Profile Settings
                      </p>
                    </>
                  )}

                  <hr className='border-slate-100 my-1' />

                  {/* Logout Button */}
                  <p onClick={logout} className='hover:text-rose-600 hover:bg-rose-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2 text-rose-600'>
                    <span>🚪</span> Logout
                  </p>

                </div>
              </div>
            </div>
          )}

          {/* High-Contrast Mobile Hamburger Toggle Button */}
          <button 
            type="button"
            onClick={() => setShowMenu(prev => !prev)} 
            aria-label="Toggle Navigation Menu"
            className='md:hidden px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-200 focus:outline-none transition-all cursor-pointer border border-indigo-500 z-[100] flex items-center gap-1.5'
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            <span className='font-black uppercase tracking-wider text-[11px]'>{showMenu ? 'Close' : 'Menu'}</span>
          </button>

          {/* ---------- Mobile Menu Portal Attached Directly to document.body (Exact Match to Frontend) ----------------------- */}
          {createPortal(
            <div 
              className={`fixed inset-0 top-0 left-0 w-full h-full bg-slate-900/60 backdrop-blur-sm z-[999999] transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              onTouchMove={(e) => { e.preventDefault(); }}
            >
              <div 
                className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl z-[1000000] transition-transform duration-300 ease-out flex flex-col justify-between p-6 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}
              >
                
                {/* Mobile Drawer Top Header */}
                <div className='space-y-6'>
                  
                  <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
                    <div className='flex items-center gap-2.5'>
                      <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md'>
                        ⚡
                      </div>
                      <div>
                        <span className='text-lg font-black text-slate-900 leading-none block'>CarePulse</span>
                        <span className='text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5 block'>
                          {aToken ? 'Admin Portal' : 'Doctor Portal'}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setShowMenu(false)}
                      className='w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-sm flex items-center justify-center cursor-pointer'
                    >
                      ✕
                    </button>
                  </div>

                  {/* User Profile Summary Card in Mobile Drawer */}
                  <div className='flex items-center gap-3 bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100'>
                    <img className='w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40 bg-white shrink-0' src={userImage} alt="" />
                    <div className='truncate'>
                      <p className='font-black text-slate-900 text-sm truncate'>{userName}</p>
                      <p className='text-indigo-600 font-bold text-xs truncate mt-0.5'>{userSubtext}</p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className='flex flex-col gap-2 font-bold text-slate-700 text-sm'>
                    
                    {/* Admin Mobile Links */}
                    {aToken && (
                      <>
                        <NavLink 
                          to='/' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>🏠</span> Home
                        </NavLink>

                        <NavLink 
                          to='/admin-profile' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>👤</span> Admin Profile
                        </NavLink>

                        <NavLink 
                          to='/admin-dashboard' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>📊</span> Analytics
                        </NavLink>

                        <NavLink 
                          to='/all-appointments' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>📅</span> Appointments
                        </NavLink>

                        <NavLink 
                          to='/doctor-list' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>👨‍⚕️</span> Doctors List
                        </NavLink>

                        <NavLink 
                          to='/career-applications' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>💼</span> Careers
                        </NavLink>
                      </>
                    )}

                    {/* Doctor Mobile Links */}
                    {dToken && (
                      <>
                        <NavLink 
                          to='/doctor-dashboard' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>📊</span> Dashboard
                        </NavLink>

                        <NavLink 
                          to='/doctor-appointments' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>📅</span> Appointments
                        </NavLink>

                        <NavLink 
                          to='/doctor-profile' 
                          onClick={() => setShowMenu(false)} 
                          className={({ isActive }) => `px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${isActive ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-300' : 'hover:bg-slate-50'}`}
                        >
                          <span>👤</span> Profile
                        </NavLink>
                      </>
                    )}

                  </div>

                </div>

                {/* Mobile Drawer Bottom Logout */}
                <div className='pt-4 border-t border-slate-100'>
                  <button 
                    onClick={logout} 
                    className='w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-200 cursor-pointer flex items-center justify-center gap-2'
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>

              </div>
            </div>,
            document.body
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar
