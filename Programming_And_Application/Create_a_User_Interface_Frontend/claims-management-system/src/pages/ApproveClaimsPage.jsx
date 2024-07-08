import React, { useEffect, useState } from 'react';
import ClaimApprovalList from '../components/ClaimApprovalList';

const ApproveClaimsPage = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    // Fetch pending claims from API
    const fetchClaims = async () => {
      const response = await fetch('https://bootcamp-y8br.onrender.com/claims');
      const data = await response.json();
      setClaims(data);
    };
    fetchClaims();
  }, []);
  const handleApprove = async (claimId) => {
    // Approve claim API call
    await fetch(`https://bootcamp-y8br.onrender.com/claims/${claimId}/approve`, { method: 'PUT' });
    setClaims(claims.filter(claim => claim.claim_id !== claimId));
  };

  const handleReject = async (claimId) => {
    // Reject claim API call
    await fetch(`https://bootcamp-y8br.onrender.com/claims/${claimId}/reject`, { method: 'PUT' });
    setClaims(claims.filter(claim => claim.claim_id !== claimId));
  };

  return (
    <div className="p-4 min-h-screen">
      {claims.length != 0 ? (
        <div className='p-4'>
          <ClaimApprovalList claims={claims} onApprove={handleApprove} onReject={handleReject} />
        </div>) :
        (
          <div className='flex flex-col gap-4 items-center p-4'>
            <p className="text-center text-xl font-semibold mt-4">There are no pending claims.</p>
          </div>
        )
      }
    </div>
  )
}

export default ApproveClaimsPage