import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MultiThemeProvider } from '@mineral/core';

import { UserContextProvider } from 'context/UserContext';
import { Router } from 'layout/Router';
import { ErrorBoundary } from 'layout/ErrorBoundary';

import UserDialog from './UserDialog';

export const AppPlain: React.FC = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <UserContextProvider>
        <UserDialog />
        <Router />
      </UserContextProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MultiThemeProvider>
        <AppPlain />
      </MultiThemeProvider>
    </BrowserRouter>
  );
};
