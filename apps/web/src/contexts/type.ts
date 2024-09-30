import { ReactNode } from "react";

export type UserType = {
  [x: string]: any;
  token: any;
  id: any;
  balance: string;
    email: string;
  role: string;
  identificationId: string;
  points: number;
  image: string;
};

export interface UserContextType {
  user: UserType | null;
  loading: boolean;
  setLoading: React.Dispatch <React.SetStateAction<boolean>>;
  setUser: React.Dispatch <React.SetStateAction<UserType | null>>;
}
