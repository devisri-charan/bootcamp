import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = ({ name }) => {
    return (
        <section className="bg-frost text-bold text-center py-24">
            {name ? <h1 className="text-5xl font-bold mb-4">Welcome, {name}</h1> : <h1 className="text-5xl font-bold mb-4">Welcome to SecureLife Insurance</h1>}
            <p className="text-xl mb-8">Protecting your future, today.</p>
            <Link to='/login'><button className="bg-citrus hover:bg-midnight transition duration-200 text-frost px-8 py-3 rounded-2xl">Get Started</button></Link>
        </section>
    )
}

export default HeroSection