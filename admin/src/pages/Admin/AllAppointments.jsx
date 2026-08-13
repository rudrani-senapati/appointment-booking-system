import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const filteredAppointments = appointments ? appointments.filter(item => 
    item.userData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.docData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.docData?.speciality?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage) || 1
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className='w-full max-w-7xl mx-auto space-y-6 pb-0 select-none'>
      
      {/* Executive Dark Hero Banner */}
      <div className='bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-indigo-500/20'>
        
        {/* Glow Spheres */}
        <div className='absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-2 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/20 text-pink-200 font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            📊 Hospital Appointments Roster
          </div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight'>
            All Patient Appointments Stream
          </h1>
          <p className='text-xs text-indigo-200/90 font-medium leading-relaxed'>
            Real-time consultation audit stream, patient scheduling roster, and specialist dispatch controls across 12 clinical units.
          </p>
        </div>

        {/* Live Counter Pill */}
        <div className='z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl shrink-0'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xl font-bold shadow-md'>
            📅
          </div>
          <div>
            <p className='text-xl font-black text-white leading-none'>{appointments.length}</p>
            <p className='text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1'>Total Bookings</p>
          </div>
        </div>

      </div>

      {/* Search & Filter Bar */}
      <div className='bg-white p-4 rounded-2xl border-2 border-indigo-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='relative w-full sm:w-80'>
          <input 
            type="text" 
            placeholder="Search Patient, Doctor or Department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all'
          />
          <span className='absolute left-3.5 top-3 text-slate-400 text-xs'>🔍</span>
        </div>
        <div className='flex items-center gap-2 text-xs font-bold text-slate-500 self-end sm:self-auto'>
          <span>Showing <span className='text-indigo-600 font-black'>{filteredAppointments.length}</span> of {appointments.length} Records</span>
        </div>
      </div>

      {/* Table Container */}
      <div className='bg-white border-2 border-indigo-200/80 rounded-3xl shadow-xl shadow-indigo-100/50 overflow-hidden'>
        
        {/* Dark Hero Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr] gap-4 py-4 px-6 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border-b-2 border-indigo-800/50 text-white text-xs font-black uppercase tracking-wider'>
          <p>#</p>
          <p>Patient Profile</p>
          <p>Age</p>
          <p>Slot Date & Time</p>
          <p>Specialist Doctor</p>
          <p>Fee</p>
          <p className='text-right'>Action</p>
        </div>

        {/* Appointment Rows */}
        <div className='divide-y divide-slate-100'>
          {paginatedAppointments.length > 0 ? (
            paginatedAppointments.map((item, index) => (
              <div key={index} className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr] gap-4 items-center py-4 px-6 hover:bg-gradient-to-r hover:from-indigo-50/60 hover:via-purple-50/40 hover:to-pink-50/20 transition-all duration-200 text-xs font-medium text-slate-700'>
                
                <p className='hidden sm:block font-black text-indigo-600 text-xs'>{(currentPage - 1) * itemsPerPage + index + 1}</p>

                {/* Patient Profile */}
                <div className='flex items-center gap-3 w-full sm:w-auto'>
                  <div className='relative shrink-0 w-8 h-8'>
                    <img className='w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500 shadow-xs bg-slate-100' src={item.userData.image} alt="" />
                    <span className='absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[6px] text-white font-bold'>✓</span>
                  </div>
                  <div>
                    <p className='font-black text-slate-900 text-sm tracking-tight'>{item.userData.name}</p>
                    <p className='text-[10px] text-slate-400 font-semibold sm:hidden'>Age: {calculateAge(item.userData.dob)} yrs</p>
                  </div>
                </div>

                {/* Age */}
                <p className='hidden sm:block font-extrabold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg w-fit text-[11px] border border-slate-200'>{calculateAge(item.userData.dob)} yrs</p>

                {/* Slot Date & Time */}
                <div className='w-full sm:w-auto space-y-0.5'>
                  <span className='px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-xs block w-fit shadow-2xs'>
                    📅 {slotDateFormat(item.slotDate)}
                  </span>
                  <span className='px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-extrabold text-xs block w-fit mt-1 shadow-2xs'>
                    ⏰ {item.slotTime}
                  </span>
                </div>

                {/* Doctor Profile */}
                <div className='flex items-center gap-2.5 w-full sm:w-auto'>
                  <img className='w-8 h-8 rounded-full object-cover ring-2 ring-purple-500 shrink-0 bg-slate-100 shadow-xs' src={item.docData.image} alt="" />
                  <div>
                    <p className='font-black text-slate-900 text-xs'>{item.docData.name}</p>
                    <span className='px-2 py-0.5 rounded-md bg-indigo-100/80 text-indigo-700 font-black text-[10px] border border-indigo-200/60 inline-block mt-0.5'>🩺 {item.docData.speciality}</span>
                  </div>
                </div>

                {/* Fee Capsule */}
                <div className='px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-2 border-emerald-300 shadow-2xs text-center min-w-[70px] w-full sm:w-auto'>
                  <span className='text-[9px] text-emerald-600 font-black uppercase block leading-none'>FEE</span>
                  <span className='font-black text-sm text-emerald-900 leading-tight block'>{currency}{item.amount}</span>
                </div>

                {/* Action Buttons with 2px Border */}
                <div className='sm:text-right w-full sm:w-auto'>
                  {item.cancelled ? (
                    <span className='px-4 py-2 bg-rose-50 text-rose-700 text-xs font-black rounded-xl border-2 border-rose-300 uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5'>
                      <span>✕</span> Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border-2 border-emerald-300 uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5'>
                      <span>✓</span> Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-black transition-all duration-200 cursor-pointer shadow-md shadow-rose-500/20 border-2 border-rose-400 inline-flex items-center gap-1.5 hover:scale-[1.02]'
                      title="Cancel Appointment"
                    >
                      <span>✕</span> Cancel
                    </button>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className='p-12 text-center text-slate-400 text-xs font-medium'>
              No matching patient appointment records found.
            </div>
          )}
        </div>

      </div>

      {/* Clean Pagination Bar */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-indigo-200/80 shadow-md text-xs font-black'>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className='px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'
          >
            ← Previous Page
          </button>
          
          <div className='flex items-center gap-2'>
            <span>Page <span className='text-indigo-600 font-extrabold'>{currentPage}</span> of {totalPages}</span>
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className='px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'
          >
            Next Page →
          </button>
        </div>
      )}

    </div>
  )
}

export default AllAppointments
