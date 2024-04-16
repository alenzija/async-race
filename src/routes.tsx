import { App } from './App';
import { Garage } from './pages/garage';
import { Winners } from './pages/winners';

import { garageLoader } from './components/car-list/CarList';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: 'garage',
        loader: garageLoader,
        element: <Garage />,
      },
      {
        path: 'winners',
        element: <Winners />,
      },
    ],
  },
];
