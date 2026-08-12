import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  const handleNav = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='mt-6 border-t border-slate-200/80 bg-white/80 pt-12 pb-8 text-slate-600 w-full shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 mb-16 text-sm'>
          {/* ------------ Left Section ------------ */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-3 cursor-pointer group' onClick={() => handleNav('/')}>
              <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className='text-2xl font-black tracking-tight text-slate-900 leading-none'>
                Care<span className='text-indigo-600'>Pulse</span>
              </span>
            </div>
            <p className='w-full md:w-4/5 text-slate-600 leading-relaxed text-xs sm:text-sm font-medium'>
              CarePulse is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
            </p>
          </div>

          {/* ------------ Center Section ------------ */}
          <div>
            <h3 className='text-indigo-600 font-bold tracking-wider uppercase text-xs mb-4'>Company</h3>
            <ul className='flex flex-col gap-2.5 text-slate-600 font-medium text-xs sm:text-sm'>
              <li onClick={() => handleNav('/')} className='hover:text-indigo-600 cursor-pointer transition-colors'>Home</li>
              <li onClick={() => handleNav('/doctors')} className='hover:text-indigo-600 cursor-pointer transition-colors'>All Doctors</li>
              <li onClick={() => handleNav('/about')} className='hover:text-indigo-600 cursor-pointer transition-colors'>About us</li>
              <li onClick={() => handleNav('/contact')} className='hover:text-indigo-600 cursor-pointer transition-colors'>Contact us</li>
              <li onClick={() => handleNav('/careers')} className='hover:text-indigo-600 cursor-pointer transition-colors'>Careers</li>
            </ul>
          </div>

          {/* ------------ Right Section ------------ */}
          <div>
            <h3 className='text-indigo-600 font-bold tracking-wider uppercase text-xs mb-4'>Get In Touch</h3>
            <ul className='flex flex-col gap-2.5 text-slate-600 font-medium text-xs sm:text-sm'>
              <li className='hover:text-indigo-600 cursor-pointer transition-colors'>+91-7437886255</li>
              <li className='hover:text-indigo-600 cursor-pointer transition-colors'>rudrani@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* --------- Copyright text ------------- */}
        <div className='border-t border-slate-200/80 pt-6 text-center text-xs text-slate-400 font-medium flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p>Copyright © 2025 Rudrani - All Rights Reserved.</p>
          <div className='flex gap-4 text-slate-500'>
            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Terms of Service</span>
            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Privacy Statement</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer