import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const BlurBackground = styled ('div') (({ theme }) => ({
    backdropFilter: 'blur(80px)',
  padding: theme.spacing(0),
}));

const Footer: React.FC = () => {
  return (
    <BlurBackground className='bg-gray-50 border-t-black/40 border'>
      <Container maxWidth='xl' className="px-6 sm:px-6 lg:px-40 bg-gray-50 dark:bg-black/80 backdrop-blur-3xl">
        <footer className="flex flex-col sm:flex-row items-center justify-between py-1 ">
          <Typography variant="body2" className="text-gray-900 dark:text-white/80 text-center sm:text-left font-sans">
            © 2024 Luno Event, Inc. All rights reserved.
          </Typography>

          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 sm:mt-0 text-center ">
            <div className="flex flex-col sm:flex-row gap-8">
              <Link href="#" variant="body2" underline="hover" className="text-gray-900 dark:text-white/80 font-sans">
                Terms of Service
              </Link>
              <Link href="#" variant="body2" underline="hover" className="text-gray-900 dark:text-white/80 font-sans">
                Privacy
              </Link>
            </div>
          </nav>
        </footer>
      </Container>
    </BlurBackground>
  );
};

export default Footer;
