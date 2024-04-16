import { createContext } from 'react';

import { ResponseStatus } from './types';

type AppContextType = {
  responseStatus: ResponseStatus | null;
  message: string | null;
  setResponseStatus: (value: ResponseStatus | null) => void,
  setMessage: (value: string | null) => void,
}

export const AppContext = createContext<AppContextType>({
  responseStatus: null,
  message: null,
  setResponseStatus: () => {},
  setMessage: () => {},
});