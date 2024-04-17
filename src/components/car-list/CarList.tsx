import { useContext, useEffect } from 'react';

import { CarItem } from '../car-item';
import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { SHOWED_CAR_ITEMS } from '../../consts';

import './car-list.scss';

export const CarList = () => {
  const {
    responseStatus,
    cars,
    setCars,
    countCars,
    setCountCars,
    garagePage,
    setGaragePage,
    garageState,
    setGarageState,
  } = useContext(AppContext);

  useEffect(() => {
    if (responseStatus !== 'success') {
      return;
    }
    console.log('updateStatus');
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
  }, [setCars, setCountCars, responseStatus, garagePage, setGarageState]);

  useEffect(() => {
    if (cars && cars.length === 0 && garagePage > 1) {
      setGarageState('loading');
      garageService
        .getCars({ pageNumber: garagePage - 1, limit: SHOWED_CAR_ITEMS })
        .then(({ data, count }) => {
          setCars(data);
          setCountCars(count);
          setGarageState('idle');
          setGaragePage(garagePage - 1);
        })
        .catch(() => {
          setGarageState('error');
        });
    }
  }, [cars, garagePage, setGaragePage, setCars, setCountCars, setGarageState]);

  return (
    <>
      <h3>{`Garage (${countCars})`}</h3>
      <div>
        {garageState === 'error' && <ErrorMessage />}
        {garageState === 'loading' && <Spinner />}
        {garageState === 'idle' &&
          cars &&
          cars.map((car) => <CarItem key={car.id} car={car} />)}
      </div>
    </>
  );
};
