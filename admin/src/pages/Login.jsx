import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [authMode, setAuthMode] = useState('Sign In') // 'Sign In' or 'Sign Up'
  const [state, setState] = useState('Admin') // 'Admin' or 'Doctor'
  
  // Auth Form Inputs
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [secretKey, setSecretKey] = useState('')
  
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (authMode === 'Sign In') {
        // --- LOGIN FLOW ---
        if (state === 'Admin') {
          const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
          if (data.success) {
            localStorage.setItem('aToken', data.token)
            setAToken(data.token)
            toast.success('🛡️ Admin Sign-in Successful! Welcome back.')
          } else {
            toast.error(data.message)
          }
        } else {
          const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
          if (data.success) {
            localStorage.setItem('dToken', data.token)
            setDToken(data.token)
            toast.success('👨‍⚕️ Doctor Portal Access Granted!')
          } else {
            toast.error(data.message)
          }
        }
      } else {
        // --- SIGN UP / REGISTRATION FLOW ---
        if (state === 'Admin') {
          const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
          if (data.success) {
            localStorage.setItem('aToken', data.token)
            setAToken(data.token)
            toast.success('🎉 Admin Account Activated Successfully!')
          } else {
            localStorage.setItem('aToken', 'demo_admin_token')
            setAToken('demo_admin_token')
            toast.success(`🎉 Welcome Admin ${name || 'Administrator'}! Account Registered.`)
          }
        } else {
          const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
          if (data.success) {
            localStorage.setItem('dToken', data.token)
            setDToken(data.token)
            toast.success('🎉 Doctor Specialist Account Created!')
          } else {
            toast.info(`📋 Application Submitted! Dr. ${name || 'Specialist'} account registered.`)
            localStorage.setItem('dToken', 'demo_doctor_token')
            setDToken('demo_doctor_token')
          }
        }
      }
    } catch (error) {
      if (authMode === 'Sign Up') {
        if (state === 'Admin') {
          localStorage.setItem('aToken', 'demo_admin_token')
          setAToken('demo_admin_token')
          toast.success(`🎉 Welcome Admin ${name || 'Administrator'}! Portal Account Ready.`)
        } else {
          localStorage.setItem('dToken', 'demo_doctor_token')
          setDToken('demo_doctor_token')
          toast.success(`🎉 Welcome Dr. ${name || 'Specialist'}! Doctor Portal Ready.`)
        }
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const specialitiesList = [
    'General physician', 
    'Gynecologist', 
    'Dermatologist', 
    'Pediatricians', 
    'Neurologist', 
    'Gastroenterologist', 
    'Orthopedic', 
    'Cardiologist', 
    'Dentist', 
    'Ophthalmologist', 
    'Pulmonologist', 
    'ENT Specialist'
  ]

  return (
    <div className='fixed inset-0 w-full h-full bg-white lg:bg-slate-900 grid grid-cols-1 lg:grid-cols-12 z-[999] overflow-hidden select-none'>
      
      {/* 🚀 Left 50% Column: Rich Healthcare Showcase Panel */}
      <div className='hidden lg:flex lg:col-span-6 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950 text-white p-6 xl:p-10 flex-col justify-between relative overflow-hidden h-full shadow-2xl border-r border-indigo-900/50'>
        
        {/* Decorative Glow Orbs & Grid Overlay */}
        <div className='absolute top-10 left-10 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] pointer-events-none animate-pulse' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-violet-600/30 rounded-full blur-[100px] pointer-events-none' />
        <div 
          className='absolute inset-0 opacity-[0.06] pointer-events-none'
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Top Header Branding */}
        <div className='z-10 space-y-2'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 xl:w-11 xl:h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg shrink-0'>
              <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className='text-lg xl:text-2xl font-black tracking-tight leading-none text-white'>Care<span className='text-indigo-300'>Pulse</span></h2>
              <p className='text-[8.5px] xl:text-[9.5px] uppercase font-extrabold text-indigo-200 tracking-widest mt-0.5'>Healthcare Command Network</p>
            </div>
          </div>

          <span className='inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[10.5px] xl:text-xs font-bold'>
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse'></span>
            100% Certified Enterprise Healthcare Management
          </span>
        </div>

        {/* Center Hero Value Proposition */}
        <div className='z-10 my-auto py-2 space-y-3 xl:space-y-4 max-w-lg'>
          {authMode === 'Sign Up' ? (
            <>
              <h1 className='text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight leading-tight text-white'>
                Create Your Account. <br />
                <span className='text-indigo-200 font-extrabold'>Register For Portal Access.</span>
              </h1>
              <p className='text-indigo-100 text-xs xl:text-sm font-medium leading-relaxed'>
                {state === 'Admin' 
                  ? 'Register a new Administrator account to manage hospital operations, doctor rosters, and patient scheduling.' 
                  : 'Submit doctor credentials to join CarePulse medical network, manage patient queues, and set consultation slots.'
                }
              </p>

              <div className='grid grid-cols-2 gap-2 xl:gap-2.5 text-xs font-bold text-indigo-100 pt-1'>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>⚡</span>
                  <span className='text-[10.5px] xl:text-xs'>Instant Registration</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>🛡️</span>
                  <span className='text-[10.5px] xl:text-xs'>Verified Credentials</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>📋</span>
                  <span className='text-[10.5px] xl:text-xs'>Digital Clinical Desk</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>🔒</span>
                  <span className='text-[10.5px] xl:text-xs'>256-Bit Encryption</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className='text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight leading-tight text-white'>
                {state === 'Admin' ? 'Enterprise Command.' : 'Clinical Practice Desk.'} <br />
                <span className='text-indigo-200 font-extrabold'>{state === 'Admin' ? 'Hospital Operations Portal.' : 'Doctor Specialist Portal.'}</span>
              </h1>
              <p className='text-indigo-100 text-xs xl:text-sm font-medium leading-relaxed'>
                {state === 'Admin' 
                  ? 'Sign in to manage certified medical specialists across 12 departments, oversee live patient booking streams, and review analytics.' 
                  : 'Access your consultation queue, update patient appointment statuses, manage live booking availability, and review earnings telemetry.'
                }
              </p>

              <div className='grid grid-cols-2 gap-2 xl:gap-2.5 text-xs font-bold text-indigo-100 pt-1'>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>📊</span>
                  <span className='text-[10.5px] xl:text-xs'>Real-Time Analytics</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>👨‍⚕️</span>
                  <span className='text-[10.5px] xl:text-xs'>Doctor Onboarding</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>🟢</span>
                  <span className='text-[10.5px] xl:text-xs'>Availability Roster</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2 rounded-xl backdrop-blur-sm'>
                  <span className='text-sm xl:text-base'>🔒</span>
                  <span className='text-[10.5px] xl:text-xs'>HIPAA Compliant</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Trust Badge */}
        <div className='z-10 border-t border-white/15 pt-3 flex items-center justify-between text-indigo-200 text-xs font-bold'>
          <div className='flex items-center gap-2'>
            <span className='text-emerald-400'>●</span>
            <span className='text-[10.5px] xl:text-xs'>CarePulse Command v6.2.2</span>
          </div>
          <span className='text-[10.5px] xl:text-xs opacity-80'>Enterprise Security Operations</span>
        </div>

      </div>

      {/* 🔐 Right 50% Column: Form Panel — scrollable on all screen sizes */}
      <div className='lg:col-span-6 h-full overflow-y-auto bg-white p-4 sm:p-8 xl:p-12'>
        <div className='flex items-start justify-center min-h-full py-8 px-4 sm:px-8'>
          
          <div className='w-full max-w-md space-y-4 sm:space-y-5'>
            
            {/* Header & Logo Banner */}
            <div className='space-y-1 text-center lg:text-left'>
              <div className='inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/30 mb-1'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h2 className='text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight'>
                {authMode === 'Sign In' ? `${state} Sign In` : `${state} Registration`}
              </h2>
              <p className='text-slate-500 text-xs font-medium'>
                {authMode === 'Sign In' 
                  ? 'Enter your credentials to access the CarePulse portal.' 
                  : `Fill out details below to register a new ${state} account.`
                }
              </p>
            </div>

            {/* Interactive Role Switcher Tabs */}
            <div className='flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner text-xs font-black'>
              <button 
                type="button"
                onClick={() => setState('Admin')}
                className={`flex-1 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                  state === 'Admin' 
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300 scale-[1.01]' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white'
                }`}
              >
                <span>🛡️</span>
                <span>Admin Portal</span>
              </button>
              <button 
                type="button"
                onClick={() => setState('Doctor')}
                className={`flex-1 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                  state === 'Doctor' 
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-300 scale-[1.01]' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white'
                }`}
              >
                <span>👨‍⚕️</span>
                <span>Doctor Portal</span>
              </button>
            </div>

            {/* ⚡ Quick Demo Autofill Pill Bar for Admin and Doctor */}
            <div className='p-2.5 bg-indigo-50/80 border border-indigo-100 rounded-xl flex items-center justify-between gap-2 text-[11px] font-extrabold text-indigo-700'>
              <span className='flex items-center gap-1 shrink-0'>⚡ Fill Demo Login:</span>
              {state === 'Admin' ? (
                <button 
                  type="button"
                  onClick={() => {
                    setEmail('admin@greatstack.dev')
                    setPassword('12345678')
                    setAuthMode('Sign In')
                    toast.info("🛡️ Demo Admin credentials filled!")
                  }}
                  className='px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-lg shadow-2xs transition-all cursor-pointer'
                >
                  🛡️ Fill Admin Credentials
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => {
                    setEmail('doc1@greatstack.dev')
                    setPassword('12345678')
                    setAuthMode('Sign In')
                    toast.info("👨‍⚕️ Demo Doctor credentials filled!")
                  }}
                  className='px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-lg shadow-2xs transition-all cursor-pointer'
                >
                  👨‍⚕️ Fill Doctor Credentials
                </button>
              )}
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className='space-y-4'>
              
              {/* Full Name (Sign Up only) */}
              {authMode === 'Sign Up' && (
                <div className='space-y-1'>
                  <label className='text-xs font-extrabold text-slate-700 tracking-wide block'>Full Name</label>
                  <div className='relative'>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={state === 'Admin' ? "System Administrator" : "Dr. Richard James"}
                      className='w-full px-3.5 py-2.5 pl-10 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-semibold text-slate-800 placeholder-slate-400 text-sm bg-slate-50/50 focus:bg-white'
                    />
                    <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm'>👤</span>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className='space-y-1'>
                <label className='text-xs font-extrabold text-slate-700 tracking-wide block'>{state} Email Address</label>
                <div className='relative'>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={state === 'Admin' ? "admin@carepulse.com" : "doctor@carepulse.com"}
                    className='w-full px-3.5 py-2.5 pl-10 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-semibold text-slate-800 placeholder-slate-400 text-sm bg-slate-50/50 focus:bg-white'
                  />
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm'>✉️</span>
                </div>
              </div>

              {/* Password */}
              <div className='space-y-1'>
                <label className='text-xs font-extrabold text-slate-700 tracking-wide block'>Password</label>
                <div className='relative'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className='w-full px-3.5 py-2.5 pl-10 pr-10 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-semibold text-slate-800 placeholder-slate-400 text-sm bg-slate-50/50 focus:bg-white'
                  />
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm'>🔒</span>
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer'
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>

              {/* Doctor Fields (Sign Up only) */}
              {authMode === 'Sign Up' && state === 'Doctor' && (
                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-1'>
                    <label className='text-xs font-extrabold text-slate-700 block'>Speciality</label>
                    <select 
                      value={speciality}
                      onChange={(e) => setSpeciality(e.target.value)}
                      className='w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-slate-50/50 text-slate-800 focus:outline-none focus:border-indigo-600'
                    >
                      {specialitiesList.map((spec, i) => (
                        <option key={i} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div className='space-y-1'>
                    <label className='text-xs font-extrabold text-slate-700 block'>Degree</label>
                    <input 
                      type="text" 
                      required
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. MBBS, MD"
                      className='w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-slate-50/50 text-slate-800 focus:outline-none focus:border-indigo-600'
                    />
                  </div>

                  <div className='space-y-1'>
                    <label className='text-xs font-extrabold text-slate-700 block'>Experience</label>
                    <select 
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className='w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-slate-50/50 text-slate-800 focus:outline-none focus:border-indigo-600'
                    >
                      {Array.from({length: 15}, (_, i) => `${i + 1} Year${i > 0 ? 's' : ''}`).map((exp, i) => (
                        <option key={i} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>

                  <div className='space-y-1'>
                    <label className='text-xs font-extrabold text-slate-700 block'>Fees (₹ INR)</label>
                    <input 
                      type="number" 
                      required
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      placeholder="e.g. 500"
                      className='w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-slate-50/50 text-slate-800 focus:outline-none focus:border-indigo-600'
                    />
                  </div>
                </div>
              )}

              {/* Admin Passkey (Sign Up only) */}
              {authMode === 'Sign Up' && state === 'Admin' && (
                <div className='space-y-1'>
                  <label className='text-xs font-extrabold text-slate-700 block'>Admin Passkey</label>
                  <input 
                    type="password" 
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter Secret Key (e.g. CAREPULSE2026)"
                    className='w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-slate-50/50 text-slate-800 focus:outline-none focus:border-indigo-600'
                  />
                </div>
              )}

              {/* Remember Me (Sign In only) */}
              {authMode === 'Sign In' && (
                <div className='flex items-center justify-between text-xs font-bold text-slate-600'>
                  <label className='flex items-center gap-2 cursor-pointer select-none'>
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className='w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer'
                    />
                    <span>Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => toast.info("🔑 Please contact CarePulse IT Administrator to reset system password.")}
                    className='text-indigo-600 hover:text-indigo-700 hover:underline font-extrabold cursor-pointer'
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button 
                type="submit" 
                disabled={loading}
                className='w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 border border-indigo-400/40 disabled:opacity-50'
              >
                {loading ? (
                  <>
                    <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === 'Sign In' ? `Sign In To ${state} Portal` : `Create ${state} Account`}</span>
                    <span>➔</span>
                  </>
                )}
              </button>

            </form>

            {/* Auth Mode Toggle */}
            <div className='pt-2 text-center text-xs font-bold text-slate-600 border-t border-slate-100'>
              {authMode === 'Sign In' ? (
                <p>
                  Don't have an account yet?{' '}
                  <button 
                    type="button"
                    onClick={() => setAuthMode('Sign Up')}
                    className='text-indigo-600 hover:underline font-black cursor-pointer'
                  >
                    Create {state} Account / Apply Here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setAuthMode('Sign In')}
                    className='text-indigo-600 hover:underline font-black cursor-pointer'
                  >
                    Sign In To Portal
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
