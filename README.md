# 📊 MERN Stack CSV Upload and Agent Distribution System

This is a full-stack MERN (MongoDB, Express, React, Node.js) web application that allows:
- 🧑‍💼 Admin login
- 👥 Agent management
- 📁 CSV upload of leads/contacts
- 🔄 Automatic distribution of leads among agents
- 📋 Viewing distributed leads

---

## 🚀 Features

- Secure admin authentication (login)
- Add/manage agents
- Upload CSV files containing contact information
- Automatically distribute contacts evenly among agents
- Fetch and display distributed data with agent assignment
- Basic UI built with React.js
- Backend built with Express.js and MongoDB

---

## 🗂 Project Structure

internshal_project/
│
├── backend/ # Express + MongoDB backend
│ ├── models/ # Mongoose models for List and Agent
│ │ ├── Agent.js
│ │ └── List.js
│ ├── routes/ # API routes
│ │ ├── auth.js # Login route
│ │ ├── agents.js # Agent management
│ │ └── upload.js # CSV upload & distribution logic
│ ├── middleware/
│ │ └── auth.js # JWT authentication middleware
│ └── server.js # Main entry point of backend
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Login, Upload, Agent List pages
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md # You're reading it 🙂




## ⚙️ Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS / Bootstrap (if used)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload & Parsing**: Multer, csv-parser
- **Database**: MongoDB Atlas / Local MongoDB

---

## 📦 Installation & Setup

### Prerequisites
- Node.js and npm
- MongoDB installed locally or MongoDB Atlas account

### Clone the Repository
```bash
git clone https://github.com/your-username/internshal_project.git
cd internshal_project

Backend Setup
cd backend
npm install
# Create .env file
touch .env

==.env file structure:==
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


====Then run:==
node server.js


=====Frontend Setup======
cd ../frontend
npm install
npm start

===CSV Upload Format=====
firstName,phone,notes
Ravi,9876543210,Interested in product
Priya,9123456789,Call later



===============
 Future Improvements
Pagination and search for large CSV files

Role-based user management

Download distributed lists

Email notification to agents













