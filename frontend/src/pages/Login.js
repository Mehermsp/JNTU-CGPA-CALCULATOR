import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SiteFooter from "../components/SiteFooter";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg" />
            <div className="auth-container">
                <div className="auth-logo">
                    <h1>JNTU CGPA</h1>
                    <p>Free CGPA & SGPA Calculator for JNTUK R20</p>
                </div>
                <div className="auth-card">
                    <h2>Welcome back</h2>
                    <p className="subtitle">
                        Sign in to access your academic records
                    </p>
                    {error && <div className="error-msg">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div
                            className="auth-switch"
                            style={{
                                marginTop: -4,
                                marginBottom: 14,
                                textAlign: "right",
                            }}
                        >
                            <button
                                type="button"
                                className="auth-link-btn"
                                onClick={() => navigate("/forgot-password")}
                            >
                                Reset Password
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                    <div className="auth-switch">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="auth-link-btn"
                            onClick={() => navigate("/register")}
                        >
                            Create one free
                        </button>
                    </div>
                </div>
                <SiteFooter compact />
            </div>
        </div>
    );
}
