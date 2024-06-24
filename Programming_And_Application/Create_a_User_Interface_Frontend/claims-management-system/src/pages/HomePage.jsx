import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Policies from '../components/Policies'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Policies />
      <Footer />
    </div>
  )
}

export default HomePage