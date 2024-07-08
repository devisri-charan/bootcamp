import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import ApproveClaimsPage from './ApproveClaimsPage';
import ManagePolicyholdersPage from './ManagePolicyholdersPage';
import AdminHomePage from './AdminHomePage';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <main className='p-4 bg-pearl'>
        <Routes>
          <Route path="" element={<AdminHomePage/>} />
          <Route path="approve-claims" element={<ApproveClaimsPage />} />
          <Route path="manage-policyholders" element={<ManagePolicyholdersPage />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default AdminDashboard