import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  const navigate = useNavigate()
  const [showAllConsultations, setShowAllConsultations] = useState(false)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  const latestAppointmentsList = dashData?.latestAppointments || []
  const visibleAppointments = showAllConsultations ? latestAppointmentsList : latestAppointmentsList.slice(0, 4)

  return dashData && (
    <div className='w-full max-w-7xl mx-auto space-y-6 pb-0 select-none'>
      
      {/* 🚀 Executive Dark Hero Doctor Banner */}
      <div className='bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 border-2 border-emerald-500/30 backdrop-blur-xl'>
        
        {/* Glow Orbs */}
        <div className='absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-64 h-64 rounded-full bg-teal-400/20 blur-3xl pointer-events-none'></div>

        <div className='space-y-4 z-10 max-w-2xl'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-black text-emerald-200 uppercase tracking-widest shadow-md'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            👨‍⚕️ MEDICAL SPECIALIST COMMAND PORTAL
          </div>

          <h1 className='text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight'>
            Clinical Consultation Desk
          </h1>

          <p className='text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed'>
            Review patient appointments, manage live consultation streams, monitor patient fees, and mark completed clinical consultations.
          </p>

          <div className='pt-2 flex flex-wrap items-center gap-3'>
            <button 
              onClick={() => navigate('/doctor-appointments')}
              className='px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-[1.03] cursor-pointer flex items-center gap-2 border border-white/20'
            >
              <span>📅</span> View Patient Queue
            </button>
            <button 
              onClick={() => navigate('/doctor-profile')}
              className='px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs uppercase tracking-wider transition-all transform hover:scale-[1.03] cursor-pointer flex items-center gap-2 backdrop-blur-md shadow-sm'
            >
              <span>⚙️</span> Edit Profile & Fee Settings
            </button>
          </div>
        </div>

        {/* Status Telemetry Widget */}
        <div className='z-10 w-full xl:w-auto shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3'>
          <p className='text-[10px] font-black uppercase tracking-widest text-emerald-300 border-b border-white/10 pb-2 flex items-center justify-between gap-4'>
            <span>Practitioner Status</span>
            <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-black'>ACTIVE</span>
          </p>
          <div className='space-y-2 text-xs font-extrabold text-white'>
            <div className='flex items-center gap-2.5 bg-white/5 p-2 rounded-xl border border-white/10'>
              <span className='text-emerald-400 text-sm'>🩺</span>
              <span>Online for Consultation</span>
            </div>
            <div className='flex items-center gap-2.5 bg-white/5 p-2 rounded-xl border border-white/10'>
              <span className='text-teal-400 text-sm'>💳</span>
              <span>Instant Fee Settlements</span>
            </div>
          </div>
        </div>

      </div>

      {/* 📊 3 Doctor Metric Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6'>

        {/* Total Earnings Card */}
        <div className='bg-gradient-to-br from-emerald-500/10 via-white to-teal-50/50 p-6 rounded-3xl border-2 border-emerald-400 shadow-lg shadow-emerald-200/50 flex items-center gap-4 hover:border-emerald-600 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-300 shrink-0'>
            💰
          </div>
          <div>
            <p className='text-3xl font-black text-slate-900'>{currency}{dashData.earnings}</p>
            <p className='text-xs font-black text-emerald-600 uppercase tracking-wider mt-0.5'>Total Earnings</p>
          </div>
        </div>

        {/* Total Consultations Card */}
        <div onClick={() => navigate('/doctor-appointments')} className='bg-gradient-to-br from-indigo-500/10 via-white to-purple-50/50 p-6 rounded-3xl border-2 border-indigo-400 shadow-lg shadow-indigo-200/50 flex items-center gap-4 hover:border-indigo-600 hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-indigo-300 shrink-0 group-hover:scale-110 transition-transform'>
            📅
          </div>
          <div>
            <p className='text-3xl font-black text-slate-900'>{dashData.appointments}</p>
            <p className='text-xs font-black text-indigo-600 uppercase tracking-wider mt-0.5'>Total Bookings</p>
          </div>
        </div>

        {/* Unique Patients Base Card */}
        <div className='bg-gradient-to-br from-purple-500/10 via-white to-pink-50/50 p-6 rounded-3xl border-2 border-purple-400 shadow-lg shadow-purple-200/50 flex items-center gap-4 hover:border-purple-600 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-purple-300 shrink-0'>
            👤
          </div>
          <div>
            <p className='text-3xl font-black text-slate-900'>{dashData.patients}</p>
            <p className='text-xs font-black text-purple-600 uppercase tracking-wider mt-0.5'>Unique Patients</p>
          </div>
        </div>

      </div>

      {/* ⚡ Recent Patient Consultations Queue Stream Table Card */}
      <div className='bg-white border-2 border-emerald-200/80 rounded-3xl shadow-xl shadow-emerald-100/50 overflow-hidden'>
        
        {/* Clean Executive Dark Title Banner */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between px-6 py-3 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border-b-2 border-emerald-800/50 text-white gap-4'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 font-bold text-lg shadow-inner shrink-0'>
              ⚡
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='font-black text-white text-base tracking-wide'>Recent Patient Consultations Queue</h2>
                <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
                  LIVE STREAM
                </span>
              </div>
              <p className='text-xs text-emerald-200/90 font-medium'>Live incoming consultation stream</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/doctor-appointments')}
            className='text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 rounded-xl border-2 border-emerald-400/80 shadow-md shadow-emerald-500/20 hover:scale-105 transition-all cursor-pointer self-start sm:self-auto'
          >
            🟢 View Full Queue →
          </button>
        </div>

        {/* Stream List Rows */}
        <div className='divide-y divide-slate-100'>
          {visibleAppointments.length > 0 ? (
            visibleAppointments.map((item, index) => (
              <div className='flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-gradient-to-r hover:from-emerald-50/80 hover:via-teal-50/50 hover:to-indigo-50/30 transition-all duration-200 gap-4' key={index}>
                
                {/* Patient Profile & Slot Date/Time Inline */}
                <div className='flex flex-wrap items-center gap-3 sm:gap-4'>
                  
                  {/* Patient Avatar */}
                  <div className='relative shrink-0 w-9 h-9'>
                    <img className='rounded-full w-9 h-9 object-cover ring-2 ring-emerald-500 shadow-sm bg-slate-100' src={item.userData.image} alt="" />
                    <span className='absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[7px] text-white font-bold'>✓</span>
                  </div>

                  {/* Patient Name */}
                  <p className='text-slate-900 font-black text-sm tracking-tight capitalize min-w-[100px]'>{item.userData.name}</p>

                  {/* Slot Date & Time Badges Inline */}
                  <div className='flex items-center gap-2 text-xs'>
                    <span className='whitespace-nowrap px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-black text-xs shadow-2xs'>
                      📅 {slotDateFormat(item.slotDate)}
                    </span>
                    <span className='whitespace-nowrap px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-300 font-black text-xs shadow-2xs'>
                      ⏰ {item.slotTime}
                    </span>
                  </div>

                </div>

                {/* Fee Capsule & Action Buttons */}
                <div className='flex items-center gap-3.5 shrink-0 justify-between sm:justify-end w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100'>
                  
                  {/* Fee Capsule */}
                  <div className='px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-2 border-emerald-300 shadow-2xs text-center min-w-[70px]'>
                    <span className='text-[9px] text-emerald-600 font-black uppercase block leading-none'>FEE</span>
                    <span className='font-black text-sm text-emerald-900 leading-tight block'>{currency}{item.amount}</span>
                  </div>

                  {item.cancelled ? (
                    <span className='whitespace-nowrap px-4 py-2 bg-rose-50 text-rose-700 text-xs font-black rounded-xl border-2 border-rose-300 uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5'>
                      <span>✕</span> CANCELLED
                    </span>
                  ) : item.isCompleted ? (
                    <span className='whitespace-nowrap px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border-2 border-emerald-300 uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5'>
                      <span>✓</span> COMPLETED
                    </span>
                  ) : (
                    <div className='flex items-center gap-2 shrink-0'>
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className='px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-rose-500/20 border-2 border-rose-400 flex items-center gap-1.5 hover:scale-[1.02] whitespace-nowrap'
                        title="Cancel Appointment"
                      >
                        <span>✕</span> Cancel
                      </button>
                      <button 
                        onClick={() => completeAppointment(item._id)} 
                        className='px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-md shadow-emerald-500/20 border-2 border-emerald-400 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] whitespace-nowrap'
                        title="Mark Consultation Complete"
                      >
                        <span>✓</span> Complete
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className='p-12 text-center text-slate-400 text-xs font-medium'>
              No recent patient consultations in queue.
            </div>
          )}
        </div>

        {/* 🔘 TOGGLE SHOW MORE / SHOW LESS CONSULTATIONS BUTTON */}
        {latestAppointmentsList.length > 4 && (
          <div className='p-4 bg-slate-50 border-t border-slate-200/80 flex justify-center'>
            <button
              onClick={() => setShowAllConsultations(!showAllConsultations)}
              className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/25 border-2 border-emerald-400 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2'
            >
              <span>{showAllConsultations ? '👆 SHOW LESS CONSULTATIONS' : `👇 VIEW ALL CONSULTATIONS (${latestAppointmentsList.length})`}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  )
}

export default DoctorDashboard
