import React, { useState } from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  const [showAll, setShowAll] = useState(false)
  const visibleSpecialities = showAll ? specialityData : specialityData.slice(0, 4)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-slate-900' id='speciality'>
      <span className='px-4 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm border border-indigo-200/60'>
        <span className='w-2 h-2 rounded-full bg-indigo-600 animate-pulse'></span> Featured Categories
      </span>
      <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm text-slate-600 font-medium leading-relaxed'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      
      <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-8 px-3 sm:px-0 transition-all duration-500'>
        {visibleSpecialities.map((item, index) => (
          <Link 
            onClick={() => scrollTo(0, 0)} 
            key={index} 
            to={`/doctors/${item.speciality}`}
            className='bg-white border-2 border-indigo-200/90 hover:border-indigo-600 rounded-3xl p-6 cursor-pointer shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-2.5 transition-all duration-300 group flex flex-col items-center justify-between text-center relative overflow-hidden'
          >
            {/* Decorative Top Accent Line */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 group-hover:scale-105 flex items-center justify-center p-3 mb-4 transition-all duration-300 shadow-md shadow-indigo-300/60'>
              <img className='w-12 sm:w-16 h-auto object-contain group-hover:scale-110 transition-transform duration-300' src={item.image} alt={item.speciality} />
            </div>
            
            <div className='flex flex-col items-center gap-2 w-full'>
              <h3 className='text-slate-900 text-base font-extrabold group-hover:text-indigo-600 transition-colors line-clamp-1'>
                {item.speciality}
              </h3>
              <span className='text-[11px] font-bold text-indigo-700 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-300 border border-indigo-100/80 shadow-sm'>
                Browse Doctors →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button 
        onClick={() => setShowAll(prev => !prev)}
        className='mt-8 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border-2 border-indigo-200/80 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5 group'
      >
        <span>{showAll ? 'Show Featured Only' : '✨ Surprise Me — Explore All Specialities'}</span>
        <span className='transition-transform group-hover:scale-125 font-bold'>{showAll ? '↑' : '✨'}</span>
      </button>
    </div>
  )
}

export default SpecialityMenu