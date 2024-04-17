import { createContext } from 'react';

import { Car, ResponseStatus } from './types';

type AppContextType = {
  responseStatus: ResponseStatus | null;
  message: string | null;
  selectedCar: Car | null;
  cars: Car[] | null;
  countCars: number;
  setResponseStatus: (value: ResponseStatus | null) => void;
  setMessage: (value: string | null) => void;
  setSelectedCar: (value: Car | null) => void
  setCars: (value: Car[] | null) => void;
  setCountCars: (value: number) => void;
}

export const AppContext = createContext<AppContextType>({
  responseStatus: null,
  message: null,
  selectedCar: null,
  cars: [],
  countCars: 0,
  setResponseStatus: () => {},
  setMessage: () => {},
  setSelectedCar: () => {},
  setCars: () => {},
  setCountCars: () => {},
});
