import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AppContext } from './app-context';

import { ResponseStatus } from './types';

export const App = () => {
  const [responseStatus, setResponseStatus] = useState<ResponseStatus | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!responseStatus) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setResponseStatus(null);
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [responseStatus]);

  return (
    <AppContext.Provider
      value={{ responseStatus, message, setResponseStatus, setMessage }}
    >
      <h1>Async Race</h1>
      <Link to="/garage">To garage</Link>
      <Link to="/winners">To winners</Link>
      <Outlet />
      <div className="alert">{message}</div>
    </AppContext.Provider>
  );
};
