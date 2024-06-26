import React from 'react';

const ClaimList = ({ claims }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Claims</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim.id} className="mb-2 border-b pb-2">
            <p>Claim ID: {claim.id}</p>
            <p>Status: {claim.status}</p>
          </li>
        ))}
      </ul>
      <button className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
        Report New Claim
      </button>
    </div>
  );
};

export default ClaimList;
