# VoteAura

## Overview

VoteAura is a secure online voting system designed specifically for physically impaired individuals. The platform enables users to participate in elections using their Unique Disability ID (UD-ID) without the need for physical presence. It focuses on accessibility, security, and transparency throughout the voting process.

The system includes user verification, admin approval, secure authentication, and real-time voting updates, making it suitable for real-world digital election use cases.

---

## Features

### Authentication and Security

* UD-ID based user authentication
* OTP-based mobile verification
* JWT-based authentication with role-based access (admin and user)
* Password hashing and secure credential handling
* Rate limiting, secure headers, and restricted CORS configuration
* Input validation and centralized error handling
* Secure file upload with type and size restrictions

### Admin Functionality

* Admin approval and rejection of user registration requests
* Automated email notifications for approval or rejection
* Credential generation and delivery via email
* Management of candidates and election states

### Voting System

* Secure and simple voting interface
* One user can vote only once
* Real-time vote updates using Socket.io
* Transparent vote tracking and counting

### System Architecture

* Modular structure using controllers, routes, middlewares, and utilities
* Clean separation of concerns for scalability and maintainability
* Centralized configuration for database, file upload, and sockets

---

## Tech Stack

Frontend:

* React
* CSS

Backend:

* Node.js
* Express.js

Database:

* MongoDB

Authentication and Security:

* JSON Web Tokens (JWT)
* OTP verification

Other Tools and Libraries:

* Socket.io (real-time updates)
* Nodemailer (email service)
* Multer (file uploads)
* Helmet, CORS, Express Rate Limit (security middleware)

---

## Project Structure

Backend/

* Config/ (database, multer, socket configuration)
* Controllers/ (business logic)
* Models/ (database schemas)
* routes/ (API routes)
* middlewares/ (authentication, validation, error handling)
* Server.js (entry point)

---

## API Overview

User Routes:

* Register user with details and document upload
* Verify OTP
* Login with credentials

Admin Routes:

* Approve or reject users
* Manage candidates
* Control election states

Voting Routes:

* Cast vote
* Get vote results

---

## Deployment

Backend:
https://s65-kishoore-capstone-voteaura.onrender.com/

Frontend:
https://voteaura.onrender.com/

---

## Workflow

1. User registers using UD-ID and uploads required documents
2. OTP verification is completed
3. Admin reviews and approves or rejects the request
4. Approved users receive login credentials via email
5. User logs in and casts vote
6. Votes are updated in real time

---

## Improvements Made

* Refactored project into modular architecture (controllers, routes, middlewares)
* Added JWT authentication and role-based access control
* Implemented centralized error handling
* Improved input validation across endpoints
* Secured file uploads with size and type restrictions
* Integrated Socket.io for real-time vote updates
* Added security middleware including Helmet, CORS, and rate limiting
* Fixed environment configuration issues and status codes

---

## Future Enhancements

* Advanced analytics dashboard for admins
* Multi-election support across different regions
* Integration with OCR for document verification
* Improved accessibility features for different types of disabilities

