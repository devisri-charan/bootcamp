import React from 'react';

const Policies = ({ policies }) => {
    return (
        <section className="bg-pearl pb-16 px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Insurance Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {policies.map((policy, index) => (
                    <div key={index} className="bg-frost p-6 rounded-2xl shadow-md flex flex-col justify-between h-full">
                        <div>
                            <img src={policy.img} alt={policy.title} className='w-full mb-4 rounded-2xl h-[250px] object-cover' />
                            <h1 className="text-2xl font-bold mb-2 text-citrus">{policy.title}</h1>
                            <h2 className="text-lg mb-2">{policy.subtitle}</h2>
                            <p className="mb-4">{policy.description}</p>
                            <p><span className="font-bold">Tenure:</span> {policy.tenure}</p>
                            <p><span className="font-bold">Coverage:</span> {policy.coverage}</p>
                            <p><span className="font-bold">Premium:</span> {policy.premium}</p>
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">Benefits:</h3>
                                <ul className="list-disc list-inside text-textSecondary">
                                    {policy.benefits.map((benefit, idx) => (
                                        <li key={idx}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">Terms & Conditions:</h3>
                                <p className="text-textSecondary">{policy.termsAndConditions}</p>
                            </div>
                        </div>
                        {/* <button className="mt-4 bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200 self-start">
                            Buy Policy
                        </button> */}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Policies;
