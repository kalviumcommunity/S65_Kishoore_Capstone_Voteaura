import React from 'react';
import Navbar from '../Navbar/AdminNavbar';

export default function adLand() {
  return (
    <>
      <style>
        {`
          .admin-landing-page {
            background: linear-gradient(to right, #fbe9d7, #f1cfa7);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 80px;
          }

          .admin-landing-content {
            text-align: center;
            color: #333;
            padding: 20px;
          }

          .admin-landing-content h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }

          .admin-landing-content p {
            font-size: 1.2rem;
            margin-bottom: 30px;
          }

          .admin-landing-image {
            width: 300px;
            max-width: 80%;
            height: auto;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>

      <div className="admin-landing-page">
        <Navbar />
        <div className="admin-landing-content">
          <h1>Welcome to VoteAura Admin Panel</h1>
          <p>Manage elections, candidates, and queries efficiently.</p>
          <img src="/image/Vote.png" alt="VoteAura" className="admin-landing-image" />
        </div>
      </div>
    </>
  );
}
