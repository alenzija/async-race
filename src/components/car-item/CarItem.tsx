import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { CarIcon } from '../../shared/CarIcon';
import { Spinner } from '../spinner';

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
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
      await winnerService.deleteWinner(car.id);
      setWinners(winners.filter((item) => item.id !== car.id));
    } catch {
      setResponseStatus('error');
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
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
    garageService
      .doStart(id)
      .then((time) => {
        car.time = Math.round(time / 10) / 100;
        car.isReadyToStart = false;
        updateCars();
        setIsAnimated(true);
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
      });
  }, [car, getLeftPosition, setMessage, setResponseStatus, updateCars]);

  const onStop = useCallback(() => {
    if (!car.id) {
      return;
    }
    car.isRun = false;
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
      <button type="button" onClick={onDelete}>
        {loading ? <Spinner width="30px" /> : 'Remove'}
      </button>
      <button type="button" onClick={onSelect}>
        Select
      </button>
      <div>{car.name}</div>
      <button
        type="button"
        onClick={onStart}
        disabled={
          !(car.isReadyToStart === undefined || car.isReadyToStart === true)
        }
      >
        A
      </button>
      <button type="button" onClick={onStop} disabled={!car.isRun}>
        B
      </button>
      <div
        ref={carRef}
        onAnimationEnd={handleAnimationEnd}
        className={`car-item__car-img ${isAnimated ? 'start' : ''} ${isAnimationPause ? 'pause' : ''}`}
        style={{
          animationDuration: `${car.time}s`,
          transform: `translateX(${(car.leftPosition || 150) - 10}px)`,
        }}
      >
        <CarIcon color={car.color} />
      </div>
      <img src={flag} alt="flag" className="car-item__flag-img" />
    </div>
  );
};
