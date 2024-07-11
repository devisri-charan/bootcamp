import React, { useState } from 'react';

const PolicyModal = ({ isOpen, onClose, onSubmit }) => {
  const [policyType, setPolicyType] = useState('');
  const [tenure, setTenure] = useState('');
  const [premium, setPremium] = useState('');

  const handlePolicyChange = (e) => {
    const selectedPolicy = e.target.value;
    setPolicyType(selectedPolicy);

    // Logic to set premium based on selected policy
    let calculatedPremium = '';
    switch (selectedPolicy) {
      case 'Life Insurance':
        calculatedPremium = '500';
        break;
      case 'Home Insurance':
        calculatedPremium = '300';
        break;
      case 'Health Insurance':
        calculatedPremium = '200';
        break;
      case 'Motor Insurance':
        calculatedPremium = '150';
        break;
      case 'Travel Insurance':
        calculatedPremium = '100';
        break;
      default:
        calculatedPremium = '';
    }
    setPremium(calculatedPremium);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ policyType, tenure, premium });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Buy New Policy</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="policyType" className="block text-sm font-medium mb-2">Policy Type</label>
            <select
              id="policyType"
              value={policyType}
              onChange={handlePolicyChange}
              className="w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus"
            >
              <option value="" disabled>Select type of Insurance</option>
              <option value="Life Insurance">Life Insurance</option>
              <option value="Home Insurance">Home Insurance</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Motor Insurance">Motor Insurance</option>
              <option value="Travel Insurance">Travel Insurance</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="tenure" className="block text-sm font-medium mb-2">Tenure (Years)</label>
            <input
              type="number"
              id="tenure"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="premium" className="block text-sm font-medium mb-2">Premium</label>
            <input
              type="text"
              id="premium"
              value={premium}
              readOnly
              className="w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white py-2 px-4 rounded-xl mr-2 hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-citrus text-white py-2 px-4 rounded-xl hover:bg-midnight transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PolicyModal;