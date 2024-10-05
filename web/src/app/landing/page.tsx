'use client';
import withAuth from '@/hoc/authGuard';
import Image from 'next/image';
import * as React from 'react';

interface ILandingProps {}

function Landing() {
  const [email, setEmail] = React.useState<string>('');
  return (
    <div className="text-center bg-slate-100 w-full p-10 flex flex-col gap-20">
      <div className="w-full h-auto flex flex-col gap-20">
        <p className="text-9xl font-bold">
          Experience Events Like Never Before{' '}
        </p>
        <p className="text-3xl">
          Your Ultimate Destination for Unforgettable Moments – Find Events That
          Inspire and Excite!
        </p>
      </div>
      <div className="w-full min-h-screen relative">
        <Image
          layout="fill"
          objectFit="cover"
          src="/blackpink.webp"
          alt="image"
          className="rounded-3xl"
        />
        <div className="w-full h-auto absolute top-0 left-10">
          {' '}
          <Image
            width={500}
            height={1000}
            src="/bp-logo.png"
            alt="image"
            className="rounded-3xl"
          />
        </div>
        <div className="absolute right-10 bottom-5">
          <p className="text-3xl text-white">Saturday, 10 September 2024</p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Landing);
