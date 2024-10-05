'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const Profile = () => {
  const [profile, setProfile] = useState({
    address: '',
    image: '',
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    gender: '',
    location: '',
    phoneNumber: '',
  });
  const [get, setGet] = useState({
    address: '',
    images: { id: '', path: '', eventId: '' },
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    gender: '',
    location: { locationName: '' },
    phoneNumber: '',
  });
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isProfilePosted, setIsProfilePosted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setComment('Authentication token missing. Please log in.');
      setLoading(false);
      return;
    }
    try {
      const data = await axios.get('http://localhost:8000/api/user/profile/', {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.data.result.length > 0) {
        setGet(data.data.result[0]);
        setProfile(data.data.result[0]);
        setIsProfilePosted(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setProfile({ ...profile, [e.target.name]: e.target.value });
  // };
  type FormDataKey = keyof typeof profile;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
  ) => {
    const { name, value } = e.target;
    setProfile((prevFormData) => ({
      ...prevFormData,
      [name as FormDataKey]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setComment('Authentication token missing. Please log in.');
      toast.error('token its missing please login or created account');
      return;
    }
    e.preventDefault();
    const handleChangeProduct = new FormData();
    Object.keys(profile).forEach((key) => {
      handleChangeProduct.append(key, profile[key as FormDataKey]);
    });

    files.forEach((file) => handleChangeProduct.append('eve', file)); // Corrected the name to 'eve'
    try {
      if (isProfilePosted) {
        await axios.patch(
          'http://localhost:8000/api/user/profile/',
          handleChangeProduct,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert('Profile updated successfully');
        toast.success('your succest update profile');
      } else {
        await axios.post(
          'http://localhost:8000/api/user/profile/',
          handleChangeProduct,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert('Profile created successfully');
        setIsProfilePosted(true);
        toast.success('your succest created profile');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      toast.error('please fix it / lengkapi profile kalian');
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000} // Toast disappears after 2 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        className="text-white text-sm" // Custom styling for small text
      />
      <div className=" bg-gray-200 bg-opacity-60 backdrop-blur-lg mt-10 justify-center items-center flex h-[700px]">
        <div className="container mx-auto w-full ">
          <div className="flex flex-wrap justify-center items-center">
            <h1 className="text-4xl font-medium text-gray-900 mb-10 text-center w-full">
              Your account
            </h1>
            <div className="flex flex-col lg:flex-row gap-8 justify-center w-full px-4 lg:px-0">
              <div className="bg-gray-00 bg-opacity-80 p-6 rounded-lg w-96 lg:w-96 border-[1px] border-gray-900">
                <p className="text-gray-900 pb-3 text-2xl">Profile </p>

                <div className="border-2 border-gray-600 mb-4 h-60 flex justify-center items-center">
                  {get?.images?.path ? (
                    <Image
                      src={`http://localhost:8000${get.images.path}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-900">No profile image</p>
                  )}
                </div> 
                <h2 className="text-xl text-gray-900 mb-2">
                  Name: {get.firstName} {get.lastName}
                </h2>
                <p className="text-gray-900">Gender: {get.gender}</p>
                <p className="text-gray-900">Address: {get.address}</p>
                <p className="text-gray-900">Phone: {get.phoneNumber}</p>
                <p className="text-gray-900">
                  Date of Birth:{' '}
                  {new Date(get.dateOfBirth).toLocaleDateString()}
                </p>
                <p className="text-gray-900">
                  Location: {get.location.locationName}
                </p>
              </div>

              <div className="bg-gray-100 bg-opacity-80 p-6 rounded-lg w-96 lg:w-96 border border-black">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-nowrap gap-4 ">
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full md:w-1/2 px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full md:w-1/2 px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                  />

                  <input
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                  />

                  <input
                    type="text"
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                  />

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400"
                  />

                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition"
                  >
                    {isProfilePosted ? 'Update Profile' : 'Post Profile'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default Profile;
