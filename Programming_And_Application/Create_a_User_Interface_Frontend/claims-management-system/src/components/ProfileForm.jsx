import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const ProfileForm = ({ user, setUser, userId }) => {
  const [formData, setFormData] = useState(user);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      setIsModified(JSON.stringify(updatedFormData) !== JSON.stringify(user));
      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/policyholders/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUser = await response.json();
      if (data.date_of_birth) {
        data.date_of_birth = new Date(data.date_of_birth).toISOString().split('T')[0];
      }
      setUser(updatedUser);
      setIsModified(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-citrus text-2xl font-bold text-left mb-4'>Profile Details</h1>
      <form onSubmit={handleSubmit} className='w-1/2'>
        <div className="mb-4 relative">
          <label htmlFor="name" className="block mb-2 font-bold">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Name'
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 shadow-md rounded-xl"
          />
          <FaEdit className="absolute top-[59%] right-3 transform -translate-y-[1%] text-shadow" />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="date_of_birth" className="block mb-2 font-bold">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 shadow-md rounded-xl"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="phone" className="block mb-2 font-bold">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder='Phone'
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 shadow-md rounded-xl"
          />
          <FaEdit className="absolute top-[59%] right-3 transform -translate-y-[1%] text-shadow" />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="address" className="block mb-2 font-bold">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder='Address'
            value={formData.address || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 shadow-md rounded-xl"
          />
          <FaEdit className="absolute top-[59%] right-3 transform -translate-y-[1%] text-shadow" />
        </div>
        <button
          type="submit"
          className={`bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200 ${isModified ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isModified}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
