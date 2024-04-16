import { CarForm } from '../../components/car-form';

import './garage.scss';

export const Garage = () => {
  return (
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
    </div>
  );
};
