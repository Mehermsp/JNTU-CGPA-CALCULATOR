const express = require('express');
const Semester = require('../models/Semester');
const auth = require('../middleware/auth');

const router = express.Router();

const GRADE_POINTS = {
  'A+': 10,
  'A': 9,
  'B': 8,
  'C': 7,
  'D': 6,
  'E': 5,
  'F': 0,
  'AB': 0
};

const normalizeGrade = (grade) => {
  const token = String(grade || '').trim().toUpperCase();
  if (token === 'AB') return 'AB';
  if (token === 'O') return 'A+';
  if (token === 'B+') return 'C';
  return token;
};

const SEMESTER_ORDER = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];

const calculateSemesterMetrics = (subjects = []) => {
  let totalWeightedPoints = 0;
  let totalCredits = 0;
  let totalBacklogs = 0;

  subjects.forEach(subject => {
    const normalizedGrade = normalizeGrade(subject.grade);
    const gradePoint = GRADE_POINTS[normalizedGrade] || 0;
    const credits = Number(subject.credits) || 0;

    totalWeightedPoints += gradePoint * credits;
    totalCredits += credits;
    if (normalizedGrade === 'F' || normalizedGrade === 'AB') {
      totalBacklogs++;
    }
  });

  const sgpa = totalCredits > 0 ? parseFloat((totalWeightedPoints / totalCredits).toFixed(2)) : 0;
  const percentage = parseFloat(((sgpa - 0.75) * 10).toFixed(2));

  return { sgpa, percentage, totalCredits, totalBacklogs, totalWeightedPoints };
};

// Get all semesters for user + CGPA
router.get('/', auth, async (req, res) => {
  try {
    const semesters = await Semester.find({ userId: req.userId })
      .sort({ semesterName: 1 });

    // Sort by semester order
    const sorted = semesters.sort((a, b) =>
      SEMESTER_ORDER.indexOf(a.semesterName) - SEMESTER_ORDER.indexOf(b.semesterName)
    );

    const normalizedSemesters = sorted.map(sem => {
      const metrics = calculateSemesterMetrics(sem.subjects);
      const semJson = sem.toObject();
      return {
        ...semJson,
        sgpa: metrics.sgpa,
        percentage: metrics.percentage,
        totalCredits: metrics.totalCredits,
        totalBacklogs: metrics.totalBacklogs
      };
    });

    // Calculate CGPA
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    let totalBacklogs = 0;

    normalizedSemesters.forEach(sem => {
      const metrics = calculateSemesterMetrics(sem.subjects);
      totalWeightedPoints += metrics.totalWeightedPoints;
      totalCredits += metrics.totalCredits;
      totalBacklogs += metrics.totalBacklogs;
    });

    const cgpa = totalCredits > 0 ? parseFloat((totalWeightedPoints / totalCredits).toFixed(2)) : 0;
    const cgpaPercentage = parseFloat(((cgpa - 0.75) * 10).toFixed(2));

    // Class determination
    let classAwarded = '';
    if (totalBacklogs === 0) {
      if (cgpa >= 7.5) classAwarded = 'First Class with Distinction';
      else if (cgpa >= 6.5) classAwarded = 'First Class';
      else if (cgpa >= 5.5) classAwarded = 'Second Class';
      else if (cgpa >= 5.0) classAwarded = 'Pass Class';
      else classAwarded = 'Fail';
    } else {
      classAwarded = 'Has Backlogs';
    }

    res.json({
      semesters: normalizedSemesters,
      cgpa,
      cgpaPercentage,
      totalCredits,
      totalBacklogs,
      classAwarded
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single semester
router.get('/:semName', auth, async (req, res) => {
  try {
    const semester = await Semester.findOne({
      userId: req.userId,
      semesterName: req.params.semName
    });
    if (!semester) return res.status(404).json({ error: 'Semester not found' });
    const metrics = calculateSemesterMetrics(semester.subjects);
    const semesterWithMetrics = {
      ...semester.toObject(),
      sgpa: metrics.sgpa,
      percentage: metrics.percentage,
      totalCredits: metrics.totalCredits,
      totalBacklogs: metrics.totalBacklogs
    };
    res.json(semesterWithMetrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or Update semester
router.post('/', auth, async (req, res) => {
  try {
    const { semesterName, subjects } = req.body;
    if (!semesterName || !subjects) {
      return res.status(400).json({ error: 'semesterName and subjects are required' });
    }

    let semester = await Semester.findOne({ userId: req.userId, semesterName });

    if (semester) {
      semester.subjects = subjects;
      await semester.save();
      return res.json(semester);
    }

    semester = new Semester({ userId: req.userId, semesterName, subjects });
    await semester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete semester
router.delete('/:semName', auth, async (req, res) => {
  try {
    const semester = await Semester.findOneAndDelete({
      userId: req.userId,
      semesterName: req.params.semName
    });
    if (!semester) return res.status(404).json({ error: 'Semester not found' });
    res.json({ message: 'Semester deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
