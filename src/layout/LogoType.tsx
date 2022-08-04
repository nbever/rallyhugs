import * as React from 'react';
import { styled, Typography } from '@mineral/core';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

interface LogoTypeProps {
  title: string;
}

const Root = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  color: 'inherit',
  display: 'flex',
  marginRight: theme.spacing(4),
  textDecoration: 'none',
}));

export const LogoType: React.FC<LogoTypeProps> = ({ title }) => (
  <Root to="/">
    <Logo sx={{ fontSize: 42, ml: 0.25, mr: 1 }} />
    <Typography
      // @ts-ignore : Upstream issue with "component" prop in @mineral/core
      component="p"
      variant="h5"
      color="inherit"
      noWrap>
      {title}
    </Typography>
  </Root>
);
