import { App } from './App';
import { Garage } from './pages/garage';
import { Winners } from './pages/winners';
import { Page404 } from './pages/404';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        path: 'garage',
        element: <Garage />,
      },
      {
        path: 'winners',
        element: <Winners />,
      },
    ],
  },
];
