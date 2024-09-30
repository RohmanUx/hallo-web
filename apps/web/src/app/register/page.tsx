'use client';
import * as React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaUserFriends,
} from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Toast } from 'react-toastify/dist/components';

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] =
    React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [refCode, setRefCode] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [role, setRole] = React.useState<string>('');
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiCall.post('/api/auth/register', {
        email,
        password,
        confirmPassword,
        refCode,
        role,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data.result);
      localStorage.setItem('token', data.result.token);
      router.replace('/'); 
      toast.success('Operation was successful!');
    }, 
    onError: (error: any) => {
      console.log(error);
      toast(error.response.data.message);
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="w-full h-screen pt-5">
      <Image
        src="/Untitled design.png"
        alt="Login Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 pt-10"
      />

      <div className="absolute inset-0 flex justify-center items-center pt-14">
        <div className="w-full max-w-sm rounded-none shadow-2xl p-6 bg-gray-100 bg-opacity-60 flex flex-col justify-center items-center gap-5 z-10 backdrop-blur-3xl px-7">
          <ToastContainer />
          <div className="w-full h-auto flex flex-col justify-center items-center text-white mb-2">
            <p className="font-bold text-2xl text-gray-800"> REGISTER </p>
          </div>
          <div className="w-full h-auto flex flex-col gap-3">
            <Button className="w-full p-3 bg-red-900 text-white rounded-none shadow-2xl flex justify-center items-center gap-2 font-bold">
              <FaGoogle size={20} />
              Register with Google
            </Button>
            <Button className="w-full p-3 bg-blue-900 text-white rounded-none shadow-2xl flex justify-center items-center gap-2 font-bold">
              <FaFacebookF size={20} />
              Register with Facebook
            </Button>
          </div>
                    <div className="w-full h-auto flex relative items-center">
            <MdOutlineEmail size={30} className="absolute left-2" />
            <Input
              type="email" 
              className="w-full p-3 pl-14 rounded-none shadow-2xl"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full h-auto flex relative justify-center items-center">
            <RiLockPasswordLine size={30} className="absolute left-2" />
            <Input
              type={isVisible ? 'text' : 'password'}
              className="w-full p-3 pl-14 rounded-none shadow-2xl"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="absolute right-0 bottom-0.5"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
            </Button>
          </div>
          <div className="w-full h-auto flex relative justify-center items-center">
            <RiLockPasswordLine size={30} className="absolute left-2" />
            <Input
              type={isConfirmVisible ? 'text' : 'password'}
              className="w-full p-3 pl-14 rounded-none shadow-2xl"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              className="absolute right-0 bottom-0.5"
              onClick={() => setIsConfirmVisible(!isConfirmVisible)}
            >
              {isConfirmVisible ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
            </Button>
          </div>
          <div className="w-full h-auto flex relative items-center">
            <FaUserFriends size={30} className="absolute left-2" />
            <Input
              type="text"
              className="w-full p-3 pl-14 rounded-none shadow-2xl"
              placeholder="Referral Code (optional)"
              onChange={(e) => setRefCode(e.target.value)}
            />
          </div>
          <div className="w-full gap-5 h-auto flex relative text-xl text-white font-bold justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <RadioGroup
                className="w-full flex justify-center gap-20 items-center text-gray-900"
                onValueChange={(value) => setRole(value)}
              >
                <div className="flex justify-center items-center gap-5">
                  <RadioGroupItem value="USER" className='border-gray-800 border-[1px]'/>
                  <Label className="text-xl font-bold text-gray-800">User </Label>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <RadioGroupItem value="ADMIN"  className='border-gray-800 border-[1px]'  />
                  <Label className="text-xl font-bold text-gray-800">Organizer </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="w-full h-auto justify-center items-center flex">
            <Button
              onClick={handleSubmit}
              className="w-full p-3 bg-slate-500 rounded-none shadow-2xl shadow-slate-400 font-bold text-gray-50 font-sans"
            >
              REGISTER
            </Button>
          </div>
          <div className="w-full h-auto justify-center items-center flex text-gray-900 font-sans">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
