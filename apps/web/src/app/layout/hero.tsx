import React, { useState, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import Image from 'next/image' 
const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  // Create a ref to store the debounced function
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        setLoading(true); // Show loading indicator
        await router.push(`/eventSearch?searchTerm=${encodeURIComponent(trimmedQuery)}`);
        setLoading(false); // Hide loading indicator
      }
    }, 1000)
  ).current;

  const handleSearchChange = useCallback((query: string) => {
    setSearchTerm(query);
    debouncedSearch(query); // Call the debounced function
  }, [debouncedSearch]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearchChange(value);
  };

  return (
    <div>
      <div className="relative w-full h-screen bg-gray-900/30 z-10" id='target-section'>
        <Image
          src="/1285.png"
          alt="Hero"
          layout="fill"
          style={{ objectFit: 'cover' }} 
          className="absolute inset-0 w-full h-full bg-gray-900/90 z-0"
        />
        <div className="bg-opacity-50 flex flex-col justify-center items-center w-full h-full absolute top-0 left-0 rounded-3xl">
          <div className="backdrop-blur-3xl flex flex-col items-center p-8 md:p-14 border border-white/20 bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-80 rounded-3xl mx-[1px]">
            <div className="flex mt-4">
              <h1 className="text-gray-900 dark:text-white/90 text-3xl md:text-4xl lg:text-6xl font-bold mb-2 text-center font-KalesiRoundedDemo">
                Discover event{' '}
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 32 32"
                className="mt-[-30px] ml-[-22px] bg-white/0 rounded-full"
              >
                <path
                  fill="#000000a1" className=''
                  d="M 16.388672 6.0019531 C 15.611672 6.0019531 15.385172 7.0820312 14.451172 7.0820312 C 13.546172 7.0820312 12.888969 6.2714844 12.042969 6.2714844 C 11.235969 6.2714844 10.713547 6.8640313 10.310547 8.0820312 C 8.9335469 12.245031 8.9939063 12.068109 9.0039062 12.287109 C 9.0039063 13.619109 13.881156 17.990234 20.410156 17.990234 L 20.410156 18 C 22.091156 18 24.519531 17.624703 24.519531 15.470703 C 24.539531 15.106703 24.569516 15.377781 23.478516 10.300781 C 23.252516 9.2697812 23.045047 8.80125 21.373047 7.90625 C 20.065047 7.18725 17.224672 6.0019531 16.388672 6.0019531 z M 8.2695312 13.039062 C 5.9695313 13.149063 3 13.570234 3 16.240234 C 3 20.610234 13.189766 26 21.259766 26 C 27.439766 26 29 23.160156 29 20.910156 C 29 19.140156 27.499063 17.139453 24.789062 15.939453 C 25.020063 17.177453 25 17.558703 25 17.720703 C 25 19.827703 22.844813 21 20.007812 21 C 13.612813 21.011 8 16.873437 8 14.148438 C 8 13.768437 8.1295313 13.387063 8.2695312 13.039062 z"
                />
              </svg>
            </div>
            <p className="text-gray-900 dark:text-white/80 text-sm md:text-lg lg:text-lg font-bold mb-6 text-center font-KalesiRoundedDemo">
              Music, study, mentoring, learning, party, <br />
              government, books, and more
            </p>
            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search event? "
                className="px-4 md:px-4 lg:px-5 w-full md:w-96 py-1 rounded-full border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 border bg-opacity-60 text-gray-950 placeholder-gray-700 text-sm md:text-sm h-10 shadow-sm hover:placeholder-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 dark:hover:placeholder-gray-400 dark:hover:text-dark dark:placeholder-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="overflow-hidden w-full mt-[-28px] z-10 absolute bg-gray-100/80 dark:bg-gray-900/80 bg-opacity-80 border-t-[1px] border-white/60 backdrop-blur-3xl">
          <div className="animate-marquee whitespace-nowrap text-gray-800 dark:text-gray-100/80 font-sans tracking-wider text-lg">
          Get your events now! best prices available! don&apos;t miss out on
            the world&apos;s biggest events!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
