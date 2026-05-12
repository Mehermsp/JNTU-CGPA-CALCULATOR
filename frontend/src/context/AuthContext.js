import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_HOST = (
    process.env.REACT_APP_API_BASE_URL ||
    "https://jntu-cgpa-calculator.onrender.com"
).replace(/\/+$/, "");
const API_BASE_URL = API_HOST.endsWith("/api") ? API_HOST : `${API_HOST}/api`;
const API = axios.create({ baseURL: API_BASE_URL });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("jntu_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("jntu_token");
        if (token) {
            API.get("/auth/me")
                .then((res) => setUser(res.data.user))
                .catch(() => localStorage.removeItem("jntu_token"))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("jntu_token", res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    // Registration with OTP
    const register = async (data) => {
        // Step 1: send registration data, expect OTP sent
        const res = await API.post("/auth/register", data);
        return res.data; // { message }
    };

    const verifyRegisterOtp = async (email, otp) => {
        const res = await API.post("/auth/verify-otp", { email, otp });
        localStorage.setItem("jntu_token", res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const resendRegisterOtp = async (email) => {
        const res = await API.post("/auth/resend-otp", { email });
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("jntu_token");
        setUser(null);
    };

    const updateProfile = async (data) => {
        const res = await API.put("/auth/profile", data);
        setUser(res.data.user);
        return res.data;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                updateProfile,
                API,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { API };
