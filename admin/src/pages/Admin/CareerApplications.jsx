import React, { useState } from 'react'

const CareerApplications = () => {

  const [activeTab, setActiveTab] = useState('applications') // 'applications' | 'jobs'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL')
  const [activeCoverLetter, setActiveCoverLetter] = useState(null)
  const [showAllJobs, setShowAllJobs] = useState(false)
  
  // Custom Dropdown Open State tracking
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState(null)

  // Modal State for Post New Job Opening
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false)
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Engineering & Tech',
    type: 'Full Time',
    location: 'Remote (Global)',
    salary: '₹12L - ₹16L',
    icon: '💻',
    description: ''
  })

  // Demo initial candidate data matching the frontend Careers.jsx open positions
  const [applications, setApplications] = useState([
    {
      id: 'app-1',
      name: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      phone: '+91 98765 43210',
      jobTitle: 'Senior Full-Stack Engineer',
      department: 'Engineering & Tech',
      experience: '5 - 7 Years',
      portfolio: 'https://github.com/ananya-dev',
      coverLetter: 'I am a passionate Full-Stack Engineer with 6 years of experience building high-throughput React and Node.js microservices. I am excited to contribute to CarePulse healthcare ecosystem.',
      appliedDate: '12 Aug 2026',
      status: 'UNDER REVIEW'
    },
    {
      id: 'app-2',
      name: 'Rohan Mehta',
      email: 'rohan.mehta@example.com',
      phone: '+91 91234 56789',
      jobTitle: 'Medical Operations Coordinator',
      department: 'Clinical Operations',
      experience: '3 - 5 Years',
      portfolio: 'https://linkedin.com/in/rohanmehta-ops',
      coverLetter: 'Having coordinated hospital workflows and practitioner schedules for over 4 years, I bring strong expertise in healthcare compliance and practitioner onboarding.',
      appliedDate: '11 Aug 2026',
      status: 'INTERVIEW SCHEDULED'
    },
    {
      id: 'app-3',
      name: 'Priya Verma',
      email: 'priya.v@example.com',
      phone: '+91 99887 76655',
      jobTitle: 'Lead Product UI/UX Designer',
      department: 'Design & Product',
      experience: '5 - 7 Years',
      portfolio: 'https://dribbble.com/priya-design',
      coverLetter: 'I specialize in creating empathetic, accessible digital healthcare products. My design systems have improved patient retention by over 35%.',
      appliedDate: '10 Aug 2026',
      status: 'NEW'
    },
    {
      id: 'app-4',
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 97766 55443',
      jobTitle: 'Clinical Data Security Specialist',
      department: 'Security & DevOps',
      experience: '7+ Years',
      portfolio: 'https://linkedin.com/in/vikram-sec',
      coverLetter: 'Certified Information Systems Security Professional (CISSP) with extensive background in HIPAA auditing, zero-trust cloud infrastructure, and data encryption.',
      appliedDate: '09 Aug 2026',
      status: 'HIRED'
    }
  ])

  // Demo active job openings matching frontend Careers.jsx
  const [jobOpenings, setJobOpenings] = useState([
    {
      id: 'job-1',
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering & Tech',
      type: 'Full Time',
      location: 'Remote (Global)',
      salary: '₹18L - ₹24L',
      icon: '💻',
      isActive: true,
      applicantsCount: 12
    },
    {
      id: 'job-2',
      title: 'Medical Operations Coordinator',
      department: 'Clinical Operations',
      type: 'Full Time',
      location: 'Washington, USA (Hybrid)',
      salary: '₹10L - ₹14L',
      icon: '🏥',
      isActive: true,
      applicantsCount: 8
    },
    {
      id: 'job-3',
      title: 'Lead Product UI/UX Designer',
      department: 'Design & Product',
      type: 'Full Time',
      location: 'Remote / New York',
      salary: '₹16L - ₹20L',
      icon: '🎨',
      isActive: true,
      applicantsCount: 15
    },
    {
      id: 'job-4',
      title: 'Patient Care & Relations Specialist',
      department: 'Customer Success',
      type: 'Full Time (Shifts)',
      location: 'Washington, USA',
      salary: '₹8L - ₹11L',
      icon: '🎧',
      isActive: true,
      applicantsCount: 9
    },
    {
      id: 'job-5',
      title: 'Clinical Data Security Specialist',
      department: 'Security & DevOps',
      type: 'Full Time',
      location: 'Remote (US/EU)',
      salary: '₹22L - ₹28L',
      icon: '🔒',
      isActive: true,
      applicantsCount: 6
    }
  ])

  const handleStatusChange = (appId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ))
    setOpenStatusDropdownId(null)
  }

  const toggleJobStatus = (jobId) => {
    setJobOpenings(prev => prev.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ))
  }

  const handlePostNewJob = (e) => {
    e.preventDefault()
    if (!newJob.title) return

    const createdJob = {
      id: `job-${Date.now()}`,
      ...newJob,
      isActive: true,
      applicantsCount: 0
    }

    setJobOpenings(prev => [createdJob, ...prev])
    setIsPostJobModalOpen(false)
    setNewJob({
      title: '',
      department: 'Engineering & Tech',
      type: 'Full Time',
      location: 'Remote (Global)',
      salary: '₹12L - ₹16L',
      icon: '💻',
      description: ''
    })
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatusFilter === 'ALL' || app.status === selectedStatusFilter
    return matchesSearch && matchesStatus
  })

  // Count metrics
  const statusCounts = {
    ALL: applications.length,
    NEW: applications.filter(a => a.status === 'NEW').length,
    'UNDER REVIEW': applications.filter(a => a.status === 'UNDER REVIEW').length,
    'INTERVIEW SCHEDULED': applications.filter(a => a.status === 'INTERVIEW SCHEDULED').length,
    HIRED: applications.filter(a => a.status === 'HIRED').length,
    DECLINED: applications.filter(a => a.status === 'DECLINED').length
  }

  const statusBadgesMap = {
    'NEW': { label: '✨ NEW', badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100' },
    'UNDER REVIEW': { label: '⏳ UNDER REVIEW', badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-100' },
    'INTERVIEW SCHEDULED': { label: '📅 INTERVIEW', badgeClass: 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100' },
    'HIRED': { label: '🎉 HIRED', badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' },
    'DECLINED': { label: '✕ DECLINED', badgeClass: 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100' }
  }

  return (
    <div className='w-full max-w-7xl mx-auto space-y-6 pb-0 select-none'>

      {/* Executive Dark Hero Banner */}
      <div className='bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-indigo-500/20'>
        
        {/* Glow Orbs */}
        <div className='absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none'></div>
        <div className='absolute left-10 top-0 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none'></div>

        <div className='space-y-2 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/20 text-pink-200 font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            💼 CarePulse Talent Acquisition Engine
          </div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight'>
            Career & Recruitment Hub
          </h1>
          <p className='text-xs text-indigo-200/90 font-medium leading-relaxed'>
            Manage candidate submissions from the CarePulse Careers portal, review qualifications, track interview pipelines, and configure live job postings.
          </p>
        </div>

        {/* Counter Telemetry Widget */}
        <div className='z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl shrink-0'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-md'>
            👥
          </div>
          <div>
            <p className='text-xl font-black text-white leading-none'>{applications.length}</p>
            <p className='text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1'>Applicants Total</p>
          </div>
        </div>

      </div>

      {/* 🚀 PRIMARY SEGMENTED TOGGLE BAR (Applications Roster vs Job Openings Manager) */}
      <div className='bg-white p-2.5 rounded-3xl border-2 border-indigo-200/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4'>
        
        {/* Main Tab Switcher Toggle Bar */}
        <div className='bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 flex items-center gap-1.5 w-full md:w-auto shadow-inner'>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25 border border-indigo-400 scale-[1.02]'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-white/60 font-bold'
            }`}
          >
            <span>👥 Candidate Applications ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25 border border-indigo-400 scale-[1.02]'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-white/60 font-bold'
            }`}
          >
            <span>💼 Live Job Openings ({jobOpenings.length})</span>
          </button>
        </div>

        {/* Action Button: Post New Job Opening */}
        <button 
          onClick={() => setIsPostJobModalOpen(true)}
          className='w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 border-2 border-emerald-400/80 transition-all cursor-pointer inline-flex items-center justify-center gap-2 hover:scale-[1.02]'
        >
          <span className='text-sm bg-white/20 p-1 rounded-lg'>➕</span>
          <span>POST NEW JOB OPENING</span>
        </button>

      </div>

      {/* TAB 1: CANDIDATE APPLICATIONS ROSTER */}
      {activeTab === 'applications' && (
        <div className='space-y-6 animate-in fade-in duration-200'>
          
          {/* 🏷️ REDESIGNED NEAT FILTER & SEARCH PANEL */}
          <div className='bg-white p-5 rounded-3xl border-2 border-indigo-200/90 shadow-md space-y-4'>
            
            {/* Top Row: Search Input + Metrics */}
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
              <div className='relative w-full sm:w-96'>
                <input 
                  type="text" 
                  placeholder="Search Candidate Name, Email, or Job Title..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-10 py-2.5 rounded-2xl border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all bg-slate-50/50'
                />
                <span className='absolute left-3.5 top-3 text-indigo-500 text-xs'>🔍</span>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className='absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold'
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className='text-xs font-black text-slate-600 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 shrink-0 self-end sm:self-auto'>
                Showing <span className='text-indigo-600 font-black text-sm'>{filteredApplications.length}</span> of {applications.length} Candidates
              </div>
            </div>

            {/* Bottom Row: Single-Line Filter Segmented Pill Bar */}
            <div className='pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar py-1'>
              {[
                { label: 'ALL', key: 'ALL', color: 'from-indigo-600 via-purple-600 to-pink-600' },
                { label: '✨ NEW', key: 'NEW', color: 'from-amber-500 to-orange-600' },
                { label: '⏳ UNDER REVIEW', key: 'UNDER REVIEW', color: 'from-indigo-600 to-blue-600' },
                { label: '📅 INTERVIEW', key: 'INTERVIEW SCHEDULED', color: 'from-purple-600 to-pink-600' },
                { label: '🎉 HIRED', key: 'HIRED', color: 'from-emerald-600 to-teal-600' },
                { label: '✕ DECLINED', key: 'DECLINED', color: 'from-rose-600 to-pink-600' }
              ].map(statusItem => (
                <button
                  key={statusItem.key}
                  onClick={() => setSelectedStatusFilter(statusItem.key)}
                  className={`px-4 py-2 rounded-2xl transition-all duration-200 cursor-pointer text-xs font-black border-2 flex items-center gap-2 shrink-0 ${
                    selectedStatusFilter === statusItem.key
                      ? `bg-gradient-to-r ${statusItem.color} text-white border-white/50 shadow-md shadow-purple-500/20 scale-[1.02]`
                      : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300'
                  }`}
                >
                  <span>{statusItem.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    selectedStatusFilter === statusItem.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {statusCounts[statusItem.key] || 0}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Table Container */}
          <div className='bg-white border-2 border-indigo-200/80 rounded-3xl shadow-xl shadow-indigo-100/50 overflow-hidden'>
            
            {/* Table Header */}
            <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_2.5fr_1.5fr_1.5fr_1.5fr] gap-4 py-4 px-6 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border-b-2 border-indigo-800/50 text-white text-xs font-black uppercase tracking-wider'>
              <p>#</p>
              <p>Candidate Profile</p>
              <p>Applied Position</p>
              <p>Experience & Contact</p>
              <p>Documents</p>
              <p className='text-right'>Hiring Status</p>
            </div>

            {/* Applicant Rows */}
            <div className='divide-y divide-slate-100'>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((item, index) => (
                  <div key={item.id} className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2.5fr_2.5fr_1.5fr_1.5fr_1.5fr] gap-4 items-center py-4 px-6 hover:bg-gradient-to-r hover:from-indigo-50/60 hover:via-purple-50/40 hover:to-pink-50/20 transition-all duration-200 text-xs font-medium text-slate-700 relative'>
                    
                    <p className='hidden sm:block font-black text-indigo-600 text-xs'>{index + 1}</p>

                    {/* Candidate Info */}
                    <div className='flex items-center gap-3 w-full sm:w-auto'>
                      <div className='w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-white/40 shrink-0'>
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className='font-black text-slate-900 text-sm tracking-tight'>{item.name}</p>
                        <p className='text-[10.5px] text-slate-400 font-semibold'>{item.email}</p>
                      </div>
                    </div>

                    {/* Job Position */}
                    <div className='w-full sm:w-auto space-y-1'>
                      <p className='font-extrabold text-slate-900 text-xs'>{item.jobTitle}</p>
                      <span className='px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-black text-[10px] inline-block shadow-2xs'>
                        🏢 {item.department}
                      </span>
                    </div>

                    {/* Experience & Phone */}
                    <div className='w-full sm:w-auto space-y-1'>
                      <span className='px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-extrabold text-[10.5px] block w-fit shadow-2xs'>
                        ⭐ {item.experience}
                      </span>
                      <p className='text-[11px] font-bold text-slate-500'>📞 {item.phone}</p>
                    </div>

                    {/* Documents & Cover Letter */}
                    <div className='flex items-center gap-2 w-full sm:w-auto'>
                      {item.portfolio && (
                        <a 
                          href={item.portfolio} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className='px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-[10.5px] border border-indigo-200 transition-all shadow-2xs'
                        >
                          🔗 Portfolio
                        </a>
                      )}
                      <button 
                        onClick={() => setActiveCoverLetter(item)}
                        className='px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-black text-[10.5px] border border-purple-200 transition-all cursor-pointer shadow-2xs'
                      >
                        📝 Letter
                      </button>
                    </div>

                    {/* 🎨 CUSTOM BEAUTIFUL FLOATING DROPDOWN MENU */}
                    <div className='sm:text-right w-full sm:w-auto relative'>
                      
                      <button
                        onClick={() => setOpenStatusDropdownId(openStatusDropdownId === item.id ? null : item.id)}
                        className={`px-4 py-2 rounded-2xl font-black text-[11px] uppercase tracking-wider border-2 cursor-pointer transition-all shadow-sm flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto ${
                          statusBadgesMap[item.status]?.badgeClass || 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        <span>{statusBadgesMap[item.status]?.label || item.status}</span>
                        <span className='text-[10px] text-slate-400'>▼</span>
                      </button>

                      {/* Floating Dropdown Card Popup */}
                      {openStatusDropdownId === item.id && (
                        <>
                          <div 
                            className='fixed inset-0 z-30' 
                            onClick={() => setOpenStatusDropdownId(null)} 
                          />
                          <div className='absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border-2 border-indigo-200 shadow-2xl p-2 z-40 space-y-1 animate-in fade-in zoom-in-95 duration-150'>
                            <p className='text-[9.5px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 border-b border-slate-100'>
                              Update Application Status
                            </p>
                            {[
                              { key: 'NEW', label: '✨ NEW', class: 'hover:bg-amber-50 text-amber-900' },
                              { key: 'UNDER REVIEW', label: '⏳ UNDER REVIEW', class: 'hover:bg-indigo-50 text-indigo-900' },
                              { key: 'INTERVIEW SCHEDULED', label: '📅 INTERVIEW', class: 'hover:bg-purple-50 text-purple-900' },
                              { key: 'HIRED', label: '🎉 HIRED', class: 'hover:bg-emerald-50 text-emerald-900' },
                              { key: 'DECLINED', label: '✕ DECLINED', class: 'hover:bg-rose-50 text-rose-900' }
                            ].map(opt => (
                              <button
                                key={opt.key}
                                onClick={() => handleStatusChange(item.id, opt.key)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${opt.class} ${
                                  item.status === opt.key ? 'bg-indigo-50/80 font-extrabold ring-1 ring-indigo-200' : ''
                                }`}
                              >
                                <span>{opt.label}</span>
                                {item.status === opt.key && <span className='text-indigo-600 font-bold text-xs'>✓</span>}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                    </div>

                  </div>
                ))
              ) : (
                <div className='p-12 text-center text-slate-400 text-xs font-medium'>
                  No candidate applications match the selected filter.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: LIVE JOB OPENINGS MANAGER */}
      {activeTab === 'jobs' && (
        <div className='space-y-6 animate-in fade-in duration-200'>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {(showAllJobs ? jobOpenings : jobOpenings.slice(0, 3)).map(job => (
              <div 
                key={job.id} 
                className={`p-6 rounded-3xl border-2 transition-all duration-200 shadow-lg space-y-5 bg-white relative overflow-hidden ${
                  job.isActive ? 'border-indigo-200/90 shadow-indigo-100/50' : 'border-slate-200 opacity-75'
                }`}
              >
                
                {/* Header Row */}
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 text-2xl flex items-center justify-center border border-indigo-200/80 shadow-xs'>
                      {job.icon}
                    </div>
                    <div>
                      <h3 className='font-black text-slate-900 text-base leading-snug'>{job.title}</h3>
                      <p className='text-xs text-indigo-600 font-extrabold'>{job.department}</p>
                    </div>
                  </div>
                </div>

                {/* Badges Row */}
                <div className='flex flex-wrap gap-2 text-[10.5px] font-bold text-slate-700'>
                  <span className='px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200'>📍 {job.location}</span>
                  <span className='px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold'>💰 {job.salary}</span>
                  <span className='px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 font-extrabold'>🕒 {job.type}</span>
                </div>

                {/* Interactive Status Toggle Switcher */}
                <div className='pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold'>
                  <div className='flex items-center gap-2'>
                    <span className='text-slate-500'>Applicants:</span>
                    <span className='px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-black text-xs'>{job.applicantsCount}</span>
                  </div>

                  {/* 🔘 TOGGLE SWITCH BUTTON */}
                  <button
                    onClick={() => toggleJobStatus(job.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 transition-all cursor-pointer text-[11px] font-black ${
                      job.isActive 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-400 hover:bg-emerald-100 shadow-xs' 
                        : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${job.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    <span>{job.isActive ? 'ACTIVE ON SITE' : 'PAUSED'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* 🔘 TOGGLE SHOW MORE / SHOW LESS BUTTON FOR JOBS */}
          {jobOpenings.length > 3 && (
            <div className='flex justify-center pt-4'>
              <button
                onClick={() => setShowAllJobs(!showAllJobs)}
                className='px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-500/25 border-2 border-indigo-400 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2'
              >
                <span>{showAllJobs ? '👆 SHOW LESS JOBS' : `👇 VIEW ALL JOB OPENINGS (${jobOpenings.length})`}</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ➕ POST NEW JOB OPENING MODAL POPUP */}
      {isPostJobModalOpen && (
        <div className='fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto'>
          <div className='bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-indigo-200 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in duration-200'>
            
            <div className='flex items-center justify-between border-b pb-4 border-slate-100'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-black text-lg flex items-center justify-center shadow-md'>
                  ➕
                </div>
                <div>
                  <h3 className='font-black text-slate-900 text-lg'>Post New Job Opening</h3>
                  <p className='text-xs text-slate-500 font-medium'>Publish a career opportunity to the CarePulse portal</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPostJobModalOpen(false)}
                className='w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs flex items-center justify-center cursor-pointer transition-all'
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostNewJob} className='space-y-4 text-xs font-black text-slate-800'>
              
              <div className='flex flex-col gap-1.5'>
                <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Job Title</p>
                <input 
                  type="text" 
                  placeholder="e.g. Lead Clinical Research Specialist" 
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className='border-2 border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all'
                  required 
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Department</p>
                  <select 
                    value={newJob.department}
                    onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    className='border-2 border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all bg-white cursor-pointer'
                  >
                    <option value="Engineering & Tech">💻 Engineering & Tech</option>
                    <option value="Clinical Operations">🏥 Clinical Operations</option>
                    <option value="Design & Product">🎨 Design & Product</option>
                    <option value="Customer Success">🎧 Customer Success</option>
                    <option value="Security & DevOps">🔒 Security & DevOps</option>
                    <option value="Medical Specialists">🩺 Medical Specialists</option>
                  </select>
                </div>

                <div className='flex flex-col gap-1.5'>
                  <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Employment Type</p>
                  <select 
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    className='border-2 border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all bg-white cursor-pointer'
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Full Time (Shifts)">Full Time (Shifts)</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Location</p>
                  <input 
                    type="text" 
                    placeholder="e.g. Remote (Global) or Washington, USA" 
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className='border-2 border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all'
                    required 
                  />
                </div>

                <div className='flex flex-col gap-1.5'>
                  <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Salary Range (₹ INR or $)</p>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹15L - ₹20L or $100k - $130k" 
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className='border-2 border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all'
                    required 
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Job Description & Scope</p>
                <textarea 
                  rows={3}
                  placeholder="Outline key responsibilities and expectations for candidates..." 
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className='border-2 border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all'
                  required 
                />
              </div>

              <div className='pt-2 flex items-center justify-end gap-3 border-t border-slate-100'>
                <button 
                  type='button'
                  onClick={() => setIsPostJobModalOpen(false)}
                  className='px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer transition-all'
                >
                  Cancel
                </button>
                <button 
                  type='submit'
                  className='px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 border border-emerald-400 cursor-pointer transition-all'
                >
                  Publish Job Opening
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Cover Letter Modal Popup */}
      {activeCoverLetter && (
        <div className='fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-indigo-200 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200'>
            <div className='flex items-center justify-between border-b pb-3 border-slate-100'>
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs'>
                  📝
                </div>
                <div>
                  <h3 className='font-black text-slate-900 text-base'>{activeCoverLetter.name}</h3>
                  <p className='text-xs text-indigo-600 font-bold'>{activeCoverLetter.jobTitle}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveCoverLetter(null)}
                className='w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs flex items-center justify-center cursor-pointer transition-all'
              >
                ✕
              </button>
            </div>

            <div className='space-y-2'>
              <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>Applicant Cover Letter</p>
              <p className='text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80 max-h-60 overflow-y-auto whitespace-pre-line'>
                "{activeCoverLetter.coverLetter}"
              </p>
            </div>

            <div className='flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-slate-500'>
              <p>Applied Date: {activeCoverLetter.appliedDate}</p>
              <button 
                onClick={() => setActiveCoverLetter(null)}
                className='px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 cursor-pointer shadow-xs'
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default CareerApplications
