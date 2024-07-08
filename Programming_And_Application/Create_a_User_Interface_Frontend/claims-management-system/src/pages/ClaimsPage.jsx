import React, { useEffect, useState } from 'react';
import ClaimList from '../components/ClaimList';
import { useParams } from 'react-router-dom';

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch(`http://localhost:3000/policyholders/${userId}/claims`);
        const data = await response.json();
        const formattedData = data.map(claim => ({
          ...claim,
          date_of_claim: new Date(claim.date_of_claim).toLocaleDateString(),
        }))
        setClaims(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClaims();
  }, [userId]);

  return (
    <div className="p-4 min-h-screen">
      {claims.length != 0 ? (
        <div className='p-4'>
          <ClaimList claims={claims} />
          <button className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
            Claim a Policy
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-4 items-center p-4'>
          <p className="text-center text-xl font-semibold mt-4">You don't have any active claims.</p>
          {/* <button className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
            Claim a Policy
          </button> */}
        </div>)
      }
    </div>
  );
};

export default ClaimsPage;
