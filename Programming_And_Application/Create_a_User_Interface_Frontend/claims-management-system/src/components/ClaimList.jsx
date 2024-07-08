import React from 'react';

const ClaimList = ({ claims }) => {
  return (
    <div>
      <h1 className="text-citrus text-2xl font-bold text-left mb-4">Your Claims</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {claims.map((claim) => (
          <div key={claim.claim_id} className="bg-frost p-6 rounded-2xl shadow-md flex flex-col justify-between h-full">
            <h1 className="text-2xl font-bold mb-2 text-citrus">{claim.claim_id}</h1>
            <p className='text-lg mb-2'>Policy ID: {claim.policy_id}</p>
            <p className='text-lg mb-2'>Date of Claim: {claim.date_of_claim}</p>
            <p className='text-lg mb-2'>Amount: {claim.claim_amount}</p>
            <p className='text-lg mb-2'><strong>Status:</strong> {claim.status}</p>
            <p className='text-lg mb-2'><strong>Reason:</strong> {claim.reason_of_claim}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimList;
