import {createContext, useContext} from 'react';

export const AppContext = createContext({
  user: null,
});

export const useAppContext = () => useContext(AppContext);
