import * as React from 'react';
import { Typography } from '@mineral/core';
import { Page } from 'layout/Page';

const HomePage: React.FC = () => {
  return (
    <Page title="Home" data-testid="homePage">
      <Typography paragraph>
        Some recent random customer hugs
      </Typography>
    </Page>
  );
};

export default HomePage;
