import { CarForm } from '../../components/car-form';
import { CarList } from '../../components/car-list';
import { GeneratedCarButton } from '../../components/generated-car-button';

import { garageService } from '../../services/garage-service';

import './garage.scss';

export const Garage = () => {
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
    </>
  );
};
