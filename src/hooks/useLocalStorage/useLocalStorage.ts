import { useState, useEffect } from 'react';

function getStorageValue(key: string, defaultValue: any) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved as string);
  return initial || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [storage, setStorage] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storage));
  }, [key, storage]);

  return [storage, setStorage];
};
