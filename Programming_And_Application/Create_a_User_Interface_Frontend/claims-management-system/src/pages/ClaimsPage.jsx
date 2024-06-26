import React, { useEffect, useState } from 'react';
import ClaimList from '../components/ClaimList';

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    // Fetch claims from API
    const fetchClaims = async () => {
      // Example data
      const response = await fetch('http://localhost:3000/claims');
      const data = await response.json();
      setClaims(data);
    };
    fetchClaims();
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <ClaimList claims={claims} />
    </div>
  );
};

export default ClaimsPage;
