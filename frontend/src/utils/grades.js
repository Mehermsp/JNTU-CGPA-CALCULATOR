export const GRADE_POINTS = {
    "A+": 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
    F: 0,
    AB: 0,
    "NC-C": 0,
    "NC-NC": 0,
};

export const GRADES = ["A+", "A", "B", "C", "D", "E", "F", "AB", "NC-C", "NC-NC"];
export const BACKLOG_GRADES = ["F", "AB"];
export const NON_CREDIT_GRADES = ["NC-C", "NC-NC"];

export const GRADE_LABELS = {
    "A+": "A+",
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    AB: "AB",
    "NC-C": "Completed (Non-credit)",
    "NC-NC": "Not Completed (Non-credit)",
};

export const SEMESTER_LIST = [
    "1-1",
    "1-2",
    "2-1",
    "2-2",
    "3-1",
    "3-2",
    "4-1",
    "4-2",
];

export const SEMESTER_LABELS = {
    "1-1": "1st Year 1st Sem",
    "1-2": "1st Year 2nd Sem",
    "2-1": "2nd Year 1st Sem",
    "2-2": "2nd Year 2nd Sem",
    "3-1": "3rd Year 1st Sem",
    "3-2": "3rd Year 2nd Sem",
    "4-1": "4th Year 1st Sem",
    "4-2": "4th Year 2nd Sem",
};

export const JNTUK_R20_SUBJECTS = {
    "1-1": [
        { name: "English for Communication", credits: 3 },
        { name: "Applied Mathematics-I", credits: 4 },
        { name: "Applied Physics", credits: 3 },
        { name: "Problem Solving Using C", credits: 3 },
        { name: "Engineering Drawing", credits: 3 },
        { name: "Applied Physics Lab", credits: 1.5 },
        { name: "C Programming Lab", credits: 1.5 },
    ],
    "1-2": [
        { name: "Communicative English", credits: 3 },
        { name: "Applied Mathematics-II", credits: 4 },
        { name: "Applied Chemistry", credits: 3 },
        { name: "Basic Electrical Engineering", credits: 3 },
        { name: "Engineering Workshop / IT Workshop", credits: 2 },
        { name: "Applied Chemistry Lab", credits: 1.5 },
        { name: "BEE Lab / IT Workshop Lab", credits: 1.5 },
    ],
    "2-1": [
        { name: "Data Structures", credits: 3 },
        { name: "Computer Organization", credits: 3 },
        { name: "Discrete Mathematics", credits: 3 },
        { name: "Operating Systems", credits: 3 },
        { name: "Java Programming", credits: 3 },
        { name: "Data Structures Lab", credits: 1.5 },
        { name: "Java Programming Lab", credits: 1.5 },
    ],
    "2-2": [
        { name: "Database Management Systems", credits: 3 },
        { name: "Design & Analysis of Algorithms", credits: 3 },
        { name: "Computer Networks", credits: 3 },
        { name: "Software Engineering", credits: 3 },
        { name: "Formal Languages & Automata Theory", credits: 3 },
        { name: "DBMS Lab", credits: 1.5 },
        { name: "CN Lab", credits: 1.5 },
    ],
    "3-1": [
        { name: "Web Technologies", credits: 3 },
        { name: "Machine Learning", credits: 3 },
        { name: "Big Data Analytics", credits: 3 },
        { name: "Professional Elective-I", credits: 3 },
        { name: "Open Elective-I", credits: 3 },
        { name: "Web Technologies Lab", credits: 1.5 },
        { name: "ML Lab", credits: 1.5 },
    ],
    "3-2": [
        { name: "Compiler Design", credits: 3 },
        { name: "Information Security", credits: 3 },
        { name: "Professional Elective-II", credits: 3 },
        { name: "Open Elective-II", credits: 3 },
        { name: "Compiler Design Lab", credits: 1.5 },
        { name: "IS Lab", credits: 1.5 },
        { name: "Mini Project", credits: 2 },
    ],
    "4-1": [
        { name: "Professional Elective-III", credits: 3 },
        { name: "Professional Elective-IV", credits: 3 },
        { name: "Professional Elective-V", credits: 3 },
        { name: "Open Elective-III", credits: 3 },
        { name: "Open Elective-IV", credits: 3 },
        { name: "Universal Human Values", credits: 3 },
        { name: "Skill Advanced Course", credits: 2 },
        { name: "Industrial/Research Internship", credits: 3 },
    ],
    "4-2": [
        { name: "Project Work", credits: 8 },
        { name: "Seminar", credits: 2 },
        { name: "Comprehensive Viva Voce", credits: 2 },
    ],
};

