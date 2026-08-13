import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from "../context/AppContext"
import { specialityData } from '../assets/assets'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [otherDocs, setOtherDocs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  const sortOptions = [
    { key: 'default', label: 'Recommended', icon: '✨' },
    { key: 'price-asc', label: 'Fee: Low to High', icon: '💲' },
    { key: 'price-desc', label: 'Fee: High to Low', icon: '💎' },
    { key: 'name', label: 'Name: A to Z', icon: '🔤' }
  ]

  const [showAll, setShowAll] = useState(false)

  // Display limited 8 doctors initially or all based on showAll toggle
  const visibleDoctors = showAll ? filterDoc : filterDoc.slice(0, 8)

  const [showFilter, setShowFilter] = useState(false)

  // Helper to count doctors in a department safely
  const getDeptCount = (deptName) => {
    return doctors.filter(d => d.speciality.toLowerCase().trim() === deptName.toLowerCase().trim()).length
  }

  useEffect(() => {
    let result = [...doctors]

    // 1. Filter by Speciality if selected
    if (speciality) {
      result = doctors.filter(doc => doc.speciality.toLowerCase().trim() === speciality.toLowerCase().trim())
      // Recommendations from other specialities to keep the page full
      setOtherDocs(doctors.filter(doc => doc.speciality.toLowerCase().trim() !== speciality.toLowerCase().trim()).slice(0, 4))
    } else {
      setOtherDocs([])
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== '') {
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 3. Filter by Availability
    if (onlyAvailable) {
      result = result.filter(doc => doc.available)
    }

    // 4. Apply Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.fees - b.fees)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.fees - a.fees)
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilterDoc(result)
  }, [doctors, speciality, searchQuery, sortBy, onlyAvailable])

  return (
    <div className='py-4 min-h-[80vh]'>
      {/* Attractive Top "Find Your Doctor" Hero Banner */}
      <div className='bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-indigo-200/60 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6'>
        <div className='absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none' />
        <div className='absolute top-0 right-1/3 w-48 h-48 bg-violet-400/20 rounded-full blur-xl pointer-events-none' />
        
        {/* Banner Left Content */}
        <div className='z-10 text-center lg:text-left flex-1'>
          <div className='flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3'>
            <span className='px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider border border-white/30'>
              👨‍⚕️ Top Rated Medical Experts
            </span>
            <span className='px-3 py-1 rounded-full bg-emerald-400/30 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider border border-emerald-300/40 text-emerald-100 flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
              100% Verified Specialists
            </span>
          </div>

          <h1 className='text-3xl sm:text-4xl font-black tracking-tight leading-tight'>
            {speciality ? `${speciality} Specialists` : 'Find & Book Specialist Doctors'}
          </h1>
          
          <p className='text-indigo-100 text-xs sm:text-sm mt-2 max-w-2xl font-medium leading-relaxed'>
            Book direct consultations with board-certified physicians, cardiologists, neurologists, and pediatricians acrossCarePulse health network.
          </p>

          {/* Banner Attractive Key Highlights */}
          <div className='mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 border-t border-white/15 text-xs font-bold text-indigo-100'>
            <span className='flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm'>
              <span>⭐</span> 4.9/5 Rating (12k+ Reviews)
            </span>
            <span className='flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm'>
              <span>⚡</span> 15-Min Instant Booking
            </span>
            <span className='flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm'>
              <span>🔒</span> Zero Booking Fee
            </span>
          </div>
        </div>

        {/* Banner Right Stats */}
        <div className='z-10 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-5 text-center min-w-44 shadow-2xl flex flex-col gap-1 shrink-0'>
          <p className='text-xs font-bold text-indigo-100 uppercase tracking-wider'>Active Doctors</p>
          <p className='text-3xl font-black text-white'>{filterDoc.length}</p>
          <span className='text-[10px] text-emerald-300 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-full mt-1 border border-emerald-400/30'>
            🟢 Available for Booking
          </span>
        </div>
      </div>

      {/* 12 Departments Grid (With Mobile Toggle Button) */}
      <div className='mb-6 bg-white border-2 border-indigo-200/90 rounded-3xl p-5 shadow-lg shadow-slate-200/60'>
        <div className='flex items-center justify-between mb-4 pb-3 border-b border-slate-100'>
          <div className='flex items-center gap-2'>
            <span className='w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping' />
            <h2 className='text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider'>
              Select Department ({specialityData.length})
            </h2>
          </div>
          <div className='flex items-center gap-2'>
            <button 
              onClick={() => setShowFilter(prev => !prev)} 
              className='sm:hidden text-xs font-extrabold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-full border border-indigo-200 transition-colors shadow-sm'
            >
              {showFilter ? 'Hide Filters ✕' : 'Filter Depts 🔍'}
            </button>
            {speciality && (
              <button 
                onClick={() => navigate('/doctors')} 
                className='text-xs font-extrabold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200/80 transition-colors shadow-sm'
              >
                Clear ✕
              </button>
            )}
          </div>
        </div>

        {/* 12 Departments Responsive Grid (Toggleable on Mobile) */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 ${showFilter ? 'flex flex-col sm:grid' : 'hidden sm:grid'}`}>
          {specialityData.map((item, index) => {
            const isSelected = speciality?.toLowerCase().trim() === item.speciality.toLowerCase().trim()
            const deptCount = getDeptCount(item.speciality)

            return (
              <div
                key={index}
                onClick={() => isSelected ? navigate('/doctors') : navigate(`/doctors/${item.speciality}`)}
                className={`p-3 rounded-2xl border-2 font-bold text-xs cursor-pointer transition-all duration-300 flex items-center gap-2.5 shadow-sm hover:-translate-y-1 ${
                  isSelected 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 font-extrabold scale-105" 
                    : "bg-white text-slate-700 border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center p-1.5 transition-colors shrink-0 ${isSelected ? 'bg-white/20' : 'bg-indigo-50'}`}>
                  <img className='w-full h-full object-contain' src={item.image} alt={item.speciality} />
                </div>
                <div className='flex flex-col truncate'>
                  <span className='truncate'>{item.speciality}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>{deptCount} Doctor{deptCount !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modern Custom Search & Designed Sort Controls Toolbar */}
      <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-4 mb-8 shadow-lg shadow-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Search Input Box */}
        <div className='relative w-full md:w-80 flex items-center'>
          <span className='absolute left-4 text-indigo-500 text-sm'>🔍</span>
          <input 
            type="text" 
            placeholder="Search doctor by name or speciality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-8 py-2.5 bg-slate-50 border-2 border-slate-200/80 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-inner'
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className='absolute right-3 text-slate-400 hover:text-slate-600 text-xs font-extrabold bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center'>
              ✕
            </button>
          )}
        </div>

        {/* Designed Controls: Available Today Checkbox + Custom Designed Sort Dropdown */}
        <div className='flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end relative'>
          {/* Reverted Available Today Only Checkbox */}
          <label className='flex items-center gap-2 cursor-pointer bg-slate-50 border-2 border-slate-200/90 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 hover:border-indigo-400 hover:bg-white transition-all shadow-sm'>
            <input 
              type="checkbox" 
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className='w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer accent-indigo-600'
            />
            <span className='flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse'></span>
              Available Today Only
            </span>
          </label>

          {/* Designed Interactive Custom Sort Dropdown */}
          <div className='relative'>
            <button 
              onClick={() => setIsSortOpen(prev => !prev)}
              className='bg-gradient-to-r from-indigo-50 to-slate-50 border-2 border-indigo-200/90 hover:border-indigo-600 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-indigo-700 shadow-sm flex items-center gap-2.5 transition-all cursor-pointer'
            >
              <span className='bg-indigo-600 text-white w-5 h-5 rounded-lg flex items-center justify-center text-[10px]'>↕️</span>
              <span className='text-slate-500 font-bold'>Sort:</span>
              <span className='text-slate-900 font-black'>{sortOptions.find(o => o.key === sortBy)?.label}</span>
              <span className={`text-[10px] text-indigo-600 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Floating Glassmorphic Sort Menu */}
            {isSortOpen && (
              <div className='absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl border-2 border-indigo-200 rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in duration-200'>
                <div className='px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1'>
                  Select Sort Order
                </div>
                {sortOptions.map((option) => (
                  <div 
                    key={option.key}
                    onClick={() => { setSortBy(option.key); setIsSortOpen(false); }}
                    className={`px-4 py-2.5 text-xs font-extrabold cursor-pointer transition-all flex items-center justify-between ${
                      sortBy === option.key 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    <div className='flex items-center gap-2'>
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                    {sortBy === option.key && <span className='text-xs'>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Width Doctor Cards Grid (4 Columns) */}
      <div>
        {filterDoc.length > 0 ? (
          <div className='space-y-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {visibleDoctors.map((item, index) => (
                <div 
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                  key={index} 
                  className='bg-white border-2 border-indigo-200/90 hover:border-indigo-600 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-2.5 transition-all duration-300 group flex flex-col justify-between relative'
                >
                <div className='bg-gradient-to-b from-indigo-100/90 via-slate-100/60 to-white group-hover:from-indigo-100 group-hover:to-indigo-50/50 transition-colors overflow-hidden relative aspect-[4/3.5] flex items-center justify-center p-2'>
                  <img className='w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-sm bg-indigo-50/50' src={item.image} alt={item.name} />
                  <div className='absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-indigo-200/80 px-3 py-1 rounded-full text-xs font-extrabold text-indigo-700 shadow-md z-10'>
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

                    {/* Clinic Address Preview */}
                    {item.address && (
                      <div className='mt-2 pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-0.5'>
                        <p className='font-bold text-slate-800 flex items-center justify-between text-[11px]'>
                          <span>📍 Clinic Address:</span>
                          <span className='text-[10px] text-indigo-600 font-extrabold underline'>Map ↗</span>
                        </p>
                        <p className='truncate text-slate-500 text-[11px]'>{item.address.line1}, {item.address.line2}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 🔘 TOGGLE SHOW MORE / SHOW LESS BUTTON */}
            {filterDoc.length > 8 && (
              <div className='flex justify-center pt-2'>
                <button
                  onClick={() => setShowAll(!showAll)}
                  className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-500/25 border-2 border-indigo-400 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2'
                >
                  <span>{showAll ? '👆 SHOW FEWER DOCTORS' : `👇 VIEW ALL DOCTORS (${filterDoc.length})`}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='py-16 text-center bg-white border-2 border-indigo-200/80 rounded-3xl shadow-xl p-8 flex flex-col items-center gap-4'>
            <div className='w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-3xl'>
              🔍
            </div>
            <h3 className='text-xl font-extrabold text-slate-900'>No Doctors Found</h3>
            <p className='text-slate-500 text-sm max-w-md font-medium'>
              No doctors match your filter criteria. Try clearing search filters or selecting another department.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setOnlyAvailable(false); navigate('/doctors') }} 
              className='mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md shadow-indigo-200 transition-all'
            >
              Reset Filters & View All Doctors
            </button>
          </div>
        )}
      </div>

      {/* Recommended Doctors Section (Fills Page Space if Filter Has Few Doctors) */}
      {speciality && otherDocs.length > 0 && (
        <div className='mt-14 pt-10 border-t-2 border-slate-200/80'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <span className='px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider'>
                Recommended
              </span>
              <h3 className='text-xl font-extrabold text-slate-900 mt-2'>
                Explore Doctors in Other Specialities
              </h3>
            </div>
            <button 
              onClick={() => navigate('/doctors')}
              className='text-xs font-bold text-indigo-600 hover:text-indigo-800'
            >
              View All {doctors.length} Doctors →
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {otherDocs.map((item, index) => (
              <div 
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                key={index} 
                className='bg-white border-2 border-indigo-200/90 hover:border-indigo-600 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-2.5 transition-all duration-300 group flex flex-col justify-between relative'
              >
                <div className='bg-gradient-to-b from-indigo-100/80 via-indigo-50/50 to-white group-hover:from-indigo-100 group-hover:to-indigo-50 transition-colors overflow-hidden relative pt-2'>
                  <img className='w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
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

                  {/* Clinic Address & Direction Link */}
                  {item.address && (
                    <div className='mt-2 pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-0.5'>
                      <p className='font-bold text-slate-800 flex items-center justify-between text-[11px]'>
                        <span>📍 Clinic Address:</span>
                        <span className='text-[10px] text-indigo-600 font-extrabold underline'>Map ↗</span>
                      </p>
                      <p className='truncate text-slate-500 text-[11px]'>{item.address.line1}, {item.address.line2}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Doctors