import { defer } from 'react-router-dom';
import { DeferredData } from '@remix-run/router/dist/utils';
import { garageService } from '../../services/garage-service';

import './car-list.scss';
import { Car } from '../../types';
import { CarItem } from '../car-item';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../app-context';
import { useGetPage } from '../../hooks/useGetPage';

const SHOWED_ITEMS = 7;

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
  count: number;
};

export const CarList: React.FC<CarListProps> = ({ cars, count }) => {
  const [carList, setCarList] = useState(cars);
  const { responseStatus } = useContext(AppContext);

  const page = useGetPage();

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
    <>
      <h3>{`Garage (${count})`}</h3>
      <div>
        {carList.map((car) => (
          <CarItem key={car.id} car={car} />
        ))}
      </div>
    </>
  );
};
