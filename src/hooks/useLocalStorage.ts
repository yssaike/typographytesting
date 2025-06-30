import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function useURLState<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get(key);
      return param ? JSON.parse(decodeURIComponent(param)) : initialValue;
    } catch (error) {
      console.warn(`Error reading URL parameter "${key}":`, error);
      return initialValue;
    }
  });

  const updateValue = (newValue: T) => {
    setValue(newValue);
    const url = new URL(window.location.href);
    url.searchParams.set(key, encodeURIComponent(JSON.stringify(newValue)));
    window.history.replaceState({}, '', url.toString());
  };

  return [value, updateValue];
}