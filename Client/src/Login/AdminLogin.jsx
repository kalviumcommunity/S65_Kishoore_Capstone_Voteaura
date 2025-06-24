import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminLogin.css'
import Navbar from '../Navbar/AdminNavbar'

const AdminLoginPage = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/admin-login', {
        userid: userId,
        password
      })
      if (res.data.success) {
        navigate('/start')
      }
    } catch (err) {
      console.log('Login failed. Please check your credentials.', err)
    }
  }

  return (
    <div >
      <Navbar />
      <div className="admin-container">
      <form onSubmit={handleSubmit} className="admin-form">
      <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  )
}

export default AdminLoginPage
