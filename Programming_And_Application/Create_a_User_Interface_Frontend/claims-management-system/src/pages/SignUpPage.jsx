import React, { useState } from 'react';
import { home } from '../assets';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';


const SignUpPage = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle the signup logic here
    console.log('Name:', name);
    console.log('Date of Birth:', dob);
    console.log('Address:', address);
    console.log('Phone:', phone);
    console.log('Password:', password);
    console.log('Retype Password:', retypePassword);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-pearl'>
      <div className='flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden'>
        <div className='w-1/2 p-8 bg-frost flex flex-col justify-center'>
          <div className="text-2xl font-bold mb-4 flex items-center">
            <Link to='/'><IoIosArrowBack className='px-1' /></Link>
            <h1 className='text-citrus'>Signup</h1>
          </div>
          <form onSubmit={handleSignUp}>
            <div className='mb-4'>
              {/* <label htmlFor='name' className='block text-shadow font-medium mb-2'>Name</label> */}
              <input
                type='text'
                id='name'
                value={name}
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <div className='mb-4'>
              {/* <label htmlFor='dob' className='block text-shadow font-medium mb-2'>Date of Birth</label> */}
              <input
                type='text'
                id='dob'
                value={dob}
                placeholder='Date of Birth'
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => setDob(e.target.value)}
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <div className='mb-4'>
              {/* <label htmlFor='address' className='block text-shadow font-medium mb-2'>Address</label> */}
              <input
                type='text'
                id='address'
                value={address}
                placeholder='Address'
                onChange={(e) => setAddress(e.target.value)}
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <div className='mb-4'>
              {/* <label htmlFor='phone' className='block text-shadow font-medium mb-2'>Phone Number</label> */}
              <input
                type='tel'
                id='phone'
                value={phone}
                placeholder='Phone Number'
                onChange={(e) => setPhone(e.target.value)}
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
            <div className='mb-4'>
              {/* <label htmlFor='retypePassword' className='block text-shadow font-medium mb-2'>Retype Password</label> */}
              <input
                type='password'
                id='retypePassword'
                value={retypePassword}
                placeholder='Comfirm Your Password'
                onChange={(e) => setRetypePassword(e.target.value)}
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-citrus text-frost font-bold py-2 px-4 mb-4 rounded-xl hover:bg-midnight transition duration-200'
            >
              Sign Up
            </button>
          </form>
          <div>
            <p>Already have an account ? <Link to='/login' className='text-citrus'>Login</Link></p>
          </div>
        </div>
        <div className='w-1/2'>
          <img src={home} className='object-cover w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
