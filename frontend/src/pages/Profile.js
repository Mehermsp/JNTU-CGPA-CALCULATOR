import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '', rollNumber: user?.rollNumber || '',
    branch: user?.branch || '', regulation: user?.regulation || 'R20'
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const branches = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CHEM', 'AIDS', 'AIML', 'DS', 'CS', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSaved(false);
    try {
      await updateProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError('Update failed. Please try again.');
    } finally { setSaving(false); }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <div>
      <div className="page-header">
        <h1>Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div className="profile-grid">
        <div className="card profile-header-card">
          <div className="profile-avatar">{initials}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{user?.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>{user?.email}</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {user?.rollNumber && <span style={{ background: 'rgba(79,70,229,0.15)', color: '#818cf8', padding: '3px 10px', borderRadius: 6, fontSize: 12 }}>{user.rollNumber}</span>}
              {user?.branch && <span style={{ background: 'rgba(6,182,212,0.15)', color: 'var(--secondary)', padding: '3px 10px', borderRadius: 6, fontSize: 12 }}>{user.branch}</span>}
              {user?.regulation && <span style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--success)', padding: '3px 10px', borderRadius: 6, fontSize: 12 }}>{user.regulation}</span>}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Edit Profile</h3>
          {error && <div className="error-msg">{error}</div>}
          {saved && <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--success)', padding: '12px 16px', borderRadius: 10, fontSize: 13, marginBottom: 16 }}>✓ Profile updated successfully</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Roll Number</label>
                <input value={form.rollNumber} onChange={e => setForm({...form, rollNumber: e.target.value})} placeholder="22AG1A0501" />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <select value={form.branch} onChange={e => setForm({...form, branch: e.target.value})}>
                  <option value="">Select</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
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
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 8 }}>Account</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>Email: {user?.email}</p>
          <button className="btn btn-danger" onClick={() => { if (window.confirm('Sign out?')) logout(); }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
