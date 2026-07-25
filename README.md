# Lead Management System

A full-stack Lead Management System built using the MERN Stack. The application allows businesses to collect leads through a public form, manage them through a secure dashboard, assign leads to team members, track activities, and maintain notes.

---

## Live Demo

### Frontend
[[https://lead-management-system-iy3v.vercel.app/dashboard](https://lead-management-system-iy3v.vercel.app/)](https://lead-management-system-iy3v.vercel.app/)


---

# Features

## Authentication

- JWT Authentication
- Secure Login
- User Registration
- Protected Routes
- Role-Based Authorization (Admin & Member)

---

## Public Lead Form

- Anyone can submit a lead
- Stores lead in MongoDB
- Default status is **New**

---

## Dashboard

- View all leads
- Search by
  - Name
  - Email
  - Company
- Filter by Status
- Pagination
- Lead Details Page

---

## Lead Management

- Update Lead Information
- Change Lead Status
- Add Notes
- Activity Trail
- Assign Lead to Team Member (Admin)

---

## Roles

### Admin

- View all leads
- Assign leads
- Delete leads
- Update leads
- Change status
- Add notes

### Member

- View leads
- Update status
- Add notes

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Morgan
- CORS

---

# Folder Structure

```
Lead-Management-System
│
├── Backend
│   ├── server
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   ├── server.js
│   └── package.json
│
├── Frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   └── Layout
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/lead-management-system.git
```

```
cd lead-management-system
```

---

# Backend Setup

```
cd Backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

```
cd Frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------------|------------------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | Get Profile |
| GET | /api/auth/members | Get Members |

---

## Leads

| Method | Endpoint | Description |
|----------|----------------------|----------------------|
| POST | /api/leads/public | Public Lead Form |
| GET | /api/leads | Get All Leads |
| GET | /api/leads/:id | Get Lead Details |
| PUT | /api/leads/:id | Update Lead |
| PATCH | /api/leads/:id/status | Update Status |
| PATCH | /api/leads/:id/assign | Assign Lead |
| POST | /api/leads/:id/notes | Add Note |
| DELETE | /api/leads/:id | Delete Lead |

---

# Screenshots

Add screenshots here.

- Home Page
- Login
- Dashboard
- Lead Details
- Assign Lead
- Notes
- Activity Trail

---

# Testing

Backend API tested using:

- Jest
- Supertest

Run tests

```bash
npm test
```

---

# Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# Future Improvements

- Email Notifications
- Dashboard Analytics
- File Upload
- Export Leads to Excel
- Dark Mode
- Advanced Filters
- User Profile Management

---

# Author

**Zaid Nagori**

LinkedIn

https://www.linkedin.com/in/zaid-nagori-a16275359


