import { useContext, useEffect, useState } from 'react';

import { CarItem } from '../car-item';
import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';

import { useGetPage } from '../../hooks/useGetPage';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { SHOWED_CAR_ITEMS } from '../../consts';

import './car-list.scss';

export const CarList = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const { responseStatus, cars, setCars, countCars, setCountCars } =
    useContext(AppContext);

  const { page, setPage } = useGetPage();

  useEffect(() => {
    setState('loading');
    garageService
      .getCars({ pageNumber: page, limit: SHOWED_CAR_ITEMS })
      .then(({ data, count }) => {
        setCars(data);
        setCountCars(count);
        setState('idle');
      })
      .catch(() => {
        setState('error');
      });
  }, [setCars, setCountCars, page]);

  useEffect(() => {
    if (responseStatus !== 'success') {
      return;
    }
    setState('loading');
    garageService
      .getCars({ pageNumber: page, limit: SHOWED_CAR_ITEMS })
      .then(({ data, count }) => {
        setCars(data);
        setCountCars(count);
        setState('idle');
      })
      .catch(() => {
        setState('error');
      });
  }, [setCars, setCountCars, responseStatus, page]);

  useEffect(() => {
    if (cars && cars.length === 0 && page > 1) {
      setState('loading');
      garageService
        .getCars({ pageNumber: page - 1, limit: SHOWED_CAR_ITEMS })
        .then(({ data, count }) => {
          setCars(data);
          setCountCars(count);
          setState('idle');
          setPage(page - 1);
        })
        .catch(() => {
          setState('error');
        });
    }
  }, [cars, page, setPage, setCars, setCountCars]);

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
