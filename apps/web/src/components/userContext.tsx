// UserContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface User {
  email?: string;
  noTelp?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {}, // Default noop function
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
