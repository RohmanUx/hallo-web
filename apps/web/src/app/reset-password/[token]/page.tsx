'use client';

import apiCall from '@/helper/apiCall';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface IResetPassProps {}

const ResetPass: React.FunctionComponent<IResetPassProps> = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] =
    React.useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiCall.patch(
        '/api/auth/reset-password',
        {
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data.result);
      router.replace('/login');
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <Image
        layout="fill"
        src={'/events-background-1.jpg'}
        alt={'image'}
        objectFit="cover"
      />
      <div className="w-1/4 rounded-xl shadow-2xl p-5 h-auto bg-slate-200 bg-opacity-50 flex flex-col justify-center items-center gap-5 z-10">
        <ToastContainer />
        <div className="w-full h-auto flex flex-col justify-center items-center gap-3 text-white">
          <p className="font-bold text-3xl">Set new password</p>
          <p>Please update your new password</p>
        </div>
        <div className="w-full h-auto flex relative justify-center items-center">
          <RiLockPasswordLine size={30} className="absolute left-2" />
          <Input
            type={isVisible ? 'text' : 'password'}
            className="w-full h-auto p-3 pl-14 rounded-xl shadow-2xl"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="absolute right-2 bottom-1"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
          </Button>
        </div>
        <div className="w-full h-auto flex relative justify-center items-center">
          <RiLockPasswordLine size={30} className="absolute left-2" />
          <Input
            type={isConfirmVisible ? 'text' : 'password'}
            className="w-full h-auto p-3 pl-14 rounded-xl shadow-2xl"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            className="absolute right-2 bottom-1"
            onClick={() => setIsConfirmVisible(!isConfirmVisible)}
          >
            {isConfirmVisible ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
          </Button>
        </div>
        <div className="w-full h-auto justify-center items-center flex">
          <button
            onClick={handleSubmit}
            className="w-full h-auto p-3 bg-slate-500 rounded-xl shadow-2xl shadow-slate-400 font-bold text-white"
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
