import { CarIcon } from '../../shared/CarIcon';
import { Car } from '../../types';

import './car-item.scss';

type CarItemProps = {
  car: Car;
};

export const CarItem: React.FC<CarItemProps> = ({ car }) => {
  return (
    <>
      <div>{car.name}</div>
      <CarIcon color={car.color} />
    </>
  );
};
