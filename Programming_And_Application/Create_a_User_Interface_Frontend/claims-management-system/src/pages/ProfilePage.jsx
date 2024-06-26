import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch user profile from API
    const fetchUserProfile = async () => {
      // Example data
      const response = await fetch('http://localhost:3000/policyholder');
      const data = await response.json();
      setUser(data);
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
