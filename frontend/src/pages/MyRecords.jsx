import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import PrescriptionModal from '../components/PrescriptionModal'

const MyRecords = () => {
  const { token, backendUrl, slotDateFormat } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [filterType, setFilterType] = useState('ALL')

  const getUserAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  const records = appointments.filter(appt => {
    if (filterType === 'COMPLETED') return appt.isCompleted
    if (filterType === 'PRESCRIPTION') return appt.prescription
    return true
  })

  return (
    <div className='w-full max-w-7xl mx-auto space-y-6 pb-0 select-none'>

      {/* Header Banner */}
      <div className='bg-gradient-to-r from-sky-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-sky-500/20'>
        <div className='space-y-2 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-sky-500/20 to-teal-500/20 border border-white/20 text-sky-200 font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            📂 Patient Health Vault
          </div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight'>
            Medical Records & Prescriptions
          </h1>
          <p className='text-xs text-sky-200/90 font-medium leading-relaxed'>
            Access your complete medical history, downloaded prescriptions, and past doctor consultation summaries.
          </p>
        </div>

        <div className='z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl shrink-0'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center text-xl font-bold shadow-md'>
            📜
          </div>
          <div>
            <p className='text-xs font-black text-white leading-none uppercase tracking-wider'>{appointments.length} Total Consultations</p>
            <p className='text-[10px] font-black text-sky-300 uppercase tracking-widest mt-1'>Encrypted & Secure</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='flex items-center gap-2 border-b border-slate-200 pb-3'>
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            filterType === 'ALL'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Consultations ({appointments.length})
        </button>
        <button
          onClick={() => setFilterType('COMPLETED')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            filterType === 'COMPLETED'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          ✓ Completed ({appointments.filter(a => a.isCompleted).length})
        </button>
        <button
          onClick={() => setFilterType('PRESCRIPTION')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            filterType === 'PRESCRIPTION'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          📝 Issued Prescriptions ({appointments.filter(a => a.prescription).length})
        </button>
      </div>

      {/* Records Grid */}
      {loading ? (
        <div className='p-12 text-center text-slate-400 text-xs font-bold'>
          Loading your medical records...
        </div>
      ) : records.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {records.map((item, index) => (
            <div
              key={index}
              className='bg-white/95 backdrop-blur-xl border-2 border-sky-200/80 rounded-3xl p-5 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-sky-500 transition-all flex flex-col justify-between space-y-4'
            >
              <div className='flex items-start gap-4'>
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className='w-16 h-16 rounded-2xl bg-sky-50 object-cover border-2 border-sky-200 shrink-0'
                />
                <div className='space-y-1 flex-1 min-w-0'>
                  <div className='flex items-center justify-between gap-2'>
                    <h3 className='font-black text-slate-900 text-base truncate'>{item.docData.name}</h3>
                    <span className='text-[10px] font-extrabold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full uppercase shrink-0'>
                      {item.docData.speciality}
                    </span>
                  </div>
                  <p className='text-xs text-slate-500 font-bold'>
                    📅 {slotDateFormat(item.slotDate)} • ⏰ {item.slotTime}
                  </p>
                  <p className='text-xs text-slate-600 font-semibold truncate'>
                    🏥 {item.consultationType || 'In-Clinic Visit'}
                  </p>
                </div>
              </div>

              {/* Status Badge & Prescription Download Action */}
              <div className='pt-3 border-t border-slate-100 flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border ${
                    item.isCompleted
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : item.cancelled
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {item.isCompleted ? '✓ Completed' : item.cancelled ? '✕ Cancelled' : '⏱️ Upcoming'}
                  </span>
                </div>

                {item.prescription ? (
                  <button
                    onClick={() => setSelectedPrescription(item)}
                    className='px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-sky-200 transition-all flex items-center gap-1.5 cursor-pointer'
                  >
                    <span>📜</span> View & Print Rx
                  </button>
                ) : (
                  <span className='text-[11px] text-slate-400 font-bold italic'>No Rx attached</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='py-16 text-center bg-white border-2 border-sky-200/80 rounded-3xl shadow-xl p-8 space-y-3'>
          <div className='w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-2xl mx-auto font-black'>
            📂
          </div>
          <h3 className='text-lg font-black text-slate-900'>No Medical Records Found</h3>
          <p className='text-xs text-slate-500 font-medium max-w-sm mx-auto'>
            Completed doctor consultations and issued prescriptions will be archived safely in your health vault.
          </p>
        </div>
      )}

      {/* Digital Prescription Printable Modal */}
      {selectedPrescription && (
        <PrescriptionModal
          appointment={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />
      )}

    </div>
  )
}

export default MyRecords
