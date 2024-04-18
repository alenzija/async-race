import { createContext } from 'react';

import { Car, ResponseStatus, State } from './types';

type AppContextType = {
  responseStatus: ResponseStatus | null;
  message: string | null;
  selectedCar: Car | null;
  cars: Car[];
  countCars: number;
  garagePage: number;
  garageState: State;
  finishedCar: Car | null;
  setResponseStatus: (value: ResponseStatus | null) => void;
  setMessage: (value: string | null) => void;
  setSelectedCar: (value: Car | null) => void
  setCars: (value: Car[]) => void;
  setCountCars: (value: number) => void;
  setGaragePage: (value: number) => void;
  setGarageState: (value: State) => void;
  setFinishedCar: (value: Car | null) => void;
}

export const AppContext = createContext<AppContextType>({
  responseStatus: null,
  message: null,
  selectedCar: null,
  cars: [],
  countCars: 0,
  garagePage: 1,
  garageState: 'idle',
  finishedCar: null,
  setResponseStatus: () => {},
  setMessage: () => {},
  setSelectedCar: () => {},
  setCars: () => {},
  setCountCars: () => {},
  setGaragePage: () => {},
  setGarageState: () => {},
  setFinishedCar: () => {},
});
