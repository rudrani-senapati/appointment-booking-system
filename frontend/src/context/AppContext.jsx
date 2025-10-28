import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    // 💡 Fix 1: Initialize token to null, not the boolean false, for cleaner checks.
    const [token, setToken] = useState(localStorage.getItem('token') || null) 
    const [userData, setUserData] = useState(false)

    // --- Data Fetching Functions ---

    const getDoctorsData = async () => {
        try {
            // NOTE: Assuming this endpoint does NOT require authentication
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error fetching doctors data:", error); // Use console.error for clarity
            // In a real app, you might only show error.response.data.message
            toast.error(error.message) 
        }
    }

    const loadUserProfileData = async () => {
        try {
            // No need to pass headers here, as Fix 3 handles it globally!
            const {data} = await axios.get(backendUrl + '/api/user/get-profile') 
            
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error loading user profile:", error);
            // This is where the 401 error message would appear in the console.
            // You can add logic to log the user out on a 401 response:
            if (error.response && error.response.status === 401) {
                toast.error("Session expired or unauthorized. Please log in again.");
                setToken(null);
                localStorage.removeItem('token');
            } else {
                toast.error("Failed to load profile.");
            }
        }
    }

    // --- Context Value ---

    const value ={
        doctors, getDoctorsData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }

    // --- Effects ---

    useEffect(() => {
        getDoctorsData()
    },[]) // Run once on component mount

    // 💡 Fix 3: Global Axios Header Configuration
    useEffect (() => {
        // Only proceed if a valid token (non-null string) exists
        if (token && typeof token === 'string') {
            // Set the Authorization header globally for all authenticated requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Now, load the protected data
            loadUserProfileData();
        } else {
            // When token is removed (e.g., on logout), clear the global header
            delete axios.defaults.headers.common['Authorization'];
            setUserData(false);
        }
    },[token]) // Rerun whenever the token state changes

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider