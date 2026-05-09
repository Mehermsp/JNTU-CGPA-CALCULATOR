export const SEMESTER_TO_LABEL = {
  "1-1": "I Year I Semester",
  "1-2": "I Year II Semester",
  "2-1": "II Year I Semester",
  "2-2": "II Year II Semester",
  "3-1": "III Year I Semester",
  "3-2": "III Year II Semester",
  "4-1": "IV Year I Semester",
  "4-2": "IV Year II Semester"
};

const BRANCH_SUBJECTS_BY_LABEL = {
  CSE: {
    "I Year I Semester": [
      "Communicative English",
      "Mathematics - I (Calculus And Differential Equations)",
      "Applied Physics",
      "Programming for Problem Solving using C",
      "Computer Engineering Workshop",
      "English Communication Skills Laboratory",
      "Applied Physics Lab",
      "Programming for Problem Solving using C Lab"
    ],
    "I Year II Semester": [
      "Mathematics - II (Linear Algebra And Numerical Methods)",
      "Applied Chemistry",
      "Computer Organization",
      "Python Programming",
      "Data Structures",
      "Applied Chemistry Lab",
      "Python Programming Lab",
      "Data Structures Lab",
      "Environment Science"
    ],
    "II Year I Semester": [
      "Mathematics III",
      "Object Oriented Programming through C++",
      "Operating Systems",
      "Software Engineering",
      "Mathematical Foundations of Computer Science",
      "Object Oriented Programming through C++ Lab",
      "Operating Systems Lab",
      "Software Engineering Lab",
      "Skill Oriented Course - I",
      "Constitution of India"
    ],
    "II Year II Semester": [
      "Probability and Statistics",
      "Database Management Systems",
      "Formal Languages and Automata Theory",
      "Java Programming",
      "Managerial Economics and Financial Accountancy",
      "Database Management Systems Lab",
      "R Programming Lab",
      "Java Programming Lab",
      "Skill Oriented Course - II"
    ],
    "III Year I Semester": [
      "Computer Networks",
      "Design and Analysis of Algorithms",
      "Data Warehousing and Data Mining",
      "Open Elective-I",
      "Professional Elective-I",
      "Data Warehousing and Data Mining Lab",
      "Computer Networks Lab",
      "Skill Oriented Course - III",
      "Employability Skills-I",
      "Summer Internship 2 Months"
    ],
    "III Year II Semester": [
      "Machine Learning",
      "Compiler Design",
      "Cryptography and Network Security",
      "Professional Elective-II",
      "Open Elective-II",
      "Machine Learning using Python Lab",
      "Compiler Design Lab",
      "Cryptography and Network Security Lab",
      "Skill Oriented Course - IV",
      "Employability Skills-II"
    ],
    "IV Year I Semester": [
      "Professional Elective-III",
      "Professional Elective-IV",
      "Professional Elective-V",
      "Open Elective-III",
      "Open Elective-IV",
      "Universal Human Values 2: Understanding Harmony",
      "Skill Oriented Course",
      "Industrial/Research Internship 2 Months"
    ],
    "IV Year II Semester": [
      "Major Project Work, Seminar Internship"
    ]
  },
  "CSE-AI&ML": {
    "I Year I Semester": [
      "Communicative English",
      "Mathematics - I",
      "Applied Chemistry",
      "Programming for Problem Solving using C",
      "Computer Engineering Workshop",
      "English Communication Skills Laboratory",
      "Applied Chemistry Lab",
      "Programming for Problem Solving using C Lab",
      "Environmental Science"
    ],
    "I Year II Semester": [
      "Mathematics - II",
      "Applied Physics",
      "Digital Logic Design",
      "Python Programming",
      "Data Structures",
      "Applied Physics Lab",
      "Python Programming Lab",
      "Data Structures Lab",
      "Constitution of India"
    ],
    "II Year I Semester": [
      "Mathematics III",
      "Mathematical Foundations of Computer Science",
      "Introduction to Artificial Intelligence and Machine Learning",
      "Object Oriented Programming with Java",
      "Database Management Systems",
      "Introduction to Artificial Intelligence and Machine Learning Lab",
      "Object Oriented Programming with Java Lab",
      "Database Management Systems Lab",
      "Mobile App Development",
      "Essence of Indian Traditional Knowledge"
    ],
    "II Year II Semester": [
      "Probability and Statistics",
      "Computer Organization",
      "Data Warehousing and Mining",
      "Formal Languages and Automata Theory",
      "Managerial Economics and Financial Accountancy",
      "R Programming Lab",
      "Data Mining using Python Lab",
      "Web Application Development Lab",
      "Natural Language Processing with Python"
    ],
    "III Year I Semester": [
      "Compiler Design",
      "Operating Systems",
      "Machine Learning",
      "Open Elective-I",
      "Professional Elective-I",
      "Operating Systems & Compiler Design Lab",
      "Machine Learning Lab",
      "Skill Oriented Course - III",
      "Employability Skills-I",
      "Summer Internship 2 Months"
    ],
    "III Year II Semester": [
      "Computer Networks",
      "Deep Learning",
      "Design and Analysis of Algorithms",
      "Professional Elective-II",
      "Open Elective-II",
      "Computer Networks Lab",
      "Algorithms for Efficient Coding Lab",
      "Deep Learning with Tensorflow",
      "Skill Oriented Course - IV",
      "Employability Skills-II"
    ],
    "IV Year I Semester": [
      "Professional Elective-III",
      "Professional Elective-IV",
      "Professional Elective-V",
      "Open Elective-III",
      "Open Elective-IV",
      "Universal Human Values 2: Understanding Harmony",
      "Skill Oriented Course",
      "Industrial/Research Internship 2 Months"
    ],
    "IV Year II Semester": [
      "Major Project Work, Seminar, Internship"
    ]
  },
  "CSE-DS": {
    "I Year I Semester": [
      "Communicative English",
      "Mathematics - I",
      "Applied Chemistry",
      "Programming for Problem Solving using C",
      "Computer Engineering Workshop",
      "English Communication Skills Laboratory",
      "Applied Chemistry Lab",
      "Programming for Problem Solving using C Lab",
      "Environmental Science"
    ],
    "I Year II Semester": [
      "Mathematics - II",
      "Applied Physics",
      "Digital Logic Design",
      "Python Programming",
      "Data Structures",
      "Applied Physics Lab",
      "Python Programming Lab",
      "Data Structures Lab",
      "Constitution of India"
    ],
    "II Year I Semester": [
      "Mathematics III",
      "Mathematical Foundations of Computer Science",
      "Fundamentals of Data Science",
      "Object Oriented Programming with Java",
      "Database Management Systems",
      "Fundamentals of Data Science Lab",
      "Object Oriented Programming with Java Lab",
      "Database Management Systems Lab",
      "Mobile App Development",
      "Essence of Indian Traditional Knowledge"
    ],
    "II Year II Semester": [
      "Probability and Statistics",
      "Computer Organization",
      "Data Warehousing and Mining",
      "Formal Languages and Automata Theory",
      "Managerial Economics and Financial Accountancy",
      "R Programming Lab",
      "Data Mining using Python Lab",
      "Web Application Development Lab",
      "MongoDB"
    ],
    "III Year I Semester": [
      "Compiler Design",
      "Operating Systems",
      "Machine Learning",
      "Open Elective-I",
      "Professional Elective-I",
      "Operating Systems & Compiler Design Lab",
      "Machine Learning Lab",
      "Skill Oriented Course - III",
      "Employability Skills-I",
      "Summer Internship 2 Months"
    ],
    "III Year II Semester": [
      "Computer Networks",
      "Big Data Analytics",
      "Design and Analysis of Algorithms",
      "Professional Elective-II",
      "Open Elective-II",
      "Computer Networks Lab",
      "Big Data Analytics Lab",
      "Deep Learning with Tensorflow",
      "Skill Oriented Course - IV",
      "Employability Skills-II"
    ],
    "IV Year I Semester": [
      "Professional Elective-III",
      "Professional Elective-IV",
      "Professional Elective-V",
      "Open Elective-III",
      "Open Elective-IV",
      "Universal Human Values 2: Understanding Harmony",
      "Skill Oriented Course",
      "Industrial/Research Internship 2 Months"
    ],
    "IV Year II Semester": [
      "Major Project Work, Seminar Internship"
    ]
  },
  ECE: {
    "I Year I Semester": [
      "Communicative English",
      "Mathematics - I (Calculus)",
      "Applied Chemistry",
      "Programming for Problem Solving Using C",
      "Engineering Drawing",
      "English Communication Skills Laboratory",
      "Applied Chemistry Lab",
      "Programming for Problem Solving Using C Lab"
    ],
    "I Year II Semester": [
      "Mathematics - II (Linear Algebra and Numerical Methods)",
      "Applied Physics",
      "Object Oriented Programming through Java",
      "Network Analysis",
      "Basic Electrical Engineering",
      "Electronic workshop Lab",
      "Basic Electrical Engineering Lab",
      "Applied Physics Lab",
      "Environmental Science"
    ],
    "II Year I Semester": [
      "Electronic Devices and Circuits",
      "Switching Theory and Logic Design",
      "Signals and Systems",
      "Mathematics-III (Transforms and Vector Calculus)",
      "Random Variables and Stochastic Processes",
      "OOPS through Java Lab",
      "Electronic Devices and Circuits -Lab",
      "Switching Theory and Logic Design-Lab",
      "Python Programming"
    ],
    "II Year II Semester": [
      "Electronic Circuit Analysis",
      "Digital IC Design",
      "Analog Communications",
      "Linear control Systems",
      "Management and Organizational Behavior",
      "Electronic Circuit Analysis Lab",
      "Analog Communications Lab",
      "Digital IC Design Lab",
      "Soft Skills",
      "Constitution of India"
    ],
    "III Year I Semester": [
      "Analog ICs and Applications",
      "Electromagnetic Waves and Transmission Lines",
      "Digital Communications",
      "Open Elective Course/Job oriented elective-1",
      "Professional Elective courses -1",
      "Analog ICs and Applications LAB",
      "Digital Communications Lab",
      "Data Structures using Java Lab",
      "Indian Traditional Knowledge",
      "Summer Internship 2 Months"
    ],
    "III Year II Semester": [
      "Microprocessor and Microcontrollers",
      "VLSI Design",
      "Digital Signal Processing",
      "Professional Elective courses - 2",
      "Open Elective Course/Job oriented elective -2",
      "Microprocessor and Microcontrollers - Lab",
      "VLSI Design Lab",
      "Digital Signal Processing Lab",
      "ARM based/ Aurdino based Programming",
      "Research Methodology"
    ],
    "IV Year I Semester": [
      "Professional Elective courses -3",
      "Professional Elective courses -4",
      "Professional Elective courses -5",
      "Open Elective Courses/ Job oriented elective -3",
      "Open Elective Courses/ Job oriented elective -4",
      "Humanities and Social Science Elective",
      "Designer tools (HFSS, Microwave Studio CST. Cadence Virtuoso. Synopsys, Mentor Graphics, Xilinx.)",
      "Industrial/Research Internship 2 Months"
    ],
    "IV Year II Semester": [
      "Project work, seminar and internship in industry"
    ]
  },
  EEE: {
    "I Year I Semester": [
      "Communicative English",
      "Mathematics-I (Calculus and Differential Equations)",
      "Mathematics-II (Linear Algebra and Numerical Methods)",
      "Programming for Problem Solving Using C",
      "Engineering Drawing & Design",
      "English Communication Skills Laboratory",
      "Electrical Engineering Workshop",
      "Programming for Problem Solving Using C Lab"
    ],
    "I Year II Semester": [
      "Mathematics-III (Vector Calculus, Transforms and PDE)",
      "Applied Physics",
      "Data Structures Through C",
      "Electrical Circuit Analysis -I",
      "Basic Civil and Mechanical Engineering",
      "Applied Physics Lab",
      "Basic Civil and Mechanical Engineering Lab",
      "Data Structures through C Lab",
      "Constitution of India"
    ],
    "II Year I Semester": [
      "Mathematics - IV",
      "Electronic Devices and Circuits",
      "Electrical Circuit Analysis -II",
      "DC Machines and Transformers",
      "Electro Magnetic Fields",
      "Electrical Circuits Lab",
      "DC Machines and Transformers Lab",
      "Electronic Devices and Circuits lab",
      "Design of Electrical Circuits using Engineering Software Tools",
      "Professional Ethics & Human Values"
    ],
    "II Year II Semester": [
      "Python Programming",
      "Digital Electronics",
      "Power System-I",
      "Induction and Synchronous Machines",
      "Managerial Economics & Financial Analysis",
      "Python Programming Lab",
      "Induction and Synchronous Machines Lab",
      "Digital Electronics Lab",
      "IoT Applications of Electrical Engineering"
    ],
    "III Year I Semester": [
      "Power Systems-II",
      "Power Electronics",
      "Control Systems",
      "Open Elective -I / Job Oriented Elective-I",
      "Professional Elective - I",
      "Control Systems Lab",
      "Power Electronics Lab",
      "Employability Skills",
      "Environmental Science",
      "Summer Internship 2 Months"
    ],
    "III Year II Semester": [
      "Microprocessors and Microcontrollers",
      "Electrical Measurements and Instrumentation",
      "Power System Analysis",
      "Professional Elective - II",
      "Open Elective -II / Job Oriented Elective-II",
      "Electrical Measurements and Instrumentation Lab",
      "Microprocessors and Microcontrollers Lab",
      "Power Systems and Simulation Lab",
      "Machine Learning with Python",
      "Research Methodology"
    ],
    "IV Year I Semester": [
      "Professional Elective - III",
      "Professional Elective - IV",
      "Professional Elective - V",
      "Open Elective- III /Job Oriented Elective-III",
      "Open Elective-IV /Job Oriented Elective-IV",
      "Universal Human Values-2: Understanding Harmony",
      "Machine Learning with Python Lab",
      "Industrial / Research Internship 2 Months"
    ],
    "IV Year II Semester": [
      "Project work, seminar and internship in industry (6 Months)"
    ]
  },
  MECH: {
    "I Year I Semester": [
      "Calculus & Differential Equations (M-I)",
      "Engineering Physics",
      "Programming for Problem Solving",
      "Communicative English",
      "Engineering Drawing",
      "Engineering Physics Lab",
      "Programming for Problem Solving Using C Laboratory",
      "English Communication Skills Laboratory",
      "Environmental Science"
    ],
    "I Year II Semester": [
      "Linear Algebra & Numerical Methods (M-II)",
      "Engineering Chemistry",
      "Engineering Mechanics",
      "Basic Electrical & Electronics Engineering",
      "Thermodynamics",
      "Workshop Practice Lab",
      "Engineering Chemistry Laboratory",
      "Basic Electrical & Electronics Engineering Lab",
      "Constitution of India"
    ],
    "II Year I Semester": [
      "Vector Calculus, Fourier Transforms and PDE (M-III)",
      "Mechanics of Solids",
      "Fluid Mechanics & Hydraulic Machines",
      "Production Technology",
      "Kinematics of Machinery",
      "Computer Aided Engineering Drawing Practice",
      "Fluid Mechanics & Hydraulic Machines Lab",
      "Production Technology Lab",
      "Drafting and Modeling Lab",
      "Essence of Indian Traditional Knowledge"
    ],
    "II Year II Semester": [
      "Material Science & Metallurgy",
      "Complex Variables and Statistical Methods",
      "Dynamics of Machinery",
      "Thermal Engineering-I",
      "Industrial Engineering and Management",
      "Mechanics of Solids and Metallurgy Lab",
      "Machine Drawing Practice",
      "Theory of Machines Lab",
      "Python Programming Lab"
    ],
    "III Year I Semester": [
      "Thermal Engineering-II",
      "Design of Machine Members-I",
      "Machining, Machine Tools & Metrology",
      "Open Elective -I",
      "Professional Elective - I",
      "Machine Tools Lab",
      "Thermal Engineering Lab",
      "Advanced Communication Skills Lab",
      "Professional Ethics and Human Values",
      "Summer Internship"
    ],
    "III Year II Semester": [
      "Heat Transfer",
      "Design of Machine Members-II",
      "Introduction to Artificial Intelligence and Machine Learning",
      "Professional Elective - II",
      "Open Elective - II",
      "Heat Transfer Lab",
      "CAE & CAM Lab",
      "Measurements & Metrology Lab",
      "Artificial Intelligence and Machine Learning Lab",
      "Research Methodology and IPR"
    ],
    "IV Year I Semester": [
      "Professional Elective - III",
      "Professional Elective - IV",
      "Professional Elective - V",
      "Open Elective - III",
      "Open Elective - IV",
      "Universal Human Values: Understanding Harmony",
      "Mechatronics Lab",
      "Summer Internship"
    ],
    "IV Year II Semester": [
      "Project work"
    ]
  }
};

const BRANCH_ALIASES = {
  AIML: "CSE-AI&ML",
  "CSE-AIML": "CSE-AI&ML",
  "AI&ML": "CSE-AI&ML",
  DS: "CSE-DS",
  "DATA SCIENCE": "CSE-DS",
  CS: "CSE",
  "COMPUTER SCIENCE": "CSE"
};

export const BRANCH_OPTIONS = [
  "CSE",
  "CSE-AI&ML",
  "CSE-DS",
  "ECE",
  "EEE",
  "MECH"
];

const canonicalizeBranch = (branch = "") => {
  const token = String(branch || "").trim();
  if (!token) return "";
  if (BRANCH_SUBJECTS_BY_LABEL[token]) return token;
  const upper = token.toUpperCase();
  return BRANCH_ALIASES[upper] || upper;
};

const LAB_PATTERN = /(?:\blab\b|laboratory|workshop|practice|studio|tools|drafting|modeling)/i;
const PROJECT_PATTERN = /major project|project work|project/i;
const INTERNSHIP_PATTERN = /internship/i;
const SEMINAR_PATTERN = /seminar|viva/i;
const VALUE_ADD_PATTERN = /(?:skill|constitution|environment|ethics|human values|traditional knowledge|research methodology|ipr|soft skills|employability)/i;

const estimateCredits = (subjectName = "") => {
  const name = String(subjectName || "").trim();
  if (!name) return 3;
  if (PROJECT_PATTERN.test(name)) return 6;
  if (INTERNSHIP_PATTERN.test(name)) return 2;
  if (SEMINAR_PATTERN.test(name)) return 2;
  if (LAB_PATTERN.test(name)) return 1.5;
  if (VALUE_ADD_PATTERN.test(name)) return 2;
  return 3;
};

export const getBranchSemesterSubjects = (branch, semester) => {
  const canonicalBranch = canonicalizeBranch(branch);
  const semesterLabel = SEMESTER_TO_LABEL[semester];
  if (!canonicalBranch || !semesterLabel) return [];

  const subjectNames = BRANCH_SUBJECTS_BY_LABEL[canonicalBranch]?.[semesterLabel] || [];
  return subjectNames.map((name) => ({ name, credits: estimateCredits(name) }));
};

