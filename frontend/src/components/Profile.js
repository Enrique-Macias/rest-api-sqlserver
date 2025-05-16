import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';
import Navbar from './Navbar';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setUser(userInfo);
  }, [navigate]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-loading">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.FirstName.charAt(0)}{user.LastName.charAt(0)}
            </div>
            <h2>{user.FirstName} {user.LastName}</h2>
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <FaIdCard className="info-icon" />
              <div className="info-content">
                <label>User ID</label>
                <span>{user.UserID}</span>
              </div>
            </div>

            <div className="info-item">
              <FaUser className="info-icon" />
              <div className="info-content">
                <label>Full Name</label>
                <span>{user.FirstName} {user.LastName}</span>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div className="info-content">
                <label>Email</label>
                <span>{user.Email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile; 