import { createContext } from 'react';

import { Car, RaceState, ResponseStatus, State } from './types';

type AppContextType = {
  responseStatus: ResponseStatus | null;
  message: string | null;
  selectedCar: Car | null;
  cars: Car[];
  countCars: number;
  garagePage: number;
  garageState: State;
  raceState: RaceState | null;
  finishedCar: Car | null;
  setResponseStatus: (value: ResponseStatus | null) => void;
  setMessage: (value: string | null) => void;
  setSelectedCar: (value: Car | null) => void
  setCars: (value: Car[]) => void;
  setCountCars: (value: number) => void;
  setGaragePage: (value: number) => void;
  setGarageState: (value: State) => void;
  setRaceState: (value: RaceState | null) => void;
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
  raceState: null,
  finishedCar: null,
  setResponseStatus: () => {},
  setMessage: () => {},
  setSelectedCar: () => {},
  setCars: () => {},
  setCountCars: () => {},
  setGaragePage: () => {},
  setGarageState: () => {},
  setRaceState: () => {},
  setFinishedCar: () => {},
});
