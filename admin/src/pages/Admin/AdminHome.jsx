import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
  const { aToken, doctors, getAllDoctors, dashData, getDashData, changeAvailability } = useContext(AdminContext)
  const { currency } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashData()
      getAllDoctors()
    }
  }, [aToken])

  const specialities = [
    { name: 'General physician', icon: '🩺', color: 'from-cyan-500 to-blue-600', text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
    { name: 'Gynecologist', icon: '🤰', color: 'from-pink-500 to-rose-600', text: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' },
    { name: 'Dermatologist', icon: '🧴', color: 'from-purple-500 to-indigo-600', text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    { name: 'Pediatricians', icon: '👶', color: 'from-amber-400 to-orange-500', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { name: 'Neurologist', icon: '🧠', color: 'from-indigo-600 to-violet-600', text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { name: 'Gastroenterologist', icon: '🥗', color: 'from-emerald-500 to-teal-600', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { name: 'Cardiologist', icon: '❤️', color: 'from-rose-600 to-red-600', text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
    { name: 'Orthopedic', icon: '🦴', color: 'from-blue-600 to-sky-600', text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { name: 'Ophthalmologist', icon: '👁️', color: 'from-teal-500 to-emerald-600', text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' },
    { name: 'ENT Specialist', icon: '👂', color: 'from-orange-500 to-amber-600', text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    { name: 'Dentist', icon: '🦷', color: 'from-sky-500 to-cyan-600', text: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
    { name: 'Pulmonologist', icon: '🫁', color: 'from-fuchsia-500 to-purple-600', text: 'text-fuchsia-600', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200' }
  ]

  return (
    <div className='w-full max-w-7xl mx-auto space-y-8 pb-0'>

      {/* 1. CarePulse Executive Hero Banner */}
      <div className='bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-indigo-500/20'>
        
        {/* Glow Effects */}
        <div className='absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-3 z-10 max-w-2xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-indigo-300/30 text-indigo-200 font-extrabold rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            Central Hospital Administration Hub
          </div>
          <h1 className='text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight'>
            Welcome to Care<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400'>Pulse</span> Admin
          </h1>
          <p className='text-xs sm:text-sm text-indigo-100/90 font-medium leading-relaxed'>
            Manage medical specialists across all 12 departments, oversee live patient booking streams, review hospital analytics, and maintain service delivery.
          </p>

          <div className='pt-2 flex flex-wrap items-center gap-3'>
            <button 
              onClick={() => navigate('/add-doctor')}
              className='px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2'
            >
              <span>➕ Add Specialist</span>
            </button>
            <button 
              onClick={() => navigate('/admin-dashboard')}
              className='px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md'
            >
              <span>📊 View Analytics</span>
            </button>
          </div>
        </div>

        <div className='hidden lg:flex shrink-0 z-10 items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md'>
          <div className='text-center space-y-1'>
            <span className='text-4xl'>🏥</span>
            <p className='text-xs font-black text-indigo-200 uppercase tracking-wider'>CarePulse Engine</p>
            <p className='text-[10px] text-emerald-400 font-extrabold'>🟢 100% Operational</p>
          </div>
        </div>

      </div>

      {/* 2. Executive Stat Cards Grid */}
      {dashData && (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          <div onClick={() => navigate('/doctor-list')} className='bg-white p-6 rounded-3xl border-2 border-indigo-100 shadow-xl shadow-indigo-100/40 flex items-center gap-4 hover:scale-[1.02] transition-all cursor-pointer group'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-300 shrink-0 group-hover:scale-110 transition-transform'>
              👨‍⚕️
            </div>
            <div>
              <p className='text-3xl font-black text-slate-900'>{dashData.doctors}</p>
              <p className='text-xs font-black text-indigo-600 uppercase tracking-wider mt-0.5'>Active Doctors</p>
            </div>
          </div>

          <div onClick={() => navigate('/all-appointments')} className='bg-white p-6 rounded-3xl border-2 border-purple-100 shadow-xl shadow-purple-100/40 flex items-center gap-4 hover:scale-[1.02] transition-all cursor-pointer group'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-300 shrink-0 group-hover:scale-110 transition-transform'>
              📅
            </div>
            <div>
              <p className='text-3xl font-black text-slate-900'>{dashData.appointments}</p>
              <p className='text-xs font-black text-purple-600 uppercase tracking-wider mt-0.5'>Total Bookings</p>
            </div>
          </div>

          <div className='bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-xl shadow-emerald-100/40 flex items-center gap-4 hover:scale-[1.02] transition-all'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-300 shrink-0'>
              👤
            </div>
            <div>
              <p className='text-3xl font-black text-slate-900'>{dashData.patients}</p>
              <p className='text-xs font-black text-emerald-600 uppercase tracking-wider mt-0.5'>Registered Patients</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Medical Specialities / Departments Grid */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2'>
              <span>🏥</span> Hospital Speciality Departments
            </h2>
            <p className='text-xs text-slate-500 font-medium mt-0.5'>All 12 medical departments operating on CarePulse</p>
          </div>
          <button 
            onClick={() => navigate('/add-doctor')}
            className='text-xs font-black text-indigo-600 hover:text-indigo-700 cursor-pointer uppercase tracking-wider bg-indigo-50 hover:bg-indigo-100 px-4 py-1.5 rounded-full border border-indigo-200 transition-all'
          >
            + Add Specialist
          </button>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5'>
          {specialities.map((spec, index) => {
            const count = doctors ? doctors.filter(d => d.speciality === spec.name).length : 0
            return (
              <div 
                key={index}
                onClick={() => navigate('/doctor-list')}
                className={`bg-white p-4 rounded-2xl border-2 ${spec.border} shadow-xs hover:shadow-xl hover:scale-105 transition-all cursor-pointer text-center group`}
              >
                <div className={`w-11 h-11 mx-auto rounded-2xl bg-gradient-to-tr ${spec.color} text-white flex items-center justify-center text-xl font-bold shadow-md group-hover:rotate-6 transition-transform`}>
                  {spec.icon}
                </div>
                <p className='text-xs font-black text-slate-900 mt-2.5 truncate'>{spec.name}</p>
                <p className={`text-[10px] font-extrabold ${spec.text} mt-0.5`}>{count} Doctors</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 4. Doctors Roster Showcase */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2'>
              <span>👨‍⚕️</span> Active Doctors Roster
            </h2>
            <p className='text-xs text-slate-500 font-medium mt-0.5'>Review doctor availability and profile details</p>
          </div>
          <button 
            onClick={() => navigate('/doctor-list')}
            className='text-xs font-black text-indigo-600 hover:text-indigo-700 cursor-pointer uppercase tracking-wider bg-indigo-50 hover:bg-indigo-100 px-4 py-1.5 rounded-full border border-indigo-200 transition-all'
          >
            View All ({doctors ? doctors.length : 0}) →
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {doctors && doctors.slice(0, 8).map((doc, index) => (
            <div 
              key={index} 
              className='bg-white border-2 border-slate-200/90 hover:border-indigo-500 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative'
            >
              {/* Photo Box */}
              <div className='bg-gradient-to-b from-indigo-100/90 via-purple-50/50 to-white group-hover:from-indigo-100 group-hover:to-indigo-50 transition-colors overflow-hidden relative pt-3'>
                <img className='w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500' src={doc.image} alt={doc.name} />
                
                {/* Fee Badge */}
                <div className='absolute top-3 right-3 bg-white/95 backdrop-blur-md border-2 border-indigo-200/90 px-3.5 py-1 rounded-full text-xs font-black text-indigo-700 shadow-md flex items-center gap-1'>
                  <span>{currency}{doc.fees}</span>
                </div>

                {/* Rating / Experience Badge */}
                <div className='absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-[10px] font-black text-amber-300 shadow-sm flex items-center gap-1'>
                  <span>⭐ 4.9</span>
                  <span>•</span>
                  <span className='text-white'>{doc.experience}</span>
                </div>
              </div>

              {/* Body */}
              <div className='p-5 space-y-3 flex-1 flex flex-col justify-between bg-white'>
                <div className='space-y-2'>
                  {/* Availability Badge */}
                  <div className={`inline-flex items-center gap-2 text-xs font-extrabold px-3 py-1 rounded-full border ${
                    doc.available 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-600 border-rose-200'
                  }`}>
                    <span className={`relative flex h-2 w-2`}>
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${doc.available ? 'bg-emerald-400' : 'bg-rose-400'} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${doc.available ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    </span>
                    <span>{doc.available ? 'Available Today' : 'Unavailable'}</span>
                  </div>

                  <h2 className='text-slate-900 text-base font-black group-hover:text-indigo-600 transition-colors leading-snug mt-1'>
                    {doc.name}
                  </h2>

                  <div className='flex items-center gap-2'>
                    <span className='text-indigo-700 text-[11px] font-extrabold bg-indigo-50 border border-indigo-200/90 px-3 py-1 rounded-xl shadow-2xs'>
                      🩺 {doc.speciality}
                    </span>
                  </div>

                  <p className='text-xs text-slate-500 font-bold'>
                    🎓 {doc.degree} • {doc.experience} Exp
                  </p>
                </div>

                {/* Availability Toggle Control Bar */}
                <div className='pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2'>
                  <span className='text-xs font-black text-slate-700'>Booking Status</span>
                  <label className={`flex items-center gap-2 text-xs font-black cursor-pointer px-3.5 py-1.5 rounded-2xl border-2 transition-all ${
                    doc.available 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                      : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                  }`}>
                    <input 
                      type="checkbox" 
                      onChange={() => changeAvailability(doc._id)} 
                      checked={doc.available}
                      className='accent-indigo-600 w-4 h-4 rounded cursor-pointer' 
                    />
                    <span>{doc.available ? 'Active' : 'Offline'}</span>
                  </label>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AdminHome
