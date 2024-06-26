import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'

const UserNavbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }
    return (
        <nav className="bg-citrus text-frost px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold"><Link to=''>SecureLife Insurance</Link></div>
            <div className='flex items-center gap-4'>
                <Link to="policies">
                    <button className="text-frost">My Policies</button>
                </Link>
                <Link to='claims'>
                    <button className="text-frost">My Claims</button>
                </Link>
                <Link to='profile'>
                    <button className="text-frost">Profile</button>
                </Link>
                <button className="text-frost bg-midnight px-4 py-2 rounded-2xl hover:bg-shadow" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default UserNavbar