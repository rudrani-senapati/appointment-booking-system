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

      {/* ------------------ Booking Mode & Slots ---------------------- */}
      <div className='mt-10 bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-300/60 space-y-8'>
        
        {/* Consultation Mode Selector */}
        <div className='space-y-3'>
          <h2 className='font-black text-slate-900 text-lg tracking-tight flex items-center gap-2'>
            <span>🩺</span> Choose Consultation Mode
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div 
              onClick={() => setConsultationType('In-Clinic')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                consultationType === 'In-Clinic'
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-md shadow-indigo-100'
                  : 'border-slate-200 bg-slate-50 hover:border-indigo-300'
              }`}
            >
              <div className='w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-sm shrink-0'>
                🏥
              </div>
              <div>
                <h3 className='font-extrabold text-slate-900 text-sm sm:text-base'>In-Clinic Visit</h3>
                <p className='text-xs text-slate-500 font-medium mt-0.5'>Visit doctor's physical medical center</p>
              </div>
            </div>

            <div 
              onClick={() => setConsultationType('Online Consultation')}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                consultationType === 'Online Consultation'
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-md shadow-indigo-100'
                  : 'border-slate-200 bg-slate-50 hover:border-indigo-300'
              }`}
            >
              <div className='w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center text-2xl font-bold shadow-sm shrink-0'>
                💻
              </div>
              <div>
                <div className='flex items-center gap-2'>
                  <h3 className='font-extrabold text-slate-900 text-sm sm:text-base'>Online Video Consultation</h3>
                  <span className='bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider'>Live HD</span>
                </div>
                <p className='text-xs text-slate-500 font-medium mt-0.5'>HD Telehealth call + E-Prescription</p>
              </div>
            </div>
          </div>
        </div>

        {/* Days Selector */}
        <div className='space-y-3 pt-4 border-t border-slate-100'>
          <h2 className='font-black text-slate-900 text-lg tracking-tight'>Select Booking Slot</h2>
          
          <div className='flex gap-4 items-center w-full overflow-x-auto pt-2 pb-2'>
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <div 
                onClick={() => setSlotIndex(index)} 
                className={`text-center py-4 px-4 min-w-20 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                  slotIndex === index 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-semibold scale-105' 
                    : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-indigo-50/50 hover:border-indigo-200'
                }`} 
                key={index}
              >
                <p className='text-xs uppercase tracking-wider font-semibold opacity-80'>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p className='text-lg font-bold'>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Timeslots Selector */}
          <div className='flex items-center gap-3 w-full overflow-x-auto pt-2 pb-2'>
            {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
              <p 
                onClick={() => setSlotTime(item.time)} 
                className={`text-xs font-semibold flex-shrink-0 px-6 py-2.5 rounded-full cursor-pointer transition-all duration-200 ${
                  item.time === slotTime 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                    : 'text-slate-600 bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`} 
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button 
            onClick={bookAppointment} 
            className='w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-extrabold px-12 py-4 rounded-2xl mt-4 shadow-lg shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider'
          >
            Confirm & Book ({consultationType})
          </button>
        </div>

      </div>

      {/* --------- Listing Related Doctors ------------ */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment