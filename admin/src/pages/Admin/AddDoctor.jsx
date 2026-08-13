import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {


      const [docImg,setDocImg] = useState(false)
      const [name,setName] = useState('')
      const [email,setEmail] = useState('')
      const [password,setPassword] = useState('')
      const [experience,setExperience] = useState('1 Year')
      const [fees,setFees] = useState('')
      const [about,setAbout] = useState('')
      const [speciality,setSpeciality] = useState('General physician')
      const [degree,setDegree] = useState('')
      const [address1,setAddress1] = useState('')
      const [address2,setAddress2] = useState('')

      const { backendUrl,aToken } = useContext(AdminContext)

      const onSubmitHandler = async (event) => {
        event.preventDefault()


        try {
          
          if (!docImg){
            return toast.error('Image Not Selected')
          }

          const formData = new FormData()

          formData.append('image',docImg)
          formData.append('name',name)
          formData.append('email',email)
          formData.append('password',password)
          formData.append('experience',experience)
          formData.append('fees',Number(fees))
          formData.append('about',about)
          formData.append('speciality',speciality)
          formData.append('degree',degree)
          formData.append('address',JSON.stringify({line1:address1,line2:address2}))

          // console log formdata

          formData.forEach((value,key)=>{
            console.log(`${key} : ${value}`);
            
          })

          const {data} = await axios .post(backendUrl + '/api/admin/add-doctor',formData,{headers:{ aToken }})


          if (data.success) {
            toast.success(data.message)
            setDocImg(false)
            setName('')
            setPassword('')
            setEmail('')
            setAddress1('')
            setAddress2('')
            setDegree('')
            setAbout('')
            setFees('')
          } else {
            toast.error(data.message)
          }

        } catch (error) {
          toast.error(error.message)
          console.log(error);
          
        }
      }

  return (
    <form onSubmit={onSubmitHandler} className='w-full max-w-4xl mx-auto space-y-6 pb-0 select-none'>

      {/* Executive Dark Hero Header */}
      <div className='bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-indigo-500/20'>
        
        {/* Glow Orbs */}
        <div className='absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-2 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/20 text-pink-200 font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            ➕ Specialist Practitioner Onboarding
          </div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight'>
            Add New Medical Doctor
          </h1>
          <p className='text-xs text-indigo-200/90 font-medium leading-relaxed'>
            Register certified medical specialists into the CarePulse network database across all 12 clinical units.
          </p>
        </div>

        <div className='z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl shrink-0'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xl font-bold shadow-md'>
            🩺
          </div>
          <div>
            <p className='text-xs font-black text-white leading-none uppercase tracking-wider'>12 Units Active</p>
            <p className='text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1'>Verified Onboarding</p>
          </div>
        </div>

      </div>

      {/* Main Form Container */}
      <div className='bg-white/95 backdrop-blur-xl p-6 sm:p-10 border-2 border-indigo-200/90 rounded-3xl shadow-xl shadow-indigo-100/50 space-y-8'>
        
        {/* Photo Upload Container */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6 text-slate-600 bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 p-6 rounded-2xl border-2 border-indigo-200/80 shadow-2xs'>
          <label htmlFor="doc-img" className='cursor-pointer group relative shrink-0'>
            <img className='w-20 h-20 rounded-2xl object-cover bg-white border-2 border-indigo-500 group-hover:scale-105 transition-all shadow-md ring-4 ring-indigo-500/20' src={docImg ? URL.createObjectURL(docImg): assets.upload_area} alt="" />
            <span className='absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full text-xs shadow-md'>📷</span>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <div className='space-y-1'>
            <p className='font-black text-slate-900 text-base'>Upload Doctor Profile Photo</p>
            <p className='text-xs text-slate-500 font-bold'>PNG, JPG or WEBP image format (Max 2MB file size)</p>
            <span className='inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-[10px] uppercase tracking-wider mt-1'>
              Photo Required
            </span>
          </div>
        </div>

        {/* Two-Column Inputs Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs font-black text-slate-800'>
          
          {/* Column 1 */}
          <div className='space-y-4'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Doctor Full Name</p>
              <input onChange={(e)=> setName(e.target.value)} value={name} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs' type="text" placeholder='e.g. Dr. Richard James' required />
            </div>

            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Doctor Official Email</p>
              <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs' type="email" placeholder='doctor@carepulse.health' required />
            </div>

            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Doctor Portal Login Password</p>
              <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs' type="password" placeholder='Set Secure Password' required />
            </div>

            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Years of Clinical Experience</p>
              <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all bg-white text-xs cursor-pointer'>
                <option value="1 Year">1 Year Experience</option>
                <option value="2 Years">2 Years Experience</option>
                <option value="3 Years">3 Years Experience</option>
                <option value="4 Years">4 Years Experience</option>
                <option value="5 Years">5 Years Experience</option>
                <option value="6 Years">6 Years Experience</option>
                <option value="7 Years">7 Years Experience</option>
                <option value="8 Years">8 Years Experience</option>
                <option value="9 Years">9 Years Experience</option>
                <option value="10+ Years">10+ Years Experience</option>
              </select>
            </div>

            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Consultation Fee (₹ INR)</p>
              <input onChange={(e)=> setFees(e.target.value)} value={fees} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs' type="number" placeholder='e.g. 500' required />
            </div>
          </div>

          {/* Column 2 */}
          <div className='space-y-4'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Speciality / Clinical Department</p>
              <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all bg-white text-xs cursor-pointer'>
                <option value="General physician">🩺 General physician</option>
                <option value="Gynecologist">🤰 Gynecologist</option>
                <option value="Dentist">🪥 Dentist</option>
                <option value="Dermatologist">🧴 Dermatologist</option>
                <option value="Pediatricians">🧸 Pediatricians</option>
                <option value="Neurologist">🧠 Neurologist</option>
                <option value="Gastroenterologist">🥗 Gastroenterologist</option>
                <option value="Ophthalmologist">👁️ Ophthalmologist</option>
                <option value="Orthopedic">🦴 Orthopedic</option>
                <option value="Cardiologist">❤️ Cardiologist</option>
                <option value="Pulmonologist">🫁 Pulmonologist</option>
                <option value="ENT Specialist">👂 ENT Specialist</option>
              </select>
            </div>

            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Education & Degrees</p>
              <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs' type="text" placeholder='e.g. MBBS, MD, FRCS' required />
            </div>

            <div className='flex flex-col gap-1.5'>
              <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Clinic / Hospital Location Address</p>
              <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs mb-1.5' type="text" placeholder='Address Line 1 (Street / Building)' required />
              <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs' type="text" placeholder='Address Line 2 (City / State / Zip)' required />
            </div>           
          </div>

        </div>

        {/* Bio Textarea */}
        <div className='flex flex-col gap-1.5 text-xs font-black text-slate-800'>
          <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Professional Medical Biography</p>
          <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-xs' placeholder='Provide a detailed medical background, expertise areas, and clinical achievements...' rows={4} required />
        </div>

        {/* Submit Button */}
        <button 
          type='submit' 
          className='w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black uppercase tracking-wider text-xs px-10 py-4 rounded-2xl shadow-xl shadow-purple-500/25 border-2 border-indigo-400 transition-all cursor-pointer transform hover:scale-[1.02]'
        >
          ➕ Add Doctor to Database
        </button>

      </div>

    </form>
  )
}

export default AddDoctor
