import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = ({ initialState = 'Login' }) => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState(initialState) // 'Login' or 'Sign Up'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Sync state if initialState changes via route navigation
  useEffect(() => {
    if (initialState) {
      setState(initialState)
    }
  }, [initialState])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("🎉 Account created successfully! Welcome to CarePulse.")
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("👋 Welcome back! Signed in successfully.")
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = () => {
    toast.info("🌐 Google Single Sign-On coming soon! Please use email login.")
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className='fixed inset-0 w-full h-full bg-white lg:bg-slate-900 grid grid-cols-1 lg:grid-cols-12 z-[999] overflow-y-auto lg:overflow-hidden select-none'>
      
      {/* Left 50% Column: Rich Healthcare Showcase Panel */}
      <div className='hidden lg:flex lg:col-span-6 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950 text-white p-7 xl:p-11 flex-col justify-between relative overflow-hidden h-full shadow-2xl border-r border-indigo-900/50'>
        
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
        <div className='z-10 space-y-2.5'>
          <div className='flex items-center gap-3'>
            <div className='w-11 h-11 xl:w-12 xl:h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg'>
              <svg className="w-6 h-6 xl:w-7 xl:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className='text-xl xl:text-2xl font-black tracking-tight leading-none text-white'>Care<span className='text-indigo-300'>Pulse</span></h2>
              <p className='text-[9px] xl:text-[10px] uppercase font-extrabold text-indigo-200 tracking-widest mt-0.5'>Healthcare & Telehealth Network</p>
            </div>
          </div>

          <span className='inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[11px] xl:text-xs font-bold'>
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse'></span>
            100% Verified Specialist Doctor Network
          </span>
        </div>

        {/* Center Hero Value Proposition */}
        <div className='z-10 my-auto py-2 space-y-3 xl:space-y-4 max-w-lg'>
          {state === 'Sign Up' ? (
            <>
              <h1 className='text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight leading-tight text-white'>
                Join CarePulse Today. <br />
                <span className='text-indigo-200 font-extrabold'>Create Your Free Account.</span>
              </h1>
              <p className='text-indigo-100 text-xs xl:text-sm font-medium leading-relaxed'>
                Register in 30 seconds to book top-rated doctors, access online video consultations, and store digital medical records safely.
              </p>

              {/* Feature Badges Grid */}
              <div className='grid grid-cols-2 gap-2 xl:gap-3 text-xs font-bold text-indigo-100 pt-1'>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>✨</span>
                  <span className='text-[11px] xl:text-xs'>Free Registration</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>⚡</span>
                  <span className='text-[11px] xl:text-xs'>Instant Slot Booking</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>📋</span>
                  <span className='text-[11px] xl:text-xs'>Digital E-Prescriptions</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>🔒</span>
                  <span className='text-[11px] xl:text-xs'>256-Bit Data Privacy</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className='text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight leading-tight text-white'>
                Your Health, Our Priority. <br />
                <span className='text-indigo-200 font-extrabold'>Consult Top Doctors.</span>
              </h1>
              <p className='text-indigo-100 text-xs xl:text-sm font-medium leading-relaxed'>
                CarePulse connects you with top-rated specialist doctors, live HD telehealth video consultations, and instant digital e-prescriptions.
              </p>

              {/* Feature Badges Grid */}
              <div className='grid grid-cols-2 gap-2 xl:gap-3 text-xs font-bold text-indigo-100 pt-1'>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>🩺</span>
                  <span className='text-[11px] xl:text-xs'>100+ Verified Doctors</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>🎥</span>
                  <span className='text-[11px] xl:text-xs'>HD Video Call</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>📋</span>
                  <span className='text-[11px] xl:text-xs'>Digital E-Prescription</span>
                </div>
                <div className='flex items-center gap-2 bg-white/10 border border-white/15 p-2.5 rounded-xl backdrop-blur-sm'>
                  <span className='text-base xl:text-lg'>🔒</span>
                  <span className='text-[11px] xl:text-xs'>256-Bit Encrypted Data</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Rating & Social Proof */}
        <div className='z-10 pt-2.5 border-t border-white/15 flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2.5'>
            <img className='w-16 xl:w-20 object-contain' src={assets.group_profiles} alt="Patients" />
            <div className='text-xs'>
              <p className='font-black text-white text-xs xl:text-sm'>12,000+ Patients</p>
              <p className='text-[10px] xl:text-[11px] text-indigo-200 font-medium'>Booked Appointments</p>
            </div>
          </div>

          <div className='bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-extrabold flex items-center gap-1.5'>
            <span>⭐ 4.9 / 5</span>
            <span className='text-[10px] text-indigo-200'>(1.5k Reviews)</span>
          </div>
        </div>

      </div>

      {/* Right 50% Column: Responsive Form Panel (Perfect Top Alignment on Mobile, Split-Screen on Desktop) */}
      <div className='col-span-1 lg:col-span-6 bg-white p-5 sm:p-8 xl:p-14 flex flex-col justify-start lg:justify-between h-auto lg:h-full min-h-screen lg:min-h-0 overflow-y-auto lg:overflow-hidden border-l border-slate-200/80 gap-3 lg:gap-0'>
        
        {/* Top Header Bar */}
        <div className='flex items-center justify-between gap-4 max-w-xl w-full mx-auto mb-1 lg:mb-0'>
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 lg:hidden'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className='text-xl font-black text-slate-900 lg:hidden'>Care<span className='text-indigo-600'>Pulse</span></span>
          </div>

          <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold ml-auto'>
            <span className='w-2 h-2 rounded-full bg-indigo-600 animate-pulse' />
            <span>24/7 Patient Portal</span>
          </div>
        </div>

        {/* Center Main Form Content (Starts Immediately Below Logo on Mobile, Centered on Desktop) */}
        <div className='my-0 lg:my-auto max-w-xl w-full mx-auto space-y-3 sm:space-y-4'>
          
          {/* Mode Switcher Tabs */}
          <div className='grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-black w-full'>
            <button 
              type="button"
              onClick={() => setState('Login')}
              className={`py-1.5 sm:py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                state === 'Login' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔑 Sign In
            </button>
            <button 
              type="button"
              onClick={() => setState('Sign Up')}
              className={`py-1.5 sm:py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                state === 'Sign Up' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✨ Create Account
            </button>
          </div>

          {/* Title Header */}
          <div className='space-y-0.5 text-left'>
            <h2 className='text-xl sm:text-2xl xl:text-3xl font-black text-slate-900 tracking-tight'>
              {state === 'Sign Up' ? "Create Patient Account" : "Welcome Back"}
            </h2>
            <p className='text-slate-500 text-xs sm:text-sm font-medium'>
              {state === 'Sign Up' 
                ? "Fill in your details to create a free account and book appointments" 
                : "Sign in to access your doctor consultations, e-prescriptions & records"}
            </p>
          </div>

          {/* Google SSO Button */}
          <button 
            type="button"
            onClick={handleGoogleAuth}
            className='w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-sm'
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className='relative flex items-center justify-center my-0.5'>
            <div className='border-t border-slate-200 w-full' />
            <span className='bg-white px-3 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest absolute'>or email</span>
          </div>

          {/* Form Controls */}
          <form onSubmit={onSubmitHandler} className='space-y-2.5 sm:space-y-3 w-full'>
            {state === "Sign Up" && (
              <div className='space-y-0.5'>
                <label className='block text-xs font-extrabold text-slate-700 uppercase tracking-wider'>Full Name</label>
                <div className='relative flex items-center'>
                  <span className='absolute left-3.5 text-slate-400 text-sm'>👤</span>
                  <input 
                    className='bg-slate-50 border-2 border-slate-200 rounded-xl w-full pl-10 pr-4 py-2.5 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-inner' 
                    type="text" 
                    placeholder="e.g. John Doe"
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    required
                  />
                </div>
              </div>
            )}

            <div className='space-y-0.5'>
              <label className='block text-xs font-extrabold text-slate-700 uppercase tracking-wider'>Email Address</label>
              <div className='relative flex items-center'>
                <span className='absolute left-3.5 text-slate-400 text-sm'>✉️</span>
                <input 
                  className='bg-slate-50 border-2 border-slate-200 rounded-xl w-full pl-10 pr-4 py-2.5 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-inner' 
                  type="email" 
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  required
                />
              </div>
            </div>

            <div className='space-y-0.5'>
              <div className='flex items-center justify-between'>
                <label className='block text-xs font-extrabold text-slate-700 uppercase tracking-wider'>Password</label>
                {state === 'Login' && (
                  <span className='text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer'>
                    Forgot Password?
                  </span>
                )}
              </div>
              <div className='relative flex items-center'>
                <span className='absolute left-3.5 text-slate-400 text-sm'>🔒</span>
                <input 
                  className='bg-slate-50 border-2 border-slate-200 rounded-xl w-full pl-10 pr-10 py-2.5 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-inner' 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className='absolute right-3.5 text-slate-400 hover:text-slate-600 text-sm font-extrabold cursor-pointer select-none'
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className='flex items-center justify-between pt-0.5'>
              <label className='flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer select-none'>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer'
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* Action Submit Button */}
            <button 
              type='submit' 
              disabled={loading}
              className='w-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 mt-1'
            >
              {loading ? (
                <span className='flex items-center gap-2'>
                  <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin' />
                  Processing...
                </span>
              ) : (
                <span>{state === 'Sign Up' ? "🚀 Create Free Patient Account" : "🔑 Sign In to CarePulse"}</span>
              )}
            </button>
          </form>

          {/* Mode Switch Text */}
          <p className='text-xs text-center text-slate-500 font-semibold pt-0.5'>
            {state === 'Sign Up' ? (
              <span>Already have an account? <button type="button" onClick={() => setState('Login')} className='text-indigo-600 hover:underline font-bold cursor-pointer'>Sign In here</button></span>
            ) : (
              <span>Don't have an account? <button type="button" onClick={() => setState('Sign Up')} className='text-indigo-600 hover:underline font-bold cursor-pointer'>Create Account here</button></span>
            )}
          </p>

        </div>

        {/* Bottom Compliance & Trust Seals */}
        <div className='pt-3 border-t border-slate-200 flex items-center justify-between gap-4 max-w-xl w-full mx-auto text-slate-400 text-xs font-bold'>
          <div className='flex items-center gap-1.5'>
            <span>🛡️ HIPAA Compliant</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span>⚡ Instant Slot Lock</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span>🔒 256-Bit SSL Secured</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Login
