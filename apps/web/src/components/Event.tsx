'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Event({
  title,
  image,
  isExpanded,
  onClick,
}: {
  title: string;
  image: string;
  isExpanded: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`transition-all duration-500 h-[25rem] overflow-hidden bg-gray-800 text-white rounded-xl my-4 cursor-pointer flex ${
        isExpanded ? 'w-1/2' : 'w-32'
      }`}
      onClick={onClick}
    >
      <div className="justify-center items-center w-28 h-96 flex flex-shrink-0">
        <h3 className="text-4xl transform -rotate-90">{title}</h3>
      </div>
      {isExpanded && (
        <div className="flex-grow relative rounded-xl">
          <Image src={image} alt={title} layout="fill" objectFit="contain" />
        </div>
      )}
    </div>
  );
}
