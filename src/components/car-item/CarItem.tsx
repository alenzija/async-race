import { useContext, useRef, useState } from 'react';

import { CarIcon } from '../../shared/CarIcon';
import { Spinner } from '../spinner';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

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
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(car.isRun && !car.leftPosition);
  const [animationDuration, setAnimationDuration] = useState<number | null>(
    null
  );
  const [isAnimationPause, setIsAnimationPause] = useState(false);
  const carRef = useRef<HTMLDivElement | null>(null);

  const onDelete = () => {
    if (!car.id) {
      return;
    }
    setLoading(true);
    setResponseStatus(null);
    setMessage(null);
    garageService
      .deleteCar(car.id)
      .then(() => {
        garageService
          .getCars({ pageNumber: garagePage, limit: SHOWED_CAR_ITEMS })
          .then(({ data, count }) => {
            setCars(data);
            setCountCars(count);
            setResponseStatus('success');
            setMessage('The car was deleted');
          })
          .catch(() => {
            setResponseStatus('error');
            setMessage('Something went wrong');
          });
      })
      .catch(() => {
        setResponseStatus('error');
        setMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSelect = () => {
    setSelectedCar(car);
  };

  const onStart = () => {
    const id = car.id;
    if (!id) {
      return;
    }
    const controller = new AbortController();
    garageService
      .doStart(id)
      .then((time) => {
        car.isRun = true;
        setCars(cars.map((item) => (item.id === car.id ? car : item)));
        setAnimationDuration(time);
        setIsAnimated(true);
        garageService.doDrive(id, controller.signal).then((res) => {
          if (!res) {
            setIsAnimationPause(true);
            handleAnimationEnd();
          }
        });
      })
      .catch(() => {
        setResponseStatus('error');
        setMessage('Something went wrong');
      });
  };

  const onStop = () => {
    if (!car.id) {
      return;
    }
    garageService
      .doStop(car.id)
      .then(() => {
        setIsAnimated(false);
        setAnimationDuration(null);
        setIsAnimationPause(false);
        car.isRun = false;
        car.leftPosition = undefined;
        setCars(cars.map((item) => (item.id === car.id ? car : item)));
      })
      .catch(() => {
        setResponseStatus('error');
        setMessage('Something went wrong');
      });
  };

  const handleAnimationEnd = () => {
    if (!carRef.current || car.leftPosition) {
      return;
    }
    const carPosition = carRef.current.getBoundingClientRect();
    car.leftPosition = carPosition.left;
    setCars(cars.map((item) => (item.id === car.id ? car : item)));
  };

  console.log(car);
  return (
    <div className="car-item">
      <button type="button" onClick={onDelete}>
        {loading ? <Spinner width="30px" /> : 'Remove'}
      </button>
      <button type="button" onClick={onSelect}>
        Select
      </button>
      <div>{car.name}</div>
      <button type="button" onClick={onStart} disabled={car.isRun}>
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
          animationDuration: `${animationDuration}ms`,
          transform: `translateX(${car.leftPosition || 150}px)`,
        }}
      >
        <CarIcon color={car.color} />
      </div>
      <img src={flag} alt="flag" className="car-item__flag-img" />
    </div>
  );
};
