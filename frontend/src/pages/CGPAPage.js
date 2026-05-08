import React, { useState, useEffect } from 'react';
import { API } from '../context/AuthContext';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function CircleProgress({ value, max, color, label, size = 140 }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circumference - pct * circumference;

  return (
    <div className="circle-card">
      <div className="circle-wrap" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle cx="60" cy="60" r={r} fill="none" stroke={color}
            strokeWidth="10" strokeDasharray={circumference}
            strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease' }} />
        </svg>
        <div className="circle-center">
          <span className="big-num">{value}</span>
        </div>
      </div>
      <div className="circle-label">{label}</div>
    </div>
  );
}

export default function CGPAPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/semesters').then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-screen"><div className="loader" /></div>;

  const sems = data?.semesters || [];
  const cgpa = data?.cgpa || 0;
  const percentage = data?.cgpaPercentage || 0;
  const backlogs = data?.totalBacklogs || 0;
  const classAwarded = data?.classAwarded || '—';

  const radarData = sems.map(s => ({ subject: s.semesterName, SGPA: s.sgpa }));

  // GPA needed to achieve targets
  const remainingSems = 8 - sems.length;
  const currentTotal = sems.reduce((acc, s) => acc + s.sgpa, 0);

  const targets = [9.0, 8.5, 8.0, 7.5].map(target => {
    const needed = remainingSems > 0
      ? ((target * (sems.length + remainingSems)) - currentTotal) / remainingSems
      : null;
    return { target, needed: needed !== null ? Math.min(10, Math.max(0, needed)).toFixed(2) : 'N/A', achievable: needed !== null && needed <= 10 };
  });

  return (
    <div>
      <div className="page-header">
        <h1>CGPA Overview</h1>
        <p>Your overall cumulative academic performance</p>
      </div>

      {sems.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
          <h3>No data available</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Add semester grades in the Calculator first</p>
        </div>
      ) : (
        <div className="cgpa-overview">
          <div className="card">
            <div className="cgpa-circles">
              <CircleProgress value={cgpa} max={10} color="#4f46e5" label="CGPA" />
              <CircleProgress value={percentage} max={100} color="#10b981" label="Percentage %" />
            </div>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
              {backlogs === 0
                ? <span className="no-backlog-badge" style={{ fontSize: 14, padding: '6px 18px' }}>✓ Total Backlogs: 0</span>
                : <span className="backlog-badge" style={{ fontSize: 14, padding: '6px 18px' }}>⚠ Total Backlogs: {backlogs}</span>
              }
            </div>
          </div>

          <div className="class-awarded-card">
            <h3>Class Awarded</h3>
            <div className="class-name">{classAwarded}</div>
            {backlogs === 0 && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>Only without any supplementary appearance</p>}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Summary</h3>
            <table className="summary-table">
              <tbody>
                <tr><td style={{ color: 'var(--text-muted)' }}>Max CGPA</td><td>10.00</td></tr>
                <tr><td style={{ color: 'var(--text-muted)' }}>Max Percentage</td><td>95.00%</td></tr>
                <tr><td style={{ color: 'var(--text-muted)' }}>Your CGPA</td><td style={{ color: '#6366f1' }}>{cgpa}</td></tr>
                <tr><td style={{ color: 'var(--text-muted)' }}>Your Percentage</td><td style={{ color: '#10b981' }}>{percentage}%</td></tr>
                <tr><td style={{ color: 'var(--text-muted)' }}>Total Credits</td><td>{data?.totalCredits || 0}</td></tr>
                <tr><td style={{ color: 'var(--text-muted)' }}>Semesters Completed</td><td>{sems.length} / 8</td></tr>
                <tr><td style={{ color: 'var(--text-muted)' }}>Total Backlogs</td><td style={{ color: backlogs > 0 ? 'var(--danger)' : 'var(--success)' }}>{backlogs}</td></tr>
              </tbody>
            </table>
          </div>

          {sems.length < 8 && (
            <div className="card">
              <h3 style={{ marginBottom: 6 }}>CGPA Target Planner</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>SGPA needed in remaining {remainingSems} semester{remainingSems !== 1 ? 's' : ''}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                {targets.map(t => (
                  <div key={t.target} style={{
                    background: t.achievable ? 'rgba(79,70,229,0.1)' : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${t.achievable ? 'rgba(79,70,229,0.3)' : 'rgba(239,68,68,0.2)'}`,
                    borderRadius: 12, padding: '14px 16px', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Target CGPA</div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 22, margin: '4px 0' }}>{t.target}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Need SGPA</div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: t.achievable ? 'var(--success)' : 'var(--danger)' }}>
                      {t.needed > 10 ? '> 10 ✗' : t.needed}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sems.length >= 3 && (
            <div className="card">
              <h3 style={{ marginBottom: 16 }}>SGPA Radar</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                    <Radar name="SGPA" dataKey="SGPA" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
