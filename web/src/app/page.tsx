'use client';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import Hero from './layout/hero';
import Footer from './layout/footer';
import CategoryList from './eventsHome/page';
import LiveChat from './dashboard/cms/chat';
import ThemeButton from './dashboard/cms/mode';
import PromoBanner from './dashboard/cms/information';
import Clik from './dashboard/cms/onTop';
import BlogPage from './dashboard/cms/contentful/[id]/page'; 
import Blog from './dashboard/cms/contentful/page';
const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
    <div>
      <Hero />
      <div className="">
        {' '}
        <Clik />
      </div>

      <PromoBanner />
      <Blog /> 
            <LiveChat />
    </div>
  );
};

export default Home;
