import { useCallback, useContext, useEffect, useState } from 'react';

import { CarForm } from '../../components/car-form';
import { CarList } from '../../components/car-list';
import { GeneratedCarButton } from '../../components/generated-car-button';
import { Pagination } from '../../components/pagination';
import { Modal } from '../../components/modal';
import { RaceForm } from '../../components/race-form';

import { AppContext } from '../../app-context';

import { garageService } from '../../services/garage-service';
import { winnerService } from '../../services/winner-service';

import { getOrdinalAdverb } from '../../utils';

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
    winners,
    setWinners,
    setWinnersCount,
    winnersCount,
    setRaceState,
    setFinishedCar,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [wins, setWins] = useState<number>(0);

  const updateWinners = useCallback(
    (car: Car) => {
      const { id, time } = car;
      if (!id || !time) {
        return;
      }
      winnerService.getWinner(id).then((winner) => {
        if (winner) {
          winnerService
            .updateWinner({
              id: car.id,
              wins: winner.wins + 1,
              time: winner.time <= time ? winner.time : time,
            })
            .then((updatedWinner) => {
              setWinners(
                winners.map((item) =>
                  item.id === updatedWinner.id ? updatedWinner : item
                )
              );
              setFinishedCar(null);
              setWins(0);
            });
        } else {
          winnerService.createWinner({ id, wins: 1, time }).then((winner) => {
            setWinners([...winners, winner]);
            setWinnersCount(winnersCount + 1);
            setFinishedCar(null);
            setWins(0);
          });
        }
      });
    },
    [setFinishedCar, setWinners, setWinnersCount, winners, winnersCount]
  );

  useEffect(() => {
    if (finishedCar && finishedCar.id) {
      winnerService.getWinner(finishedCar.id).then((winner) => {
        if (winner) {
          setWins(winner.wins + 1);
        } else {
          setWins(1);
        }
        setIsOpen(true);
        setRaceState('hasWinner');
      });
    }
  }, [finishedCar, setRaceState]);

  const onClose = () => {
    setIsOpen(false);
    if (finishedCar) {
      updateWinners(finishedCar);
    }
  };

  const createCar = async (data: Car) => {
    try {
      const car = await garageService.createCar(data);
      setResponseStatus('success');
      setMessage('The car was successfully created');
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
      setMessage('The car was successfully updated');
      setSelectedCar(null);
      setCars(
        cars.map((item) => (car.id === item.id ? { ...item, ...car } : item))
      );
      setWinners(
        winners.map((item) => (item.id === car.id ? { ...item, ...car } : item))
      );
    } catch {
      setResponseStatus('error');
      setMessage('Something went wrong');
    }
  };

  return (
    <>
      <div className="garage">
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
        <RaceForm />
        <CarList />
        <Pagination
          showedItems={SHOWED_CAR_ITEMS}
          itemsCount={countCars}
          currentPage={garagePage}
          setPage={setGaragePage}
          state={garageState}
        />
      </div>
      {finishedCar && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div>{`${finishedCar.name} won ${getOrdinalAdverb(wins)} [${finishedCar.time}]`}</div>
        </Modal>
      )}
    </>
  );
};
