import { useContext } from 'react';

import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { WinnerItem } from '../winner-item';

import { AppContext } from '../../app-context';

import './winner-list.scss';

export const WinnerList = () => {
  const { winners, winnersState } = useContext(AppContext);

  return (
    <>
      {winnersState === 'loading' && <Spinner />}
      {winnersState === 'error' && <ErrorMessage />}
      {winnersState === 'idle' && (
        <div className="winners">
          <div className="winners__header">
            <div>Number</div>
            <div>Car</div>
            <div>Name</div>
            <div>Wins</div>
            <div>Best Time (s)</div>
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
