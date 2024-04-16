import './error-message.scss';

import error from './error.jpg';

export const ErrorMessage = () => {
  return (
    <div className="error">
      <img src={error} alt="error" className="error-img" />
      <p className="error-message">Something went wrong. Try it again later</p>
    </div>
  );
};
