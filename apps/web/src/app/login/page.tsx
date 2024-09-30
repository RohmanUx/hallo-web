'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Navbar } from '../layout/navbar';
import Image from 'next/image';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          email,
          password,
        },
      );

      if (response.data.success) {
        // Store token in localStorage or cookies
        localStorage.setItem('token', response.data.result.token);

        // Redirect user based on role
        if (response.data.result.role === 'ADMIN') {
          router.push('/event');
        } else {
          router.push('/');
        }
      } else {
        setError(response.data.message);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="pt-0 h-screen">
      <div className="h-screen flex items-center pt-0">
        <Navbar />
        <Image
          src="/Untitled design.png"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 pt-10"
        />
        <div className="w-96 bg-slate-100/60 m-auto shadow-lg rounded-md p-7 backdrop-blur-3xl">
          <h1 className="text-center font-semibold text-2xl">LOGIN</h1>
          <div className="flex flex-col justify-between mt-4">
            <div>
              <label className="block text-xl my-2">Email</label>
              <input
                className="w-full p-2 rounded-md border-2 border-black/60 bg-gray-300/0 placeholder-black"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xl my-2">Password</label>
              <div className="relative flex items-center">
                <input
                  className="w-full p-2 rounded-md border-2 border-black/60 bg-gray-300/0 placeholder-black"
                  placeholder="Enter password"
                  // type={isVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="absolute right-4"></button>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-slate-500 text-white p-3 w-full rounded-md shadow my-4"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <a href="/forgot-password" className="text-gray-950">
                Reset password? if not have account{' '}
                <Link href="/register" className="underline">
                  Register Now
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
// 'use client'
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:8000/api/auth/login', {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         // Store token in localStorage or cookies
//         localStorage.setItem('token', response.data.result.token);

//         // Redirect user based on role
//         if (response.data.result.role === 'ADMIN') {
//           router.push('/admin/dashboard');
//         } else {
//           router.push('/user/dashboard');
//         }
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error: any) {
//       console.error('Login error:', error);
//       setError(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="login-container py-96">
//       <form onSubmit={handleLogin} className="login-form">
//         <h2>Login</h2>

//         {error && <p className="error-text">{error}</p>}

//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="input-field"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="input-field"
//           />
//         </div>

//         <button type="submit" className="btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
