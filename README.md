# AI Blog — MERN + Vite + Google Gemini AI

Full-stack blog platform with AI content generation powered by Google Gemini.

---

## Project Structure

```
ai-blog/
├── backend/
│   ├── controllers/        authController.js, blogController.js, aiController.js
│   ├── middleware/          authMiddleware.js  (JWT verify)
│   ├── models/             User.js, Blog.js
│   ├── routes/             authRoutes.js, blogRoutes.js, aiRoutes.js
│   ├── server.js
│   ├── .env                ← create this (copy from .env.example)
│   └── .env.example
│
└── frontend/               ← npm create vite@latest (React + JSX)
    ├── public/
    ├── src/
    │   ├── components/     Navbar.jsx, Footer.jsx, BlogCard.jsx, PrivateRoute.jsx
    │   ├── context/        AuthContext.jsx
    │   ├── pages/          Home, Blogs, BlogDetail, CreateBlog, EditBlog, Dashboard, Login, Register
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env                ← create this (copy from .env.example)
    ├── .env.example
    ├── index.html
    └── vite.config.js
```

---

## Setup — Step by Step

### 1. Backend

```bash
cd backend
npm install
```

Create `.env` (copy `.env.example`):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-blog
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Get Gemini API key free: https://makersuite.google.com/app/apikey

```bash
npm run dev
# Server runs on http://localhost:5000
```

---

### 2. Frontend

```bash
cd frontend
npm install
```

Create `.env` (copy `.env.example`):
```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
# App runs on http://localhost:5173
```

---

## How env vars work

| File | Variable | Used for |
|---|---|---|
| `frontend/.env` | `VITE_API_URL` | axios base URL for all API calls |
| `backend/.env` | `CLIENT_URL` | CORS — allows requests from frontend |

- Frontend calls `http://localhost:5000/api/...` directly (no proxy)
- Backend only accepts requests from `CLIENT_URL` (default: `http://localhost:5173`)

---

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Get current user |
| GET | /api/blogs | No | All blogs (paginated) |
| GET | /api/blogs/my | Yes | My blogs |
| GET | /api/blogs/:id | No | Single blog |
| POST | /api/blogs | Yes | Create blog |
| PUT | /api/blogs/:id | Yes | Edit blog |
| DELETE | /api/blogs/:id | Yes | Delete blog |
| POST | /api/ai/generate | Yes | Generate with Gemini |
| POST | /api/ai/improve | Yes | Improve content |

---

## Stack

- **Frontend:** React 18, Vite 5, React Router v6, Axios, Tailwind CSS (CDN)
- **Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs
- **AI:** Google Gemini API (`gemini-pro`)


*✅Built By - Sanchay Kumar Singh*
