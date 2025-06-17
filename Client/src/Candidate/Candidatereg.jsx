import React, { useState } from 'react';
import './Candidatereg.css';
import Navbar from '../Navbar/AdminNavbar';
import { stateDistrictData } from "../stateDistrict"
import { useNavigate } from 'react-router-dom';

export default function AddCandidatePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [partyname, setPartyname] = useState('')
  const [profileimg, setProfileimg] = useState(null)
  const [partyimg, setPartyimg] = useState(null)
  const [selectedState, setSelectedState] = useState("")
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('partyname', partyname.trim())
    formData.append('profileimg', profileimg)
    formData.append('partyimg', partyimg)
    formData.append('state',selectedState)
    formData.append('district',selectedDistrict)

    try {
      const res = await fetch('http://localhost:5000/api/addCandidate', {
        method: 'POST',
        body: formData,
      });
      console.log(res)
      alert('Candidate added Successfully',res)
      navigate('/admin')

    } catch (err) {
        alert('Error in Adding Candidate',err)

    }
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="page-content">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
        <h2 className="page-title">Add Candidate</h2>
          <div className="form-group">
            <label className="label" htmlFor="candidate-name">Candidate Name</label>
            <input
              id="candidate-name"
              className="input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Enter candidate name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="party-name">Party Name</label>
            <input
              id="party-name"
              className="input"
              type="text"
              value={partyname}
              onChange={e => setPartyname(e.target.value)}
              required
              placeholder="Enter party name"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="profile-img">Candidate Profile Image</label>
            <input
              id="profile-img"
              className="input"
              type="file"
              accept="image/*"
              onChange={e => setProfileimg(e.target.files[0])}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="party-img">Party Image</label>
            <input
              id="party-img"
              className="input"
              type="file"
              accept="image/*"
              onChange={e => setPartyimg(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
              <label>Select State*</label>
                <select
                 name="state"
                 value={selectedState}
                 onChange={(e) => {
                    const state = e.target.value
                    setSelectedState(state)
                    setDistricts(stateDistrictData[state] || [])
                    setSelectedDistrict("")
                    }}
                    required
                  >
                  <option value="">Select State</option>
                    {Object.keys(stateDistrictData).map((state) => (
                      <option key={state} value={state}>{state}</option>
                        ))}
                  </select>
          </div>
          <div className="form-group">
              <label>Select District*</label>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  required
                >
                <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                    ))}
                </select>
          </div>

          <button type="submit" className="button">Add Candidate</button>
        </form>
      </main>
    </div>
  );
}



