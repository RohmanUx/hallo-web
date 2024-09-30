'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Help: React.FC = () => {
  const router = useRouter();

  const handleEmail = () => {
    router.push('/hallo');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-3xl mb-8">Help request</div>

      <div className="flex flex-col items-center space-y-4">
        {/* Button to trigger email functionality */}
        <Button variant="contained" color="primary" onClick={handleEmail}>
          Send Email
        </Button>

        {/* Placeholder Button */}
        <Button variant="outlined" color="secondary">
          Create tiket 
        </Button>
      </div>
    </div>
  );
};

export default Help;
