import { useContext, useEffect } from 'react';

import { CarIcon } from '../../shared/CarIcon';

import { garageService } from '../../services/garage-service';

import { AppContext } from '../../app-context';

import { Car, Winner } from '../../types';

import './winner-item.scss';

type WinnerItemProps = {
  winner: Winner;
};

export const WinnerItem: React.FC<WinnerItemProps> = ({ winner }) => {
  const { winners, setWinners } = useContext(AppContext);

  useEffect(() => {
    if (winner.name || !winner.id) {
      return;
    }
    garageService.getCar(winner.id).then((car: Car) => {
      setWinners(
        winners.map((winner) =>
          winner.id === car.id ? { ...winner, ...car } : winner
        )
      );
    });
  }, [winners, setWinners, winner]);

  return (
    <div className="winner">
      <div>{winner.id}</div>
      <div>
        <CarIcon color={winner.color} size={30} />
      </div>
      <div>{winner.name}</div>
      <div>{winner.wins}</div>
      <div>{winner.time}</div>
    </div>
  );
};
