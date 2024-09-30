'use client'
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { ComponentType, useContext, useEffect } from 'react';

export const withAuth = (WrappedComponent: ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const { user } = useContext(UserContext);

    useEffect(() => {
      if (!user) {
        // If the user is not logged in, redirect to login
        router.replace('/login');
      } else if (user.role === 'ADMIN') {
        // If the user is an admin, redirect to the event page
        router.replace('/event');
      } else if (user.role === 'USER') {
        // If the user is a regular user, redirect to the homepage
        router.replace('/');
      }
    }, [router, user]);

    // If the user data is still being loaded or user is undefined, don't render anything
    if (!user) {
      return null;
    }

    // If the user is logged in, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
