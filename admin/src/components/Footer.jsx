import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Footer = () => {
  const navigate = useNavigate()
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const handleNav = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='w-full mt-6 text-slate-600 text-xs select-none'>
      <div className='bg-gradient-to-b from-white via-indigo-50/20 to-purple-50/20 rounded-3xl overflow-hidden border-2 border-indigo-200/80 shadow-lg shadow-indigo-100/50 space-y-5 pb-7'>
        {/* Top Colorful Accent Line matching Navbar */}
        <div className='h-1.5 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'></div>
        <div className='px-6 sm:px-7 space-y-5'>
        
        {/* Top Grid: Brand & Operational Info */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-start'>
          
          {/* Brand Column */}
          <div className='md:col-span-2 space-y-3'>
            <div className='flex items-center gap-3 cursor-pointer group' onClick={() => handleNav('/')}>
              <div className='w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300 shrink-0'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl font-black tracking-tight text-slate-900 leading-none'>
                  Care<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>Pulse</span>
                </span>
                <span className='text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400 leading-tight mt-0.5'>Healthcare Command Portal</span>
              </div>
              <span className='px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-black text-[10px] tracking-wider uppercase shadow-2xs ml-1'>
                {aToken ? 'Admin Hub' : 'Doctor Hub'}
              </span>
            </div>

            <p className='text-slate-600 text-xs font-semibold leading-relaxed max-w-md'>
              Enterprise Healthcare Operations & Specialist Dispatch Command. Powering real-time consultations, schedule rosters, and patient queue analytics across 18 medical units.
            </p>

            <div className='flex flex-wrap gap-2 pt-1'>
              <span className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border-2 border-emerald-200 font-extrabold text-[10px] flex items-center gap-1 shadow-2xs'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
                100% Systems Operational
              </span>
              <span className='px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border-2 border-indigo-200 font-extrabold text-[10px] shadow-2xs'>
                🔒 HIPAA Compliant
              </span>
              <span className='px-3 py-1 rounded-full bg-purple-50 text-purple-700 border-2 border-purple-200 font-extrabold text-[10px] shadow-2xs'>
                🇮🇳 Currency: ₹ INR
              </span>
            </div>
          </div>

          {/* Core Modules Column - MATCHED TO NAVBAR ROUTES */}
          <div className='space-y-2.5'>
            <p className='font-black text-slate-900 text-xs uppercase tracking-wider text-indigo-700'>
              Quick Navigation
            </p>
            <ul className='space-y-1.5 font-bold text-slate-600 text-[11px]'>
              {aToken && (
                <>
                  <li onClick={() => handleNav('/')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>🏠</span> Home
                  </li>
                  <li onClick={() => handleNav('/admin-dashboard')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>📊</span> Analytics Dashboard
                  </li>
                  <li onClick={() => handleNav('/all-appointments')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>📅</span> Appointments Roster
                  </li>
                  <li onClick={() => handleNav('/doctor-list')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>👨‍⚕️</span> Doctors Directory
                  </li>
                  <li onClick={() => handleNav('/departments')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>🏥</span> Clinical Units
                  </li>
                  <li onClick={() => handleNav('/career-applications')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>💼</span> HR Careers Portal
                  </li>
                </>
              )}

              {dToken && (
                <>
                  <li onClick={() => handleNav('/doctor-dashboard')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>📊</span> Doctor Dashboard
                  </li>
                  <li onClick={() => handleNav('/doctor-appointments')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>📅</span> Consultation Queue
                  </li>
                  <li onClick={() => handleNav('/doctor-profile')} className='hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1.5'>
                    <span>👤</span> Doctor Profile
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Command Support Column */}
          <div className='space-y-2.5'>
            <p className='font-black text-slate-900 text-xs uppercase tracking-wider text-indigo-700'>
              Command Support
            </p>
            <div className='space-y-1.5 text-[11px] font-bold text-slate-600'>
              <p>📞 Emergency: +91 1800-CARE-PULSE</p>
              <p>✉️ Support: admin@carepulse.health</p>
              <p>🏢 Centers: Mumbai • Bengaluru • Delhi</p>
              <p>⚡ Response Time: &lt; 15 Minutes</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className='pt-3.5 border-t border-indigo-100/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-bold text-slate-500'>
          <p>© {new Date().getFullYear()} CarePulse Healthcare Systems Inc. All rights reserved.</p>
          <div className='flex items-center gap-4 text-[10px] uppercase font-black tracking-wider text-indigo-600'>
            <span className='hover:text-indigo-800 transition-colors cursor-pointer'>Privacy Policy</span>
            <span>•</span>
            <span className='hover:text-indigo-800 transition-colors cursor-pointer'>Terms of Service</span>
            <span>•</span>
            <span className='hover:text-indigo-800 transition-colors cursor-pointer'>System Status</span>
          </div>
        </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
