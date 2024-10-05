import React from 'react';
import Image from 'next/image';
import { RiGraduationCapLine } from 'react-icons/ri';

const Hero: React.FC = () => {
  return (
    <div>
      <div
        className="relative w-full h-[1200px] bg-gray-100 z-10"
        id="target-section"
      >
        <Image
          src="/128.png"
          alt="Hero"
          layout="fill"
          style={{ objectFit: 'cover' }}
          className="inset-0 w-full h-full bg-gray-200/10 z-0"
        />
        <div className="bg-opacity-0 flex flex-col w-full justify-start pt-40 items-start">
          <div className="items-start p-[59px] md:py-[50.5px] bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-80 rounded-0 bg-custom-grid bg-grid-size mx-[79px] justify-center">
            <div className="flex flex-wrap justify-start">
              <div className="w-full">
                <div className="px-4 py-2 mb-4 bg-gray-200/0 text-md text-gray-700 rounded-full flex w-48 border-2 border-black/70 items-center font-bold">
                  Design Journal <RiGraduationCapLine className="ml-2" />
                </div>
              </div>

              <h1 className="text-gray-900 dark:text-white/90 text-2xl md:text-3xl lg:text-5xl font-bold mb-3 text-center font-serif">
                <i> The Untitled Design Journal & Interviews </i>
              </h1>
              <p className="mt-4 text-gray-900">
                The Untitled UI Journal features carefully selected good works
                from designers around the globe.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[600px] bg-gray-100 mx-4 lg:mx-20 mt-20 relative">
          <Image
            src="/images.png"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            className="inset-0 w-full h-full z-0"
          />
          {/* White blurry overlay */}
          <div className="absolute inset-0 bg-green-900/40 z-10 h-full flex justify-end backdrop-brightness-100">
            <div className="flex h-full justify-end items-end">
              <div className="mx-4 lg:mx-20 my-10">
                <div className="text-2xl lg:text-4xl text-white my-4">
                  <i>
                    Happy Clients and Finding Work That Motivates: Frankie
                    Sullivan on Design and Freelancing
                  </i>
                </div>
                <div className="text-white flex flex-col lg:flex-row">
                  Frankie Sullivan is a 23-year-old photographer and product
                  designer from Toronto, Ontario. She has worked with Spotify,
                  Nike, Chews, Makr, and Square. Amelie Laurent asked her a few
                  questions about her work and what's next.
                  <div className="flex justify-between items-center lg:ml-20 mt-4 lg:mt-0">
                    <div className="text-sm w-36 border-l border-white pl-3 mr-2">
                      <span className="block mb-1">Written by</span>
                      <span className="font-bold">Amélie Laurent</span>
                    </div>

                    <div className="text-sm w-36 border-l border-white pl-3">
                      <span className="block mb-1">Published on</span>
                      <span className="font-bold">12 April 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
            <div className="w-7 h-7 bg-gray-100 ml-[-34px]"></div>
            <div className="w-7 h-7 bg-gray-100"></div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="overflow-hidden w-full mt-[-28px] z-10 bg-gray-100/80 dark:bg-gray-900/80 bg-opacity-80 border-t-[1px] border-white/60 backdrop-blur-3xl">
          <div className="animate-marquee whitespace-nowrap text-gray-800 dark:text-gray-100/80 font-sans tracking-wider text-sm py-1">
            Get your events now! Best prices available! Don&apos;t miss out on
            the world&apos;s biggest events!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
