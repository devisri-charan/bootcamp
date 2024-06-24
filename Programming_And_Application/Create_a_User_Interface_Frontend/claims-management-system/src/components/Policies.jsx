import React from 'react';
import { car, home, family } from '../assets';

const Policies = () => {
    return (
        <section className="policies pb-16 px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Insurance Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-frost p-6 rounded-2xl shadow-md">
                    <img src={family} alt='Life Insurance' className='w-33vw mb-4 rounded-2xl h-[250px]'/>
                    <h3 className="text-2xl font-bold mb-4 text-citrus">Life Insurance</h3>
                    <p className="text-textSecondary text-lg mb-4">Comprehensive coverage for life's uncertainties.</p>
                    <p className="text-textSecondary">Protect your loved ones with our comprehensive life insurance policies, offering peace of mind and financial security.</p>
                </div>
                <div className="bg-frost p-6 rounded-2xl shadow-md">
                    <img src={car} alt='Auto Insurance' className='w-33vw mb-4 rounded-2xl h-[250px]'/>
                    <h3 className="text-2xl font-bold mb-4 text-citrus">Auto Insurance</h3>
                    <p className="text-textSecondary text-lg mb-4">Protect your vehicle with our insurance plans.</p>
                    <p className="text-textSecondary">Stay protected on the road with our auto insurance policies, offering coverage for accidents, theft, and more.</p>
                </div>
                <div className="bg-frost p-6 rounded-2xl shadow-md">
                    <img src={home} alt='Home Insurance' className='w-33vw mb-4 rounded-2xl h-[250px]'/>
                    <h3 className="text-2xl font-bold mb-4 text-citrus">Home Insurance</h3>
                    <p className="text-textSecondary text-lg mb-4">Protect your vehicle with our insurance plans.</p>
                    <p className="text-textSecondary">Ensure your home is protected from unexpected events with our comprehensive home insurance policies.</p>
                </div>
            </div>
        </section>)
}

export default Policies