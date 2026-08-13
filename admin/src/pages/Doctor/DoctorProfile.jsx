import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='w-full max-w-5xl mx-auto space-y-8 pb-12 select-none'>
      
      {/* 1. Executive Medical Hero Banner */}
      <div className='bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-indigo-400/30'>
        
        {/* Glowing Background Spheres */}
        <div className='absolute -right-12 -bottom-12 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-56 h-56 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-3 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 font-extrabold rounded-full text-xs uppercase tracking-wider shadow-sm'>
            <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse'></span>
            👨‍⚕️ Clinical Practitioner Settings
          </div>
          <h1 className='text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight'>
            Doctor Profile & Settings
          </h1>
          <p className='text-xs sm:text-sm text-indigo-100/90 font-medium leading-relaxed'>
            Manage your clinical credentials, consultation fee rate (₹), practice location, and real-time appointment booking availability.
          </p>
        </div>

        {/* Live Booking Availability Status Badge */}
        <div className='z-10 flex items-center gap-4 bg-white/15 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/30 shadow-2xl shrink-0'>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md ${
            profileData.available 
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white ring-4 ring-emerald-400/30' 
              : 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white ring-4 ring-rose-400/30'
          }`}>
            🩺
          </div>
          <div>
            <p className='text-xs font-black text-white uppercase tracking-wider'>Booking Status</p>
            <p className={`text-xs font-black uppercase tracking-widest mt-1 flex items-center gap-1.5 ${
              profileData.available ? 'text-emerald-300' : 'text-rose-300'
            }`}>
              <span>{profileData.available ? '🟢 AVAILABLE TODAY' : '🔴 OFFLINE'}</span>
            </p>
          </div>
        </div>

      </div>

      {/* 2. Main Profile Workspace Card */}
      <div className='bg-white/95 backdrop-blur-xl border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-indigo-100/50 space-y-8'>

        {/* Top Doctor Profile Header & Avatar */}
        <div className='flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-slate-100 pb-8'>
          
          {/* Avatar Container */}
          <div className='relative shrink-0 w-44 sm:w-52'>
            <div className='relative rounded-3xl overflow-hidden ring-4 ring-indigo-500/20 shadow-2xl border-2 border-indigo-400 bg-indigo-50 aspect-[4/4.5]'>
              <img 
                className='w-full h-full object-cover object-top' 
                src={profileData.image} 
                alt={profileData.name} 
              />
            </div>
            <span className={`absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10.5px] font-black px-4 py-1.5 rounded-full border-2 shadow-lg whitespace-nowrap ${
              profileData.available 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-400' 
                : 'bg-rose-50 text-rose-800 border-rose-400'
            }`}>
              {profileData.available ? '🟢 Active Practice' : '🔴 Offline'}
            </span>
          </div>

          {/* Core Info & Degree Badges */}
          <div className='flex-1 space-y-4 text-center md:text-left w-full'>
            <div>
              <span className='inline-block px-4 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs uppercase tracking-wider shadow-2xs mb-2'>
                🩺 {profileData.speciality}
              </span>
              <h2 className='text-3xl sm:text-4xl font-black text-slate-900 tracking-tight'>{profileData.name}</h2>
              <p className='text-xs font-bold text-slate-500 mt-1'>
                Licensed Medical Practitioner • CarePulse Health Network
              </p>
            </div>

            <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1'>
              <span className='px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs'>
                <span>🎓</span> {profileData.degree}
              </span>
              <span className='px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs'>
                <span>⭐</span> {profileData.experience} Clinical Experience
              </span>
            </div>

            {/* Quick Consultation Fee Banner */}
            <div className='inline-flex items-center gap-3 bg-gradient-to-r from-slate-50 to-indigo-50/60 p-4 rounded-2xl border-2 border-indigo-100 shadow-2xs max-w-md w-full'>
              <div className='w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md'>
                ₹
              </div>
              <div className='text-left'>
                <p className='text-[10px] font-extrabold uppercase tracking-wider text-slate-500'>Consultation Fee</p>
                <p className='text-lg font-black text-slate-900 leading-tight'>
                  {currency || '₹'}{profileData.fees} <span className='text-xs font-bold text-slate-500'>/ Session</span>
                </p>
              </div>
            </div>

          </div>

          {/* Top Primary Action Button */}
          <div className='shrink-0 w-full md:w-auto flex justify-center'>
            {isEdit ? (
              <button 
                onClick={updateProfile} 
                className='w-full md:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 border-2 border-emerald-400 transition-all cursor-pointer transform hover:scale-105'
              >
                💾 Save Profile Changes
              </button>
            ) : (
              <button 
                onClick={() => setIsEdit(true)} 
                className='w-full md:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-indigo-300 border-2 border-indigo-400 transition-all cursor-pointer transform hover:scale-105'
              >
                ✏️ Edit Profile Settings
              </button>
            )}
          </div>

        </div>

        {/* Professional Biography Section */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2 border-b border-slate-100 pb-3'>
            <div className='w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold'>
              📋
            </div>
            <h3 className='text-base font-extrabold text-slate-900 uppercase tracking-wide'>
              Professional Biography
            </h3>
          </div>
          <div className='bg-slate-50/90 p-5 sm:p-6 rounded-2xl border-2 border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-bold'>
            "{profileData.about}"
          </div>
        </div>

        {/* Practice Details & Editable Settings Form */}
        <div className='space-y-4'>
          <div className='flex items-center gap-2 border-b border-slate-100 pb-3'>
            <div className='w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold'>
              📍
            </div>
            <h3 className='text-base font-extrabold text-slate-900 uppercase tracking-wide'>
              Practice & Financial Settings
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            
            {/* Consultation Fee Input / View */}
            <div className='space-y-2 bg-slate-50/80 p-5 rounded-2xl border-2 border-slate-200/90'>
              <label className='block text-xs font-extrabold text-slate-700 uppercase tracking-wider'>
                Consultation Fee (₹ INR) *
              </label>
              {isEdit ? (
                <div className='relative flex items-center'>
                  <span className='absolute left-4 font-black text-slate-500 text-sm'>₹</span>
                  <input 
                    type="number" 
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                    value={profileData.fees} 
                    className='w-full pl-9 pr-4 py-3 rounded-xl border-2 border-indigo-300 font-black text-slate-900 bg-white text-base focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all'
                  />
                </div>
              ) : (
                <div className='bg-white p-3.5 rounded-xl border border-slate-200 font-black text-lg text-slate-900'>
                  ₹ {profileData.fees}
                </div>
              )}
            </div>

            {/* Availability Toggle Box */}
            <div className='space-y-2 bg-slate-50/80 p-5 rounded-2xl border-2 border-slate-200/90 flex flex-col justify-center'>
              <label className='block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1'>
                Patient Booking Status *
              </label>
              <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                profileData.available 
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-400 font-extrabold' 
                  : 'bg-rose-50 text-rose-900 border-rose-300 font-extrabold'
              }`}>
                <input 
                  onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                  checked={profileData.available} 
                  type="checkbox" 
                  disabled={!isEdit}
                  className='accent-emerald-600 w-5 h-5 rounded cursor-pointer' 
                />
                <span className='text-xs uppercase tracking-wider'>
                  {profileData.available ? '🟢 Accepting New Appointments' : '🔴 Practice Currently Offline'}
                </span>
              </label>
            </div>

            {/* Clinic Address Input / View */}
            <div className='md:col-span-2 space-y-2 bg-slate-50/80 p-5 rounded-2xl border-2 border-slate-200/90'>
              <label className='block text-xs font-extrabold text-slate-700 uppercase tracking-wider'>
                Clinic Address & Location *
              </label>
              {isEdit ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <input 
                    type="text" 
                    placeholder="Address Line 1 (Street/Tower)"
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                    value={profileData.address?.line1 || ''} 
                    className='w-full px-4 py-3 rounded-xl border-2 border-indigo-300 text-xs font-bold bg-white focus:outline-none focus:border-indigo-600 transition-all'
                  />
                  <input 
                    type="text" 
                    placeholder="Address Line 2 (City, Area, Pin)"
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                    value={profileData.address?.line2 || ''} 
                    className='w-full px-4 py-3 rounded-xl border-2 border-indigo-300 text-xs font-bold bg-white focus:outline-none focus:border-indigo-600 transition-all'
                  />
                </div>
              ) : (
                <div className='bg-white p-4 rounded-xl border border-slate-200 font-extrabold text-xs text-slate-800 leading-relaxed'>
                  📍 {profileData.address?.line1 || 'Main Medical Tower'}<br />
                  🏙️ {profileData.address?.line2 || 'Healthcare District'}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Save / Cancel Action Bar */}
        <div className='flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100'>
          {isEdit ? (
            <div className='flex items-center gap-4 w-full sm:w-auto'>
              <button 
                onClick={updateProfile} 
                className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 border-2 border-emerald-400 transition-all cursor-pointer'
              >
                💾 Save Profile Changes
              </button>
              <button 
                onClick={() => setIsEdit(false)} 
                className='px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer'
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEdit(true)} 
              className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-indigo-300 border-2 border-indigo-400 transition-all cursor-pointer'
            >
              ✏️ Edit Profile Settings
            </button>
          )}

          <p className='text-[11px] font-bold text-slate-400'>
            CarePulse Medical Network • License Verification Active
          </p>
        </div>

      </div>

    </div>
  )
}

export default DoctorProfile
