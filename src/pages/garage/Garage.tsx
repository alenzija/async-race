import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { CarForm } from '../../components/car-form';
import { Spinner } from '../../components/spinner';
import { CarList } from '../../components/car-list';

import { Car } from '../../types';

import './garage.scss';

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
        />
        <CarForm
          buttonTitle="Update"
          nameId="update-car-name"
          colorId="update-car-color"
        />
        <button type="button">Generate cars</button>
      </div>
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.res}>
          {(response) => <CarList cars={response.data} />}
        </Await>
      </Suspense>
    </>
  );
};
