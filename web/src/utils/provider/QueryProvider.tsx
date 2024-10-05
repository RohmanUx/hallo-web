'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

interface IQueryProviderProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
const QueryProvider: React.FunctionComponent<IQueryProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
