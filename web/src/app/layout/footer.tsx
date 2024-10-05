import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const BlurBackground = styled('div')(({ theme }) => ({}));

const Footer: React.FC = () => {
  return (
    <BlurBackground className="bg-gray-100 flex justify-between flex-wrap items-center">
        <div className=" flex-wrap items-center flex justify-center w-full">
          <div className="flex items-center justify-between bg-green-900/80 backdrop-blur-3xl text-white py-5 px-4 rounded-3xl my-4">
            <h1 className="text-xl italic font-serif mr-5">
            Subscribe to our newsletter for exciting updates! 
            </h1>
            <a
              href="#"
              className="inline-block bg-white text-green-900 font-medium py-3 px-6 rounded-full border border-white hover:bg-green-100 transition text-2xl"
            >
              Subcribe your email 
            </a>
          </div>
        </div>

      <div className="sm:px-0 lg:px-20  dark:bg-black/80 backdrop-blur-3xl flex w-full justify-between border border-t-black/40 ">
        <footer className="flex flex-col sm:flex-row items-center py-1 w-full justify-between px-2 ">
          <Typography
            variant="body2"
            className="text-gray-900 dark:text-white/80 text-center sm:text-left font-sans text-lg"
          >
            ©2024 Journalfy.Inc | all rights reserved.
          </Typography>

          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 sm:mt-0 text-center ">
            <div className="flex flex-col sm:flex-row gap-8">
              <Link
                href="#"
                variant="body2"
                underline="hover"
                className="text-gray-900 dark:text-white/80 font-sans text-lg"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                className="text-gray-900 dark:text-white/80 font-sans text-lg"
              >
                Privacy
              </Link>
              <Link
                href="https://saweria.co/FrostYoung"
                variant="body2"
                underline="hover"
                className="text-gray-900 dark:text-white/80 font-sans text-lg"
              >
                Donation to us
              </Link>
            </div>
          </nav>
        </footer>
      </div>
    </BlurBackground>
  );
};

export default Footer;
