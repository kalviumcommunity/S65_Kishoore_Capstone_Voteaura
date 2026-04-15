import React, { useEffect, useState } from 'react'
import './StartDis.css'
import Navbar from '../Navbar/AdminNavbar'

export default function ViewDetails() {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const userState = localStorage.getItem('userState')
        const res = await fetch(`http://localhost:5000/api/candidates?state=${userState}`)
        const data = await res.json()
        const candidatesWithVotes = data.candidates.map(candidate => ({
          ...candidate,
          votes: candidate.voteCount ?? 0
        }))
        setCandidates(candidatesWithVotes)
      } catch (error) {
        console.error('Failed to fetch candidates:', error)
      }
    }
    fetchCandidates()
  }, [])

  return (
    <div className="results-container">
      <Navbar />
      <h2 className="results-header">Election Results</h2>
      {candidates.map(candidate => (
        <div key={candidate._id} className="results-card">
          <img
            src={`http://localhost:5000/${candidate.profileimg}`}
            alt="Candidate"
            className="results-profile"
          />
          <span className="results-name">{candidate.name}</span>
          <img
            src={`http://localhost:5000/${candidate.partyimg}`}
            alt="Party"
            className="results-party-logo"
          />
          <span className="results-party">{candidate.partyname}</span>
          <div className="results-votes">Votes: {candidate.votes}</div>
        </div>
      ))}
    </div>
  )
}
