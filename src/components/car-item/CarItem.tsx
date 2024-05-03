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

const START_LEFT_POSITION = 90;

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
  const carState = useRef<Car>(car);

  const updateCars = useCallback(() => {
    setCars(cars.map((item) => (item.id === car.id ? carState.current : item)));
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
    if (!carRef.current) {
      return;
    }
    const carPosition = carRef.current.getBoundingClientRect();
    return carPosition.left;
  }, []);

  const onStart = useCallback(() => {
    const id = car.id;
    if (!id) {
      return;
    }
    carState.current.isRun = true;
    const controller = new AbortController();
    setStartLoading(true);
    garageService
      .doStart(id)
      .then((time) => {
        carState.current.time = Math.round(time / 10) / 100;
        carState.current.isReadyToStart = false;
        updateCars();
        setIsAnimated(true);
        setStartLoading(false);
        garageService.doDrive(id, controller.signal).then((res) => {
          if (!res) {
            setIsAnimationPause(true);
            carState.current.leftPosition = getLeftPosition();
            updateCars();
          }
        });
      })
      .catch(() => {
        carState.current.isRun = false;
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
    carState.current.isRun = false;
    setStopLoading(true);
    garageService
      .doStop(car.id)
      .then(() => {
        setIsAnimated(false);
        setIsAnimationPause(false);
        carState.current.time = undefined;
        carState.current.leftPosition = undefined;
        carState.current.isReadyToStart = true;
        updateCars();
      })
      .catch(() => {
        carState.current.isRun = true;
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
    carState.current.leftPosition = getLeftPosition();
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
          transform: `translateX(${(car.leftPosition || START_LEFT_POSITION) - 10}px)`,
        }}
      >
        <CarIcon color={car.color} />
      </div>
      <img src={flag} alt="flag" className="car-item__flag-img" />
    </div>
  );
};
