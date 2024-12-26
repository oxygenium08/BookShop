import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ tokens }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (tokens.access) {
      axios.get('http://127.0.0.1:8000/api/auth/profile/', {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [tokens]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Профиль</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default Profile;
