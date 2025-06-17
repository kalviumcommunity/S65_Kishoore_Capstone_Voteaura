import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './VoteLogin.css'
import Navbar from '../Navbar/Navbar'

const VoteLogin = () => {
  const navigate = useNavigate()
  const [UDid, setUDid] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/votenow', { UDid, password })
      const userState = res.data.userState
      localStorage.setItem('userState', userState)
      navigate('/candidatedis')
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert(error.response.data.message || 'Election is not active for your state.')
        } else if (error.response.status === 401 && error.response.data.message === 'Already logged in') {
          alert('You have already logged in once. You cannot login again.')
        } else {
          alert(error.response.data.message || 'Incorrect UDid or password')
        }
      } else {
        alert('Network error. Please try again later.')
      }
    }
  }

  return (
    <div className="pagee">
      <Navbar/>
      <form className="formm" onSubmit={handleSubmit}>
        <h2 className="title">Voter Login</h2>
        <div className="form-group">
          <label className="label">UDID:</label>
          <input
            type="text"
            className="input"
            value={UDid}
            onChange={(e) => setUDid(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  )
}

export default VoteLogin
