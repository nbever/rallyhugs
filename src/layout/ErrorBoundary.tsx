import * as React from 'react';
import ErrorPage from 'pages/ErrorPage';

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<Record<string, unknown>>,
  {
    error: Error | null;
  }
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    const { error } = this.state;
    return error ? <ErrorPage error={error} /> : this.props.children;
  }
}
