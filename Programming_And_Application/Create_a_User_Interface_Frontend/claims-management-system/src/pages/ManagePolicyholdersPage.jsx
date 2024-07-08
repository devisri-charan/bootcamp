import React, { useEffect, useState } from 'react';
import PolicyholderList from '../components/PolicyholderList';

const ManagePolicyholdersPage = () => {
  const [policyholders, setPolicyholders] = useState([]);

  useEffect(() => {
    // Fetch policyholders from API
    const fetchPolicyholders = async () => {
      const response = await fetch('https://bootcamp-y8br.onrender.com/policyholders');
      const data = await response.json();
      const formattedData = data.map(policyholder => ({
        ...policyholder,
        date_of_birth: new Date(policyholder.date_of_birth).toLocaleDateString(),
      }));
      setPolicyholders(formattedData);
    };
    fetchPolicyholders();
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <PolicyholderList policyholders={policyholders} />
    </div>
  );
}

export default ManagePolicyholdersPage;