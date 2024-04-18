import { useContext, useEffect, useState } from 'react';

import { CarForm } from '../../components/car-form';
import { CarList } from '../../components/car-list';
import { GeneratedCarButton } from '../../components/generated-car-button';
import { Pagination } from '../../components/pagination';
import { Modal } from '../../components/modal';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';

import { SHOWED_CAR_ITEMS } from '../../consts';

import { Car } from '../../types';

import './garage.scss';

export const Garage = () => {
  const {
    cars,
    countCars,
    setCountCars,
    setCars,
    garagePage,
    setGaragePage,
    garageState,
    setResponseStatus,
    setMessage,
    setSelectedCar,
    finishedCar,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (finishedCar) {
      setIsOpen(true);
    }
  }, [finishedCar]);

  const onClose = () => {
    setIsOpen(false);
  };

  const createCar = async (data: Car) => {
    try {
      const car = await garageService.createCar(data);
      setResponseStatus('success');
      setMessage('Car was successfully created');
      setCountCars(countCars + 1);
      if (cars.length < SHOWED_CAR_ITEMS) {
        setCars([...cars, car]);
      }
    } catch {
      setResponseStatus('error');
      setMessage('Something went wrong');
    }
  };

  const updateCar = async (data: Car) => {
    try {
      const car = await garageService.updateCar(data);
      setResponseStatus('success');
      setMessage('Car was successfully updated');
      setSelectedCar(null);
      setCars(cars.map((item) => (car.id === item.id ? car : item)));
    } catch {
      setResponseStatus('error');
      setMessage('Something went wrong');
    }
  };

  return (
    <>
      <div>
        <CarForm
          buttonTitle="Create"
          nameId="create-car-name"
          colorId="create-car-color"
          submitAction={createCar}
        />
        <CarForm
          buttonTitle="Update"
          nameId="update-car-name"
          colorId="update-car-color"
          defaultValue
          submitAction={updateCar}
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
      {finishedCar && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div>{`${finishedCar.name} ----  ${finishedCar.time}`}</div>
        </Modal>
      )}
    </>
  );
};
