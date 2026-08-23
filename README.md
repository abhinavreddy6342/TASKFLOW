# 🚀 TASKFLOW

### Modern Full-Stack Task Management Platform

**TASKFLOW** is a full-stack task management platform designed to provide users with a secure and organized way to create, manage, track, and update their tasks.

The application follows a separated frontend and backend architecture, with a modern web interface communicating with a FastAPI REST API.

---

## 🌐 Live Application

### 🖥️ Task Flow Frontend

**taskflow-kappa-snowy-65.vercel.app**

### ⚙️ Task Flow Backend

**https://taskflow-backend-sw7t.onrender.com**

---

# ✨ Features

## 🔐 Authentication

TASKFLOW provides a secure authentication workflow for user accounts.

* User registration
* User login
* JWT-based authentication
* Secure password hashing
* Password reset workflow
* Protected API endpoints
* Authentication-aware navigation
* User-specific task access

---

## 📋 Task Management

Users can manage their tasks through a centralized dashboard.

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* Track task status
* Manage personal tasks
* Perform task operations through REST APIs

---

## 📊 Dashboard

The application provides a centralized dashboard for managing tasks.

* Task overview
* User-specific task information
* Task status tracking
* Simple task workflow
* Responsive interface
* Clean and accessible user experience

---

# 🏗️ System Architecture

```text
                         TASKFLOW
                            │
                            ▼
                  ┌───────────────────┐
                  │  React Frontend   │
                  │      Vite         │
                  └─────────┬─────────┘
                            │
                            │ HTTPS
                            │ REST API
                            ▼
                  ┌───────────────────┐
                  │   FastAPI Backend │
                  │      Python       │
                  └─────────┬─────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
       ┌─────────────────┐     ┌─────────────────┐
       │ Authentication  │     │ Task Management │
       │   JWT + Argon2  │     │   CRUD APIs     │
       └─────────────────┘     └────────┬────────┘
                                        │
                                        ▼
                               ┌─────────────────┐
                               │    Database     │
                               │   SQLAlchemy    │
                               └─────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* JavaScript
* Vite
* Axios
* React Router
* CSS
* Responsive Web Design

## Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* JWT Authentication
* Python-JOSE
* pwdlib
* Argon2

## Development & Deployment

* Git
* GitHub
* REST APIs
* Environment Variables
* CORS
* Vercel
* Render

---

# 📁 Project Structure

```text
TASKFLOW/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   └── tasks.py
│   │   │
│   │   ├── services/
│   │   │   └── auth_service.py
│   │   │
│   │   ├── utils/
│   │   │   └── security.py
│   │   │
│   │   ├── models/
│   │   ├── database.py
│   │   ├── config.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 🔑 Authentication Architecture

TASKFLOW uses token-based authentication to protect user-specific resources.

```text
                 User
                   │
                   ▼
            Register / Login
                   │
                   ▼
          FastAPI Auth Endpoint
                   │
                   ▼
          Password Verification
                   │
                   ▼
               JWT Token
                   │
                   ▼
          Authenticated Client
                   │
                   ▼
          Protected Task APIs
                   │
                   ▼
           User-Specific Data
```

Passwords are securely hashed before storage, while authenticated API requests use JWT-based authorization.

---

# 📡 API Architecture

The backend follows a REST-oriented architecture with separate responsibilities for authentication and task management.

### Authentication

```text
POST /auth/register
POST /auth/login
```

### Task Management

```text
GET    /tasks/
POST   /tasks/
PUT    /tasks/{task_id}
DELETE /tasks/{task_id}
```

Protected task operations require authenticated access.

---

# 🛡️ Security

Security was considered throughout the application architecture.

* Passwords are not stored in plain text
* Password hashing using Argon2
* JWT-based authentication
* Protected backend routes
* User-specific authorization
* CORS configuration
* Environment-based configuration
* Sensitive credentials kept outside source code

### Sensitive Information

The following should never be committed to the repository:

