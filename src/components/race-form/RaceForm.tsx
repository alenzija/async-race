import { useContext, useEffect } from 'react';

import { AppContext } from '../../app-context';

import './race-form.scss';

export const RaceForm = () => {
  const { setRaceState, setFinishedCar, garagePage, cars } =
    useContext(AppContext);

  const onRace = () => {
    setRaceState('start');
  };

  const onReset = () => {
    setRaceState('reset');
    setFinishedCar(null);
  };

  useEffect(() => {
    setRaceState(null);
    setFinishedCar(null);
  }, [garagePage, setFinishedCar, setRaceState]);

  return (
    <div className="race-form">
      <button
        disabled={cars.some((car) => car.isReadyToStart === false)}
        type="button"
        onClick={onRace}
        className="race-form--button"
      >
        Race
      </button>
      <button
        disabled={!cars.every((car) => car.isRun)}
        type="button"
        onClick={onReset}
        className="race-form--button"
      >
        Reset
      </button>
    </div>
  );
};
