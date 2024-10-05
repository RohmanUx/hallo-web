// pages/index.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RiGraduationCapLine } from 'react-icons/ri';
import { AiOutlineTeam } from 'react-icons/ai';

interface User {
  picture: {
    large: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  location: {
    city: string;
    country: string;
  };
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  // Function to fetch users
  const fetchUsers = async () => {
    const res = await fetch('https://randomuser.me/api/?results=6');
    const data = await res.json();
    setUsers(data.results);
  };

  // Fetch users initially when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="px-4 py-2 mt-20 mb-14 bg-gray-200/0 text-md text-gray-700 rounded-full flex w-28 border border-black/70 items-center font-bold justify-center">
        Team <AiOutlineTeam className="ml-2" />
      </div>

      {/* Reload Team Button */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-[600px]">
        {users.map((user, index) => (
          <div key={index} className="text-center w-72 h-72">
            <Image
              src={user.picture.large}
              alt={user.name.first}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold">{`${user.name.first} ${user.name.last}`}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-400">
              {user.location.city}, {user.location.country}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={fetchUsers}
        className="my-8 bg-green-900 text-white py-2 px-4 hover:bg-green-600 transition rounded-full mb-20"
      >
        Random team generator 
      </button>
    </div>
  );
}
