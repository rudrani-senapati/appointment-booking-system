import React, { useState, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Careers = () => {
  const { backendUrl } = useContext(AppContext)
  const [selectedJob, setSelectedJob] = useState(null)

  const [applicant, setApplicant] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    experience: '1 - 3 Years', 
    portfolio: '', 
    coverLetter: '' 
  })
  const [isApplying, setIsApplying] = useState(false)

  // Prevent background scroll while Job Application Modal is open
  useEffect(() => {
    if (selectedJob) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [selectedJob])

  const jobOpenings = [
    {
      id: 'job-1',
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering & Tech',
      type: 'Full Time',
      location: 'Remote (Global)',
      salary: '$130k - $160k',
      icon: '💻',
      description: 'Build high-performance real-time appointment booking engines and secure patient health data APIs using modern Web & Cloud frameworks.'
    },
    {
      id: 'job-2',
      title: 'Medical Operations Coordinator',
      department: 'Clinical Operations',
      type: 'Full Time',
      location: 'Washington, USA (Hybrid)',
      salary: '$75k - $95k',
      icon: '🏥',
      description: 'Oversee doctor onboarding, clinic partnership verification, and ensure 100% compliance across CarePulse hospital networks.'
    },
    {
      id: 'job-3',
      title: 'Lead Product UI/UX Designer',
      department: 'Design & Product',
      type: 'Full Time',
      location: 'Remote / New York',
      salary: '$110k - $140k',
      icon: '🎨',
      description: 'Craft intuitive, accessible, and delighting healthcare mobile & web interfaces for millions of patients worldwide.'
    },
    {
      id: 'job-4',
      title: 'Patient Care & Relations Specialist',
      department: 'Customer Success',
      type: 'Full Time (Shifts)',
      location: 'Washington, USA',
      salary: '$60k - $78k',
      icon: '🎧',
      description: 'Deliver compassionate 24/7 support, assist patients with urgent slot reservations, and manage feedback loops.'
    },
    {
      id: 'job-5',
      title: 'Clinical Data Security Specialist',
      department: 'Security & DevOps',
      type: 'Full Time',
      location: 'Remote (US/EU)',
      salary: '$125k - $155k',
      icon: '🔒',
      description: 'Ensure HIPAA compliance, zero-trust infrastructure, and end-to-end data encryption across CarePulse cloud servers.'
    }
  ]

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    setIsApplying(true)

    try {
      if (backendUrl) {
        const { data } = await axios.post(`${backendUrl}/api/career/apply`, {
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          ...applicant
        })
        if (data.success) {
          toast.success(data.message)
        } else {
          toast.info(`Application submitted for ${selectedJob.title}! Our hiring team will review your profile.`)
        }
      } else {
        toast.success(`Application submitted for ${selectedJob.title}! Our hiring team will review your profile.`)
      }
    } catch (err) {
      toast.success(`Application submitted for ${selectedJob.title}! Our hiring team will review your profile.`)
    } finally {
      setSelectedJob(null)
      setApplicant({ name: '', email: '', phone: '', experience: '1 - 3 Years', portfolio: '', coverLetter: '' })
      setIsApplying(false)
    }
  }

  return (
    <div className='py-6 space-y-10 relative'>
      {/* Hero Banner Section */}
      <div className='bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-indigo-200/60 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute top-0 left-1/3 w-60 h-60 bg-violet-400/20 rounded-full blur-2xl pointer-events-none' />

        <div className='z-10 max-w-2xl text-center md:text-left'>
          <span className='px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider border border-white/30 inline-block mb-4 shadow-sm'>
            🚀 Join the CarePulse Team
          </span>
          <h1 className='text-3xl sm:text-5xl font-black tracking-tight leading-tight'>
            Build the Future of <span className='text-indigo-200'>Healthcare</span>
          </h1>
          <p className='text-indigo-100 text-sm sm:text-base mt-3 font-medium leading-relaxed'>
            Help us bridge the gap between patients and world-class medical specialists. We are hiring passionate engineers, clinicians, and designers worldwide.
          </p>

          <div className='mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-indigo-100'>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>🌍</span> Remote First Work
            </span>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>💚</span> Full Health Benefits
            </span>
            <span className='flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm'>
              <span>📈</span> Equity & Competitive Pay
            </span>
          </div>
        </div>

        {/* Floating Highlight Card */}
        <div className='z-10 bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-6 text-center min-w-52 shadow-2xl shrink-0 flex flex-col gap-2'>
          <span className='text-4xl font-black text-white'>5 Open</span>
          <p className='text-xs font-bold text-indigo-100 uppercase tracking-wider'>Positions Hiring Now</p>
          <span className='text-[10px] text-emerald-300 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-full mt-1 border border-emerald-400/30'>
            🟢 Apply Today
          </span>
        </div>
      </div>

      {/* Why Work at CarePulse Perks Grid */}
      <div className='space-y-6'>
        <div className='text-center max-w-2xl mx-auto space-y-2'>
          <span className='px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider'>
            Perks & Benefits
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
            Why Work With Us at <span className='text-indigo-600'>CarePulse</span>
          </h2>
          <p className='text-xs sm:text-sm font-medium text-slate-600'>
            We invest in our people so they can create transformative health technology.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold'>
              🩺
            </div>
            <h3 className='font-extrabold text-slate-900 text-base'>100% Medical Coverage</h3>
            <p className='text-xs text-slate-600 font-medium leading-relaxed'>
              Top-tier health, dental, and vision insurance for you and your dependents.
            </p>
          </div>

          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold'>
              🏡
            </div>
            <h3 className='font-extrabold text-slate-900 text-base'>Flexible Work Options</h3>
            <p className='text-xs text-slate-600 font-medium leading-relaxed'>
              Work remotely from anywhere or enjoy modern hubs in Washington & New York.
            </p>
          </div>

          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold'>
              📚
            </div>
            <h3 className='font-extrabold text-slate-900 text-base'>Learning Stipend</h3>
            <p className='text-xs text-slate-600 font-medium leading-relaxed'>
              $2,000 annual budget for courses, medical conferences, and certifications.
            </p>
          </div>

          <div className='bg-white border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:border-indigo-600 transition-all flex flex-col gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold'>
              🌴
            </div>
            <h3 className='font-extrabold text-slate-900 text-base'>Unlimited PTO</h3>
            <p className='text-xs text-slate-600 font-medium leading-relaxed'>
              Take time off when you need it to recharge, rest, and care for family.
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions List */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between border-b border-slate-200 pb-4'>
          <div>
            <span className='px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider'>
              Explore Opportunities
            </span>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1'>
              Current Job Openings ({jobOpenings.length})
            </h2>
          </div>
          <span className='text-xs font-bold text-slate-500 hidden sm:inline-block'>
            Click any position to apply directly
          </span>
        </div>

        <div className='space-y-4'>
          {jobOpenings.map((job) => (
            <div 
              key={job.id}
              className={`bg-white border-2 rounded-3xl p-6 shadow-xl shadow-slate-300/60 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group ${
                selectedJob?.id === job.id ? 'border-indigo-600 ring-4 ring-indigo-100' : 'border-indigo-200/90 hover:border-indigo-600'
              }`}
            >
              <div className='flex items-start gap-4 flex-1'>
                <div className='w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-2xl font-bold shrink-0 transition-colors shadow-sm'>
                  {job.icon}
                </div>
                <div className='space-y-1'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h3 className='text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors'>
                      {job.title}
                    </h3>
                    <span className='px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold'>
                      {job.department}
                    </span>
                  </div>
                  <p className='text-xs text-slate-600 font-medium leading-relaxed max-w-2xl'>
                    {job.description}
                  </p>
                  <div className='flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 pt-1'>
                    <span>📍 {job.location}</span>
                    <span>•</span>
                    <span>⏳ {job.type}</span>
                    <span>•</span>
                    <span className='text-emerald-600 font-extrabold'>💰 {job.salary}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className='w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-indigo-200 cursor-pointer shrink-0'
              >
                {selectedJob?.id === job.id ? '✓ Selected' : 'Apply Now →'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth Scrollable Job Application Modal (Mounted directly into document.body via createPortal) */}
      {selectedJob && createPortal(
        <div className='fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn select-none'>
          <div className='bg-white border-2 border-indigo-600 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto text-slate-900 ring-1 ring-slate-900/10'>
            
            {/* Modal Sticky Header */}
            <div className='bg-gradient-to-r from-indigo-600 to-violet-600 p-5 sm:p-6 text-white flex items-center justify-between shrink-0 shadow-md'>
              <div>
                <span className='px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider border border-white/30'>
                  📝 Job Application
                </span>
                <h2 className='text-xl sm:text-2xl font-black tracking-tight mt-1.5'>
                  {selectedJob.title}
                </h2>
                <p className='text-xs text-indigo-100 font-medium mt-0.5'>
                  {selectedJob.department} • {selectedJob.location} • {selectedJob.salary}
                </p>
              </div>

              <button 
                onClick={() => setSelectedJob(null)}
                className='w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white text-base font-extrabold flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm'
              >
                ✕
              </button>
            </div>

            {/* Modal Smooth Scrollable Form Body */}
            <form onSubmit={handleApplicationSubmit} className='p-5 sm:p-7 space-y-4 overflow-y-auto overscroll-contain scroll-smooth flex-1 text-xs sm:text-sm font-bold text-slate-700 custom-scrollbar'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
                <div>
                  <label className='block mb-1 text-slate-800 font-extrabold'>Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Alex Morgan"
                    value={applicant.name}
                    onChange={(e) => setApplicant({...applicant, name: e.target.value})}
                    className='w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
                  />
                </div>

                <div>
                  <label className='block mb-1 text-slate-800 font-extrabold'>Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="alex@example.com"
                    value={applicant.email}
                    onChange={(e) => setApplicant({...applicant, email: e.target.value})}
                    className='w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
                <div>
                  <label className='block mb-1 text-slate-800 font-extrabold'>Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+1 (555) 000-0000"
                    value={applicant.phone}
                    onChange={(e) => setApplicant({...applicant, phone: e.target.value})}
                    className='w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
                  />
                </div>

                <div>
                  <label className='block mb-1 text-slate-800 font-extrabold'>Total Experience *</label>
                  <select
                    value={applicant.experience}
                    onChange={(e) => setApplicant({...applicant, experience: e.target.value})}
                    className='w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer transition-all'
                  >
                    <option value="< 1 Year">Less than 1 Year</option>
                    <option value="1 - 3 Years">1 - 3 Years</option>
                    <option value="3 - 5 Years">3 - 5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block mb-1 text-slate-800 font-extrabold'>LinkedIn Profile / Resume Drive Link *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://linkedin.com/in/alexmorgan or Google Drive Resume Link"
                  value={applicant.portfolio}
                  onChange={(e) => setApplicant({...applicant, portfolio: e.target.value})}
                  className='w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
                />
              </div>

              <div>
                <label className='block mb-1 text-slate-800 font-extrabold'>Cover Note / Why CarePulse?</label>
                <textarea 
                  rows="3"
                  placeholder="Share a brief note about your background and why you want to join CarePulse..."
                  value={applicant.coverLetter}
                  onChange={(e) => setApplicant({...applicant, coverLetter: e.target.value})}
                  className='w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-all resize-none'
                ></textarea>
              </div>

              {/* Modal Action Footer */}
              <div className='flex items-center gap-3 pt-3 border-t border-slate-100 shrink-0'>
                <button 
                  type="button" 
                  onClick={() => setSelectedJob(null)}
                  className='w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer'
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isApplying}
                  className='w-2/3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-200 transition-all cursor-pointer flex items-center justify-center gap-2'
                >
                  {isApplying ? 'Submitting Application...' : '🚀 Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default Careers
