import React, { useEffect, useState } from 'react';
import PolicyList from '../components/PolicyList';

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Fetch policies from API
    const fetchPolicies = async () => {
      // Example data
      const response = await fetch('http://localhost:3000/policies');
      const data = await response.json();
      setPolicies(data);
    };
    fetchPolicies();
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <PolicyList policies={policies} />
    </div>
  );
};

export default PoliciesPage;