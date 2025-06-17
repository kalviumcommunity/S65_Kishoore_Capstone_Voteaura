import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/AdminNavbar";
import "./View.css";

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [showReasonBox, setShowReasonBox] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
      setCandidate(res.data);
    });
  }, [id]);

  const handleAccept = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/status`, {
        status: "approved",
      });
      alert("Candidate Accepted");
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectClick = () => {
    setShowReasonBox(true);
  };

  const handleSendRejection = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/users/${id}/reject`, {
        reason: rejectionReason,
      });
      alert("Candidate Rejected and Notified");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Failed to reject candidate");
    }
  };

  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="candidate-details-page">
      <Navbar />
      <div className="details-container">
        <h2>Candidate Details</h2>
        <p><strong>Full Name:</strong> {candidate.name}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Phone:</strong> {candidate.phone}</p>
        <p><strong>UDID:</strong> {candidate.UDid}</p>
        <p><strong>State:</strong> {candidate.state}</p>
        <p><strong>District:</strong> {candidate.district}</p>

        <div className="image-section">
          <p><strong>Profile Photo:</strong></p>
          {candidate.passportImage && (
            <img src={`http://localhost:5000/${candidate.passportImage}`} alt="Profile" />
          )}
        </div>

        <div className="image-section">
          <p><strong>ID Proof Images:</strong></p>
          {candidate.proof?.map((img, index) => (
            <img key={index} src={`http://localhost:5000/${img}`} alt={`ID Proof ${index + 1}`} />
          ))}
        </div>

        <div className="image-section">
          <p><strong>UDID Images:</strong></p>
          {candidate.UDidimg?.map((img, index) => (
            <img key={index} src={`http://localhost:5000/${img}`} alt={`UDID ${index + 1}`} />
          ))}
        </div>

        <div className="action-buttons">
          <button className="accept-btn" onClick={handleAccept}>Accept</button>
          <button className="reject-btn" onClick={handleRejectClick}>Reject</button>
        </div>

        {showReasonBox && (
          <div className="rejection-box">
            <textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              cols={50}
            />
            <button className="send-reason-btn" onClick={handleSendRejection}>
              Send Reason & Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
