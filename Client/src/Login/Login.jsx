import { useState } from 'react'
import axios from 'axios'
import './Login.css'

export default function AdminLoginPage() {
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/admin/login', { userid, password, state, district })
      localStorage.setItem('adminToken', response.data.token)
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed')
    }
  }

  return (
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
        <div className="field">
          <label className="label">State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="input" />
        </div>
        <div className="field">
          <label className="label">District</label>
          <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required className="input" />
        </div>
        <button type="submit" className="button">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}
