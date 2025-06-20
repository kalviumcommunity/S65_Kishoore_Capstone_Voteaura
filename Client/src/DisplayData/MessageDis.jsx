import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import './MessageDis.css'

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/getmessage')
        const data = await res.json()
        setMessages(data)
      } catch (err) {
        console.error('Error fetching messages', err)
      }
    }
    fetchMessages()
  }, [])

  return (
    <div className="messages-page">
      <Navbar />
      <div className="posted-messages">
        <h3>Posted Messages</h3>
        {messages.length === 0 && <p>No messages posted yet.</p>}
        {messages.map(msg => (
          <div key={msg._id} className="posted-box">
            <h4>{msg.heading}</h4>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
