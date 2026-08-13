import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors, currencySymbol } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDocs(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-slate-900'>
      <span className='px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider'>
        Recommendations
      </span>
      <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight'>Related Specialists</h1>
      <p className='sm:w-1/3 text-center text-sm text-slate-500 leading-relaxed'>
        Explore other trusted doctors in {speciality}.
      </p>

      <div className='w-full grid grid-cols-auto gap-6 pt-6 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div 
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
            key={index} 
            className='bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between'
          >
            <div className='bg-gradient-to-b from-indigo-100/90 via-slate-100/60 to-white group-hover:from-indigo-100 group-hover:to-indigo-50/50 transition-colors overflow-hidden relative aspect-[4/3.5] flex items-center justify-center p-2.5'>
              <img className='w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-sm bg-indigo-50/50' src={item.image} alt={item.name} />
              <div className='absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md border border-indigo-200/80 px-3 py-1 rounded-full text-xs font-extrabold text-indigo-700 shadow-md z-10'>
                {currencySymbol}{item.fees}
              </div>
            </div>

            <div className='p-5 flex flex-col gap-1.5'>
              <div className={`inline-flex items-center gap-2 text-xs font-semibold ${item.available ? 'text-emerald-600' : 'text-slate-400'}`}>
                <span className={`relative flex h-2 w-2`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.available ? 'bg-emerald-400' : 'bg-slate-400'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                </span>
                <span>{item.available ? 'Available Today' : 'Not Available'}</span>
              </div>
              
              <h2 className='text-slate-900 text-lg font-bold group-hover:text-indigo-600 transition-colors mt-0.5'>
                {item.name}
              </h2>
              <p className='text-slate-500 text-xs font-medium bg-slate-100 px-2.5 py-1 rounded-md w-max'>
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
        className='mt-8 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white px-10 py-3 rounded-full font-semibold shadow-sm transition-all duration-300 transform hover:-translate-y-0.5'
      >
        View All Doctors
      </button>
    </div>
  )
}

export default RelatedDoctors