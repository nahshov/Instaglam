import { useCallback } from 'react';

export const useDebounce = (func, wait = 200) => {
  const debounce = (f, ms = 200) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => f(args), ms);
    };
  };

  const debounceQuery = useCallback(debounce(func, wait), []);

  return {
    debounce: debounceQuery
  };
};
