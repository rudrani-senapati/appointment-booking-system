import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  const { currency } = useContext(AppContext)
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [showAllDoctors, setShowAllDoctors] = useState(false)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const departments = [
    'All', 
    'General physician', 
    'Gynecologist', 
    'Dermatologist', 
    'Pediatricians', 
    'Neurologist', 
    'Gastroenterologist', 
    'Orthopedic', 
    'Cardiologist', 
    'Dentist', 
    'Ophthalmologist', 
    'Pulmonologist', 
    'ENT Specialist'
  ]

  const filteredDoctors = doctors.filter(doc => {
    const matchesDept = selectedDept === 'All' || doc.speciality.toLowerCase().trim() === selectedDept.toLowerCase().trim()
    const matchesSearch = searchQuery.trim() === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDept && matchesSearch
  })

  // Visible doctors based on showAllDoctors toggle (initial 8 visible for complete 4-col rows)
  const visibleDoctors = showAllDoctors ? filteredDoctors : filteredDoctors.slice(0, 8)

  return (
    <div className='w-full max-w-7xl mx-auto space-y-8 pb-0'>
      
      {/* 1. Restored Previous Dark Hero Banner */}
      <div className='bg-gradient-to-r from-indigo-950 via-purple-900 to-rose-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-indigo-500/20'>
        
        {/* Glow Spheres */}
        <div className='absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-20 top-0 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-3 z-10 max-w-2xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-indigo-300/30 text-indigo-200 font-extrabold rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            👨‍⚕️ Medical Specialist Directory
          </div>
          <h1 className='text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight'>
            Care<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400'>Pulse</span> Doctors Roster
          </h1>
          <p className='text-xs sm:text-sm text-indigo-100/90 font-medium leading-relaxed'>
            Review certified medical practitioners, manage real-time appointment availability toggles, set consultation fees in ₹, and register new specialists.
          </p>

          <div className='pt-2 flex flex-wrap items-center gap-3'>
            <button 
              onClick={() => navigate('/add-doctor')}
              className='px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2'
            >
              <span>➕ Add Specialist</span>
            </button>
            <span className='px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs backdrop-blur-md'>
              Total: {doctors.length} Doctors Listed
            </span>
          </div>
        </div>

        <div className='hidden lg:flex shrink-0 z-10 items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md text-center space-y-1'>
          <div>
            <p className='text-3xl font-black text-emerald-400'>{doctors.filter(d => d.available).length}</p>
            <p className='text-xs font-black text-indigo-200 uppercase tracking-wider'>Available Now</p>
            <p className='text-[10px] text-pink-200 font-extrabold mt-0.5'>🟢 Live Booking Slots</p>
          </div>
        </div>

      </div>

      {/* 2. Sleek Department Filter & Search Section (Full Names, Zero Truncation!) */}
      <div className='bg-white p-6 rounded-3xl border-2 border-indigo-200/90 shadow-xl shadow-indigo-100/50 space-y-5'>
        
        {/* Header Bar */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-100/80'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center text-xl font-bold shrink-0 shadow-2xs'>
              🏥
            </div>
            <div>
              <h2 className='text-lg font-black text-slate-900 tracking-tight flex items-center gap-2'>
                <span>Filter Specialists by Department</span>
                <span className='w-2 h-2 rounded-full bg-indigo-600'></span>
              </h2>
              <p className='text-xs text-slate-500 font-medium'>Select medical department to view doctor roster</p>
            </div>
          </div>
          
          {/* Search Box */}
          <div className='relative w-full md:w-80 flex items-center'>
            <span className='absolute left-3.5 text-indigo-500 text-sm'>🔍</span>
            <input 
              type="text" 
              placeholder="Search doctor by name or speciality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-9 py-2.5 bg-slate-50 border-2 border-slate-200/80 rounded-2xl text-xs font-extrabold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-2xs'
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className='absolute right-3.5 text-slate-400 hover:text-slate-700 text-xs font-black'>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Fluid Flex-Wrap Category Pills (Full Department Names, Zero Truncation!) */}
        <div className='flex flex-wrap items-center gap-2.5 pt-1 w-full'>
          {departments.map((dept, idx) => {
            const isSelected = selectedDept === dept
            
            // Map speciality icons
            const getIcon = (d) => {
              if (d === 'All') return '🌐'
              if (d === 'General physician') return '🩺'
              if (d === 'Gynecologist') return '🤰'
              if (d === 'Dermatologist') return '🧴'
              if (d === 'Pediatricians') return '👶'
              if (d === 'Neurologist') return '🧠'
              if (d === 'Gastroenterologist') return '🥗'
              if (d === 'Orthopedic') return '🦴'
              if (d === 'Cardiologist') return '❤️'
              if (d === 'Dentist') return '🦷'
              if (d === 'Ophthalmologist') return '👁️'
              if (d === 'Pulmonologist') return '🫁'
              if (d === 'ENT Specialist') return '👂'
              return '🩺'
            }

            return (
              <button 
                key={idx}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer border-2 flex items-center gap-2 whitespace-nowrap ${
                  isSelected 
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-indigo-500 shadow-md shadow-purple-200 scale-105' 
                    : 'bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border-slate-200/80 hover:border-indigo-300 shadow-2xs'
                }`}
              >
                <span className='text-sm'>{getIcon(dept)}</span>
                <span>{dept}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Ultra-Premium Doctor Cards Grid */}
      <div className='space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {visibleDoctors.length > 0 ? (
            visibleDoctors.map((item, index) => (
              <div 
                key={index} 
                className='bg-white border-2 border-slate-200/90 hover:border-indigo-500 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative'
              >
                {/* Responsive Fit Photo Box */}
                <div className='bg-gradient-to-b from-indigo-100/90 via-purple-50/50 to-white group-hover:from-indigo-100 group-hover:to-indigo-50/50 transition-colors overflow-hidden relative aspect-[4/3.5] flex items-center justify-center p-2.5'>
                  <img className='w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-sm bg-indigo-50/50' src={item.image} alt={item.name} />
                  
                  {/* Fee Badge in ₹ */}
                  <div className='absolute top-4 right-4 bg-white/95 backdrop-blur-md border-2 border-indigo-200/90 px-3.5 py-1 rounded-full text-xs font-black text-indigo-700 shadow-md flex items-center gap-1 z-10'>
                    <span>{currency}{item.fees}</span>
                  </div>

                  {/* Rating / Experience Badge */}
                  <div className='absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-[10px] font-black text-amber-300 shadow-sm flex items-center gap-1 z-10'>
                    <span>⭐ 4.9</span>
                    <span>•</span>
                    <span className='text-white'>{item.experience}</span>
                  </div>
                </div>

                {/* Body */}
                <div className='p-5 space-y-3 flex-1 flex flex-col justify-between bg-white'>
                  <div className='space-y-2'>
                    {/* Availability Badge */}
                    <div className={`inline-flex items-center gap-2 text-xs font-extrabold px-3 py-1 rounded-full border ${
                      item.available 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-rose-50 text-rose-600 border-rose-200'
                    }`}>
                      <span className={`relative flex h-2 w-2`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.available ? 'bg-emerald-400' : 'bg-rose-400'} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      </span>
                      <span>{item.available ? 'Available Today' : 'Unavailable'}</span>
                    </div>

                    <h2 className='text-slate-900 text-base font-black group-hover:text-indigo-600 transition-colors leading-snug mt-1'>
                      {item.name}
                    </h2>

                    <div className='flex items-center gap-2'>
                      <span className='text-indigo-700 text-[11px] font-extrabold bg-indigo-50 border border-indigo-200/90 px-3 py-1 rounded-xl shadow-2xs'>
                        🩺 {item.speciality}
                      </span>
                    </div>

                    <p className='text-xs text-slate-500 font-bold'>
                      🎓 {item.degree} • {item.experience} Exp
                    </p>
                  </div>

                  {/* Availability Toggle Control Bar */}
                  <div className='pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2'>
                    <span className='text-xs font-black text-slate-700'>Booking Status</span>
                    <label className={`flex items-center gap-2 text-xs font-black cursor-pointer px-3.5 py-1.5 rounded-2xl border-2 transition-all ${
                      item.available 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                    }`}>
                      <input 
                        type="checkbox" 
                        onChange={() => changeAvailability(item._id)} 
                        checked={item.available}
                        className='accent-indigo-600 w-4 h-4 rounded cursor-pointer' 
                      />
                      <span>{item.available ? 'Active' : 'Offline'}</span>
                    </label>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full bg-white p-12 rounded-3xl border-2 border-indigo-200/90 text-center text-slate-400 text-xs font-medium space-y-3 shadow-md'>
              <div className='w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mx-auto'>
                🔍
              </div>
              <p className='text-slate-800 font-extrabold text-sm'>No doctors found for selected department or search query.</p>
              <button 
                onClick={() => { setSelectedDept('All'); setSearchQuery('') }} 
                className='bg-indigo-600 text-white px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-indigo-700 transition-all cursor-pointer'
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* 🔘 TOGGLE SHOW MORE / SHOW LESS BUTTON */}
        {filteredDoctors.length > 8 && (
          <div className='flex justify-center pt-4'>
            <button
              onClick={() => setShowAllDoctors(!showAllDoctors)}
              className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-500/25 border-2 border-indigo-400 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2'
            >
              <span>{showAllDoctors ? '👆 SHOW LESS DOCTORS' : `👇 VIEW ALL DOCTORS (${filteredDoctors.length})`}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default DoctorsList
