Full-Stack Blog Application
A modern, full-featured blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, CRUD operations, social login, and interactive features.

🚀 Features

User Authentication

Email/Password registration and login
Google OAuth integration via Firebase
JWT-based authentication
Secure password hashing with bcrypt


Blog Post Management

Create, Read, Update, Delete (CRUD) operations
Rich text editor for content creation
Like/Unlike posts
View post author and timestamps
Authorization checks (only owners can edit/delete)


User Profile

View and edit user profile
Custom bio section
View personal blog posts


Social Features

Like system for posts
Share posts on social media (Facebook, Twitter, WhatsApp, LinkedIn)


📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm or yarn package manager

🛠️ Tech Stack
Backend

Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database
Mongoose - ODM for MongoDB
JWT - Authentication tokens
bcrypt - Password hashing
Firebase Admin - OAuth integration

Frontend

React - UI library
Redux Toolkit - State management
React Router - Navigation
Axios - HTTP client
React Quill - Rich text editor
Tailwind CSS - Styling
Firebase - OAuth authentication
React Share - Social media sharing


⚙️ Installation & Setup
1. Clone the Repository
git clone <repository-url>
cd <project-directory>

2. Backend Setup
cd backend
npm install

3. Refer .env.example files and create .env file

4. Start the Application
Terminal 1 - Backend:
cd backend
npm start
Backend will run on http://localhost:5000

Terminal 2 - Frontend:
cd frontend
npm run dev
Frontend will run on http://localhost:5173



 Future Enhancements

 Pagination for blog post list
 Search functionality by title/author
 Image upload for blog posts
 Comments system
 Categories/Tags for posts
 Bookmarking posts
 User following system
 Email verification
 Password reset functionality

