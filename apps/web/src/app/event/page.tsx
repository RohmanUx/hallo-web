'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  AiFillAlert,
  AiFillAlipayCircle,
  AiFillApi,
  AiFillCodepenCircle,
  AiOutlineProfile,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { Navbar } from '../layout/navbar';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <div className="flex flex-col items-center h-screen bg-gray-300/10 justify-center">
        <div>
          <h1 className="text-xl sm:text-3xl md:text-3xl font-medium mb-10 md:mb-10 text-gray-900/80 text-center uppercase">
            Your Dashboard
          </h1>
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 flex justify-center">
            <div
              onClick={() => handleNavigation('dashboard/eventCheck')}
              className="cursor-pointer p-6 bg-gray-0 border-gray-900/40 border-[1px] bg-opacity-80 rounded-sm shadow-md backdrop-blur-md"
            >
              <AiFillAlert className="text-5xl sm:text-6xl text-gray-900/80 mx-auto mb-4 w-20 md:w-40" />
              <h2 className="text-sm sm:text-2xl md:text-2xl font-bold text-center text-gray-900">
                Event Control
              </h2>
            </div>

            <div
              onClick={() => handleNavigation('/dashboard/profile')}
              className="cursor-pointer p-6 bg-gray-0 border-gray-900/40 border-[1px] bg-opacity-80 rounded-sm shadow-md backdrop-blur-md"
            >
              <AiFillCodepenCircle className="text-5xl sm:text-6xl text-gray-900/80 mx-auto mb-4 w-20 md:w-40" />
              <h2 className="text-sm sm:text-2xl md:text-2xl font-bold text-center text-gray-900">
                Profile
              </h2>
            </div>
            <div
              onClick={() => handleNavigation('/dashboard/balance')}
              className="cursor-pointer p-6 bg-gray-0 border-gray-900/40 border-[1px] bg-opacity-80 rounded-sm shadow-md backdrop-blur-md"
            >
              <AiFillAlipayCircle className="text-5xl sm:text-6xl text-gray-900/80 mx-auto mb-4 w-20 md:w-40" />
              <h2 className="text-sm sm:text-2xl md:text-2xl font-bold text-center text-gray-900">
                Balance
              </h2>
            </div>
            <div
              onClick={() => handleNavigation('/dashboard/help')}
              className="cursor-pointer p-6 bg-gray-0 border-gray-900/40 border-[1px] bg-opacity-80 rounded-sm shadow-md backdrop-blur-md"
            >
              <AiFillApi className="text-5xl sm:text-6xl text-gray-900/80 mx-auto mb-4 w-20 md:w-40" />
              <h2 className="text-sm sm:text-2xl md:text-2xl font-bold text-center text-gray-900">
                Help request
              </h2>
            </div>
          </div>
          <div className="text-md w-full justify-center text-center py-10 text-gray-700">
            {' '}
            Devloper: RohmanUX Web:Rohman.dev Store:Fourty.store{' '}
          </div>
        </div>{' '}
      </div>
    </div>
  );
};

export default Dashboard;
