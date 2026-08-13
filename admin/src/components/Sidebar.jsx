import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <aside className='fixed left-0 top-16 sm:top-20 bottom-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-16 md:w-64 bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-white p-2.5 sm:p-3.5 shrink-0 shadow-2xl flex flex-col justify-between border-r-2 border-indigo-500/30 z-30 select-none overflow-hidden'>
      
      {/* Top Container: Header Pill & Navigation Menu Links */}
      <div className='flex flex-col gap-2.5 sm:gap-3 flex-1 min-h-0'>
        
        {/* Portal Header Pill */}
        <div className='hidden md:flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md shrink-0'>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            <span className='text-[10.5px] font-black uppercase tracking-wider text-emerald-200'>
              {aToken ? 'Admin Control' : 'Doctor Portal'}
            </span>
          </div>
          <span className='px-2 py-0.5 rounded bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8.5px] font-black tracking-widest uppercase shadow-xs border border-white/20'>
            LIVE
          </span>
        </div>

        {/* 🏢 ADMIN MENU LINKS (6 ITEMS FIT PERFECTLY WITHOUT SCROLLING) */}
        {aToken && (
          <nav className='flex flex-col gap-1.5 sm:gap-2 flex-1 justify-around'>
            
            <NavLink 
              to='/'
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30 scale-[1.02]' 
                  : 'text-indigo-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-indigo-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-indigo-900/60 text-indigo-200 border-indigo-500/30'}`}>🏠</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Control Home</p>
                </>
              )}
            </NavLink>

            <NavLink 
              to='/admin-dashboard'
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-purple-400 shadow-lg shadow-purple-500/30 scale-[1.02]' 
                  : 'text-purple-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-purple-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-purple-900/60 text-purple-200 border-purple-500/30'}`}>📊</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Analytics</p>
                </>
              )}
            </NavLink>

            <NavLink 
              to='/all-appointments'
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/30 scale-[1.02]' 
                  : 'text-cyan-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-cyan-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-cyan-900/60 text-cyan-200 border-cyan-500/30'}`}>📅</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Appointments</p>
                </>
              )}
            </NavLink>

            <NavLink 
              to='/add-doctor'
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white border-emerald-400 shadow-lg shadow-emerald-500/30 scale-[1.02]' 
                  : 'text-emerald-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-emerald-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-emerald-900/60 text-emerald-200 border-emerald-500/30'}`}>➕</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Add Specialist</p>
                </>
              )}
            </NavLink>

            <NavLink 
              to='/doctor-list'
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white border-rose-400 shadow-lg shadow-rose-500/30 scale-[1.02]' 
                  : 'text-rose-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-rose-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-rose-900/60 text-rose-200 border-rose-500/30'}`}>👨‍⚕️</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Doctors Roster</p>
                </>
              )}
            </NavLink>

            <NavLink 
              to='/career-applications'
              className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white border-pink-400 shadow-lg shadow-pink-500/30 scale-[1.02]' 
                  : 'text-pink-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-pink-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-pink-900/60 text-pink-200 border-pink-500/30'}`}>💼</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Career Hiring</p>
                </>
              )}
            </NavLink>

          </nav>
        )}

        {/* 🩺 DOCTOR MENU LINKS (3 ITEMS DISTRIBUTED EVENLY) */}
        {dToken && (
          <nav className='flex flex-col gap-2.5 flex-1 justify-start pt-2'>
            
            <NavLink 
              to='/doctor-dashboard'
              className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white border-emerald-400 shadow-lg shadow-emerald-500/30 scale-[1.02]' 
                  : 'text-emerald-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-emerald-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-emerald-900/60 text-emerald-200 border-emerald-500/30'}`}>📊</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Dashboard</p>
                </>
              )}
            </NavLink>

            <NavLink 
              to='/doctor-appointments'
              className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 text-white border-teal-400 shadow-lg shadow-teal-500/30 scale-[1.02]' 
                  : 'text-teal-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-teal-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-teal-900/60 text-teal-200 border-teal-500/30'}`}>📅</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Patient Queue</p>
                </>
              )}
            </NavLink>

            <NavLink 
              to='/doctor-profile'
              className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white border-purple-400 shadow-lg shadow-purple-500/30 scale-[1.02]' 
                  : 'text-purple-100 bg-white/5 hover:bg-white/15 hover:text-white border-white/10 hover:border-purple-400 shadow-sm'
              }`} 
            >
              {({isActive}) => (
                <>
                  <span className={`text-sm p-1 rounded-lg shrink-0 border shadow-2xs ${isActive ? 'bg-white/20 text-white border-white/40' : 'bg-purple-900/60 text-purple-200 border-purple-500/30'}`}>👤</span>
                  <p className='hidden md:block tracking-wide font-extrabold'>Profile Settings</p>
                </>
              )}
            </NavLink>

          </nav>
        )}

      </div>

      {/* Bottom Section: Telemetry Status & User Profile Card */}
      <div className='hidden md:flex flex-col gap-2.5 pt-2.5 border-t border-white/15 shrink-0 mt-auto'>
        
        {/* Network Telemetry Card */}
        <div className='bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20 space-y-1 shadow-md'>
          <div className='flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-emerald-300'>
            <span className='flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
              Telemetry Engine
            </span>
            <span className='text-white font-black'>100%</span>
          </div>
          <p className='text-[10px] font-bold text-indigo-200 truncate'>🏥 12 Units Active • Operational</p>
        </div>

        {/* User Role Card */}
        <div className='bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-2.5 rounded-xl text-white shadow-xl flex items-center gap-2.5 border-2 border-indigo-400/40'>
          <div className='w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md border border-white/30'>
            {aToken ? 'AD' : 'DOC'}
          </div>
          <div className='truncate'>
            <p className='text-xs font-black text-white truncate leading-tight'>{aToken ? 'System Admin' : 'Medical Specialist'}</p>
            <p className='text-[9.5px] text-emerald-300 font-bold truncate leading-tight mt-0.5'>CarePulse System Hub</p>
          </div>
        </div>

      </div>

    </aside>
  )
}

export default Sidebar
