'use client';
import * as React from 'react';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import { MdOutlineEmail } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface IForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = (
  props,
) => {
  const [email, setEmail] = React.useState<string>('');

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiCall.post('/api/auth/forgot-password', {
        email,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
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
          <p className="font-bold text-3xl">Forgot Password ?</p>
          <p>No worries, we&apos;ll send you reset instructions</p>
        </div>
        <div className="w-full h-auto flex relative items-center">
          <MdOutlineEmail size={30} className="absolute left-2" />
          <Input
            type="email"
            className="w-full h-auto p-3 pl-14 rounded-xl shadow-2xl"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full h-auto justify-center items-center flex">
          <Button
            onClick={handleSubmit}
            className="w-full h-auto p-3 bg-slate-500 rounded-xl shadow-2xl shadow-slate-400 font-bold text-white"
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
