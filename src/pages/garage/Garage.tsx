import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { CarForm } from '../../components/car-form';
import { Spinner } from '../../components/spinner';
import { CarList } from '../../components/car-list';

import { Car } from '../../types';

import './garage.scss';
import { garageService } from '../../services/garage-service';

export const Garage = () => {
  const data = useLoaderData() as {
    res: {
      count: number;
      cars: Car[];
    };
  };

  return (
    <>
      <div>
        <CarForm
          buttonTitle="Create"
          nameId="create-car-name"
          colorId="create-car-color"
          submitAction={garageService.createCar}
        />
        <CarForm
          buttonTitle="Update"
          nameId="update-car-name"
          colorId="update-car-color"
          // change to updateCar method
          submitAction={garageService.createCar}
        />
        <button type="button">Generate cars</button>
      </div>
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.res}>
          {(res) => <CarList cars={res.data} count={res.count} />}
        </Await>
      </Suspense>
    </>
  );
};
