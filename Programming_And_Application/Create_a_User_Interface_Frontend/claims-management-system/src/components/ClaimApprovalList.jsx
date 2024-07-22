import React from 'react'

const ClaimApprovalList = ({ claims, onApprove, onReject }) => {
    return (
        <div>
            <h2 className="text-citrus text-2xl font-bold text-left mb-4">Pending Claims</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {claims.map((claim) => (
                    <div key={claim.claim_id} className="bg-frost p-6 rounded-2xl shadow-md flex flex-col justify-between h-full">
                        <h2 className='text-2xl font-bold mb-2 text-citrus'>{claim.claim_id}</h2>
                        <p className='text-lg mb-2'><strong>Policyholder ID:</strong> {claim.policyholder_id}</p>
                        <p className='text-lg mb-2'><strong>Policy ID:</strong> {claim.policy_id}</p>
                        <p className='text-lg mb-2'><strong>Status: </strong>{claim.status}</p>
                        <p className='text-lg mb-2'><strong>Reason of Claim: </strong>{claim.reason_of_claim}</p>
                        <div className='mt-2'>
                            <button
                                onClick={() => onApprove(claim.claim_id)}
                                className="bg-green-500 text-white py-2 px-4 mr-2 rounded-xl">
                                Approve
                            </button>
                            <button
                                onClick={() => onReject(claim.claim_id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-xl">
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClaimApprovalList