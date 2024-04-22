import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import './nav.scss';

export const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/garage');
    }
  }, [pathname, navigate]);

  return (
    <nav className="nav">
      <NavLink to="/garage">To garage</NavLink>
      <NavLink to="/winners">To winners</NavLink>
    </nav>
  );
};
