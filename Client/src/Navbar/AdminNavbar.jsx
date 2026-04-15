import React from 'react';
import './AdminNavbar.css'
import { useNavigate } from "react-router-dom"; 


export default function AdminLandingPage() {
    const navigate=useNavigate();

    return (
        <div className="landing-page">
        <nav className="landing-navbar">
            <h1 className="landing-logo">VoteAura</h1>
            <div className="landing-nav-links">
            <button className="landing-nav-button" onClick={()=>navigate('/adland')}>Home</button>
            <button className="landing-nav-button" onClick={()=>navigate('/login')}>Give access to vote</button>
            <button className="landing-nav-button" onClick={()=>navigate('/candidate')}>Register Candidate's</button>
            <button className="landing-nav-button" onClick={()=>navigate('/getquery')}>Solve Query</button>
            <button className="landing-nav-button" onClick={()=>navigate('/admin-login')}>Start Election</button>
            <button className="landing-nav-button" onClick={()=>navigate('/message')}>Post Information</button>

            </div>
        </nav>
        </div>
    )
}

