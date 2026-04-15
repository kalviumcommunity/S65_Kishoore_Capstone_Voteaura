import React, { useEffect, useState } from 'react';
import './CandidateDis.css';
import Navbar from '../Navbar/Navbar'

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/candidates');
        const data = await res.json();
        setCandidates(data);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = (candidateId) => {
    alert(`Voted for candidate ID: ${candidateId}`);
  };

  return (
    <div className="users-container">
        <Navbar/>
      <h2 className="header">Candidates</h2>
      {candidates.map(candidate => (
        <div key={candidate._id} className="candidate-card">
          <img src={`http://localhost:5000/uploads/${candidate.profileimg}`} alt="Candidate" className="candidate-image" />
        <span className="candidate-name">{candidate.name}</span>
          <img src={`http://localhost:5000/uploads/${candidate.partyimg}`} alt="Party" className="party-image" />
        <span className="party-name">{candidate.partyname}</span>
          <button className="vote-button" onClick={() => handleVote(candidate._id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}
