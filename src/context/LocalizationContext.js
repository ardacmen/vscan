import { createContext, useContext } from 'react';

export const LocalizationContext = createContext({
  user: null,
});

export const useLocalizationContext = () => useContext(LocalizationContext);
