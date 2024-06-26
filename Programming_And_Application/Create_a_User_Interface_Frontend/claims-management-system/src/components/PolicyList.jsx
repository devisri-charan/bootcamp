import React from 'react';

const PolicyList = ({ policies }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Policies</h2>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id} className="mb-2 border-b pb-2">
            <p>Policy Name: {policy.name}</p>
            <p>Policy Number: {policy.number}</p>
          </li>
        ))}
      </ul>
      <button className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
        Buy New Policy
      </button>
    </div>
  );
};

export default PolicyList;