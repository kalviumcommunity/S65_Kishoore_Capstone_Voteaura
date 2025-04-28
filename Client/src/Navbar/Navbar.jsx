import React from "react"
import "./Navbar.css"
import { useNavigate } from "react-router-dom"; 



export default function Navbar() {

  const navigate= useNavigate();
  return (
    <nav className="landing-navbar">
      <div className="landing-logo">VoteAura</div>
      <div className="landing-nav-links">
        <button className="landing" onClick={()=>navigate('/')}>Home</button>
        <button className="landing"onClick={()=>navigate('/signup')}>Signup</button>
        <button className="landing">Login</button>
        <button className="landing">Contact</button>
      </div>
    </nav>
  );
}
