import { App } from './App';
import { Garage } from './pages/garage';
import { Winners } from './pages/winners';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Garage />,
      },
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
