import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/policyholders/${userId}`);
        const data = await response.json();
        if (data.date_of_birth) {
          data.date_of_birth = new Date(data.date_of_birth).toISOString().split('T')[0];
        }
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="p-4 min-h-screen">
      <ProfileForm user={user} setUser={setUser} userId={userId} />
    </div>
  );
};

export default ProfilePage;