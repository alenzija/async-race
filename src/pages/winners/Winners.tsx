import { useContext } from 'react';

import { WinnerList } from '../../components/winner-list';
import { Pagination } from '../../components/pagination';

import { AppContext } from '../../app-context';

import './winners.scss';
import { SHOWED_WINNER_ITEMS } from '../../consts';

export const Winners = () => {
  const { winnersCount, winnersPage, winnersState, setWinnersPage } =
    useContext(AppContext);

  return (
    <>
      <div>{`Winners(${winnersCount})`}</div>
      <WinnerList />
      <Pagination
        currentPage={winnersPage}
        setPage={setWinnersPage}
        state={winnersState}
        itemsCount={winnersCount}
        showedItems={SHOWED_WINNER_ITEMS}
      />
    </>
  );
};
