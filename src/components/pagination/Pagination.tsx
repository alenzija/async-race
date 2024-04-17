import { State } from '../../types';

import './pagination.scss';

type PaginationProps = {
  itemsCount: number;
  showedItems: number;
  currentPage: number;
  setPage: (value: number) => void;
  state: State;
};

export const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  showedItems,
  currentPage,
  setPage,
  state,
}) => {
  const toPrevPage = () => {
    setPage(currentPage - 1);
  };

  const toNextPage = () => {
    setPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={currentPage === 1 || state === 'loading'}
        onClick={toPrevPage}
      >
        {'<'}
      </button>
      <span>{currentPage}</span>
      <button
        type="button"
        disabled={
          currentPage >= Math.ceil(itemsCount / showedItems) ||
          state === 'loading'
        }
        onClick={toNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};
