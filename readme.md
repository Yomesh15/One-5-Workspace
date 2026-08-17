# One 5 WorkOS

> **A full-stack team work-management platform where owners create projects, add team members, assign tasks, and review completed work.**

---

## 1. 🎯 Project Purpose

One 5 WorkOS helps a team manage software/project work from one place.

The main workflow is:

```text
Owner
  ↓
Create Workspace
  ↓
Add Team Members
  ↓
Create Project
  ↓
Create Task
  ↓
Assign Task
  ↓
Member receives task
  ↓
Member starts work
  ↓
TODO → IN PROGRESS
  ↓
Member completes work
  ↓
Attach GitHub / Live URL
  ↓
Submit for Review
  ↓
IN REVIEW
  ↓
Owner reviews
  ↓
 ┌───────────────┐
 ↓               ↓
Approve       Request Changes
 ↓               ↓
DONE         IN PROGRESS
```

---

# 2. 👥 User Roles

## Owner

The owner controls the workspace.

Owner can:

* Create workspace
* Update workspace
* Add members
* Remove members
* Create projects
* Create tasks
* Assign tasks
* Set deadlines
* Set priority
* Review submitted tasks
* Approve tasks
* Request changes
* View project progress
* View team activity

---

## Member

Members work on tasks assigned to them.

Member can:

* View assigned tasks
* Start a task
* Move task to `IN PROGRESS`
* Add comments
* Attach GitHub/Live links
* Submit task for review
* View review feedback
* Make requested changes
* Resubmit task

A member **cannot approve their own task**.

---

# 3. 🛠️ Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Redux Toolkit
* Axios
* Lucide React / React Icons
* Socket.IO Client

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie Parser
* Socket.IO

## Other

* Cloudinary — file uploads
* GitHub — code repository / PR links
* Vercel — frontend deployment
* Render — backend deployment

---

# 4. 📁 Project Structure

Create the project as two applications:

```text
one5-workos/
│
├── frontend/
│
├── backend/
│
├── README.md
└── .gitignore
```

Backend:

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utils/
│
├── sockets/
│
├── .env
├── server.js
└── package.json
```

Frontend:

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── redux/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
└── package.json
```

---

# 5. 🚀 Phase 1 — Project Setup

Create the project:

```bash
mkdir one5-workos
cd one5-workos
```

Create frontend:

```bash
npm create vite@latest frontend
```

Choose:

```text
React
JavaScript
```

Install frontend dependencies:

```bash
cd frontend
npm install
npm install react-router-dom axios @reduxjs/toolkit react-redux socket.io-client
```

Install Tailwind according to the current Tailwind/Vite setup you choose.

Create backend:

```bash
cd ..
mkdir backend
cd backend
npm init -y
```

Install:

```bash
npm install express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken socket.io
```

Development dependency:

```bash
npm install -D nodemon
```

---

# 6. 🔐 Phase 2 — Authentication

First build authentication before anything else.

Create:

```text
User
```

User fields:

```js
{
  name,
  email,
  password,
  profilePhoto,
  role
}
```

Roles:

```text
OWNER
MEMBER
```

Build:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Implement:

* Password hashing
* JWT
* HTTP-only cookies
* Authentication middleware
* Protected routes

---

# 7. 🏢 Phase 3 — Workspace

After login, an owner can create a workspace.

Example:

```text
One 5 Technologies
```

Workspace:

```js
{
  name,
  description,
  owner,
  members,
  createdAt
}
```

Owner dashboard:

```text
ONE 5 TECHNOLOGIES

Members: 5
Projects: 3
Tasks: 42
```

---

# 8. 👥 Phase 4 — Team Management

Owner can add members.

Initially keep this simple:

```text
Owner searches member by email
        ↓
Add Member
```

Example:

```text
Workspace Members

Yomesh
Owner

Rahul
Member

Priya
Member

Aman
Member
```

Owner can:

* Add member
* Remove member
* View member
* See member's assigned tasks

---

# 9. 📁 Phase 5 — Projects

Owner creates projects inside the workspace.

Example:

```text
One 5 Technologies
        │
        ├── One 5 Jobs
        ├── One 5 Store
        └── One 5 AI
```

Project model:

```js
{
  name,
  description,
  workspace,
  createdBy,
  members,
  status,
  startDate,
  deadline
}
```

Project status:

```text
ACTIVE
COMPLETED
ARCHIVED
```

---

# 10. 📝 Phase 6 — Task System

