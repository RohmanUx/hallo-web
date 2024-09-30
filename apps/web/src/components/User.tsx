  

  import * as React from 'react';
  import { Button } from '@/components/ui/button';
  import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
  import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
  import { Avatar } from '@radix-ui/react-avatar';
  import router from 'next/router';
  import Image from 'next/image';
  
  interface IAppProps { 
    user?: {
      email?: string;
      image?: string;
      points?: number;
      balance?: number;
      role?: string;
    };
  }
  
  const App: React.FunctionComponent<IAppProps> = ({ user }) => {
    const handleLogout = () => {
      // Handle logout logic here
      console.log('Logout clicked');
      // Redirect to login page or clear user session
      router.push('/login');
    };
  
    return (
      <div className="flex items-center justify-end p-4">
        {user?.email ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer w-12 h-12">
                <Image
                  src={
                    user.image
                      ? `http://localhost:8000${user.image}`
                      : '/pngegg.png'
                  } // Replace with user's avatar URL
                  alt="User Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg">
              <DropdownMenuItem className="text-lg font-medium mb-2">
                {/* <div>Your Points: <span className="font-bold">{user.points ?? 0}</span></div> */}
                <div>Your Balance: <span className="font-bold">${user.balance ?? 0}</span></div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-lg font-medium cursor-pointer hover:bg-green-100 rounded p-2"
                onClick={() => {
                  router.push(user.role === 'ADMIN' ? '/admin/profile' : '/user/profile');
                }}
              >
                Profile
              </DropdownMenuItem>
              <hr className="my-2 border-gray-300" />
              <DropdownMenuItem
                className="text-lg font-medium cursor-pointer hover:bg-red-100 rounded p-2"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-4">
            <Button
              onClick={() => router.replace('/login')}
              className="bg-white text-lg text-gray-800 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              Login
            </Button>
            <Button
              onClick={() => router.replace('/register')}
              className="bg-green-400 text-lg text-white rounded-lg px-4 py-2 hover:bg-green-500"
            >
              Register
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  export default App;
  