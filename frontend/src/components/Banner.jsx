import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 mt-16 mb-4 shadow-xl shadow-indigo-100 overflow-hidden relative'>
      {/* Background Decorative Element */}
      <div className='absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />

      {/* --------------- Left side --------------- */}
      <div className='flex-1 py-10 sm:py-12 md:py-16 lg:py-24 lg:pl-5 z-10'>
        <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-white text-xs font-semibold mb-4 shadow-sm'>
          <span>🚀</span>
          <span>Fast & Easy Appointments</span>
        </div>
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight'>
          <p>Book Appointment </p>
          <p className='mt-2 text-indigo-100'>With 100+ Trusted Doctors</p>
        </div>
        <button 
          onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
          className='bg-white text-sm sm:text-base text-indigo-600 font-semibold px-8 py-3.5 rounded-full mt-8 shadow-lg hover:scale-105 hover:bg-indigo-50 transition-all duration-300 transform'
        >
          Create Account
        </button>
      </div>
      
      {/* --------------- Right side -------------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative flex items-end justify-center'>
        <img className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl' src={assets.appointment_img} alt="Banner Graphic" />
      </div>
    </div>
  )
}

export default Banner