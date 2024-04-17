import { useContext, useEffect, useState } from 'react';

import { CarItem } from '../car-item';
import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';

import { useGetPage } from '../../hooks/useGetPage';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import './car-list.scss';

const SHOWED_ITEMS = 7;

export const CarList = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const { responseStatus, cars, setCars, countCars, setCountCars } =
    useContext(AppContext);

  const page = useGetPage();

  useEffect(() => {
    if (cars) {
      return;
    }
    setState('loading');
    garageService
      .getCars({ pageNumber: page, limit: SHOWED_ITEMS })
      .then(({ data, count }) => {
        setCars(data);
        setCountCars(count);
        setState('idle');
      })
      .catch(() => {
        setState('error');
      });
  }, [setCars, setCountCars, cars, page]);

  useEffect(() => {
    if (responseStatus !== 'success') {
      return;
    }
    setState('loading');
    garageService
      .getCars({ pageNumber: page, limit: SHOWED_ITEMS })
      .then(({ data, count }) => {
        setCars(data);
        setCountCars(count);
        setState('idle');
      })
      .catch(() => {
        setState('error');
      });
  }, [setCars, setCountCars, responseStatus, page]);

  return (
    <>
      <h3>{`Garage (${countCars})`}</h3>
      <div>
        {state === 'error' && <ErrorMessage />}
        {state === 'loading' && <Spinner />}
        {state === 'idle' &&
          cars &&
          cars.map((car) => <CarItem key={car.id} car={car} />)}
      </div>
    </>
  );
};
