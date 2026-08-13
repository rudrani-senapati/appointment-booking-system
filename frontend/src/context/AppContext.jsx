import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { doctors as initialDoctors } from '../assets/assets';

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState(initialDoctors)

    // Helper to get initial valid token
    const getInitialToken = () => {
        const stored = localStorage.getItem('token')
        if (!stored || stored === 'undefined' || stored === 'null' || stored === 'false') {
            localStorage.removeItem('token')
            return null
        }
        return stored
    }

    const [token, setToken] = useState(getInitialToken()) 
    const [userData, setUserData] = useState(false)

    // --- Data Fetching Functions ---

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success && data.doctors && data.doctors.length > 0) {
                setDoctors(data.doctors)
            } else {
                setDoctors(initialDoctors)
            }
        } catch (error) {
            console.error("Error fetching doctors data:", error);
        }
    }

    const loadUserProfileData = async (currentToken) => {
        const activeToken = currentToken || token
        if (!activeToken || typeof activeToken !== 'string') return

        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { 
                    token: activeToken,
                    Authorization: `Bearer ${activeToken}`
                }
            }) 
            
            if (data.success) {
                setUserData(data.userData)
            } else {
                // If token is invalid or expired
                localStorage.removeItem('token')
                setToken(null)
                setUserData(false)
            }
        } catch (error) {
            console.error("Error loading user profile:", error);
            // On 401 Unauthorized or expired token, clear session silently
            localStorage.removeItem('token')
            setToken(null)
            setUserData(false)
        }
    }

    // --- Context Value ---

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }

    // --- Effects ---

    useEffect(() => {
        getDoctorsData()

        // Auto-refresh doctors list every 10 seconds so database changes reflect live without page refresh
        const interval = setInterval(() => {
            getDoctorsData()
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (token && typeof token === 'string' && token !== 'undefined') {
            axios.defaults.headers.common['token'] = token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            loadUserProfileData(token);
        } else {
            delete axios.defaults.headers.common['token'];
            delete axios.defaults.headers.common['Authorization'];
            setUserData(false);
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider