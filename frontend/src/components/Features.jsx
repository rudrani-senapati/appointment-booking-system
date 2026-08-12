import React from 'react'

const Features = () => {
  const featureList = [
    {
      icon: '⚡',
      title: 'Instant Booking',
      desc: 'Schedule appointments in under 60 seconds with real-time doctor availability.'
    },
    {
      icon: '🩺',
      title: 'Verified Specialists',
      desc: 'Access 100+ certified medical experts across 15+ specialized healthcare fields.'
    },
    {
      icon: '🔒',
      title: '100% Confidential',
      desc: 'Your personal health records and appointments are end-to-end encrypted & safe.'
    },
    {
      icon: '💬',
      title: '24/7 Patient Support',
      desc: 'Our dedicated healthcare assistance team is available around the clock to assist you.'
    }
  ]

  return (
    <div className='mt-12 mb-8 pt-8 pb-6 border-t border-slate-200/80'>
      <div className='text-center mb-10'>
        <span className='px-4 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-sm border border-indigo-200/60'>
          Why Choose Prescripto
        </span>
        <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight'>
          Healthcare Built Around Your Needs
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {featureList.map((item, index) => (
          <div key={index} className='bg-white border-2 border-indigo-200/90 hover:border-indigo-600 rounded-3xl p-6 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-1.5 transition-all duration-300 flex flex-col gap-3 group relative overflow-hidden'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-2xl text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300'>
              <span className='group-hover:scale-110 transition-transform duration-300'>{item.icon}</span>
            </div>
            <h3 className='font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors mt-1'>
              {item.title}
            </h3>
            <p className='text-slate-600 font-medium text-xs leading-relaxed'>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features