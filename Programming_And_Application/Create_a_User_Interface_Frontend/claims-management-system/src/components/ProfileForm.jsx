import React, { useState } from 'react';

const ProfileForm = ({ user }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    // Add API call to update profile
  };

  return (
    <form onSubmit={handleSubmit} className='w-1/2'>
      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-shadow rounded-xl"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          id="date"
          name="date"
          placeholder='Date Of Birth'
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-shadow rounded-xl"
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          id="phone"
          name="Phone"
          placeholder='Phone'
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-shadow rounded-xl"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="address"
          name="Address"
          placeholder='Address'
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-shadow rounded-xl"
        />
      </div>
      <button
        type="submit"
        className="bg-citrus text-frost py-2 px-4 rounded-xl hover:bg-midnight transition duration-200"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
