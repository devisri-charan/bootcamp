import React, { useState } from 'react';
import { family } from '../assets';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const LogInPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Phone:', phone);
    console.log('Password:', password);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-pearl'>
      <div className='flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden'>
        <div className='w-1/2 p-8 bg-frost flex flex-col justify-center'>
          <div className="text-2xl font-bold mb-4 flex items-center">
            <Link to='/'><IoIosArrowBack className='px-1'/></Link>
            <h1 className='text-citrus'>Log In</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              {/* <label htmlFor='phone' className='block text-shadow font-medium mb-2'>Phone</label> */}
              <input
                type='tel'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone Number'
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <div className='mb-4'>
              {/* <label htmlFor='password' className='block text-shadow font-medium mb-2'>Password</label> */}
              <input
                type='password'
                id='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-citrus text-frost font-bold py-2 px-4 mb-4 rounded-xl hover:bg-midnight transition duration-200'
            >
              Log In
            </button>
          </form>
          <div>
            <p>Don't have an account yet? <Link to='/register' className='text-citrus'>Sign Up</Link></p>
          </div>
        </div>
        <div className='w-1/2'>
          <img src={family} className='object-cover w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default LogInPage;