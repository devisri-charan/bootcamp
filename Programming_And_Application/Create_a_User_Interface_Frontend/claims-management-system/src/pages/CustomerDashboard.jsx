import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';

const CustomerDashboard = () => {
  const { userId } = useParams();

  return (
    <div>
      <Navbar />
      <div className='min-h-screen flex items-center justify-center'>
        <h1 className='text-3xl font-bold'>Welcome, User {userId}</h1>
      </div>
    </div>
  );
}

export default CustomerDashboard