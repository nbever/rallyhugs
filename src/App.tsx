import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MultiThemeProvider } from '@mineral/core';
import { LocalizationProvider } from '@mineral/date-pickers';
import { AdapterDayjs } from '@mineral/date-pickers/build/AdapterDayjs';

import { UserContextProvider } from 'context/UserContext';
import { ApiContextProvider } from 'context/ApiContext';
import { Router } from 'layout/Router';
import { ErrorBoundary } from 'layout/ErrorBoundary';

import UserDialog from './UserDialog';

export const AppPlain: React.FC = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <ApiContextProvider>
        <UserContextProvider>
          <UserDialog />
          <Router />
        </UserContextProvider>
      </ApiContextProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MultiThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppPlain />
        </LocalizationProvider>
      </MultiThemeProvider>
    </BrowserRouter>
  );
};
