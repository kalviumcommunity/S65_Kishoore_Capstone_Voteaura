# VoteAura 

## Idea Brief
This project is an online e-ballot application designed exclusively for physically impaired individuals. Users are authenticated through their unique disability ID (UD-ID) and must submit all required details before voting. The application incorporates OTP-based mobile verification and utilizes Nodemailer for email communications to ensure secure access and notifications. Additionally, the system ensures a transparent, accessible, and hassle-free voting process, eliminating the need for physical presence and paperwork.

## Key Features
- **UD-ID Based Authentication** – Ensures only eligible users can vote.  
- **OTP Mobile Verification** – Provides a secure login mechanism.  
- **Email Notifications** – Uses Nodemailer to send confirmations and updates.  
- **User-Friendly Voting Interface** – Accessible and inclusive UI/UX for all users.  
- **Secure & Transparent Voting Process** – Ensures integrity and privacy.  
- **Admin Approval System** – Admin can accept or reject user requests for voting.  
- **Automated Credential Email** – Upon approval, users receive an email with their UD-ID and an auto-generated password.  

## Tech Stack
- **Frontend:** React,CSS 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication & Verification:** OTP-based mobile authentication, UD-ID validation  
- **Email Service:** Nodemailer  

---

## Project Phases

### Phase 1: Project Setup & UI/UX Planning
- Set up the **MERN stack** environment (MongoDB, Express.js, React, Node.js).  
- Design wireframes for key pages (**Login, Voter Registration, Voting Page, Confirmation Page, Admin Dashboard, Admin Login, Add Candidate, etc.**).  
- Plan the **UD-ID authentication and OTP verification** flow.  
- Set up the **GitHub repository** and initialize the project.  

### Phase 2: Backend Development & Security Implementation
- Implement user authentication using **UD-ID validation**.  
- Develop **OTP-based mobile verification system**.  
- Set up **Nodemailer** for email notifications.  
- Store **user and voting data securely** in MongoDB.  
- Implement an **admin panel** to accept or reject voter registration requests.  
- Configure an **automated email system** to send UD-ID and auto-generated passwords upon approval.  

### Phase 3: Frontend Development & Voting System Integration
- Build a **responsive and accessible UI** for voters.  
- Implement the **voting mechanism** with a secure and user-friendly experience.  
- Integrate **real-time status updates** for voting confirmation.  
- Develop the **admin panel** with request approval/rejection functionality.  
- Ensure **seamless interaction** between frontend and backend.  

### Phase 4: Testing, Deployment & Final Enhancements
- Conduct **unit and integration testing**.  
- Debug issues and **optimize performance**.  
- Deploy the application on a cloud platform (**e.g., Vercel, Heroku, etc.**).  
- Gather **user feedback** and make necessary improvements.  

---

## Backend Deployed Link

https://s65-kishoore-capstone-voteaura.onrender.com/
