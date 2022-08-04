import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import {
  AppShell as MineralAppShell,
  AppShellProps,
  States,
} from '@mineral/core';
import { AppBar } from './AppBar';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export const AppShell: React.FC<AppShellProps> = (props) => {
  const leftDrawer = {
    state: States.Open,
    userToggled: false,
  };

  return (
    <>
      <Helmet titleTemplate="%s | Rally Hugs" defaultTitle="Rally Hugs" />
      <MineralAppShell
        appBar={<AppBar />}
        footer={<Footer />}
        initialState={{ leftDrawer }}
        leftDrawer={<Navigation />}
        {...props}
      >
        <Outlet />
      </MineralAppShell>
    </>
  );
};
