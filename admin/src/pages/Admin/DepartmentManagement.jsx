import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DepartmentManagement = () => {
  const { backendUrl, aToken } = useContext(AdminContext)

  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newDept, setNewDept] = useState({
    name: '',
    icon: '🩺',
    description: '',
    headDoctor: ''
  })

  const fetchDepartments = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/departments', {
        headers: { aToken }
      })
      if (data.success) {
        setDepartments(data.departments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (aToken) {
      fetchDepartments()
    }
  }, [aToken])

  const handleAddDepartment = async (e) => {
    e.preventDefault()
    if (!newDept.name.trim()) return toast.error('Please enter department name')

    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/add-department',
        newDept,
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsModalOpen(false)
        setNewDept({ name: '', icon: '🩺', description: '', headDoctor: '' })
        fetchDepartments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full max-w-7xl mx-auto space-y-8 pb-0 select-none'>

      {/* Dark Executive Hero Header */}
      <div className='bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-indigo-500/20'>
        <div className='space-y-2 z-10 max-w-xl'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20 text-indigo-200 font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            🏢 Clinical Unit Governance
          </div>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight'>
            Hospital Departments Management
          </h1>
          <p className='text-xs text-indigo-200/90 font-medium leading-relaxed'>
            Organize medical units, assign clinical heads, and monitor active practitioner counts across the CarePulse network.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className='z-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-xs px-6 py-3.5 rounded-2xl shadow-xl shadow-pink-500/30 border border-white/30 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2 shrink-0 uppercase tracking-wider'
        >
          <span>➕ Add New Department</span>
        </button>
      </div>

      {/* Department Cards Grid */}
      {loading ? (
        <div className='p-12 text-center text-slate-400 text-sm font-bold'>
          Loading clinical departments...
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {departments.map((dept, index) => (
            <div
              key={index}
              className='bg-white/95 backdrop-blur-xl border-2 border-indigo-200/90 rounded-3xl p-6 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:border-indigo-600 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 relative group'
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shadow-sm shrink-0 group-hover:scale-110 transition-transform'>
                  {dept.icon || '🩺'}
                </div>
                <span className='px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black rounded-full uppercase tracking-wider'>
                  {dept.doctorCount || 0} Doctors
                </span>
              </div>

              <div>
                <h3 className='text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors'>
                  {dept.name}
                </h3>
                <p className='text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-relaxed'>
                  {dept.description || 'Specialized clinical unit providing outpatient and inpatient care.'}
                </p>
              </div>

              <div className='pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600'>
                <span className='text-slate-400 font-black uppercase text-[9px] tracking-wider'>Status</span>
                <span className='text-indigo-600 font-black flex items-center gap-1'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block'></span> Active Unit
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Department Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-indigo-200 space-y-6 animate-in zoom-in-95 duration-200'>
            
            <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
              <div className='flex items-center gap-2.5'>
                <div className='w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-md'>
                  🏥
                </div>
                <h3 className='text-lg font-black text-slate-900'>Add Clinical Unit</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className='w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-black flex items-center justify-center cursor-pointer'
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDepartment} className='space-y-4 text-xs font-black text-slate-800'>
              <div className='flex flex-col gap-1.5'>
                <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Department Name</p>
                <input
                  type="text"
                  value={newDept.name}
                  onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  placeholder='e.g. Cardiology, Pediatrics'
                  className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 text-xs'
                  required
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Icon Emoji</p>
                <select
                  value={newDept.icon}
                  onChange={(e) => setNewDept({ ...newDept, icon: e.target.value })}
                  className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 text-xs cursor-pointer'
                >
                  <option value="🩺">🩺 General Medicine</option>
                  <option value="❤️">❤️ Cardiology</option>
                  <option value="🧠">🧠 Neurology</option>
                  <option value="🦴">🦴 Orthopedics</option>
                  <option value="🧴">🧴 Dermatology</option>
                  <option value="🧸">🧸 Pediatrics</option>
                  <option value="👁️">👁️ Ophthalmology</option>
                  <option value="👂">👂 ENT</option>
                  <option value="🪥">🪥 Dentistry</option>
                  <option value="🏥">🏥 General Unit</option>
                </select>
              </div>

              <div className='flex flex-col gap-1.5'>
                <p className='text-indigo-900 uppercase tracking-wider text-[11px]'>Description</p>
                <textarea
                  value={newDept.description}
                  onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
                  placeholder='Brief summary of clinical operations...'
                  rows={3}
                  className='border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 text-xs'
                />
              </div>

              <button
                type='submit'
                className='w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-300 hover:from-indigo-700 transition-all cursor-pointer'
              >
                ➕ Create Department
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default DepartmentManagement
