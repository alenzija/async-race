import { useSearchParams } from 'react-router-dom';

export const useGetPage = () => {
  const [searchParams] = useSearchParams();

  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

  return page;
};
