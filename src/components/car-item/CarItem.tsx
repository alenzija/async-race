import { useContext, useState } from 'react';

import { CarIcon } from '../../shared/CarIcon';
import { Spinner } from '../spinner';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { Car } from '../../types';

import './car-item.scss';

type CarItemProps = {
  car: Car;
};

export const CarItem: React.FC<CarItemProps> = ({ car }) => {
  const { setResponseStatus, setMessage, setSelectedCar } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    if (!car.id) {
      return;
    }
    setLoading(true);
    garageService
      .deleteCar(car.id)
      .then(() => {
        setResponseStatus('success');
        setMessage('The car was deleted');
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
