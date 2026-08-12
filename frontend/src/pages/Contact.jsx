import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Contact = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Support',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inquiryTopics = [
    { id: 'General Support', label: '💬 General Support' },
    { id: 'Appointment Booking', label: '📅 Appointments' },
    { id: 'Doctor Partnership', label: '🩺 Doctor Join' },
    { id: 'Billing & Payments', label: '💳 Billing & Pay' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success(`Thank you ${formData.name}! Your message regarding "${formData.department}" has been sent to CarePulse Support.`)
      setFormData({ name: '', email: '', phone: '', department: 'General Support', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className='py-6 space-y-12'>
      {/* Hero Banner Section */}
      <div className='bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-indigo-200/60 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-1/3 w-60 h-60 bg-violet-400/20 rounded-full blur-2xl pointer-events-none' />

        <div className='z-10 max-w-2xl text-center md:text-left'>
          <span className='px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider border border-white/30 inline-block mb-4 shadow-sm'>
            📞 24/7 Patient Support
          </span>
          <h1 className='text-3xl sm:text-5xl font-black tracking-tight leading-tight'>
            Contact <span className='text-indigo-200'>CarePulse</span>
          </h1>
          <p className='text-indigo-100 text-sm sm:text-base mt-3 font-medium leading-relaxed'>
            Have questions about doctor appointments, billing, or medical departments? Our dedicated healthcare team is available 24/7 to assist you.
          </p>

          <div className='mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-indigo-100'>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>⚡</span> 15-Min Response Time
            </span>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>💬</span> Live Support Desk
            </span>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>🏥</span> 12+ Specialities
            </span>
          </div>
        </div>

        {/* Floating Helpline Card */}
        <div className='z-10 bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-6 text-center min-w-52 shadow-2xl shrink-0 flex flex-col gap-1'>
          <span className='text-xs font-extrabold text-indigo-100 uppercase tracking-wider'>Emergency Helpline</span>
          <p className='text-2xl font-black text-white mt-1'>1-800-CAREPULSE</p>
          <span className='text-[10px] text-emerald-300 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-full mt-2 border border-emerald-400/30'>
            🟢 Toll-Free 24/7 Active
          </span>
        </div>
      </div>

      {/* Quick Contact Info Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Card 1: Address */}
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3 group'>
          <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-xl transition-colors shadow-sm'>
            📍
          </div>
          <div>
            <h3 className='font-extrabold text-slate-900 text-base'>Main Office</h3>
            <p className='text-xs text-slate-500 font-medium leading-relaxed mt-1'>
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>
        </div>

        {/* Card 2: Phone */}
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3 group'>
          <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-xl transition-colors shadow-sm'>
            📞
          </div>
          <div>
            <h3 className='font-extrabold text-slate-900 text-base'>Phone Support</h3>
            <p className='text-xs text-slate-500 font-medium leading-relaxed mt-1'>
              Direct: (415) 555-0132 <br /> Toll Free: 1-800-227-3785
            </p>
          </div>
        </div>

        {/* Card 3: Email */}
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3 group'>
          <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-xl transition-colors shadow-sm'>
            ✉️
          </div>
          <div>
            <h3 className='font-extrabold text-slate-900 text-base'>Email Helpdesk</h3>
            <p className='text-xs text-slate-500 font-medium leading-relaxed mt-1 truncate'>
              support@carepulse.com <br /> rudrani@gmail.com
            </p>
          </div>
        </div>

        {/* Card 4: Hours */}
        <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3 group'>
          <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-xl transition-colors shadow-sm'>
            ⏰
          </div>
          <div>
            <h3 className='font-extrabold text-slate-900 text-base'>Working Hours</h3>
            <p className='text-xs text-slate-500 font-medium leading-relaxed mt-1'>
              Mon - Sat: 8:00 AM - 8:00 PM <br /> Sunday: Emergency Desk
            </p>
          </div>
        </div>
      </div>

      {/* Main Section: Interactive Form + Careers Office Showcase */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Left Column: Interactive Contact Form */}
        <div className='lg:col-span-7 bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-300/60 space-y-6'>
          <div className='space-y-1'>
            <span className='px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider inline-block mb-2'>
              Send a Message
            </span>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              We’d Love to Hear From You
            </h2>
            <p className='text-xs sm:text-sm text-slate-500 font-medium'>
              Fill out the form below and our medical support staff will reach out to you within 15 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4 text-xs sm:text-sm font-bold text-slate-700'>
            {/* Interactive Inquiry Topic Segmented Toggle Bar */}
            <div>
              <label className='block mb-2 text-slate-800 font-extrabold'>Select Inquiry Topic *</label>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner'>
                {inquiryTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, department: topic.id })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer text-center truncate ${
                      formData.department === topic.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                        : 'text-slate-600 hover:bg-white hover:text-indigo-600'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block mb-1.5 text-slate-800'>Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className='w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
                />
              </div>

              <div>
                <label className='block mb-1.5 text-slate-800'>Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className='w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
                />
              </div>
            </div>

            <div>
              <label className='block mb-1.5 text-slate-800'>Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className='w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
              />
            </div>

            <div>
              <label className='block mb-1.5 text-slate-800'>Your Message *</label>
              <textarea 
                rows="4"
                required
                placeholder="How can our healthcare team assist you today?"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className='w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all resize-none'
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className='w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 transition-all duration-300 uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer'
            >
              {isSubmitting ? 'Sending Message...' : '🚀 Send Message to CarePulse'}
            </button>
          </form>
        </div>

        {/* Right Column: Office Photo & Careers at CarePulse */}
        <div className='lg:col-span-5 space-y-6'>
          {/* Office Image Card */}
          <div className='relative rounded-3xl overflow-hidden shadow-xl border-2 border-indigo-200/90 group'>
            <img 
              className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500' 
              src={assets.contact_image} 
              alt="CarePulse Medical Office" 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6'>
              <div className='text-white space-y-1'>
                <span className='px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase border border-white/30'>
                  🏢 Healthcare Campus
                </span>
                <p className='text-lg font-black'>CarePulse Washington Center</p>
                <p className='text-xs text-indigo-200 font-medium'>54709 Willms Station, Suite 350</p>
              </div>
            </div>
          </div>

          {/* Careers Card */}
          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-300/60 space-y-4 hover:border-indigo-600 transition-all'>
            <div className='w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold'>
              💼
            </div>
            <h3 className='font-black text-slate-900 text-lg tracking-tight uppercase'>
              CAREERS AT CAREPULSE
            </h3>
            <p className='text-xs sm:text-sm text-slate-600 font-medium leading-relaxed'>
              We are expanding our team of medical coordinators, software engineers, and patient care managers. Explore opportunities to shape the future of healthcare.
            </p>
            <button 
              onClick={() => { navigate('/careers'); scrollTo(0, 0); }}
              className='w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer'
            >
              Explore Open Positions →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact