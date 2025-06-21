import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/AdminNavbar'
import './QueryData.css';

export default function QueryData() {
  const [queries, setQueries] = useState([])
  const [expandedId, setExpandedId] = useState(null);
  const [actionId, setActionId] = useState(null)
  const [responseMessage, setResponseMessage] = useState('')

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/getquery');
        const data = await res.json()
        const sorted = data.sort((a, b) => a.solved - b.solved)
        setQueries(sorted)
      } catch (err) {
        console.error('Error fetching queries:', err)
      }
    }
    fetchQueries()
  }, [])

  const handleSendMessage = async (query) => {
    try {
      const res = await fetch('http://localhost:5000/api/sendqueryresponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: query.email,
          subject: `Response to your query: ${query.subject}`,
          message: responseMessage
        })
      })

      if (res.ok) {
        await fetch(`http://localhost:5000/api/marsolved/${query._id}`, {
          method: 'PUT'
        })

        alert('Message sent and marked as solved')
        setResponseMessage('')
        setActionId(null)
        setQueries(prev =>
          [...prev.map(q =>
            q._id === query._id ? { ...q, solved: true } : q
          )].sort((a, b) => a.solved - b.solved)
        )
      } else {
        alert('Failed to send message')
      }
    } catch (err) {
      console.error('Error sending message:', err)
      alert('Failed to send message')
    }
  }

  return (
    <div className="query-page">
      <Navbar />
      <h2 className="query-heading">All Queries</h2>
      <div className="query-list">
        {queries.map((query) => (
          <div key={query._id} className="query-card">
            <div className="query-subject">{query.subject}</div>
            <div className="query-actions">
              {query.solved ? (
                <button disabled>Solved</button>
              ) : expandedId === query._id ? (
                actionId === query._id ? (
                  <>
                    <p><strong>Email:</strong> {query.email}</p>
                    <p><strong>Message:</strong> {query.message}</p>
                    <textarea
                      rows="3"
                      className="query-textarea"
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      placeholder="Type your message here..."
                    />
                    <button onClick={() => handleSendMessage(query)}>Send Message</button>
                  </>
                ) : (
                  <>
                    <p><strong>Email:</strong> {query.email}</p>
                    <p><strong>Message:</strong> {query.message}</p>
                    <button onClick={() => setActionId(query._id)}>Take Action</button>
                  </>
                )
              ) : (
                <button onClick={() => setExpandedId(query._id)}>View</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
