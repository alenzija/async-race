import { createContext } from 'react';

import { Car, ResponseStatus } from './types';

type AppContextType = {
  responseStatus: ResponseStatus | null;
  message: string | null;
  selectedCar: Car | null;
  setResponseStatus: (value: ResponseStatus | null) => void;
  setMessage: (value: string | null) => void;
  setSelectedCar: (value: Car | null) => void
}

export const AppContext = createContext<AppContextType>({
  responseStatus: null,
  message: null,
  selectedCar: null,
  setResponseStatus: () => {},
  setMessage: () => {},
  setSelectedCar: () => {},
});
