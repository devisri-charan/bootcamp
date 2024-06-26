import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PoliciesPage from './PoliciesPage';
import ClaimsPage from './ClaimsPage';
import ProfilePage from './ProfilePage';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import UserHomePage from './UserHomePage';

const UserDashboard = () => {
  const location = useLocation();
  const { name } = location.state || {name: "User"}; // Default to 'User' if no username is passed
  return (
    <div>
      <UserNavbar />
      <main className="p-4">
        <Routes>
          <Route path='' element={<UserHomePage name={name}/>}/>
          <Route path="policies" element={<PoliciesPage />} />
          <Route path="claims" element={<ClaimsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;