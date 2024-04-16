import { Component, ReactNode } from 'react';
import { ErrorMessage } from '../error-message';

export class ErrorBoundary extends Component<
  Readonly<{ children: ReactNode }>
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('ErrorBoundary did catch', error.message);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
