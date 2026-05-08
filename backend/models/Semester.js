const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'AB', 'O', 'B+', 'Ab'],
    required: true
  },
  credits: { type: Number, required: true, min: 0, max: 6 },
  isBacklog: { type: Boolean, default: false }
});

const semesterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  semesterName: {
    type: String,
    required: true,
    enum: ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2']
  },
  subjects: [subjectSchema],
  sgpa: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  totalCredits: { type: Number, default: 0 },
  totalBacklogs: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// JNTUK R20 Grade Points
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

semesterSchema.pre('save', function(next) {
  this.updatedAt = new Date();

  if (this.subjects && this.subjects.length > 0) {
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    let totalBacklogs = 0;

    this.subjects.forEach(subject => {
      const normalizedGrade = normalizeGrade(subject.grade);
      const gradePoint = GRADE_POINTS[normalizedGrade] || 0;
      const credits = Number(subject.credits) || 0;

      if (normalizedGrade === 'F' || normalizedGrade === 'AB') {
        subject.isBacklog = true;
        totalBacklogs++;
      } else {
        subject.isBacklog = false;
      }

      totalWeightedPoints += gradePoint * credits;
      totalCredits += credits;
    });

    this.totalCredits = totalCredits;
    this.totalBacklogs = totalBacklogs;
    this.sgpa = totalCredits > 0 ? parseFloat((totalWeightedPoints / totalCredits).toFixed(2)) : 0;
    // JNTUK percentage formula
    this.percentage = parseFloat(((this.sgpa - 0.75) * 10).toFixed(2));
  }

  next();
});

module.exports = mongoose.model('Semester', semesterSchema);
