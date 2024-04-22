import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AppContext } from './app-context';

import { garageService } from './services/garage-service';
import { winnerService } from './services/winner-service';

import {
  Car,
  Order,
  RaceState,
  ResponseStatus,
  Sort,
  State,
  Winner,
} from './types';

import { SHOWED_CAR_ITEMS, SHOWED_WINNER_ITEMS } from './consts';

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
  const [winners, setWinners] = useState<Winner[]>([]);
  const [winnersCount, setWinnersCount] = useState(0);
  const [winnersPage, setWinnersPage] = useState(1);
  const [winnersState, setWinnersState] = useState<State>('idle');
  const [winnersSort, setWinnersSort] = useState<Sort>(Sort.id);
  const [winnersOrder, setWinnersOrder] = useState<Order>(Order.asc);

  useEffect(() => {
    if (countCars === 0 || winnersCount === 0) {
      return;
    }
    const promises = winners
      .filter((item) => !item.name && item.id)
      .map((winner) => garageService.getCar(winner.id!));
    Promise.allSettled(promises).then((responseArr) => {
      let updatedWinners: Winner[];
      responseArr.forEach((res) => {
        if (res.status === 'fulfilled') {
          const car = res.value;
          updatedWinners = winners.map((winner) =>
            winner.id === car.id ? { ...winner, ...car } : winner
          );
        }
        setWinners(updatedWinners);
      });
    });
  }, [cars, countCars, winnersCount, winners]);

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
    setRaceState(null);
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

  useEffect(() => {
    setWinnersState('loading');
    winnerService
      .getWinners({
        pageNumber: winnersPage,
        limit: SHOWED_WINNER_ITEMS,
        sort: winnersSort,
        order: winnersOrder,
      })
      .then(({ data, count }) => {
        setWinners(data);
        setWinnersCount(count);
        setWinnersState('idle');
      })
      .then(() => {})
      .catch(() => {
        setWinnersState('error');
      });
  }, [winnersPage, winnersOrder, winnersSort, winnersCount]);

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
        winners,
        winnersCount,
        winnersPage,
        winnersState,
        winnersOrder,
        winnersSort,
        setResponseStatus,
        setMessage,
        setSelectedCar,
        setCars,
        setCountCars,
        setGaragePage,
        setGarageState,
        setRaceState,
        setFinishedCar,
        setWinners,
        setWinnersCount,
        setWinnersPage,
        setWinnersState,
        setWinnersOrder,
        setWinnersSort,
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
