import * as React from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mineral/core';
import { Page } from 'layout/Page';

const NotFoundPage: React.FC = () => {
  // NOTE: This match/nagivate code block is only needed for Mineral's internal CI deploy environment
  const match = useMatch('/index.html');
  const navigate = useNavigate();
  React.useEffect(() => {
    match && navigate('/', { replace: true });
  }, [match, navigate]);

  return (
    <Page title="Not Found" data-testid="notFoundPage">
      <Box textAlign="center">
        <Typography paragraph>
          We could not find what you were looking for.
        </Typography>
        <Button
          variant="outlined"
          // @ts-ignore - Upstream issue with "component" prop in @mineral/core
          component={Link}
          to="/">
          Back to Home Page
        </Button>
      </Box>
    </Page>
  );
};

export default NotFoundPage;
