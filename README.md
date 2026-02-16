# BellCorp Event Management

A **full-stack event management application** built with the **MERN stack** (MongoDB, Express, React, Node.js). This platform allows users to browse, filter, register, and manage events.

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)

---

## Features
- Browse all available events with details like event name, location, category.
- Filter events by category and location.
- View events by all events, upcoming and past events
- Register for events if seats are available.
- Cancel event registration and release the seat.
- Event seats are dynamically updated based on user registrations.
- Responsive and modern UI
- Pagination and "Load More" functionality for large event lists
- Notifications using **react-hot-toast**

---

## Demo
[Live Demo Link] - *(Add your deployed URL here if available)*

---

## Technologies
- **Frontend:** React, Tailwind CSS, Lucide Icons, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Render, Vercel
- **Other Tools:** react-hot-toast, react-router-dom

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud)

---

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/vishalpohar/bellcorp-event-management.git

2. Navigate to backend folder
    cd server
3. Install dependencies
    npm install
4. Create a .env file in the backend folder
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    CLIENT_URL=client_url
5. Start the backend server
    npm run dev


### Fronted Setup
1. Navigate to the frontend folder
    cd client
2. Install dependencies
    npm install
3. Start the frontend server
    npm run dev


API Endpoints
Method	    Endpoint	                        Description	Access
GET	        /api/events	Fetch all events	    Public
GET	        /api/events/:id	Get event by ID	    Public
POST	    /api/event-registrations/:id	    Register for an event	User
DELETE	    /api/event-registrations/:id	    Cancel registration	User
GET	        /api/event-registrations	        Get all registrations of a user	User


BellCorp_Event_Management/
│
├─ server/
│  ├─ config/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ middleware/
│  ├─ .env
│  ├─ package.json
│  ├─ server.js
│
├─ client/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ lib/
│  │  ├─ pages/
│  │  ├─ utils/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  ├─ package.json
│
├─ README.md
└─ .gitignore
