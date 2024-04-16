import { defer } from 'react-router-dom';
import { DeferredData } from '@remix-run/router/dist/utils';
import { garageService } from '../../services/garage-service';

import './car-list.scss';
import { Car } from '../../types';
import { CarItem } from '../car-item';

const SHOWED_ITEMS = 10;

export const garageLoader = async ({
  request,
}: {
  request: Request;
}): Promise<DeferredData> => {
  const url = new URL(request.url);
  const page = url.searchParams.has('page')
    ? +url.searchParams.get('page')!
    : 1;

  const res = garageService.getCars({ pageNumber: page, limit: SHOWED_ITEMS });
  return defer({ res });
};

type CarListProps = {
  cars: Car[];
};

export const CarList: React.FC<CarListProps> = ({ cars }) => {
  console.log(cars);
  if (!cars) {
    return null;
  }
  return (
    <div>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};
