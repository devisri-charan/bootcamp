import React from 'react'
import HeroSection from '../components/HeroSection';
import Policies from '../components/Policies';
import { policies } from '../data';

const AdminHomePage = () => {
    return (
        <div>
            <HeroSection name={"Admin"} />
            <Policies policies={policies} />
        </div>
    )
}

export default AdminHomePage