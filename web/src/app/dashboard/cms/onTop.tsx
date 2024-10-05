import { ArrowUpIcon } from 'lucide-react';
const scrollToSection = () => {
  const section = document.getElementById('target-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Clik: React.FC = () => {
  return (
    <button
      onClick={scrollToSection}
      className="fixed lg:bottom-[40px] lg:right-[88px] right-5 bottom-16 bg-green-400/10 text-gray-900/80 p-1 lg:p-1 rounded-full flex items-center justify-center hover:bg-gray-400/60 focus:outline-none z-20 backdrop-blur-3xl border-gray-900/80 border-[1px] font-extralight"
    >
      <ArrowUpIcon className="w-4 h-4" />
    </button>
  );
};
export default Clik;
