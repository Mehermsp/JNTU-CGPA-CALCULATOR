import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import {
  GRADES,
  SEMESTER_LIST,
  SEMESTER_LABELS,
  JNTUK_R20_SUBJECTS,
  calculateSGPA,
  getGradeColor,
  getGradeLabel,
  getGradePoint,
  isNonCreditGrade,
  normalizeGrade
} from '../utils/grades';
import { getBranchSemesterSubjects } from '../utils/branchSubjects';

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2500); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast ${type}`}>{msg}</div>;
}

export default function Calculator() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSem, setActiveSem] = useState('1-1');
  const [subjects, setSubjects] = useState([]);
  const [savedSems, setSavedSems] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  const normalizeSubjects = (items = []) =>
    items.map(s => {
      const normalizedGrade = normalizeGrade(s.grade);
      return {
        ...s,
        grade: normalizedGrade,
        credits: isNonCreditGrade(normalizedGrade) ? 0 : (Number(s.credits) || 0)
      };
    });

  const getDefaultSubjects = useCallback((sem) => {
    const branchDefaults = getBranchSemesterSubjects(user?.branch, sem);
    const defaults = branchDefaults.length > 0 ? branchDefaults : (JNTUK_R20_SUBJECTS[sem] || []);
    return defaults.map(s => ({ name: s.name, grade: 'A', credits: s.credits }));
  }, [user?.branch]);

  const loadSavedData = useCallback(async () => {
    try {
      const res = await API.get('/semesters');
      const map = {};
      res.data.semesters.forEach(s => { map[s.semesterName] = s; });
      setSavedSems(map);
      if (map[activeSem]) setSubjects(normalizeSubjects(map[activeSem].subjects));
      else setSubjects(getDefaultSubjects(activeSem));
    } catch (e) {
      setSubjects(getDefaultSubjects(activeSem));
    }
  }, [activeSem, getDefaultSubjects]);

  useEffect(() => { loadSavedData(); }, [loadSavedData]);

  const switchSem = (sem) => {
    setActiveSem(sem);
    if (savedSems[sem]) setSubjects(normalizeSubjects(savedSems[sem].subjects));
    else setSubjects(getDefaultSubjects(sem));
  };

  const updateSubject = (idx, field, value) => {
    setSubjects(prev => prev.map((s, i) => {
      if (i !== idx) return s;
      if (field === 'grade') {
        const normalizedGrade = normalizeGrade(value);
        if (isNonCreditGrade(normalizedGrade)) {
          return { ...s, grade: normalizedGrade, credits: 0 };
        }
        return { ...s, grade: normalizedGrade };
      }
      if (field === 'credits') {
        return { ...s, credits: parseFloat(value) || 0 };
      }
      return { ...s, [field]: value };
    }));
  };

  const addSubject = () => {
    setSubjects(prev => [...prev, { name: 'New Subject', grade: 'A', credits: 3 }]);
  };

  const removeSubject = (idx) => {
    setSubjects(prev => prev.filter((_, i) => i !== idx));
  };

  const saveSemester = async () => {
    if (!user?.branch) {
      window.alert('Please select your branch in profile before saving semester details.');
      navigate('/profile');
      return;
    }
    if (subjects.length === 0) return showToast('Add at least one subject', 'error');
    setSaving(true);
    try {
      const normalizedSubjects = normalizeSubjects(subjects);
      const res = await API.post('/semesters', { semesterName: activeSem, subjects: normalizedSubjects });
      setSavedSems(prev => ({ ...prev, [activeSem]: res.data }));
      showToast(`${activeSem} Sem saved successfully!`);
    } catch (e) {
      showToast('Failed to save. Try again.', 'error');
    } finally { setSaving(false); }
  };

  const deleteSemester = async () => {
    if (!savedSems[activeSem]) return;
    if (!window.confirm(`Delete ${activeSem} Sem data?`)) return;
    try {
      await API.delete(`/semesters/${activeSem}`);
      const updated = { ...savedSems };
      delete updated[activeSem];
      setSavedSems(updated);
      setSubjects(getDefaultSubjects(activeSem));
      showToast(`${activeSem} Sem deleted`);
    } catch (e) {
      showToast('Delete failed', 'error');
    }
  };

  const result = calculateSGPA(subjects);

  return (
    <div className="calculator-page">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header">
        <h1>Grade Calculator</h1>
        <p>Enter your subject grades to calculate SGPA</p>
      </div>

      <div className="sem-tabs">
        {SEMESTER_LIST.map(sem => (
          <button key={sem} className={`sem-tab ${activeSem === sem ? 'active' : ''} ${savedSems[sem] ? 'filled' : ''}`}
            onClick={() => switchSem(sem)}>
            {sem} Sem {savedSems[sem] ? '✓' : ''}
          </button>
        ))}
      </div>

      <div className="card card-sm" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>Before You Calculate</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          Kindly modify the subject names, grades, and credits as per your results.
        </p>
      </div>

      <div className="card">
        <div className="calc-semester-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 18 }}>{activeSem} Sem — {SEMESTER_LABELS[activeSem]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
              {savedSems[activeSem] ? '✓ Saved' : 'Not saved yet'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {savedSems[activeSem] && (
              <button className="btn btn-danger btn-sm" onClick={deleteSemester}>Delete</button>
            )}
          </div>
        </div>

        <div className="table-mobile-hint">Swipe left/right to view all columns</div>
        <div className="table-scroll calculator-table-scroll">
          <table className="subject-table calculator-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
                <th>Grade Points</th>
                <th>Credits</th>
                <th>Weighted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, idx) => {
                const gp = getGradePoint(sub.grade);
                const isNonCredit = isNonCreditGrade(sub.grade);
                return (
                  <tr key={idx}>
                    <td data-label="Subject">
                      <input className="subject-name-input" value={sub.name}
                        onChange={e => updateSubject(idx, 'name', e.target.value)} />
                    </td>
                    <td data-label="Grade">
                        <select className="grade-select" value={sub.grade}
                          onChange={e => updateSubject(idx, 'grade', e.target.value)}
                          style={{ color: getGradeColor(sub.grade) }}>
                        {GRADES.map(g => <option key={g} value={g}>{getGradeLabel(g)}</option>)}
                       </select>
                    </td>
                    <td data-label="Grade Points">
                      <span className="grade-badge" style={{ color: getGradeColor(sub.grade) }}>
                        {gp}
                      </span>
                    </td>
                    <td data-label="Credits">
                      <input className="credits-input" type="number" value={sub.credits}
                        min="0" max="10" step="0.5"
                        disabled={isNonCredit}
                        onChange={e => updateSubject(idx, 'credits', e.target.value)} />
                    </td>
                    <td data-label="Weighted" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                      {(gp * sub.credits).toFixed(1)}
                    </td>
                    <td data-label="Action">
                      <button className="calc-remove-btn" onClick={() => removeSubject(idx)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16, padding: '4px 8px' }}>
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button className="add-subject-btn" onClick={addSubject}>
          + Add Subject
        </button>

        <div className="result-section">
          <div className="result-item">
            <div className="result-label">SGPA</div>
            <div className="result-value" style={{ color: result.sgpa >= 7.5 ? 'var(--success)' : result.sgpa >= 5 ? 'var(--warning)' : 'var(--danger)' }}>
              {result.sgpa || '—'}
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Percentage</div>
            <div className="result-value" style={{ color: 'var(--secondary)' }}>
              {result.sgpa > 0 ? `${result.percentage}%` : '—'}
            </div>
          </div>
          <div className="result-item">
            <div className="result-label">Total Credits</div>
            <div className="result-value" style={{ color: 'var(--text)' }}>{result.totalCredits}</div>
          </div>
          <div className="result-item">
            <div className="result-label">Backlogs</div>
            <div className="result-value" style={{ color: result.backlogs > 0 ? 'var(--danger)' : 'var(--success)' }}>
              {result.backlogs}
            </div>
          </div>
        </div>

        <div className="actions-row">
          <button className="btn btn-primary" onClick={saveSemester} disabled={saving} style={{ minWidth: 120 }}>
            {saving ? 'Saving...' : '💾 Save Semester'}
          </button>
        </div>
      </div>

      {/* Grade reference */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 16 }}>JNTUK R20 Grade Reference</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[['A+', 10, '>= 90'], ['A', 9, '80-89'], ['B', 8, '70-79'], ['C', 7, '60-69'], ['D', 6, '50-59'], ['E', 5, '40-49'], ['F', 0, '< 40'], ['AB', 0, 'Absent'], ['NC-C', 0, 'Completed'], ['NC-NC', 0, 'Not Completed']].map(([g, gp, range]) => (
            <div key={g} style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px', textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: getGradeColor(g) }}>{getGradeLabel(g)}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14 }}>{gp}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{range}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

