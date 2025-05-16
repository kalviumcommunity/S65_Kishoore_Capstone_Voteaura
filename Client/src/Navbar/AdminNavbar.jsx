import React from 'react';
import './AdminNavbar.css'

export default function AdminLandingPage() {

    return (
        <div className="landing-page">
        <nav className="landing-navbar">
            <h1 className="landing-logo">VoteAura</h1>
            <div className="landing-nav-links">
            <button className="landing-nav-button">Home</button>
            <button className="landing-nav-button">Give access to vote</button>
            <button className="landing-nav-button">Register Candidate's</button>
            <button className="landing-nav-button">Solve Query</button>
            <button className="landing-nav-button">Start Election</button>
            </div>
        </nav>
        </div>
    )
}

