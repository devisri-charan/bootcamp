import React, { useEffect, useState } from 'react';
import { home } from '../assets';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [date_of_birth, setdateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(registerUser({ name, date_of_birth, address, phone, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/user/${userInfo.policyholder_id}`,{ state: { name: userInfo.name } });
    }
  }, [userInfo, navigate])

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
              <input
                type='text'
                id='date_of_birth'
                value={date_of_birth}
                placeholder='Date of Birth'
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => setdateOfBirth(e.target.value)}
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <div className='mb-4'>
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
              <input
                type='password'
                id='retypePassword'
                value={retypePassword}
                placeholder='Confirm Your Password'
                onChange={(e) => setRetypePassword(e.target.value)}
                className='w-full px-3 py-2 border border-shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-citrus'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-citrus text-frost font-bold py-2 px-4 mb-4 rounded-xl hover:bg-midnight transition duration-200'
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {error && <p className='text-red-500'>{error.message}</p>}
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
