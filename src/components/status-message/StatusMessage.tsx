import { useContext, useEffect } from 'react';

import { AppContext } from '../../app-context';

import './status-message.scss';
import { ErrorIcon, SuccessIcon } from '../../shared/icons';

export const StatusMessage = () => {
  const { message, responseStatus, setMessage, setResponseStatus } =
    useContext(AppContext);

  useEffect(() => {
    if (!responseStatus) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setResponseStatus(null);
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [responseStatus, setMessage, setResponseStatus]);

  return (
    message &&
    responseStatus && (
      <div
        className={`status-message status-message__${responseStatus}`}
        role="alert"
      >
        {responseStatus === 'success' ? <SuccessIcon /> : <ErrorIcon />}
        <div>{message}</div>
      </div>
    )
  );
};
