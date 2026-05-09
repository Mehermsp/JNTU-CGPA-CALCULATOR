import React, { useState, useEffect } from 'react';
import { API } from '../context/AuthContext';
import { SEMESTER_LABELS, getGradeColor, getGPColor, getGradeLabel, getGradePoint } from '../utils/grades';

export default function SGPAPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    API.get('/semesters').then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-screen"><div className="loader" /></div>;

  const sems = data?.semesters || [];

  return (
    <div>
      <div className="page-header">
        <h1>Semester-wise SGPA</h1>
        <p>Detailed view of your performance in each semester</p>
      </div>

      {sems.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
          <h3>No semester data found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Go to the Calculator to add your semester grades</p>
        </div>
      ) : (
        <div className="sem-list">
          {sems.map(sem => (
            <div key={sem.semesterName} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div
                className="sgpa-sem-header"
                onClick={() => setExpanded(expanded === sem.semesterName ? null : sem.semesterName)}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{sem.semesterName} Sem</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{SEMESTER_LABELS[sem.semesterName]}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 22, color: getGPColor(sem.sgpa) }}>{sem.sgpa}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>SGPA</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16 }}>{sem.percentage}%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Percentage</div>
                </div>
                <div>
                  {sem.totalBacklogs > 0
                    ? <span className="backlog-badge">⚠ {sem.totalBacklogs}</span>
                    : <span className="no-backlog-badge">✓ Clear</span>
                  }
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 18, textAlign: 'center', transition: 'transform 0.2s', transform: expanded === sem.semesterName ? 'rotate(90deg)' : 'none' }}>›</div>
              </div>

              {expanded === sem.semesterName && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px' }}>
                  <div className="table-scroll sgpa-table-wrap">
                    <table className="subject-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Grade</th>
                          <th>Grade Points</th>
                          <th>Credits</th>
                          <th>Weighted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sem.subjects.map((sub, idx) => {
                          const gp = getGradePoint(sub.grade);
                          return (
                            <tr key={idx}>
                              <td data-label="Subject">{sub.name}</td>
                              <td data-label="Grade"><span className="grade-badge" style={{ color: getGradeColor(sub.grade) }}>{getGradeLabel(sub.grade)}</span></td>
                              <td data-label="Grade Points" style={{ fontWeight: 600 }}>{gp}</td>
                              <td data-label="Credits">{sub.credits}</td>
                              <td data-label="Weighted" style={{ fontFamily: 'Space Grotesk', fontWeight: 600 }}>
                                {(gp * sub.credits).toFixed(1)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="result-section" style={{ marginTop: 16 }}>
                    <div className="result-item">
                      <div className="result-label">SGPA</div>
                      <div className="result-value" style={{ color: getGPColor(sem.sgpa) }}>{sem.sgpa}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Percentage</div>
                      <div className="result-value" style={{ color: 'var(--secondary)' }}>{sem.percentage}%</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Total Credits</div>
                      <div className="result-value">{sem.totalCredits}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Backlogs</div>
                      <div className="result-value" style={{ color: sem.totalBacklogs > 0 ? 'var(--danger)' : 'var(--success)' }}>{sem.totalBacklogs}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
