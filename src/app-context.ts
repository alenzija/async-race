import { createContext } from 'react';

import { Car, Order, RaceState, ResponseStatus, Sort, State, Winner } from './types';

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
  winners: Winner[];
  winnersCount: number;
  winnersPage: number;
  winnersState: State;
  winnersOrder: Order;
  winnersSort: Sort;
  setResponseStatus: (value: ResponseStatus | null) => void;
  setMessage: (value: string | null) => void;
  setSelectedCar: (value: Car | null) => void
  setCars: (value: Car[]) => void;
  setCountCars: (value: number) => void;
  setGaragePage: (value: number) => void;
  setGarageState: (value: State) => void;
  setRaceState: (value: RaceState | null) => void;
  setFinishedCar: (value: Car | null) => void;
  setWinners: (value: Winner[]) => void;
  setWinnersCount: (value: number) => void;
  setWinnersPage: (value: number) => void;
  setWinnersState: (value: State) => void;
  setWinnersOrder: (value: Order) => void;
  setWinnersSort: (value: Sort) => void;
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
  winners: [],
  winnersCount: 0,
  winnersPage: 0,
  winnersState: 'idle',
  winnersOrder: Order.asc,
  winnersSort: Sort.id,
  setResponseStatus: () => {},
  setMessage: () => {},
  setSelectedCar: () => {},
  setCars: () => {},
  setCountCars: () => {},
  setGaragePage: () => {},
  setGarageState: () => {},
  setRaceState: () => {},
  setFinishedCar: () => {},
  setWinners: () => {},
  setWinnersCount: () => {},
  setWinnersPage: () => {},
  setWinnersState: () => {},
  setWinnersOrder: () => {},
  setWinnersSort: () => {},
});
