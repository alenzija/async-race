import { App } from './App';
import { Garage } from './pages/garage';
import { Winners } from './pages/winners';
import { Page404 } from './pages/404';

import { garageLoader } from './components/car-list/CarList';
import { ErrorMessage } from './components/error-message';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        path: 'garage',
        loader: garageLoader,
        element: <Garage />,
        errorElement: <ErrorMessage />,
      },
      {
        path: 'winners',
        element: <Winners />,
      },
    ],
  },
];
