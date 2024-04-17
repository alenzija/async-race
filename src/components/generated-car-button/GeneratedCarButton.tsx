import { useContext, useState } from 'react';

import { Spinner } from '../spinner';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { generateRandomCar } from '../../utils';

import { Car } from '../../types';

import { RANDOM_CARS_GENERATED_COUNT, SHOWED_CAR_ITEMS } from '../../consts';

import './generated-car-button.scss';

export const GeneratedCarButton = () => {
  const {
    setResponseStatus,
    setMessage,
    cars,
    setCars,
    setCountCars,
    countCars,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const generateCars = async (count: number) => {
    const promises: Promise<Car>[] = [];
    for (let i = 0; i < count; i += 1) {
      promises.push(garageService.createCar(generateRandomCar()));
    }
    return Promise.allSettled(promises).then((results) => {
      const rejectedResultsCount = results.filter(
        (result) => result.status === 'rejected'
      ).length;

      const fulfilledResults = results
        .map((result) =>
          result.status === 'fulfilled'
            ? result.value
            : { id: -1, name: '', color: '' }
        )
        .filter((item) => item.id !== -1)
        .slice(0, SHOWED_CAR_ITEMS - cars.length);
      setCars([...cars, ...fulfilledResults]);
      setCountCars(countCars + count - rejectedResultsCount);

      if (rejectedResultsCount === count) {
        throw new Error('Something went wrong');
      }
      if (rejectedResultsCount === 0) {
        return;
      }
      generateCars(rejectedResultsCount);
    });
  };

  const onGenerateCars = () => {
    setLoading(true);
    generateCars(RANDOM_CARS_GENERATED_COUNT)
      .then(() => {
        setResponseStatus('success');
        setMessage('The cars were been generated');
      })
      .catch(() => {
        setResponseStatus('error');
        setMessage('Something went wrong');
      })
      .finally(() => setLoading(false));
  };

  return (
    <button type="button" onClick={onGenerateCars}>
      {loading ? <Spinner width="30px" /> : 'Generate cars'}
    </button>
  );
};
