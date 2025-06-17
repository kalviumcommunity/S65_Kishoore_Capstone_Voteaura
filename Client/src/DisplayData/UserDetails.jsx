import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/AdminNavbar'

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const district = location.state?.district || '';

  useEffect(() => {
    if (!district) {
      console.error('District is not provided');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users?district=${district}`);
        console.log('Fetched users:', res.data) 
        setUsers(res.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [district]);

  const handleView = (id) => {
    navigate(`/view/${id}`, { state: { district } });
  };

  return (
    <div className="users-container">
        <Navbar/>
      <h1 className='header'>Verification Portal</h1>
      {users.length === 0 ? (
        <p>No data found</p>
      ) : (
        users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-image">
              <img src={`http://localhost:5000/${user.passportImage}`} alt="Passport" />
            </div>
            <div className="user-info">
              <p className='user-name'><strong>Name:</strong> {user.name}</p>
              <p className='user-udid'><strong>UDid:</strong> {user.UDid}</p>
            </div>
            <div className="user-actions">
              {user.status === 'approved' ? (
                <button disabled>Approved</button>
              ) : user.status === 'rejected' ? (
                <button disabled>Rejected</button>
              ) : (
                <button onClick={() => handleView(user._id)}>View</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayUsers;
