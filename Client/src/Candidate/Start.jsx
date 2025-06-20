import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Start.css'
import Navbar from '../Navbar/AdminNavbar'
import { stateDistrictData } from '../stateDistrict'

const StartElection = () => {
  const [selectedState, setSelectedState] = useState('')
  const [electionStates, setElectionStates] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('electionStates')) || []
    setElectionStates(saved)
  }, [])

  const handleStart = () => {
    if (!selectedState) {
      alert('Please select a state to start the election')
      return
    }

    const alreadyStarted = electionStates.some(e => e.state === selectedState)
    if (alreadyStarted) {
      alert(`Election already started for ${selectedState}`)
      return
    }

    const updatedStates = [...electionStates, { state: selectedState, active: true, stopped: false }]
    setElectionStates(updatedStates)
    localStorage.setItem('electionStates', JSON.stringify(updatedStates))
    localStorage.setItem('electionState', selectedState)
  }

  const handleStop = (state) => {
    const updated = electionStates.map(e =>
      e.state === state ? { ...e, stopped: true } : e
    )
    setElectionStates(updated)
    localStorage.setItem('electionStates', JSON.stringify(updated))
  }

  const handleViewDetails = (state) => {
    localStorage.setItem('userState', state)
    navigate('/viewdetails')
  }

  const handleEndElection = () => {
    setElectionStates([])
    localStorage.removeItem('electionStates')
  }

  const anyElectionStarted = electionStates.length > 0

  return (
    <div className="start-election-page">
      <Navbar />

      <div className="end-election-wrapper">
        <button
          className="end-election-button"
          onClick={handleEndElection}
          disabled={!anyElectionStarted}
        >
          End the Election
        </button>
      </div>

      <div className="start-election-wrapper">
        <div className="start-form">
          <h2>Start Election</h2>
          <label>Select State*</label>
          <select
            name="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            required
          >
            <option value="">Select State</option>
            {Object.keys(stateDistrictData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <button className="start-button" onClick={handleStart}>
            Start Election
          </button>
        </div>

        <div className="election-containers">
          {electionStates.map((e, index) => (
            <div key={index} className="election-container">
              <h3>{e.state}</h3>
              {!e.stopped ? (
                <button
                  className="stop-button"
                  onClick={() => handleStop(e.state)}
                >
                  Stop Election
                </button>
              ) : (
                <>
                  <p>Election stopped for this state</p>
                  <button
                    className="view-button"
                    onClick={() => handleViewDetails(e.state)}
                  >
                    View Details
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StartElection
