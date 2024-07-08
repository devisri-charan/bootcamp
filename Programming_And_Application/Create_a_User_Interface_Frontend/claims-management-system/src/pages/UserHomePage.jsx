import React from 'react'
import HeroSection from '../components/HeroSection';
import Policies from '../components/Policies';
import { policies } from '../data';

const UserHomePage = ({name}) => {
  return (
    <div>
        <HeroSection name={name}/>
        <Policies policies={policies}/>
    </div>
  )
}

export default UserHomePage