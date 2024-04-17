import { useContext, useState } from 'react';

import { Spinner } from '../spinner';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { generateRandomCar } from '../../utils';

import { Car } from '../../types';

import { RANDOM_CARS_GENERATED_COUNT } from '../../consts';

import './generated-car-button.scss';

export const GeneratedCarButton = () => {
  const { setResponseStatus, setMessage } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const generateCars = async (count: number) => {
    const promises: Promise<Car>[] = [];
    for (let i = 0; i < count; i += 1) {
      promises.push(garageService.createCar(generateRandomCar()));
    }
    return Promise.allSettled(promises).then((results) => {
      const newCount = results.filter(
        (result) => result.status === 'rejected'
      ).length;
      if (newCount === count) {
        throw new Error('Something went wrong');
      }
      if (newCount === 0) {
        return;
      }
      generateCars(newCount);
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
