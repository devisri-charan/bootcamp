import React from 'react'

const PolicyholderList = ({ policyholders }) => {
    return (
        <div className='p-4'>
            <h2 className="text-citrus text-2xl font-bold text-left mb-4">Policyholders</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {policyholders.map((policyholder) => (
                    <div key={policyholder.policyholder_id} className="bg-frost p-6 rounded-2xl shadow-md flex flex-col justify-between h-full">
                        <h1 className="text-2xl font-bold mb-2 text-citrus">{policyholder.policyholder_id}</h1>
                        <h2 className="text-lg mb-2"><strong>Name: </strong>{policyholder.name}</h2>
                        <h2 className="text-lg mb-2"><strong>Date of Birth: </strong>{policyholder.date_of_birth}</h2>
                        <p className='text-lg mb-2'><strong>Address: </strong>{policyholder.address}</p>
                        <p className='text-lg mb-2'><strong>Phone: </strong>{policyholder.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PolicyholderList