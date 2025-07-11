import { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { stateDistrictData } from "../stateDistrict"
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/AdminNavbar'

export default function AdminLoginPage() {
  const navigate=useNavigate()
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [selectedState, setSelectedState] = useState("")
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://s65-kishoore-capstone-voteaura.onrender.com/api/login', {userid,password,selectedState,selectedDistrict})
      localStorage.setItem('adminToken', response.data.token)
      setMessage(response.data.message)
      navigate('/user', { state: { district: selectedDistrict } })
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="page">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="title">Admin Login</h2>
          <div className="field">
            <label className="label">User ID</label>
            <input type="text" value={userid} onChange={(e) => setUserid(e.target.value)} required className="input" />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
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
                onchange={(e)=>setDistricts(e.ditritt )}
              >
            <option value="">Select District</option>
              {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
              ))}
            </select>
        </div>
          <button type="submit" className="button">Login</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  )
}

