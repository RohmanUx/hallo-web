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
      className="fixed lg:bottom-[110px] lg:right-[88px] right-5 bottom-16 bg-gray-200/60 text-gray-900/90 p-1 lg:p-1 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-400/60 focus:outline-none z-20 backdrop-blur-3xl border-gray-900/90 border-[1px] "
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};
export default Clik;
