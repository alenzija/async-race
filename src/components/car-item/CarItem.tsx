import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Spinner } from '../spinner';
import { EditIcon, RemoveIcon, CarIcon } from '../../shared/icons';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';
import { winnerService } from '../../services/winner-service';

import { Car } from '../../types';

import { SHOWED_CAR_ITEMS } from '../../consts';

import flag from '../../assets/img/flag.png';

import './car-item.scss';

type CarItemProps = {
  car: Car;
};

export const CarItem: React.FC<CarItemProps> = ({ car }) => {
  const {
    setResponseStatus,
    setMessage,
    setSelectedCar,
    garagePage,
    setCars,
    setCountCars,
    cars,
    raceState,
    setRaceState,
    setFinishedCar,
    setWinners,
    winners,
    setWinnersCount,
    winnersCount,
  } = useContext(AppContext);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [stopLoading, setStopLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isAnimationPause, setIsAnimationPause] = useState(false);
  const carRef = useRef<HTMLDivElement | null>(null);

  const updateCars = useCallback(() => {
    setCars(cars.map((item) => (item.id === car.id ? car : item)));
  }, [car, cars, setCars]);

  const onDelete = async () => {
    if (!car.id) {
      return;
    }
    setDeleteLoading(true);
    setResponseStatus(null);
    setMessage(null);
    try {
      await garageService.deleteCar(car.id);
      const { data, count } = await garageService.getCars({
        pageNumber: garagePage,
        limit: SHOWED_CAR_ITEMS,
      });
      setCars(data);
      setCountCars(count);
      setResponseStatus('success');
      setMessage('The car was deleted');
      const status = await winnerService.deleteWinner(car.id);
      if (status) {
        if (winners.some((item) => item.id === car.id)) {
          setWinners(winners.filter((item) => item.id !== car.id));
        }
        setWinnersCount(winnersCount - 1);
      }
    } catch {
      setResponseStatus('error');
      setMessage('Something went wrong');
    } finally {
      setDeleteLoading(false);
    }
  };

  const onSelect = () => {
    setSelectedCar(car);
  };

  const getLeftPosition = useCallback(() => {
    if (!carRef.current || car.leftPosition) {
      return;
    }
    const carPosition = carRef.current.getBoundingClientRect();
    return carPosition.left;
  }, [car.leftPosition]);

  const onStart = useCallback(() => {
    const id = car.id;
    if (!id) {
      return;
    }
    car.isRun = true;
    const controller = new AbortController();
    setStartLoading(true);
    garageService
      .doStart(id)
      .then((time) => {
        car.time = Math.round(time / 10) / 100;
        car.isReadyToStart = false;
        updateCars();
        setIsAnimated(true);
        setStartLoading(false);
        garageService.doDrive(id, controller.signal).then((res) => {
          if (!res) {
            setIsAnimationPause(true);
            car.leftPosition = getLeftPosition();
            updateCars();
          }
        });
      })
      .catch(() => {
        car.isRun = false;
        setResponseStatus('error');
        setMessage('Something went wrong');
      })
      .finally(() => {
        setStopLoading(false);
      });
  }, [car, getLeftPosition, setMessage, setResponseStatus, updateCars]);

  const onStop = useCallback(() => {
    if (!car.id) {
      return;
    }
    car.isRun = false;
    setStopLoading(true);
    garageService
      .doStop(car.id)
      .then(() => {
        setIsAnimated(false);
        setIsAnimationPause(false);
        car.time = undefined;
        car.leftPosition = undefined;
        car.isReadyToStart = true;
        updateCars();
      })
      .catch(() => {
        car.isRun = true;
        setResponseStatus('error');
        setMessage('Something went wrong');
      })
      .finally(() => {
        setStopLoading(false);
      });
  }, [car, setMessage, setResponseStatus, updateCars]);

  useEffect(() => {
    if (!raceState) {
      return;
    }
    if (raceState === 'start' && !car.isRun) {
      onStart();
    }
    if (raceState === 'reset' && car.isRun) {
      onStop();
      setRaceState(null);
    }
  }, [raceState, onStart, onStop, car.isRun, setRaceState]);

  const handleAnimationEnd = () => {
    if (!car.time) {
      return;
    }
    car.leftPosition = getLeftPosition();
    updateCars();
    if (raceState === 'start') {
      setFinishedCar(car);
      setRaceState('hasWinner');
    }
  };

  return (
    <div className="car-item">
      <div className="car-item__header">
        <div>{car.name}</div>
        <button
          type="button"
          onClick={onDelete}
          className="car-item__header--button"
        >
          {deleteLoading ? <Spinner size={20} /> : <RemoveIcon />}
        </button>
        <button
          type="button"
          onClick={onSelect}
          className="car-item__header--button"
        >
          <EditIcon />
        </button>
      </div>
      <div className="car-item__race-menu">
        <button
          type="button"
          onClick={onStart}
          disabled={
            !(car.isReadyToStart === undefined || car.isReadyToStart === true)
          }
          className="car-item__race-menu--button"
        >
          {startLoading ? <Spinner size={20} /> : 'A'}
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!car.isRun}
          className="car-item__race-menu--button"
        >
          {stopLoading ? <Spinner size={20} /> : 'B'}
        </button>
      </div>
      <div
        ref={carRef}
        onAnimationEnd={handleAnimationEnd}
        className={`car-item__car-img ${isAnimated ? 'start' : ''} ${isAnimationPause ? 'pause' : ''}`}
        style={{
          animationDuration: `${car.time}s`,
          transform: `translateX(${(car.leftPosition || 90) - 10}px)`,
        }}
      >
        <CarIcon color={car.color} />
      </div>
      <img src={flag} alt="flag" className="car-item__flag-img" />
    </div>
  );
};