export const calculateSGPA = (subjects) => {
    let totalWeighted = 0;
    let totalCredits = 0;
    let backlogs = 0;

    subjects.forEach((s) => {
        const gp = getGradePoint(s.grade);
        const credits = Number(s.credits) || 0;
        totalWeighted += gp * credits;
        totalCredits += credits;

        if (isBacklogGrade(s.grade)) {
            backlogs++;
        }
    });

    const sgpa =
        totalCredits > 0
            ? parseFloat((totalWeighted / totalCredits).toFixed(2))
            : 0;
    const percentage = parseFloat(((sgpa - 0.75) * 10).toFixed(2));
    return { sgpa, percentage, totalCredits, backlogs };
};

export const calculateCGPA = (semesters) => {
    let totalWeighted = 0;
    let totalCredits = 0;
    let totalBacklogs = 0;

    semesters.forEach((sem) => {
        sem.subjects.forEach((s) => {
            const gp = getGradePoint(s.grade);
            const credits = Number(s.credits) || 0;
            totalWeighted += gp * credits;
            totalCredits += credits;

            if (isBacklogGrade(s.grade)) {
                totalBacklogs++;
            }
        });
    });

    const cgpa =
        totalCredits > 0
            ? parseFloat((totalWeighted / totalCredits).toFixed(2))
            : 0;
    const percentage = parseFloat(((cgpa - 0.75) * 10).toFixed(2));

    let classAwarded = "";
    if (totalBacklogs === 0) {
        if (cgpa >= 7.5) classAwarded = "First Class with Distinction";
        else if (cgpa >= 6.5) classAwarded = "First Class";
        else if (cgpa >= 5.5) classAwarded = "Second Class";
        else if (cgpa >= 5.0) classAwarded = "Pass Class";
        else classAwarded = "Fail";
    } else {
        classAwarded = "Has Backlogs";
    }

    return { cgpa, percentage, totalCredits, totalBacklogs, classAwarded };
};

export const getGradeColor = (grade) => {
    const normalized = normalizeGrade(grade);
    const colors = {
        "A+": "#10b981",
        A: "#059669",
        B: "#3b82f6",
        C: "#60a5fa",
        D: "#f59e0b",
        E: "#f97316",
        F: "#ef4444",
        AB: "#6b7280",
        "NC-C": "#22c55e",
        "NC-NC": "#94a3b8",
    };
    return colors[normalized] || "#6b7280";
};

export const normalizeGrade = (grade) => {
    const token = String(grade || "").trim().toUpperCase();
    if (token === "AB") return "AB";
    if (token === "O") return "A+";
    if (token === "B+") return "C";
    if (token === "COMPLETED" || token === "NC-C") return "NC-C";
    if (token === "NOT COMPLETED" || token === "NOT_COMPLETED" || token === "NC-NC") return "NC-NC";
    return token;
};

export const getGradePoint = (grade) =>
    GRADE_POINTS[normalizeGrade(grade)] ?? 0;

export const isBacklogGrade = (grade) =>
    BACKLOG_GRADES.includes(normalizeGrade(grade));

export const isNonCreditGrade = (grade) =>
    NON_CREDIT_GRADES.includes(normalizeGrade(grade));

export const getGradeLabel = (grade) => {
    const normalized = normalizeGrade(grade);
    return GRADE_LABELS[normalized] || normalized;
};

export const getGPColor = (gp) => {
    if (gp >= 9) return "#10b981";
    if (gp >= 7) return "#3b82f6";
    if (gp >= 5) return "#f59e0b";
    return "#ef4444";
};
