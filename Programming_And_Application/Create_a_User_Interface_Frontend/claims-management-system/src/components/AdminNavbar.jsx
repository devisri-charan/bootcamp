import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { name } = location.state || { name: "User" };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleNavigation = (path) => {
        navigate(path, { state: { name } });
    };

    return (
        <nav className="bg-citrus text-frost px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
                <button onClick={() => handleNavigation('')}>SecureLife Insurance</button>
            </div>
            <div className='flex items-center gap-4'>
                <button onClick={() => handleNavigation('approve-claims')} className="text-frost">Claims</button>
                <button onClick={() => handleNavigation('manage-policyholders')} className="text-frost">Policyholders</button>
                <button className="text-frost bg-midnight px-4 py-2 rounded-2xl hover:bg-shadow" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default AdminNavbar