```text
.env
API keys
Database credentials
JWT secrets
Private tokens
Passwords
```

Production secrets should be managed through environment variables provided by the deployment platform.

---

# 💻 Running Locally

## 1. Clone the Repository

```bash
git clone https://github.com/abhinavreddy6342/TASKFLOW.git
cd TASKFLOW
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

### Windows

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the required environment variables.

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# 🌍 Production Deployment

TASKFLOW uses a separated frontend/backend deployment architecture.

### Frontend

**Platform:** Vercel

**Live Application:**

```text
taskflow-kappa-snowy-65.vercel.app
```

### Backend

**Platform:** Render

**Live API:**

```text
https://taskflow-backend-sw7t.onrender.com
```

The frontend communicates with the backend through HTTPS REST API requests.

---

# 🧪 Application Workflows

The application supports the following core workflows:

### Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Logout
* Password reset

### Task Management

* Task creation
* Task retrieval
* Task updating
* Task deletion
* User-specific task access

### Deployment

* Production frontend deployment
* Production backend deployment
* Frontend-to-backend communication
* CORS configuration
* Environment-based production configuration

---

# 🧠 Engineering Highlights

TASKFLOW demonstrates practical full-stack software engineering concepts including:

* Full-stack application architecture
* REST API design
* Authentication and authorization
* JWT-based security
* Secure password hashing
* Database integration
* SQLAlchemy ORM
* CRUD operations
* Frontend routing
* API integration
* CORS configuration
* Environment-based configuration
* Production deployment
* Git/GitHub workflow
* Separation of frontend and backend responsibilities

---

# 📈 Future Enhancements

Potential future improvements include:

* ⭐ Task priorities
* 📅 Due dates and reminders
* 🏷️ Task categories
* 🔎 Advanced search and filtering
* 🖱️ Drag-and-drop task organization
* 📊 Productivity analytics
* 📧 Email notifications
* 👤 Advanced profile management
* 🌙 Dark/light theme customization
* 📈 Advanced dashboard analytics
* 🔔 Real-time notifications

---

# 👨‍💻 Developer

## Abhinav Reddy

**Computer Science Engineering Student**

Areas of interest:

```text
Software Engineering
Full-Stack Development
Backend Development
AI & Intelligent Systems
Cloud & Deployment
```

### GitHub

https://github.com/abhinavreddy6342

---

# 🔗 Project Links

| Resource              | Link                                       |
| --------------------- | ------------------------------------------ |
| 🌐 Task Flow Frontend | taskflow-kappa-snowy-65.vercel.app         |
| ⚙️ Task Flow Backend  | https://taskflow-backend-sw7t.onrender.com |

---

# 📜 Intellectual Property & Usage Notice

**© 2026 Abhinav Reddy. All Rights Reserved.**

TASKFLOW and its associated source code, architecture, implementation, interface design, documentation, configuration, and project materials are provided as part of the author's portfolio work.

This repository is intended for:

* Portfolio demonstration
* Technical evaluation
* Recruitment and interview purposes
* Educational reference

### 🚫 Usage Restrictions

Without explicit permission from the author, please do not:

* Copy substantial portions of the source code
* Re-upload the project as your own
* Claim the project or its implementation as your own work
* Redistribute substantial portions of the implementation
* Remove original attribution
* Publish modified versions as an original project
* Use substantial portions of the implementation in another project
* Present TASKFLOW as your own work

Viewing or accessing this repository does not grant ownership of the project's implementation.

For permission to reproduce, modify, redistribute, or reuse substantial portions of the project, please contact the author.

---

# ⭐ Project Highlights

TASKFLOW demonstrates an end-to-end approach to building and deploying a full-stack application:

```text
Application Development
        ↓
Frontend Development
        ↓
Backend API Development
        ↓
Authentication
        ↓
Database Operations
        ↓
Frontend–Backend Integration
        ↓
Production Deployment
```

### 🚀 TASKFLOW

**A full-stack task management platform focused on security, usability, API design, maintainability, and production deployment.**
