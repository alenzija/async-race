import { Link, Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <h1>Async Race</h1>
      <Link to="/garage">Garage</Link>
      <Link to="/winners">Winners</Link>
      <Outlet />
    </>
  );
};
