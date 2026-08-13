import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import PrescriptionModal from '../components/PrescriptionModal'
import ConsultationRoomModal from '../components/ConsultationRoomModal'

// Payment Deadline Countdown Timer Component (15-Minute Window)
const PaymentCountdownTimer = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState('')
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    // 15 minute payment deadline window from booking date/paymentDeadline
    const bookingTimestamp = item.date || Date.now()
    const deadlineTime = item.paymentDeadline 
      ? new Date(item.paymentDeadline).getTime() 
      : bookingTimestamp + 15 * 60 * 1000

    const updateTimer = () => {
      const now = Date.now()
      const diff = deadlineTime - now

      if (diff <= 0) {
        setIsExpired(true)
        setTimeLeft('00:00')
      } else {
        setIsExpired(false)
        const mins = Math.floor(diff / (1000 * 60))
        const secs = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [item])

  if (item.payment || item.cancelled || item.isCompleted) return null

  return (
    <div className={`mt-2 p-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between border ${
      isExpired 
        ? 'bg-rose-50 border-rose-300 text-rose-700' 
        : 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
    }`}>
      <div className='flex items-center gap-1.5'>
        <span>{isExpired ? '⚠️' : '⏱️'}</span>
        <span>
          {isExpired 
            ? 'Payment Window Expired! Doctor slot released.' 
            : 'Payment Hold Deadline:'}
        </span>
      </div>
      {!isExpired && (
        <span className='font-mono bg-amber-200/80 px-2 py-0.5 rounded text-amber-900 font-black'>
          {timeLeft} left
        </span>
      )}
    </div>
  )
}

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)

  // Pagination state (5 appointments per page)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(appointments.length / itemsPerPage) || 1
  const paginatedAppointments = appointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const monts = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dataArray = slotDate.split('_')
    return dataArray[0] + " " + monts[Number(dataArray[1])] + " " + dataArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            toast.success("💳 Payment Successful! Your doctor consultation room is unlocked.")
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (item) => {
    // Check if 15 minute payment deadline has expired
    const bookingTimestamp = item.date || Date.now()
    const deadlineTime = item.paymentDeadline 
      ? new Date(item.paymentDeadline).getTime() 
      : bookingTimestamp + 15 * 60 * 1000

    if (Date.now() > deadlineTime) {
      toast.error("⚠️ Payment deadline expired! Doctor slot was released to avoid wasting clinic time. Please re-book a fresh slot.", {
        autoClose: 5000
      })
      return
    }

    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId: item._id }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Handle Join Telehealth Room (Requires Payment First)
  const handleJoinRoom = (item) => {
    if (!item.payment) {
      toast.warning("🔒 Payment Required: Please complete the consultation fee payment first to unlock your live telehealth video call.", {
        autoClose: 5000
      })
      return
    }
    setSelectedRoom(item)
  }

  // Handle Room Closure & Mark Consultation Complete
  const handleRoomClose = async (wasCompleted = false) => {
    const activeAppointment = selectedRoom
    setSelectedRoom(null)

    if (wasCompleted && activeAppointment) {
      try {
        const { data } = await axios.post(
          backendUrl + '/api/user/complete-appointment', 
          { appointmentId: activeAppointment._id }, 
          { headers: { token } }
        )

        if (data.success) {
          toast.success(`🎉 Consultation Completed! Dr. ${activeAppointment.docData.name} has issued your e-prescription.`, {
            autoClose: 5000
          })
          getUserAppointments()
          // Automatically pop open digital prescription for patient review
          setSelectedPrescription(activeAppointment)
        }
      } catch (error) {
        console.error("Could not complete appointment:", error)
      }
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='py-4 sm:py-6 space-y-5 sm:space-y-6 max-w-5xl mx-auto px-1 sm:px-4'>
      {/* Header Banner */}
      <div className='bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-5 sm:p-8 text-white shadow-xl shadow-indigo-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <span className='px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider border border-white/30 inline-block mb-2'>
            🩺 My Healthcare Bookings
          </span>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight'>Appointments & Digital Prescriptions</h1>
          <p className='text-indigo-100 text-xs sm:text-sm font-medium mt-1'>
            Join live HD telehealth video calls and access your online medical e-prescriptions.
          </p>
        </div>

        <button 
          onClick={() => navigate('/doctors')}
          className='bg-white text-indigo-600 hover:bg-indigo-50 font-extrabold text-xs px-6 py-3 rounded-2xl uppercase tracking-wider shadow-md transition-all shrink-0 cursor-pointer w-full sm:w-auto text-center'
        >
          + Book New Consultation
        </button>
      </div>

      {/* Appointments List */}
      <div className='flex flex-col gap-4 sm:gap-5'>
        {paginatedAppointments.length > 0 ? (
          paginatedAppointments.map((item, index) => {
            const isOnline = item.consultationType === 'Online Consultation' || 
                             (item.consultationType && item.consultationType.toLowerCase().includes('online')) ||
                             (item.meetingLink && item.meetingLink.length > 0)

            const bookingTimestamp = item.date || Date.now()
            const deadlineTime = item.paymentDeadline 
              ? new Date(item.paymentDeadline).getTime() 
              : bookingTimestamp + 15 * 60 * 1000
            const isPaymentExpired = !item.payment && Date.now() > deadlineTime

            return (
              <div 
                key={index}
                className={`bg-white border-2 rounded-3xl p-4 sm:p-6 shadow-xl transition-all flex flex-col lg:flex-row gap-5 lg:gap-6 items-start lg:items-center justify-between ${
                  item.isCompleted 
                    ? 'border-emerald-300 bg-emerald-50/20' 
                    : item.cancelled || isPaymentExpired
                    ? 'border-rose-200 bg-rose-50/10' 
                    : 'border-indigo-200/90 shadow-slate-300/50 hover:border-indigo-500'
                }`} 
              >
                {/* Doctor Photo & Details */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0 w-full'>
                  <img 
                    className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-indigo-100 bg-indigo-50 shadow-md shrink-0' 
                    src={item.docData.image} 
                    alt={item.docData.name} 
                  />

                  <div className='space-y-1 flex-1 min-w-0 w-full'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <h2 className='text-slate-900 font-extrabold text-base sm:text-lg tracking-tight truncate'>
                        {item.docData.name}
                      </h2>
                      <span className='px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-black text-[10px] uppercase border border-indigo-200'>
                        {item.docData.speciality}
                      </span>
                    </div>

                    <p className='text-slate-500 font-medium text-xs'>
                      {item.docData.degree} • {item.docData.experience} Experience
                    </p>

                    <div className='pt-1 space-y-1'>
                      <p className='text-xs font-bold text-slate-700 flex flex-wrap items-center gap-2'>
                        <span className='bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100'>
                          📅 {slotDateFormat(item.slotDate)}
                        </span>
                        <span className='bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-100'>
                          ⏰ {item.slotTime}
                        </span>
                      </p>

                      <p className='text-xs text-slate-500 font-semibold flex items-center gap-1.5 pt-0.5'>
                        <span>{isOnline ? '💻' : '🏥'}</span>
                        <span>{isOnline ? 'Online Tele-Consultation (HD Video)' : `In-Clinic: ${item.docData.address.line1}`}</span>
                      </p>
                    </div>

                    {/* Payment Timer Component */}
                    <PaymentCountdownTimer item={item} />
                  </div>
                </div>

                {/* Status Badges & Action Buttons */}
                <div className='flex flex-col gap-2.5 w-full lg:w-48 shrink-0 border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0'>
                  {item.payment && !item.isCompleted && !item.cancelled && (
                    <span className='w-full text-center py-2 px-3 rounded-2xl font-extrabold text-xs text-emerald-700 bg-emerald-50 border border-emerald-300 flex items-center justify-center gap-1 shadow-xs'>
                      <span>✓</span> Paid & Confirmed
                    </span>
                  )}

                  {isOnline && !item.isCompleted && !item.cancelled && (
                    <button 
                      onClick={() => handleJoinRoom(item)}
                      className={`w-full py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        item.payment 
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-200 hover:scale-[1.02]' 
                          : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-indigo-200'
                      }`}
                    >
                      <span>📹</span>
                      <span>{item.payment ? 'Join Video Room' : 'Unlock Video Room'}</span>
                    </button>
                  )}

                  {!item.payment && !item.cancelled && !item.isCompleted && !isPaymentExpired && (
                    <button 
                      onClick={() => appointmentRazorpay(item)} 
                      className='w-full py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-200 transition-all cursor-pointer flex items-center justify-center gap-1.5'
                    >
                      <span>💳</span> Pay Online (₹{item.docData.fees})
                    </button>
                  )}

                  {item.prescription && (
                    <button 
                      onClick={() => setSelectedPrescription(item)}
                      className='w-full py-2.5 px-4 rounded-2xl font-extrabold text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs'
                    >
                      <span>📜</span> View Digital Rx
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='w-full py-2.5 px-4 rounded-2xl font-bold text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200/80 transition-all cursor-pointer text-center'
                    >
                      Cancel Appointment
                    </button>
                  )}

                  {item.cancelled && (
                    <button className='w-full py-2.5 px-5 rounded-2xl font-extrabold text-xs text-rose-600 bg-rose-50 border border-rose-200 cursor-default'>
                      Appointment Cancelled
                    </button>
                  )}

                  {item.isCompleted && (
                    <button className='w-full py-2.5 px-5 rounded-2xl font-extrabold text-xs text-emerald-700 bg-emerald-100 border border-emerald-300 cursor-default flex items-center justify-center gap-1.5'>
                      <span>✓</span> Completed & Prescription Issued
                    </button>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <div className='py-16 text-center bg-white border-2 border-indigo-200/90 rounded-3xl shadow-xl shadow-slate-300/50 space-y-4'>
            <div className='w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold mx-auto'>
              📅
            </div>
            <h2 className='text-xl font-black text-slate-900'>No Booked Appointments Yet</h2>
            <p className='text-slate-500 font-medium text-xs sm:text-sm max-w-sm mx-auto'>
              Book your first online telehealth video call or in-clinic visit with our verified specialist doctors.
            </p>
            <button 
              onClick={() => navigate('/doctors')} 
              className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-8 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-indigo-200 transition-all cursor-pointer'
            >
              Explore Verified Doctors
            </button>
          </div>
        )}
      </div>

      {/* Clean Pagination Control Bar */}
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

      {/* Digital Prescription Modal */}
      {selectedPrescription && (
        <PrescriptionModal 
          appointment={selectedPrescription} 
          onClose={() => setSelectedPrescription(null)} 
        />
      )}

      {/* Live Telehealth Video Call Room Modal */}
      {selectedRoom && (
        <ConsultationRoomModal 
          appointment={selectedRoom} 
          onClose={(wasCompleted) => handleRoomClose(wasCompleted)} 
        />
      )}
    </div>
  )
}

export default MyAppointments