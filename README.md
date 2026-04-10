# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# My Day — AI-Powered To-Do App

A full-stack to-do list application where users can manage daily tasks, get AI-powered suggestions, and save their list to a personal account.

---

## What This App Does

- Create, complete, and delete to-do tasks
- Get AI-generated task suggestions based on your existing list
- Register and log in to a personal account
- Tasks are saved to a database and persist across sessions

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React | User interface |
| Backend | Node.js + Express | API server |
| Database | PostgreSQL | Stores users and tasks |
| Auth | JWT + bcrypt | Login sessions and password security |
| AI | Anthropic Claude API | Task suggestions |

---

## Project Structure

```
todo-app/
├── frontend/                  # React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx      # Login and register popup
│   │   │   └── Todo.jsx       # Main to-do page
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx  # Redirects to login if not authenticated
│   │   ├── context/
│   │   │   └── AppContext.jsx # Global state (user, token, tasks)
│   │   ├── api/
│   │   │   └── api.js         # All fetch calls to the backend
│   │   └── main.jsx
│
└── backend/                   # Express server
    ├── routes/
    │   ├── auth.js            # POST /auth/register, POST /auth/login
    │   ├── tasks.js           # GET, POST, PATCH, DELETE /tasks
    │   └── llm.js             # POST /llm/suggest
    ├── middleware/
    │   └── auth.js            # JWT token verification
    ├── db/
    │   └── index.js           # PostgreSQL connection pool
    ├── .env                   # Secret keys (not committed to git)
    └── server.js              # Entry point
```

---

## Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org) v18 or higher
- [PostgreSQL](https://postgresql.org/download) v14 or higher

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app
```

---

### 2. Set up the database

Open pgAdmin or the PostgreSQL query tool and run:

```sql
CREATE DATABASE todo_app;

CREATE TABLE users (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(255) UNIQUE NOT NULL,
  password     TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
  text         TEXT NOT NULL,
  completed    BOOLEAN DEFAULT FALSE,
  position     INTEGER,
  created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token        TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT NOW(),
  expires_at   TIMESTAMP
);
```

---

### 3. Configure the backend

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` folder:

```bash
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/todo_app
JWT_SECRET=your_random_secret_string_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

---

### 4. Start the backend

```bash
npm run dev
```

You should see:
```
Server running on port 5000
Connected to PostgreSQL
```

---

### 5. Set up the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/auth/register` | Create a new account | No |
| POST | `/auth/login` | Log in and receive a token | No |

### Tasks

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| GET | `/tasks` | Get all tasks for logged-in user | Yes |
| POST | `/tasks` | Add a new task | Yes |
| PATCH | `/tasks/:id` | Edit or complete a task | Yes |
| DELETE | `/tasks/:id` | Delete a task | Yes |

### AI

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/llm/suggest` | Get 3 AI task suggestions | Yes |

All protected routes require an `Authorization` header in this format:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## How Authentication Works

1. User registers or logs in → backend returns a JWT token
2. Token is stored in `localStorage` on the frontend
3. Every request to a protected route sends the token in the header
4. Backend middleware verifies the token before allowing access
5. Token expires after 7 days — user must log in again

Passwords are never stored as plain text. They are hashed using `bcrypt` before being saved to the database.

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the backend runs on (default: 5000) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens — keep this private |
| `ANTHROPIC_API_KEY` | API key for Claude AI suggestions |

Never commit your `.env` file to GitHub. It is listed in `.gitignore`.

---

## Scripts

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start server with auto-restart on file save |
| `npm start` | Start server without auto-restart |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start React app in development mode |
| `npm run build` | Build for production |

---

## Skills Demonstrated

- React component architecture and state management with Context API
- RESTful API design with Node.js and Express
- Relational database design with PostgreSQL and foreign keys
- User authentication with JWT tokens and bcrypt password hashing
- LLM integration using the Anthropic Claude API
- Protected routing and session persistence on the frontend
