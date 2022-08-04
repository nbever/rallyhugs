import * as React from 'react';
import { Button, GlobalStyles } from '@mineral/core';
import { Page } from 'layout/Page';

interface ErrorPageProps {
  error: unknown;
}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  return (
    <>
      <GlobalStyles
        styles={(theme) => {
          // [1] - theme.palette is unrecognized
          // @ts-ignore [1]
          const isLightMode = theme.palette.mode === 'light';

          return {
            ':root': {
              backgroundColor: isLightMode
                ? // @ts-ignore [1]
                  theme.palette.grey[50]
                : // @ts-ignore [1]
                  theme.palette.background.default,
            },
          };
        }}
      />
      <Page title="Something went wrong...">
        <Button
          // @ts-ignore - Upstream issue with "component" prop in @mineral/core
          component="a"
          variant="outlined"
          href="/">
          Back to Home Page
        </Button>
      </Page>
    </>
  );
};

export default ErrorPage;
