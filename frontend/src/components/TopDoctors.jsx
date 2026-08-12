import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-slate-900'>
      <span className='px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm border border-emerald-200/60'>
        Top Rated
      </span>
      <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm text-slate-600 font-medium leading-relaxed'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-auto gap-6 pt-8 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div 
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
            key={index} 
            className='bg-white border-2 border-indigo-200/90 hover:border-indigo-600 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-2.5 transition-all duration-300 group flex flex-col justify-between relative'
          >
            <div className='bg-gradient-to-b from-indigo-100/80 via-indigo-50/50 to-white group-hover:from-indigo-100 group-hover:to-indigo-50 transition-colors overflow-hidden relative pt-2'>
              <img className='w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
              <div className='absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-indigo-200/80 px-3 py-1 rounded-full text-xs font-extrabold text-indigo-700 shadow-md'>
                {currencySymbol}{item.fees}
              </div>
            </div>

            <div className='p-5 flex flex-col gap-2 bg-white'>
              <div className={`inline-flex items-center gap-2 text-xs font-bold ${item.available ? 'text-emerald-600' : 'text-slate-400'}`}>
                <span className={`relative flex h-2.5 w-2.5`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.available ? 'bg-emerald-400' : 'bg-slate-400'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${item.available ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                </span>
                <span>{item.available ? 'Available Today' : 'Not Available'}</span>
              </div>
              
              <h2 className='text-slate-900 text-lg font-extrabold group-hover:text-indigo-600 transition-colors mt-0.5'>
                {item.name}
              </h2>
              <p className='text-indigo-700 text-xs font-bold bg-indigo-50 border border-indigo-100/80 px-3 py-1 rounded-lg w-max shadow-sm'>
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
        className='mt-10 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border-2 border-indigo-200/80 px-10 py-3.5 rounded-full font-extrabold shadow-md hover:shadow-xl shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-0.5'
      >
        View All Doctors
      </button>
    </div>
  )
}

export default TopDoctors