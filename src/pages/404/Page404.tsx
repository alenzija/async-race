import { Link } from 'react-router-dom';

import errorImg from './error.png';

import './page404.scss';

export const Page404 = () => {
  return (
    <div className="not-found-page">
      <img src={errorImg} alt="404 not found" />
      <Link to="/garage">Go home</Link>
    </div>
  );
};
