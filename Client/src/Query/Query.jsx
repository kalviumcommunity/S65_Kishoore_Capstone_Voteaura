import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Query.css'

export default function RaiseQuery() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        }

        try {
            const res = await fetch('https://s65-kishoore-capstone-voteaura.onrender.com/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if (res.ok) {
                alert('Thank you for your feedback. We will solve the issue as soon as possible.')
                navigate('/')
            } else {
                alert('Failed to submit query')
            }
        } catch (err) {
            alert('Error in adding query')
            console.error(err)
        }
    }

    return (
        <div className="page-container">
            <Navbar />
            <form onSubmit={handleSubmit} className="query-form">
                <h2>Raise a Query</h2>

                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p><strong>Director</strong></p>
                    <p>Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment</p>
                    <p>Room No. 517, B-II Block, Antyodaya Bhawan,<br />CGO Complex, Lodhi Road, New Delhi - 110003 (India)</p>
                    <p>📞 +91-11-2436 5019</p>
                </div>

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Subject:</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />

                <label>Message:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    required
                />

                <button type="submit">Submit</button>
                
            </form>
        </div>
    )
}
