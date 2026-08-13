import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const AdminProfile = () => {

  const { adminProfile, updateAdminProfileData } = useContext(AdminContext)
  const [isEdit, setIsEdit] = useState(false)

  const [formData, setFormData] = useState({
    name: adminProfile.name || 'System Administrator',
    email: adminProfile.email || 'admin@carepulse.com',
    role: adminProfile.role || 'Super Administrator',
    phone: adminProfile.phone || '+91 98765 43210',
    address: {
      line1: adminProfile.address?.line1 || 'CarePulse HQ, Tech Tower 4',
      line2: adminProfile.address?.line2 || 'Healthcare District, Mumbai 400001'
    },
    image: adminProfile.image || ''
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    updateAdminProfileData(formData)
    setIsEdit(false)
  }

  return (
    <div className='w-full max-w-5xl mx-auto space-y-6 pb-0 select-none'>
      
      {/* 🚀 Executive Dark Hero Banner */}
      <div className='bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-indigo-500/30 backdrop-blur-xl'>
        
        {/* Background Glow */}
        <div className='absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-48 h-48 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-2 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            🛡️ SYSTEM ADMINISTRATOR PROFILE & SECURITY DESK
          </div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight'>
            Admin Profile & Permissions
          </h1>
          <p className='text-xs text-indigo-100/90 font-medium leading-relaxed'>
            Manage core administrator contact details, organizational role titles, security clearance, and platform operations privileges.
          </p>
        </div>

        {/* Live Admin Telemetry Widget */}
        <div className='z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl shrink-0'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center text-xl font-bold shadow-md'>
            🛡️
          </div>
          <div>
            <p className='text-xs font-black text-white leading-none uppercase tracking-wider'>Access Level</p>
            <p className='text-[10px] font-black text-emerald-300 uppercase tracking-widest mt-1'>
              FULL ROOT CLEARANCE
            </p>
          </div>
        </div>

      </div>

      {/* Main Profile Card Container with 2px Borders */}
      <div className='bg-white/95 backdrop-blur-xl border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-indigo-100/50 flex flex-col md:flex-row gap-8 items-start'>

        {/* Admin Profile Photo / Avatar Upload Box */}
        <div className='relative shrink-0 w-full md:w-64 space-y-3 text-center'>
          <div className='relative group rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 p-2 border-2 border-indigo-400 shadow-md ring-4 ring-indigo-500/20'>
            <img 
              className='w-full h-64 object-cover rounded-2xl bg-white shadow-inner' 
              src={formData.image || assets.admin_logo} 
              alt="Admin Profile" 
            />
            {isEdit && (
              <label className='absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white cursor-pointer opacity-90 transition-all'>
                <span className='text-2xl mb-1'>📸</span>
                <span className='text-xs font-black uppercase tracking-wider'>Upload Photo</span>
                <input type="file" onChange={handleImageChange} accept="image/*" className='hidden' />
              </label>
            )}
          </div>
          <span className='inline-block px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider border border-indigo-200 shadow-2xs'>
            Role: {formData.role}
          </span>
        </div>

        {/* Admin Info Block */}
        <div className='flex-1 space-y-6 w-full text-slate-800'>
          
          {/* Header Title Section */}
          <div className='space-y-2 pb-4 border-b-2 border-slate-100'>
            <span className='text-[10.5px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200 shadow-2xs'>
              ⚡ SUPER ADMIN CREDENTIALS
            </span>
            
            {isEdit ? (
              <div className='space-y-2 mt-2'>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className='w-full px-4 py-2.5 rounded-2xl border-2 border-indigo-400 font-black text-slate-900 text-xl focus:outline-none focus:ring-4 focus:ring-indigo-100'
                  placeholder="Admin Name"
                />
              </div>
            ) : (
              <h2 className='text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2'>{formData.name}</h2>
            )}

            <p className='text-xs font-bold text-slate-500 flex items-center gap-2'>
              <span>📧 {formData.email}</span>
              <span>•</span>
              <span>📞 {formData.phone}</span>
            </p>
          </div>

          {/* Core System Permissions Section */}
          <div className='space-y-2'>
            <p className='text-[11px] font-black uppercase tracking-wider text-indigo-900'>System Operations Clearance & Permissions</p>
            <div className='flex flex-wrap gap-2 pt-1'>
              {['Full Root Access', 'Doctor Onboarding', 'Appointments Telemetry', 'Career Hiring Operations', 'System Analytics'].map((perm, i) => (
                <span key={i} className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border-2 border-emerald-300 text-[11px] font-extrabold flex items-center gap-1.5 shadow-2xs'>
                  <span>✓</span> {perm}
                </span>
              ))}
            </div>
          </div>

          {/* Form Fields Cards with 2px Borders */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black text-slate-800'>
            
            {/* Email Card */}
            <div className='space-y-1.5 bg-indigo-50/60 p-4 rounded-2xl border-2 border-indigo-300 shadow-2xs'>
              <p className='text-[10px] uppercase tracking-wider text-indigo-700 font-black'>Administrator Email</p>
              {isEdit ? (
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className='w-full px-3 py-1.5 rounded-xl border-2 border-indigo-400 font-bold bg-white text-xs text-slate-900 focus:outline-none'
                />
              ) : (
                <p className='text-sm font-black text-slate-900'>{formData.email}</p>
              )}
            </div>

            {/* Phone Card */}
            <div className='space-y-1.5 bg-purple-50/60 p-4 rounded-2xl border-2 border-purple-300 shadow-2xs'>
              <p className='text-[10px] uppercase tracking-wider text-purple-700 font-black'>Contact Phone Number</p>
              {isEdit ? (
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className='w-full px-3 py-1.5 rounded-xl border-2 border-purple-400 font-bold bg-white text-xs text-slate-900 focus:outline-none'
                />
              ) : (
                <p className='text-sm font-black text-slate-900'>{formData.phone}</p>
              )}
            </div>

          </div>

          {/* Address Card with 2px Borders */}
          <div className='space-y-1.5 bg-slate-50 p-3 rounded-2xl border-2 border-slate-200/90 shadow-2xs'>
            <p className='text-[10px] uppercase tracking-wider text-slate-500 font-black'>Headquarters / Office Location</p>
            {isEdit ? (
              <div className='space-y-2 mt-1'>
                <input 
                  type="text" 
                  value={formData.address.line1}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  className='w-full px-3 py-2 rounded-xl border-2 border-slate-300 font-bold text-xs bg-white focus:outline-none focus:border-indigo-600'
                  placeholder="Address Line 1"
                />
                <input 
                  type="text" 
                  value={formData.address.line2}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  className='w-full px-3 py-2 rounded-xl border-2 border-slate-300 font-bold text-xs bg-white focus:outline-none focus:border-indigo-600'
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className='text-xs font-extrabold text-slate-700 leading-snug mt-1'>
                {formData.address.line1}<br />{formData.address.line2}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className='pt-2 flex items-center gap-3'>
            {isEdit ? (
              <>
                <button 
                  onClick={handleSave}
                  className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 border-2 border-indigo-400 transition-all cursor-pointer transform hover:scale-105'
                >
                  💾 Save Profile Changes
                </button>
                <button 
                  onClick={() => setIsEdit(false)}
                  className='px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider border-2 border-slate-300 transition-all cursor-pointer'
                >
                  ✕ Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEdit(true)}
                className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 border-2 border-indigo-400 transition-all cursor-pointer transform hover:scale-105'
              >
                ✏️ Edit Admin Profile
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminProfile
