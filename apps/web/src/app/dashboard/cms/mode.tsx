import React from 'react';
import { FaMoon } from "react-icons/fa6"; 
import { FiSun } from "react-icons/fi"; 
import { MdSunny } from "react-icons/md"; 

interface ThemeButtonProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ darkMode, setDarkMode }) => { 
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
          <button
        onClick={toggleDarkMode}
        className={`flex items-center space-x-2 px-3 py-[5px] rounded-full shadow-md transition-colors hover:shadow-lg focus:outline-none justify-center ${
          darkMode
            ? 'bg-white/80 text-black hover:bg-yellow-400 rounded-full'
            : 'bg-black/80 text-white hover:bg-blue-500 rounded-full backdrop-blur-3xl border border-black/40 dark:border-white/80'
        }`} 
      >
        {darkMode ? (
          <MdSunny className='h-3 w-2' />
        ) : (
          <FaMoon className='h-3 w-2' />
        )}
      </button>
      );
};

export default ThemeButton;
