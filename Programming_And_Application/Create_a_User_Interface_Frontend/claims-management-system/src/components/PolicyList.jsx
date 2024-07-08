import React from 'react';

const PolicyList = ({ policies, onClaimClick}) => {
  return (
    <div >
      <h1 className="text-citrus text-2xl font-bold text-left mb-4">Your Policies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {policies.map((policy) => (
          <div key={policy.policy_id} className="bg-frost p-6 rounded-2xl shadow-md flex flex-col justify-between h-full">
            <h1 className="text-2xl font-bold mb-2 text-citrus">{policy.policy_id}</h1>
            <h2 className="text-lg mb-2">{policy.policy_type}</h2>
            <p className='text-lg mb-2'>Start Date: {policy.start_date}</p>
            <p className='text-lg mb-2'>End Date: {policy.end_date}</p>
            <p className='text-lg mb-2'><strong>Premium:</strong> {policy.premium}</p>
            <p className='text-lg mb-2'><strong>Coverage:</strong> {policy.coverage}</p>
            {/* <button className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
              Pay Premium
            </button> */}
            <button onClick={() => onClaimClick(policy)} className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
              Claim Insurance
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyList;