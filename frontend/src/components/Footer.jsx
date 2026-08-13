import React from 'react'
import { useNavigate } from 'react-router-dom'

import { assets } from '../assets/assets'

const Footer = () => {
  const navigate = useNavigate()

  const handleNav = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='mt-8 border-t border-slate-200/90 bg-white/95 backdrop-blur-xl pb-8 text-slate-600 w-full shadow-inner relative overflow-hidden'>
      {/* Top Colorful Accent Line matching Navbar */}
      <div className='h-1 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-8'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-sm'>
          
          {/* ------------ Column 1: Brand & Logo ------------ */}
          <div className='flex flex-col gap-4 md:col-span-2'>
            <div className='flex items-center gap-3 cursor-pointer group' onClick={() => handleNav('/')}>
              <div className='w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all shrink-0'>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className='flex flex-col'>
                <span className='text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none group-hover:text-indigo-600 transition-colors'>
                  Care<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>Pulse</span>
                </span>
                <span className='text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400 leading-tight mt-0.5'>Medical Care Network</span>
              </div>
            </div>
            <p className='w-full md:w-4/5 text-slate-600 leading-relaxed text-xs sm:text-sm font-medium'>
              CarePulse Medical Care Network is committed to excellence in digital healthcare. Connect with top verified specialists, schedule fast-track consultations, and access instant digital prescriptions seamlessly.
            </p>
          </div>

          {/* ------------ Column 2: Quick Links (Matched with Navbar) ------------ */}
          <div>
            <h3 className='text-indigo-600 font-extrabold tracking-wider uppercase text-xs mb-4 flex items-center gap-1.5'>
              <span>🔗</span> Quick Links
            </h3>
            <ul className='flex flex-col gap-2.5 text-slate-600 font-bold text-xs sm:text-sm'>
              <li onClick={() => handleNav('/')} className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>🏠</span> Home</li>
              <li onClick={() => handleNav('/doctors')} className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>👨‍⚕️</span> All Doctors</li>
              <li onClick={() => handleNav('/my-appointments')} className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>📅</span> My Appointments</li>
              <li onClick={() => handleNav('/my-records')} className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>📂</span> Health Vault & Rx</li>
              <li onClick={() => handleNav('/about')} className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>ℹ️</span> About Us</li>
              <li onClick={() => handleNav('/careers')} className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>💼</span> Careers & HR</li>
            </ul>
          </div>

          {/* ------------ Column 3: Contact & Emergency Support ------------ */}
          <div>
            <h3 className='text-indigo-600 font-extrabold tracking-wider uppercase text-xs mb-4 flex items-center gap-1.5'>
              <span>📞</span> Contact & Emergency
            </h3>
            <ul className='flex flex-col gap-2.5 text-slate-600 font-bold text-xs sm:text-sm'>
              <li onClick={() => handleNav('/contact')} className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>📍</span> Medical Center HQ</li>
              <li className='text-slate-700 font-mono font-extrabold flex items-center gap-1.5'><span>🚨</span> Emergency Hotline: 108</li>
              <li className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>📞</span> +91-7437886255</li>
              <li className='hover:text-indigo-600 cursor-pointer transition-colors flex items-center gap-1.5'><span>✉️</span> support@carepulse.com</li>
            </ul>
          </div>

        </div>

        {/* --------- Copyright text ------------- */}
        <div className='border-t border-slate-200/90 pt-6 text-center text-xs text-slate-400 font-bold flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p>© {new Date().getFullYear()} CarePulse Medical Network. All Rights Reserved.</p>
          <div className='flex gap-4 text-slate-500 font-semibold'>
            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Terms of Service</span>
            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Privacy Statement</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer