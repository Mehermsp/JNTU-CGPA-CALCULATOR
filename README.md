# JNTU CGPA Calculator — MERN Stack

Free, full-featured CGPA & SGPA calculator for JNTUK R20 students. No premium required.

## Features
- 🎓 SGPA calculation per semester (JNTUK R20 formula)
- 📊 CGPA calculation across all 8 semesters
- 📉 Backlog tracking
- 🏆 Class awarded determination (First Class with Distinction, etc.)
- 🎯 CGPA target planner
- 📱 Fully responsive (mobile + desktop)
- 🔐 JWT authentication — each user has private data
- 📈 SGPA trend charts

## Grade System (JNTUK R20)
| Grade | Points | Marks |
|-------|--------|-------|
| O     | 10     | 90-100 |
| A+    | 9      | 80-89 |
| A     | 8      | 70-79 |
| B+    | 7      | 60-69 |
| B     | 6      | 55-59 |
| C     | 5      | 50-54 |
| F     | 0      | Fail  |

**SGPA Formula:** Sum(Grade Points × Credits) / Sum(Credits)  
**Percentage Formula:** (SGPA - 0.5) × 10  
**CGPA:** Weighted average across all semesters

## Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Open Browser
Go to `http://localhost:3000`

## Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jntu_cgpa
JWT_SECRET=your_secret_key_here
```

## Using MongoDB Atlas (Cloud)
1. Create free account at mongodb.com/atlas
2. Create a cluster → get connection string
3. Replace MONGO_URI with: `mongodb+srv://username:password@cluster.mongodb.net/jntu_cgpa`

## Project Structure
```
jntu-cgpa/
├── backend/
│   ├── models/       User.js, Semester.js
│   ├── routes/       auth.js, semesters.js
│   ├── middleware/   auth.js
│   └── server.js
└── frontend/
    └── src/
        ├── context/  AuthContext.js
        ├── pages/    Dashboard, Calculator, SGPA, CGPA, Profile, Login, Register
        ├── utils/    grades.js
        └── components/ Layout.js
```

## Deployment
- Backend: Deploy to Render/Railway/Heroku
- Frontend: Deploy to Vercel/Netlify (set REACT_APP_API_URL)
- Database: MongoDB Atlas (free tier)
