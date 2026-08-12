import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const navigate = useNavigate()
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateUserProfileData = async () => {
    try {
      setIsUpdating(true)
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message || "Profile updated successfully!")
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update profile")
    } finally {
      setIsUpdating(false)
    }
  }

  // If user is not logged in, show a high-contrast login callout card
  if (!userData && !token) {
    return (
      <div className='py-12 max-w-xl mx-auto text-center space-y-6'>
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-300/60 space-y-5'>
          <div className='w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold mx-auto shadow-sm'>
            👤
          </div>
          <h2 className='text-2xl font-black text-slate-900 tracking-tight'>
            Access Your CarePulse Profile
          </h2>
          <p className='text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto'>
            Please log in or create an account to view and manage your personal medical details, appointment history, and contact information.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className='bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-200 transition-all duration-300 cursor-pointer'
          >
            🔐 Log In / Register Now
          </button>
        </div>
      </div>
    )
  }

  return userData && (
    <div className='py-6 space-y-8 max-w-4xl mx-auto'>
      {/* Hero Banner Section */}
      <div className='bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-indigo-200/60 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6'>
        <div className='absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-1/3 w-60 h-60 bg-violet-400/20 rounded-full blur-2xl pointer-events-none' />

        <div className='z-10 text-center sm:text-left space-y-2'>
          <span className='px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider border border-white/30 inline-block shadow-sm'>
            👤 Patient Dashboard
          </span>
          <h1 className='text-2xl sm:text-4xl font-black tracking-tight'>
            Personal <span className='text-indigo-200'>Profile Settings</span>
          </h1>
          <p className='text-indigo-100 text-xs sm:text-sm font-medium'>
            Manage your personal credentials, contact numbers, and medical booking profile.
          </p>
        </div>

        {/* Status Badge */}
        <div className='z-10 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl px-5 py-3 text-center shadow-lg shrink-0 flex items-center gap-3'>
          <div className='w-3 h-3 rounded-full bg-emerald-400 animate-pulse' />
          <div className='text-left'>
            <p className='text-xs font-black text-white uppercase tracking-wider'>Account Active</p>
            <p className='text-[10px] text-indigo-200 font-bold'>Verified Patient</p>
          </div>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-300/60 space-y-8'>
        
        {/* Avatar & Header Info */}
        <div className='flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-8'>
          {isEdit ? (
            <label htmlFor="image" className='relative cursor-pointer group shrink-0'>
              <div className='w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-indigo-500/20 shadow-xl relative'>
                <img 
                  className='w-full h-full object-cover group-hover:opacity-75 transition-opacity' 
                  src={image ? URL.createObjectURL(image) : userData.image} 
                  alt="User Profile Avatar" 
                />
                <div className='absolute inset-0 bg-slate-950/50 flex flex-col items-center justify-center text-white opacity-90 group-hover:opacity-100 transition-opacity gap-1'>
                  <span className='text-xl'>📷</span>
                  <span className='text-[10px] font-extrabold uppercase'>Upload Photo</span>
                </div>
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <div className='relative shrink-0'>
              <img 
                className='w-32 h-32 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-xl' 
                src={userData.image} 
                alt="User Profile Avatar" 
              />
              <span className='absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-md'>
                ✓ Active
              </span>
            </div>
          )}

          <div className='flex flex-col items-center sm:items-start justify-center gap-2 flex-1 text-center sm:text-left w-full'>
            {isEdit ? (
              <div className='w-full max-w-md'>
                <label className='block text-xs font-extrabold text-slate-700 mb-1'>Full Name *</label>
                <input 
                  className='w-full bg-slate-50 border-2 border-indigo-200 rounded-2xl px-4 py-2.5 text-lg font-black text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all' 
                  type="text" 
                  value={userData.name} 
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                />
              </div>
            ) : (
              <div>
                <h1 className='font-black text-2xl sm:text-3xl text-slate-900 tracking-tight'>{userData.name}</h1>
                <p className='text-xs text-indigo-600 font-extrabold mt-0.5'>Registered CarePulse Patient</p>
              </div>
            )}

            <div className='flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1'>
              <span className='px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold'>
                ✉️ {userData.email}
              </span>
              <span className='px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-extrabold'>
                🆔 Patient ID: #{userData._id ? userData._id.slice(-6).toUpperCase() : '847291'}
              </span>
            </div>
          </div>

          <div className='shrink-0 w-full sm:w-auto'>
            {isEdit ? (
              <button 
                disabled={isUpdating}
                className='w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-200 transition-all duration-300 cursor-pointer' 
                onClick={updateUserProfileData}
              >
                {isUpdating ? 'Saving...' : '💾 Save Changes'}
              </button>
            ) : (
              <button 
                className='w-full sm:w-auto border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-extrabold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm' 
                onClick={() => setIsEdit(true)}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Contact Information Card */}
        <div className='space-y-4'>
          <div className='flex items-center gap-2 border-b border-slate-100 pb-3'>
            <div className='w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold'>
              📞
            </div>
            <h2 className='text-base font-extrabold text-slate-900 uppercase tracking-wide'>
              Contact & Address Details
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-bold text-slate-700'>
            <div>
              <label className='block text-slate-500 mb-1 font-semibold'>Email Address (Primary)</label>
              <p className='bg-slate-50 border-2 border-slate-200/80 rounded-2xl px-4 py-3 text-slate-900 font-bold'>
                {userData.email}
              </p>
            </div>

            <div>
              <label className='block text-slate-500 mb-1 font-semibold'>Phone Number</label>
              {isEdit ? (
                <input 
                  className='w-full bg-slate-50 border-2 border-indigo-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all' 
                  type="text" 
                  value={userData.phone} 
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                />
              ) : (
                <p className='bg-slate-50 border-2 border-slate-200/80 rounded-2xl px-4 py-3 text-slate-900 font-bold'>
                  {userData.phone || 'Not Provided'}
                </p>
              )}
            </div>

            <div className='md:col-span-2'>
              <label className='block text-slate-500 mb-1 font-semibold'>Residential Address</label>
              {isEdit ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <input 
                    placeholder="Address Line 1"
                    className='w-full bg-slate-50 border-2 border-indigo-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all' 
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                    value={userData.address?.line1 || ''} 
                    type="text" 
                  />
                  <input 
                    placeholder="Address Line 2 (City, State, Zip)"
                    className='w-full bg-slate-50 border-2 border-indigo-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all' 
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                    value={userData.address?.line2 || ''} 
                    type="text" 
                  />
                </div>
              ) : (
                <div className='bg-slate-50 border-2 border-slate-200/80 rounded-2xl px-4 py-3 text-slate-900 font-bold leading-relaxed'>
                  <p>{userData.address?.line1 || '54709 Willms Station'}</p>
                  <p>{userData.address?.line2 || 'Suite 350, Washington, USA'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Demographics Card */}
        <div className='space-y-4 pt-4 border-t border-slate-100'>
          <div className='flex items-center gap-2 border-b border-slate-100 pb-3'>
            <div className='w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold'>
              📋
            </div>
            <h2 className='text-base font-extrabold text-slate-900 uppercase tracking-wide'>
              Demographics & Information
            </h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm font-bold text-slate-700'>
            <div>
              <label className='block text-slate-500 mb-1 font-semibold'>Gender</label>
              {isEdit ? (
                <select 
                  className='w-full bg-slate-50 border-2 border-indigo-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer transition-all' 
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                  value={userData.gender}
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className='bg-slate-50 border-2 border-slate-200/80 rounded-2xl px-4 py-3 text-slate-900 font-bold'>
                  {userData.gender || 'Not Selected'}
                </p>
              )}
            </div>

            <div>
              <label className='block text-slate-500 mb-1 font-semibold'>Date of Birth</label>
              {isEdit ? (
                <input 
                  className='w-full bg-slate-50 border-2 border-indigo-200 rounded-2xl px-4 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all cursor-pointer' 
                  type="date" 
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                  value={userData.dob}
                />
              ) : (
                <p className='bg-slate-50 border-2 border-slate-200/80 rounded-2xl px-4 py-3 text-slate-900 font-bold'>
                  {userData.dob || 'Not Selected'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className='flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100'>
          <button 
            onClick={() => navigate('/my-appointments')}
            className='bg-slate-100 hover:bg-indigo-50 text-indigo-700 font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider border border-indigo-100 transition-all cursor-pointer'
          >
            📅 View My Appointments →
          </button>
          
          {isEdit && (
            <button 
              onClick={() => { setIsEdit(false); setImage(false); }}
              className='text-slate-500 hover:text-slate-700 text-xs font-extrabold px-4 py-2 cursor-pointer'
            >
              Cancel Editing
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default MyProfile