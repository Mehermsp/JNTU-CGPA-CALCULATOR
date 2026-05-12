import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../context/AuthContext";
import SiteFooter from "../components/SiteFooter";

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);
        try {
            await API.post("/auth/forgot-password", { email });
            setStep(2);
            setInfo("OTP sent to your email.");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);
        try {
            await API.post("/auth/verify-reset-otp", { email, otp });
            setStep(3);
            setInfo("OTP verified. You can now reset your password.");
        } catch (err) {
            setError(err.response?.data?.error || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");
        setLoading(true);
        try {
            await API.post("/auth/reset-password", { email, newPassword, otp });
            setInfo("Password reset successful. You can now log in.");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setError("");
        setInfo("");
        setLoading(true);
        try {
            await API.post("/auth/resend-reset-otp", { email });
            setInfo("OTP resent to your email.");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg" />
            <div className="auth-container">
                <div className="auth-logo">
                    <h1>⚡ JNTU CGPA</h1>
                    <p>Free CGPA & SGPA Calculator for JNTUK R20</p>
                </div>
                <div className="auth-card">
                    <h2>Forgot Password</h2>
                    <p className="subtitle">
                        Reset your password using OTP verification
                    </p>
                    {error && <div className="error-msg">{error}</div>}
                    {info && <div className="info-msg">{info}</div>}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp}>
                            <div className="form-group">
                                <label>Enter OTP</label>
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength={6}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-link"
                                onClick={handleResendOtp}
                                disabled={loading}
                                style={{ marginLeft: 8 }}
                            >
                                Resend OTP
                            </button>
                        </form>
                    )}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword}>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                    minLength={6}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                </div>
                <SiteFooter compact />
            </div>
        </div>
    );
}
