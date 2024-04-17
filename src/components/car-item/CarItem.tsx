import { useContext, useState } from 'react';

import { CarIcon } from '../../shared/CarIcon';
import { Spinner } from '../spinner';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { Car } from '../../types';

import { SHOWED_CAR_ITEMS } from '../../consts';

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
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <button type="button" onClick={onDelete}>
        {loading ? <Spinner width="30px" /> : 'Remove'}
      </button>
      <button type="button" onClick={onSelect}>
        Select
      </button>
      <div>{car.name}</div>
      <CarIcon color={car.color} />
      <div>..........</div>
    </div>
  );
};
