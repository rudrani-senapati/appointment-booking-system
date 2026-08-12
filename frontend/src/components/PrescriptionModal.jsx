import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'react-toastify'

const PrescriptionModal = ({ appointment, onClose }) => {
  if (!appointment) return null

  // Prevent background page scroll while prescription modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  const rx = appointment.prescription || {
    rxId: 'CP-RX-849201',
    issuedDate: new Date().toLocaleDateString(),
    diagnosis: `Medical Consultation (${appointment.docData.speciality})`,
    notes: 'Rest well, drink 3 liters of water daily, avoid cold beverages. Re-consult if symptoms persist after 5 days.',
    medicines: [
      { name: 'Amoxicillin Trihydrate 500mg', dosage: '1-0-1 (After Food)', duration: '5 Days', instructions: 'Take with warm water' },
      { name: 'Paracetamol 650mg (Dolo)', dosage: '1-0-1 (As Needed)', duration: '3 Days', instructions: 'Take for fever or body pain' },
      { name: 'Cetirizine Hydrochloride 10mg', dosage: '0-0-1 (At Night)', duration: '5 Days', instructions: 'May cause mild drowsiness' },
      { name: 'Vitamin C & Zinc Chewables', dosage: '1 Tablet Daily', duration: '10 Days', instructions: 'Chew thoroughly after breakfast' }
    ]
  }

  const handlePrint = () => {
    window.print()
  }

  const handleOrderPharmacy = () => {
    toast.success("🛒 Redirecting to CarePulse Partner Online Pharmacy (Tata 1mg)...", {
      autoClose: 3000
    })
    window.open("https://www.1mg.com", "_blank", "noopener,noreferrer")
  }

  return createPortal(
    <div className='modal-print-wrapper fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn select-none'>
      
      {/* Printable Medical Document Container */}
      <div 
        id="printable-prescription"
        className='bg-white border-2 border-indigo-300 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto text-slate-900 ring-1 ring-slate-900/10'
      >
        
        {/* Prescription Header */}
        <div 
          className='bg-indigo-700 text-white p-5 sm:p-7 relative shrink-0 shadow-md'
          style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', backgroundColor: '#4338ca' }}
        >
          <button 
            onClick={onClose}
            className='no-print absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer shadow-sm'
          >
            ✕
          </button>
          
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-10 h-10 rounded-2xl bg-white text-indigo-700 flex items-center justify-center text-xl font-black shadow-md shrink-0'>
              💊
            </div>
            <div>
              <h2 className='text-xl sm:text-2xl font-black tracking-tight text-white'>Care<span className='text-indigo-200'>Pulse</span> Medical Center</h2>
              <p className='text-indigo-100 text-[11px] font-bold uppercase tracking-wider'>Official Digital E-Prescription Document</p>
            </div>
          </div>

          <div className='flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/20 text-xs font-semibold text-indigo-100 mt-3'>
            <p><strong>Rx License No:</strong> REG-IN-892410</p>
            <p><strong>Prescription ID:</strong> <span className='bg-white/20 px-2.5 py-0.5 rounded-full text-white font-mono font-bold'>{rx.rxId}</span></p>
            <p><strong>Date Issued:</strong> {rx.issuedDate}</p>
          </div>
        </div>

        {/* Printable Content Body */}
        <div 
          id="printable-prescription-body"
          className='p-5 sm:p-7 space-y-5 overflow-y-auto overscroll-contain scroll-smooth flex-1 text-slate-900 custom-scrollbar'
        >
          
          {/* Doctor & Patient Info Grid */}
          <div 
            className='grid grid-cols-2 gap-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm font-semibold'
            style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
          >
            <div className='space-y-1 border-r border-indigo-200 pr-4'>
              <p className='text-indigo-600 font-extrabold uppercase text-[10px] tracking-wider'>Prescribing Doctor</p>
              <h3 className='text-base font-black text-slate-900'>{appointment.docData.name}</h3>
              <p className='text-slate-700'>{appointment.docData.degree} ({appointment.docData.speciality})</p>
              <p className='text-slate-500 text-xs'>Experience: {appointment.docData.experience}</p>
            </div>

            <div className='space-y-1 pl-2'>
              <p className='text-indigo-600 font-extrabold uppercase text-[10px] tracking-wider'>Patient Details</p>
              <h3 className='text-base font-black text-slate-900'>{appointment.userData.name}</h3>
              <p className='text-slate-700'>Consultation: <span className='font-bold text-indigo-600'>{appointment.consultationType || 'Online Video Call'}</span></p>
              <p className='text-slate-500 text-xs'>Contact: {appointment.userData.phone || appointment.userData.email}</p>
            </div>
          </div>

          {/* Clinical Diagnosis */}
          <div className='space-y-1.5'>
            <span className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Clinical Diagnosis & Findings</span>
            <div 
              className='bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 text-slate-900 font-bold text-sm shadow-sm'
              style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
            >
              🩺 {rx.diagnosis}
            </div>
          </div>

          {/* Prescribed Medicines Table */}
          <div className='space-y-2.5'>
            <span className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Rx - Prescribed Medicines List</span>
            <div className='overflow-x-auto border-2 border-slate-200 rounded-2xl shadow-sm'>
              <table className='w-full text-left text-xs sm:text-sm border-collapse'>
                <thead 
                  className='bg-slate-100 text-slate-700 font-extrabold uppercase text-[11px] border-b border-slate-200'
                  style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                >
                  <tr>
                    <th className='p-3 sm:p-3.5'>Medicine & Dosage</th>
                    <th className='p-3 sm:p-3.5'>Frequency</th>
                    <th className='p-3 sm:p-3.5'>Duration</th>
                    <th className='p-3 sm:p-3.5'>Instructions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-100 font-medium text-slate-800'>
                  {rx.medicines && rx.medicines.map((med, idx) => (
                    <tr key={idx} className='hover:bg-indigo-50/50 transition-colors'>
                      <td className='p-3 sm:p-3.5 font-bold text-slate-900'>💊 {med.name}</td>
                      <td className='p-3 sm:p-3.5 font-semibold text-indigo-700'>{med.dosage}</td>
                      <td className='p-3 sm:p-3.5 text-slate-600'>{med.duration}</td>
                      <td className='p-3 sm:p-3.5 text-slate-500 text-xs'>{med.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor Special Advice */}
          <div className='space-y-1.5'>
            <span className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Doctor Special Advice</span>
            <p className='bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium shadow-sm'>
              💡 {rx.notes}
            </p>
          </div>

          {/* Official Verification Seal & Signature */}
          <div className='flex items-center justify-between border-t-2 border-slate-200 pt-4 mt-4'>
            <div className='flex items-center gap-2.5'>
              <div 
                className='w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-lg font-bold shadow-sm shrink-0'
                style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                ✓
              </div>
              <div className='text-[11px] font-bold text-slate-600'>
                <p className='text-slate-900 font-black'>CarePulse Verified E-Stamp</p>
                <p className='text-slate-400'>Digitally Signed & Valid Nationwide</p>
              </div>
            </div>

            <div className='text-right'>
              <p className='font-serif italic font-bold text-indigo-900 text-base sm:text-lg'>Dr. {appointment.docData.name}</p>
              <p className='text-[10px] font-extrabold uppercase text-indigo-600 tracking-wider'>Authorized Medical Officer</p>
            </div>
          </div>

        </div>

        {/* Modal Action Controls Footer (Hidden when printing via no-print) */}
        <div className='no-print bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-md'>
          <button 
            onClick={handlePrint}
            className='bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm'
          >
            🖨️ Print / Save PDF
          </button>

          <div className='flex items-center gap-3 w-full sm:w-auto'>
            <button 
              onClick={handleOrderPharmacy}
              className='bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-100 transition-all cursor-pointer flex-1 sm:flex-initial'
            >
              💊 Order Medicines Online
            </button>
            <button 
              onClick={onClose}
              className='bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer'
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  )
}

export default PrescriptionModal
