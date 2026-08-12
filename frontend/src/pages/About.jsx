import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='py-6 space-y-12'>
      {/* Hero Banner Section */}
      <div className='bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-indigo-200/60 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-1/3 w-60 h-60 bg-violet-400/20 rounded-full blur-2xl pointer-events-none' />

        <div className='z-10 max-w-2xl text-center md:text-left'>
          <span className='px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider border border-white/30 inline-block mb-4 shadow-sm'>
            ❤️ Empowering Healthcare Access
          </span>
          <h1 className='text-3xl sm:text-5xl font-black tracking-tight leading-tight'>
            About <span className='text-indigo-200'>CarePulse</span>
          </h1>
          <p className='text-indigo-100 text-sm sm:text-base mt-3 font-medium leading-relaxed'>
            We are on a mission to modernize healthcare discovery and appointment scheduling by connecting patients with board-certified medical specialists seamlessly.
          </p>

          <div className='mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-indigo-100'>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>🏥</span> 12+ Speciality Clinics
            </span>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>⚡</span> Real-time Slots
            </span>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>🔒</span> HIPAA Compliant
            </span>
          </div>
        </div>

        {/* Floating Highlight Badge */}
        <div className='z-10 bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-6 text-center min-w-52 shadow-2xl shrink-0 flex flex-col gap-2'>
          <span className='text-4xl font-black text-white'>99.4%</span>
          <p className='text-xs font-bold text-indigo-100 uppercase tracking-wider'>Patient Satisfaction</p>
          <div className='flex items-center justify-center gap-1 text-amber-300 text-sm mt-1'>
            ★★★★★
          </div>
        </div>
      </div>

      {/* Main Story & Vision Card */}
      <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-300/60 flex flex-col md:flex-row gap-10 items-center'>
        <div className='relative w-full md:max-w-[400px] shrink-0 group'>
          <div className='absolute -inset-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500'></div>
          <img 
            className='relative w-full rounded-2xl shadow-xl border-2 border-indigo-100 object-cover aspect-square' 
            src={assets.about_image} 
            alt="About CarePulse Healthcare Platform" 
          />
          <div className='absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-indigo-200 rounded-xl p-3 shadow-lg flex items-center justify-between text-xs font-extrabold text-indigo-900'>
            <span>Trusted Healthcare Tech</span>
            <span className='text-emerald-600 font-bold'>✓ Verified Platform</span>
          </div>
        </div>

        <div className='flex flex-col justify-center gap-5 text-sm text-slate-600 leading-relaxed flex-1'>
          <span className='px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider w-max'>
            Our Journey
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
            Reimagining Patient Experience & Appointment Management
          </h2>
          <p className='font-medium text-slate-700'>
            Welcome to <strong className='text-indigo-600 font-bold'>CarePulse</strong>, your dedicated partner in managing personal and family healthcare needs with speed, transparency, and trust. CarePulse eliminates long waiting rooms and tedious phone inquiries by offering 24/7 instant doctor slot reservations.
          </p>
          <p>
            Whether you are booking a routine wellness checkup with a General Physician or seeking specialized consultations with Cardiologists, Neurologists, or Orthopedic Surgeons, CarePulse supports you at every step with verified doctor credentials, upfront fees, and instant digital confirmations.
          </p>

          <div className='bg-gradient-to-r from-indigo-50/90 via-violet-50/50 to-indigo-50/90 border-2 border-indigo-200/80 p-5 sm:p-6 rounded-2xl shadow-sm space-y-2 mt-2'>
            <b className='text-indigo-900 font-extrabold text-base flex items-center gap-2'>
              <span>🎯</span> Our Vision & Mission
            </b>
            <p className='text-xs sm:text-sm text-slate-700 font-medium leading-relaxed'>
              To build the world’s most accessible digital healthcare ecosystem — making high-quality medical expertise available to every individual anytime, anywhere, with zero friction.
            </p>
          </div>
        </div>
      </div>

      {/* Key Impact Statistics Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'>
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 text-center shadow-lg shadow-slate-200/60 hover:border-indigo-600 transition-all'>
          <p className='text-3xl sm:text-4xl font-black text-indigo-600'>50k+</p>
          <p className='text-xs font-bold text-slate-700 uppercase tracking-wider mt-1'>Appointments Booked</p>
        </div>
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 text-center shadow-lg shadow-slate-200/60 hover:border-indigo-600 transition-all'>
          <p className='text-3xl sm:text-4xl font-black text-indigo-600'>200+</p>
          <p className='text-xs font-bold text-slate-700 uppercase tracking-wider mt-1'>Verified Specialists</p>
        </div>
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 text-center shadow-lg shadow-slate-200/60 hover:border-indigo-600 transition-all'>
          <p className='text-3xl sm:text-4xl font-black text-indigo-600'>12+</p>
          <p className='text-xs font-bold text-slate-700 uppercase tracking-wider mt-1'>Medical Departments</p>
        </div>
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 text-center shadow-lg shadow-slate-200/60 hover:border-indigo-600 transition-all'>
          <p className='text-3xl sm:text-4xl font-black text-indigo-600'>24/7</p>
          <p className='text-xs font-bold text-slate-700 uppercase tracking-wider mt-1'>Customer Support</p>
        </div>
      </div>

      {/* Why Choose CarePulse Section */}
      <div className='space-y-6'>
        <div className='text-center max-w-2xl mx-auto space-y-2'>
          <span className='px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider'>
            The CarePulse Advantage
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
            Why Choose <span className='text-indigo-600'>CarePulse</span>
          </h2>
          <p className='text-xs sm:text-sm font-medium text-slate-600'>
            Engineered from the ground up to prioritize your health, comfort, and data privacy.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Card 1 */}
          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-8 flex flex-col gap-4 text-sm text-slate-600 shadow-xl shadow-slate-300/60 hover:border-indigo-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative overflow-hidden'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-xl font-bold transition-colors shadow-sm'>
              ⚡
            </div>
            <h3 className='text-slate-900 text-lg font-extrabold tracking-tight group-hover:text-indigo-600 transition-colors'>
              EFFICIENCY & SPEED
            </h3>
            <p className='leading-relaxed text-xs sm:text-sm font-medium text-slate-600'>
              Instant doctor slot selection and zero wait-time digital confirmations designed to seamlessly fit your busy lifestyle.
            </p>
          </div>

          {/* Card 2 */}
          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-8 flex flex-col gap-4 text-sm text-slate-600 shadow-xl shadow-slate-300/60 hover:border-indigo-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative overflow-hidden'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-xl font-bold transition-colors shadow-sm'>
              🏥
            </div>
            <h3 className='text-slate-900 text-lg font-extrabold tracking-tight group-hover:text-indigo-600 transition-colors'>
              VERIFIED CONVENIENCE
            </h3>
            <p className='leading-relaxed text-xs sm:text-sm font-medium text-slate-600'>
              Direct access to a pre-vetted network of top-tier medical specialists with transparent consultation fee disclosures.
            </p>
          </div>

          {/* Card 3 */}
          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-8 flex flex-col gap-4 text-sm text-slate-600 shadow-xl shadow-slate-300/60 hover:border-indigo-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative overflow-hidden'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-xl font-bold transition-colors shadow-sm'>
              🔒
            </div>
            <h3 className='text-slate-900 text-lg font-extrabold tracking-tight group-hover:text-indigo-600 transition-colors'>
              PRIVACY & CONFIDENTIALITY
            </h3>
            <p className='leading-relaxed text-xs sm:text-sm font-medium text-slate-600'>
              State-of-the-art encryption protecting your medical appointment details, health history, and payment transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About