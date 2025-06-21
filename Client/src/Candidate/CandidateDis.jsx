import React, { useEffect, useState } from 'react'
import './CandidateDis.css'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

export default function CandidateList() {
  const [candidates, setCandidates] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const userState = localStorage.getItem('userState')
        const res = await fetch(`http://localhost:5000/api/candidates?state=${userState}`)
        const data = await res.json()
        setCandidates(data.candidates)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCandidates()
  }, [])

  const openConfirmation = (candidate) => {
    setSelectedCandidate(candidate)
    setShowConfirmation(true)
  }

  const cancelVote = () => {
    setSelectedCandidate(null)
    setShowConfirmation(false)
  }

  const confirmVote = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/vote/${selectedCandidate._id}`, {
        method: 'POST'
      })
      const data = await res.json()
      alert('Your Vote has been taken in count', data)
      setShowConfirmation(false)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Failed to vote. Try again.')
      setShowConfirmation(false)
    }
  }

  return (
    <div className="vote-wrapper">
      <Navbar />
      <h2 className="vote-heading">Candidates</h2>
      {candidates.map(candidate => (
        <div key={candidate._id} className="vote-card">
          <img src={`http://localhost:5000/${candidate.profileimg}`} alt="Candidate" className="vote-photo" />
          <span className="vote-name">{candidate.name}</span>
          <img src={`http://localhost:5000/${candidate.partyimg}`} alt="Party" className="vote-symbol" />
          <span className="vote-party">{candidate.partyname}</span>
          <button className="vote-action" onClick={() => openConfirmation(candidate)}>Vote</button>
        </div>
      ))}
      {showConfirmation && (
        <div className="overlay-confirm">
          <div className="box-confirm">
            <p>Would you surely like to vote for {selectedCandidate?.name}?</p>
            <div className="confirm-btn-group">
              <button onClick={confirmVote} className="btn-yes">Confirm</button>
              <button onClick={cancelVote} className="btn-no">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}