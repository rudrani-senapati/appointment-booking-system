import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const [adminProfile, setAdminProfile] = useState(() => {
        const saved = localStorage.getItem('adminProfile')
        return saved ? JSON.parse(saved) : {
            name: 'System Administrator',
            email: 'admin@carepulse.com',
            role: 'Super Administrator',
            phone: '+91 98765 43210',
            address: { line1: 'CarePulse HQ, Tech Tower 4', line2: 'Healthcare District, Mumbai 400001' },
            permissions: ['Full System Access', 'Doctor Onboarding', 'Appointments Management', 'Hiring Operations'],
            image: ''
        }
    })

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: {aToken} })

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);


            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin//cancel-appointment', {appointmentId}, {headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updateAdminProfileData = (updatedData) => {
        setAdminProfile(updatedData)
        localStorage.setItem('adminProfile', JSON.stringify(updatedData))
        toast.success('🛡️ Admin profile updated successfully!')
    }

    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData,
        adminProfile, setAdminProfile, updateAdminProfileData
    }

    // Auto-polling for Admin context so data updates live
    useEffect(() => {
        if (aToken) {
            getAllDoctors()
            getAllAppointments()
            getDashData()

            const interval = setInterval(() => {
                getAllDoctors()
                getAllAppointments()
                getDashData()
            }, 10000)

            return () => clearInterval(interval)
        }
    }, [aToken])
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider