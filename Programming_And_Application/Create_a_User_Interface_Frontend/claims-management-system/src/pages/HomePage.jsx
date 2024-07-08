import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Policies from '../components/Policies'
import Footer from '../components/Footer'
import { policies } from '../data';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Policies policies={policies}/>
      <Footer />
    </div>
  )
}

export default HomePage