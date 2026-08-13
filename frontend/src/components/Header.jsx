import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='space-y-4'>
      {/* 🚨 24/7 Hospital Emergency Ambulance & ICU Hotline Banner */}
      <div className='bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white rounded-2xl px-5 py-3 shadow-lg border border-rose-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-bold'>
        <div className='flex items-center gap-2.5'>
          <span className='w-3 h-3 rounded-full bg-rose-500 animate-ping inline-block'></span>
          <span className='text-rose-200 uppercase font-black tracking-wider text-[11px]'>🚨 24/7 Hospital Emergency Hotline:</span>
          <a href="tel:108" className='bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-lg font-mono font-black text-xs shadow-sm transition-all'>
            📞 Dial 108 (Ambulance)
          </a>
        </div>
        <div className='flex items-center gap-4 text-rose-100 text-[11px] font-extrabold'>
          <span>🚑 Trauma Unit: Active</span>
          <span className='hidden sm:inline'>•</span>
          <span className='text-amber-300'>🏥 ICU Beds Available: 14/20</span>
        </div>
      </div>

      <div className='flex flex-col md:flex-row bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl px-6 md:px-10 lg:px-16 shadow-xl shadow-indigo-200/50 overflow-hidden relative'>
      {/* Background Decorative Ambient Radial Glow */}
      <div className='absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none' />
      
      {/* -----------------Left Side Content------------------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 md:py-[8vw] z-10'>
        <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white text-xs font-medium tracking-wide shadow-sm'>
          <span>✨</span>
          <span>Healthcare Made Simple & Accessible</span>
        </div>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight md:leading-tight lg:leading-tight tracking-tight'>
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-indigo-100 text-sm font-light leading-relaxed'>
          <img className='w-28 drop-shadow-md' src={assets.group_profiles} alt="Profiles" />
          <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.</p>
        </div>
        <a href="#speciality" className='flex items-center gap-3 bg-white px-8 py-3.5 rounded-full text-indigo-600 text-sm font-semibold shadow-lg shadow-indigo-900/20 hover:scale-105 hover:bg-indigo-50 transition-all duration-300 group mt-2'>
          Book appointment 
          <img className='w-3.5 group-hover:translate-x-1 transition-transform' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* -----------------Right Side Hero Image------------------- */}
      <div className='md:w-1/2 relative flex items-end justify-center'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-b-2xl md:rounded-none max-w-lg object-contain drop-shadow-2xl' src={assets.header_img} alt="Hero Doctor" />
      </div>
      </div>
    </div>
  )
}

export default Header