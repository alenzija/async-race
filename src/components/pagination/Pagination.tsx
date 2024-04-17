import { useGetPage } from '../../hooks/useGetPage';

import './pagination.scss';

type PaginationProps = {
  itemsCount: number;
  showedItems: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  showedItems,
}) => {
  const { page, setPage } = useGetPage();

  const toPrevPage = () => {
    setPage(page - 1);
  };

  const toNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="pagination">
      <button type="button" disabled={page === 1} onClick={toPrevPage}>
        {'<'}
      </button>
      <span>{page}</span>
      <button
        type="button"
        disabled={page >= Math.ceil(itemsCount / showedItems)}
        onClick={toNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};
