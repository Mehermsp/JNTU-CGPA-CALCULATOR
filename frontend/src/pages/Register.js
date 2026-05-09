import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SiteFooter from '../components/SiteFooter';
import { BRANCH_OPTIONS } from '../utils/branchSubjects';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', rollNumber: '', branch: '', regulation: 'R20' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally { setLoading(false); }
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
          <h2>Create Account</h2>
          <p className="subtitle">Start tracking your academic performance</p>
          {error && <div className="error-msg">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input placeholder="Your Name" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" value={form.email}
                onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Min 6 characters" value={form.password}
                onChange={e => setForm({...form, password: e.target.value})} required minLength={6} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Roll Number</label>
                <input placeholder="22AG1A0501" value={form.rollNumber}
                  onChange={e => setForm({...form, rollNumber: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <select value={form.branch} onChange={e => setForm({...form, branch: e.target.value})}>
                  <option value="">Select</option>
                  {BRANCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Regulation</label>
              <select value={form.regulation} onChange={e => setForm({...form, regulation: e.target.value})}>
                <option value="R20">R20</option>
                <option value="R19">R19</option>
                <option value="R16">R16</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <div className="auth-switch">
            Already have an account? <a onClick={() => navigate('/login')}>Sign in</a>
          </div>
        </div>
        <SiteFooter compact />
      </div>
    </div>
  );
}
