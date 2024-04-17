import { useSearchParams } from 'react-router-dom';

export const useGetPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

  const setPage = (newPage: number) => {
    const newSearchParams = { ...searchParams, page: newPage };
    setSearchParams(newSearchParams);
  };

  return { page, setPage };
};
