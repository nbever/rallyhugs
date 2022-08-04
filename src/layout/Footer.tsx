import * as React from 'react';
import {
  Footer as MineralFooter,
  FooterLink as MineralFooterLink,
  FooterLinkProps,
} from '@mineral/core';
import { BroadcomLogo } from './BroadcomLogo';

const FooterLink: React.FC<FooterLinkProps> = (props) => (
  <MineralFooterLink target="_blank" rel="noopener" {...props} />
);

export const Footer: React.FC = () => (
  <MineralFooter
    logo={
      <FooterLink href="https://www.broadcom.com" color="inherit">
        <BroadcomLogo sx={{ display: 'flex', height: 24, width: 175 }} />
      </FooterLink>
    }
    title="Rally Hugs">
    <FooterLink href="https://www.broadcom.com/company/legal/cookie-policy">
      Cookie Policy
    </FooterLink>
    <FooterLink href="https://www.broadcom.com/company/legal/privacy-policy">
      Privacy Policy
    </FooterLink>
    <FooterLink href="https://www.broadcom.com/company/legal/terms-of-use">
      Terms of Use
    </FooterLink>
  </MineralFooter>
);