This is the heart of WorkOS.

Owner creates a task:

```text
Title:
Create Login API

Description:
Create login API using JWT authentication.

Assigned To:
Rahul

Priority:
HIGH

Deadline:
August 15

Project:
One 5 Jobs
```

Task model:

```js
{
  title,
  description,
  project,
  workspace,

  assignedTo,
  createdBy,

  priority,
  status,

  deadline,

  submissionLink,
  attachments,

  reviewComment,

  createdAt,
  updatedAt
}
```

---

# 11. 📌 Task Status

Use these statuses:

```text
TODO
IN_PROGRESS
IN_REVIEW
CHANGES_REQUESTED
DONE
```

Workflow:

```text
TODO
 ↓
IN_PROGRESS
 ↓
IN_REVIEW
 ↓
DONE
```

If owner rejects it:

```text
IN_REVIEW
 ↓
CHANGES_REQUESTED
 ↓
IN_PROGRESS
 ↓
IN_REVIEW
 ↓
DONE
```

---

# 12. 👨‍💻 Phase 7 — Member Dashboard

A member should NOT see every owner function.

Member dashboard:

```text
Welcome Rahul 👋

My Tasks

┌────────────────────────────┐
│ Create Login API           │
│ HIGH                       │
│ TODO                       │
│ Due: Aug 15                │
│                            │
│ [Start Work]               │
└────────────────────────────┘
```

When Rahul clicks:

**Start Work**

the backend changes:

```text
TODO → IN_PROGRESS
```

---

# 13. 💻 Phase 8 — Actual Work Happens Outside WorkOS

WorkOS manages the task.

The member does the actual development using:

```text
VS Code
Git
GitHub
Terminal
Database
etc.
```

Example:

```text
WorkOS
   ↓
"Create Login API"
   ↓
Rahul opens VS Code
   ↓
Writes code
   ↓
Tests code
   ↓
Pushes to GitHub
```

---

# 14. 🔗 Phase 9 — Submit Work

When the member finishes the task:

```text
Task Details

Status: IN PROGRESS

[Submit for Review]
```

Clicking it opens:

```text
Submit Work

GitHub URL:
[________________________]

Live URL:
[________________________]

Message:
[________________________]

[Submit for Review]
```

At least one valid work link should be required.

Then:

```text
IN_PROGRESS
      ↓
IN_REVIEW
```

The owner gets a notification.

---

# 15. 👀 Phase 10 — Owner Review

Owner sees:

```text
Review Required

Create Login API
Assigned to: Rahul

GitHub:
github.com/...

Live:
one5-login.vercel.app

Message:
Login API completed.

[Approve]
[Request Changes]
```

### Approve

```text
IN_REVIEW → DONE
```

### Request Changes

Owner writes:

```text
Please add validation for incorrect passwords.
```

Then:

```text
IN_REVIEW
    ↓
CHANGES_REQUESTED
```

Member sees the feedback and starts working again:

```text
CHANGES_REQUESTED
        ↓
IN_PROGRESS
```

---

# 16. 💬 Phase 11 — Comments

Every task should have comments.

Example:

```text
Create Login API

Rahul:
"API is almost complete."

Yomesh:
"Please add rate limiting."

Rahul:
"Done. I've pushed the changes."
```

This keeps task-specific communication together.

---

# 17. 🔔 Phase 12 — Notifications

Create notifications for important events.

Examples:

```text
🔔 You were assigned a new task.

🔔 Rahul submitted a task for review.

🔔 Your task was approved.

🔔 Owner requested changes.

🔔 You were added to a project.
```

Initially implement normal database notifications.

Later add real-time notifications with Socket.IO.

---

# 18. ⚡ Phase 13 — Real-Time Updates

Add Socket.IO.

Example:

Rahul submits:

```text
Create Login API
```

Owner doesn't need to refresh the page.

The owner immediately receives:

```text
🔔 Rahul submitted Create Login API for review.
```

Also make task status updates appear in real time.

---

# 19. 📊 Phase 14 — Dashboard Analytics

Owner dashboard:

```text
Projects        5
Members         12
Total Tasks     86
Completed       54
In Progress     20
In Review       8
Overdue         4
```

Add charts:

```text
Tasks Completed
     █
 █   █
 █   █   █
 █   █   █   █
────────────────
Mon Tue Wed Thu
```

Use MongoDB aggregation for statistics.

---

# 20. 🔎 Phase 15 — Search & Filters

Add task search:

