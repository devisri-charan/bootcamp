import React from 'react'
import HeroSection from '../components/HeroSection';
import Policies from '../components/Policies';

const UserHomePage = ({name}) => {
  return (
    <div>
        <HeroSection name={name}/>
        <Policies/>
    </div>
  )
}

export default UserHomePage