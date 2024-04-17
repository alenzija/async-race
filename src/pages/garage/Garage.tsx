import { useContext } from 'react';

import { CarForm } from '../../components/car-form';
import { CarList } from '../../components/car-list';
import { GeneratedCarButton } from '../../components/generated-car-button';
import { Pagination } from '../../components/pagination';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { SHOWED_CAR_ITEMS } from '../../consts';

import './garage.scss';

export const Garage = () => {
  const { countCars, garagePage, setGaragePage, garageState } =
    useContext(AppContext);
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
          defaultValue
          submitAction={garageService.updateCar}
        />
        <GeneratedCarButton />
      </div>
      <CarList />
      <Pagination
        showedItems={SHOWED_CAR_ITEMS}
        itemsCount={countCars}
        currentPage={garagePage}
        setPage={setGaragePage}
        state={garageState}
      />
    </>
  );
};
