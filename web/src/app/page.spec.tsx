// page.spec.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './page';

// Create a client
const queryClient = new QueryClient();

describe('<Home />', () => {
  it('mounts', () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
  });

  it('renders a header', () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    cy.get('h1').should('exist'); // Adjust the selector based on your actual component
  });
});
