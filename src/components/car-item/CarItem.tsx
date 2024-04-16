import { useContext } from 'react';

import { CarIcon } from '../../shared/CarIcon';

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

  const onDelete = () => {
    if (!car.id) {
      return;
    }
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

  const onSelect = () => {
    setSelectedCar(car);
  };

  return (
    <>
      <div>{car.name}</div>
      <CarIcon color={car.color} />
      <button type="button" onClick={onDelete}>
        Remove
      </button>
      <button type="button" onClick={onSelect}>
        Select
      </button>
    </>
  );
};
