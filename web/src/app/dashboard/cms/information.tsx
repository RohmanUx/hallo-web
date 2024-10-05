import React, { useState, useEffect } from 'react';

const PromoBanner = () => {
  const [showPromo, setShowPromo] = useState(true); // Mengatur apakah notifikasi akan tampil
  const [timeLeft, setTimeLeft] = useState(3600); // Waktu promo, dalam detik (misalnya 1 jam)

  // Fungsi untuk menghitung waktu mundur
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Menghapus interval saat komponen di-unmount
    return () => clearInterval(timer);
  }, []);

  // Mengonversi detik ke format hh:mm:ss
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Fungsi untuk menutup promo
  const closePromo = () => setShowPromo(false);

  return (
    <div className='mx-20'>
      {showPromo && (
        <div className="fixed top-0 left-0 right-0 dark:bg-black/60 bg-gray-100/80 dark:text-white/60 text-black/80 py-[1px] px-5 flex justify-between items-center z-50 shadow-lg my-14 xl:lg:mx-56 mx-4 rounded-3xl backdrop-blur-3xl border border-black/10 dark:border-white/20 text-sm text-center">
        <div className='flex'>
          <p> Join our exciting webinar on modern articles and new trends! Access <u>via Zoom.</u> Location: Canada. Don’t miss out!      <span className='text-gray-600 mx-2'>{formatTime(timeLeft)} </span> </p> 
                  </div>
        <button className="text-black/80 font-bold text-sm dark:text-white/80" onClick={closePromo}>
          ✖
        </button>
      </div>
            )}
    </div>
  );
};

export default PromoBanner;
