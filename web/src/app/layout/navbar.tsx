'use client';

import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserContext';
import { useMutation } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import { Button } from '@/components/ui/button'; // ShadCN UI Button
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // ShadCN UI Avatar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'; // ShadCN UI Popover
import Help from '../dashboard/cms/help/page';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'; // ShadCN UI Sheet for drawer
import { LogOut } from 'lucide-react'; // Correct import for Logout icon
import ThemeButton from '../dashboard/cms/mode';
import RandomUser from '../dashboard/cms/team/page';
import { createTheme } from '@mui/material';
import { Fa1, FaHackerNews } from 'react-icons/fa6';
import { CiCircleChevDown } from 'react-icons/ci';
import { MdOutlineArrowOutward } from 'react-icons/md';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiCall.post('/api/auth/logout');
      return data;
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      setUser(null);
      router.replace('/login');
    },
    onError: (error) => {
      console.log('Logout failed:', error);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };
  // Create MUI theme based on dark mode state
  // const muiTheme = createTheme({
  //   palette: {
  //     mode: darkMode ? 'dark' : 'light',
  //   },
  // });

  useEffect(() => {
    // Check localStorage for dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Save dark mode state to localStorage and update the document class
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all backdrop-blur-xl justify-around ${
        pathname === '/login' || pathname === '/register'
          ? 'bg-transparent'
          : 'bg-gray-100 dark:bg-black/80'
      }`}
    >
      <div className="flex justify-between items-center py-[2px] px-4 md:px-10 lg:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <div className="mr-10">
            <Link
              href="/"
              className="font-extrabold text-lg lg:text-xl border-black/30 border pl-1 py-1 text-green-900/80 bg-gray-100 dark:bg-gray-100/10 dark:text-gray-100/80 dark:border-white/10 hover:bg-orange-200"
            >
              Journalfy📘
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard/cms/contentful/search">
              <Button variant="link" className="text-sm font-sans">
                Seacrh <MdOutlineArrowOutward className="ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard/cms/help">
              <Button variant="link" className="text-sm font-sans">
                Help <MdOutlineArrowOutward className="ml-2" /> 
              </Button>
            </Link>
            <Link href="/dashboard/cms/team">
              <Button variant="link" className="text-sm font-sans">
                Team
              </Button>
            </Link>
          </div>{' '}
        </div>

        {/* Right Section */}
        <div className="flex space-x-2 items-center w-[222.5px] justify-end">
          <ThemeButton darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* User Avatar or Login/Register */}
          {user?.email ? (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center space-x-2 border rounded-full border-black dark:border-white ">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={
                        user.image
                          ? `http://localhost:800${user.image}`
                          : 'bts.webp'
                      }
                      className="bg-black"
                    />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 bg-white/80 backdrop-blur-xl shadow-lg mt-2 rounded-lg dark:bg-gray-900/80">
                <div className="flex flex-col p-0 space-y-2">
                  <div>
                    <div className="text-sm mx-4 my-0">
                      Points: {user.points ?? 'N/A'}
                    </div>
                    <div className="text-sm mx-4 mt-1 mb-1">
                      Balance: {user.balance ?? 'N/A'}
                    </div>
                    <Button
                      variant="link"
                      className="justify-start text-sm m-0 h-0 w-0 mb-2"
                      onClick={() => {
                        router.push(
                          user.role === 'ADMIN'
                            ? '/admin/profile'
                            : '/user/profile',
                        );
                        setIsOpen(false);
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="link"
                      className="justify-start text-sm h-0"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-3 w-4" />
                      Logout
                    </Button>{' '}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
<<<<<<< HEAD:web/src/app/layout/navbar.tsx
            <div className="hidden md:flex space-x-2"></div>
=======
            <div className="hidden md:flex space-x-2">
              <Button
                className="border text-sm rounded-full dark:bg-white/80 hover:bg-gray-200 py-1 px-4 border-black/40 font-medium bg-black/80 dark:text-black text-white/80"
                onClick={() => router.replace('/login')}
              >
                Login
              </Button>
              <Button
                className="text-sm font-medium border border-black/60 rounded-full text-white/80 dark:text-black/80 bg-black/80 dark:bg-white/80"
                onClick={() => router.replace('/register')}
              >
                Register
              </Button>
            </div>
>>>>>>> 47a3022d26cd6e6372d55868bdd29aeba3ec4002:apps/web/src/app/layout/navbar.tsx
          )}
        </div>

        {/* Mobile Menu (Drawer) */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                  className="dark:text-white dark:bg-white/80"
                />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-white/80 p-4 backdrop-blur-xl dark:bg-black/40 dark:text-gray-100/80"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/eventSearch">
                <Button variant="link">Explore </Button>
              </Link>
              <Link href="/event">
                <Button variant="link">Dashboard </Button>
              </Link>
              <Link href="/blog">
                <Button variant="link">Blog </Button>
              </Link>

              <div className="border-t py-3 px-4 "></div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
