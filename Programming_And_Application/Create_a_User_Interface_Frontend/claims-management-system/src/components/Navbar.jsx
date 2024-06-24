import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-citrus text-frost px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">SecureLife Insurance</div>
      <div>
        <Link to="/login">
          <button className="text-frost hover:bg-shadow transition duration-200 px-4 py-2 rounded-2xl mr-2">Login</button>
        </Link>
        <Link to='/register'>
          <button className="hover:bg-shadow transition duration-200 text-frost px-4 py-2 rounded-2xl">Signup</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar