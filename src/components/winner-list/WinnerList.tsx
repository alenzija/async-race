import { useContext } from 'react';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { WinnerItem } from '../winner-item';

import { AppContext } from '../../app-context';

import { Order, Sort } from '../../types';

import './winner-list.scss';

export const WinnerList = () => {
  const {
    winners,
    winnersState,
    winnersSort,
    winnersOrder,
    winnersCount,
    setWinnersSort,
    setWinnersOrder,
  } = useContext(AppContext);

  const onTimeSortToggle = () => {
    if (winnersCount < 2) {
      return;
    }
    if (winnersSort === Sort.time) {
      winnersOrder === Order.asc
        ? setWinnersOrder(Order.desc)
        : setWinnersOrder(Order.asc);
    } else {
      setWinnersSort(Sort.time);
    }
  };

  const onWinsSortToggle = () => {
    if (winnersCount < 2) {
      return;
    }
    if (winnersSort === Sort.wins) {
      winnersOrder === Order.asc
        ? setWinnersOrder(Order.desc)
        : setWinnersOrder(Order.asc);
    } else {
      setWinnersSort(Sort.wins);
    }
  };

  return (
    <>
      {winnersState === 'loading' && <Spinner />}
      {winnersState === 'error' && <ErrorMessage />}
      {winnersState === 'idle' && (
        <div className="winners">
          <div className="winners__header">
            <div>Id</div>
            <div>Car</div>
            <div>Name</div>
            <div onClick={onWinsSortToggle}>
              Wins
              {winnersSort === Sort.wins &&
                (winnersOrder === Order.asc ? ' ↓' : ' ↑')}
            </div>
            <div onClick={onTimeSortToggle}>
              Best Time (s)
              {winnersSort === Sort.time &&
                (winnersOrder === Order.asc ? ' ↓' : ' ↑')}
            </div>
          </div>
          {winners.length > 0 && (
            <div className="winners__body">
              {winners.map((winner) => (
                <WinnerItem key={winner.id} winner={winner} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
