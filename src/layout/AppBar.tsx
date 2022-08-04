import * as React from 'react';
import { AppBar as MineralAppBar, AppBarProps, ThemeMenu } from '@mineral/core';
import { LogoType } from './LogoType';
import { UserMenu } from './UserMenu';

export const AppBar: React.FC<AppBarProps> = (props) => (
  <MineralAppBar
    logo={<LogoType title="Rally Hugs" />}
    actions={
      <>
        <ThemeMenu />
        <UserMenu />
      </>
    }
    {...props}
  />
);
