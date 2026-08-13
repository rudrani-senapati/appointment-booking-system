import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointment = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [showAllAppointments, setShowAllAppointments] = useState(false)

  // Prescription modal state
  const [selectedApptForRx, setSelectedApptForRx] = useState(null)
  const [rxForm, setRxForm] = useState({
    diagnosis: '',
    medicines: '',
    notes: '',
    meetingLink: ''
  })

  const handleRxSubmit = async (e) => {
    e.preventDefault()
    if (!selectedApptForRx) return

    const prescriptionObj = {
      diagnosis: rxForm.diagnosis,
      medicines: rxForm.medicines,
      notes: rxForm.notes,
      createdAt: new Date().toISOString()
    }

    await completeAppointment(selectedApptForRx._id, prescriptionObj, rxForm.meetingLink)
    setSelectedApptForRx(null)
    setRxForm({ diagnosis: '', medicines: '', notes: '', meetingLink: '' })
  }


  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  // Helper to safely format Age without NaN
  const getAgeText = (dob) => {
    if (!dob) return 'N/A'
    const age = calculateAge(dob)
    if (!age || age === 'NaN' || isNaN(age)) return 'N/A'
    return `${age} yrs`
  }

  const sortedAppointments = appointments ? [...appointments].reverse() : []

  // Filter logic based on search & status pill
  const filteredAppointments = sortedAppointments.filter(item => {
    const matchesSearch = item.userData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.payment ? 'online' : 'clinic').includes(searchTerm.toLowerCase()) ||
                          slotDateFormat(item.slotDate).toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    if (filterStatus === 'PENDING') return !item.isCompleted && !item.cancelled
    if (filterStatus === 'ONLINE') return item.payment && !item.cancelled
    if (filterStatus === 'CLINIC') return !item.payment && !item.cancelled
    if (filterStatus === 'COMPLETED') return item.isCompleted
    if (filterStatus === 'CANCELLED') return item.cancelled
    return true
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage) || 1
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Status Counts
  const pendingCount = sortedAppointments.filter(i => !i.isCompleted && !i.cancelled).length
  const completedCount = sortedAppointments.filter(i => i.isCompleted).length
  const cancelledCount = sortedAppointments.filter(i => i.cancelled).length
  const totalEarned = sortedAppointments.filter(i => i.isCompleted).reduce((acc, curr) => acc + (curr.amount || 0), 0)

  return (
    <div className='w-full max-w-7xl mx-auto space-y-6 pb-0 select-none'>
      
      {/* Executive Dark Hero Banner Header */}
      <div className='bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 border-2 border-emerald-500/20'>
        
        {/* Glow Spheres */}
        <div className='absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-48 h-48 rounded-full bg-teal-400/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-2 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-white/20 text-emerald-200 font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            👨‍⚕️ Clinical Patient Consultation Dispatch
          </div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight'>
            Patient Consultation Queue
          </h1>
          <p className='text-xs text-emerald-200/90 font-medium leading-relaxed'>
            Manage incoming patient appointments, verify online vs clinic payments, and record completed medical consultations.
          </p>
        </div>

        {/* Counter Pill Widget Group */}
        <div className='z-10 flex flex-wrap items-center gap-3 shrink-0'>
          
          <div className='flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 shadow-xl'>
            <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg font-bold shadow-md'>
              📅
            </div>
            <div>
              <p className='text-lg font-black text-white leading-none'>{sortedAppointments.length}</p>
              <p className='text-[9.5px] font-black text-emerald-300 uppercase tracking-widest mt-0.5'>Total Queue</p>
            </div>
          </div>

          <div className='flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 shadow-xl'>
            <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-lg font-bold shadow-md'>
              ⏳
            </div>
            <div>
              <p className='text-lg font-black text-white leading-none'>{pendingCount}</p>
              <p className='text-[9.5px] font-black text-amber-300 uppercase tracking-widest mt-0.5'>Pending</p>
            </div>
          </div>

          <div className='flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 shadow-xl'>
            <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-600 text-white flex items-center justify-center text-lg font-bold shadow-md'>
              💰
            </div>
            <div>
              <p className='text-lg font-black text-white leading-none'>{currency}{totalEarned}</p>
              <p className='text-[9.5px] font-black text-teal-300 uppercase tracking-widest mt-0.5'>Completed Fee</p>
            </div>
          </div>

        </div>

      </div>

      {/* 🔍 Search & Filter Pill Toolbar */}
      <div className='bg-white p-4 rounded-3xl border-2 border-emerald-200/80 shadow-md space-y-3'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          
          {/* Search Box */}
          <div className='relative w-full md:w-80'>
            <input 
              type="text" 
              placeholder="Search Patient Name or Payment Mode..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all'
            />
            <span className='absolute left-3.5 top-3 text-slate-400 text-xs'>🔍</span>
          </div>

          {/* Filter Status Pills - Single Line Scrollable */}
          <div className='flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none'>
            
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 border-2 ${
                filterStatus === 'ALL'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <span>ALL QUEUE</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-black ${filterStatus === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>{sortedAppointments.length}</span>
            </button>

            <button
              onClick={() => setFilterStatus('PENDING')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 border-2 ${
                filterStatus === 'PENDING'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              <span>⏳ PENDING</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-black ${filterStatus === 'PENDING' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>{pendingCount}</span>
            </button>

            <button
              onClick={() => setFilterStatus('ONLINE')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 border-2 ${
                filterStatus === 'ONLINE'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <span>💳 ONLINE PAID</span>
            </button>

            <button
              onClick={() => setFilterStatus('CLINIC')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 border-2 ${
                filterStatus === 'CLINIC'
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-teal-50 hover:text-teal-700'
              }`}
            >
              <span>💵 PAY AT CLINIC</span>
            </button>

            <button
              onClick={() => setFilterStatus('COMPLETED')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 border-2 ${
                filterStatus === 'COMPLETED'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
              }`}
            >
              <span>✓ COMPLETED</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-black ${filterStatus === 'COMPLETED' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'}`}>{completedCount}</span>
            </button>

            <button
              onClick={() => setFilterStatus('CANCELLED')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 border-2 ${
                filterStatus === 'CANCELLED'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-700'
              }`}
            >
              <span>✕ CANCELLED</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-black ${filterStatus === 'CANCELLED' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'}`}>{cancelledCount}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 📊 Consultation Queue Table Stream */}
      <div className='bg-white border-2 border-emerald-200/80 rounded-3xl shadow-xl shadow-emerald-100/50 overflow-hidden'>
        
        {/* Dark Hero Table Header */}
        <div className='hidden lg:grid grid-cols-[0.5fr_2.5fr_1.8fr_2.2fr_1fr_2.2fr] gap-4 py-4 px-6 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border-b-2 border-emerald-800/50 text-white text-xs font-black uppercase tracking-wider items-center'>
          <p>#</p>
          <p>Patient Profile</p>
          <p>Payment Mode</p>
          <p>Slot Date & Time</p>
          <p className='text-center'>Fee</p>
          <p className='text-right'>Action Status</p>
        </div>

        {/* Table Rows */}
        <div className='divide-y divide-slate-100'>
          {paginatedAppointments.length > 0 ? (
            paginatedAppointments.map((item, index) => (
              <div key={index} className='flex flex-col lg:grid lg:grid-cols-[0.5fr_2.5fr_1.8fr_2.2fr_1fr_2.2fr] gap-4 items-center py-4 px-6 hover:bg-gradient-to-r hover:from-emerald-50/60 hover:via-teal-50/40 hover:to-indigo-50/20 transition-all duration-200 text-xs font-medium text-slate-700'>
                
                <p className='hidden lg:block font-black text-emerald-600 text-xs'>{(currentPage - 1) * itemsPerPage + index + 1}</p>

                {/* Patient Profile Avatar */}
                <div className='flex items-center gap-3 w-full lg:w-auto'>
                  <div className='relative shrink-0 w-9 h-9'>
                    <img className='w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500 shadow-xs bg-slate-100' src={item.userData.image} alt="" />
                    <span className='absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[7px] text-white font-bold'>✓</span>
                  </div>
                  <div>
                    <p className='font-black text-slate-900 text-sm tracking-tight capitalize'>{item.userData.name}</p>
                  </div>
                </div>

                {/* Payment Mode Badge - NO TEXT WRAPPING */}
                <div className='w-full lg:w-auto'>
                  <span className={`whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 text-[11px] font-black uppercase tracking-wider shadow-2xs ${
                    item.payment 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                      : 'bg-amber-50 text-amber-300 border-amber-300 text-amber-800'
                  }`}>
                    {item.payment ? '💳 Online Paid' : '💵 Pay at Clinic'}
                  </span>
                </div>

                {/* Slot Date & Time */}
                <div className='w-full lg:w-auto space-y-0.5'>
                  <span className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-xs block w-fit shadow-2xs'>
                    📅 {slotDateFormat(item.slotDate)}
                  </span>
                  <span className='px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-extrabold text-xs block w-fit mt-1 shadow-2xs'>
                    ⏰ {item.slotTime}
                  </span>
                </div>

                {/* Consultation Fee */}
                <div className='w-full lg:w-auto text-center'>
                  <span className='font-black text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 inline-block'>
                    {currency}{item.amount}
                  </span>
                </div>

                {/* Action Buttons / Completed Badges */}
                <div className='w-full lg:w-auto lg:text-right'>
                  {item.cancelled ? (
                    <span className='px-4 py-2 bg-rose-50 text-rose-700 text-xs font-black rounded-xl border-2 border-rose-300 uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap'>
                      <span>✕</span> Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border-2 border-emerald-300 uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap'>
                      <span>✓</span> Completed & Rx Issued
                    </span>
                  ) : (
                    <div className='flex items-center lg:justify-end gap-2 shrink-0'>
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className='px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-black transition-all duration-200 cursor-pointer shadow-md shadow-rose-500/20 border-2 border-rose-400 flex items-center gap-1 hover:scale-[1.02] whitespace-nowrap'
                        title="Cancel Appointment"
                      >
                        <span>✕</span> Cancel
                      </button>
                      <button 
                        onClick={() => setSelectedApptForRx(item)} 
                        className='px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-md shadow-emerald-500/20 border-2 border-emerald-400 flex items-center gap-1 transition-all cursor-pointer hover:scale-[1.02] whitespace-nowrap'
                        title="Write Prescription & Complete"
                      >
                        <span>📝</span> Write Rx & Done
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className='p-12 text-center text-slate-400 text-xs font-medium'>
              No patient appointments match the selected filter.
            </div>
          )}
        </div>

      </div>

      {/* Clean Pagination Control Bar */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-emerald-200/80 shadow-md text-xs font-black'>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className='px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'
          >
            ← Previous Page
          </button>
          
          <div className='flex items-center gap-2'>
            <span>Page <span className='text-emerald-700 font-extrabold'>{currentPage}</span> of {totalPages}</span>
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className='px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'
          >
            Next Page →
          </button>
        </div>
      )}

      {/* Prescription Writer & Tele-Consultation Modal */}
      {selectedApptForRx && (
        <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-emerald-200 space-y-6 animate-in zoom-in-95 duration-200'>
            
            <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
              <div className='flex items-center gap-2.5'>
                <div className='w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-base font-black shadow-md'>
                  📝
                </div>
                <div>
                  <h3 className='text-base font-black text-slate-900 leading-tight'>Write E-Prescription</h3>
                  <p className='text-[11px] text-slate-400 font-bold'>Patient: {selectedApptForRx.userData?.name || 'Patient'}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApptForRx(null)}
                className='w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-black flex items-center justify-center cursor-pointer'
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRxSubmit} className='space-y-4 text-xs font-black text-slate-800'>
              <div className='flex flex-col gap-1.5'>
                <p className='text-emerald-900 uppercase tracking-wider text-[11px]'>Diagnosis / Primary Symptoms</p>
                <input
                  type="text"
                  value={rxForm.diagnosis}
                  onChange={(e) => setRxForm({ ...rxForm, diagnosis: e.target.value })}
                  placeholder='e.g. Acute Viral Bronchitis, Seasonal Allergy'
                  className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 text-xs'
                  required
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <p className='text-emerald-900 uppercase tracking-wider text-[11px]'>Prescribed Medicines & Dosage</p>
                <textarea
                  value={rxForm.medicines}
                  onChange={(e) => setRxForm({ ...rxForm, medicines: e.target.value })}
                  placeholder="e.g. Paracetamol 650mg - 1 tablet 3x daily after food (5 days)&#10;Cetirizine 10mg - 1 tablet at night"
                  rows={3}
                  className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 text-xs'
                  required
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <p className='text-emerald-900 uppercase tracking-wider text-[11px]'>Tele-Consultation Video Link (Optional)</p>
                <input
                  type="url"
                  value={rxForm.meetingLink}
                  onChange={(e) => setRxForm({ ...rxForm, meetingLink: e.target.value })}
                  placeholder='https://meet.google.com/abc-defg-hij'
                  className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 text-xs'
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <p className='text-emerald-900 uppercase tracking-wider text-[11px]'>Additional Advice & Follow-up Notes</p>
                <input
                  type="text"
                  value={rxForm.notes}
                  onChange={(e) => setRxForm({ ...rxForm, notes: e.target.value })}
                  placeholder='e.g. Drink warm fluids. Follow up in 7 days.'
                  className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 text-xs'
                />
              </div>

              <button
                type='submit'
                className='w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-200 hover:from-emerald-700 transition-all cursor-pointer'
              >
                ✓ Save Prescription & Complete Appointment
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default DoctorAppointment
