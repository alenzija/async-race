import { defer, useSearchParams } from 'react-router-dom';
import { DeferredData } from '@remix-run/router/dist/utils';
import { garageService } from '../../services/garage-service';

import './car-list.scss';
import { Car } from '../../types';
import { CarItem } from '../car-item';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../app-context';

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
  const [carList, setCarList] = useState(cars);
  const [searchParams] = useSearchParams();
  const { responseStatus } = useContext(AppContext);

  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

  useEffect(() => {
    if (!responseStatus) {
      return;
    }
    garageService
      .getCars({ pageNumber: page, limit: SHOWED_ITEMS })
      .then(({ data }) => setCarList(data));
  }, [page, responseStatus]);

  if (!cars) {
    return null;
  }
  return (
    <div>
      {carList.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};
