# AI Blog - MERN + Google Gemini AI

A full-stack blog platform where you can write blogs manually or generate them with Google Gemini AI.

## Features
- JWT Authentication (Register / Login)
- AI Blog Generation via Google Gemini
- Full CRUD for blogs (Create, Read, Update, Delete)
- Category filter + Pagination
- Dashboard for your own blogs
- Fully Responsive (Mobile + Desktop)
---

## Project Structure

```
ai-blog/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   └── authMiddleware.js     ← JWT verify
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── aiRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── BlogCard.js
    │   │   └── PrivateRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Blogs.js
    │   │   ├── BlogDetail.js
    │   │   ├── CreateBlog.js
    │   │   ├── EditBlog.js
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

---

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-blog
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your Gemini API key:** https://makersuite.google.com/app/apikey

Run backend:
```bash
npm run dev
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000  
Backend runs on: http://localhost:5000

The `"proxy": "http://localhost:5000"` in frontend's `package.json` handles the API routing automatically.

---

## API Routes

| Method | Route               | Auth? | Description              |
|--------|---------------------|-------|--------------------------|
| POST   | /api/auth/register  | No    | Register new user        |
| POST   | /api/auth/login     | No    | Login user               |
| GET    | /api/auth/me        | Yes   | Get logged in user       |
| GET    | /api/blogs          | No    | Get all blogs (paginated)|
| GET    | /api/blogs/my       | Yes   | Get my blogs             |
| GET    | /api/blogs/:id      | No    | Get single blog          |
| POST   | /api/blogs          | Yes   | Create blog              |
| PUT    | /api/blogs/:id      | Yes   | Update blog (author only)|
| DELETE | /api/blogs/:id      | Yes   | Delete blog (author only)|
| POST   | /api/ai/generate    | Yes   | Generate blog with AI    |
| POST   | /api/ai/improve     | Yes   | Improve blog content     |

---

## Tech Stack

- **Frontend:** React, React Router v6, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs
- **AI:** Google Gemini API (`gemini-pro`)
#
