import { useContext } from 'react';

import { WinnerList } from '../../components/winner-list';

import { AppContext } from '../../app-context';

import './winners.scss';

export const Winners = () => {
  const { winnersCount } = useContext(AppContext);

  return (
    <>
      <div>{`Winners(${winnersCount})`}</div>
      <WinnerList />
    </>
  );
};
