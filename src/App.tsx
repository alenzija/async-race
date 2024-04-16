import { Link, Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <h1>Async Race</h1>
      <Link to="/garage">To garage</Link>
      <Link to="/winners">To winners</Link>
      <Outlet />
    </>
  );
};
