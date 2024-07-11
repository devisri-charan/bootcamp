import React, { useEffect, useState } from 'react';
import PolicyList from '../components/PolicyList';
import { useParams } from 'react-router-dom';
import PolicyModal from '../components/PolicyModal';
import ClaimModal from '../components/ClaimModal';

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`https://bootcamp-y8br.onrender.com/policyholders/${userId}/policies`);
        const data = await response.json();
        const formattedData = data.map(policy => ({
          ...policy,
          start_date: new Date(policy.start_date).toLocaleDateString(),
          end_date: new Date(policy.end_date).toLocaleDateString(),
        }));

        setPolicies(formattedData);
      }
      catch (error) {
        console.log("Error fetching user policies", error);
      }
    };
    fetchPolicies();
  }, [userId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenClaimModal = (policy) => {
    setSelectedPolicy(policy);
    setIsClaimModalOpen(true);
  };

  const handleCloseClaimModal = () => {
    setIsClaimModalOpen(false);
    setSelectedPolicy(null);
  };

  const handleSubmitPolicy = async (policyData) => {
    const { policyType, tenure, premium } = policyData;
    const start_date = new Date();
    const end_date = new Date();
    end_date.setFullYear(start_date.getFullYear() + parseInt(tenure, 10));

    // Logic to set coverage based on selected policy
    let coverage = '';
    switch (policyType) {
      case 'Life Insurance':
        coverage = 10000000;
        break;
      case 'Home Insurance':
        coverage = 5000000;
        break;
      case 'Health Insurance':
        coverage = 5000000;
        break;
      case 'Motor Insurance':
        coverage = 100000;
        break;
      case 'Travel Insurance':
        coverage = 100000;
        break;
      default:
        coverage = 0;
    }

    const policy = {
      policyholder_id: userId,
      policy_type: policyType,
      start_date: start_date.toISOString().split('T')[0],
      end_date: end_date.toISOString().split('T')[0],
      coverage,
      premium
    };

    try {
      const response = await fetch('https://bootcamp-y8br.onrender.com/policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(policy)
      });

      if (response.ok) {
        const newPolicy = await response.json();
        setPolicies([...policies, newPolicy]);
        handleCloseModal();
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.errors);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitClaim = async (claimData) => {
    console.log("Submitted claim data:", claimData);

    const { amount, reason } = claimData;
    const claim = {
      policy_id: selectedPolicy.policy_id,
      policyholder_id: userId,
      date_of_claim: new Date().toISOString().split('T')[0],
      claim_amount: amount,
      reason_of_claim: reason,
    };

    console.log(claim);

    try {
      const response = await fetch('https://bootcamp-y8br.onrender.com/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(claim)
      });

      if (response.ok) {
        const newClaim = await response.json();
        console.log('Claim submitted:', newClaim);
        handleCloseClaimModal();
      } else {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          console.error('Error:', errorData.errors);
        } catch (e) {
          console.error('Error:', errorText);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      {policies.length != 0 ? (
        <div className='p-4'>
          <PolicyList policies={policies} onClaimClick={handleOpenClaimModal} />
          <button onClick={handleOpenModal} className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
            Buy New Policy
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-4 items-center p-4'>
          <p className="text-center text-xl font-semibold mt-4">You don't have any active policies.</p>
          <button onClick={handleOpenModal} className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200">
            Buy New Policy
          </button>
        </div>
      )}
      <PolicyModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitPolicy} />
      <ClaimModal isOpen={isClaimModalOpen} onClose={handleCloseClaimModal} onSubmit={handleSubmitClaim} />
    </div>
  );
};

export default PoliciesPage;