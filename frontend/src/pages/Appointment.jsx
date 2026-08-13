import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [consultationType, setConsultationType] = useState('In-Clinic')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        // If current time passed today's end time (9 PM), start from tomorrow morning
        if (currentDate >= endTime) {
          currentDate.setDate(currentDate.getDate() + 1)
          currentDate.setHours(10, 0, 0, 0)
          endTime.setDate(endTime.getDate() + 1)
        }
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      // Ensure fallback date object if all slots for today were booked or elapsed
      if (timeSlots.length === 0) {
        let fallbackDate = new Date(today)
        fallbackDate.setDate(today.getDate() + i)
        fallbackDate.setHours(10, 0, 0, 0)
        timeSlots.push({
          dateTime: fallbackDate,
          time: '10:00 AM'
        })
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].dateTime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment', 
        { docId, slotDate, slotTime, consultationType }, 
        { headers: { token } }
      )
      
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
    window.scrollTo(0, 0)
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return docInfo && (
    <div className='py-6'>
      {/* ----------------------- Doctor Details Hero Card ------------------------- */}
      <div className='flex flex-col sm:flex-row gap-6 items-stretch'>
        <div className='w-full sm:max-w-72 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-3xl overflow-hidden shadow-lg shadow-indigo-100 flex items-center justify-center p-2'>
          <img className='w-full h-full object-cover rounded-2xl' src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className='flex-1 bg-white border border-slate-100 rounded-3xl p-8 shadow-lg shadow-slate-100 flex flex-col justify-between'>
          {/* Doc Info : name, degree, experience */}
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight'>
                {docInfo.name}
              </h1>
              <img className='w-5 h-5' src={assets.verified_icon} alt="Verified" />
            </div>

            <div className='flex items-center gap-3 text-sm mt-2 text-slate-600 font-medium'>
              <span>{docInfo.degree} - {docInfo.speciality}</span>
              <span className='py-0.5 px-3 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-100'>
                {docInfo.experience}
              </span>
            </div>

            {/* Doctor About & Clinic Address */}
            <div className='mt-5 border-t border-slate-100 pt-4 space-y-4'>
              <div>
                <p className='flex items-center gap-1.5 text-sm font-bold text-slate-900'>
                  About Doctor <img className='w-4' src={assets.info_icon} alt="" />
                </p>
                <p className='text-sm text-slate-600 max-w-[700px] mt-1.5 leading-relaxed font-medium'>
                  {docInfo.about}
                </p>
              </div>

              {/* Clinic Address & Map Directions */}
              <div className='bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
                <div className='space-y-1'>
                  <p className='text-xs font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5'>
                    <span>🏥 Clinic & Medical Center Address</span>
                  </p>
                  <p className='text-xs font-extrabold text-slate-800'>{docInfo.address.line1}</p>
                  <p className='text-xs text-slate-500 font-medium'>{docInfo.address.line2}</p>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(docInfo.address.line1 + ' ' + docInfo.address.line2)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className='bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-600 text-indigo-700 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm shrink-0'
                >
                  <span>📍 Open in Google Maps ↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className='mt-6 pt-4 border-t border-slate-100 flex items-center justify-between'>
            <p className='text-slate-500 font-medium text-sm'>
              Appointment Fee: <span className='text-indigo-600 font-bold text-lg ml-1'>{currencySymbol}{docInfo.fees}</span>
            </p>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${docInfo.available ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
              {docInfo.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>
      </div>

        {/* ------------------ Booking Mode & Slots Section ---------------------- */}
        <div className='mt-10 bg-gradient-to-b from-white via-indigo-50/30 to-violet-50/20 border border-indigo-100 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-indigo-100/60 space-y-8 backdrop-blur-xl'>
          
          {/* Header Banner */}
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-indigo-100/80'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <span className='px-3 py-1 bg-indigo-100 text-indigo-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full'>
                  ⚡ Fast-Track Booking
                </span>
                <span className='px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse'></span> Guaranteed Slot
                </span>
              </div>
              <h2 className='font-black text-slate-900 text-xl sm:text-2xl tracking-tight'>
                Select Consultation & Booking Slot
              </h2>
            </div>
            <div className='text-left sm:text-right shrink-0 bg-white/90 p-3 px-4 rounded-2xl border border-indigo-100 shadow-sm'>
              <p className='text-[10px] font-extrabold text-slate-400 uppercase tracking-wider'>Consultation Fee</p>
              <p className='text-2xl font-black text-indigo-600'>{currencySymbol}{docInfo.fees}</p>
            </div>
          </div>

          {/* 1. Consultation Mode Selector Cards */}
          <div className='space-y-3'>
            <h3 className='font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2'>
              <span>1️⃣</span> Choose Mode of Consultation
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {/* In-Clinic Card */}
              <div 
                onClick={() => setConsultationType('In-Clinic')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 relative overflow-hidden ${
                  consultationType === 'In-Clinic'
                    ? 'border-indigo-600 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-200 scale-[1.01]'
                    : 'border-indigo-100 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/40 shadow-sm'
                }`}
              >
                <div className='flex items-center gap-4'>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                    consultationType === 'In-Clinic' ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    🏥
                  </div>
                  <div>
                    <h4 className='font-extrabold text-sm sm:text-base'>In-Clinic Visit</h4>
                    <p className={`text-xs mt-0.5 font-medium ${consultationType === 'In-Clinic' ? 'text-indigo-100' : 'text-slate-500'}`}>
                      Visit doctor's medical facility
                    </p>
                  </div>
                </div>
                {consultationType === 'In-Clinic' && (
                  <span className='bg-white text-indigo-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-sm'>
                    ✓ Active
                  </span>
                )}
              </div>

              {/* Online Video Card */}
              <div 
                onClick={() => setConsultationType('Online Consultation')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 relative overflow-hidden ${
                  consultationType === 'Online Consultation'
                    ? 'border-indigo-600 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-200 scale-[1.01]'
                    : 'border-indigo-100 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/40 shadow-sm'
                }`}
              >
                <div className='flex items-center gap-4'>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                    consultationType === 'Online Consultation' ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    💻
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h4 className='font-extrabold text-sm sm:text-base'>Online Video Consultation</h4>
                      <span className='bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider'>
                        HD Video
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 font-medium ${consultationType === 'Online Consultation' ? 'text-indigo-100' : 'text-slate-500'}`}>
                      Instant Call + E-Prescription
                    </p>
                  </div>
                </div>
                {consultationType === 'Online Consultation' && (
                  <span className='bg-white text-indigo-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-sm'>
                    ✓ Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. 7-Day Date Grid */}
          <div className='space-y-3 pt-4 border-t border-indigo-100/80'>
            <div className='flex items-center justify-between'>
              <h3 className='font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2'>
                <span>2️⃣</span> Select Appointment Date
              </h3>
              <span className='text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100'>
                📅 Next 7 Days
              </span>
            </div>
            
            <div className='grid grid-cols-7 gap-1.5 sm:gap-3 w-full py-1 overflow-x-auto scrollbar-none'>
              {docSlots.length > 0 && docSlots.map((item, index) => {
                const dateObj = item[0] && item[0].dateTime
                const dayName = dateObj ? daysOfWeek[dateObj.getDay()] : ''
                const dayNum = dateObj ? dateObj.getDate() : ''
                const monthName = dateObj ? dateObj.toLocaleString('default', { month: 'short' }) : ''
                const isSelected = slotIndex === index

                return (
                  <div 
                    key={index}
                    onClick={() => {
                      setSlotIndex(index)
                      if (item.length > 0 && !item.some(s => s.time === slotTime)) {
                        setSlotTime(item[0].time)
                      }
                    }} 
                    className={`text-center py-2.5 sm:py-3 px-1 sm:px-2 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-0.5 sm:gap-1 border shadow-sm min-w-[42px] sm:min-w-0 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 text-white border-indigo-500 shadow-xl shadow-indigo-300/80 font-bold scale-105 ring-2 ring-indigo-400' 
                        : 'bg-white text-slate-700 border-indigo-100 hover:border-indigo-400 hover:bg-indigo-50/60'
                    }`} 
                  >
                    <p className={`text-[9px] sm:text-xs uppercase tracking-wider font-extrabold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {dayName}
                    </p>
                    <p className='text-sm sm:text-xl font-black leading-none my-0.5'>
                      {dayNum}
                    </p>
                    <p className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {monthName}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 3. Multi-Row Flex-Wrap Time Slots */}
          <div className='space-y-3 pt-4 border-t border-indigo-100/80'>
            <div className='flex items-center justify-between'>
              <h3 className='font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2'>
                <span>3️⃣</span> Select Time Slot
              </h3>
              {docSlots[slotIndex] && (
                <span className='text-xs font-bold text-slate-500'>
                  {docSlots[slotIndex].length} slots available
                </span>
              )}
            </div>

            <div className='flex flex-wrap items-center gap-2 sm:gap-2.5 w-full py-2'>
              {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => {
                const isSelected = item.time === slotTime
                return (
                  <button 
                    type="button"
                    key={index}
                    onClick={() => setSlotTime(item.time)} 
                    className={`text-xs font-bold px-4 py-2.5 rounded-full cursor-pointer transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                      isSelected 
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 scale-105 border border-indigo-500' 
                        : 'text-slate-700 bg-white border border-indigo-100 hover:border-indigo-400 hover:bg-indigo-50/50'
                    }`}
                  >
                    <span>⏰</span>
                    <span>{item.time}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Live Interactive Booking Summary & CTA Button */}
          {slotTime && docSlots[slotIndex] && docSlots[slotIndex][0] && (
            <div className='bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white rounded-3xl p-6 shadow-2xl shadow-indigo-300/80 space-y-4 animate-fadeIn'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-indigo-400/50'>
                <div className='space-y-1'>
                  <span className='bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full'>
                    ✨ Booking Summary
                  </span>
                  <h4 className='text-base sm:text-lg font-black text-white mt-1'>
                    {consultationType === 'Online Consultation' ? '💻 Online Video Call' : '🏥 In-Clinic Visit'} with Dr. {docInfo.name}
                  </h4>
                  <p className='text-xs font-bold text-indigo-100 flex flex-wrap items-center gap-3 mt-1'>
                    <span>📅 {daysOfWeek[docSlots[slotIndex][0].dateTime.getDay()]}, {docSlots[slotIndex][0].dateTime.getDate()} {docSlots[slotIndex][0].dateTime.toLocaleString('default', { month: 'short' })} {docSlots[slotIndex][0].dateTime.getFullYear()}</span>
                    <span className='bg-white/20 px-2.5 py-0.5 rounded-full text-white font-extrabold'>⏰ {slotTime}</span>
                  </p>
                </div>

                <div className='text-left sm:text-right shrink-0 bg-white/10 p-3 px-4 rounded-2xl border border-white/20 backdrop-blur-md'>
                  <p className='text-[10px] font-extrabold text-indigo-200 uppercase tracking-wider'>Total Fee</p>
                  <p className='text-2xl font-black text-white'>{currencySymbol}{docInfo.fees}</p>
                </div>
              </div>

              <button 
                type="button"
                onClick={bookAppointment} 
                className='w-full bg-white hover:bg-indigo-50 text-indigo-700 text-sm sm:text-base font-black py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2'
              >
                <span>⚡ Confirm & Reserve Appointment</span>
                <span className='bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold'>{currencySymbol}{docInfo.fees}</span>
              </button>
            </div>
          )}

        </div>

      {/* --------- Listing Related Doctors ------------ */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment