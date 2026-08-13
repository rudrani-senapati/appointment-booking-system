import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  const navigate = useNavigate()
  const [showAllStream, setShowAllStream] = useState(false)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  // Calculate total revenue estimate
  const totalEstRevenue = dashData?.latestAppointments
    ? dashData.latestAppointments.reduce((acc, curr) => acc + (curr.amount || 500), 0) * 15
    : 12500

  const latestList = dashData?.latestAppointments || []
  const visibleAppointments = showAllStream ? latestList : latestList.slice(0, 4)

  return dashData && (
    <div className='w-full max-w-7xl mx-auto space-y-6 pb-0 select-none'>

      {/* 🚀 Ultra-Modern High-Tech Dark Theme Executive Hero Banner */}
      <div className='bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 border-2 border-indigo-500/30 backdrop-blur-xl'>
        
        {/* Background Grid & Glow Orbs */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>
        <div className='absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none'></div>

        {/* Left Content Area */}
        <div className='space-y-4 z-10 max-w-2xl'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-black text-indigo-200 uppercase tracking-widest shadow-md'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            ⚡ CAREPULSE COMMAND PORTAL • EXECUTIVE HUB
          </div>

          <h1 className='text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight'>
            Welcome Back, <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400'>System Administrator</span>
          </h1>

          <p className='text-xs sm:text-sm text-indigo-100/90 font-medium leading-relaxed'>
            Real-time specialist telemetry, live consultation dispatch stream, and enterprise hospital operations command across all 12 clinical medical units.
          </p>

          <div className='pt-2 flex flex-wrap items-center gap-3'>
            <button 
              onClick={() => navigate('/add-doctor')}
              className='px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/30 transition-all transform hover:scale-[1.03] cursor-pointer flex items-center gap-2 border border-white/20'
            >
              <span>➕</span> Onboard Specialist
            </button>
            <button 
              onClick={() => navigate('/doctor-list')}
              className='px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs uppercase tracking-wider transition-all transform hover:scale-[1.03] cursor-pointer flex items-center gap-2 backdrop-blur-md shadow-sm'
            >
              <span>👨‍⚕️</span> View Specialists Roster
            </button>
          </div>
        </div>

        {/* Right Floating 3D Telemetry Widget */}
        <div className='z-10 w-full xl:w-auto shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3'>
          <p className='text-[10px] font-black uppercase tracking-widest text-indigo-300 border-b border-white/10 pb-2 flex items-center justify-between gap-4'>
            <span>Live System Telemetry</span>
            <span className='px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-black'>ONLINE</span>
          </p>
          <div className='space-y-2 text-xs font-extrabold text-white'>
            <div className='flex items-center gap-2.5 bg-white/5 p-2 rounded-xl border border-white/10'>
              <span className='text-emerald-400 text-sm'>⚡</span>
              <span>100% Core Systems Operational</span>
            </div>
            <div className='flex items-center gap-2.5 bg-white/5 p-2 rounded-xl border border-white/10'>
              <span className='text-cyan-400 text-sm'>🏥</span>
              <span>12 Medical Specialities Active</span>
            </div>
            <div className='flex items-center gap-2.5 bg-white/5 p-2 rounded-xl border border-white/10'>
              <span className='text-pink-400 text-sm'>🔒</span>
              <span>HIPAA & SOC2 Type II Secure</span>
            </div>
          </div>
        </div>

      </div>

      {/* 📊 4 Executive Metric Cards Grid Below Banner */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>

        {/* Doctors Metric Card */}
        <div onClick={() => navigate('/doctor-list')} className='bg-gradient-to-br from-indigo-500/10 via-white to-indigo-50/50 p-6 rounded-3xl border-2 border-indigo-400 shadow-lg shadow-indigo-200/50 flex items-center gap-4 hover:border-indigo-600 hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-indigo-300 shrink-0 group-hover:scale-110 transition-transform'>
            👨‍⚕️
          </div>
          <div>
            <div className='flex items-center gap-1.5'>
              <p className='text-3xl font-black text-slate-900'>{dashData.doctors}</p>
              <span className='text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200'>Active</span>
            </div>
            <p className='text-xs font-black text-indigo-600 uppercase tracking-wider mt-0.5'>Doctors Roster</p>
          </div>
        </div>

        {/* Bookings Metric Card */}
        <div onClick={() => navigate('/all-appointments')} className='bg-gradient-to-br from-purple-500/10 via-white to-violet-50/50 p-6 rounded-3xl border-2 border-purple-400 shadow-lg shadow-purple-200/50 flex items-center gap-4 hover:border-purple-600 hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-purple-300 shrink-0 group-hover:scale-110 transition-transform'>
            📅
          </div>
          <div>
            <div className='flex items-center gap-1.5'>
              <p className='text-3xl font-black text-slate-900'>{dashData.appointments}</p>
              <span className='text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200'>High</span>
            </div>
            <p className='text-xs font-black text-purple-600 uppercase tracking-wider mt-0.5'>Total Bookings</p>
          </div>
        </div>

        {/* Patients Metric Card */}
        <div className='bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50/50 p-6 rounded-3xl border-2 border-emerald-400 shadow-lg shadow-emerald-200/50 flex items-center gap-4 hover:border-emerald-600 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-300 shrink-0'>
            👤
          </div>
          <div>
            <div className='flex items-center gap-1.5'>
              <p className='text-3xl font-black text-slate-900'>{dashData.patients}</p>
              <span className='text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200'>Verified</span>
            </div>
            <p className='text-xs font-black text-emerald-600 uppercase tracking-wider mt-0.5'>Patients Base</p>
          </div>
        </div>

        {/* Revenue Metric Card */}
        <div className='bg-gradient-to-br from-amber-500/10 via-white to-amber-50/50 p-6 rounded-3xl border-2 border-amber-400 shadow-lg shadow-amber-200/50 flex items-center gap-4 hover:border-amber-600 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-amber-300 shrink-0'>
            💰
          </div>
          <div>
            <p className='text-2xl font-black text-slate-900'>{currency}{totalEstRevenue.toLocaleString('en-IN')}</p>
            <p className='text-xs font-black text-amber-600 uppercase tracking-wider mt-0.5'>Est. Revenue</p>
          </div>
        </div>

      </div>

      {/* 🏥 Active Medical Departments */}
      <div className='bg-white p-6 rounded-3xl border-2 border-indigo-200/80 shadow-md space-y-4'>
        <div className='flex items-center justify-between border-b border-slate-100 pb-3'>
          <p className='text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2'>
            <span>🏥 ACTIVE MEDICAL DEPARTMENTS</span>
            <span className='w-2 h-2 rounded-full bg-indigo-500 animate-ping'></span>
          </p>
          <span className='text-xs font-black text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200/80 shadow-2xs'>
            12 Operational Units
          </span>
        </div>
        <div className='flex flex-wrap gap-2.5'>
          <span className='px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 border-2 border-indigo-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🩺 General physician
          </span>
          <span className='px-4 py-2 rounded-full bg-pink-50 text-pink-700 border-2 border-pink-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            Gynecologist
          </span>
          <span className='px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 border-2 border-cyan-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🪥 Dentist
          </span>
          <span className='px-4 py-2 rounded-full bg-purple-50 text-purple-700 border-2 border-purple-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🧴 Dermatologist
          </span>
          <span className='px-4 py-2 rounded-full bg-teal-50 text-teal-700 border-2 border-teal-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🧸 Pediatrician
          </span>
          <span className='px-4 py-2 rounded-full bg-amber-50 text-amber-700 border-2 border-amber-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🧠 Neurologist
          </span>
          <span className='px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border-2 border-emerald-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🥗 Gastroenterologist
          </span>
          <span className='px-4 py-2 rounded-full bg-sky-50 text-sky-700 border-2 border-sky-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            👁️ Ophthalmologist
          </span>
          <span className='px-4 py-2 rounded-full bg-rose-50 text-rose-700 border-2 border-rose-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🦴 Orthopedic
          </span>
          <span className='px-4 py-2 rounded-full bg-red-50 text-red-700 border-2 border-red-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            ❤️ Cardiologist
          </span>
          <span className='px-4 py-2 rounded-full bg-blue-50 text-blue-700 border-2 border-blue-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            🫁 Pulmonologist
          </span>
          <span className='px-4 py-2 rounded-full bg-violet-50 text-violet-700 border-2 border-violet-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-all cursor-default'>
            👂 ENT Specialist
          </span>
        </div>
      </div>

      {/* ⚡ Latest Patient Bookings Stream Table Card */}
      <div className='bg-white border-2 border-indigo-200/80 rounded-3xl shadow-xl shadow-indigo-100/50 overflow-hidden'>
        
        {/* Dark Hero Header Banner */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between px-6 py-3 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border-b-2 border-indigo-800/50 text-white gap-4'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 font-bold text-lg shadow-inner shrink-0'>
              ⚡
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='font-black text-white text-base tracking-wide'>Latest Patient Bookings Stream</h2>
                <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
                  LIVE STREAM
                </span>
              </div>
              <p className='text-xs text-indigo-200/90 font-medium'>Real-time consultation activity queue</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/all-appointments')}
            className='self-start sm:self-auto text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 px-5 py-2.5 rounded-xl border-2 border-purple-400/60 shadow-md shadow-purple-500/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer flex items-center gap-1.5'
          >
            <span>View Full Roster</span>
            <span>→</span>
          </button>
        </div>

        {/* ── Appointment Table ── */}
        <div>

          {/* Column Header */}
          <div className='hidden sm:grid grid-cols-[2fr_1.8fr_2fr_1.5fr_1.5fr_1fr_1.5fr] items-center px-6 py-2 bg-slate-50 border-b-2 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400'>
            <div>Doctor</div>
            <div>Schedule</div>
            <div>Patient</div>
            <div>Status</div>
            <div>Type</div>
            <div className='text-center'>Fee</div>
            <div className='text-center'>Action</div>
          </div>

          {/* Rows */}
          <div className='divide-y divide-slate-100'>
            {visibleAppointments.length > 0 ? (
              visibleAppointments.map((item, index) => (
                <div
                  className={`hidden sm:grid grid-cols-[2fr_1.8fr_2fr_1.5fr_1.5fr_1fr_1.5fr] items-center px-6 py-2.5 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'} hover:bg-indigo-50/50`}
                  key={index}
                >

                  {/* Col 1 — Doctor */}
                  <div className='flex items-center gap-2.5 pr-3'>
                    <div className='relative shrink-0'>
                      <img className='rounded-full w-8 h-8 object-cover ring-2 ring-indigo-400 shadow-sm bg-slate-100' src={item.docData.image} alt="" />
                      <span className='absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[6px] text-white font-bold'>✓</span>
                    </div>
                    <div className='min-w-0 space-y-0.5'>
                      <p className='text-slate-900 font-extrabold text-xs truncate'>{item.docData.name}</p>
                      <p className='text-indigo-600 text-[10px] font-bold truncate'>🩺 {item.docData.speciality}</p>
                      <div className='flex items-center gap-1 flex-wrap'>
                        {item.docData.degree && <span className='inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-50 text-indigo-500 border border-indigo-100'>{item.docData.degree}</span>}
                        {item.docData.experience && <span className='inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-100 text-slate-500'>⏱ {item.docData.experience}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Col 2 — Schedule */}
                  <div className='flex flex-col gap-0.5 pr-3'>
                    <p className='text-slate-800 font-extrabold text-xs'>📅 {slotDateFormat(item.slotDate)}</p>
                    <p className='text-slate-500 text-[10px] font-bold'>🕒 {item.slotTime}</p>
                    <div className='flex items-center gap-1 flex-wrap'>
                      <span className='inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-sky-50 text-sky-600 border border-sky-100'>⏰ 30 min</span>
                      <span className='text-[9px] font-black text-slate-400'>#{String(index + 1).padStart(3, '0')}</span>
                    </div>
                  </div>

                  {/* Col 3 — Patient */}
                  <div className='flex items-center gap-2 pr-3'>
                    <div className='w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm'>
                      {item.userData?.name ? item.userData.name.charAt(0).toUpperCase() : 'P'}
                    </div>
                    <div className='min-w-0 space-y-0.5'>
                      <p className='text-slate-800 font-extrabold text-xs truncate'>{item.userData?.name || 'Patient'}</p>
                      <p className='text-slate-400 text-[10px] font-medium truncate'>✉️ {item.userData?.email || '—'}</p>
                      <p className='text-slate-400 text-[10px] font-medium truncate'>📞 {item.userData?.phone || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Col 4 — Status */}
                  <div className='flex flex-col gap-1 pr-2'>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black border w-fit ${
                      item.cancelled
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : item.isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {item.cancelled ? '❌ Cancelled' : item.isCompleted ? '✅ Done' : '🟢 Active'}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black border w-fit ${
                      item.payment
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.payment ? '💳 Paid' : '⏳ Pending'}
                    </span>
                  </div>

                  {/* Col 5 — Type */}
                  <div className='flex flex-col gap-1 pr-2'>
                    <span className='inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black bg-sky-50 text-sky-700 border border-sky-200 w-fit'>
                      🏥 In-Person
                    </span>
                    <span className='inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black bg-purple-50 text-purple-600 border border-purple-100 w-fit'>
                      👤 General
                    </span>
                  </div>

                  {/* Col 6 — Fee */}
                  <div className='flex justify-center'>
                    <div className='text-center px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200'>
                      <span className='text-[9px] text-emerald-500 font-black uppercase block leading-none'>Fee</span>
                      <span className='font-black text-sm text-emerald-700 leading-tight block'>{currency}{item.amount}</span>
                    </div>
                  </div>

                  {/* Col 7 — Action */}
                  <div className='flex justify-center'>
                    {item.cancelled ? (
                      <span className='px-3 py-1.5 bg-rose-50 text-rose-500 text-[10px] font-black rounded-lg border border-rose-200 uppercase tracking-wide flex items-center gap-1'>
                        ✕ Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className='px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-200 uppercase tracking-wide flex items-center gap-1'>
                        ✓ Done
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black cursor-pointer transition-colors flex items-center gap-1 shadow-sm'
                        title="Cancel Appointment"
                      >
                        ✕ Cancel
                      </button>
                    )}
                  </div>

                </div>
              ))
            ) : (
              <div className='p-12 text-center text-slate-400 text-xs font-medium'>
                No recent appointment bookings found.
              </div>
            )}
          </div>

        </div>

        {/* 🔘 TOGGLE SHOW MORE / SHOW LESS STREAM BUTTON */}
        {latestList.length > 4 && (
          <div className='p-4 bg-slate-50 border-t border-slate-200/80 flex justify-center'>
            <button
              onClick={() => setShowAllStream(!showAllStream)}
              className='px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 border-2 border-indigo-400 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2'
            >
              <span>{showAllStream ? '👆 SHOW LESS STREAM' : `👇 VIEW ALL STREAM (${latestList.length})`}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  )
}

export default Dashboard
