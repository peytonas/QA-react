import React from 'react';
import auth0Client from './Auth';
import './Profile.css'

function Profile() {
  return (
    <div className="text-secondary text-center">
      <img src={auth0Client.getProfile().picture} alt="Profile" />
      <h2>{auth0Client.getProfile().nickname}</h2>
    </div>
  )
}

export default Profile;