```text
Search tasks...
```

Filters:

```text
Status
Priority
Member
Project
Deadline
```

Example:

```text
Status: IN_REVIEW
Member: Rahul
Priority: HIGH
```

---

# 21. 📜 Phase 16 — Activity Log

Record important actions.

Example:

```text
Activity

Yomesh created "One 5 Jobs"

Yomesh assigned "Login API" to Rahul

Rahul started "Login API"

Rahul submitted "Login API"

Yomesh requested changes

Rahul resubmitted "Login API"

Yomesh approved "Login API"
```

This gives you an audit trail.

---

# 22. 🧪 Phase 17 — Validation & Security

Add:

* Request validation
* Authentication middleware
* Authorization middleware
* Rate limiting
* Secure cookies
* CORS configuration
* Password hashing
* Input sanitization
* Proper error handling

Most importantly:

A member must NOT be able to call an API and approve their own task.

Backend must check permissions.

---

# 23. 🧪 Phase 18 — Testing

Test important APIs:

```text
Register
Login
Create Workspace
Add Member
Create Project
Create Task
Assign Task
Start Task
Submit Task
Approve Task
Request Changes
```

Use:

```text
Jest
Supertest
```

---

# 24. 🐳 Phase 19 — Docker

After the application works normally, add Docker.

Eventually:

```text
Docker
 ├── Frontend
 ├── Backend
 └── MongoDB
```

Do NOT start with Docker.

First understand the application.

---

# 25. 🚀 Phase 20 — Deployment

Deploy:

```text
Frontend → Vercel

Backend → Render

Database → MongoDB Atlas
```

Configure:

```text
Production environment variables
CORS
Cookies
HTTPS
Database connection
```

Test the complete workflow online.

---

# 26. 🏆 Final Application

The final WorkOS should look conceptually like:

```text
                    ONE 5 WORKOS
                          │
              ┌───────────┴───────────┐
              │                       │
            OWNER                   MEMBER
              │                       │
       Create Workspace         View assigned tasks
              │                       │
        Add Members              Start task
              │                       │
        Create Project           IN PROGRESS
              │                       │
        Create Task              Do actual work
              │                       │
        Assign Member            Attach link
              │                       │
              │                  Submit Review
              │                       │
              └───────────┬───────────┘
                          ↓
                       REVIEW
                          ↓
                   ┌──────┴──────┐
                   ↓             ↓
                APPROVE       CHANGES
                   ↓             ↓
                 DONE       IN PROGRESS
```

---

# 27. 🗓️ Recommended Build Order

Do NOT build everything at once.

### Level 1 — Foundation

```text
□ Project setup
□ MongoDB
□ User model
□ Register
□ Login
□ Logout
□ JWT authentication
□ Protected routes
```

### Level 2 — Workspace

```text
□ Workspace model
□ Create workspace
□ Workspace dashboard
□ Add members
□ Remove members
```

### Level 3 — Projects

```text
□ Project model
□ Create project
□ Project dashboard
□ Project members
```

### Level 4 — Tasks

```text
□ Task model
□ Create task
□ Assign task
□ Task details
□ Task status
□ Priority
□ Deadline
```

### Level 5 — Main Workflow

```text
□ Member dashboard
□ Start task
□ IN_PROGRESS
□ Attach GitHub link
□ Attach live link
□ Submit for review
□ IN_REVIEW
□ Owner review
□ Approve
□ Request changes
□ DONE
```

### Level 6 — Collaboration

```text
□ Comments
□ Notifications
□ Activity logs
□ Socket.IO
□ Real-time updates
```

### Level 7 — Advanced

```text
□ Search
□ Filters
□ Pagination
□ Analytics
□ MongoDB aggregation
□ File attachments
□ Email notifications
```

### Level 8 — Production

```text
□ Validation
□ Security
□ Testing
□ Docker
□ Deployment
□ API documentation
```

---

# 28. ⭐ Most Important Rule

**Don't rush this project.**

Your main goal is:

```text
DSA in Java
     +
MERN Practice
     +
One 5 WorkOS
```

Build WorkOS **one feature at a time**.

Don't copy a complete Jira clone from YouTube.

For every feature, first think:

```text
What should happen?
        ↓
What data do I need?
        ↓
What MongoDB model do I need?
        ↓
What API do I need?
        ↓
What authorization is required?
        ↓
What React page/component do I need?
        ↓
How should frontend and backend communicate?
```

That thinking is what will actually improve your MERN skills.
