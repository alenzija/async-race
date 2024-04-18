import { useContext } from 'react';

import { AppContext } from '../../app-context';

import './winners.scss';

export const Winners = () => {
  const { winners, winnersCount } = useContext(AppContext);
  return (
    <>
      <div>{`Winners(${winnersCount})`}</div>
      {winners.map((winner) => (
        <div key={winner.id}>{winner.id}</div>
      ))}
    </>
  );
};
