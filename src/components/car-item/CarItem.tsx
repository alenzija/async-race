import { useContext } from 'react';

import { CarIcon } from '../../shared/CarIcon';

import { AppContext } from '../../app-context';

import { Car } from '../../types';

import './car-item.scss';
import { garageService } from '../../services/garage-service';

type CarItemProps = {
  car: Car;
};

export const CarItem: React.FC<CarItemProps> = ({ car }) => {
  const { setResponseStatus, setMessage } = useContext(AppContext);

  const onDelete = () => {
    garageService
      .deleteCar(car.id)
      .then(() => {
        setResponseStatus('success');
        setMessage('The car was deleted');
      })
      .catch(() => {
        setResponseStatus('error');
        setMessage('Something went wrong');
      });
  };

  return (
    <>
      <div>{car.name}</div>
      <CarIcon color={car.color} />
      <button type="button" onClick={onDelete}>
        Remove
      </button>
    </>
  );
};
