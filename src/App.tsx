import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AppContext } from './app-context';

import { garageService } from './services/garage-service';

import { Car, RaceState, ResponseStatus, State } from './types';

import { SHOWED_CAR_ITEMS } from './consts';

export const App = () => {
  const [responseStatus, setResponseStatus] = useState<ResponseStatus | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [countCars, setCountCars] = useState(0);
  const [garagePage, setGaragePage] = useState(1);
  const [garageState, setGarageState] = useState<State>('idle');
  const [raceState, setRaceState] = useState<RaceState | null>(null);
  const [finishedCar, setFinishedCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!responseStatus) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setResponseStatus(null);
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [responseStatus]);

  useEffect(() => {
    setGarageState('loading');
    garageService
      .getCars({ pageNumber: garagePage, limit: SHOWED_CAR_ITEMS })
      .then(({ data, count }) => {
        setCars(data);
        setCountCars(count);
        setGarageState('idle');
      })
      .catch(() => {
        setGarageState('error');
      });
  }, [setCars, setCountCars, garagePage]);

  return (
    <AppContext.Provider
      value={{
        responseStatus,
        message,
        selectedCar,
        cars,
        countCars,
        garagePage,
        garageState,
        raceState,
        finishedCar,
        setResponseStatus,
        setMessage,
        setSelectedCar,
        setCars,
        setCountCars,
        setGaragePage,
        setGarageState,
        setRaceState,
        setFinishedCar,
      }}
    >
      <h1>Async Race</h1>
      <Link to="/garage">To garage</Link>
      <Link to="/winners">To winners</Link>
      <Outlet />
      <div className="alert">{message}</div>
    </AppContext.Provider>
  );
};
