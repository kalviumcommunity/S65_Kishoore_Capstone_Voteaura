import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/AdminNavbar'
import './Message.css'

export default function RaiseQuery() {
    const [heading, setHeading] = useState('')
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('https://s65-kishoore-capstone-voteaura.onrender.com/api/getmessage')
                const data = await res.json()
                setMessages(data)
            } catch (err) {
                console.error('Error fetching messages', err)
            }
        }
        fetchMessages()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('https://s65-kishoore-capstone-voteaura.onrender.com/api/createmessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ heading: heading.trim(), text: text.trim() })
            })
            if (res.ok) {
                const newMessage = await res.json()
                setMessages([newMessage, ...messages])
                setHeading('')
                setText('')
            } else {
                alert('Failed to submit')
            }
        } catch {
            alert('Error in adding message')
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://s65-kishoore-capstone-voteaura.onrender.com/api/deletemessage/${id}`, { method: 'DELETE' })
            if (res.ok) setMessages(messages.filter(msg => msg._id !== id))
            else alert('Failed to delete')
        } catch (err) {
            console.error('Error deleting message', err)
        }
    }

    return (
        <div className="page-container">
            <Navbar />
            <form onSubmit={handleSubmit} className="message-form">
                <h2>Raise a Query</h2>
                <label>Heading:</label>
                <input
                    type="text"
                    value={heading}
                    onChange={e => setHeading(e.target.value)}
                    required
                />
                <label>Text:</label>
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows="6"
                    required
                />
                <button type="submit">Post Information</button>
            </form>

            <div className="messages-list">
                <h3>Posted Messages</h3>
                {messages.length === 0 ? (
                    <p>No messages posted yet.</p>
                ) : (
                    messages.map(msg => (
                        <div key={msg._id} className="message-box">
                            <h4>{msg.heading}</h4>
                            <p>{msg.text}</p>
                            <button onClick={() => handleDelete(msg._id)}>Remove</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
