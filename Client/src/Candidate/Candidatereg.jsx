import React, { useState } from 'react'
import './Candidatereg.css'
import Navbar from '../Navbar/AdminNavbar'
import { stateDistrictData } from "../stateDistrict"
import { useNavigate } from 'react-router-dom'

export default function AddCandidatePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [partyname, setPartyname] = useState('')
  const [profileimg, setProfileimg] = useState(null)
  const [partyimg, setPartyimg] = useState(null)
  const [selectedState, setSelectedState] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('partyname', partyname.trim())
    formData.append('profileimg', profileimg)
    formData.append('partyimg', partyimg)
    formData.append('state', selectedState)
    formData.append('district', selectedDistrict)

    try {
      const res = await fetch('http://localhost:5000/api/addCandidate', {
        method: 'POST',
        body: formData
      })
      alert('Candidate added Successfully',res)
      navigate('/adland')
    } catch (err) {
      alert('Error in Adding Candidate',err)
    }
  }

  return (
    <div className="candidate-page">
      <Navbar />
      <main className="candidate-body">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="candidate-form">
          <h2 className="form-heading">Add Candidate</h2>
          <div className="field-group">
            <label htmlFor="candidate-name" className="field-label">Candidate Name</label>
            <input
              id="candidate-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Enter candidate name"
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label htmlFor="party-name" className="field-label">Party Name</label>
            <input
              id="party-name"
              type="text"
              value={partyname}
              onChange={e => setPartyname(e.target.value)}
              required
              placeholder="Enter party name"
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label htmlFor="profile-img" className="field-label">Candidate Profile Image</label>
            <input
              id="profile-img"
              type="file"
              accept="image/*"
              onChange={e => setProfileimg(e.target.files[0])}
              required
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label htmlFor="party-img" className="field-label">Party Image</label>
            <input
              id="party-img"
              type="file"
              accept="image/*"
              onChange={e => setPartyimg(e.target.files[0])}
              required
              className="field-input"
            />
          </div>

          <div className="field-group">
            <label className="field-label">Select State*</label>
            <select
              name="state"
              value={selectedState}
              onChange={(e) => {
                const state = e.target.value
                setSelectedState(state)
                setDistricts(stateDistrictData[state] || [])
                setSelectedDistrict('')
              }}
              required
              className="field-input"
            >
              <option value="">Select State</option>
              {Object.keys(stateDistrictData).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label className="field-label">Select District*</label>
            <select
              name="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              required
              className="field-input"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">Add Candidate</button>
        </form>
      </main>
    </div>
  )
}
