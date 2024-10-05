'use client';
import * as React from 'react';
import { CiUser, CiViewList } from 'react-icons/ci';
import {
  MdOutlinePayment,
  MdCreate,
  MdDashboard,
  MdOutlineRoomPreferences,
} from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useRouter } from 'next/navigation';
interface IAdminSidebarProps {}

const AdminSidebar: React.FunctionComponent<IAdminSidebarProps> = (props) => {
  const router = useRouter();
  return (
    <div className="fixed left-0 w-[20%] min-h-screen bg-slate-300 flex flex-col gap-10 p-5 rounded-br-xl rounded-tr-xl">
      <div className="w-full">
        <p className="text-2xl">Account</p>
      </div>
      <div className="w-full flex-col flex gap-10">
        <div
          className="w-full h-auto flex justify-start items-center gap-5 cursor-pointer"
          onClick={() => router.push('/admin/profile')}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-400 flex justify-center items-center">
            <CiUser size={30} color="white" />
          </div>
          <div>
            <p className="text-xl">Profile</p>
          </div>
        </div>
        <div
          className="w-full h-auto flex justify-start items-center gap-5 cursor-pointer"
          onClick={() => router.push('/admin/event-maker')}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-400 flex justify-center items-center">
            <MdCreate size={30} color="white" />
          </div>
          <div>
            <p className="text-xl">Create Event</p>
          </div>
        </div>
        <div
          className="w-full h-auto flex justify-start items-center gap-5 cursor-pointer"
          onClick={() => router.push('/admin/list')}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-400 flex justify-center items-center">
            <CiViewList size={30} color="white" />
          </div>
          <div>
            <p className="text-xl">Your Event</p>
          </div>
        </div>
        <div
          className="w-full h-auto flex justify-start items-center gap-5 cursor-pointer"
          onClick={() => router.push('/admin/dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-400 flex justify-center items-center">
            <MdDashboard size={30} color="white" />
          </div>
          <div>
            <p className="text-xl">Dashboard</p>
          </div>
        </div>
        <div
          className="w-full h-auto flex justify-start items-center gap-5 cursor-pointer"
          onClick={() => router.push('/admin/balance')}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-400 flex justify-center items-center">
            <MdOutlinePayment size={30} color="white" />
          </div>
          <div>
            <p className="text-xl">Balance</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-2xl">System</p>
      </div>
      <div className="w-full flex-col flex gap-10">
        <div className="w-full h-auto flex justify-start items-center gap-5">
          <div className="w-10 h-10 rounded-xl bg-slate-400 flex justify-center items-center">
            <IoMdNotificationsOutline size={30} color="white" />
          </div>
          <div>
            <p className="text-xl">Notification</p>
          </div>
        </div>
        <div className="w-full h-auto flex justify-start items-center gap-5">
          <div className="w-10 h-10 rounded-xl bg-slate-400 flex justify-center items-center">
            <MdOutlineRoomPreferences size={30} color="white" />
          </div>
          <div>
            <p className="text-xl">Preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
