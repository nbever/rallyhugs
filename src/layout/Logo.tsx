import * as React from 'react';
import { SvgIcon, SvgIconProps } from '@mineral/core';
// @ts-ignore
import rallyOnion from 'assets/rally_hug_onion.svg';

export const Logo: React.FC<SvgIconProps> = (props) => (
  <SvgIcon
    component={rallyOnion}
    sx={{ fontSize: '48px', paddingTop: '4px' }} />
);
