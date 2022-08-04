import { useState } from 'react';

type Value =
  | boolean
  | number
  | string
  | { [key: number]: Value }
  | { [key: string]: Value };

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
type SetValueParam<T> = T extends unknown ? T | ((storedValue: T) => T) : never;

export const useLocalStorage = <T = Value>(
  key: string,
  initialValue: T
): [T, (value: SetValueParam<T>) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: SetValueParam<T>): void => {
    try {
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
