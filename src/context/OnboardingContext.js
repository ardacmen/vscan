import {createContext, useContext} from 'react';

export const OnboardingContext = createContext({
  user: null,
});

export const useOnboardingContext = () => useContext(OnboardingContext);
