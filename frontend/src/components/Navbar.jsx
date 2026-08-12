import React, { useContext, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      // Hide navbar when scrolling down past 50px, show when scrolling up
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    toast.success("🚪 Logged out successfully!")
    navigate('/login')
  }

  // Lock body scrolling when mobile menu drawer is active
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showMenu])

  return (
    <nav className={`w-full sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between'>
        
        {/* Brand Logo & Name */}
        <div className='flex items-center gap-3 cursor-pointer group' onClick={() => navigate('/')}>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300'>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none group-hover:text-indigo-600 transition-colors'>
              Care<span className='text-indigo-600'>Pulse</span>
            </span>
            <span className='text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-tight'>Medical Care</span>
          </div>
        </div>

        {/* ------------ Desktop Nav Links ------------ */}
        <ul className='hidden md:flex items-center gap-2 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 shadow-inner text-xs font-semibold'>
          <NavLink 
            to='/' 
            className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:text-indigo-600 hover:bg-white/80'}`}
          >
            HOME
          </NavLink>
          <NavLink 
            to='/doctors' 
            className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:text-indigo-600 hover:bg-white/80'}`}
          >
            ALL DOCTORS
          </NavLink>
          <NavLink 
            to='/about' 
            className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:text-indigo-600 hover:bg-white/80'}`}
          >
            ABOUT
          </NavLink>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:text-indigo-600 hover:bg-white/80'}`}
          >
            CONTACT
          </NavLink>
          <NavLink 
            to='/careers' 
            className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:text-indigo-600 hover:bg-white/80'}`}
          >
            CAREERS
          </NavLink>
        </ul>

        {/* ------------ Right Side User / Auth Button ------------ */}
        <div className='flex items-center gap-4'>
          {token && userData ? (
            <div className='flex items-center gap-2.5 cursor-pointer group relative bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/80 p-1.5 pr-3 rounded-full transition-all'>
              <img className='w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40' src={userData.image} alt="User Avatar" />
              <span className='hidden sm:block text-xs font-bold text-slate-800 max-w-28 truncate'>{userData.name}</span>
              <img className='w-2.5 transition-transform group-hover:rotate-180 opacity-70' src={assets.dropdown_icon} alt="" />
              
              {/* Dropdown Menu */}
              <div className='absolute top-full right-0 pt-3 text-sm font-medium text-slate-600 z-50 hidden group-hover:block transition-all'>
                <div className='min-w-52 bg-white border border-slate-100 shadow-2xl rounded-2xl flex flex-col gap-1 p-2 text-xs'>
                  <div className='px-3 py-2 border-b border-slate-100 mb-1'>
                    <p className='font-bold text-slate-900 text-sm truncate'>{userData.name}</p>
                    <p className='text-slate-400 text-xs truncate'>{userData.email}</p>
                  </div>
                  <p onClick={() => navigate('my-profile')} className='hover:text-indigo-600 hover:bg-indigo-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2'>
                    <span>👤</span> My Profile
                  </p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-indigo-600 hover:bg-indigo-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2'>
                    <span>📅</span> My Appointments
                  </p>
                  <hr className='border-slate-100 my-1' />
                  <p onClick={logout} className='hover:text-rose-600 hover:bg-rose-50/80 p-2.5 rounded-xl cursor-pointer transition-colors font-semibold flex items-center gap-2'>
                    <span>🚪</span> Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-7 py-3 rounded-full shadow-md shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5 hidden md:block'>
              Create Account
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button"
            onClick={() => setShowMenu(prev => !prev)} 
            aria-label="Toggle Navigation Menu"
            className='md:hidden p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 focus:outline-none transition-colors cursor-pointer border border-indigo-200 shadow-sm z-50 flex items-center justify-center'
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* ---------- Mobile Menu Portal Attached Directly to document.body ----------------------- */}
          {createPortal(
            <div className={`fixed inset-0 top-0 left-0 w-full h-full bg-slate-900/60 backdrop-blur-sm z-[999999] transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              {/* Clickable Backdrop Outside Side Drawer */}
              <div className='absolute inset-0' onClick={() => setShowMenu(false)} />

              {/* Solid Opaque 100% White Side Drawer Content Panel */}
              <div className={`absolute top-0 right-0 w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl z-[1000000] flex flex-col justify-between p-6 transition-transform duration-300 overflow-y-auto ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                <div>
                  {/* Drawer Header */}
                  <div className='flex items-center justify-between pb-5 border-b border-slate-100'>
                    <div className='flex items-center gap-2.5 cursor-pointer' onClick={() => { setShowMenu(false); navigate('/') }}>
                      <div className='w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className='text-xl font-black text-slate-900'>Care<span className='text-indigo-600'>Pulse</span></span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowMenu(false)}
                      className='p-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs cursor-pointer border border-slate-200'
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Drawer Nav Links */}
                  <ul className='flex flex-col gap-2 mt-6 text-sm font-black text-slate-800'>
                    <NavLink onClick={() => setShowMenu(false)} to='/' className={({ isActive }) => `p-3.5 rounded-2xl flex items-center gap-3 transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-indigo-50/70 text-slate-700'}`}>
                      <span>🏠</span> HOME
                    </NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({ isActive }) => `p-3.5 rounded-2xl flex items-center gap-3 transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-indigo-50/70 text-slate-700'}`}>
                      <span>👨‍⚕️</span> ALL DOCTORS
                    </NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/about' className={({ isActive }) => `p-3.5 rounded-2xl flex items-center gap-3 transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-indigo-50/70 text-slate-700'}`}>
                      <span>ℹ️</span> ABOUT
                    </NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) => `p-3.5 rounded-2xl flex items-center gap-3 transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-indigo-50/70 text-slate-700'}`}>
                      <span>📞</span> CONTACT
                    </NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/careers' className={({ isActive }) => `p-3.5 rounded-2xl flex items-center gap-3 transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-indigo-50/70 text-slate-700'}`}>
                      <span>💼</span> CAREERS
                    </NavLink>
                  </ul>
                </div>

                {/* Drawer Bottom Auth Actions */}
                <div className='pt-6 border-t border-slate-100 space-y-2.5 mt-8'>
                  {token ? (
                    <div className='space-y-2'>
                      <button onClick={() => { setShowMenu(false); navigate('/my-profile') }} className='w-full bg-slate-100 text-slate-800 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border border-slate-200 cursor-pointer flex items-center justify-center gap-2'>
                        <span>👤 My Profile</span>
                      </button>
                      <button onClick={() => { setShowMenu(false); navigate('/my-appointments') }} className='w-full bg-indigo-50 text-indigo-700 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border border-indigo-200 cursor-pointer flex items-center justify-center gap-2'>
                        <span>📅 My Appointments</span>
                      </button>
                      <button onClick={() => { setShowMenu(false); logout() }} className='w-full bg-rose-50 text-rose-600 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border border-rose-200 cursor-pointer flex items-center justify-center gap-2'>
                        <span>🚪 Logout</span>
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => { setShowMenu(false); navigate('/login') }} className='w-full bg-indigo-600 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-200 cursor-pointer flex items-center justify-center gap-2'>
                      <span>🔑 Sign In / Register</span>
                    </button>
                  )}
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