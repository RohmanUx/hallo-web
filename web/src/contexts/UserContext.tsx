'use client';

import * as React from 'react';
import apiCall from '@/helper/apiCall';
import { toast } from 'react-toastify';
import { UserContextType, UserType } from './type';  // Import your types

// Create the UserContext with a default value (to match your types)
export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
});

interface IUserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FunctionComponent<IUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserType | null>(null); // User state
  const [loading, setLoading] = React.useState<boolean>(true); // Loading state

  const keepLogin = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const { data } = await apiCall.get('/api/auth/keeplogin', {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from localStorage
        },
      });

      if (!data?.result) {
        throw new Error('Invalid user data from API');
      }

      // Update user state with data from the response
      setUser({
        id: data.result.id,
        email: data.result.email,
        identificationId: data.result.identificationId,
        role: data.result.role,
        points: data.result.points,
        balance: data.result.balance,
        image: data.result.image,
        token: data.result.token, // Store the new token
      });

      // Update the token in localStorage
      localStorage.setItem('token', data.result.token);
    } catch (error: any) {
      console.error('keepLogin error:', error);
      toast.error('Failed to log in. Please try again.');
      localStorage.removeItem('token'); // Clear invalid token
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Check if there's a token and trigger keepLogin on mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      keepLogin(); // Call keepLogin if token exists
    } else {
      setLoading(false); // Stop loading if no token
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
