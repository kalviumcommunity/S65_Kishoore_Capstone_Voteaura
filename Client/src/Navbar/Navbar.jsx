import React from "react"
import "./Navbar.css"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate= useNavigate();
  return (
    <nav className="landing-navbar">
      <div className="landing-logo">VoteAura</div>
      <div className="landing-nav-links">
        <button className="landing-nav-button" onClick={()=>navigate('/')}>Home</button>
          <button className="landing" onClick={() => window.open("https://swavlambancard.gov.in/", "_blank")}>Apply for UDID</button>
          <button className="landing" onClick={()=>navigate('/info')}>Get Access to Vote</button>
          <button className="landing" onClick={()=>navigate('/votelogin')}>Vote Now</button>
          <button className="landing" onClick={()=>navigate('/query')}>Contact Us</button>
          <button className="landing" onClick={()=>navigate('/messagedis')}>Election Update's</button>
      </div>
    </nav>
  );
}
