import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Start.css'
import Navbar from '../Navbar/AdminNavbar'
import { stateDistrictData } from '../stateDistrict'

const StartElection = () => {
  const [selectedState, setSelectedState] = useState('')
  const [electionStates, setElectionStates] = useState([])
  const navigate = useNavigate()

  const fetchElectionStates = async () => {
    const res = await axios.get('http://localhost:5000/api/all')
    setElectionStates(res.data)
  }

  useEffect(() => {
    fetchElectionStates()
  }, [])

  const handleStart = async () => {
    if (!selectedState) return alert('Please select a state')
    try {
      await axios.post('http://localhost:5000/api/start', { state: selectedState })
      fetchElectionStates()
    } catch (err) {
      alert(err.response?.data?.message || 'Error starting election')
    }
  }

  const handleStop = async (state) => {
    await axios.post('http://localhost:5000/api/stop', { state })
    fetchElectionStates()
  }

  const handleEndElection = async () => {
    await axios.post('http://localhost:5000/api/end-all')
    fetchElectionStates()
  }

  const handleViewDetails = (state) => {
    localStorage.setItem('userState', state)
    navigate('/viewdetails')
  }

  const anyElectionStarted = electionStates.length > 0

  return (
    <div className="start-election-page">
      <Navbar />
      <div className="end-election-wrapper">
        <button className="end-election-button" onClick={handleEndElection} disabled={!anyElectionStarted}>
          End the Election
        </button>
      </div>
      <div className="start-election-wrapper">
        <div className="start-form">
          <h2>Start Election</h2>
          <label>Select State*</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {Object.keys(stateDistrictData).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <button className="start-button" onClick={handleStart}>Start Election</button>
        </div>
        <div className="election-containers">
          {electionStates.map((e, index) => (
            <div key={index} className="election-container">
              <h3>{e.state}</h3>
              {!e.stopped ? (
                <button className="stop-button" onClick={() => handleStop(e.state)}>
                  Stop Election
                </button>
              ) : (
                <>
                  <p>Election stopped for this state</p>
                  <button className="view-button" onClick={() => handleViewDetails(e.state)}>
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
