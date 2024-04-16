import './error-message.scss';

import error from './error.jpg';

export const ErrorMessage = () => {
  return <img src={error} alt="error" className="error-message" />;
};
